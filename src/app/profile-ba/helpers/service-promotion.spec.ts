import { servicePromotion } from './service-promotion';
import { subGroup } from '../../DTO/views/services/IViewSubGroups';
import { PromoSeatState } from '../../DTO/views/promo/promo-seats';
import { MARY_PROMOS } from './promo-terms';

describe('Короткие акции рядом с услугой', () => {
  const service = { id: 's' } as subGroup;
  let state: PromoSeatState;

  beforeEach(() => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date('2026-11-03T10:00:00Z'));
    state = {
      code: 'permanent', title: 'Перманент', status: 'open',
      seatsLeft: 2, seatsLimit: 5, discountPercent: 20,
      endsAt: '2026-12-01T00:00:00+03:00', visitDeadline: '2026-12-31',
      services: [{ serviceId: 's', name: 'Перманент', listAmount: 8000,
        promoDiscount: 1600, couponDiscount: 500, clientPays: 5900 }],
    };
  });
  afterEach(() => jasmine.clock().uninstall());

  it('показывает только скидку и ссылку на условия без текста о купоне', () => {
    expect(servicePromotion(service, 'master', state)).toEqual({
      title: 'Скидка 20%', path: '/master/usloviya',
    });
  });

  it('берёт процент из состояния акции', () => {
    state.discountPercent = 15;
    expect(servicePromotion(service, 'master', state)?.title).toBe('Скидка 15%');
  });

  it('не добавляет плашку купона услугам без отдельной акции', () => {
    expect(servicePromotion(service, 'master', null)).toBeNull();
    expect(servicePromotion({ id: 'consultation' } as subGroup, 'master', state)).toBeNull();
  });

  for (const reason of ['ended', 'seats_exhausted', 'disabled'] as const) {
    it(`скрывает плашку при закрытии акции: ${reason}`, () => {
      expect(servicePromotion(service, 'master', { ...state, status: 'closed', closedReason: reason })).toBeNull();
    });
  }

  it('скрывает плашку при нуле мест и наступлении срока даже со старым open', () => {
    expect(servicePromotion(service, 'master', { ...state, seatsLeft: 0 })).toBeNull();
    jasmine.clock().mockDate(new Date(state.endsAt));
    expect(servicePromotion(service, 'master', state)).toBeNull();
  });

  it('не показывает нулевую скидку или ссылку без slug', () => {
    expect(servicePromotion(service, 'master', { ...state, discountPercent: 0 })).toBeNull();
    state.services[0].promoDiscount = 0;
    expect(servicePromotion(service, 'master', state)).toBeNull();
    expect(servicePromotion(service, null, state)).toBeNull();
  });

  it('сохраняет отдельные акции Mary в процентах и рублях с нужными условиями', () => {
    const legs = { id: MARY_PROMOS.offers[0].serviceId } as subGroup;
    const skin = { id: MARY_PROMOS.offers[1].serviceId } as subGroup;
    expect(servicePromotion(legs, 'mary', null)).toEqual({
      title: 'Скидка 20%', path: '/mary/akcii', fragment: 'sugar-legs',
    });
    expect(servicePromotion(skin, 'mary', null)).toEqual({
      title: 'Скидка 2\u00a0000 ₽', path: '/mary/akcii', fragment: 'skinhale',
    });
    jasmine.clock().mockDate(new Date(MARY_PROMOS.endsAt));
    expect(servicePromotion(legs, 'mary', null)).toBeNull();
  });
});
