export interface IViewSchedule {
  daysOfWork: IDaysOfSchedule[];
  work: IPeriod;
  break: IPeriod;
  isActive: boolean;
  id?: string;
  name: string;
  isShowWork?: boolean;
  isShowBreak?: boolean;
  isName?: boolean;
  period: number;
  /** Пауза между заказами, минуты. 0 или нет поля — встык. */
  gapAfterMinutes?: number;
}

export interface IPeriod{
  start: ITime;
  end: ITime;
}

export interface ITime{
  hour: string;
  minutes: string;
}

export interface IDaysOfSchedule {
  id?: string;
  daysOfWork: Date;
  addDate?: Date;
  scheduleId?: string;
}
