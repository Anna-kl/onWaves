import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NgZone, TransferState, makeStateKey } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CookieService } from 'ngx-cookie-service';
import { take } from 'rxjs';
import { environment } from '../enviroments/environment';
import { GiveawaysService } from './giveaways.service';

describe('Обновление публичной фазы розыгрыша', () => {
  let http: HttpTestingController;
  let service: GiveawaysService;
  const zone = { run: (fn: () => unknown) => fn(), runOutsideAngular: (fn: () => unknown) => fn() } as NgZone;
  const url = environment.Uri + 'giveaways/svetlana-vk-2026-11';
  const active = { code: 'svetlana-vk-2026-11', phase: 'active',
    serverNow: '2026-11-09T17:59:59Z', validUntil: '2026-11-09T18:00:00Z' };

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    http = TestBed.inject(HttpTestingController);
    service = new GiveawaysService(TestBed.inject(HttpClient), { check: () => false } as unknown as CookieService,
      zone, 'browser' as unknown as object, TestBed.inject(TransferState));
  });
  afterEach(() => http.verify());

  it('обновляет фазу на серверной границе и останавливается при уходе со страницы', fakeAsync(() => {
    const phases: string[] = [];
    const sub = service.getCampaign(active.code).subscribe(load => { if (load.value) phases.push(load.value.phase); });
    http.expectOne(url).flush(active);
    tick(1049);
    http.expectNone(url);
    tick(1);
    http.expectOne(url).flush({ ...active, phase: 'awaiting_results', validUntil: null });
    expect(phases).toEqual(['active', 'awaiting_results']);
    sub.unsubscribe();
    tick(60_000);
    http.expectNone(url);
  }));

  it('разовый потребитель не оставляет таймер и повторный запрос', fakeAsync(() => {
    service.getCampaign(active.code).pipe(take(1)).subscribe();
    http.expectOne(url).flush(active);
    tick(60_000);
    http.expectNone(url);
  }));

  it('первым выдаёт SSR-ошибку, затем успешный ответ: состояния не смешиваются при гидрации', fakeAsync(() => {
    const transfer = TestBed.inject(TransferState);
    const key = makeStateKey<any>('giveaway:campaign:svetlana-vk-2026-11');
    transfer.set(key, { kind: 'failed', value: null });
    const kinds: string[] = [];
    const sub = service.getCampaign(active.code).subscribe(load => kinds.push(load.kind));
    expect(kinds).toEqual(['failed']);
    expect(transfer.hasKey(key)).toBeFalse();
    http.expectOne(url).flush(active);
    expect(kinds).toEqual(['failed', 'ready']);
    sub.unsubscribe();
  }));

  it('сохраняет на SSR также ошибку, которую HTTP transfer cache не передаёт', () => {
    const transfer = TestBed.inject(TransferState);
    const server = new GiveawaysService(TestBed.inject(HttpClient), { check: () => false } as unknown as CookieService,
      zone, 'server' as unknown as object, transfer);
    server.publicList('home').subscribe();
    http.expectOne(r => r.url === environment.Uri + 'giveaways').flush(null, { status: 503, statusText: 'Unavailable' });
    expect(transfer.get(makeStateKey<any>('giveaway:list:home:'), null)).toEqual({ kind: 'failed', value: null });
  });

  it('не переносит административное превью в публичный HTML', () => {
    const transfer = TestBed.inject(TransferState);
    const server = new GiveawaysService(TestBed.inject(HttpClient), { check: () => false } as unknown as CookieService,
      zone, 'server' as unknown as object, transfer);
    server.getCampaign(active.code, true).subscribe();
    http.expectOne(environment.Uri + 'giveaways/admin/campaigns/' + active.code + '/preview').flush(active);
    expect(transfer.hasKey(makeStateKey<any>('giveaway:campaign:' + active.code))).toBeFalse();
  });
});
