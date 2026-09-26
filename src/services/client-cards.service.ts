import {IViewBusinessProfile} from "../app/DTO/views/business/IViewBussinessProfile";
import {Injectable} from "@angular/core";
import {ProfileService} from "./profile.service";
import {BehaviorSubject} from "rxjs";


@Injectable()

export class CardsProfileService {
  error$ = new BehaviorSubject<boolean>(false);
  constructor(private _apiProfile: ProfileService) {
  }

  public readonly listClientsCard$ = this._apiProfile.listClientsCard$;
  public cards$: IViewBusinessProfile[]|null = null;
  public isListCardExpand$ = new BehaviorSubject<boolean>(false);

  // Обёртка над историей просмотров здесь не жила ни в одном вызове —
  // компоненты ходят прямо в HistoryService.getHistoryCards.

  async getAllClientCardList(skip: number, isRecommend: boolean,
     id?: string) {
    (await this._apiProfile.getProfileSkillsAsync(skip, isRecommend, id))
      .subscribe(_ => {
        if (skip === 0){
          this.cards$ = structuredClone(_.data as IViewBusinessProfile[]);
        } else {
          if (this.cards$ === null){
            this.cards$ = [];
          }
          let temp = structuredClone(_.data as IViewBusinessProfile[]);
          temp.push(...this.cards$);
          this.cards$ = [];
          this.cards$ = structuredClone(temp);
        }
        //this.cards = this.listClientsCard$.value.data as ICardBusinessView[];
        this.isListCardExpand$.next(this.listClientsCard$.value!.code !== 200);
        this.error$.next(this.listClientsCard$.value!.code === 403);
      });
  }


}
