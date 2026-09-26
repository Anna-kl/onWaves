import { BenefitIconType } from '../../enums/benefitIconType';

export interface ILandingBenefit {
  id?: string;
  iconType: BenefitIconType;
  title: string;
  description: string;
  sortOrder: number;
}
