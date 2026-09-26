import { PromoActionKind } from '../../enums/promoActionKind';
import { PromoActionRole } from '../../enums/promoActionRole';

export interface IPromoAction {
  role: PromoActionRole;
  kind: PromoActionKind;
  text: string;
  serviceId?: string | null;
  profileCalculatorId?: string | null;
}
