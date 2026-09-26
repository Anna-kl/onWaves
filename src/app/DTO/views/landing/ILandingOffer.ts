import { LandingOfferType } from '../../enums/landingOfferType';
import { LandingTemplateType } from '../../enums/landingTemplateType';
import { ILandingBenefit } from './ILandingBenefit';
import { IPromoAction } from './IPromoAction';
import { IPromoCalculator } from './IPromoCalculator';
import { IPromoMedia } from './IPromoMedia';

export interface ILandingOffer {
  id?: string;
  offerType: LandingOfferType;
  /** Шаблон карточки. Legacy: читать с лендинга. */
  templateType?: LandingTemplateType | null;
  badge?: string | null;
  title: string;
  titleBold?: string;
  description: string;
  buttonText: string;
  footerNote?: string;
  discountPercent?: number | null;
  serviceId?: string | null;
  serviceName?: string;
  /** Подпись на фото. Legacy-дубль badge. */
  slogan?: string | null;
  imageUrl?: string | null;
  galleryUrls?: string[] | null;
  actions?: IPromoAction[] | null;
  media?: IPromoMedia[] | null;
  calculator?: IPromoCalculator | null;
  validFrom?: string | null;
  validTo?: string | null;
  analyticsKey?: string | null;
  isActive: boolean;
  sortOrder: number;
  benefits: ILandingBenefit[];
}
