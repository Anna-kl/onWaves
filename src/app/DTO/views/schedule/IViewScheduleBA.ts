import {RecordStatus} from "../../enums/recordStatus";
import {subGroup} from "../services/IViewSubGroups";
import {Comment} from "../../classes/comments/Comment";
import { INote } from "../records/IViewRecordUser";
import { IPrice } from "../services/IPrice";

export interface IViewScheduleBA extends INote{
  recordId: string;
  avatar?: any;
  end: Date|string;
  name: string;
  isBreak: string;
  price?: IPrice;
  phone?: string;
  lastChanged?: Date;
}
