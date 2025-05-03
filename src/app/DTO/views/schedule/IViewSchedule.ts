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
