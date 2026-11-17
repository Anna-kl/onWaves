import {RecordStatus} from "../../enums/recordStatus";
import {subGroup} from "../services/IViewSubGroups";
import {Comment} from "../../classes/comments/Comment";
import { INote } from "../records/IViewRecordUser";
import { IPrice } from "../services/IPrice";
import { IRecordLocation } from "../../classes/records/recordLocation";
import { CouponSnapshot } from "../promo/welcome-coupon";
import { ReviewRewardBookingSnapshot } from '../promo/review-rewards';

export interface VisitPayment {
  kind: 'giveaway_prize' | 'promo_seat' | 'welcome' | 'legacy_coupon' | 'master_discount' | 'review_reward';
  clientPays: number | null;
  onwavesPays: number | null;
  status: 'pending' | 'earned' | 'paid' | 'cancelled' | 'review' | 'legacy' | 'none' | 'test';
  amountIsFrom?: boolean;
  couponAmount?: number | null;
  masterDiscountAmount?: number | null;
  offerTitle?: string | null;
  masterReceives?: number | null;
}

export interface IViewScheduleBA extends INote{
  recordId: string;
  /** График дня записи. null — выезд/онлайн; undefined — ответ старого API. */
  schedulePointId?: string | null;
  avatar?: any;
  end: Date|string;
  name: string;
  isBreak: string;
  price?: IPrice;
  phone?: string;
  lastChanged?: Date;
  durationRevision?: number;
  /** Только старые купоны с PIN; у приветственного купона Onwaves поле пустое. */
  couponId?: string;
  /** Снимок приветственного купона на записи: клиент платит payableAmount, Onwaves компенсирует discountAmount. */
  couponSnapshot?: CouponSnapshot | null;
  visitPayment?: VisitPayment | null;
  reviewRewards?: ReviewRewardBookingSnapshot | null;
  isNew?: boolean;
  /**
   * Контакты клиента в мессенджерах. Пусто = канал не подключён, кнопку не показываем
   * и уходим в SMS по номеру. По номеру телефона канал не достраиваем: t.me/+7… открывает
   * пустой чат у незарегистрированного, а у MAX ссылки по номеру нет вовсе.
   */
  telegram?: string;
  max?: string;
  /** Id уведомления с бэка; для mark read через notifications/change-status. Иначе используется recordId. */
  notificationId?: string;
  /** Локация брони (RecordLocationView). Для разъездной — адрес выезда клиента. */
  location?: IRecordLocation | null;
}
