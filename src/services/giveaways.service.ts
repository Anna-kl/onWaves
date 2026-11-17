import { GiveawayOwnerAward } from '../app/DTO/views/giveaway/giveaway';
import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, NgZone, PLATFORM_ID, TransferState, makeStateKey } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subscription, catchError, map, of, switchMap, tap } from 'rxjs';
import { environment } from '../enviroments/environment';
import { IResponse } from '../app/DTO/classes/IResponse';
import {
  GiveawayAdminCampaign,
  GiveawayAssignment,
  GiveawayCampaign,
  GiveawayList,
  GiveawayLoad,
  GiveawayMine,
  GiveawayPreview,
  GiveawayPrizeQuote,
} from '../app/DTO/views/giveaway/giveaway';

/**
 * Розыгрыш: публичная кампания и личные выигрыши — разные методы.
 * 5xx не превращаем в «розыгрыша нет» и не в пустой список призов.
 */
@Injectable({ providedIn: 'root' })
export class GiveawaysService {
  private readonly url = environment.Uri + 'giveaways/';
  private static readonly NO_STORE = { 'Cache-Control': 'no-store' };

  constructor(private http: HttpClient, private cookies: CookieService, private zone: NgZone,
    @Inject(PLATFORM_ID) private platformId: object, private transfer: TransferState) {}

  get isLoggedIn(): boolean {
    try {
      return this.cookies.check('auth-token-ocpio');
    } catch {
      return false;
    }
  }

  publicList(placement: 'home' | 'master', masterId?: string | null): Observable<GiveawayLoad<GiveawayCampaign>> {
    const params: Record<string, string> = { placement };
    if (masterId) {
      params['masterId'] = masterId;
    }
    return this.publicState(() => this.http.get<unknown>(this.url.replace(/\/$/, ''), {
      params,
      headers: new HttpHeaders(GiveawaysService.NO_STORE),
    }).pipe(
      map(body => {
        const list = this.unwrap<GiveawayList>(body);
        const item = list?.items?.[0] ?? null;
        return item
          ? { kind: 'ready' as const, value: item }
          : { kind: 'empty' as const, value: null };
      }),
      catchError((error: HttpErrorResponse) => of<GiveawayLoad<GiveawayCampaign>>(
        error.status === 404 ? { kind: 'empty', value: null } : { kind: 'failed', value: null },
      )),
    ), `list:${placement}:${masterId ?? ''}`);
  }

  getCampaign(code: string, preview = false): Observable<GiveawayLoad<GiveawayCampaign>> {
    const path = preview ? `admin/campaigns/${encodeURIComponent(code)}/preview` : encodeURIComponent(code);
    return this.publicState(() => this.http.get<unknown>(`${this.url}${path}`, {
      headers: preview ? this.authHeaders() : new HttpHeaders(GiveawaysService.NO_STORE),
    }).pipe(
      map(body => {
        const campaign = this.unwrap<GiveawayCampaign>(body);
        return campaign?.code
          ? { kind: 'ready' as const, value: campaign }
          : { kind: 'empty' as const, value: null };
      }),
      catchError((error: HttpErrorResponse) => of(this.failedOrEmpty<GiveawayCampaign>(error))),
    ), preview ? undefined : `campaign:${code}`);
  }

  /** Личные выигрыши. Доказательство телефона проверяет сервер, номер в запрос не кладём. */
  mine(campaignCode?: string | null): Observable<GiveawayLoad<GiveawayMine>> {
    if (!this.isLoggedIn) {
      return of({ kind: 'verification_required', value: { status: 'verification_required', items: [] } });
    }
    const params = campaignCode ? { campaignCode } : undefined;
    return this.http.get<unknown>(`${this.url}me`, { headers: this.authHeaders(), params }).pipe(
      map(body => this.mineLoad(body)),
      catchError((error: HttpErrorResponse) => of(this.mineFromError(error))),
    );
  }

  claim(campaignCode?: string | null): Observable<GiveawayLoad<GiveawayMine>> {
    return this.http.post<unknown>(`${this.url}me/claim`, { campaignCode: campaignCode ?? null }, {
      headers: this.authHeaders(),
    }).pipe(
      map(body => this.mineLoad(body)),
      catchError((error: HttpErrorResponse) => of(this.mineFromError(error))),
    );
  }

  findBookingPrize(masterId: string, ids: string[], clientId: string | null): Observable<string | null> {
    if (!clientId) return of(null);
    return this.mine().pipe(switchMap(load => {
      if (load.kind === 'failed') throw new Error('Prize lookup failed');
      const award = load.value?.items.find(item => item.master.id === masterId &&
        (item.canBook || item.status === 'assigned') &&
        (item.policy ? item.services?.some(service => ids.includes(service.id))
          : !!item.service && ids.includes(item.service.id)));
      if (!award || award.status !== 'assigned') return of(award?.awardId ?? null);
      return this.claim(award.campaignCode).pipe(map(claimed => {
        if (claimed.kind !== 'ready') throw new Error('Prize claim failed');
        return award.awardId;
      }));
    }));
  }

  prizeQuote(awardId: string, serviceIds: string[], clientId?: string | null, daysOfScheduleId?: string | null): Observable<GiveawayLoad<GiveawayPrizeQuote>> {
    return this.http.post<unknown>(`${this.url}prizes/quote`, {
      awardId,
      serviceIds,
      clientId: clientId ?? null,
      daysOfScheduleId: daysOfScheduleId ?? null,
    }, { headers: this.authHeaders() }).pipe(
      map(body => {
        const quote = this.unwrap<GiveawayPrizeQuote>(body);
        return quote?.awardId
          ? { kind: 'ready' as const, value: quote }
          : { kind: 'failed' as const, value: null };
      }),
      catchError((error: HttpErrorResponse) => {
        const mine = this.mineFromError(error);
        if (mine.kind === 'verification_required') {
          return of({ kind: 'verification_required' as const, value: null, reason: 'phone_verification_required' });
        }
        const reason = this.reasonOf(error);
        return of({ kind: 'failed' as const, value: null, reason });
      }),
    );
  }

  adminCampaigns(): Observable<GiveawayLoad<GiveawayAdminCampaign[]>> {
    return this.http.get<unknown>(`${this.url}admin/campaigns`, { headers: this.authHeaders() }).pipe(
      map(body => {
        const data = this.unwrap<{ items?: GiveawayAdminCampaign[] }>(body);
        const items = data?.items ?? [];
        return items.length
          ? { kind: 'ready' as const, value: items }
          : { kind: 'empty' as const, value: [] };
      }),
      catchError(() => of<GiveawayLoad<GiveawayAdminCampaign[]>>({ kind: 'failed', value: null })),
    );
  }

  previewAssignment(body: { campaignCode: string; prizeSlotId: string; phone: string; serviceId: string; entryNumber?: number; vkEntryNumber?: number }): Observable<GiveawayLoad<GiveawayPreview>> {
    return this.http.post<unknown>(`${this.url}admin/assignments/preview`, body, { headers: this.authHeaders() }).pipe(
      map(response => ({ kind: 'ready' as const, value: this.unwrap<GiveawayPreview>(response) })),
      catchError((error: HttpErrorResponse) => of({ kind: 'failed' as const, value: null, reason: this.reasonOf(error) })),
    );
  }

  assign(body: {
    entryNumber?: number;
    vkEntryNumber?: number;
    campaignCode: string;
    prizeSlotId: string;
    phone: string;
    serviceId: string;
    expectedSlotVersion: number;
    winnerEvidenceUrl: string;
    note: string;
  }, idempotencyKey: string): Observable<GiveawayLoad<GiveawayAssignment>> {
    const headers = this.authHeaders().set('Idempotency-Key', idempotencyKey);
    return this.http.post<unknown>(`${this.url}admin/assignments`, body, { headers }).pipe(
      map(response => ({ kind: 'ready' as const, value: this.unwrap<GiveawayAssignment>(response) })),
      catchError((error: HttpErrorResponse) => of({ kind: 'failed' as const, value: null, reason: this.reasonOf(error), httpStatus: error.status })),
    );
  }

  recoverAssignment(key: string): Observable<GiveawayLoad<GiveawayAssignment>> {
    const headers = this.authHeaders().set('Idempotency-Key', key);
    return this.http.get<GiveawayAssignment>(`${this.url}admin/assignments/recovery`, { headers }).pipe(
      map(value => ({ kind: 'ready' as const, value })),
      catchError((error: HttpErrorResponse) => of<GiveawayLoad<GiveawayAssignment>>({
        kind: error.status === 404 ? 'empty' : 'failed', value: null,
      })),
    );
  }

  awardHistory(code: string): Observable<GiveawayLoad<GiveawayOwnerAward[]>> {
    const path = `admin/campaigns/${encodeURIComponent(code)}/awards`;
    return this.http.get<GiveawayOwnerAward[]>(this.url + path, { headers: this.authHeaders() }).pipe(
      map(value => ({ kind: 'ready' as const, value })),
      catchError(() => of<GiveawayLoad<GiveawayOwnerAward[]>>({ kind: 'failed', value: null })),
    );
  }

  revoke(awardId: string, reason: string, version: number): Observable<GiveawayLoad<unknown>> {
    return this.command(`admin/awards/${awardId}/revoke`, { reason, expectedVersion: version });
  }

  markPaid(awardId: string, note: string, version: number): Observable<GiveawayLoad<unknown>> {
    return this.command(`admin/awards/${awardId}/paid`, { note, expectedVersion: version });
  }

  private command(path: string, body: unknown): Observable<GiveawayLoad<unknown>> {
    return this.http.post<unknown>(`${this.url}${path}`, body, { headers: this.authHeaders() }).pipe(
      map(response => ({ kind: 'ready' as const, value: this.unwrap(response) })),
      catchError((error: HttpErrorResponse) => of({ kind: 'failed' as const, value: null, reason: this.reasonOf(error) })),
    );
  }

  /** Серверное время задаёт границу фазы; таймер вне Angular не задерживает гидрацию. */
  private publicState(request: () => Observable<GiveawayLoad<GiveawayCampaign>>, publicKey?: string): Observable<GiveawayLoad<GiveawayCampaign>> {
    const key = publicKey ? makeStateKey<GiveawayLoad<GiveawayCampaign>>(`giveaway:${publicKey}`) : null;
    // HTTP transfer cache не сохраняет ошибки. Передаём именно состояние публичного
    // блока, чтобы первый клиентский рендер совпал с SSR даже после таймаута API.
    // Иначе до завершения гидрации старая ветка остаётся рядом с новой.
    if (!isPlatformBrowser(this.platformId)) return request().pipe(tap(value => {
      if (key) this.transfer.set(key, value);
    }));
    return new Observable(observer => {
      if (key && this.transfer.hasKey(key)) {
        observer.next(this.transfer.get(key, { kind: 'loading', value: null }));
        this.transfer.remove(key);
        if (observer.closed) return;
      }
      let timer: ReturnType<typeof setTimeout> | undefined;
      let pending: Subscription | undefined;
      const load = () => {
        if (timer) clearTimeout(timer);
        pending?.unsubscribe();
        pending = request().subscribe(value => {
          this.zone.run(() => observer.next(value));
          if (observer.closed) return;
          const campaign = value.value;
          const until = Date.parse(campaign?.validUntil ?? '');
          const now = Date.parse(campaign?.serverNow ?? '');
          const delay = until > now ? Math.min(30_000, until - now + 50) : 30_000;
          this.zone.runOutsideAngular(() => timer = setTimeout(() => {
            if (document.visibilityState === 'visible') this.zone.run(load);
          }, delay));
        });
      };
      const visible = () => { if (document.visibilityState === 'visible') this.zone.run(load); };
      this.zone.runOutsideAngular(() => document.addEventListener('visibilitychange', visible));
      load();
      return () => {
        pending?.unsubscribe();
        if (timer) clearTimeout(timer);
        document.removeEventListener('visibilitychange', visible);
      };
    });
  }

  private authHeaders(): HttpHeaders {
    let headers = new HttpHeaders(GiveawaysService.NO_STORE);
    if (this.isLoggedIn) {
      headers = headers.set('Authorization', 'Bearer ' + this.cookies.get('auth-token-ocpio'));
    }
    return headers;
  }

  private mineLoad(body: unknown): GiveawayLoad<GiveawayMine> {
    const data = this.unwrap<GiveawayMine>(body);
    if (data?.status === 'verification_required') {
      return { kind: 'verification_required', value: { status: 'verification_required', items: [] } };
    }
    return { kind: 'ready', value: { status: 'ready', serverNow: data?.serverNow, items: data?.items ?? [] } };
  }

  private mineFromError(error: HttpErrorResponse): GiveawayLoad<GiveawayMine> {
    const data = error.error?.data ?? error.error;
    if (error.status === 401 || error.status === 403 || data?.status === 'verification_required') {
      return { kind: 'verification_required', value: { status: 'verification_required', items: [] } };
    }
    return { kind: 'failed', value: null, reason: this.reasonOf(error) };
  }

  private failedOrEmpty<T>(error: HttpErrorResponse): GiveawayLoad<T> {
    if (error.status === 404) {
      return { kind: 'empty', value: null };
    }
    return { kind: 'failed', value: null, reason: this.reasonOf(error) };
  }

  private reasonOf(error: HttpErrorResponse): string | null {
    const data = error.error?.data;
    return error.error?.message || data?.reason || null;
  }

  /** Успех PromoSeat-стиля — само тело. Конверт IResponse разворачиваем и не путаем с ошибкой. */
  private unwrap<T>(body: unknown): T {
    if (body && typeof body === 'object' && 'code' in body && 'data' in body && 'message' in body) {
      const envelope = body as IResponse;
      if (envelope.code >= 400) {
        throw new HttpErrorResponse({ status: envelope.code, error: envelope });
      }
      return envelope.data as T;
    }
    return body as T;
  }
}
