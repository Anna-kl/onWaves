import {RecordStatus} from "../enums/recordStatus";

export interface ISendRecord {
  id: string;
  status: RecordStatus;
}
