import {MessageNotification} from "../../../DTO/classes/notifications/MessageNotification";
import {IViewNotification} from "../../../DTO/views/notifications/IViewNotification";

export interface INotificationState {
    isLoad: boolean;
    isNewMessage: boolean;
    isReadMessage: boolean;
    notification: IViewNotification[];
}