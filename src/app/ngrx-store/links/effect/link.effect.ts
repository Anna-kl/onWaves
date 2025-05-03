import {Actions, createEffect, ofType} from "@ngrx/effects";
import {of, switchMap} from "rxjs";
import {Injectable} from "@angular/core";
import {loadLinkAction, setLinkAction} from "../link.action";
@Injectable()
export class LinkEffect {
    constructor(private action$: Actions){}
        loadLink$ = createEffect(() => this.action$.pipe(
            ofType(loadLinkAction),
            switchMap(({request}) => {
                return of(setLinkAction({
                    linkState: {isHasLink: true, link: request
                    }}))
            }),
))}