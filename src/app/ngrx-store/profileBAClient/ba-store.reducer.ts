import {createReducer, on} from "@ngrx/store";
import {initialState} from "./ba-store.state";
import {getActionStateBAProfileClient} from "./ba-store.action";


export const stateReducerBAClient = createReducer(
  initialState,
  on(getActionStateBAProfileClient, (state, {profileBaClient }) => (
    {...state, profileBaClient: profileBaClient})  //profile- из актион идет
  ));
