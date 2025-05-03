import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects"
import {MessageNotificationService} from "../../../../services/notification.service";
import {loadNotificationFailed, loadSuccessNotification, requestAction} from "../notification.action";
import {catchError, map, of, switchMap} from "rxjs";
import {MessageNotification} from "../../../DTO/classes/notifications/MessageNotification";
import {IViewNotification} from "../../../DTO/views/notifications/IViewNotification";

@Injectable()
export class NotificationEffect {
    constructor(private action$: Actions,
                private _apiNotification: MessageNotificationService) {
    }
    load$ = createEffect(() => this.action$.pipe(
        ofType(requestAction),
        switchMap(({request}) => {
            return this._apiNotification.getNotifications(request).pipe(
                map((messages:IViewNotification[]) => {
                    return loadSuccessNotification({
                        messages: messages
                    });
                })
            )
        }
    ),
        catchError(()=> {
            return of(loadNotificationFailed())
        })
    ))


}