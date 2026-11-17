import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { DestroyRef, Inject, Injectable, NgZone, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { catchError, finalize, firstValueFrom, map, Observable, shareReplay, Subject, throwError, timeout } from 'rxjs';
import { environment } from '../../enviroments/environment';
import { IResponse } from '../DTO/classes/IResponse';
import { logoutAction, renewSessionTokenAction } from '../ngrx-store/mainClient/store.action';
import { ensureDeviceUuid } from '../../helpers/common/max-auth';

export const SESSION_IDLE_DAYS = 30;

/** Продлеваем существующую сессию; право на продление всегда проверяет сервер. */
@Injectable({ providedIn: 'root' })
export class RememberedSessionService {
  readonly ended$ = new Subject<void>();
  readonly renewed$ = new Subject<IResponse>();
  private renewal$?: Observable<IResponse>;
  private generation = 0;
  private lastRenewal = Date.now();
  private readonly browser: boolean;
  private readonly url = environment.Uri + 'auths/';

  constructor(
    private readonly http: HttpClient,
    private readonly cookies: CookieService,
    private readonly store: Store,
    @Inject(PLATFORM_ID) platformId: string,
    zone: NgZone,
    destroyRef: DestroyRef,
  ) {
    this.browser = isPlatformBrowser(platformId);
    if (this.browser) {
      // Только реальные действия/возврат в видимую вкладку. Фоновый таймер не продлевает вход.
      const activity = (event: Event) => {
        if (document.visibilityState !== 'hidden' && this.cookies.check('auth-token-ocpio')
          && (event.type === 'online' || Date.now() - this.lastRenewal > 5 * 60_000)) {
          this.lastRenewal = Date.now();
          zone.run(() => this.renew().subscribe({ error: () => {} }));
        }
      };
      zone.runOutsideAngular(() => {
        for (const event of ['pointerdown', 'keydown', 'focus', 'pageshow', 'visibilitychange', 'online']) {
          window.addEventListener(event, activity, { capture: true, passive: true });
          destroyRef.onDestroy(() => window.removeEventListener(event, activity, true));
        }
      });
    }
  }

  remember(token: string, profileId?: string | null): void {
    if (!this.browser) return;
    const previous = this.cookies.get('auth-token-ocpio');
    if (previous && !this.sameSession(previous, token)) {
      this.generation++;
      this.renewal$ = undefined;
    }
    ensureDeviceUuid(this.cookies);
    const expiry = new Date(Date.now() + SESSION_IDLE_DAYS * 86_400_000);
    this.cookies.set('auth-token-ocpio', token, expiry, '/');
    const selected = profileId ?? this.cookies.get('profileId-ocpio');
    if (selected) this.cookies.set('profileId-ocpio', selected, expiry, '/');
    const uuid = this.cookies.get('uuid-ocpio');
    if (uuid) this.cookies.set('uuid-ocpio', uuid, expiry, '/');
    this.lastRenewal = Date.now();
    this.store.dispatch(renewSessionTokenAction({ token }));
  }

  renew(): Observable<IResponse> {
    if (this.renewal$) return this.renewal$;
    const token = this.cookies.get('auth-token-ocpio');
    const uuid = this.cookies.get('uuid-ocpio');
    const generation = this.generation;
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + token });
    this.renewal$ = this.http.post<IResponse>(this.url + 'uuid', { token, uuid }, { headers }).pipe(
      timeout(10_000),
      map(response => {
        if (response.code !== 200 || !response.data?.token) {
          throw new HttpErrorResponse({ status: response.code || 401, error: response });
        }
        // Ответ старого запроса не должен возвращать аккаунт после выхода/смены пользователя.
        if (generation !== this.generation || !this.sameSession(token, this.cookies.get('auth-token-ocpio'))
          || uuid !== this.cookies.get('uuid-ocpio')) {
          throw new Error('Сессия изменилась во время запроса');
        }
        this.remember(response.data.token);
        this.renewed$.next(response);
        return response;
      }),
      catchError(error => {
        if (generation === this.generation && (error.status === 401 || error.status === 403 || error.status === 404)
          && this.sameSession(token, this.cookies.get('auth-token-ocpio'))) this.clear();
        return throwError(() => error);
      }),
      finalize(() => { if (generation === this.generation) this.renewal$ = undefined; }),
      shareReplay({ bufferSize: 1, refCount: false }),
    );
    return this.renewal$;
  }

  /** Сравнение только для выбора актуального токена браузера, не для проверки его подлинности. */
  sameSession(left: string, right: string): boolean {
    if (!left || !right) return false;
    if (left === right) return true;
    try {
      const claims = (value: string) => JSON.parse(atob(value.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
      const a = claims(left);
      const b = claims(right);
      return !!a.SessionId && a.SessionId === b.SessionId;
    } catch { return false; }
  }

  expiresSoon(token: string): boolean {
    try {
      const claims = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
      return typeof claims.exp === 'number' && claims.exp * 1000 <= Date.now() + 60_000;
    } catch { return false; }
  }

  clear(): void {
    if (!this.browser) return;
    this.generation++;
    this.renewal$ = undefined;
    for (const name of ['auth-token-ocpio', 'profileId-ocpio', 'uuid-ocpio']) {
      this.cookies.delete(name, '/');
      this.cookies.delete(name);
    }
    this.store.dispatch(logoutAction());
    this.ended$.next();
  }

  async logout(): Promise<void> {
    if (!this.browser) return;
    const token = this.cookies.get('auth-token-ocpio');
    const uuid = this.cookies.get('uuid-ocpio');
    this.clear();
    if (token) {
      try {
        await firstValueFrom(this.http.post(this.url + 'logout', { token, uuid }).pipe(timeout(5000)));
      } catch { /* Локальный выход действует и при недоступном сервере. */ }
    }
  }
}
