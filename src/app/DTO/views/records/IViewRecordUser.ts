import {RecordStatus} from "../../enums/recordStatus";
import {subGroup} from "../services/IViewSubGroups";
import {CurrencyType} from "../../enums/currencyType";
import { Comment } from "../../classes/comments/Comment";
import {IViewBusinessProfile} from "../business/IViewBussinessProfile";
import {PaymentMethodType} from "../../enums/paymentMethodType";
import {CouponSnapshot} from "../promo/welcome-coupon";
import { ReviewRewardBookingSnapshot } from '../promo/review-rewards';

export interface IViewRecordUser extends INote{
  id: string;
  isToday: boolean;
  businessProfile: IViewBusinessProfile;
  // status: RecordStatus;
  // start: Date|null;
  // duration: number;
  // price: number;
  // services: subGroup[];
 // statusText?: string;
  currency?: CurrencyType;
 // comments?: Comment[];
 // isCanCancel?: boolean;
  isHasReview?: boolean;
  /** Снимок приветственного купона на записи (сервер считает; здесь только показ). */
  couponSnapshot?: CouponSnapshot | null;
  /** Призовая запись: отдельный снимок, не купон. */
  prizeSnapshot?: CouponSnapshot | null;
  reviewRewards?: ReviewRewardBookingSnapshot | null;
  methodsPayment: PaymentMethodType[];
}

export interface INote {
  status: RecordStatus;
  start: Date|null;
  duration: number;
  services: subGroup[];
  comments?: Comment[];
}
