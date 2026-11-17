import { PromoSeatState } from '../../DTO/views/promo/promo-seats';

/** Даты без локализованного «г.»: обе формы условий добавляют «года» сами. */
export function promoMoscowDate(value: string | number | null | undefined, withYear = true): string {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const parts = new Intl.DateTimeFormat('ru', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Moscow',
  }).formatToParts(date);
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find(item => item.type === type)?.value ?? '';
  return `${part('day')} ${part('month')}${withYear ? ` ${part('year')}` : ''}`;
}

export function promoStatusNotice(state: PromoSeatState): string | null {
  if (state.closedReason === 'disabled') return 'Акция пока не включена. Запись по её условиям недоступна.';
  if (state.closedReason === 'not_started') return `Акция начнётся ${promoMoscowDate(state.startsAt)} года.`;
  if (state.status === 'closed') return 'Места по акции закончились или срок истёк.';
  return null;
}

/** Период и статус читаются из того же state, что и серверная таблица цен. */
export function promoPeriodText(state: PromoSeatState): string {
  const lastMoment = Date.parse(state.endsAt) - 1;
  const lastDay = promoMoscowDate(lastMoment);
  const sameYear = state.startsAt && promoMoscowDate(state.startsAt).split(' ').pop() === lastDay.split(' ').pop();
  const start = state.startsAt ? `с ${promoMoscowDate(state.startsAt, !sameYear)}${sameYear ? '' : ' года'} по ` : 'до ';
  return `Записаться по акции можно ${start}${lastDay} года включительно или пока не закончатся места. Визит по акционной записи — не позже ${promoMoscowDate(state.visitDeadline)} года.`;
}
