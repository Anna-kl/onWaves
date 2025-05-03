import {ProfileBAClientState} from "./ba-store.state";
import {createFeatureSelector, createSelector} from "@ngrx/store";

//Получаем Токен BA клиента
export const getProfileMainClient = createFeatureSelector<ProfileBAClientState>('baClientReducer');
export const selectProfileMainAndBaClient = createSelector(getProfileMainClient,
  (state:ProfileBAClientState) => { return state.profileBaClient}
);
