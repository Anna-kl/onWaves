import {subGroup} from "../services/IViewSubGroups";
import {RecordStatus} from "../../enums/recordStatus";

export interface IViewNotification {
    id: string;
    recordId: string;
    clientName: string;
    avatar?: string;
    created:Date;
    services: subGroup[];
    recordDateTime: Date;
    recordStatus: RecordStatus;
    dayId: string;
}