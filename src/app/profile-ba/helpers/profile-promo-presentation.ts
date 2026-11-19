import { LandingOfferType } from '../../DTO/enums/landingOfferType';
import { LandingTemplateType } from '../../DTO/enums/landingTemplateType';
import { PromoMediaKind } from '../../DTO/enums/promoMediaKind';
import { ILandingOffer } from '../../DTO/views/landing/ILandingOffer';
import { PromoSeatState } from '../../DTO/views/promo/promo-seats';

export function profilePromoShortTitle(state: PromoSeatState): string { return state.title.trim(); }

export function profilePromoOffer(state: PromoSeatState): ILandingOffer {
  return {id: state.heroOfferId || state.code, offerType:LandingOfferType.Discount, templateType:LandingTemplateType.Campaign,
    title:state.title,description:'',buttonText:'',benefits:[],actions:[],isActive:true,sortOrder:0,media:[]};
}

export function profilePromoShortNote(state: PromoSeatState): string {
  return state.excludeWelcomeCoupon ? 'с купоном не суммируется' : '';
}

export function profilePromoServiceName(name: string): string {
  if (/полный.*педикюр/i.test(name)) return 'Полный педикюр';
  if (/маникюр/i.test(name)) return 'Маникюр';
  return name;
}
