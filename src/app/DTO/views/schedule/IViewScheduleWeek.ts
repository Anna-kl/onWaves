export interface IViewTime {
  hour: string;
  minutes: string;
}

export interface IViewPeriod {
  start: IViewTime;
  end: IViewTime;
}

export interface IScheduleConflict {
  recordId?: string | null;
  start: string;
  duration: number;
  /** Название услуги, если сервер его прислал. В контракте недели его пока нет. */
  serviceName?: string;
}

export interface IViewScheduleDay {
  date: string;
  dayOfWeek: number;
  work: IViewPeriod | null;
  /** Последние часы даты, сохранённые при включении выходного. Не доступность для записи. */
  savedWork?: IViewPeriod | null;
  break: IViewPeriod | null;
  blocks: IViewPeriod[];
  breakShared: boolean;
  isDayOff: boolean;
  source: number;
  isToday: boolean;
  isNearestWorking: boolean;
  updateDate: string | null;
  conflicts: IScheduleConflict[];
}

export interface IViewScheduleWeek {
  /** Последняя реально сохранённая рабочая дата. undefined — старый API. */
  lastWorkingDate?: string | null;
  scheduleMode: number;
  templateConfirmed: boolean;
  todayDate: string;
  period: number;
  gapAfterMinutes: number;
  days: IViewScheduleDay[];
}

export interface IViewScheduleWeekday {
  dayOfWeek: number;
  work: IViewPeriod | null;
  break: IViewPeriod | null;
  isDayOff: boolean;
}

export interface IViewScheduleTemplate {
  lastWorkingDate?: string | null;
  confirmed: boolean;
  period: number;
  gapAfterMinutes: number;
  weekdays: IViewScheduleWeekday[];
  skipped: string[];
}

export interface ISaveScheduleDay {
  date: string;
  isDayOff: boolean;
  scope: 'day' | 'weekday';
  expectedUpdateDate?: string | null;
  work?: IViewPeriod | null;
  break?: IViewPeriod | null;
  blocks?: IViewPeriod[];
  breakForSchedule?: boolean;
}

const WEEKDAY_SHORT = ['', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const WEEKDAY_NAME = ['', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
const WEEKDAY_ALL = ['', 'понедельники', 'вторники', 'среды', 'четверги', 'пятницы', 'субботы', 'воскресенья'];
const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
const MONTHS_SHORT = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];

export function weekdayShort(dayOfWeek: number): string {
  return WEEKDAY_SHORT[dayOfWeek] ?? '';
}

export function weekdayName(dayOfWeek: number): string {
  return WEEKDAY_NAME[dayOfWeek] ?? '';
}

export function weekdayAllLabel(dayOfWeek: number): string {
  const name = WEEKDAY_ALL[dayOfWeek];
  return name ? `На все ${name}` : 'На все такие дни';
}

export function weekdayFollow(dayOfWeek: number): string {
  const name = WEEKDAY_ALL[dayOfWeek];
  return name
    ? `Часы перейдут на следующие ${name}. Другие дни недели не изменятся.`
    : 'Часы перейдут на такие же дни. Остальные дни недели не изменятся.';
}

export function weekSpan(dates: string[]): string {
  if (!dates.length) {
    return '';
  }
  const first = dates[0].split('-').map(Number);
  const last = dates[dates.length - 1].split('-').map(Number);
  if (first.length < 3 || last.length < 3) {
    return dates[0];
  }
  if (first[1] === last[1]) {
    return `${first[2]}–${last[2]} ${MONTHS[(first[1] ?? 1) - 1] ?? ''}`;
  }
  return `${first[2]} ${MONTHS_SHORT[(first[1] ?? 1) - 1] ?? ''} – ${last[2]} ${MONTHS_SHORT[(last[1] ?? 1) - 1] ?? ''}`;
}

/** Столько дней вперёд генератор уже создаёт строки. Назад — тот же запас, чтобы посмотреть прошедшие недели. */
export const SCHEDULE_WEEK_HORIZON_DAYS = 56;

export function mondayOf(iso: string): string {
  const parts = iso.split('-').map(Number);
  if (parts.length < 3 || !parts[0] || !parts[1] || !parts[2]) {
    return iso;
  }
  const date = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
  const dow = date.getUTCDay();
  const isoDow = dow === 0 ? 7 : dow;
  return shiftIsoDate(iso, 1 - isoDow);
}

export function weekShiftAllowed(weekStart: string, today: string, step: -1 | 1): boolean {
  if (!weekStart || !today) {
    return false;
  }
  const edgeDay = shiftIsoDate(today, step === 1 ? SCHEDULE_WEEK_HORIZON_DAYS - 1 : -SCHEDULE_WEEK_HORIZON_DAYS);
  const edge = mondayOf(edgeDay);
  return step === 1 ? weekStart < edge : weekStart > edge;
}

export function shiftIsoDate(iso: string, days: number): string {
  const parts = iso.split('-').map(Number);
  if (parts.length < 3 || !parts[0] || !parts[1] || !parts[2]) {
    return iso;
  }
  const next = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2] + days));
  const month = String(next.getUTCMonth() + 1).padStart(2, '0');
  const day = String(next.getUTCDate()).padStart(2, '0');
  return `${next.getUTCFullYear()}-${month}-${day}`;
}

export function dayRelation(date: string, today: string): string {
  if (!today) {
    return '';
  }
  if (date === today) {
    return 'сегодня';
  }
  if (date === shiftIsoDate(today, 1)) {
    return 'завтра';
  }
  return '';
}

export function formatScheduleDate(iso: string): string {
  const parts = iso.split('-').map(Number);
  if (parts.length < 3 || !parts[1] || !parts[2]) {
    return iso;
  }
  return `${parts[2]} ${MONTHS[parts[1] - 1] ?? ''}`;
}

export function clock(time: IViewTime | null | undefined): string {
  if (!time) {
    return '';
  }
  return `${String(time.hour).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}`;
}

export function parseClock(value: string, allowEndOfDay = false): IViewTime | null {
  const match = /^(\d{2}):(\d{2})$/.exec(value ?? '');
  if (!match) {
    return null;
  }
  const hour = Number(match[1]);
  const minutes = Number(match[2]);
  if (hour > 24 || minutes > 59 || (hour === 24 && (!allowEndOfDay || minutes !== 0))) {
    return null;
  }
  return { hour: match[1], minutes: match[2] };
}

export function hoursLabel(day: { isDayOff: boolean; work: IViewPeriod | null }): string {
  if (day.isDayOff || !day.work) {
    return 'Выходной';
  }
  return `${clock(day.work.start)}–${clock(day.work.end)}`;
}

export function timeFromMinutes(total: number): IViewTime {
  const hour = Math.floor(total / 60);
  const minutes = total % 60;
  return {
    hour: String(hour).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
  };
}

export function minutesOf(time: IViewTime | null | undefined): number {
  if (!time) {
    return 0;
  }
  return Number(time.hour) * 60 + Number(time.minutes);
}
