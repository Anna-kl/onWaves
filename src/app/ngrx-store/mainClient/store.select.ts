import {createFeatureSelector, createSelector} from "@ngrx/store";
import { ProfileMainClientState} from "./store.state";

//Получаем Токен Main клиента
export const getTokenMainClient = createFeatureSelector<any>('modeleReducerPoint');
export const selectTokenMainClient = createSelector(getTokenMainClient,
  (state:ProfileMainClientState) => { return state.tokenMainClient;}
);

//Получаем Profile Main клиента
export const getProfileMainClient = createFeatureSelector<ProfileMainClientState>('modeleReducerPoint');
export const selectProfileMainClient = createSelector(getProfileMainClient,
  (state:ProfileMainClientState) => { return state.profileMainClient}
);





//profile2 - это метка редесера в app-modele
// export const selectAllProcileCleintState = createFeatureSelector<ReadonlyArray<string>>('profile2');
// export const selectProfileStore = createFeatureSelector<ReadonlyArray<IViewBusinessProfile>>('profile2');
// export const selectBookCollection = createSelector(
//   selectToken, selectProfileStore, (state) => { return state; });

//Такой способ не сработал!!!
//это мы получаем ProfileClState[];
// export const selectFeature = (state: AppStateState)=>state.appState;
// export const profileStoreTokenSelector= createSelector(selectFeature,(state)=>state.token);
