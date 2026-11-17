import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from '../app/auth/login.service';
import { inputKopecks } from '../app/owner-operations/operations-format';
import { OwnerOperationsService } from './owner-operations.service';

describe('OwnerOperationsService privacy', () => {
  let token: BehaviorSubject<string>; let loaded: BehaviorSubject<boolean>; let http: HttpTestingController; let service: OwnerOperationsService;
  function setup(platform = 'browser', initialized = true) {
    token = new BehaviorSubject('fixture-session'); loaded = new BehaviorSubject(initialized);
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule], providers: [OwnerOperationsService,
      { provide: PLATFORM_ID, useValue: platform }, { provide: Store, useValue: { select: () => token } },
      { provide: CookieService, useValue: { get: () => token.value } }, { provide: LoginService, useValue: { isLoad$: loaded } }] });
    service = TestBed.inject(OwnerOperationsService); http = TestBed.inject(HttpTestingController);
  }
  afterEach(() => { http?.verify({ ignoreCancelled: true }); TestBed.resetTestingModule(); });
  it('hides the menu until server capabilities arrive and uses explicit Bearer/no-store', () => {
    setup(); let allowed: boolean | null = null; service.access$.subscribe(x => allowed = x);
    expect(allowed).toBeNull(); const req = http.expectOne(r => r.url.endsWith('/owner-operations/access'));
    expect(req.request.headers.get('Authorization')).toBe('Bearer fixture-session'); expect(req.request.headers.get('Cache-Control')).toBe('no-store');
    req.flush({ canAccessOwnerOperations: true }); expect(allowed).toBeTrue();
  });
  it('waits for normal auth initialization', () => {
    setup('browser', false); http.expectNone(r => r.url.includes('owner-operations'));
    loaded.next(true); const req = http.expectOne(r => r.url.endsWith('/access')); expect(req.request.method).toBe('GET'); req.flush({ canAccessOwnerOperations: false });
  });
  it('does not request private data or capabilities during SSR', () => {
    setup('server'); service.get('summary').subscribe({ error: () => {} }); http.expectNone(r => r.url.includes('owner-operations'));
  });
  it('cancels in-flight financial reads and resets capabilities on logout/account change', () => {
    setup(); http.expectOne(r => r.url.endsWith('/access')).flush({ canAccessOwnerOperations: true });
    let received = false; service.get('summary').subscribe(() => received = true);
    const summary = http.expectOne(r => r.url.endsWith('/summary')); token.next('');
    expect(summary.cancelled).toBeTrue(); expect(received).toBeFalse(); let allowed: boolean | null = null; service.access$.subscribe(x => allowed = x); expect(allowed).toBeFalse();
    token.next('other-session'); expect(allowed).toBeNull(); http.expectOne(r => r.url.endsWith('/access')).flush({ canAccessOwnerOperations: false }); expect(allowed).toBeFalse();
  });
  it('does not treat business envelope failures as zero/empty success', () => {
    setup(); http.expectOne(r => r.url.endsWith('/access')).flush({ canAccessOwnerOperations: true });
    let status = 0; service.get('summary').subscribe({ error: e => status = e.status });
    http.expectOne(r => r.url.endsWith('/summary')).flush({ code: 503, message: 'Source failed', data: null }); expect(status).toBe(503);
  });
  it('parses entered money without calculating any contribution in Angular', () => {
    expect(inputKopecks('1200,50')).toBe(120050); expect(inputKopecks('0.01')).toBe(1); expect(inputKopecks('')).toBeNull(); expect(() => inputKopecks('12.345')).toThrow();
  });
});
