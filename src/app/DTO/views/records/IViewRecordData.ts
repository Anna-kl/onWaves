import {subGroup} from "../services/IViewSubGroups";
import {IViewBusinessProfile} from "../business/IViewBussinessProfile";
import {IOptionsRecord} from "../../classes/records/optionsRecord";
import { RecordStatus } from "../../enums/recordStatus";

export interface IViewRecordData {
    id: string;
    start: string;
    recordId: string;
    day: Date;
    services: subGroup[];
    comment?: string;
    clientId: string;
    daysOfScheduleId: string;
    profile: IViewBusinessProfile;
    options: IOptionsRecord;
    serverTime: string;
    status: RecordStatus;
}