import { PromoMediaKind } from '../../enums/promoMediaKind';

export interface IPromoMedia {
  url: string;
  kind: PromoMediaKind;
  posterUrl?: string | null;
}
