import {subGroup} from "../services/IViewSubGroups";
import {RecordStatus} from "../../enums/recordStatus";
import { StatusNotification } from "../../enums/statusNotification";
import { IRecordLocation } from "../../classes/records/recordLocation";

export interface IViewNotification {
    id: string;
    recordId: string;
    clientName: string;
    avatar?: string;
    /** Относительный URL аватара (бэк 2026-07-18). `avatar` base64 больше не приходит. */
    avatarUrl?: string | null;
    created:Date;
    services: subGroup[];
    recordDateTime: Date;
    recordStatus: RecordStatus;
    dayId: string;
    statusNotification: StatusNotification;
    duration: number;
    start: string;
    isTimeUnlimited: boolean;
    title: string;
    /** Локация брони (RecordLocationView). Для разъездной — адрес выезда клиента. */
    location?: IRecordLocation | null;
}