import { ConfirmRecordComponent } from './confirm-record.component';
import { WelcomeQuote } from '../../../DTO/views/promo/welcome-coupon';
import { of, Subject, throwError } from 'rxjs';

describe('Подтверждение скидки авторизованным клиентом', () => {
  let component: any;
  const quote: WelcomeQuote = { originalAmount: 8000, payableAmount: 7500, discountAmount: 500,
    potentialDiscount: 500, couponStatus: 'available', currency: 'RUB' };
  beforeEach(() => {
    component = Object.create(ConfirmRecordComponent.prototype);
    Object.assign(component, { chooseServices: [{ id: 's', price: { price: 8000 } }], businessProfile: { id: 'master' },
      profile: { id: 'client' }, welcomeQuote: quote, promoQuote: null, applyWelcome: true,
      quoteLoading: false, saveInProgress: false, _welcome: { track: () => undefined },
      _reviewRewards: { mine: () => of({ items: [] }) },
      activatedRoute: {snapshot: {queryParamMap: {get: () => null}}} });
    component.recordComment = () => '';
    component.buildLocation = () => null;
    component.submitRecord = jasmine.createSpy('submitRecord');
  });
  it('бесплатная запись не предлагает и не отправляет купон из старого quote', () => {
    component.welcomeQuote = { ...quote, originalAmount: 0, payableAmount: 0,
      discountAmount: 0, couponStatus: 'login_required' };
    expect(component.welcomeOffered).toBeFalse();
    expect(component.welcomeDiscount).toBe(0);
    expect(component.priceSummary.coupon).toBe(0);
    component.onConfirm();
    expect(component.submitRecord.calls.mostRecent().args[1].useWelcomeCoupon).toBeUndefined();
    expect(component.submitRecord.calls.mostRecent().args[1].expectedCouponDiscount).toBeUndefined();
  });
  it('отправляет подтверждённый купон с ожидаемой суммой', () => {
    component.onConfirm();
    expect(component.submitRecord.calls.mostRecent().args[1]).toEqual(jasmine.objectContaining({ useWelcomeCoupon: true, expectedCouponDiscount: 500 }));
  });
  it('передаёт серверную версию индивидуального правила', () => {
    component.welcomeQuote = { ...quote, policyId: 'policy', policyVersion: 3 };
    component.onConfirm();
    expect(component.submitRecord.calls.mostRecent().args[1].expectedWelcomePolicyVersion).toBe(3);
  });
  it('не отправляет недоступный купон, даже если есть потенциальная сумма', () => {
    component.welcomeQuote = { ...quote, couponStatus: 'unavailable', reason: 'already_used', discountAmount: 0, payableAmount: 8000 };
    component.onConfirm();
    expect(component.submitRecord.calls.mostRecent().args[1].useWelcomeCoupon).toBeUndefined();
    expect(component.priceSummary.payable).toBe(8000);
  });

  it('в обычной записи применяет подходящий приз и отправляет сумму 0 без других скидок', () => {
    const findBookingPrize = jasmine.createSpy('findBookingPrize').and.returnValue(of('award'));
    const prizeQuote = jasmine.createSpy('prizeQuote').and.returnValue(of({kind: 'ready', value: {
      status: 'available', originalAmount: 8000, prizeDiscountAmount: 8000, payableAmount: 0,
      awardVersion: 3, quoteVersion: 'new-quote',
    }}));
    Object.assign(component, {
      _welcome: {isLoggedIn: true, quote: jasmine.createSpy('welcomeQuote')},
      _giveaways: {findBookingPrize, prizeQuote},
    });

    component.refreshWelcomeQuote();
    expect(findBookingPrize).toHaveBeenCalledWith('master', ['s'], 'client');
    expect(component.priceSummary.payable).toBe(0);
    expect(component._welcome.quote).not.toHaveBeenCalled();
    component.onConfirm();
    expect(component.submitRecord.calls.mostRecent().args[1]).toEqual(jasmine.objectContaining({
      prizeAwardId: 'award', expectedPrizeVersion: 3, expectedPrizeQuoteVersion: 'new-quote',
      expectedPayableAmount: 0, useWelcomeCoupon: undefined, usePromoSeat: undefined,
    }));
  });
  it('при отказе сервером меняет сумму и ждёт повторного клика', () => {
    component.onCouponRefused({ data: { couponReason: 'already_used', quote: { ...quote,
      couponStatus: 'unavailable', reason: 'already_used', discountAmount: 0, payableAmount: 8000 } } });
    expect(component.applyWelcome).toBeFalse();
    expect(component.priceSummary.payable).toBe(8000);
    expect(component.submitRecord).not.toHaveBeenCalled();
  });
  it('не отправляет запись во время проверки цены', () => {
    component.quoteLoading = true;
    component.onConfirm();
    expect(component.submitRecord).not.toHaveBeenCalled();
  });

  for (const loggedIn of [false, true]) {
    it(`блокирует подтверждение после 500 и сохраняет выбор при повторе (${loggedIn ? 'клиент' : 'гость'})`, () => {
      const date = new Date(2026, 10, 19, 10, 0);
      const request = jasmine.createSpy('quote').and.returnValues(
        throwError(() => new Error('HTTP 500')), of(quote));
      Object.assign(component, {
        dayId: 'day', dayChoose: date,
        _welcome: { isLoggedIn: loggedIn, quote: request, track: () => undefined },
        _giveaways: { findBookingPrize: () => of(null) },
        _promoSeats: { quoteForBooking: () => of(null) },
      });
      component.refreshWelcomeQuote();
      expect(component.quoteLoading).toBeFalse();
      expect(component.quoteError).toContain('Не удалось проверить');
      expect(component.welcomeQuote).toBeNull();
      component.onConfirm();
      expect(component.submitRecord).not.toHaveBeenCalled();
      component.retryBookingQuote();
      expect(component.quoteError).toBe('');
      expect(component.welcomeQuote).toEqual(quote);
      expect(component.dayId).toBe('day');
      expect(component.dayChoose).toBe(date);
      expect(component.chooseServices[0].id).toBe('s');
      expect(request.calls.mostRecent().args[2]).toBe(loggedIn ? 'client' : null);
    });
  }

  it('явное отсутствие права после успешного расчёта разрешает обычную запись', () => {
    const unavailable = { ...quote, couponStatus: 'unavailable', reason: 'master_not_participating', discountAmount: 0, payableAmount: 8000 };
    Object.assign(component, {
      _welcome: { isLoggedIn: true, quote: () => of(unavailable) },
      _giveaways: { findBookingPrize: () => of(null) },
      _promoSeats: { quoteForBooking: () => of(null) },
    });
    component.refreshWelcomeQuote();
    component.onConfirm();
    expect(component.quoteError).toBe('');
    expect(component.submitRecord.calls.mostRecent().args[1].useWelcomeCoupon).toBeUndefined();
  });

  it('поздний ответ старой услуги не затирает новую сумму', () => {
    const old = new Subject<WelcomeQuote>();
    Object.assign(component, {
      _welcome: { isLoggedIn: true, quote: jasmine.createSpy().and.returnValues(old, of(quote)), track: () => undefined },
      _giveaways: { findBookingPrize: () => of(null) },
      _promoSeats: { quoteForBooking: () => of(null) },
    });
    component.refreshWelcomeQuote();
    component.chooseServices = [{ id: 'new-service', price: { price: 8000 } }];
    component.refreshWelcomeQuote();
    old.next({ ...quote, payableAmount: 1 }); old.complete();
    expect(component.welcomeQuote.payableAmount).toBe(7500);
  });

  it('выбранная акция не запускает независимый welcome quote и не суммирует скидки', () => {
    Object.assign(component, {
      activatedRoute: { snapshot: { queryParamMap: { get: (key: string) => key === 'promoCampaign' ? 'soblazn' : null } } },
      _welcome: { isLoggedIn: true, quote: jasmine.createSpy('welcome') },
      _giveaways: { findBookingPrize: () => of(null) },
      _promoSeats: { quoteForBooking: () => of({ status: 'available', campaignCode: 'soblazn',
        recordAmount: 2200, promoDiscount: 1320, payableAmount: 880, couponDiscount: 0, coupon: null }) },
    });
    component.refreshWelcomeQuote();
    expect(component._welcome.quote).not.toHaveBeenCalled();
    expect(component.welcomeQuote).toBeNull();
    expect(component.priceSummary.payable).toBe(880);
    expect(component.priceSummary.promoLabel).toBe('Скидка по акции');
  });

  it('сбой проверки выбранной акции не предлагает перейти на полную цену', () => {
    Object.assign(component, {
      activatedRoute: { snapshot: { queryParamMap: { get: (key: string) => key === 'promoCampaign' ? 'soblazn' : null } } },
      _welcome: { isLoggedIn: true }, _giveaways: { findBookingPrize: () => of(null) },
      _promoSeats: { quoteForBooking: () => throwError(() => new Error('HTTP 500')) },
    });
    component.refreshWelcomeQuote();
    expect(component.quoteError).toBeTruthy();
    expect(component.profilePromoUnavailable).toBeFalse();
    component.onConfirm();
    expect(component.submitRecord).not.toHaveBeenCalled();
  });
  it('после отказа без нового quote больше не предлагает применить недоступный купон', () => {
    component.onCouponRefused({ data: { couponReason: 'already_used' } });
    expect(component.welcomeOffered).toBeFalse();
    expect(component.priceSummary.payable).toBe(8000);
  });

  it('сохраняет приветственный купон и передаёт вместе с ним выбор и версию купонов за отзывы', () => {
    component.selectedRewardIds = ['first', 'second'];
    component.rewardQuote = {
      beforeKopecks: 750000, discountKopecks: 100000, clientPayableKopecks: 650000, version: 'combined',
    };
    expect(component.priceSummary.payable).toBe(6500);
    expect(component.priceSummary.reviewRewardDiscount).toBe(1000);
    component.onConfirm();
    expect(component.submitRecord.calls.mostRecent().args[1]).toEqual(jasmine.objectContaining({
      useWelcomeCoupon: true, expectedCouponDiscount: 500,
      reviewRewardCouponIds: ['first', 'second'], reviewRewardQuoteVersion: 'combined',
    }));
  });

  it('ждёт расчёт выбранных купонов и не резервирует их при нулевом применении', () => {
    component.selectedRewardIds = ['first'];
    component.onConfirm();
    expect(component.submitRecord).not.toHaveBeenCalled();

    component.rewardQuote = { beforeKopecks: 0, discountKopecks: 0, clientPayableKopecks: 0, version: 'fully-covered' };
    component.onConfirm();
    expect(component.submitRecord.calls.mostRecent().args[1].reviewRewardCouponIds).toBeUndefined();
    expect(component.submitRecord.calls.mostRecent().args[1].reviewRewardQuoteVersion).toBeUndefined();
  });
});
