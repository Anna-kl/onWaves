import {createReducer, on} from "@ngrx/store";
import {initialState} from "./store.state";
import {clearActiveProfileAction, getActionStateMainProfileClient, logoutAction, renewSessionTokenAction} from "./store.action";

export const stateReducerMainClient = createReducer(
  initialState,
  on(renewSessionTokenAction, (state, { token }) => ({ ...state, tokenMainClient: token })),
  on(getActionStateMainProfileClient, (state,
                                       {tokenMainClient, profileMainClient}) => (
    {...state, tokenMainClient: tokenMainClient, profileMainClient: profileMainClient})  //profile- из актион идет
  ),
  on(clearActiveProfileAction, state => ({
    ...state,
    profileMainClient: null,
  })),
  on(logoutAction, ()  => ({
  ...initialState,
})));



// export function reducer(state= initialState, action:Action){
//   return profileClReduser(state, action);
// }
