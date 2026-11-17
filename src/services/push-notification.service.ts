import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { firstValueFrom, timeout } from 'rxjs';
import { environment } from 'src/enviroments/environment';
import { IResponse } from 'src/app/DTO/classes/IResponse';
import { getDeviceCompat } from 'src/utils/device-compat';
import { RememberedSessionService } from 'src/app/auth/remembered-session.service';

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
  | 'server'
  | 'status'
  | 'session-changed';

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
  hasActiveWorker: boolean;
  swState: string;
  hasSubscription: boolean;
  checkedAt: Date;
  errorCode?: PushErrorCode;
}

export type PushDeviceState = 'connected' | 'permission' | 'denied' | 'install' | 'unavailable'
  | 'setup' | 'not-registered' | 'unverified';

export interface PushDeviceResult {
  state: PushDeviceState;
  diagnostics: PushDiagnostics;
  isGranted?: boolean;
}

interface DeviceRegistrationStatus {
  isGranted: boolean;
  isRegistered: boolean;
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
    private cookies: CookieService,
    private session: RememberedSessionService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  url = environment.Uri;
  private readonly checks = new Map<string, {token: string; request: Promise<PushDeviceResult>}>();

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

    const capability = this.capability(this.initialDiagnostics());
    if (capability) throw new PushError(capability, 'Web Push is unavailable in this mode');

    const token = this.sessionToken();

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

    await this.sendSubscriptionToServer(idUser, sub, token);
    return sub;
  }

  // Login and settings share the active check, including registration and read-back.
  async syncExistingSubscription(profileId: string): Promise<void> {
    if (isPlatformBrowser(this.platformId) && profileId && typeof Notification !== 'undefined'
        && Notification.permission === 'granted') {
      await this.checkDevice(profileId);
    }
  }

  invalidateCheck(profileId: string): void {
    this.checks.delete(profileId);
  }

  checkDevice(profileId: string, restore = true): Promise<PushDeviceResult> {
    const token = this.sessionToken();
    if (!restore) return this.readDevice(profileId, token, false);
    const running = this.checks.get(profileId);
    if (running?.token === token) return running.request;

    const request = this.readDevice(profileId, token, true).finally(() => {
      if (this.checks.get(profileId)?.request === request) this.checks.delete(profileId);
    });
    this.checks.set(profileId, { token, request });
    return request;
  }

  private async readDevice(profileId: string, token: string, restore: boolean): Promise<PushDeviceResult> {
    const diagnostics = this.initialDiagnostics();
    const capability = this.capability(diagnostics);
    if (capability) {
      return { state: capability === 'ios-needs-install' ? 'install' : 'unavailable',
        diagnostics: { ...diagnostics, errorCode: capability } };
    }

    try {
      const subscription = await this.readLocalSubscription(diagnostics);
      if (diagnostics.permission === 'denied') return { state: 'denied', diagnostics };
      if (diagnostics.permission !== 'granted') return { state: 'permission', diagnostics };
      if (!subscription || !diagnostics.hasActiveWorker) return { state: 'setup', diagnostics };

      let status = await this.readSubscriptionStatus(profileId, subscription, token);
      if (status.isGranted && !status.isRegistered && restore) {
        await this.sendSubscriptionToServer(profileId, subscription, token);
        status = await this.readSubscriptionStatus(profileId, subscription, token);
      }
      return {
        state: status.isGranted && status.isRegistered ? 'connected' : 'not-registered',
        diagnostics: { ...diagnostics, checkedAt: new Date() },
        isGranted: status.isGranted,
      };
    } catch (error) {
      const errorCode = isPushError(error) ? error.code : 'status';
      return { state: errorCode === 'server' ? 'not-registered' : 'unverified',
        diagnostics: { ...diagnostics, checkedAt: new Date(), errorCode } };
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

  private sessionToken(): string {
    return isPlatformBrowser(this.platformId) ? this.cookies.get('auth-token-ocpio') : '';
  }

  private headers(token: string): HttpHeaders {
    const current = this.sessionToken();
    if (!this.session.sameSession(token, current)) throw new PushError('session-changed', 'Push session ended');
    return new HttpHeaders().set('Authorization', 'Bearer ' + current);
  }

  private async sendSubscriptionToServer(profileId: string, sub: PushSubscription, token: string): Promise<void> {
    const headers = this.headers(token);
    let result: IResponse;
    try {
      result = await firstValueFrom(this.http.post<IResponse>(`${this.url}notifications/subscribe/${profileId}`,
        { userId: profileId, subscription: sub.toJSON() }, { headers }).pipe(timeout(SERVER_TIMEOUT_MS)));
    } catch {
      // A timeout/transport error can occur after the server committed.
      throw new PushError('status', 'Could not verify that the server saved the subscription');
    }
    if (result?.code !== 200 || typeof result.data !== 'string' || result.data.toLowerCase() !== profileId.toLowerCase()) {
      throw new PushError('server', 'The server did not save the subscription for this profile');
    }
  }

  private async readSubscriptionStatus(profileId: string, sub: PushSubscription, token: string): Promise<DeviceRegistrationStatus> {
    const headers = this.headers(token);
    try {
      const result = await firstValueFrom(this.http.post<IResponse>(
        `${this.url}notifications/subscription-status/${profileId}`, sub.toJSON(), { headers },
      ).pipe(timeout(SERVER_TIMEOUT_MS)));
      const status = result?.data as DeviceRegistrationStatus | undefined;
      if (result?.code === 200 && typeof status?.isGranted === 'boolean' && typeof status?.isRegistered === 'boolean') {
        return status;
      }
    } catch {
      // Report an unknown state for both transport errors and failed business responses.
    }
    throw new PushError('status', 'Could not check current device registration');
  }

  private initialDiagnostics(): PushDiagnostics {
    const diagnostics: PushDiagnostics = {
      isIOS: false, iosVersion: '—', isStandalone: false,
      hasNotificationApi: false, hasPushManager: false, hasServiceWorkerApi: false,
      permission: '—', swState: '—', hasActiveWorker: false, hasSubscription: false, checkedAt: new Date(),
    };
    if (!isPlatformBrowser(this.platformId)) return diagnostics;
    const compat = getDeviceCompat();
    return {
      ...diagnostics,
      isIOS: compat.isIOS,
      iosVersion: compat.iosVersion?.join('.') ?? '—',
      isStandalone: this.isStandalone(),
      hasNotificationApi: 'Notification' in window,
      hasPushManager: 'PushManager' in window,
      hasServiceWorkerApi: 'serviceWorker' in navigator,
      permission: 'Notification' in window ? Notification.permission : '—',
    };
  }

  private capability(device: PushDiagnostics): 'ios-needs-install' | 'ios-too-old' | 'unsupported' | 'ssr' | null {
    if (!isPlatformBrowser(this.platformId)) return 'ssr';
    if (device.isIOS && !device.isStandalone) return 'ios-needs-install';
    const [major, minor] = device.iosVersion.split('.').map(Number);
    if (device.isIOS && (major < 16 || (major === 16 && minor < 4))) return 'ios-too-old';
    if (!device.hasNotificationApi || !device.hasPushManager || !device.hasServiceWorkerApi) return 'unsupported';
    return null;
  }

  private async readLocalSubscription(device: PushDiagnostics): Promise<PushSubscription | null> {
    if (!device.hasServiceWorkerApi) return null;
    const error = new PushError('status', 'Could not read local push state');
    const registration = await this.withTimeout(navigator.serviceWorker.getRegistration('/'), SW_ACTIVATION_TIMEOUT_MS, error);
    const worker = registration?.active ?? registration?.waiting ?? registration?.installing;
    device.swState = worker?.state ?? 'не активен';
    device.hasActiveWorker = !!registration?.active;
    const subscription = registration?.pushManager
      ? await this.withTimeout(registration.pushManager.getSubscription(), SW_ACTIVATION_TIMEOUT_MS, error)
      : null;
    device.hasSubscription = !!subscription;
    return subscription;
  }

  async collectDiagnostics(errorCode?: PushErrorCode): Promise<PushDiagnostics> {
    const diagnostics = this.initialDiagnostics();
    try {
      await this.readLocalSubscription(diagnostics);
    } catch {
      diagnostics.swState = 'не удалось проверить';
    }
    return { ...diagnostics, errorCode };
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
