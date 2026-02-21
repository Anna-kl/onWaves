import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects"
import {MessageNotificationService} from "../../../../services/notification.service";
import {loadNotificationFailed, loadSuccessNotification, requestAction} from "../notification.action";
import {catchError, map, of, switchMap} from "rxjs";
import {MessageNotification} from "../../../DTO/classes/notifications/MessageNotification";
import {IViewNotification} from "../../../DTO/views/notifications/IViewNotification";

@Injectable()
export class NotificationEffect {
  constructor(
    private actions$: Actions,
    private api: MessageNotificationService
  ) {}

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestAction),
      switchMap(({ request }) =>
        this.api.getNotifications(request).pipe(
          map((messages: IViewNotification[]) =>
            loadSuccessNotification({ messages })
          ),
          catchError(() => of(loadNotificationFailed()))
        )
      )
    )
  );
}