import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom, timeout } from 'rxjs';
import { environment } from 'src/enviroments/environment';
import { IResponse } from 'src/app/DTO/classes/IResponse';
import { getDeviceCompat } from 'src/utils/device-compat';

// ключ должен совпадать с тем, что используется на сервере (.NET Core)
const VAPID_PUBLIC = environment.publicKey;

/** Сколько ждём, пока service worker станет active. Без лимита `ready` висит вечно. */
const SW_ACTIVATION_TIMEOUT_MS = 15000;
/** Браузерные запросы не проходят через ServerTimeoutInterceptor — он только для SSR. */
const SERVER_TIMEOUT_MS = 15000;

export type PushErrorCode =
  | 'ssr'
  | 'ios-needs-install'
  | 'ios-too-old'
  | 'unsupported'
  | 'permission-denied'
  | 'permission-dismissed'
  | 'sw-timeout'
  | 'vapid'
  | 'subscribe-failed'
  | 'server';

/**
 * Ошибка с кодом: интерфейсу нужно объяснить пользователю не «что-то пошло не
 * так», а конкретный шаг (например, «добавьте сайт на экран Домой» на iOS).
 */
export class PushError extends Error {
  constructor(
    public readonly code: PushErrorCode,
    message: string,
    public readonly reason?: unknown,
  ) {
    super(message);
    this.name = 'PushError';
    Object.setPrototypeOf(this, PushError.prototype);
  }
}

/** Короткий хвост для сообщения об ошибке: статус и адрес, либо таймаут. */
function describeHttpFailure(error: unknown): string {
  if (error instanceof HttpErrorResponse) {
    return ` (HTTP ${error.status} ${error.statusText || ''} ${error.url ?? ''})`.replace(/\s+/g, ' ').replace(' )', ')');
  }
  if ((error as Error)?.name === 'TimeoutError') {
    return ` (timeout ${SERVER_TIMEOUT_MS} ms)`;
  }
  return '';
}

export function isPushError(error: unknown): error is PushError {
  return !!error && typeof error === 'object' && (error as PushError).name === 'PushError';
}

/** Снимок состояния подсистемы push — для диагностики на устройстве без Web Inspector. */
export interface PushDiagnostics {
  isIOS: boolean;
  iosVersion: string;
  isStandalone: boolean;
  hasNotificationApi: boolean;
  hasPushManager: boolean;
  hasServiceWorkerApi: boolean;
  permission: string;
  swScriptUrl: string;
  swState: string;
  subscriptionEndpoint: string;
}

function base64UrlToUint8Array(base64url: string): Uint8Array {
  const s = base64url.trim().replace(/[\r\n\s]+/g, '');     // убрать мусор
  if (!/^[A-Za-z0-9_-]+$/.test(s)) {
    throw new Error('VAPID public key must be base64url (A–Z a–z 0–9 _ -)');
  }
  const padded = s + '='.repeat((4 - (s.length % 4)) % 4);  // паддинг
  const base64 = padded.replace(/-/g, '+').replace(/_/g, '/');
  const raw = atob(base64);
  const buf = new ArrayBuffer(raw.length);
  const out = new Uint8Array(buf);
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return out;
}

@Injectable({ providedIn: 'root' })
export class PushDebugService {
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  url = environment.Uri;

  /** iOS-приложение с экрана «Домой» (только в этом режиме WebKit даёт Web Push). */
  isStandalone(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    return window.matchMedia('(display-mode: standalone)').matches ||
           (navigator as any).standalone === true;
  }

  /**
   * ВАЖНО: вызывать строго из обработчика клика и не ставить перед вызовом
   * никаких `await`. WebKit разрешает Notification.requestPermission() только
   * при живой transient activation: после первого же await системное окно
   * запроса на iOS не показывается вовсе — ни диалога, ни отказа. Поэтому все
   * проверки ниже до запроса разрешения синхронные, а обращение к service
   * worker перенесено ПОСЛЕ него.
   */
  async subscribe(idUser: string): Promise<PushSubscription> {
    if (!isPlatformBrowser(this.platformId)) {
      throw new PushError('ssr', 'Push notifications are unavailable during server rendering');
    }

    const compat = getDeviceCompat();
    const standalone = this.isStandalone();
    const hasApis = 'serviceWorker' in navigator &&
                    'PushManager' in window &&
                    'Notification' in window;

    if (!hasApis) {
      // На iOS Web Push существует только для приложения с экрана «Домой»:
      // в обычной вкладке Safari (и в любом стороннем браузере на iPhone)
      // window.Notification/PushManager просто отсутствуют.
      if (compat.isIOS && !standalone) {
        throw new PushError('ios-needs-install', 'Web Push on iOS requires a Home Screen app');
      }
      throw new PushError('unsupported', 'Push notifications are not supported by this browser');
    }

    if (compat.isIOS && !compat.supportsPushNotifications) {
      throw new PushError('ios-too-old', 'Web Push requires iOS 16.4 or newer');
    }

    const permission = Notification.permission === 'granted'
      ? 'granted'
      : await this.requestPermission();

    if (permission === 'denied') {
      throw new PushError('permission-denied', 'Notification permission is denied');
    }
    if (permission !== 'granted') {
      // WebKit возвращает 'default' и когда окно закрыли, и когда жест утерян.
      throw new PushError('permission-dismissed', `Notification permission is ${permission}`);
    }

    const registration = await this.ensureRegistration();

    // не трогаем существующую подписку — endpoint не должен меняться зря
    let sub = await registration.pushManager.getSubscription();
    if (!sub) {
      const appKey = base64UrlToUint8Array(VAPID_PUBLIC);
      if (appKey.length !== 65) {
        throw new PushError('vapid', 'Bad VAPID public key (must decode to 65 bytes)');
      }
      try {
        sub = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: appKey.buffer as ArrayBuffer,
        });
      } catch (error) {
        throw new PushError('subscribe-failed', 'pushManager.subscribe() failed', error);
      }
    }

    await this.sendSubscriptionToServer(idUser, sub);
    return sub;
  }

  /**
   * Тихая синхронизация уже выданной подписки с сервером — вызывается на старте
   * приложения, без системных окон и без ошибок в интерфейсе.
   *
   * Подписка принадлежит устройству, а не сессии: она переживает логаут, а
   * строка в push_subscriptions живёт до 410 Gone от push-сервиса. Этот вызов
   * восстанавливает её, если строку удалили по 410, если браузер сменил
   * endpoint, или если на устройстве теперь другой профиль — upsert по
   * endpoint на бэкенде просто перепривяжет владельца.
   *
   * Разрешение здесь НЕ запрашивается: без жеста пользователя WebKit его всё
   * равно не покажет, а в Chrome это дало бы всплывающее окно на голой
   * загрузке страницы. Нет разрешения — молча выходим.
   */
  async syncExistingSubscription(profileId: string): Promise<PushSubscription | null> {
    if (!isPlatformBrowser(this.platformId) || !profileId) return null;
    if (!('serviceWorker' in navigator) || !('PushManager' in window) || !('Notification' in window)) return null;
    if (Notification.permission !== 'granted') return null;

    try {
      const registration = await this.ensureRegistration();
      let sub = await registration.pushManager.getSubscription();

      if (!sub) {
        // Разрешение уже выдано, поэтому подписка создаётся без жеста.
        const appKey = base64UrlToUint8Array(VAPID_PUBLIC);
        if (appKey.length !== 65) return null;
        sub = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: appKey.buffer as ArrayBuffer,
        });
      }

      await this.sendSubscriptionToServer(profileId, sub);
      return sub;
    } catch (error) {
      console.warn('Push subscription sync skipped', error);
      return null;
    }
  }

  /**
   * Промис-форма есть не везде (старый WebKit знает только колбэк), поэтому
   * поддерживаем обе, не вызывая requestPermission дважды.
   */
  private requestPermission(): Promise<NotificationPermission> {
    return new Promise<NotificationPermission>((resolve, reject) => {
      try {
        const result = Notification.requestPermission(permission => resolve(permission));
        if (result && typeof result.then === 'function') {
          result.then(resolve, reject);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * `navigator.serviceWorker.ready` не резолвится никогда, если активной
   * регистрации нет, — а её может не быть: в дев-сборке SW не регистрируется
   * (см. AppComponent.ngOnInit), а logoutAndClearCaches() снимает регистрацию
   * до конца жизни вкладки. Поэтому регистрируем воркер по требованию и
   * ограничиваем ожидание таймаутом, чтобы вместо вечного спиннера была ошибка.
   */
  private async ensureRegistration(): Promise<ServiceWorkerRegistration> {
    let registration = await navigator.serviceWorker.getRegistration('/');

    if (!registration) {
      try {
        registration = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
      } catch (error) {
        throw new PushError('sw-timeout', 'Service worker registration failed', error);
      }
    }

    if (registration.active) {
      return registration;
    }

    await this.withTimeout(
      navigator.serviceWorker.ready,
      SW_ACTIVATION_TIMEOUT_MS,
      new PushError('sw-timeout', 'Service worker did not become active in time'),
    );

    return (await navigator.serviceWorker.getRegistration('/')) ?? registration;
  }

  private withTimeout<T>(promise: Promise<T>, ms: number, error: PushError): Promise<T> {
    let timer: any;
    return Promise.race([
      promise,
      new Promise<T>((_, reject) => { timer = setTimeout(() => reject(error), ms); }),
    ]).finally(() => clearTimeout(timer));
  }

  private async sendSubscriptionToServer(userId: string, sub: PushSubscription): Promise<void> {
    let result: IResponse;
    try {
      result = await firstValueFrom(
        this.http
          .post<IResponse>(`${this.url}notifications/subscribe/${userId}`, { userId, subscription: sub.toJSON() })
          .pipe(timeout(SERVER_TIMEOUT_MS)),
      );
    } catch (error) {
      // Без статуса и URL в сообщении эта ошибка в консоли неотличима от любой
      // другой: HttpErrorResponse лежит в reason и в логе остаётся свёрнутым.
      throw new PushError(
        'server',
        `The push subscription was not delivered to the server${describeHttpFailure(error)}`,
        error,
      );
    }

    if (result.code !== 200) {
      throw new PushError('server', result.message || 'The server did not save the push subscription');
    }
  }

  /** Состояние push на устройстве: единственный способ отладки на iPhone без Mac. */
  async collectDiagnostics(): Promise<PushDiagnostics> {
    const empty: PushDiagnostics = {
      isIOS: false, iosVersion: '—', isStandalone: false,
      hasNotificationApi: false, hasPushManager: false, hasServiceWorkerApi: false,
      permission: '—', swScriptUrl: '—', swState: '—', subscriptionEndpoint: '—',
    };

    if (!isPlatformBrowser(this.platformId)) return empty;

    const compat = getDeviceCompat();
    const diagnostics: PushDiagnostics = {
      ...empty,
      isIOS: compat.isIOS,
      iosVersion: compat.iosVersion ? compat.iosVersion.join('.') : '—',
      isStandalone: this.isStandalone(),
      hasNotificationApi: 'Notification' in window,
      hasPushManager: 'PushManager' in window,
      hasServiceWorkerApi: 'serviceWorker' in navigator,
      permission: 'Notification' in window ? Notification.permission : '—',
    };

    if (diagnostics.hasServiceWorkerApi) {
      try {
        const registration = await navigator.serviceWorker.getRegistration('/');
        if (registration) {
          const worker = registration.active ?? registration.waiting ?? registration.installing;
          diagnostics.swScriptUrl = worker?.scriptURL ?? '—';
          diagnostics.swState = worker?.state ?? 'none';
          const sub = await registration.pushManager?.getSubscription();
          diagnostics.subscriptionEndpoint = sub?.endpoint ?? 'нет подписки';
        } else {
          diagnostics.swState = 'не зарегистрирован';
        }
      } catch (error) {
        diagnostics.swState = `ошибка: ${(error as Error)?.message ?? error}`;
      }
    }

    return diagnostics;
  }

  /**
   * Тестовая отправка: POST v1/api/notifications/send-push.
   * `sessionId` — исторически названное поле, контроллер парсит его как profileId.
   * Коды в теле: 400 — не Guid, 403 — нет согласия Push, 404 — нет подписок,
   * 200 — доставлено хотя бы одной, 502 — не доставлено ни одной.
   */
  sendTest(profileId: string, title?: string, body?: string, url?: string) {
    return firstValueFrom(
      this.http
        .post<IResponse>(`${this.url}notifications/send-push`, {
          sessionId: profileId,
          title: title ?? null,
          body: body ?? null,
          url: url ?? null,
        })
        .pipe(timeout(SERVER_TIMEOUT_MS)),
    );
  }
}
