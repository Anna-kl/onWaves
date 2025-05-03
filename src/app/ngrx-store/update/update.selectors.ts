import {createFeatureSelector, createSelector} from "@ngrx/store";
import {IUpdateState} from "./interfaces/IUpdateState";

export const selectUpdateGallery =
    createFeatureSelector<IUpdateState>('updateGallery');

export const updateSelector = createSelector(selectUpdateGallery,
    (flag: IUpdateState) =>
          flag
)
//
// export const notificationCountMessages = createSelector(updateSelectors,
//     (messages: INotificationState) =>
//         messages.notification.length
// )