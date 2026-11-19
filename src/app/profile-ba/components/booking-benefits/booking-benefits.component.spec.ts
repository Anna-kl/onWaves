import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { BookingBenefitsComponent } from './booking-benefits.component';
import { WelcomeCouponService } from '../../../../services/welcome-coupon.service';
import { PromoSeatsService } from '../../../../services/promo-seats.service';
import { GiveawaysService } from '../../../../services/giveaways.service';

describe('Расчёт на выборе услуги и даты', () => {
  for (const scenario of [
    { name: 'Соблазн, 60 %', original: 2200, discount: 1320, payable: 880 },
    { name: 'другой мастер, 20 %', original: 8000, discount: 1600, payable: 6400 },
  ]) {
    it(`не придумывает процент и сохраняет серверные суммы: ${scenario.name}`, () => {
      const welcome = { originalAmount: scenario.original, payableAmount: scenario.original,
        discountAmount: 0, potentialDiscount: 0, couponStatus: 'none', currency: 'RUB' };
      const promo = { status: 'login_required', recordAmount: scenario.original, promoDiscount: scenario.discount,
        payableAmount: scenario.payable, couponDiscount: 0, coupon: welcome, seatsLimit: 5, seatsLeft: 3 };
      TestBed.configureTestingModule({ imports: [BookingBenefitsComponent, RouterTestingModule], providers: [
        { provide: WelcomeCouponService, useValue: { isLoggedIn: false, quote: () => of(welcome) } },
        { provide: PromoSeatsService, useValue: { quoteForBooking: () => of(promo) } },
        { provide: GiveawaysService, useValue: { findBookingPrize: () => of(null) } },
        { provide: Store, useValue: { select: () => of(null) } },
      ] });
      const fixture = TestBed.createComponent(BookingBenefitsComponent);
      fixture.componentRef.setInput('masterId', 'master');
      fixture.componentRef.setInput('services', [{ id: 'service', price: { price: scenario.original } }]);
      fixture.detectChanges();
      const text = (fixture.nativeElement.textContent as string).replace(/\s+/g, ' ');
      expect(text).toContain('Скидка по акции');
      expect(text).not.toContain('%');
      expect(fixture.componentInstance.price?.payable).toBe(scenario.payable);
      expect(fixture.componentInstance.price?.promo).toBe(scenario.discount);
      expect(text).toContain(scenario.payable.toLocaleString('ru-RU').replace(/\s+/g, ' '));
    });
  }

  it('показывает сбой вместо цены, повтор восстанавливает серверный расчёт', () => {
    const quote = jasmine.createSpy('quote').and.returnValues(throwError(() => new Error('HTTP 500')),
      of({ originalAmount: 2200, payableAmount: 1900, discountAmount: 300,
        potentialDiscount: 300, couponStatus: 'available', currency: 'RUB' }));
    TestBed.configureTestingModule({ imports: [BookingBenefitsComponent, RouterTestingModule], providers: [
      { provide: WelcomeCouponService, useValue: { isLoggedIn: false, quote } },
      { provide: PromoSeatsService, useValue: { quoteForBooking: () => of(null) } },
      { provide: GiveawaysService, useValue: { findBookingPrize: () => of(null) } },
      { provide: Store, useValue: { select: () => of(null) } },
    ] });
    const fixture = TestBed.createComponent(BookingBenefitsComponent);
    fixture.componentRef.setInput('masterId', 'master');
    fixture.componentRef.setInput('services', [{ id: 'service', price: { price: 2200 } }]);
    fixture.detectChanges();
    expect(fixture.componentInstance.price).toBeNull();
    expect(fixture.nativeElement.textContent).toContain('Не удалось проверить стоимость');
    const retry = fixture.nativeElement.querySelector('button');
    expect(retry).not.toBeNull(); retry.click(); fixture.detectChanges();
    expect(fixture.componentInstance.failed).toBeFalse();
    expect(fixture.componentInstance.price?.payable).toBe(1900);
    expect(fixture.componentInstance.services[0].id).toBe('service');
  });
});
