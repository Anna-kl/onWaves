import {createAction, props} from "@ngrx/store";
import {IViewBusinessProfile} from "../../DTO/views/business/IViewBussinessProfile";
import {ActionTypes} from "./actions";

export const getActionStateMainProfileClient = createAction(ActionTypes.REGISTER,
  props<{ tokenMainClient: string; profileMainClient:IViewBusinessProfile}>());

export const logoutAction = createAction(
  ActionTypes.LOGOUT,
)

