import {IViewBusinessProfile} from "../app/DTO/views/business/IViewBussinessProfile";
import {Injectable} from "@angular/core";
import {ProfileService} from "./profile.service";
import {DomSanitizer} from "@angular/platform-browser";
import {BehaviorSubject, map} from "rxjs";
import {IResponse} from "../app/DTO/classes/IResponse";
import {HistoryService} from "./history.service";


@Injectable()

export class CardsProfileService {
  historyCards$ = new BehaviorSubject<IViewBusinessProfile[]>([]);
  error$ = new BehaviorSubject<boolean>(false);
  constructor(private _apiProfile: ProfileService,
              private _apiHistory: HistoryService) {
  }

  public readonly listClientsCard$ = this._apiProfile.listClientsCard$;
  public readonly historyList$ = this._apiHistory.listHistoryCard$;
  public cards$: IViewBusinessProfile[]|null = null;
  public isListCardExpand$ = new BehaviorSubject<boolean>(false);

  async getListHistories(profileId: string) {
      (this._apiHistory.getHistoryCards(profileId))
        .subscribe(_ => {
             this.historyCards$.next(_.map(item => (item.businessProfile)).map(
               i => {
                 return i;
               }
             ));
        });

    }

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
