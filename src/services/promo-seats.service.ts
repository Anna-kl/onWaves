import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../enviroments/environment';
import { GiveawayLoad } from '../app/DTO/views/giveaway/giveaway';
import { PromoSeatQuote, PromoSeatReport, PromoSeatState, PromoSeatTerms } from '../app/DTO/views/promo/promo-seats';

export interface PromoQuoteLoad {
  kind: 'ready' | 'empty' | 'failed';
  value: PromoSeatQuote | null;
}
import { IResponse } from '../app/DTO/classes/IResponse';

/**
 * Акция с ограниченным числом мест. Счётчик и суммы приходят с сервера без кеша:
 * витрина спрашивает их при открытии страницы и ещё раз перед подтверждением записи.
 * Ошибка сети = «акции нет»: лучше не обещать место, которого может не быть.
 */
@Injectable({ providedIn: 'root' })
export class PromoSeatsService {
  private readonly url = environment.Uri + 'promos/seats/';
  private static readonly NO_STORE = { 'Cache-Control': 'no-store' };

  private readonly liveHttp: HttpClient;
  constructor(private http: HttpClient, private cookies: CookieService, backend: HttpBackend) {
    this.liveHttp = new HttpClient(backend);
  }

  getReports(masterId: string): Observable<PromoSeatReport[]> {
    return this.http.get<PromoSeatReport[]>(`${this.url}master/${masterId}/reports`, { headers: this.authHeaders() });
  }

  markAttendance(masterId: string, recordId: string, attended: boolean): Observable<IResponse> {
    return this.http.post<IResponse>(`${this.url}master/${masterId}/records/${recordId}/attendance`,
      { attended }, { headers: this.authHeaders() });
  }

  private authHeaders(): HttpHeaders {
    let headers = new HttpHeaders(PromoSeatsService.NO_STORE);
    try {
      if (this.cookies.check('auth-token-ocpio')) {
        headers = headers.set('Authorization', 'Bearer ' + this.cookies.get('auth-token-ocpio'));
      }
    } catch {
      // без cookie — гость
    }
    return headers;
  }

  /** null — у мастера нет акции (204) или сервер не ответил. */
  getState(masterId: string): Observable<PromoSeatState | null> {
    return this.http
      .get<PromoSeatState | null>(`${this.url}${masterId}`, {
        headers: new HttpHeaders(PromoSeatsService.NO_STORE),
      })
      .pipe(
        map(state => state ?? null),
        catchError(() => of(null)),
      );
  }

  /**
   * Для экранов розыгрыша: пустой ответ и ошибка сервера — разные состояния.
   * Старый getState по-прежнему схлопывает сбой в «акции нет», чтобы не обещать место.
   */
  readState(masterId: string, campaignCode?: string, fresh = false): Observable<GiveawayLoad<PromoSeatState>> {
    return (fresh ? this.liveHttp : this.http)
      .get<PromoSeatState | null>(`${this.url}${masterId}`, {
        headers: new HttpHeaders(PromoSeatsService.NO_STORE),
        ...(campaignCode ? { params: { campaignCode } } : {}),
      })
      .pipe(
        map(state => state
          ? { kind: 'ready' as const, value: state }
          : { kind: 'empty' as const, value: null }),
        catchError((error: HttpErrorResponse) => of(
          error.status === 404
            ? { kind: 'empty' as const, value: null }
            : { kind: 'failed' as const, value: null },
        )),
      );
  }

  getTerms(slug: string): Observable<PromoSeatTerms | null> {
    return this.http
      .get<PromoSeatTerms>(`${this.url}terms/${encodeURIComponent(slug)}`, {
        headers: new HttpHeaders(PromoSeatsService.NO_STORE),
      })
      .pipe(catchError(() => of(null)));
  }

  quote(masterId: string, serviceIds: string[], clientId?: string | null, daysOfScheduleId?: string | null, campaignCode?: string | null): Observable<PromoSeatQuote | null> {
    return this.quoteDetailed(masterId, serviceIds, clientId, daysOfScheduleId, campaignCode).pipe(
      map(result => result.kind === 'ready' ? result.value : null),
    );
  }

  /** Пустой ответ и сбой сети здесь разные: сбой нельзя показывать как «мест нет». */
  quoteDetailed(masterId: string, serviceIds: string[], clientId?: string | null, daysOfScheduleId?: string | null, campaignCode?: string | null): Observable<PromoQuoteLoad> {
    return this.http
      .post<PromoSeatQuote | null>(`${this.url}quote`, {
        masterId,
        serviceIds,
        clientId: clientId ?? null,
        daysOfScheduleId: daysOfScheduleId ?? null,
        campaignCode: campaignCode ?? undefined,
      }, { headers: this.authHeaders() })
      .pipe(
        map(quote => quote
          ? { kind: 'ready' as const, value: quote }
          : { kind: 'empty' as const, value: null }),
        catchError(() => of({ kind: 'failed' as const, value: null })),
      );
  }
}
