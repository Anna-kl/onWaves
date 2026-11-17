import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { DestroyRef, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, catchError, distinctUntilChanged, filter, fromEvent, map, Observable, of, Subject, switchMap, take, takeUntil, tap, throwError, timeout } from 'rxjs';
import { environment } from '../enviroments/environment';
import { LoginService } from '../app/auth/login.service';
import { selectTokenMainClient } from '../app/ngrx-store/mainClient/store.select';

@Injectable({ providedIn: 'root' })
export class OwnerOperationsService {
  private readonly url = environment.Uri + 'owner-operations/';
  private readonly capability = new BehaviorSubject<boolean | null>(null);
  readonly access$ = this.capability.asObservable();
  readonly cleared$ = new Subject<void>();
  readonly browser: boolean;
  private generation = 0;
  private token = '';
  constructor(private http: HttpClient, private cookies: CookieService, private store: Store, private login: LoginService,
    @Inject(PLATFORM_ID) platform: object, destroyRef: DestroyRef) {
    this.browser = isPlatformBrowser(platform);
    if (!this.browser) return;
    this.login.isLoad$.pipe(filter(Boolean), take(1), switchMap(() => this.store.select(selectTokenMainClient)), distinctUntilChanged(),
      tap(token => { this.token = token || ''; this.clear(); }), switchMap(() => this.check()), takeUntilDestroyed(destroyRef))
      .subscribe(allowed => this.capability.next(allowed));
    fromEvent(window, 'offline').pipe(takeUntilDestroyed(destroyRef)).subscribe(() => this.clear());
    fromEvent(window, 'online').pipe(switchMap(() => this.check()), takeUntilDestroyed(destroyRef)).subscribe(value => this.capability.next(value));
  }
  clear(): void { this.generation++; this.capability.next(null); this.cleared$.next(); }
  private check(): Observable<boolean> {
    if (!this.browser || !this.token || !navigator.onLine) return of(false);
    const generation = this.generation;
    return this.get<{ canAccessOwnerOperations: boolean }>('access').pipe(
      map(value => generation === this.generation && value.canAccessOwnerOperations === true), catchError(() => of(false)));
  }
  allowed(): Observable<boolean> { return this.access$.pipe(filter((x): x is boolean => x !== null), take(1), timeout(12000), catchError(() => of(false))); }
  get<T>(path: string, query: Record<string, string | number | boolean | null | undefined> = {}): Observable<T> {
    let params = new HttpParams();
    Object.entries(query).forEach(([key, value]) => { if (value !== null && value !== undefined && value !== '') params = params.set(key, String(value)); });
    return this.request<T>('GET', path, undefined, params);
  }
  post<T>(path: string, body: unknown): Observable<T> { return this.request<T>('POST', path, body); }
  put<T>(path: string, body: unknown): Observable<T> { return this.request<T>('PUT', path, body); }
  private request<T>(method: string, path: string, body?: unknown, params?: HttpParams): Observable<T> {
    if (!this.browser || !this.cookies.get('auth-token-ocpio') || !navigator.onLine) return throwError(() => new HttpErrorResponse({ status: 401 }));
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.cookies.get('auth-token-ocpio'), 'Cache-Control': 'no-store', Pragma: 'no-cache' });
    return this.http.request<T>(method, this.url + path, { body, params, headers }).pipe(timeout(20000), take(1), takeUntil(this.cleared$),
      map(value => {
        const envelope = value as { code?: number; data?: T; message?: string };
        if (typeof envelope?.code === 'number') {
          if (envelope.code >= 400) throw new HttpErrorResponse({ status: envelope.code, error: envelope });
          return envelope.data as T;
        }
        return value;
      }), catchError(error => {
        if (error.status === 401 || error.status === 403) { this.clear(); this.capability.next(false); }
        return throwError(() => error);
      }));
  }
}
