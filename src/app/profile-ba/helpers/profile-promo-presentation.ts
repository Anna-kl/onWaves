import { LandingOfferType } from '../../DTO/enums/landingOfferType';
import { LandingTemplateType } from '../../DTO/enums/landingTemplateType';
import { PromoMediaKind } from '../../DTO/enums/promoMediaKind';
import { ILandingOffer } from '../../DTO/views/landing/ILandingOffer';
import { PromoSeatState } from '../../DTO/views/promo/promo-seats';

/** Approved editorial content. Prices, dates, service IDs and availability always come from state. */
export function profilePromoOffer(state: PromoSeatState): ILandingOffer {
  const studioNails = state.code === 'soblazn-nails-60-2026-11';
  return {
    id: state.heroOfferId || state.code,
    offerType: LandingOfferType.Discount,
    templateType: LandingTemplateType.Campaign,
    title: studioNails ? 'Маникюр или педикюр с покрытием' : state.title,
    description: '', buttonText: '', benefits: [], actions: [],
    isActive: true, sortOrder: 0,
    // Published covers of the studio's own manicure/pedicure albums; each was visually checked.
    media: studioNails ? [
      { kind: PromoMediaKind.Image, url: 'https://s3.twcstorage.ru/2fe9c4a7-81a6-4ce2-a0ad-6cf31bfd79fb/thumbs/10ccb511bf5bd4bfc903e531670ecff4c311a4e60e69ec0516e2ba6a1e5420cc.webp' },
      { kind: PromoMediaKind.Image, url: 'https://s3.twcstorage.ru/2fe9c4a7-81a6-4ce2-a0ad-6cf31bfd79fb/thumbs/7dc17840e28f017dbf560fb6a9acb91dcb1cfe5f737428e90546acdf2e11340b.webp' },
    ] : [],
  };
}

export function profilePromoShortNote(state: PromoSeatState): string {
  const note = state.code === 'soblazn-nails-60-2026-11'
    ? 'Дизайн отдельно · снятие чужого покрытия +250 ₽' : '';
  return [note, state.excludeWelcomeCoupon ? 'с купоном не суммируется' : ''].filter(Boolean).join(' · ');
}

export function profilePromoServiceName(name: string): string {
  if (/полный.*педикюр/i.test(name)) return 'Полный педикюр';
  if (/маникюр/i.test(name)) return 'Маникюр';
  return name;
}
