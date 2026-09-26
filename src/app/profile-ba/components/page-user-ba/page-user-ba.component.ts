import {Component, ElementRef, EventEmitter, Inject, OnDestroy, OnInit, Output, PLATFORM_ID, ViewChild} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {ProfileDataService} from "../../services/profile-data.service";
import {PaymentForType} from "../../../DTO/enums/paymentForType";
import {IGroupWithSubGroups} from "../../../DTO/views/services/IGroupWithSubGroup";
import {Group} from "../../../DTO/views/services/IViewGroups";
import {Tutorial} from "../sliderba/sliderba.component";
import {subGroup} from "../../../DTO/views/services/IViewSubGroups";
import {DictionaryService} from "../../../../services/dictionary.service";
import {Observable, Subscription, forkJoin, of, shareReplay} from "rxjs";
import {catchError, filter, switchMap, take} from "rxjs/operators";
import {getAddressProfile, formatWorkLocations} from "../../../../helpers/common/address";
import {resolveAvatarUrl} from "../../../../helpers/common/avatar1";
import {IViewCoordinates} from "../../../DTO/views/profile/IViewCoordinates";
import {IViewBusinessProfile} from "../../../DTO/views/business/IViewBussinessProfile";
import {IWorkLocation} from "../../../DTO/views/IWorkLocation";
import {WorkLocationType} from "../../../DTO/enums/workLocationType";
import { environment } from 'src/enviroments/environment';
import { AnalyticsService } from 'src/services/analytics.service';
import { SeoService } from 'src/services/seo.service';
import { Router } from '@angular/router';
import { isPublicCellingsProfile, postalLocality, publicProfileCanonicalPath, publicProfileSeoFrom } from '../../helpers/public-profile-seo';
import { cellingsCalculatorFaq, citiesFromWorkLocations, displayOfferCities } from '../../helpers/cellings-offer';
import { select, Store } from '@ngrx/store';
import { selectProfileMainClient } from '../../../ngrx-store/mainClient/store.select';
import { WelcomeCouponService } from 'src/services/welcome-coupon.service';
import { WelcomeCampaign } from '../../../DTO/views/promo/welcome-coupon';
import { welcomeTierList } from 'src/helpers/common/welcome-coupon';

@Component({
  selector: 'app-page-user-ba',
  templateUrl: './page-user-ba.component.html',
  styleUrls: ['./page-user-ba.component.css'],
  providers: [DictionaryService]
})
export class PageUserBAComponent implements OnInit, OnDestroy {
  id: string|null = null;
  groupShow: IGroupWithSubGroups[] = [];
  groups: Group[] = [];
  isEdit: boolean = false;
  @Output() onChecked = new EventEmitter();
  tutorials!: Tutorial[];
  responsiveOptions!: any[];
  protected readonly PaymentForType = PaymentForType;
  services: subGroup[] = [];
  openOrNot: any; //для вспылвающего меню при нажатии- записаться Онлайн
  lat = 0;
  lng = 0;
  SubscruptionBA: Subscription|null = null;
  geoPoint$: Observable<IViewCoordinates|null> = new Observable<IViewCoordinates | null>();
  profile: IViewBusinessProfile | null = null;

  // ── Ленивая карта ────────────────────────────────────────────────────────
  // Геокод и рендер <app-my-ycomponent> (а с ним подгрузка SDK Яндекс-карт)
  // откладываются до попадания блока во вьюпорт: карта живёт внизу правой
  // колонки и не должна тормозить первый экран.
  mapVisible = false;
  private mapRequested = false;
  private mapObserver?: IntersectionObserver;

  @ViewChild('mapAnchor')
  set mapAnchor(el: ElementRef<HTMLElement> | undefined) {
    if (!el || this.mapVisible || !isPlatformBrowser(this.platformId)) return;
    // Без IntersectionObserver (старые окружения/боты) — грузим сразу.
    if (typeof IntersectionObserver === 'undefined') {
      this.mapVisible = true;
      this.maybeLoadMap();
      return;
    }
    this.mapObserver = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) {
        this.mapVisible = true;
        this.mapObserver?.disconnect();
        this.maybeLoadMap();
      }
    }, { rootMargin: '200px' });
    this.mapObserver.observe(el.nativeElement);
  }
  canBook: boolean = false;

  // ── Приветственная скидка ────────────────────────────────────────────────
  // Условия приходят с сервера (coupons/welcome/offer). Только в браузере, fail-closed:
  // пока нет ответа или мастер не участвует — ничего не показываем, SSR-разметка не меняется.
  welcomeCampaign: WelcomeCampaign | null = null;
  showWelcomeModal = false;
  private welcomeLoadedFor: string | null = null;
  private welcomeSub?: Subscription;

  get welcomeTiers() {
    return welcomeTierList(this.welcomeCampaign);
  }

  @ViewChild('servicesAnchor') servicesAnchor?: ElementRef<HTMLElement>;

  onWelcomeChoose(): void {
    this.servicesAnchor?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  onWelcomeModalClosed(): void {
    this.showWelcomeModal = false;
  }

  onWelcomeTermsToggle(event: Event): void {
    if ((event.target as HTMLDetailsElement | null)?.open) {
      this._welcome.track('terms_opened', this.welcomeCampaign?.code);
    }
  }

  /** Одна загрузка предложения на страницу мастера; условия: id известен и запись открыта. */
  private maybeLoadWelcome(): void {
    if (!isPlatformBrowser(this.platformId) || !this.id || !this.canBook || this.welcomeLoadedFor === this.id) {
      return;
    }
    const masterId = this.id;
    this.welcomeLoadedFor = masterId;
    this.welcomeCampaign = null;
    this.showWelcomeModal = false;
    this.welcomeSub?.unsubscribe();
    this.welcomeSub = this._welcome.getOffer(masterId).subscribe(offer => {
      if (!offer.active || !offer.masterParticipates || !offer.campaign?.tiers?.length) {
        this.welcomeCampaign = null;
        return;
      }
      if (!this._welcome.isLoggedIn) {
        // Гостю окно показываем при каждом открытии карточки участвующего мастера,
        // без ограничения по частоте: так решил владелец акции.
        this.welcomeCampaign = offer.campaign;
        this.showWelcomeModal = true;
        return;
      }
      // Вошедшему клиенту показываем только когда право реально доступно.
      this.welcomeSub = this._store$.pipe(
        select(selectProfileMainClient),
        filter(user => !!user?.id),
        take(1),
        switchMap(user => this._welcome.getMine(user!.id!)),
      ).subscribe(me => {
        this.welcomeCampaign = me?.status === 'available' ? (me.campaign ?? offer.campaign) : null;
      });
    });
  }

  // GET /work-location отдаёт массив: по одной записи на формат (Fixed/Mobile/Online).
  workLocations: IWorkLocation[] = [];
  geoList: IViewCoordinates[] = [];
  protected readonly WorkLocationType = WorkLocationType;

  get mobileLoc(): IWorkLocation | undefined {
    return this.workLocations.find(w => w.locationType === WorkLocationType.Mobile);
  }
  get fixedLoc(): IWorkLocation | undefined {
    return this.workLocations.find(w => w.locationType === WorkLocationType.Fixed);
  }
  get hasOnline(): boolean {
    return this.workLocations.some(w => w.locationType === WorkLocationType.Online);
  }
  get isMobileWork(): boolean {
    return !!this.mobileLoc;
  }

  /** Строка адреса: плоский адрес по всем форматам (через запятую); фолбэк — address от бэка. */
  get addressText(): string {
    const text = formatWorkLocations(this.workLocations);
    if (text) return text;
    return this.profile?.address ? getAddressProfile(this.profile.address) : '';
  }

  get hasAddress(): boolean {
    return !!this.addressText;
  }
  constructor(private _profileData: ProfileDataService,
                       private _seo: SeoService,
                       private _dictionaries: DictionaryService,
               private _analytics: AnalyticsService,
               private _router: Router,
               private _welcome: WelcomeCouponService,
               private _store$: Store,
               @Inject(PLATFORM_ID) private platformId: object) {

    this.tutorials = [
      {
        image:
          '/assets/img/1.22_b_a/manicure_1.jpg',
      },
      {

        image:
          '/assets/img/1.22_b_a/manicure_2.jpg',
      },
      {

        image:
          '/assets/img/1.22_b_a/manicure_3.jpg',
      },
      {

        image:
          '/assets/img/1.22_b_a/manicure_4.jpg',
      },
      {

        image:
          '/assets/img/1.22_b_a/manicure_5.jpg'
      },
    ];
    this.responsiveOptions = [
      {
        breakpoint: '1600px',
        numVisible: 5,
        numScroll: 1
      },
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '768px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '460px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '346px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }
  checkedService(subGroup: subGroup){
    subGroup.isChecked = !subGroup.isChecked;
    this.onChecked.emit(subGroup);
  }
  ngOnInit(): void {
    this._profileData.sendId.subscribe(result => {
      if (result) {
        this.id = result;
        this.maybeLoadWelcome();
          }
      }
    );
    this._profileData.canBook$.subscribe(val => {
      this.canBook = val;
      this.maybeLoadWelcome();
    });
    this._profileData.sendWorkLocation.subscribe(wl => {
      this.workLocations = wl ?? [];
      this.geoList = [];
      // Геокод городов откладываем до видимости карты (см. maybeLoadMap).
      this.maybeLoadMap();
    });
    this.SubscruptionBA = this._profileData.sendProfileBA.subscribe(
      result => {
        if (result){
          this.profile = result;
          // Геокод адреса запускаем лениво, когда блок карты попадёт во вьюпорт.
          this.maybeLoadMap();
            const name = this.profile.name ?? '';
            const canonicalPath = this.canonicalPath();
            const seo = publicProfileSeoFrom(this.profile, this.workLocations, canonicalPath);
            const pageTitle = seo.title;
            const pageDesc = seo.description;

            this._seo.update(canonicalPath, {
              title: pageTitle,
              description: pageDesc,
              ogType: 'profile',
              image: this.profile.avatarUrl && this.profile.id
                ? resolveAvatarUrl(this.profile.avatarUrl)
                : undefined,
            });
            this._seo.setJsonLd(this.buildProfileJsonLd(name, pageDesc, canonicalPath));
            // Title выставлен из асинхронных данных — только теперь шлём хит в Метрику,
            // чтобы просмотр записался с полным заголовком, а не со стухшим «OnWaves».
            // Роут помечен data.dynamicHit, поэтому app.component по нему хит не шлёт.
            this._analytics.trackPage(this._router.url, pageTitle);

     }});
    }

    /**
     * Канонический путь карточки — из сохранённого `link`, а НЕ из адресной строки.
     *
     * Бэк резолвит ссылку без учёта регистра (`translate-link`), но отдаёт её
     * как сохранена. Значит /Anna и /anna открывают одну и ту же карточку, и
     * канонизировать каждый вариант сам на себя означало бы завести в индекс
     * столько копий страницы, сколько написаний кто-то использовал в ссылках.
     * Единственный правильный адрес — тот, что мастер копирует кнопкой.
     *
     * Фолбэк на текущий URL — для странных значений в БД (часть старых `link`
     * лежит вместе со схемой, см. getLink() в main-profile): лучше оставить
     * каноникал как есть, чем собрать заведомо битый.
     */
    private canonicalPath(): string {
      return publicProfileCanonicalPath(this.profile?.link, this._router.url);
    }

    /**
     * Микроразметка карточки мастера (schema.org LocalBusiness).
     *
     * Заполняются только те поля, под которыми есть реальные данные. Пустые и
     * выдуманные значения тут опаснее их отсутствия: расхождение разметки с
     * содержимым страницы — повод для ручных санкций, а не просто потеря
     * расширенного сниппета.
     */
    private buildProfileJsonLd(name: string, description: string, canonicalPath: string): object | null {
      if (!this.profile || !name) return null;

      const data: Record<string, any> = {
        '@type': 'LocalBusiness',
        name,
        description,
        // Тот же адрес, что в canonical: разметка обязана указывать на ту же
        // страницу, иначе это два разных заявления об одной сущности.
        url: `${environment.siteUrl}${canonicalPath}`,
      };

      if (this.profile.avatarUrl) {
        data['image'] = resolveAvatarUrl(this.profile.avatarUrl);
      }
      if (this.profile.phone) {
        data['telephone'] = this.profile.phone;
      }

      const address = this.buildPostalAddress();
      if (address) {
        data['address'] = address;
      }

      const lat = this.profile.latitude;
      const lng = this.profile.longitude;
      if (typeof lat === 'number' && typeof lng === 'number' && (lat !== 0 || lng !== 0)) {
        data['geo'] = { '@type': 'GeoCoordinates', latitude: lat, longitude: lng };
      }

      // Разъездной мастер: города выезда — это и есть зона обслуживания.
      const cities = (this.mobileLoc?.cities ?? []).filter(c => !!c && c.trim().length > 0);
      if (cities.length) {
        data['areaServed'] = cities.map(city => ({ '@type': 'City', name: city.trim() }));
      }

      const rating = this.buildAggregateRating();
      if (rating) {
        data['aggregateRating'] = rating;
      }

      const graph: object[] = [
        data,
        this.breadcrumbJsonLd(name, canonicalPath),
      ];

      if (isPublicCellingsProfile(this.profile.link, canonicalPath)) {
        const faq = cellingsCalculatorFaq(displayOfferCities(this.workLocations ?? []));
        if (faq.length) {
          graph.push({
            '@type': 'FAQPage',
            mainEntity: faq.map(item => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: { '@type': 'Answer', text: item.a },
            })),
          });
        }
      }

      return { '@context': 'https://schema.org', '@graph': graph };
    }

    /** Крошки совпадают с видимой навигацией и ведут на эту карточку. */
    private breadcrumbJsonLd(name: string, canonicalPath: string): object {
      const site = environment.siteUrl;
      return {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Главная', item: `${site}/` },
          { '@type': 'ListItem', position: 2, name: 'Каталог', item: `${site}/catalog` },
          { '@type': 'ListItem', position: 3, name, item: `${site}${canonicalPath}` },
        ],
      };
    }

    /** Адрес для разметки: сначала фиксированное место работы, потом адрес профиля. */
    private buildPostalAddress(): object | null {
      const fixed = this.fixedLoc;
      const parts = fixed
        ? {
            country: fixed.country,
            region: fixed.region,
            city: fixed.city,
            street: fixed.street,
            house: fixed.house,
          }
        : {
            country: this.profile?.address?.country,
            region: this.profile?.address?.region,
            city: this.profile?.address?.city,
            street: this.profile?.address?.street,
            // ВНИМАНИЕ: в IViewAddress поле дома называется home, в IWorkLocation — house.
            house: this.profile?.address?.home,
          };

      // Без города адрес бессмысленен: он ничего не сообщает ни человеку,
      // ни поисковику, а разметку делает формально неполной.
      const locality = postalLocality(parts.city, citiesFromWorkLocations(this.workLocations ?? []));
      if (!locality) return null;

      const address: Record<string, any> = {
        '@type': 'PostalAddress',
        addressLocality: locality,
      };
      if (parts.country) address['addressCountry'] = parts.country;
      if (parts.region) address['addressRegion'] = parts.region;

      const street = [parts.street, parts.house].filter(Boolean).join(', ');
      if (street) address['streetAddress'] = street;

      return address;
    }

    /**
     * Рейтинг — только собственный (`rating` / `countReviews`).
     *
     * externalRating из Яндекса и подобных сюда класть НЕЛЬЗЯ: в разметке
     * агрегированная оценка должна быть собрана самой площадкой. Чужая выдаётся
     * за свою — это прямое нарушение, а не серая зона.
     */
    private buildAggregateRating(): object | null {
      const value = this.profile?.rating;
      const count = this.profile?.countReviews;
      if (typeof value !== 'number' || typeof count !== 'number') return null;
      if (!(count > 0) || !(value > 0) || value > 5) return null;

      return {
        '@type': 'AggregateRating',
        ratingValue: value,
        reviewCount: count,
        bestRating: 5,
        worstRating: 1,
      };
    }

    setServices($event: subGroup[]) {
        this.services = $event;
        this._profileData.transferChooseService(this.services);
    }

    /**
     * Запускает геокод и подготовку карты — только когда блок виден (mapVisible)
     * и профиль уже загружен. Однократно (mapRequested).
     */
    private maybeLoadMap(): void {
      if (!this.mapVisible || this.mapRequested || !this.profile || !isPlatformBrowser(this.platformId)) {
        return;
      }
      this.mapRequested = true;
      if (this.isMobileWork) {
        this.updateCityMarkers();
      } else if (this.profile.address) {
        this.geoPoint$ = this._dictionaries.getPoint(getAddressProfile(this.profile.address)).pipe(
          shareReplay({ bufferSize: 1, refCount: false })
        );
      }
    }

    ngOnDestroy(): void {
      this.mapObserver?.disconnect();
      this.welcomeSub?.unsubscribe();
      this.SubscruptionBA?.unsubscribe();
    }

    /** Геокодируем каждый город (разъездная работа) и ставим маркеры на карте. */
    private updateCityMarkers(): void {
      const m = this.mobileLoc;
      const cities = (m?.cities ?? []).filter(c => !!c && c.trim().length > 0);
      if (!cities.length) {
        this.geoList = [];
        return;
      }
      const region = m?.region ?? '';
      const country = m?.country ?? '';
      const requests = cities.map(city =>
        this._dictionaries.getPoint(`${country}, ${region}, ${city}`).pipe(
          catchError(() => of(null))
        )
      );
      forkJoin(requests).subscribe(results => {
        this.geoList = results.filter((r): r is IViewCoordinates => !!r);
      });
    }

    protected readonly getAddressProfile = getAddressProfile;
}
