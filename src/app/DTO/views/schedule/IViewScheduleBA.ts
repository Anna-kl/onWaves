import {RecordStatus} from "../../enums/recordStatus";
import {subGroup} from "../services/IViewSubGroups";
import {Comment} from "../../classes/comments/Comment";
import { INote } from "../records/IViewRecordUser";
import { IPrice } from "../services/IPrice";
import { IRecordLocation } from "../../classes/records/recordLocation";
import { CouponSnapshot } from "../promo/welcome-coupon";

export interface IViewScheduleBA extends INote{
  recordId: string;
  avatar?: any;
  end: Date|string;
  name: string;
  isBreak: string;
  price?: IPrice;
  phone?: string;
  lastChanged?: Date;
  /** Только старые купоны с PIN; у приветственного купона Onwaves поле пустое. */
  couponId?: string;
  /** Снимок приветственного купона на записи: клиент платит payableAmount, Onwaves компенсирует discountAmount. */
  couponSnapshot?: CouponSnapshot | null;
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
