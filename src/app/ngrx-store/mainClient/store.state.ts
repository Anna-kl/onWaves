//наш основной Model
import {IViewBusinessProfile} from "../../DTO/views/business/IViewBussinessProfile";

export interface ProfileMainClientState {
  tokenMainClient:string;
  profileMainClient:IViewBusinessProfile|null; //наш класс Main клиента для регистрации
}

export interface AppStateState {
  mainProfileClient:ProfileMainClientState;
}

// это как я понял первоначальное значение
export const initialState:ProfileMainClientState = {
  tokenMainClient: "токен MainUser-пустой",
  profileMainClient: null
}
