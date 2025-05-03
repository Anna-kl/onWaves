import {createAction, createFeatureSelector, createSelector, props} from "@ngrx/store";
import {INotificationState} from "./interfaces/INotificationState";
import {LinkActionType} from "../links/linkActionType";
import {ILinkState} from "../links/interface/ILinkState";

export const notificationSelectors =
    createFeatureSelector<INotificationState>('notification');

export const notificationMessages = createSelector(notificationSelectors,
    (messages: INotificationState) =>
           messages.notification
)

export const notificationCountMessages = createSelector(notificationSelectors,
    (messages: INotificationState) =>
        messages.notification.length
)