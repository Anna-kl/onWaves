import {Component, OnDestroy, OnInit, Sanitizer} from '@angular/core';
import {BehaviorSubject, concatMap, filter, from, map, mergeMap, Observable, startWith, Subject, Subscription, switchMap, toArray} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {SearchService} from "../../../services/search.service";
import {IResultSearch} from "../../DTO/views/search/IResultSearch";
import {ICategory} from "../../DTO/classes/ICategory";
import {getCategoryLevel2} from "../../../helpers/common/category";
import {DictionaryService} from "../../../services/dictionary.service";
import {getAddressCity, getAddressProfileStreet} from "../../../helpers/common/address";
import {DomSanitizer} from "@angular/platform-browser";
import {ISearchRequest} from "../../DTO/views/search/ISearchRequest";
import {CardsProfileService} from "../../../services/client-cards.service";
import { ProfileService } from 'src/services/profile.service';
import { IViewBusinessProfile } from 'src/app/DTO/views/business/IViewBussinessProfile';


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
  public readonly cards$ = this._apiCards.cards$;
  private unsubscribe: Subscription|null = null;
  profiles$: Observable<IViewBusinessProfile[]>|null = null;
  loading: boolean = false;
  categories1Level$: Observable<ICategory[]> = new Observable();
  test$: Observable<IResultSearch[]>|null = null;
  filtered$: Observable<ICategory[]> | undefined;
  alternatives$: Observable<IResultSearch[]>|null = null;
  private reloadTrigger = new Subject<void>();
  state: ISearchRequest|null = null;


  constructor(private activatedRoute: ActivatedRoute,
              public _apiSearch: SearchService,
              private sanitizer: DomSanitizer,
              private _route: Router,
              private _apiCards: CardsProfileService,
              private _dictionary: DictionaryService) {
    // this.state$ = this.activatedRoute.paramMap
    //     .pipe(map(() => window.history.state));
  }

  getSearch(send: ISearchRequest) {
      this.state = send;
      this.reloadTrigger.next();
  }

  async ngOnInit(): Promise<void> {
    this.state = window.history.state['send'];
    this.categories1Level$ =  this._dictionary.getMainCategories().pipe(
        map(allCategories => getCategoryLevel2(allCategories)
    ));

    //   await this._apiCards.getAllClientCardList(0, false);
    //   this.state$.subscribe(
    //       result => {
    //         this.searchRequest = result['send']['search'];
            // this.getSearch(result['send']);

        this.test$ = this.reloadTrigger.pipe(
          startWith(null), // выполнить сразу при инициализации
          switchMap(() =>
            this._apiSearch.search2(this.state).pipe(map(response => {
              if (response.code === 200){
                  return response.data;
              } else {
                return null;
              }
            })))
        );
        
        // this.test$ = this._apiSearch.search2(state['send']).pipe(map(response => {
        //         if (response.code === 200){
        //             return response.data;
        //         } else {
        //           return null;
        //         }
        // }));

        this.alternatives$ = this._apiSearch.search2(null).pipe(map(response => {
          if (response.code === 200){
              return response.data;
          }
  }));
    //       }
    //   );

      this.filtered$ = this.test$?.pipe(
        switchMap(data => {
          const categoryIds = data.map(item => item.categoryIds);
          const flatIds: number[] = categoryIds.flat(); 
          return this.categories1Level$.pipe(
            map(items =>
               items.filter(item => flatIds.includes(item.id)))
          );
        })
      );
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
            return '/assets/img/AvatarBig.png';
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
