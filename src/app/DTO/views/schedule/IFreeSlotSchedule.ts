import {TimeSpan} from "../../classes/schedules/timeSpan";

export interface IFreeSlotSchedule {
  start: string|Date;
  end?: string|Date;
  isChoose?: boolean;
}
