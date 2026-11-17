import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { AnalyticsService } from './analytics.service';

describe('AnalyticsService на тестовом хосте', () => {
  let ym: jasmine.Spy;
  let push: jasmine.Spy;

  beforeEach(() => {
    ym = jasmine.createSpy('ym');
    push = jasmine.createSpy('push');
    (window as unknown as { ym: jasmine.Spy; _tmr: { push: jasmine.Spy } }).ym = ym;
    (window as unknown as { _tmr: { push: jasmine.Spy } })._tmr = { push };
    TestBed.configureTestingModule({
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
    });
  });

  it('не инициализирует хиты и цели вне onwaves.online', () => {
    const analytics = TestBed.inject(AnalyticsService);
    analytics.trackPage('/mary?utm_source=test', 'Mary');
    analytics.trackBooking('mary', 'svc');
    analytics.trackCall('mary');
    analytics.trackMessenger('mary');
    analytics.trackMeasurement('cellings', 'measure');
    expect(ym).not.toHaveBeenCalled();
    expect(push).not.toHaveBeenCalled();
  });
});
