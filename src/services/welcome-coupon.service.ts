import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../enviroments/environment';
import { AnalyticsService } from './analytics.service';
import { WelcomeCouponMe, WelcomeOffer, WelcomeQuote } from '../app/DTO/views/promo/welcome-coupon';

/**
 * Приветственный купон. Клиент только показывает то, что посчитал сервер:
 * суммы, уровни и статусы сюда приходят готовыми и в запись не доверяются.
 * Витрина при ошибке скрывает обещание, но расчёт записи обязан сообщить о сбое.
 */
@Injectable({ providedIn: 'root' })
export class WelcomeCouponService {
  private readonly url = environment.Uri + 'coupons/welcome/';
  private static readonly NO_STORE = { 'Cache-Control': 'no-store' };

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
    return this.http
      .get<WelcomeOffer>(`${this.url}offer`, {
        params: { masterId },
        headers: new HttpHeaders(WelcomeCouponService.NO_STORE),
      })
      .pipe(
        catchError(() => of<WelcomeOffer>({ active: false, masterParticipates: false, campaign: null })),
      );
  }

  /** Право текущего клиента; для гостя не вызывается. */
  getMine(profileId?: string | null, masterId?: string | null): Observable<WelcomeCouponMe | null> {
    // Без profileId сервер берёт профиль из токена — это удобно там, где id клиента под рукой нет.
    if (!this.isLoggedIn) return of(null);
    const params: Record<string, string> = {};
    if (profileId) params['profileId'] = profileId;
    if (masterId) params['masterId'] = masterId;
    return this.http
      .get<WelcomeCouponMe>(`${this.url}me`, { params, headers: this.authHeaders() })
      .pipe(
        catchError(() => of(null)),
      );
  }

  /** Отсутствие купона — штатный ответ; технический сбой должен остановить подтверждение суммы. */
  quote(masterId: string, serviceIds: string[], clientId?: string | null): Observable<WelcomeQuote> {
    return this.http
      .post<WelcomeQuote>(`${this.url}quote`, { masterId, serviceIds, clientId: clientId ?? null }, {
        headers: this.authHeaders(),
      })
      .pipe(map(quote => {
        // Отсутствие права приходит DTO 200, а не 404 или пустым ответом.
        if (!quote) throw new Error('Сервер не вернул расчёт купона');
        return quote;
      }));
  }

  invalidateMine(): void {}

  /**
   * События Метрики. Без телефонов, имён и id клиентов: только категория, действие и код кампании.
   * Имена: welcome_coupon_shown | _clicked | _terms_opened | _quote | _applied | _refused | _booked.
   */
  track(action: string, campaignCode?: string | null, value?: number): void {
    this.analytics.trackEvent('welcome_coupon', `welcome_coupon_${action}`, campaignCode ?? undefined, value);
  }
}
