import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects"
import {MessageNotificationService} from "../../../../services/notification.service";
import {catchError, map, of, switchMap} from "rxjs";
import {MessageNotification} from "../../../DTO/classes/notifications/MessageNotification";
import {IViewNotification} from "../../../DTO/views/notifications/IViewNotification";
import { loadFailedAIState, loadSuccessAIState, requestAIAction } from "../ai.action";
import { AIService } from "src/services/ai.services";
import { IAIState } from "../IAIState";

@Injectable()
export class AIEffect {
  constructor(
    private actions$: Actions,
    private api: AIService
  ) {}

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestAIAction),
      switchMap(({ request }) =>
        this.api.upload_mpeg(request).pipe(
          map((messages: IAIState) =>
            loadSuccessAIState({state: messages })
          ),
          catchError(() => of(loadFailedAIState()))
        )
      )
    )
  );
}