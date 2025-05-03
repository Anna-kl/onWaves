import {Action, createAction, createReducer, on} from "@ngrx/store";
import {IViewNotification} from "../../DTO/views/notifications/IViewNotification";
import {IUpdateState} from "../update/interfaces/IUpdateState";
import {Actions} from "@ngrx/effects";
import {loadSuccessNotification} from "./notification.action";
import {MessageNotification} from "../../DTO/classes/notifications/MessageNotification";
import {INotificationState} from "./interfaces/INotificationState";


const initialNotificationState: INotificationState = {
    isLoad: false,
    isReadMessage: false,
    notification: [],
    isNewMessage: false,
}

const loadNotificationReducer = createReducer(initialNotificationState,
    on(loadSuccessNotification, (state: INotificationState, action): INotificationState => <INotificationState>({
        ...state,
        isLoad: true,
        isNewMessage: false,
        isReadMessage: false,
        notification: action.messages
    })),
)

export function reducers(state: INotificationState, action: Action) {
    return loadNotificationReducer(state, action);
}