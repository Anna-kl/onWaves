import { bookingPrice } from './booking-price';
import { WelcomeQuote } from '../../DTO/views/promo/welcome-coupon';
import { PromoSeatQuote } from '../../DTO/views/promo/promo-seats';
import { subGroup } from '../../DTO/views/services/IViewSubGroups';

describe('Стоимость на всех шагах записи', () => {
  const eligible: WelcomeQuote = { originalAmount: 8000, payableAmount: 7500, discountAmount: 500,
    potentialDiscount: 500, couponStatus: 'available', currency: 'RUB' };
  const services = [{ id: 'service', price: { price: 8000, isRange: false } }] as subGroup[];
  const promo = (coupon = eligible): PromoSeatQuote => ({ status: 'available', seatsLimit: 5, seatsLeft: 3,
    serviceAmount: 8000, promoDiscount: 1600, couponDiscount: 500, recordAmount: 8000, payableAmount: 5900, coupon });

  it('показывает 20 % и купон отдельными строками с суммой сервера 5 900', () => {
    expect(bookingPrice(services, eligible, promo(), true, 'permanent_ozery')).toEqual(jasmine.objectContaining({
      original: 8000, payable: 5900, promo: 1600, coupon: 500, pending: false,
      promoLabel: 'Скидка по акции', termsPath: '/permanent_ozery/usloviya',
    }));
  });

  for (const couponStatus of ['login_required', 'available'] as const) {
    it(`бесплатная запись не показывает купон из старого ответа ${couponStatus}`, () => {
      const free = { ...eligible, originalAmount: 0, payableAmount: 0, couponStatus };
      const freePromo = { ...promo(free), status: 'none' as const, serviceAmount: 0,
        recordAmount: 0, promoDiscount: 0, payableAmount: 0 };
      for (const apply of [true, false]) {
        expect(bookingPrice(services, free, freePromo, apply)).toEqual(jasmine.objectContaining({
          original: 0, payable: 0, coupon: 0, promo: 0, pending: false, termsPath: null,
        }));
      }
    });
  }
  it('exclusive-акция сохраняет серверные 850 ₽ без параллельного купона', () => {
    const coupon = { ...eligible, originalAmount: 1700, payableAmount: 1700,
      potentialDiscount: 0, couponStatus: 'none' as const, reason: 'promo_combination_forbidden' };
    const exclusive = { ...promo(coupon), exclusive: true, recordAmount: 1700,
      serviceAmount: 1700, promoDiscount: 850, couponDiscount: 0, payableAmount: 850 };
    expect(bookingPrice(services, { ...eligible, originalAmount: 1700, payableAmount: 1200 }, exclusive))
      .toEqual(jasmine.objectContaining({ original: 1700, payable: 850, promo: 850, coupon: 0 }));
  });

  it('гость видит потенциальный купон без вычета из суммы к оплате', () => {
    const guest: WelcomeQuote = { ...eligible, discountAmount: 0, payableAmount: 8000, couponStatus: 'login_required' };
    const result = bookingPrice(services, guest, null);
    expect(result).toEqual(jasmine.objectContaining({ payable: 8000, coupon: 0, promo: 0 }));
    expect(result.notice).toContain('после входа');
    expect(bookingPrice(services, { ...guest, policyId: 'individual-rule' }, null).payable).toBe(8000);
  });
  it('авторизованный клиент с правом видит подтверждённый купон', () => {
    const quote = { ...eligible, couponStatus: 'available' as const, discountAmount: 500 };
    expect(bookingPrice(services, quote, null)).toEqual(jasmine.objectContaining({ payable: 7500, coupon: 500, pending: false }));
  });
  it('не показывает неподтверждённую сумму новой программы как точную', () => {
    const quote: WelcomeQuote = { ...eligible, policyId: 'policy', couponStatus: 'unavailable',
      reason: 'price_requires_confirmation', amountKnown: false, discountAmount: 0, originalAmount: 0, payableAmount: 0,
      offerText: 'До 500 ₽ на первый визит к мастеру через OnWaves' };
    const price = bookingPrice(services, quote, null);
    expect(price.unpriced).toBeTrue();
    expect(price.coupon).toBe(0);
    expect(price.couponTerms).toBe(quote.offerText!);
    expect(price.notice).toContain('подтвердить стоимость');
    expect(price.termsPath).toBeNull();
  });
  for (const reason of ['already_used', 'already_reserved', 'not_first_booking', 'expired', 'budget_exhausted']) {
    it(`отказ ${reason} не использует potentialDiscount как доступную скидку`, () => {
      const quote = { ...eligible, couponStatus: 'unavailable' as const, reason, payableAmount: 8000 };
      const price = bookingPrice(services, quote, null);
      expect(price.payable).toBe(8000);
      expect(price.coupon).toBe(0);
      expect(price.pending).toBeFalse();
      expect(price.notice).toBeTruthy();
    });
  }
  it('снятие купона сохраняет скидку акции', () => {
    const price = bookingPrice(services, eligible, promo(), false, 'master');
    expect(price.payable).toBe(6400);
    expect(price.promo).toBe(1600);
    expect(price.coupon).toBe(0);
  });
  it('берёт купон из того же ответа акции, даже если параллельный quote устарел', () => {
    const denied = { ...eligible, couponStatus: 'unavailable' as const, reason: 'already_used', payableAmount: 8000 };
    const seat = { ...promo(denied), couponDiscount: 0, payableAmount: 6400, status: 'available' as const };
    expect(bookingPrice(services, eligible, seat)).toEqual(jasmine.objectContaining({ payable: 6400, coupon: 0, pending: false }));
  });
  it('снятый купон не отменяет скидку мастера, уже учтённую сервером', () => {
    const quote = { ...eligible, originalAmount: 1700, payableAmount: 1160, discountAmount: 200, potentialDiscount: 200 };
    expect(bookingPrice(services, quote, null, false)).toEqual(jasmine.objectContaining({ payable: 1360, promo: 340, coupon: 0 }));
  });
  it('нет кампании или ошибка API не превращают сумму в 0', () => {
    expect(bookingPrice(services, null, null).payable).toBe(8000);
    expect(bookingPrice(services, { ...eligible, originalAmount: 0, payableAmount: 0, couponStatus: 'none' }, null).payable).toBe(8000);
  });
  it('не выдаёт сумму диапазона за точную цену', () => {
    expect(bookingPrice(services, { ...eligible, amountIsFrom: true }, null).isFrom).toBeTrue();
  });
  it('объясняет, почему выбранная дата не подходит под акцию', () => {
    const seat = { ...promo(), status: 'unavailable' as const, reason: 'promo_visit_too_late', promoDiscount: 0, payableAmount: 7500 };
    const price = bookingPrice(services, eligible, seat);
    expect(price.payable).toBe(7500);
    expect(price.notice).toContain('дата позже срока акции');
  });
  it('после пяти мест оставляет купон и не называет сумму обычной ценой', () => {
    const seat = { ...promo(), status: 'unavailable' as const, reason: 'promo_seats_exhausted', promoDiscount: 0, payableAmount: 7500, seatsLeft: 0 };
    const price = bookingPrice(services, eligible, seat, true, 'master');
    expect(price.promo).toBe(0);
    expect(price.coupon).toBe(500);
    expect(price.payable).toBe(7500);
    expect(price.notice).toContain('только купон');
    expect(price.notice).not.toContain('обычн');
  });
});
