import { LandingTemplateType } from '../../enums/landingTemplateType';
import { ILandingOffer } from './ILandingOffer';
import { ExternalReviewSource } from '../../enums/externalReviewSource';

export interface IViewLanding {
  id?: string;
  templateType: LandingTemplateType;
  isActive: boolean;
  experienceText?: string;
  externalRating?: number | null;
  externalRatingSource?: ExternalReviewSource | null;
  externalReviewCount?: number | null;
  promoBadgeText?: string;
  masterName?: string;
  avatar?: string;
  offers: ILandingOffer[];
}
