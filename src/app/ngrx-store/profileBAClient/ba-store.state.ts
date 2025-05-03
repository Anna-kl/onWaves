import {IViewBusinessProfile} from "../../DTO/views/business/IViewBussinessProfile";

export interface ProfileBAClientState{
  profileBaClient:IViewBusinessProfile | null ; //наш класс BA клиента для регистрации
}
export interface AppStateState {
  baProfileClient:ProfileBAClientState;
}
// это как я понял первоначальное значение
export const initialState:ProfileBAClientState = {
  profileBaClient:null
}
