export interface IChooseDayOfCalendar {
  date: Date|null;
  dayId?: string;
  ifExist: boolean;
  isLast?: boolean;
  canAdd?: boolean;
  countNew?: number;
}
