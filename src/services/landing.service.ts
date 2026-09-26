import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, shareReplay, tap } from 'rxjs';
import { environment } from '../enviroments/environment';
import { IResponse } from '../app/DTO/classes/IResponse';
import { IViewLanding } from '../app/DTO/views/landing/IViewLanding';
import { LandingLoadResult } from '../app/profile-ba/helpers/landing-state';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LandingService {
  private url = environment.Uri + 'landing/';
  /**
   * Дедупликация одновременных подписчиков. В Map только полёт запроса
   * и успешный code === 200; отказ не фиксируем — следующий вызов бьёт API снова.
   */
  private landingByProfile = new Map<string, Observable<LandingLoadResult>>();

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.cookieService.get('auth-token-ocpio');
    return new HttpHeaders().set('Authorization', 'Bearer ' + token);
  }

  getLanding(profileId: string): Observable<LandingLoadResult> {
    let cached = this.landingByProfile.get(profileId);
    if (!cached) {
      const token = this.cookieService.get('auth-token-ocpio');
      // Гостевой GET — стабильный URL: SSR, transfer cache и резолвер.
      // `_` только в кабинете (JWT): после PUT иначе снова старая карточка.
      cached = this.http.get<IResponse>(`${this.url}${profileId}`, token
        ? {
            params: { _: String(Date.now()) },
            headers: new HttpHeaders({
              'Cache-Control': 'no-cache',
              Pragma: 'no-cache',
            }),
          }
        : {}).pipe(
        map(res => this.parseEnvelope(res)),
        catchError(err => of(this.parseTransportError(err))),
        tap(result => {
          if (!result.ok) {
            this.landingByProfile.delete(profileId);
            console.error(`[landing] GET ${this.url}${profileId}`, result.message);
          }
        }),
        shareReplay({ bufferSize: 1, refCount: false })
      );
      this.landingByProfile.set(profileId, cached);
    }
    return cached;
  }

  createLanding(profileId: string, landing: Partial<IViewLanding>): Observable<IResponse> {
    return this.http.post<IResponse>(`${this.url}${profileId}`, landing, {
      headers: this.getAuthHeaders()
    }).pipe(tap(res => this.afterWrite(profileId, res, landing)));
  }

  updateLanding(profileId: string, landing: Partial<IViewLanding>): Observable<IResponse> {
    return this.http.put<IResponse>(`${this.url}${profileId}`, landing, {
      headers: this.getAuthHeaders()
    }).pipe(tap(res => this.afterWrite(profileId, res, landing)));
  }

  deleteLanding(profileId: string): Observable<IResponse> {
    return this.http.delete<IResponse>(`${this.url}${profileId}`, {
      headers: this.getAuthHeaders()
    }).pipe(tap(() => this.invalidate(profileId)));
  }

  toggleLanding(profileId: string, isActive: boolean): Observable<IResponse> {
    return this.http.put<IResponse>(
      `${this.url}${profileId}/toggle?isActive=${isActive}`,
      null,
      { headers: this.getAuthHeaders() }
    ).pipe(tap(() => this.invalidate(profileId)));
  }

  private afterWrite(
    profileId: string,
    res: IResponse,
    fallback?: Partial<IViewLanding>
  ): void {
    this.invalidate(profileId);
    const code = res?.code ?? (res as IResponse & { Code?: number }).Code;
    if (code !== 200 && code !== 201) {
      return;
    }
    const landing = this.asLanding(res?.data) ?? this.asLanding(fallback);
    if (landing) {
      this.remember(profileId, landing);
    }
  }

  private remember(profileId: string, landing: IViewLanding): void {
    this.landingByProfile.set(
      profileId,
      of({ ok: true as const, landing }).pipe(shareReplay({ bufferSize: 1, refCount: false }))
    );
  }

  private asLanding(value: unknown): IViewLanding | null {
    if (!value || typeof value !== 'object') {
      return null;
    }
    const offers = (value as IViewLanding).offers;
    return Array.isArray(offers) ? value as IViewLanding : null;
  }

  private invalidate(profileId: string): void {
    this.landingByProfile.delete(profileId);
  }

  getTemplates(): Observable<IResponse> {
    return this.http.get<IResponse>(`${this.url}templates`);
  }

  /** Сжимаем на клиенте, файл — в S3 (тот же бакет, что галерея). */
  uploadImage(profileId: string, file: File): Observable<IResponse> {
    const form = new FormData();
    form.append('file', file, file.name);
    return this.http.post<IResponse>(`${this.url}${profileId}/image`, form, {
      headers: this.getAuthHeaders()
    });
  }

  /** Успех — только `code === 200`. Транспортный статус на текущем бэке не несёт этой информации. */
  private parseEnvelope(res: IResponse): LandingLoadResult {
    if (res?.code === 200) {
      return { ok: true, landing: (res.data as IViewLanding) ?? null };
    }
    return {
      ok: false,
      landing: null,
      message: res?.message || 'Ошибка при получении лендинга',
    };
  }

  private parseTransportError(err: unknown): LandingLoadResult {
    if (err instanceof HttpErrorResponse) {
      const fromBody = (err.error as IResponse | null)?.message;
      return {
        ok: false,
        landing: null,
        message: fromBody || err.message || 'Ошибка сети',
      };
    }
    return { ok: false, landing: null, message: 'Ошибка сети' };
  }
}
