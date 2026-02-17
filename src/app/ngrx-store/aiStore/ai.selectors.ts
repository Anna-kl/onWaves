import {createAction, createFeatureSelector, createSelector, props} from "@ngrx/store";
import { IAIState } from "./IAIState";



export const aiSelectors =
    createFeatureSelector<IAIState>('aiStore');

export const aiCurrentState = createSelector(aiSelectors,
    (state: IAIState) =>
           state
)

// export const notificationCountMessages = createSelector(notificationSelectors,
//     (messages: INotificationState) =>
//         messages.notification?.length
// )