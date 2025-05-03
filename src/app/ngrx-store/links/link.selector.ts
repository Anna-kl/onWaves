import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ILinkState} from "./interface/ILinkState";

export const linkSelectors =
    createFeatureSelector<ILinkState>('link');

export const selectLink = createSelector(linkSelectors,
    (link: ILinkState) =>
      link
)