import { BenefitIconType } from '../../DTO/enums/benefitIconType';
import { LandingOfferType } from '../../DTO/enums/landingOfferType';
import { ILandingOffer } from '../../DTO/views/landing/ILandingOffer';
import { PromoSeatState } from '../../DTO/views/promo/promo-seats';
import { organizerLine, promoPriceFromQuote, promoSeatBenefits, promoSeatCard, promoSeatLead, seatsCaption, seatsLeftText } from './promo-seats';
import { PromoSeatQuote } from '../../DTO/views/promo/promo-seats';

describe('promo seats', () => {
  const state = (seatsLeft: number, status: 'open' | 'closed' = 'open'): PromoSeatState => ({
    code: 'permanent',
    title: 'Перманент',
    status,
    seatsLimit: 5,
    seatsLeft,
    discountPercent: 20,
    endsAt: '2026-11-30T20:59:59Z',
    visitDeadline: '2026-12-31T00:00:00Z',
    heroOfferId: 'hero',
    services: [{ serviceId: 'brows', name: 'Брови', listAmount: 7000, promoDiscount: 1400, couponDiscount: 500, clientPays: 5100 }],
    organizer: null,
  });
  const offer = (id: string, serviceId: string | null): ILandingOffer => ({
    id,
    serviceId,
    offerType: LandingOfferType.Discount,
    title: '',
    description: '',
    buttonText: '',
    isActive: true,
    sortOrder: 0,
    benefits: [
      { iconType: BenefitIconType.Percent, title: '5 100 ₽ вместо 7 000 ₽', description: 'старая подпись' },
      { iconType: BenefitIconType.Clock, title: '1,5–2 часа', description: '' },
    ] as ILandingOffer['benefits'],
  });

  it('says how many seats are left and switches to the last one', () => {
    expect(seatsLeftText(4, 5)).toBe('Осталось 4 из 5 мест');
    expect(seatsLeftText(1, 5)).toBe('Осталось одно место');
    expect(seatsCaption(4, 5)).toBe('Скидка и купон от OnWaves · первым 5 записавшимся · осталось 4 из 5 мест');
  });

  it('shows the organizer only when it is filled', () => {
    expect(organizerLine(null)).toBeNull();
    expect(organizerLine({ name: '  ' })).toBeNull();
    expect(organizerLine({ name: 'ИП Иванова', inn: '123' })).toBe('Организатор — ИП Иванова, ИНН 123.');
  });

  it('puts the counter on the hero and the caption on the service card', () => {
    const hero = promoSeatCard(state(4), offer('hero', 'brows'), 'permanent_ozery');
    expect(hero?.hero).toBeTrue();
    expect(hero?.seatsText).toBe('Осталось 4 из 5 мест');
    expect(hero?.termsPath).toBe('/permanent_ozery/usloviya');
    expect(hero?.pending).toBeFalse();
    expect(hero?.serviceId).toBe('brows');
    expect(hero?.serviceName).toBe('Брови');
    expect(hero?.listAmount).toBe(7000);
    expect(hero?.promoDiscount).toBe(1400);
    expect(hero?.couponDiscount).toBe(500);
    expect(hero?.clientPays).toBe(5100);
    expect(hero?.discountPercent).toBe(20);

    const brows = promoSeatCard(state(4), offer('brows-card', 'brows'), 'permanent_ozery');
    expect(brows?.hero).toBeFalse();
    const benefits = promoSeatBenefits(offer('brows-card', 'brows').benefits, brows);
    expect(benefits[0].description).toBe('Скидка и купон от OnWaves · первым 5 записавшимся · осталось 4 из 5 мест');

    expect(promoSeatCard(state(4), offer('other', 'cleaning'), 'permanent_ozery')).toBeNull();
  });

  it('hides promo prices when seats are gone', () => {
    const closed = state(0, 'closed');
    const brows = promoSeatCard(closed, offer('brows-card', 'brows'), 'permanent_ozery');
    expect(brows?.open).toBeFalse();
    const benefits = promoSeatBenefits(offer('brows-card', 'brows').benefits, brows);
    expect(benefits.length).toBe(1);
    expect(benefits[0].iconType).toBe(BenefitIconType.Clock);
    expect(brows?.clientPays).toBeNull();
    expect(brows?.listAmount).toBeNull();
    expect(brows?.pending).toBeFalse();
    expect(promoSeatCard(closed, offer('hero', null), 'permanent_ozery')?.open).toBeFalse();
    expect(promoSeatLead('Визит. По спецпредложению — 5\u00A0100\u00A0₽ вместо 7\u00A0000\u00A0₽.', brows)).toBe('Визит.');
  });

  it('keeps the offer while the campaign is not enabled yet', () => {
    const draft = state(0, 'closed');
    draft.closedReason = 'disabled';
    const hero = promoSeatCard(draft, offer('hero', 'brows'), 'permanent_ozery');
    expect(hero?.pending).toBeTrue();
    expect(hero?.open).toBeFalse();
    expect(hero?.seatsText).toBeNull();
    expect(hero?.termsPath).toBe('/permanent_ozery/usloviya');
    const brows = promoSeatCard(draft, offer('brows-card', 'brows'), 'permanent_ozery');
    expect(promoSeatBenefits(offer('brows-card', 'brows').benefits, brows).length).toBe(2);
    expect(promoSeatLead('По спецпредложению — 5 100 ₽ вместо 7 000 ₽.', brows)).toContain('5 100');
  });

  it('copies the server quote and drops 20% after the seats are gone', () => {
    const quote = (status: PromoSeatQuote['status'], reason: string | null, promo: number, coupon: number, payable: number): PromoSeatQuote => ({
      status, reason, seatsLimit: 5, seatsLeft: status === 'unavailable' ? 0 : 4,
      serviceId: 'peel', serviceAmount: 3000, promoDiscount: promo, couponDiscount: coupon,
      recordAmount: 3000, payableAmount: payable, coupon: {} as PromoSeatQuote['coupon'],
    });
    const open = promoPriceFromQuote(quote('login_required', 'login_required', 600, 300, 2100), 'Карбоновый пилинг', 20);
    expect(open).toEqual(jasmine.objectContaining({
      listAmount: 3000, promoDiscount: 600, couponDiscount: 300, payable: 2100,
      discountPercent: 20, seatsLeft: 4, pendingCheck: true,
    }));
    expect(open?.notice).toContain('возможная цена');

    const after = promoPriceFromQuote(quote('unavailable', 'promo_seats_exhausted', 0, 300, 2700), 'Карбоновый пилинг', 20);
    expect(after?.promoDiscount).toBe(0);
    expect(after?.couponDiscount).toBe(300);
    expect(after?.payable).toBe(2700);
    expect(after?.seatsLeft).toBeNull();
    expect(after?.notice).toContain('только купон');
    expect(promoPriceFromQuote(quote('none', null, 0, 0, 3000), 'Карбоновый пилинг', 20)).toBeNull();
  });
});
