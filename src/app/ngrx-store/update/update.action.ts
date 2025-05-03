import {createAction, props} from "@ngrx/store";
import {UpdateActionType} from "./updateActionType";
import {NotificationActionType} from "../notification/notificationActionType";

export const requestUpdate = createAction(
    UpdateActionType.NOUPDATE,
    props<{request: string}>()
)
export const noUpdateRequest = createAction(
    UpdateActionType.NOUPDATE,
    props<{request: string}>()
)

export const isUpdateRequest = createAction(
    UpdateActionType.ISUPDATE,
    props<{flag: boolean}>()
);

export const loadNotificationFailed = createAction(
    UpdateActionType.FAILED
);