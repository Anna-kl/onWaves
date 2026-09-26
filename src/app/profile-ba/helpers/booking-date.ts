export const BOOKING_TIMEZONE = 'Europe/Moscow';

export function toCalendarDate(date: Date): string {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0')
  ].join('-');
}

export function toClockTime(date: Date): string {
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

/**
 * «Сейчас» в бизнес-таймзоне через `Intl.DateTimeFormat` с фиксированной зоной — в отличие
 * от `new Date()`/`getTimezoneOffset()`, не зависит от таймзоны хоста. Это важно именно
 * здесь: SSR-сервер и браузер клиента могут быть в разных зонах, и такое расхождение уже
 * один раз давало рассинхрон рендера (см. docs/backend/booking-free-slots-consistency.md).
 */
export function nowInBookingTimezone(): { date: string; time: string } {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: BOOKING_TIMEZONE,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hour12: false, hourCycle: 'h23'
  }).formatToParts(new Date());
  const part = (type: string) => parts.find(p => p.type === type)?.value ?? '';
  return {
    date: `${part('year')}-${part('month')}-${part('day')}`,
    time: `${part('hour')}:${part('minute')}`
  };
}

/**
 * Слот уже наступил или прошёл относительно текущего момента в бизнес-таймзоне.
 * Временный предохранитель на фронте, пока на бэке не починен расчёт «сейчас» в
 * SlotCalculator (docs/backend/booking-free-slots-consistency.md §8.4) — снять вместе
 * с тем фиксом.
 */
export function isPastBookingSlot(day: string, time: string): boolean {
  const now = nowInBookingTimezone();
  return day !== now.date ? day < now.date : time <= now.time;
}

export function fromCalendarDateTime(date: string, time: string): Date | null {
  const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  const timeMatch = /^(\d{2}):(\d{2})$/.exec(time);
  if (!dateMatch || !timeMatch) return null;

  const [, year, month, day] = dateMatch.map(Number);
  const [, hours, minutes] = timeMatch.map(Number);
  const result = new Date(year, month - 1, day, hours, minutes, 0, 0);

  return result.getFullYear() === year &&
    result.getMonth() === month - 1 &&
    result.getDate() === day &&
    result.getHours() === hours &&
    result.getMinutes() === minutes
    ? result
    : null;
}
