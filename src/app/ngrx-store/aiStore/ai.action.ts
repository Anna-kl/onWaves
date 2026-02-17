import {createAction, props} from "@ngrx/store";
import {IViewNotification} from "../../DTO/views/notifications/IViewNotification";
import { AIActionType } from "./AIActionType";
import { IAIState } from "./IAIState";


export const requestAIAction = createAction(
    AIActionType.REQUEST,
    props<{request: FormData}>()
)

export const loadSuccessAIState = createAction(
    AIActionType.LOAD,
    props<{state: IAIState}>()
);

export const loadFailedAIState = createAction(
    AIActionType.FAILED
);
