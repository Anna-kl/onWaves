import {
  MARY_PROMOS,
  masterSaleRub,
  onlinePayRub,
  organizerReady,
  promoByLanding,
  promoEnded,
  promoPriceRub,
  PROMO_ORGANIZER,
} from './promo-terms';

describe('promo terms', () => {
  const legs = MARY_PROMOS.offers[0];
  const skin = MARY_PROMOS.offers[1];

  it('counts the legs online total from the list price', () => {
    expect(masterSaleRub(legs)).toBe(340);
    expect(promoPriceRub(legs)).toBe(1360);
    expect(onlinePayRub(legs)).toBe(1160);
  });

  it('keeps the SKINHALE master price apart from the coupon', () => {
    expect(masterSaleRub(skin)).toBe(2000);
    expect(promoPriceRub(skin)).toBe(5000);
    expect(onlinePayRub(skin)).toBe(4500);
  });

  it('finds a promo by the landing key', () => {
    expect(promoByLanding('mary', 'mary-sugar-legs', null)?.anchor).toBe('sugar-legs');
    expect(promoByLanding('other', 'mary-sugar-legs', null)).toBeNull();
  });

  it('stays unpublished until the organizer name and INN are filled', () => {
    expect(organizerReady(PROMO_ORGANIZER)).toBeFalse();
    expect(organizerReady({ ...PROMO_ORGANIZER, name: 'ИП Иванова', inn: '123' })).toBeTrue();
  });

  it('marks the campaign finished after the end instant', () => {
    expect(promoEnded(MARY_PROMOS, new Date('2026-11-30T20:00:00Z'))).toBeFalse();
    expect(promoEnded(MARY_PROMOS, new Date('2026-11-30T21:00:00Z'))).toBeTrue();
  });
});
