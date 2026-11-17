import {
  clock,
  formatScheduleDate,
  ISaveScheduleDay,
  IScheduleConflict,
  IViewPeriod,
  IViewScheduleDay,
  minutesOf,
  mondayOf,
  parseClock,
  SCHEDULE_WEEK_HORIZON_DAYS,
  shiftIsoDate,
  timeFromMinutes,
} from './IViewScheduleWeek';

const WEEKDAY_EVERY = [
  '',
  'Каждый понедельник',
  'Каждый вторник',
  'Каждую среду',
  'Каждый четверг',
  'Каждую пятницу',
  'Каждую субботу',
  'Каждое воскресенье',
];

export function weekdayEveryLabel(dayOfWeek: number): string {
  return WEEKDAY_EVERY[dayOfWeek] ?? 'Каждый такой день';
}

/** Массовое закрытие создаёт исключения в пределах горизонта, а не вечное правило. */
export function weekdayRangeLabel(dayOfWeek: number, today: string): string {
  return `${weekdayEveryLabel(dayOfWeek)} до ${formatScheduleDate(shiftIsoDate(today, SCHEDULE_WEEK_HORIZON_DAYS - 1))}`;
}

/** Будущие даты этого дня недели в горизонте генератора, включая сегодня. */
export function futureSameWeekdays(today: string, dayOfWeek: number): string[] {
  if (!today || dayOfWeek < 1 || dayOfWeek > 7) {
    return [];
  }
  let cursor = shiftIsoDate(mondayOf(today), dayOfWeek - 1);
  if (cursor < today) {
    cursor = shiftIsoDate(cursor, 7);
  }
  const last = shiftIsoDate(today, SCHEDULE_WEEK_HORIZON_DAYS - 1);
  const dates: string[] = [];
  while (cursor <= last) {
    dates.push(cursor);
    cursor = shiftIsoDate(cursor, 7);
  }
  return dates;
}

/** Варианты «С» и «До»: шаг 15 минут внутри часов работы. */
export function quarterHours(work: IViewPeriod | null | undefined): string[] {
  if (!work) {
    return [];
  }
  const first = Math.ceil(minutesOf(work.start) / 15) * 15;
  const last = Math.floor(minutesOf(work.end) / 15) * 15;
  const times: string[] = [];
  for (let minute = first; minute <= last; minute += 15) {
    times.push(clock(timeFromMinutes(minute)));
  }
  return times;
}

export function closeTimeError(start: string, end: string, work: IViewPeriod | null | undefined): string {
  const from = parseClock(start);
  const to = parseClock(end);
  if (!from || !to) {
    return 'Укажите время в полях «С» и «До».';
  }
  if (minutesOf(to) <= minutesOf(from)) {
    return 'Время окончания должно быть позже начала';
  }
  if (minutesOf(from) % 15 !== 0 || minutesOf(to) % 15 !== 0) {
    return 'Шаг — 15 минут';
  }
  if (work && (minutesOf(from) < minutesOf(work.start) || minutesOf(to) > minutesOf(work.end))) {
    return 'Интервал должен быть в пределах рабочих часов.';
  }
  return '';
}

export function sameWindow(left: IViewPeriod, right: IViewPeriod): boolean {
  return clock(left.start) === clock(right.start) && clock(left.end) === clock(right.end);
}

export function windowInside(work: IViewPeriod, block: IViewPeriod): boolean {
  return minutesOf(block.start) >= minutesOf(work.start) && minutesOf(block.end) <= minutesOf(work.end);
}

/**
 * Тело сохранения закрытого окна.
 * scope всегда day: «На все субботы» на сервере пишет часы недели и кладёт окно
 * только на одну дату. Повтор того же окна на другие субботы — отдельные сохранения
 * их собственных часов, без смены начала и конца дня.
 */
export function closeDayBody(day: IViewScheduleDay, blocks: IViewPeriod[]): ISaveScheduleDay {
  return {
    date: day.date,
    isDayOff: false,
    scope: 'day',
    expectedUpdateDate: day.updateDate,
    work: day.work,
    break: day.break,
    blocks,
    breakForSchedule: false,
  };
}

export interface IClosePlan {
  bodies: ISaveScheduleDay[];
  skipped: number;
  /** Почему выбранная дата не попала в план: окно уже есть или у дня нет таких часов. */
  anchorIssue?: 'closed' | 'outside';
}

export function planClose(
  anchor: IViewScheduleDay,
  block: IViewPeriod,
  knownDays: IViewScheduleDay[],
  today: string,
  scope: 'day' | 'weekday',
): IClosePlan {
  const byDate = new Map<string, IViewScheduleDay>();
  for (const day of knownDays) {
    if (day.date) {
      byDate.set(day.date, day);
    }
  }
  // Выбранная дата — та, что на экране: часы формы и её штамп, не повторная загрузка.
  byDate.set(anchor.date, anchor);
  const wanted = scope === 'weekday'
    ? futureSameWeekdays(today || anchor.date, anchor.dayOfWeek)
    : [anchor.date];
  const bodies: ISaveScheduleDay[] = [];
  let skipped = 0;
  let anchorIssue: IClosePlan['anchorIssue'];
  const dates = [...new Set(wanted.includes(anchor.date) ? wanted : [anchor.date, ...wanted])];
  dates.sort((left, right) => {
    if (left === anchor.date) {
      return -1;
    }
    if (right === anchor.date) {
      return 1;
    }
    return left.localeCompare(right);
  });
  for (const date of dates) {
    const day = byDate.get(date);
    if (!day || day.isDayOff || !day.work || !windowInside(day.work, block)) {
      if (date !== anchor.date) {
        skipped += 1;
      } else {
        anchorIssue = 'outside';
      }
      continue;
    }
    if ((day.blocks ?? []).some(item => sameWindow(item, block))) {
      if (date === anchor.date) {
        anchorIssue = 'closed';
      }
      continue;
    }
    bodies.push(closeDayBody(day, [...(day.blocks ?? []), block]));
  }
  return { bodies, skipped, anchorIssue };
}

export function bookingOverlapWarning(conflicts: IScheduleConflict[]): string {
  const listed = (conflicts ?? [])
    .filter(item => !!item?.start)
    .sort((left, right) => left.start.localeCompare(right.start));
  const first = listed[0];
  if (!first) {
    return '';
  }
  const time = first.start.slice(0, 5);
  const service = first.serviceName?.trim();
  const about = service ? `есть запись: ${service}` : 'есть запись';
  return `На ${time} ${about}. Её не отменим — закрыто будет только свободное время`;
}

export function closedRangeLabel(block: IViewPeriod): string {
  return `${clock(block.start)}–${clock(block.end)}`;
}
