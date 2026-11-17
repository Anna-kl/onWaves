import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, throwError } from 'rxjs';
import { Record } from '../../../DTO/classes/records/record';
import { WelcomeQuote } from '../../../DTO/views/promo/welcome-coupon';
import { formatAmount } from '../../../../helpers/common/welcome-coupon';
import { AnalyticsService } from '../../../../services/analytics.service';
import { QuickSessionService } from '../../../../services/quick-session.service';
import { RecordService } from '../../../../services/record.service';
import { WelcomeCouponService } from '../../../../services/welcome-coupon.service';
import { AuthServices } from '../../../components/modals/services/auth.service';
import { BookingContactModalComponent } from './booking-contact-modal.component';
import { BookingPriceComponent } from '../booking-price/booking-price.component';
import { BookingSuccessComponent } from '../booking-success/booking-success.component';
import { RouterTestingModule } from '@angular/router/testing';
import { bookingPrice } from '../../helpers/booking-price';

describe('BookingContactModalComponent coupon already used', () => {
  let fixture: ComponentFixture<BookingContactModalComponent>;
  let component: BookingContactModalComponent;
  let saveRecord: jasmine.Spy;
  let dropped: string | null;

  const quote: WelcomeQuote = {
    originalAmount: 2000,
    discountAmount: 300,
    payableAmount: 1700,
    couponStatus: 'login_required',
    potentialDiscount: 300,
    currency: 'RUB',
    campaignCode: 'welcome-pilot-2026-09',
  };

  function refusedBody() {
    return {
      code: 409,
      message: 'купон нельзя использовать',
      data: {
        couponReason: 'already_used',
        quote: {
          ...quote,
          couponStatus: 'unavailable' as const,
          reason: 'already_used',
          discountAmount: 0,
          potentialDiscount: 0,
          payableAmount: 2000,
        },
      },
    };
  }

  beforeEach(() => {
    dropped = null;
    saveRecord = jasmine.createSpy('saveRecord');
    const auth = {
      quickRegister: () => of({ code: 200, message: '', data: { token: 't', profileUserId: 'user-1' } }),
    };

    TestBed.overrideComponent(BookingContactModalComponent, {
      set: {
        providers: [
          { provide: AuthServices, useValue: auth },
          { provide: RecordService, useValue: { saveRecord } },
        ],
      },
    });

    TestBed.configureTestingModule({
      declarations: [BookingContactModalComponent],
      imports: [FormsModule, BookingPriceComponent, BookingSuccessComponent, RouterTestingModule],
      providers: [
        NgbActiveModal,
        { provide: QuickSessionService, useValue: { apply: () => undefined } },
        { provide: AnalyticsService, useValue: { trackEvent: () => undefined, trackBooking: () => undefined } },
        { provide: WelcomeCouponService, useValue: { track: () => undefined, invalidateMine: () => undefined } },
      ],
    });

    fixture = TestBed.createComponent(BookingContactModalComponent);
    component = fixture.componentInstance;
    component.masterId = 'master-1';
    component.record = {
      daysOfScheduleId: 'day-1',
      services: [],
      start: '12:00:00',
      useWelcomeCoupon: true,
      expectedCouponDiscount: 300,
    } as Record;
    component.couponQuote = quote;
    component.onCouponDropped = (reason: string) => {
      dropped = reason;
    };
    component.name = 'Анна';
    component.phone = '9161234567';
    component.agree = true;
  });

  it('бесплатная консультация не показывает потенциальный купон из старого ответа', () => {
    component.couponQuote = { ...quote, originalAmount: 0, payableAmount: 0,
      discountAmount: 0, potentialDiscount: 500 };
    fixture.detectChanges();
    expect(component.couponLine).toBeNull();
    expect(fixture.nativeElement.textContent).not.toContain('−500');
    expect(saveRecord).not.toHaveBeenCalled();
  });

  it('показывает, что купон уже использован, и ставит цену без скидки', () => {
    saveRecord.and.returnValue(of(refusedBody()));

    component.submit();

    expect(component.step).toBe('form');
    expect(component.couponNotice).toBe('Купон уже был использован.');
    expect(component.priceLine).toBe(`К оплате ${formatAmount(2000)}`);
    expect(component.couponLine).toBeNull();
    expect(component.submitLabel).toBe('Подтвердить без купона');
    expect(component.record.useWelcomeCoupon).toBeFalse();
    expect(component.record.expectedCouponDiscount).toBeNull();
    expect(dropped).toBe('already_used');
    expect(component.errorMessage).toBeNull();
  });

  it('так же снимает купон, если сервер ответил HTTP 409', () => {
    saveRecord.and.returnValue(throwError(() => new HttpErrorResponse({
      status: 409,
      error: refusedBody(),
    })));

    component.submit();

    expect(component.couponNotice).toBe('Купон уже был использован.');
    expect(component.priceLine).toBe(`К оплате ${formatAmount(2000)}`);
    expect(component.record.useWelcomeCoupon).toBeFalse();
  });

  it('повторная отправка уходит уже без купона', () => {
    saveRecord.and.returnValues(
      of(refusedBody()),
      of({ code: 201, message: '', data: {} }),
    );

    component.submit();
    component.submit();

    expect(saveRecord).toHaveBeenCalledTimes(2);
    const second = saveRecord.calls.mostRecent().args[1] as Record;
    expect(second.useWelcomeCoupon).toBeFalse();
    expect(component.step).toBe('done');
  });

  it('сохраняет цену и купон в DOM успешной записи', () => {
    component.priceSummary = bookingPrice([], quote, null);
    saveRecord.and.returnValue(of({ code: 201, message: '', data: {} }));
    component.submit();
    fixture.detectChanges();
    const price = fixture.nativeElement.querySelector('.booking-done app-booking-price');
    expect(price.textContent).toContain('1 700');
    expect(price.textContent).toContain('300');
    expect(price.textContent).toContain('Купон применён');
    expect(price.textContent).not.toContain('После проверки телефона');
  });

  it('объясняет отказ в DOM, не отправляет запись автоматически и блокирует смену номера после регистрации', () => {
    component.priceSummary = bookingPrice([], quote, null);
    saveRecord.and.returnValue(of(refusedBody()));
    component.submit();
    fixture.detectChanges();
    expect(saveRecord).toHaveBeenCalledTimes(1);
    expect(fixture.nativeElement.querySelector('[role="alert"]').textContent).toContain('Купон уже был использован');
    expect(fixture.nativeElement.querySelector('app-booking-price strong').textContent).toContain('2 000');
    expect(fixture.nativeElement.querySelector('#bcm-phone').readOnly).toBeTrue();
  });

  it('при изменении скидки показывает новую сумму и ждёт повторного подтверждения', () => {
    saveRecord.and.returnValue(of({ code: 409, message: '', data: { couponReason: 'amount_changed',
      quote: { ...quote, couponStatus: 'available', discountAmount: 200, payableAmount: 1800 } } }));
    component.submit();
    fixture.detectChanges();
    expect(component.displayedPrice.payable).toBe(1800);
    expect(component.record.expectedCouponDiscount).toBe(200);
    expect(component.step).toBe('form');
    expect(saveRecord).toHaveBeenCalledTimes(1);
  });
});
