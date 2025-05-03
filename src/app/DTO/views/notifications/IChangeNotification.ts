import {StatusNotification} from "../../enums/statusNotification";

export interface IChangeNotification {
    notificationId: string;
    statusNotification: StatusNotification;
}