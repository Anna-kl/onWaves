import {createAction, props} from "@ngrx/store";
import {IViewBusinessProfile} from "../../DTO/views/business/IViewBussinessProfile";


export const getActionStateBAProfileClient=createAction('[BA-registration-profile]',
  props<{ profileBaClient:IViewBusinessProfile}>());

