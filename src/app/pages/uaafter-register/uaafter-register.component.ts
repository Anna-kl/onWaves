import {Component, OnInit} from '@angular/core';
import {IViewBusinessProfile} from "../../DTO/views/business/IViewBussinessProfile";
import {CardsProfileService} from "../../../services/client-cards.service";
import {select, Store} from "@ngrx/store";
import {selectProfileMainClient} from "../../ngrx-store/mainClient/store.select";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-uaafter-register',
  templateUrl: './uaafter-register.component.html',
  styleUrls: ['./uaafter-register.component.css'],
  providers: [CardsProfileService]
})
export class UAAfterRegisterComponent implements OnInit {

  async changeCards(flag: boolean) {
    this.skip = 0;
    this.isRecommend = flag;
    this._apiCards.cards$ = null;
    await this._apiCards.getAllClientCardList(this.skip, this.isRecommend, 
      this.auth?.id!);
  }

  auth: IViewBusinessProfile | null = null;
  isRecommend: boolean = false;
  // public readonly historyList$ = this._history.listHistoryCard$;

  constructor(public _apiCards: CardsProfileService,
              private store$: Store,
             ) {
    this.store$.pipe(select(selectProfileMainClient)).subscribe(
        result => {
          this.auth = result;
          
        }
    );
  }

  skip: number = 0;
  public isListCardExpand$ = this._apiCards.isListCardExpand$;
  public cards$ = this._apiCards.cards$;
  public historyCards$ = this._apiCards.historyCards$;
  // private async getAllClientCardList()
  // {
  //   (await this._serviceClientCardList.getProfileSkillsAsync(this.skip))
  //     .subscribe(_ => {
  //       //this.cards = this.listClientsCard$.value.data as ICardBusinessView[];
  //       this.cards.push(...this.listClientsCard$.value!.data as IViewBusinessProfile[]);
  //       this.isListCardExpand = this.listClientsCard$.value!.code !== 200;
  //       this.cards.forEach(item => {
  //         if (item.avatar) {
  //           item.avatar = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64, ${item.avatar}`);
  //         } else {
  //           item.avatar = '/assets/img/AvatarBig.png';
  //         }
  //       });
  //     });
  // }

  async loadCards() {
    this.skip += 12;
    await this._apiCards.getAllClientCardList(this.skip,
       this.isRecommend, this.auth?.id!);
  }

  async ngOnInit(): Promise<void> {
    if (this.auth) {
      await this._apiCards.getListHistories(this.auth.id!);
      await this._apiCards.getAllClientCardList(this.skip, this.isRecommend,  this.auth?.id!);
    }
    this._apiCards.error$.subscribe(result => {
      if (result){
        navigator.geolocation.getCurrentPosition(position => {
        console.log(position);
          });
        }
      });
    
    
    // this._apiCards.isListCardExpand$.subscribe(
    //   res => this.isListCardExpand = res
    // );
  }
}
