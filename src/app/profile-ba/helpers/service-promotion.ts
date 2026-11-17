import { PromoSeatState } from '../../DTO/views/promo/promo-seats';
import { subGroup } from '../../DTO/views/services/IViewSubGroups';
import { formatRub } from '../../../helpers/common/welcome-coupon';
import { promoTermsPath } from './promo-seats';
import { masterPromos, promoByLanding, promoEnded } from './promo-terms';

export interface ServicePromotion { title: string; path: string; fragment?: string; }

/** У услуги — только её акция. Общий купон показывается в карточке мастера. */
export function servicePromotion(
  service: subGroup, slug: string | null, state: PromoSeatState | null,
): ServicePromotion | null {
  const priced = state?.services.find(s => s.serviceId === service.id);
  if (priced && state?.status === 'open' && state.seatsLeft > 0 && slug
    && state.discountPercent > 0 && priced.promoDiscount > 0 && Date.parse(state.endsAt) > Date.now()) {
    return { title: `Скидка ${state.discountPercent}%`, path: promoTermsPath(slug) };
  }
  const master = masterPromos(slug);
  const fixedOffer = promoByLanding(slug, null, service.id);
  if (!priced && master && fixedOffer && !promoEnded(master)) {
    const title = fixedOffer.masterPercent != null && fixedOffer.masterPercent > 0
      ? `Скидка ${fixedOffer.masterPercent}%`
      : fixedOffer.masterRub != null && fixedOffer.masterRub > 0
        ? `Скидка ${formatRub(fixedOffer.masterRub)}` : 'Акция';
    return { title, path: `/${slug}/akcii`, fragment: fixedOffer.anchor };
  }
  return null;
}
