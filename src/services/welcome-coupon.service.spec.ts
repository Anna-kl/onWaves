import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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
