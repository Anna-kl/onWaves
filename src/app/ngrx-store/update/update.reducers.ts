import {Action,  createReducer, on} from "@ngrx/store";
import {IUpdateState} from "./interfaces/IUpdateState";
import {isUpdateRequest} from "./update.action";

const initialUpdateState: IUpdateState = {
    isLoad: false,
    isUpdate: false,

}
export const loadUpdateReducer = createReducer(
    initialUpdateState,
    on(isUpdateRequest, (state: IUpdateState, action): IUpdateState => <IUpdateState>({
        ...state,
        isLoad: true,
        isUpdate: action.flag
    })))

export function reducersGallery(state: IUpdateState, action: Action) {
    return loadUpdateReducer(state, action);
}