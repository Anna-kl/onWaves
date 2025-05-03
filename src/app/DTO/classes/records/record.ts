import {subGroup} from "../../views/services/IViewSubGroups";
import {IOptionsRecord} from "./optionsRecord";

export interface Record {
  daysOfScheduleId: string;
  services: subGroup[];
  comment?: string;
  start: string;
  clientId?: string;
  options?: IOptionsRecord;
  serverTime?: string;
}
