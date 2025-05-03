import {createAction, props} from "@ngrx/store";
import {NotificationActionType} from "./notificationActionType";
import {IViewNotification} from "../../DTO/views/notifications/IViewNotification";


export const requestAction = createAction(
    NotificationActionType.REQUEST,
    props<{request: string}>()
)

export const loadSuccessNotification = createAction(
    NotificationActionType.LOAD,
    props<{messages: IViewNotification[]}>()
);

export const loadNotificationFailed = createAction(
    NotificationActionType.FAILED
);
