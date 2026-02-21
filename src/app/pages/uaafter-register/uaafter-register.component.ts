import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IViewBusinessProfile} from "../../DTO/views/business/IViewBussinessProfile";
import {CardsProfileService} from "../../../services/client-cards.service";
import {select, Store} from "@ngrx/store";
import {selectProfileMainClient} from "../../ngrx-store/mainClient/store.select";
import { BehaviorSubject, concatMap, filter, Observable, scan, shareReplay, startWith, Subject, switchMap, tap } from 'rxjs';
import { ProfileService } from 'src/services/profile.service';

@Component({
  selector: 'app-uaafter-register',
  templateUrl: './uaafter-register.component.html',
  styleUrls: ['./uaafter-register.component.scss'],
  providers: [CardsProfileService]
})
export class UAAfterRegisterComponent implements OnInit {

  isLoading = true;
  mainCards$: Observable<IViewBusinessProfile[]>|null = null;
  user$: Observable<IViewBusinessProfile>|null = null;
  page$: Observable<number>|null = null;
  pageData$: any;

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
    private _profileService: ProfileService,
              private store$: Store,
             ) {
   
  }
  private readonly loadMore$ = new Subject<void>();
  skip: number = 0;
  public isListCardExpand$ = this._apiCards.isListCardExpand$;
  public cards$: Observable<IViewBusinessProfile[]>|null = null;
  public historyCards$: Observable<IViewBusinessProfile[]>|null = null;

  
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

    loadMore(): void {
    /** не посылаем сигнал, если уже грузим или карточек больше нет */
    if (!this.loading$.value && this.hasMore$.value) {
      this.loadMoreClick$.next();
    }
  }

  async ngOnInit(): Promise<void> {
    // this.historyCards$ = this.store$.pipe(select(selectProfileMainClient)).pipe(
    //    filter((user): user is IViewBusinessProfile => user != null),
    //    tap(res => 
    //     {this.auth = res}
    //   ),
    //   tap(_ => {
    //     this._profileService.getProfileAsync(0, false, this.auth?.id!).subscribe(res => {
    //       if (!this.cards$){
    //         this.cards$ = new Subject<IViewBusinessProfile[]>();
    //       }
    //       this.cards$.next(res);
    //     });
    //   }),
    //    switchMap(result => this._profileService.getHistoryCards(this.auth?.id!, false, 0))
    // );

  /* 1) «Кто я» – Behaviour-подобный поток с профилем */
  this.user$ = this.store$.pipe(
    select(selectProfileMainClient),
    filter(Boolean),                         // user !== null
    shareReplay({ bufferSize: 1, refCount: true })
  );


  this.historyCards$ = this.user$.pipe(
    tap(us => this.auth = us),
    switchMap(user =>
      this._profileService.getHistoryCards(user?.id!, false, 0)
    )
  );


  this.cards$ = 
          this.loadMoreClick$.pipe(
            // 0 → 1 → 2 …
            startWith(null),                           // начальная загрузка
            scan(page => page + 1, -1),                // -1+1 = 0 первая страница
            concatMap(page => this.fetchPage(page))
          )
        
        // аккумулируем все пачки
        scan<IViewBusinessProfile[], IViewBusinessProfile[]>((all, batch) => [...all, ...batch], [])
    


  }

  private loadMoreClick$ = new Subject<void>();      // клики
  private loading$       = new BehaviorSubject(false);
  public hasMore$       = new BehaviorSubject(true);

   private fetchPage(page: number, userId?: string|null): Observable<IViewBusinessProfile[]> {
    this.loading$.next(true);
    return this._profileService.getProfileAsync(page, false, userId).pipe(
      tap(batch => {
        this.loading$.next(false);
        // если пришло меньше чем pageSize, считаем, что карточки кончились
        if (batch.length < 10) {
          this.hasMore$.next(false);
        }
      })
    );
  }
}
