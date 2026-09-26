import {IFreeSlotSchedule} from './IFreeSlotSchedule';

/**
 * Почему список слотов пуст. Заполняется бэком только когда `slots` пуст.
 * Список открытый — незнакомое значение трактуем как обычное «нет свободных слотов».
 * Контракт: docs/backend/booking-free-slots-consistency.md
 */
export type FreeSlotsReason =
  | 'not_working_day'
  | 'day_passed'
  | 'too_late_today'
  | 'fully_booked'
  | 'service_too_long'
  /** Услуга не передана или её длительность ≤ 0 — ошибка интеграции, пользователю не показываем. */
  | 'invalid_duration';

export interface IFreeSlotsResponse {
  /** Варианты времени начала: шаг — период расписания мастера, поэтому соседние слоты могут перекрываться. */
  slots: IFreeSlotSchedule[];
  reason: FreeSlotsReason | string | null;
  /** Настройка сервера (сейчас одна на всех). Для расчётов достовернее `utcOffsetMinutes`. */
  timezone?: string;
  /** Смещение таймзоны бизнеса из профиля мастера. */
  utcOffsetMinutes?: number;
  /** За сколько минут до начала запись закрывается. Бэк уже отфильтровал по нему слоты. */
  minLeadTimeMinutes?: number;
}
