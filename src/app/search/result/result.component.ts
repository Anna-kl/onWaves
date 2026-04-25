import {Component, DestroyRef, inject, OnDestroy, OnInit, Sanitizer} from '@angular/core';
import {BehaviorSubject, catchError, concatMap, EMPTY, filter, from, map, merge, mergeMap, Observable, Observer, of, shareReplay, Subject, Subscription, switchMap, tap, toArray, withLatestFrom} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {SearchService} from "../../../services/search.service";
import {IResultSearch} from "../../DTO/views/search/IResultSearch";
import {ICategory} from "../../DTO/classes/ICategory";
import {getCategoryLevel2} from "../../../helpers/common/category";
import {DictionaryService} from "../../../services/dictionary.service";
import {getAddressCity, getAddressProfileStreet} from "../../../helpers/common/address";
import {DomSanitizer} from "@angular/platform-browser";
import {ISearchRequest} from "../../DTO/views/search/ISearchRequest";
import {CardsProfileService} from "../../../services/client-cards.service";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IViewBusinessProfile } from 'src/app/DTO/views/business/IViewBussinessProfile';
import { IResponse } from 'src/app/DTO/classes/IResponse';
import { IViewFullInfo } from 'src/app/DTO/views/IViewFullInfo';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
  providers: [SearchService, DictionaryService, CardsProfileService]
})
export class ResultComponent implements OnInit, OnDestroy{

//   private state$: Observable<any>;
  resultSearch: IResultSearch[] = [];
  categories: ICategory[] = [];
  level2Category: ICategory[] = [];
  searchRequest = '';
  public  cards: IViewBusinessProfile[] = [];
  private unsubscribe: Subscription|null = null;
  profiles$: Observable<IViewBusinessProfile[]>|null = null;
  /** true до первого ответа search2 — иначе блок «ничего не нашлось» мелькал при пустых массивах */
  loading: boolean = true;
  categories1Level$: Observable<ICategory[]> = new Observable();
  test$: Observable<IResponse>=new Observable();
  filtered$: Observable<ICategory[]> | undefined;
  alternatives$: Observable<IResultSearch[]>|null = null;
  private reloadTrigger = new Subject<void>();
  state: ISearchRequest|null = null;
  firstCards:  IResultSearch[]= [];
  seconsCards:  IResultSearch[] = [];
  thirdCards: IResultSearch[]= [];
  /** Считаются в tap вместе с ответом API (не геттеры — тогда при else-ветке *ngIf геттер для *ngFor мог не дергаться). */
  firstCardCategories: ICategory[] = [];
  secondCardCategories: ICategory[] = [];


  constructor(private activatedRoute: ActivatedRoute,
              public _apiSearch: SearchService,
              private sanitizer: DomSanitizer,
              private _route: Router,
              private _apiCards: CardsProfileService,
              private _dictionary: DictionaryService) {
  }

  private destroyRef = inject(DestroyRef);

  /** Параметры из URL — единый источник для первого захода и повторной навигации на тот же route. */
  private applyQueryParams(p: Params): void {
    this.state = new ISearchRequest(
      p['address'] ?? null,
      p['distance'] ?? null,
      p['gender'] ?? null,
      p['categoryId'] ?? null,
      p['search'] ?? null,
      p['geo'] ?? null,
    );
    const raw = p['search'];
    const s = Array.isArray(raw) ? raw[0] : raw;
    this.searchRequest = s != null && String(s) !== '' ? String(s) : '';
  }

  getCategories(arg0: ICategory[],arg1: IResultSearch[]): ICategory[] {
      // тип
        const result: ICategory[] = [];

        let ids:number[] = [];
        arg1.forEach(item => {
          if (item.categoryIds?.length) {
            ids.push(...item.categoryIds);
          }
        });
        let test = new Set(ids); // быстрее чем includes в цикле
        const filtered = arg0.filter(c => test.has(c.id));

        // пушим элементы, а не массив
        return filtered;          // 👈 spread
        // или:
        // result = result.concat(filtered);
  }

  getSearch(send: ISearchRequest) {
      this.state = send;
      this.reloadTrigger.next();
  }

  ngOnInit(){
    this.categories1Level$ =  this._dictionary.getMainCategories().pipe(
        map(allCategories => getCategoryLevel2(allCategories)
    ));

    merge(
      this.activatedRoute.queryParams.pipe(tap(p => this.applyQueryParams(p))),
      this.reloadTrigger,
    ).pipe(
      tap(() => {
        this.loading = true;
      }),
      switchMap(() =>
        this._apiSearch.search2(this.state).pipe(
          catchError(() => of(null))
        )
      ),
      withLatestFrom(this.categories1Level$),
      map(([resp, categories]) => {
        if (!resp || resp.code !== 200) {
          return { resp: null, filtered: [] as ICategory[] };
        }
        return { resp, filtered: categories };
      }),
      tap(({ resp, filtered }) => {
        if (resp) {
          const temp = resp?.data;
          this.firstCards = temp.first ?? [];
          this.seconsCards = temp.second ?? [];
          this.thirdCards = temp.third ?? [];
          this.categories = filtered;
          this.firstCardCategories = this.getCategories(filtered, this.firstCards);
          this.secondCardCategories = this.getCategories(filtered, this.seconsCards);
        } else {
          this.firstCards = [];
          this.seconsCards = [];
          this.thirdCards = [];
          this.firstCardCategories = [];
          this.secondCardCategories = [];
        }
        this.loading = false;
      }),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe();

    //   await this._apiCards.getAllClientCardList(0, false);
    //   this.state$.subscribe(
    //       result => {
    //         this.searchRequest = result['send']['search'];
            // this.getSearch(result['send']);

      // this.test$ = this.reloadTrigger.pipe(
      //     startWith(void 0),
      //     switchMap(() =>
      //       this._apiSearch.search2(this.state).pipe(
      //         // пропускаем только успешные ответы
      //         filter((resp): resp is IResponse => resp.code === 200),
      //         // при ошибке — просто завершаем без эмиссии
      //         catchError(() => EMPTY)
      //       )
      //     ),
      //    shareReplay({ bufferSize: 1, refCount: true })
// );
        
        // this.test$ = this._apiSearch.search2(state['send']).pipe(map(response => {
        //         if (response.code === 200){
        //             return response.data;
        //         } else {
        //           return null;
        //         }
        // }));

  //       this.alternatives$ = this._apiSearch.search2(null).pipe(map(response => {
  //         if (response.code === 200){
  //             return response.data;
  //         }
  // }));
    //       }
    //   );

      // this.filtered$ = this.test$?.pipe(
      //   switchMap(data => {
      //     const categoryIds = JSON.parse((data as IResponse).message);
      //     const flatIds: number[] = categoryIds.flat(); 
      //     return this.categories1Level$.pipe(
      //       map(items =>
      //          items.filter(item => flatIds.includes(item.id)))
      //     );
      //   })
      // );
     // this.loading = true;



    //   this._apiSearch.getSearchBA$
    //   this.unsubscribe = this._apiSearch.getSearchBA$.subscribe(
    //       result => {
    //           if (result) {
    //             this.loading = false;
    //               if (result?.length > 0) {
    //                   this.resultSearch = result;
    //                   let category2Level: number[] = [];
    //                 //   this.resultSearch.map(_ => {
    //                 //           category2Level.push(..._.categoryIds)
    //                 //       }
    //                 //   );

    //                   this.categories1Level$ =  this._dictionary.getMainCategories().pipe(
    //                     map(allCategories => getCategoryLevel2(allCategories)
    //                   ));
                      
    //                 //   this._dictionary.getMainCategories().subscribe(
    //                 //     async response => {
    //                 //         let allCategories = response as ICategory[];
    //                 //         this.level2Category = getCategoryLevel2(allCategories);
    //                 //         this.categories = this.level2Category.filter(_ => category2Level.includes(_.id));
    //                 //     }
    //                 // );

    //               }
    //           }
              
    //           if (result && result?.length === 0){
    //             this.profiles$ = from(result.map(_ => _.id)).pipe(
    //                     concatMap(id => this._apiProfiles.getViewProfile(id!)),
    //                     toArray()
    //                 );
                    
    //             }
                
    //       });
  }

    getCards(category: ICategory, cardsBA: IResultSearch[] ) {
        return cardsBA.filter(_ => _.categoryIds !== null
           ? _.categoryIds.includes(category.id)
          : _.categoryIds === category.id);
    }

    getAvatar(avatar: any) {
        if (avatar) {
            return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64, ${avatar}`);
        } else {
            return '/assets/img/onwaves/user.png';
        }
    }

    protected readonly getAddressCity = getAddressCity;
    protected readonly getAddressProfileStreet = getAddressProfileStreet;


    back() {
        this._route.navigate(['search/extsearch/']);
    }

    search() {
        const send = {
            search: this.searchRequest,
            distance:  null ,
            categoryId:  null,
            address: '',
            gender: [],
            geo:  null,
        } as unknown as ISearchRequest;
        this.getSearch(send);
    }

    ngOnDestroy(): void {
        this.unsubscribe?.unsubscribe();
    }

    goExtSearch() {
        this._route.navigate([`search/extsearch/${this.searchRequest}`]);
    }
}

