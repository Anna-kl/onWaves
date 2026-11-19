import { of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AnalyticsService } from './analytics.service';
import { WelcomeCouponService } from './welcome-coupon.service';

describe('Право на купон при смене сессии', () => {
  it('читает право конкретного мастера и обновляет условия следующим запросом', () => {
    const get = jasmine.createSpy('get').and.returnValue(of({ status: 'available' }));
    const cookies = { check: () => true, get: () => 'session' } as unknown as CookieService;
    const service = new WelcomeCouponService({ get } as unknown as HttpClient, cookies, {} as AnalyticsService);
    service.getMine('client', 'master-a').subscribe();
    expect(get.calls.mostRecent().args[1].params).toEqual({ profileId: 'client', masterId: 'master-a' });
    service.getMine('client', 'master-b').subscribe();
    expect(get.calls.mostRecent().args[1].params.masterId).toBe('master-b');
    service.getOffer('master-a').subscribe();
    service.getOffer('master-a').subscribe();
    expect(get).toHaveBeenCalledTimes(4);
  });
  it('не отдаёт право предыдущего аккаунта из кеша после входа другого', () => {
    let token = 'session-a';
    const get = jasmine.createSpy('get').and.returnValues(of({ status: 'available' }), of({ status: 'redeemed' }));
    const cookies = { check: () => !!token, get: () => token } as unknown as CookieService;
    const service = new WelcomeCouponService({ get } as unknown as HttpClient, cookies, {} as AnalyticsService);
    const statuses: string[] = [];
    service.getMine().subscribe(result => statuses.push(result!.status));
    token = 'session-b';
    service.getMine().subscribe(result => statuses.push(result!.status));
    expect(statuses).toEqual(['available', 'redeemed']);
    expect(get).toHaveBeenCalledTimes(2);
    token = '';
    service.getMine().subscribe(result => expect(result).toBeNull());
    expect(get).toHaveBeenCalledTimes(2);
  });
  it('после создания записи обновляет ранее доступное право', () => {
    const get = jasmine.createSpy('get').and.returnValues(of({ status: 'available' }), of({ status: 'reserved' }));
    const cookies = { check: () => true, get: () => 'session-a' } as unknown as CookieService;
    const service = new WelcomeCouponService({ get } as unknown as HttpClient, cookies, {} as AnalyticsService);
    service.getMine().subscribe();
    service.invalidateMine();
    service.getMine().subscribe(result => expect(result?.status).toBe('reserved'));
    expect(get).toHaveBeenCalledTimes(2);
  });
});

describe('Ошибки расчёта приветственного купона', () => {
  const cookies = { check: () => false } as unknown as CookieService;
  function serviceWith(response: any): WelcomeCouponService {
    return new WelcomeCouponService({ post: () => response } as unknown as HttpClient, cookies, {} as AnalyticsService);
  }

  for (const status of [0, 401, 404, 500]) {
    it(`передаёт технический отказ ${status} экрану записи вместо null`, () => {
      const error = new HttpErrorResponse({ status });
      serviceWith(throwError(() => error)).quote('master', ['service']).subscribe({
        next: () => fail('Нельзя подменять сбой успешным расчётом'),
        error: actual => expect(actual).toBe(error),
      });
    });
  }

  it('сохраняет явный отказ в праве штатным ответом', () => {
    const quote = { couponStatus: 'unavailable' as const, reason: 'master_not_participating',
      originalAmount: 2200, payableAmount: 2200, discountAmount: 0, potentialDiscount: 0, currency: 'RUB' };
    serviceWith(of(quote)).quote('master', ['service']).subscribe(actual => expect(actual).toEqual(quote));
  });

  it('пустой HTTP-ответ не считается проверенной ценой без купона', () => {
    serviceWith(of(null)).quote('master', ['service']).subscribe({
      next: () => fail('Ожидался DTO расчёта'),
      error: actual => expect(actual.message).toContain('не вернул расчёт'),
    });
  });
});
