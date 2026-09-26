import {subGroup} from "../../views/services/IViewSubGroups";
import {IOptionsRecord} from "./optionsRecord";
import {IRecordLocation} from "./recordLocation";

export interface Record {
  id?: string;
  daysOfScheduleId: string;
  services: subGroup[];
  comment?: string;
  start: string;
  clientId?: string;
  options?: IOptionsRecord;
  serverTime?: string;
  /** Только для старых купонов. Приветственный купон выбирается флагом ниже. */
  couponId?: string;
  /**
   * Просим применить приветственный купон Onwaves. Сумму и право сервер считает сам:
   * ожидаемая скидка нужна лишь чтобы сервер не списал молча другую сумму, чем видел клиент.
   */
  useWelcomeCoupon?: boolean;
  expectedCouponDiscount?: number | null;
  /**
   * Локация брони (backend 2026-07-19, `Location`). Для выездной услуги — адрес клиента;
   * для «на месте»/«онлайн» шлём `null` (бэк заполняет сам).
   */
  location?: IRecordLocation | null;
}
