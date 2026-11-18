import { ConfirmRecordComponent } from './confirm-record.component';
import { WelcomeQuote } from '../../../DTO/views/promo/welcome-coupon';
import { of } from 'rxjs';

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
