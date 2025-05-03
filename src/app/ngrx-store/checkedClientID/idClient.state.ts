import {createAction, createFeatureSelector, createReducer, createSelector, on, props} from "@ngrx/store";

export interface ChecedIDClientState{
  checedIdClient?:string | null;
}
// export interface AppStateIdClient { baProfileClient:ChecedIDClientState; }
export const initialState:ChecedIDClientState = {
  checedIdClient:null
}


export const getClearStoreID=createAction('[Clear form id for will wtire after] Clear Store')

export const getActionChecedIdClient=createAction('[checed-Id-Client]',
  props<{ checedIdClient:string}>());


//reducer
export const stateReducerChecedIDClient = createReducer(
  initialState,
  on(getClearStoreID,(state) => (
      {...state, checedIdClient: null})  //если хотим стирать стор перед записью -
    // this.store$.dispatch(getClearStoreID());
  ),
  on(getActionChecedIdClient, (state, {checedIdClient }) => (
    {...state, checedIdClient: checedIdClient})  //profile- из актион идет
  ));

//Получаем Токен Main клиента
export const getIdChecedClient = createFeatureSelector<any>('checedIdClient');
export const selectIdChecedClient = createSelector(getIdChecedClient,
  (state:ChecedIDClientState) => { return state.checedIdClient;}
);
