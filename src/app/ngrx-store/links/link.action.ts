import {createAction, props} from "@ngrx/store";
import {LinkActionType} from "./linkActionType";
import {ILinkState} from "./interface/ILinkState";

export const setLinkAction = createAction(
  LinkActionType.LINK,
  props<{linkState: ILinkState}>()
)

export const loadLinkAction = createAction(
  LinkActionType.LOAD,
  props<{request: string}>()
)

export const clearLinkAction = createAction(
  LinkActionType.NOTLINK
)
