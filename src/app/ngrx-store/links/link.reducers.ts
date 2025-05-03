
import {Action, createReducer, on} from "@ngrx/store";
import {ILinkState} from "./interface/ILinkState";
import {clearLinkAction, setLinkAction} from "./link.action";
import {state} from "@angular/animations";

const initialLinkState: ILinkState = {
  isHasLink: false,
  link: '/'
}

const setLinkReducer = createReducer(initialLinkState,
  on(setLinkAction, (state: ILinkState, action): ILinkState =>
      <ILinkState>({
            ...state,
            isHasLink: true,
            link: action.linkState.link
  })),
    on(clearLinkAction, (state: ILinkState): ILinkState =>
        <ILinkState>({
            ...state,
            isHasLink: false,
            link: '/'
        })),

)

export function reducersLink(state: ILinkState, action: Action) {
    return setLinkReducer(state, action);
}