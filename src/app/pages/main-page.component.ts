import { PromotionPublicationsService, PublicationBatch } from '../../services/promotion-publications.service';
import { AfterViewInit, Component, DestroyRef, ElementRef, HostListener, Inject, NgZone, OnInit, Optional, PLATFORM_ID, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import {
  BehaviorSubject, EMPTY, Observable, ReplaySubject, combineLatest, expand, filter, from, fromEvent, map, merge, mergeMap, of, scan,
  shareReplay, startWith, switchMap, take, throttleTime, timer,
} from 'rxjs';
import { ProfileService } from '../../services/profile.service';
import { selectProfileMainClient } from '../ngrx-store/mainClient/store.select';
import { IViewBusinessProfile } from '../DTO/views/business/IViewBussinessProfile';
import { BackendService } from 'src/services/backend.service';
import { LoginService } from '../auth/login.service';
import { ModalRegisterComponent } from 'src/app/components/modals/register-profile/modal-register/modal-register.component';
import { DictionaryService } from 'src/services/dictionary.service';
import { ICategory } from '../DTO/classes/ICategory';
import { AnalyticsService } from 'src/services/analytics.service';
import {
  HomeFeedItem, HomeMaster, HomeMastersLoad, HomePerks, HomePrice, HomeShowcaseService,
} from 'src/services/home-showcase.service';
import { HOME_GROUP_LABEL, HOME_GROUPS, HOME_QUICK_SERVICES, HomeGroup } from './home/home-showcase.config';
import { GiveawayCampaign, GiveawayLoad } from '../DTO/views/giveaway/giveaway';
import { GiveawaysService } from '../../services/giveaways.service';
import { PromoSeatsService } from '../../services/promo-seats.service';

type GroupFilter = 'all' | HomeGroup;

interface MasterGroupView {
  group: HomeGroup;
  label: string;
  masters: HomeMaster[];
}

/** Сколько материалов ленты показываем за раз: ролики тяжёлые, больше сразу не нужно. */
const FEED_PAGE = 6;

@Component({
  selector: 'app-menu',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  providers: [ProfileService, BackendService, DictionaryService, HomeShowcaseService]
})
export class MainPageComponent implements OnInit, AfterViewInit {
  search = '';
  isAuth = false;
  isRubricOpen = false;

  readonly quickServices = HOME_QUICK_SERVICES;
  readonly groupLabel = HOME_GROUP_LABEL;
  readonly homeGroups = HOME_GROUPS;
  readonly isBrowser: boolean;

  /** Пример записи на первом экране: дни от сегодняшнего, время — иллюстрация, не живые слоты. */
  readonly demoDays = this.buildDemoDays();
  readonly demoTimes = [
    { time: '11:00', state: 'free' }, { time: '13:30', state: 'free' },
    { time: '16:00', state: 'picked' }, { time: '18:30', state: 'busy' },
  ];

  readonly filter$ = new BehaviorSubject<GroupFilter>('all');
  masters$!: Observable<HomeMaster[]>;
  mastersLoad$!: Observable<HomeMastersLoad>;
  groups$!: Observable<MasterGroupView[]>;
  counts$!: Observable<Record<GroupFilter, number>>;
  prices$!: Observable<Record<string, HomePrice | null>>;
  perks$!: Observable<Record<string, HomePerks>>;
  demo$!: Observable<HomeMaster | null>;

  feed$!: Observable<HomeFeedItem[] | null>;
  feedLimit = FEED_PAGE;
  giveaway: GiveawayLoad<GiveawayCampaign> = { kind: 'loading', value: null };
  private readonly feedRequested$ = new ReplaySubject<void>(1);
  private readonly refreshPerks$ = new BehaviorSubject<void>(undefined);
  private feedObserver?: IntersectionObserver;

  /** Аватар не загрузился — рисуем монограмму, а не битую картинку. */
  readonly brokenAvatars = new Set<string>();

  /** Посты, чей текст не влез в обрезку карточки: у них есть кнопка «Читать полностью». */
  readonly clampedPosts = new Set<string>();
  /** Посты, которые читатель раскрыл. */
  readonly expandedPosts = new Set<string>();
  private measureQueued = false;
  @ViewChildren('postText') private postTexts?: QueryList<ElementRef<HTMLElement>>;

  private categories: ICategory[] = [];

  @ViewChild('feedAnchor') private feedAnchor?: ElementRef<HTMLElement>;

  constructor(private _apiProfile: ProfileService,
              private backendService: BackendService,
              private _loginService: LoginService,
              private route: ActivatedRoute,
              private modalService: NgbModal,
              private store: Store,
              private router: Router,
              private dictionary: DictionaryService,
              private showcase: HomeShowcaseService,
              private analytics: AnalyticsService,
              private giveaways: GiveawaysService,
              private promoSeats: PromoSeatsService,
              private destroyRef: DestroyRef,
              private zone: NgZone,
              @Inject(PLATFORM_ID) platformId: object, @Optional() private publications:PromotionPublicationsService|null=null) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  readonly hasPublicationFeatured$ = (this.publications?.state$ ?? of<PublicationBatch>({items:[],managedSources:[]})).pipe(map(state=>state.items.some(p=>p.content.placements.includes('home_featured'))));

  ngOnInit(): void {
    this.dictionary.getMainCategories().pipe(take(1)).subscribe(result => {
      this.categories = result;
    });

    if (this.route.snapshot.queryParamMap.get('action') === 'register') {
      this.modalService.open(ModalRegisterComponent);
    }

    this.initShowcase();
    this.giveaways.publicList('home').pipe(takeUntilDestroyed(this.destroyRef)).subscribe(load => {
      this.giveaway = load;
    });
    this.initAuthGeo();
  }

  ngAfterViewInit(): void {
    // Лента подгружается асинхронно и дописывается по «Показать ещё» — меряем после каждой отрисовки.
    if (this.isBrowser) {
      this.postTexts?.changes.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.queueMeasure());
      this.queueMeasure();
    }
    // Лента — десятки запросов к альбомам. Грузим, только когда до неё почти долистали,
    // и только в браузере: серверному рендеру и первому экрану они не нужны.
    if (!this.isBrowser || !this.feedAnchor) return;
    if (!('IntersectionObserver' in window)) {
      this.feedRequested$.next();
      return;
    }
    this.feedObserver = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) {
        this.feedRequested$.next();
        this.feedObserver?.disconnect();
      }
    }, { rootMargin: '600px 0px' });
    this.feedObserver.observe(this.feedAnchor.nativeElement);
    this.destroyRef.onDestroy(() => this.feedObserver?.disconnect());
  }

  private initShowcase(): void {
    this.mastersLoad$ = this.showcase.getMastersLoad();
    this.masters$ = this.showcase.getMasters();

    this.counts$ = this.masters$.pipe(map(list => ({
      all: list.length,
      beauty: list.filter(m => m.group === 'beauty').length,
      home: list.filter(m => m.group === 'home').length,
      other: list.filter(m => m.group === 'other').length,
    })));

    this.groups$ = combineLatest([this.masters$, this.filter$]).pipe(
      map(([list, f]) => HOME_GROUPS
        .filter(g => f === 'all' || f === g)
        .map(g => ({ group: g, label: HOME_GROUP_LABEL[g], masters: list.filter(m => m.group === g) }))
        .filter(v => v.masters.length > 0))
    );

    this.demo$ = this.masters$.pipe(
      map(list => list.find(m => m.group === 'beauty' && m.bookingEnabled && !!m.avatar) ?? null)
    );

    // Цены — отдельные запросы прайса на каждого мастера; на сервере их не ждём.
    this.prices$ = this.isBrowser
      ? this.masters$.pipe(
        switchMap(list => merge(...list.filter(m => m.hasCardDetails && m.bookingEnabled).map(m => this.showcase.getMinPrice(m.id, m.priceText).pipe(
          map(price => ({ id: m.id, price }))
        )))),
        scan((acc, { id, price }) => ({ ...acc, [id]: price }), {} as Record<string, HomePrice | null>),
        startWith({} as Record<string, HomePrice | null>),
        shareReplay({ bufferSize: 1, refCount: true })
      )
      : of({});

    // Publication visibility is independent of the financial program's enabled flag.
    // One shared public batch serves all cards; draft/unpublished sources never revive a legacy badge.
    this.perks$ = (this.publications?.state$ ?? of<PublicationBatch>({items:[],managedSources:[]})).pipe(
      map(batch=>{
        const result:Record<string,HomePerks>={};
        for(const p of batch.items.filter(item=>item.content.placements.includes('home_master_card'))){
          const perks=result[p.masterId]??(result[p.masterId]={coupon:null,promo:null});
          if(p.sourceType.startsWith('welcome_'))perks.coupon={text:p.badgeText,hint:p.mandatoryTerms.join(' '),until:null};
          else perks.promo={badge:p.badgeText,title:p.content.shortTitle||p.content.offer.title,until:null,
            fragment:p.content.placements.includes('profile')?'publication-'+p.id:undefined,excludesCoupon:p.facts.seats?.excludeWelcomeCoupon};
        }
        return result;
      }),shareReplay({bufferSize:1,refCount:true}),
    );

    this.feed$ = this.feedRequested$.pipe(
      take(1),
      switchMap(() => this.masters$),
      switchMap(list => this.showcase.getFeed(list)),
      startWith(null),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  retryMasters(): void {
    this.showcase.retryMasters();
  }

  /** Как раньше: если у вошедшего BA нет координат — берём геолокацию браузера. */
  private initAuthGeo(): void {
    this.store.pipe(
      select(selectProfileMainClient),
      filter(Boolean),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(result => {
      this.isAuth = true;
      const profile = new IViewBusinessProfile();
      profile.copyProfile(result);
      this._apiProfile.getCoordinates(result.id!).pipe(take(1)).subscribe(coordinate => {
        if (coordinate.code === 404 && this.isBrowser && navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
            profile.longitude = position.coords.longitude;
            profile.latitude = position.coords.latitude;
            this.backendService.saveProfile(profile.id!, profile).pipe(take(1))
              .subscribe(() => this._loginService.updateProfile(profile.id!));
          });
        }
      });
    });
  }

  setFilter(value: GroupFilter): void {
    this.filter$.next(value);
  }

  goToSearch(): void {
    this.analytics.trackEvent('home', 'home_search', this.search || undefined);
    this.router.navigate(['search/result'], {
      queryParams: { search: this.search || null, distance: null, categoryId: null, gender: null }
    });
  }

  searchService(name: string): void {
    this.analytics.trackEvent('home', 'home_chip', name);
    this.router.navigate(['search/result'], {
      queryParams: { search: name, distance: null, categoryId: null, gender: null }
    });
  }

  toggleRubric(): void {
    this.isRubricOpen = !this.isRubricOpen;
  }

  setCategory(event: ICategory): void {
    this.isRubricOpen = false;
    const category = this.categories.find(item => item.id === event.id) ?? event;
    this.router.navigate(['search/result'], {
      queryParams: { search: null, distance: null, categoryId: category.id, gender: null, geo: null, address: null }
    });
  }

  track(action: string, label?: string): void {
    this.analytics.trackEvent('home', action, label);
  }

  showMoreFeed(): void {
    this.feedLimit += FEED_PAGE;
  }

  avatarFailed(id: string): void {
    this.brokenAvatars.add(id);
  }

  togglePost(id: string): void {
    if (this.expandedPosts.has(id)) {
      this.expandedPosts.delete(id);
    } else {
      this.expandedPosts.add(id);
    }
  }

  /** Поворот телефона и смена ширины меняют число строк — обрезку пересчитываем. */
  @HostListener('window:resize')
  onFeedResize(): void {
    this.queueMeasure();
  }

  /**
   * Кнопку показываем только там, где текст действительно обрезан. Длину строки для этого
   * считать бесполезно: сколько влезет в четыре строки, зависит от ширины экрана, поэтому меряем DOM.
   */
  private queueMeasure(): void {
    if (!this.isBrowser || this.measureQueued) {
      return;
    }
    this.measureQueued = true;
    requestAnimationFrame(() => {
      this.measureQueued = false;
      this.postTexts?.forEach(ref => {
        const el = ref.nativeElement;
        const id = el.dataset['postId'];
        // Раскрытый пост не меряем: без обрезки он «помещается», а кнопка «Свернуть» нужна.
        if (!id || this.expandedPosts.has(id)) {
          return;
        }
        if (el.scrollHeight > el.clientHeight + 1) {
          this.clampedPosts.add(id);
        } else {
          this.clampedPosts.delete(id);
        }
      });
    });
  }

  trackById(_: number, item: { id: string }): string {
    return item.id;
  }

  trackByGroup(_: number, item: MasterGroupView): string {
    return item.group;
  }

  private buildDemoDays(): { name: string; num: number; picked: boolean }[] {
    const names = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const today = new Date();
    return Array.from({ length: 5 }, (_, i) => {
      const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i + 1);
      return { name: names[d.getDay()], num: d.getDate(), picked: i === 2 };
    });
  }
}
