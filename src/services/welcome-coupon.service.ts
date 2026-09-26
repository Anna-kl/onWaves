import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, of, shareReplay } from 'rxjs';
import { environment } from '../enviroments/environment';
import { AnalyticsService } from './analytics.service';
import { WelcomeCouponMe, WelcomeOffer, WelcomeQuote } from '../app/DTO/views/promo/welcome-coupon';

/**
 * Приветственный купон. Клиент только показывает то, что посчитал сервер:
 * суммы, уровни и статусы сюда приходят готовыми и в запись не доверяются.
 * Ошибка сети = «предложения нет» (fail-closed): лучше ничего не обещать, чем показать неверное.
 */
@Injectable({ providedIn: 'root' })
export class WelcomeCouponService {
  private readonly url = environment.Uri + 'coupons/welcome/';
  private static readonly NO_STORE = { 'Cache-Control': 'no-store' };

  // Условия спрашивают сразу несколько мест страницы мастера (колонка, блок услуг,
  // калькулятор). Короткий кеш склеивает это в один запрос, не переживая перезагрузку.
  private static readonly CACHE_TTL = 60_000;
  private readonly offerCache = new Map<string, { expiresAt: number; value$: Observable<WelcomeOffer> }>();
  private mineCache: { key: string; expiresAt: number; value$: Observable<WelcomeCouponMe | null> } | null = null;

  constructor(
    private http: HttpClient,
    private cookies: CookieService,
    private analytics: AnalyticsService,
  ) {}

  /** Есть ли у пользователя сессия (гость = нет токена). */
  get isLoggedIn(): boolean {
    try {
      return this.cookies.check('auth-token-ocpio');
    } catch {
      return false;
    }
  }

  private authHeaders(): HttpHeaders {
    let headers = new HttpHeaders(WelcomeCouponService.NO_STORE);
    if (this.isLoggedIn) {
      headers = headers.set('Authorization', 'Bearer ' + this.cookies.get('auth-token-ocpio'));
    }
    return headers;
  }

  /** Публичное предложение мастера. Ничего личного. */
  getOffer(masterId: string): Observable<WelcomeOffer> {
    const hit = this.offerCache.get(masterId);
    if (hit && hit.expiresAt > Date.now()) {
      return hit.value$;
    }
    const value$ = this.http
      .get<WelcomeOffer>(`${this.url}offer`, {
        params: { masterId },
        headers: new HttpHeaders(WelcomeCouponService.NO_STORE),
      })
      .pipe(
        catchError(() => of<WelcomeOffer>({ active: false, masterParticipates: false, campaign: null })),
        shareReplay({ bufferSize: 1, refCount: false }),
      );
    this.offerCache.set(masterId, { expiresAt: Date.now() + WelcomeCouponService.CACHE_TTL, value$ });
    return value$;
  }

  /** Право текущего клиента; для гостя не вызывается. */
  getMine(profileId?: string | null): Observable<WelcomeCouponMe | null> {
    // Без profileId сервер берёт профиль из токена — это удобно там, где id клиента под рукой нет.
    const key = profileId ?? 'token';
    if (this.mineCache && this.mineCache.key === key && this.mineCache.expiresAt > Date.now()) {
      return this.mineCache.value$;
    }
    const options = profileId
      ? { params: { profileId }, headers: this.authHeaders() }
      : { headers: this.authHeaders() };
    const value$ = this.http
      .get<WelcomeCouponMe>(`${this.url}me`, options)
      .pipe(
        catchError(() => of(null)),
        shareReplay({ bufferSize: 1, refCount: false }),
      );
    this.mineCache = { key, expiresAt: Date.now() + WelcomeCouponService.CACHE_TTL, value$ };
    return value$;
  }

  /** Расчёт по выбранным услугам. Ответ null = сервер расчёт не дал, скидку не показываем. */
  quote(masterId: string, serviceIds: string[], clientId?: string | null): Observable<WelcomeQuote | null> {
    return this.http
      .post<WelcomeQuote>(`${this.url}quote`, { masterId, serviceIds, clientId: clientId ?? null }, {
        headers: this.authHeaders(),
      })
      .pipe(catchError(() => of(null)));
  }

  /**
   * События Метрики. Без телефонов, имён и id клиентов: только категория, действие и код кампании.
   * Имена: welcome_coupon_shown | _clicked | _terms_opened | _quote | _applied | _refused | _booked.
   */
  track(action: string, campaignCode?: string | null, value?: number): void {
    this.analytics.trackEvent('welcome_coupon', `welcome_coupon_${action}`, campaignCode ?? undefined, value);
  }
}
