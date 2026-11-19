import { AfterViewChecked, Component, ElementRef, HostListener, Inject, Input, OnChanges, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil, catchError, of, finalize, timer } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { LandingService } from '../../../../services/landing.service';
import { CalculatorService } from '../../../../services/calculator.service';
import { ProfileService } from '../../../../services/profile.service';
import { AnalyticsService } from '../../../../services/analytics.service';
import { IViewLanding } from '../../../DTO/views/landing/IViewLanding';
import { ILandingOffer } from '../../../DTO/views/landing/ILandingOffer';
import { IPromoAction } from '../../../DTO/views/landing/IPromoAction';
import { ICalculatorConnection } from '../../../DTO/views/calculator/ICalculator';
import { IWorkLocation } from '../../../DTO/views/IWorkLocation';
import { LandingTemplateType } from '../../../DTO/enums/landingTemplateType';
import { LandingOfferType } from '../../../DTO/enums/landingOfferType';
import { PromoActionKind } from '../../../DTO/enums/promoActionKind';
import { PromoActionRole } from '../../../DTO/enums/promoActionRole';
import { ProfileDataService } from '../../services/profile-data.service';
import { subGroup } from '../../../DTO/views/services/IViewSubGroups';
import { PaymentForType } from '../../../DTO/enums/paymentForType';
import { GroupService } from '../../../../services/groupservice';
import { selectProfileMainClient } from '../../../ngrx-store/mainClient/store.select';
import { IViewBusinessProfile } from '../../../DTO/views/business/IViewBussinessProfile';
import { measure } from '../../../../helpers/common/perf';
import { IPrice } from '../../../DTO/views/services/IPrice';
import {
  isOfferPublic,
  offerActions,
  offerPriceServiceName,
  offerPriceText,
  offerTemplateType,
} from '../../helpers/promo-offer';
import { AUTO_CALC_PARAM, wantsAutoCalculator } from '../../helpers/auto-calc';
import {
  displayOfferCities,
  formatCitiesLine,
  isCellingsOfferSlug,
  CELLINGS_CALC_BUTTON,
  CELLINGS_MEASURE_BUTTON,
  CELLINGS_CALC_SEO_H2,
  CELLINGS_CALC_SEO_LEAD,
  cellingsCalculatorFaq,
} from '../../helpers/cellings-offer';
import { promoByLanding } from '../../helpers/promo-terms';
import { PROMO_SEATS_CLOSED_TEXT, PromoPriceView, PromoSeatCard, promoPriceFromQuote, promoSeatCard } from '../../helpers/promo-seats';
import { lastPromoBookingAt, ULTRASOUND_ANCHOR, ULTRASOUND_COVER, ULTRASOUND_MASTER_ID, ULTRASOUND_PROMO } from '../../helpers/promo-seats';
import { promoMoscowDate, promoPeriodText } from '../../helpers/promo-seat-terms-text';
import { UserType } from '../../../DTO/classes/profiles/profile-user.model';
import { PromoSeatsService } from '../../../../services/promo-seats.service';
import { WelcomeCouponService } from '../../../../services/welcome-coupon.service';
import { welcomeIsFixed, formatRub } from '../../../../helpers/common/welcome-coupon';
import { PromoSeatQuote, PromoSeatState, PromoSeatTerms } from '../../../DTO/views/promo/promo-seats';
import { LandingState, resolveLandingState } from '../../helpers/landing-state';
import { liftStageToBody, lockPageScroll, pinCalculatorStage, restoreStageHome } from '../../helpers/calculator-stage';
import { getMaxUrl } from '../../../../helpers/common/messenger';
import { profilePromoOffer } from '../../helpers/profile-promo-presentation';

@Component({
  selector: 'app-landing-section',
  templateUrl: './landing-section.component.html',
  styleUrls: ['./landing-section.component.scss']
})
export class LandingSectionComponent implements OnInit, OnChanges, AfterViewChecked, OnDestroy {
  @Input() profileId: string | null = null;
  @Input() cabinet = false;
  /** Если задан — секция не грузит landing сама: источник истины у родителя. */
  @Input() landing: IViewLanding | null = null;
  @Input() landingState: LandingState | undefined;
  @Input() workLocations: IWorkLocation[] = [];

  @ViewChild('calcPendingRoot') private calcPendingRoot?: ElementRef<HTMLElement>;

  internalState: LandingState = 'loading';
  calcOffer: ILandingOffer | null = null;
  graphConnection: ICalculatorConnection | null = null;
  calcOpen = false;
  calcLoadError = false;
  private graphs: ICalculatorConnection[] = [];
  private graphsReady = false;
  graphsLoading = false;
  private pendingCalcAction: IPromoAction | null = null;
  /** Расчёт по `?calc=1` разбирается один раз за жизнь секции. */
  private autoCalcHandled = false;
  /** Панель открыта ссылкой, а не кликом: на отказ графа гостя никуда не уводим. */
  private autoCalcOpen = false;
  private pendingPinned = false;
  /** Заглушка «Загружаю вопросы…» уже выехала — плеер встаёт на её место без второго выезда. */
  pendingShown = false;
  private pendingPinFrame = 0;
  private pendingHost: HTMLElement | null = null;
  private pendingMark: Comment | null = null;
  private unlockPendingScroll: (() => void) | null = null;

  private allServices: subGroup[] = [];
  private currentUser: IViewBusinessProfile | null = null;
  private viewedProfile: IViewBusinessProfile | null = null;

  get bookingEnabled(): boolean { return this.cabinet || this.viewedProfile?.isGetOrder === true; }
  get contactPhone(): string | null { return this.viewedProfile?.phone ?? null; }
  private loadedProfileId: string | null = null;
  /** url роликов, старт которых уже отправлен: одно событие на ролик, не на каждый play. */
  private readonly startedVideos = new Set<string>();
  private readonly destroy$ = new Subject<void>();
  private readonly prices = new Map<string, IPrice>();
  /** Акция с местами: счётчик только из браузера — первый HTML может лежать в кеше. */
  private promoSeats: PromoSeatState | null = null;
  profilePromoPending = false;
  profilePromoError = false;
  readonly promoPeriodText = promoPeriodText;
  readonly promoMoscowDate = promoMoscowDate;
  get profilePromo(): PromoSeatState | null {
    const state = this.promoSeats;
    return state?.showOnProfile && state.closedReason !== 'disabled' && state.services.length > 0 ? state : null;
  }

  get profilePromoTermsPath(): string | null {
    const slug = this.bookingSlug();
    return slug ? `/${slug}/usloviya` : null;
  }
  get profilePromoTerms(): PromoSeatTerms | null {
    const state = this.profilePromo;
    return state ? { ...this.promoTerms, state, masterSlug: this.bookingSlug(), performerName: this.masterName } : null;
  }
  private profileOfferState: PromoSeatState | null = null;
  private profileOffer: ILandingOffer | null = null;
  get profilePromoOffer(): ILandingOffer | null {
    const state = this.profilePromo;
    if (state !== this.profileOfferState) {
      this.profileOfferState = state;
      this.profileOffer = state ? profilePromoOffer(state) : null;
    }
    return this.profileOffer;
  }
  ultrasoundCard: { offer: ILandingOffer; price: PromoPriceView | null } | null = null;
  ultrasoundLoadFailed = false;
  readonly ultrasoundAnchor = ULTRASOUND_ANCHOR;
  /** Сбой списка акции, не «мест нет». */
  promoLoadFailed = false;
  private readonly quotes = new Map<string, PromoSeatQuote>();
  private readonly quoteFailed = new Set<string>();
  private readonly quoteLoadingIds = new Set<string>();
  private quoteGen = 0;
  private stateGen = 0;
  /** Полные условия акции с местами. null — сервер не отдал, карточку не раздуваем выдумкой. */
  promoTerms: PromoSeatTerms | null = null;
  readonly promoClosedFallback = PROMO_SEATS_CLOSED_TEXT;
  readonly formatRub = formatRub;
  welcomeFixedRub: number | null = null;
  /** Оффер, на котором нажали запись на демо-странице: под ним подсказка вместо перехода. */
  demoHintOfferId: string | null = null;

  constructor(
    private landingService: LandingService,
    private promoSeatsService: PromoSeatsService,
    private welcomeCoupons: WelcomeCouponService,
    private calculatorService: CalculatorService,
    private groupService: GroupService,
    private profileService: ProfileService,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private profileData: ProfileDataService,
    private analytics: AnalyticsService,
    @Inject(PLATFORM_ID) private readonly platformId: object,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {
    this.store.pipe(select(selectProfileMainClient), takeUntil(this.destroy$))
      .subscribe((user: IViewBusinessProfile | null) => {
        const prev = this.currentUser?.id ?? null;
        this.currentUser = user;
        if (prev !== (user?.id ?? null) && this.promoSeats) {
          this.loadQuotes(this.promoSeats);
        }
      });
    this.profileData.sendProfileBA.pipe(takeUntil(this.destroy$))
      .subscribe(profile => this.viewedProfile = profile);
  }

  ngOnInit(): void {
    this.tryLoad();
    this.tryAutoOpenCalculator();
    if (isPlatformBrowser(this.platformId)) {
      timer(60_000, 60_000).pipe(takeUntil(this.destroy$)).subscribe(() => this.refreshProfilePromo());
    }
  }

  @HostListener('document:visibilitychange')
  refreshProfilePromo(): void {
    if (isPlatformBrowser(this.platformId) && this.promoSeats?.showOnProfile && !this.document.hidden && !this.profilePromoPending) {
      this.fetchSeatState();
    }
  }

  bookProfilePromo(serviceId: string): void {
    const campaign = this.profilePromo;
    const master = this.profileId;
    const slug = this.bookingSlug();
    if (!campaign || !master || !slug || campaign.status !== 'open' || this.profilePromoPending ||
        !this.bookingEnabled || this.viewedProfile?.isPromo) return;
    this.profilePromoPending = true;
    this.profilePromoError = false;
    this.promoSeatsService.readState(master, campaign.code).pipe(
      takeUntil(this.destroy$), finalize(() => this.profilePromoPending = false),
    ).subscribe(result => {
      if (this.profileId !== master) return;
      if (result.kind !== 'ready' || !result.value) {
        this.profilePromoError = true;
        return;
      }
      this.promoSeats = result.value;
      if (result.value.status !== 'open' || !result.value.services.some(s => s.serviceId === serviceId)) return;
      void this.router.navigate(['/', slug, 'choose-date'], {
        queryParams: { serviceId, promoCampaign: campaign.code },
      });
    });
  }

  ngOnChanges(): void {
    this.tryLoad();
    this.tryAutoOpenCalculator();
  }

  ngAfterViewChecked(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const root = this.calcPendingRoot?.nativeElement;
    if (!this.calcPending || !root) {
      this.unbindPendingPin();
      return;
    }
    // Переносим и ставим заглушку один раз, а не на каждой проверке изменений.
    if (this.pendingPinned) {
      return;
    }
    this.pendingPinned = true;
    this.pendingShown = true;
    this.pendingHost = root;
    this.pendingMark = liftStageToBody(root, this.document, this.pendingMark);
    this.unlockPendingScroll = lockPageScroll(this.document);
    pinCalculatorStage(root, this.document);
    window.addEventListener('resize', this.onPendingViewport);
  }

  ngOnDestroy(): void {
    this.unbindPendingPin();
    this.destroy$.next();
    this.destroy$.complete();
  }

  get viewState(): LandingState {
    return this.landingState ?? this.internalState;
  }

  get activeOffers(): ILandingOffer[] {
    if (!this.landing?.offers) {
      return [];
    }
    return this.landing.offers
      .filter(offer => this.cabinet ? offer.isActive : isOfferPublic(offer))
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }

  get cardTemplateType(): LandingTemplateType | null {
    return this.landing?.templateType ?? null;
  }

  get isCampaign(): boolean {
    return this.activeOffers.some(offer =>
      offerTemplateType(offer, this.landing?.templateType) === LandingTemplateType.Campaign)
      || this.isCellingsProfile;
  }

  /** На /cellings skeleton не сериализуем: робот должен увидеть h1 и кнопку. */
  get showLandingSkeleton(): boolean {
    return this.viewState === 'loading' && !this.isCellingsProfile;
  }

  get citiesLine(): string {
    return formatCitiesLine(displayOfferCities(this.workLocations ?? []));
  }

  readonly calcSeoTitle = CELLINGS_CALC_SEO_H2;
  readonly calcSeoLead = CELLINGS_CALC_SEO_LEAD;

  get calcSeoFaq() {
    return cellingsCalculatorFaq(displayOfferCities(this.workLocations ?? []));
  }

  get visibleOffers(): ILandingOffer[] {
    if (this.viewState === 'ready') {
      return this.activeOffers;
    }
    if (this.isCellingsProfile) {
      return [this.cellingsShellOffer];
    }
    return [];
  }

  private readonly cellingsShellOffer: ILandingOffer = {
    offerType: LandingOfferType.UniqueService,
    title: '',
    description: '',
    buttonText: CELLINGS_CALC_BUTTON,
    isActive: true,
    sortOrder: 0,
    benefits: [],
    actions: [
      {
        role: PromoActionRole.Primary,
        kind: PromoActionKind.Calculator,
        text: CELLINGS_CALC_BUTTON,
        serviceId: null,
        profileCalculatorId: null,
      },
      {
        role: PromoActionRole.Secondary,
        kind: PromoActionKind.Booking,
        text: CELLINGS_MEASURE_BUTTON,
        serviceId: null,
        profileCalculatorId: null,
      },
    ],
  };

  /** Тот же разбор контакта, что у кнопки «Написать в MAX» на профиле. */
  get masterMaxUrl(): string | null {
    return getMaxUrl(this.viewedProfile?.max) || null;
  }

  get masterName(): string | null {
    return this.viewedProfile?.name ?? null;
  }

  /** Панель уже просят открыть, схема ещё едет — чтобы клик не выглядел мёртвым. */
  get calcPending(): boolean {
    return this.calcOpen && !this.graphConnection;
  }

  get calcMissing(): boolean {
    return this.calcPending && this.graphsReady && !this.calcLoadError && !this.graphsLoading;
  }

  promoCardFor(offer: ILandingOffer): PromoSeatCard | null {
    const card = this.cabinet ? null : promoSeatCard(this.promoSeats, offer, this.bookingSlug());
    if (!card?.serviceId || card.pending) {
      return card;
    }
    // Пока quote не пришёл, не показываем гостевой итог из общего state: он включает 20 % даже когда мест нет.
    return {
      ...card,
      seatsText: null,
      caption: null,
      listAmount: null,
      clientPays: null,
      promoDiscount: null,
      couponDiscount: null,
    };
  }

  priceView(offer: ILandingOffer): PromoPriceView | null {
    const card = this.promoCardFor(offer);
    if (!card?.serviceId || card.pending) {
      return null;
    }
    return promoPriceFromQuote(this.quotes.get(card.serviceId), card.serviceName, this.promoSeats?.discountPercent ?? null);
  }

  priceLoading(offer: ILandingOffer): boolean {
    const id = this.promoCardFor(offer)?.serviceId;
    return !!id && this.quoteLoadingIds.has(id);
  }

  priceError(offer: ILandingOffer): boolean {
    const id = this.promoCardFor(offer)?.serviceId;
    return !!id && this.quoteFailed.has(id);
  }

  retryPromo(): void {
    if (this.promoLoadFailed || this.ultrasoundLoadFailed || !this.promoSeats) {
      this.fetchSeatState();
      return;
    }
    this.loadQuotes(this.promoSeats);
  }

  get promoClosedText(): string {
    if (this.welcomeFixedRub) {
      return `Места с дополнительными 20 % закончились. Новым клиенткам доступна скидка ${this.welcomeFixedRub.toLocaleString('ru-RU')} ₽`;
    }
    return this.promoClosedFallback;
  }

  /**
   * Мест нет или срок вышел: герой не остаётся с текстом спеццены.
   * Сумму без 20 % показывает quote в этом же блоке.
   */
  promoClosedFor(offer: ILandingOffer): boolean {
    const card = this.promoCardFor(offer);
    return !!card && card.hero && !card.open && !card.pending;
  }

  bookPromo(offer: ILandingOffer): void {
    if (this.viewedProfile?.isPromo) {
      this.demoHintOfferId = offer.id ?? offer.serviceId ?? 'promo';
      return;
    }
    this.goBooking(this.promoCardFor(offer)?.serviceId ?? null);
  }

  get consultationServiceId(): string | null {
    const hit = this.allServices.find(item => /консультац/i.test(item.name ?? ''));
    return hit?.id ?? null;
  }

  onConsultation(): void {
    if (this.viewedProfile?.isPromo) {
      this.demoHintOfferId = 'consultation';
      return;
    }
    this.goBooking(this.consultationServiceId);
  }

  termsFor(offer: ILandingOffer): { path: string; fragment: string; slug: string } | null {
    const seats = this.promoCardFor(offer);
    if (seats) {
      return { path: seats.termsPath, fragment: '', slug: this.bookingSlug() ?? '' };
    }
    const slug = this.bookingSlug();
    const promo = promoByLanding(slug, offer.analyticsKey, offer.serviceId);
    if (!slug || !promo) {
      return null;
    }
    return { path: `/${slug}/akcii`, fragment: promo.anchor, slug };
  }

  priceFor(offer: ILandingOffer): string | null {
    const text = offerPriceText(offer, this.prices, offer.calculator);
    if (!text || offerActions(offer).some(action => action.kind === PromoActionKind.Calculator)) {
      return text;
    }
    const price = offer.serviceId ? this.prices.get(offer.serviceId) : undefined;
    // У связанной услуги фиксированная цена; «от» нужно только диапазону или расчёту.
    return price && !price.isRange ? text.replace(/^от\s+/, '') : text;
  }

  priceServiceName(offer: ILandingOffer): string | null {
    const names = new Map<string, string>();
    for (const service of this.allServices) {
      if (service.id && service.name) {
        names.set(service.id, service.name);
      }
    }
    if (offer.serviceId && offer.serviceName) {
      names.set(offer.serviceId, offer.serviceName);
    }
    return offerPriceServiceName(offer, names, offer.calculator);
  }

  templateFor(offer: ILandingOffer): LandingTemplateType {
    const type = offerTemplateType(offer, this.landing?.templateType);
    if (this.isCellingsProfile) {
      return LandingTemplateType.Campaign;
    }
    return type;
  }

  get isCellingsProfile(): boolean {
    return isCellingsOfferSlug(this.route.snapshot.paramMap.get('id'))
      || isCellingsOfferSlug(this.viewedProfile?.link);
  }

  onAction(offer: ILandingOffer, action: IPromoAction): void {
    // Демо: сервер запись не примет — не ведём в календарь, а объясняем на месте.
    if (action.kind === PromoActionKind.Booking && this.viewedProfile?.isPromo && !this.cabinet) {
      this.demoHintOfferId = offer.id ?? null;
      return;
    }
    if (action.kind === PromoActionKind.Calculator) {
      this.openCalculator(offer, action);
      return;
    }
    this.goBooking(
      action.serviceId
      || offer.serviceId
      || (this.isCellingsProfile ? this.measurementServiceId() : null),
    );
  }

  onGraphBooking(serviceId: string): void {
    this.calcOpen = false;
    this.goBooking(serviceId || this.measurementServiceId());
  }

  /** Новый расчёт создан — calculator_start. Открытие панели само по себе событием не считается. */
  onCalcStarted(): void {
    this.sendWhoisOption('calculator_start');
  }

  /** После сметы клиент открыл MAX мастера — не путать с click_max на карточке. */
  onWriteMaster(): void {
    this.sendWhoisOption('calculator_max');
    this.analytics.trackMessenger(this.bookingSlug());
  }

  onCalcFinished(): void {
    this.sendWhoisOption('calculator_complete');
  }

  onCalcClosed(): void {
    this.releasePendingStage();
    this.pendingShown = false;
    this.calcOpen = false;
    this.calcLoadError = false;
    this.graphConnection = null;
    this.pendingCalcAction = null;
    this.autoCalcOpen = false;
  }

  /**
   * Рекламная ссылка `/cellings?calc=1` открывает расчёт сразу, без второго клика:
   * объявление обещает расчёт, гость не должен искать кнопку.
   *
   * Только в браузере — в серверную разметку плеер не попадает (`h1`, цена и кнопка
   * первого HTML не меняются). Без параметра, с мусорным значением, без акции с
   * расчётом и в кабинете страница ведёт себя ровно как прежде.
   */
  private tryAutoOpenCalculator(): void {
    if (this.autoCalcHandled || this.cabinet || !isPlatformBrowser(this.platformId)) {
      return;
    }
    if (!wantsAutoCalculator(this.route.snapshot.queryParamMap.get(AUTO_CALC_PARAM))) {
      this.autoCalcHandled = true;
      return;
    }
    const offer = this.visibleOffers.find(item =>
      offerActions(item).some(action => action.kind === PromoActionKind.Calculator));
    if (!offer) {
      // Акция ещё едет — вернёмся сюда, когда приедет. Иначе расчёта у этой акции нет.
      if (this.viewState !== 'loading') {
        this.autoCalcHandled = true;
      }
      return;
    }
    const action = offerActions(offer).find(item => item.kind === PromoActionKind.Calculator);
    if (!action) {
      this.autoCalcHandled = true;
      return;
    }
    this.autoCalcHandled = true;
    this.autoCalcOpen = true;
    this.openCalculator(offer, action);
  }

  retryCalculator(): void {
    this.calcLoadError = false;
    this.graphsReady = false;
    this.loadGraphs();
  }

  private openCalculator(offer: ILandingOffer, action: IPromoAction): void {
    this.calcOffer = offer;
    this.pendingCalcAction = action;
    this.graphConnection = this.resolveGraph(action);
    if (this.graphConnection) {
      this.pendingCalcAction = null;
      this.revealCalculator();
      return;
    }
    this.graphsReady = false;
    this.revealCalculator();
    this.loadGraphs();
  }

  private revealCalculator(): void {
    const open = () => {
      this.calcOpen = true;
    };
    if (!isPlatformBrowser(this.platformId)) {
      open();
      return;
    }
    setTimeout(open, 0);
  }

  /** Граф считает по всему прайсу; без явного id берём единственное подключение профиля. */
  private resolveGraph(action?: IPromoAction | null): ICalculatorConnection | null {
    if (!this.graphs.length) {
      return null;
    }
    const id = action?.profileCalculatorId;
    if (id) {
      return this.graphs.find(item => item.profileCalculatorId === id) ?? null;
    }
    return this.graphs[0];
  }

  private goBooking(serviceId?: string | null): void {
    const link = this.bookingSlug();
    if (!link) {
      return;
    }
    const whoIs = this.currentUser?.id ?? null;
    if (this.profileId) {
      this.profileService.sendWhoisVisit(this.profileId, 'click_record', whoIs)
        .pipe(takeUntil(this.destroy$)).subscribe({ error: () => {} });
    }
    if (!serviceId) {
      this.router.navigate(['/', link, 'choose-service']);
      return;
    }
    const service = this.allServices.find(item => item.id === serviceId);
    if (service && service.paymentForType !== PaymentForType.ForHour) {
      this.profileData.transferChooseService([service]);
      const next = service.isTimeUnlimited ? 'confirm-record' : 'choose-date';
      this.router.navigate(['/', link, next], { queryParams: { serviceId } });
      return;
    }
    this.router.navigate(['/', link, 'choose-service'], { queryParams: { serviceId } });
  }

  /**
   * Посетитель включил ролик акции: Метрика + get-reference → Kafka → бот администратора.
   * Один ролик считается один раз за жизнь секции: событие про интерес, а не про досмотры.
   */
  onVideoStart(url: string): void {
    if (!isPlatformBrowser(this.platformId) || this.startedVideos.has(url)) {
      return;
    }
    this.startedVideos.add(url);
    this.analytics.trackEvent('landing', 'click_video', this.profileId ?? undefined);
    this.sendWhoisOption('click_video');
  }

  /**
   * get-reference: calculator_start, calculator_complete, calculator_max, click_video.
   * Каждое уходит в Kafka → бот администратора, поэтому отдаём их по одному на действие.
   */
  private sendWhoisOption(option: string): void {
    if (!isPlatformBrowser(this.platformId) || !this.profileId) {
      return;
    }
    const whoIs = this.currentUser?.id ?? null;
    this.profileService.sendWhoisVisit(this.profileId, option, whoIs)
      .pipe(takeUntil(this.destroy$)).subscribe({ error: () => {} });
  }

  private measurementServiceId(): string | null {
    const hit = this.allServices.find(item =>
      /замер/i.test((item.name ?? '').toLowerCase().replace(/ё/g, 'е')));
    return hit?.id ?? null;
  }

  private tryLoad(): void {
    if (!this.profileId || this.profileId === this.loadedProfileId) {
      return;
    }
    this.loadedProfileId = this.profileId;
    if (this.landingState == null) {
      this.loadLanding();
    }
    this.loadServices();
    this.loadGraphs();
    this.loadPromoSeats();
  }

  private clientIdForQuote(): string | null {
    const user = this.currentUser;
    if (!this.welcomeCoupons.isLoggedIn || !user?.id || user.userType !== UserType.User) {
      return null;
    }
    return user.id;
  }

  /** По услуге акции, не по всей корзине. Ответ quote не пересчитываем. */
  private loadQuotes(state: PromoSeatState): void {
    if (!isPlatformBrowser(this.platformId) || !this.profileId || state.closedReason === 'disabled') {
      return;
    }
    const masterId = this.profileId;
    const gen = ++this.quoteGen;
    const clientId = this.clientIdForQuote();
    for (const service of state.services) {
      const serviceId = service.serviceId;
      this.quoteLoadingIds.add(serviceId);
      this.quoteFailed.delete(serviceId);
      this.quotes.delete(serviceId);
      this.promoSeatsService.quoteDetailed(masterId, [serviceId], clientId)
        .pipe(takeUntil(this.destroy$))
        .subscribe(result => {
          if (gen !== this.quoteGen) {
            return;
          }
          this.quoteLoadingIds.delete(serviceId);
          if (result.kind === 'ready' && result.value) {
            this.quotes.set(serviceId, result.value);
            this.quoteFailed.delete(serviceId);
            return;
          }
          this.quotes.delete(serviceId);
          this.quoteFailed.add(serviceId);
        });
    }
  }

  private loadPromoSeats(): void {
    if (this.cabinet || !this.profileId || !isPlatformBrowser(this.platformId)) {
      return;
    }
    this.fetchSeatState();
    this.welcomeCoupons.getOffer(this.profileId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(offer => {
        this.welcomeFixedRub = welcomeIsFixed(offer?.campaign) ? (offer?.campaign?.fixedDiscountRub ?? null) : null;
      });
    const slug = this.bookingSlug();
    if (slug) {
      this.promoSeatsService.getTerms(slug)
        .pipe(takeUntil(this.destroy$))
        .subscribe(terms => this.promoTerms = terms);
    }
  }

  private fetchSeatState(): void {
    if (this.cabinet || !this.profileId || !isPlatformBrowser(this.platformId)) {
      return;
    }
    const gen = ++this.stateGen;
    this.fetchUltrasoundState(gen);
    this.promoSeatsService.readState(this.profileId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (gen !== this.stateGen) {
          return;
        }
        if (result.kind === 'failed') {
          this.promoLoadFailed = true;
          if (this.promoSeats?.showOnProfile) {
            this.profilePromoError = true;
            return;
          }
          this.promoSeats = null;
          return;
        }
        this.profilePromoError = false;
        this.promoLoadFailed = false;
        this.promoSeats = result.value;
        if (result.value && !result.value.showOnProfile) {
          this.loadQuotes(result.value);
        }
      });
  }

  private fetchUltrasoundState(generation: number): void {
    if (this.profileId !== ULTRASOUND_MASTER_ID) {
      this.ultrasoundCard = null;
      this.ultrasoundLoadFailed = false;
      return;
    }
    this.promoSeatsService.readState(this.profileId, ULTRASOUND_PROMO)
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (generation !== this.stateGen) return;
        this.ultrasoundLoadFailed = result.kind === 'failed';
        const state = result.kind === 'ready' ? result.value : null;
        this.ultrasoundCard = state?.code === ULTRASOUND_PROMO && state.exclusive
          && !['disabled', 'not_started'].includes(state.closedReason ?? '') ? this.makeUltrasoundCard(state) : null;
        if (window.location.hash === '#' + ULTRASOUND_ANCHOR && this.ultrasoundCard) {
          setTimeout(() => document.getElementById(ULTRASOUND_ANCHOR)?.scrollIntoView());
        }
      });
  }

  private makeUltrasoundCard(state: PromoSeatState): { offer: ILandingOffer; price: PromoPriceView | null } {
    const service = state.status === 'open' && state.seatsLeft > 0 ? state.services[0] : null;
    const bookingUntil = promoMoscowDate(lastPromoBookingAt(state.endsAt), false);
    const visitUntil = promoMoscowDate(state.visitDeadline, false);
    const description = service
      ? `Приглашаю на ультразвуковую чистку лица в Озёрах. Вторую половину стоимости оплачивает OnWaves. Запишитесь по ${bookingUntil} и приходите по ${visitUntil} включительно. Одна процедура по акции на клиентку. Дополнительные купоны и скидки не суммируются.`
      : state.closedReason === 'seats_exhausted' ? 'Все места по акции заняты.' : 'Запись по акции закрыта.';
    return {
      offer: {
        offerType: LandingOfferType.Discount,
        templateType: LandingTemplateType.Premium,
        title: 'Ультразвуковая чистка лица за полцены',
        badge: 'Акция OnWaves · Озёры',
        description,
        imageUrl: ULTRASOUND_COVER,
        footerNote: 'Иллюстрация процедуры',
        serviceId: service?.serviceId,
        buttonText: service ? `Записаться за ${formatRub(service.clientPays)}` : '',
        proposals: service ? [{ text: `Скидка ${state.discountPercent}%`, tone: 'sale' }] : [],
        benefits: [],
        isActive: true,
        sortOrder: 0,
      },
      price: service ? {
        serviceName: null,
        listAmount: service.listAmount,
        promoDiscount: service.promoDiscount,
        couponDiscount: service.couponDiscount,
        payable: service.clientPays,
        discountPercent: state.discountPercent,
        seatsLeft: state.seatsLeft,
        seatsLimit: state.seatsLimit,
        pendingCheck: false,
        notice: null,
      } : null,
    };
  }

  bookUltrasound(serviceId: string | null | undefined): void {
    const slug = this.bookingSlug();
    if (!slug || !this.bookingEnabled || !serviceId || this.ultrasoundCard?.offer.serviceId !== serviceId) return;
    void this.router.navigate(['/', slug, 'choose-date'], {
      queryParams: { serviceId, promoCampaign: ULTRASOUND_PROMO }
    });
  }

  private loadGraphs(): void {
    if (!this.profileId || this.graphsLoading) {
      return;
    }
    this.graphsLoading = true;
    this.calcLoadError = false;
    this.calculatorService.getByProfile(this.profileId)
      .pipe(
        catchError(() => {
          this.calcLoadError = true;
          return of([] as ICalculatorConnection[]);
        }),
        finalize(() => this.graphsLoading = false),
        takeUntil(this.destroy$)
      )
      .subscribe(list => {
        this.graphs = list;
        this.graphsReady = true;
        const wanted = this.calcOpen || !!this.pendingCalcAction;
        const action = this.pendingCalcAction
          ?? this.calcOffer?.actions?.find(item => item.kind === PromoActionKind.Calculator)
          ?? null;
        this.pendingCalcAction = null;
        if (!wanted || !this.calcOffer) {
          return;
        }
        this.graphConnection = this.resolveGraph(action);
        if (this.graphConnection) {
          this.calcLoadError = false;
          this.calcOpen = true;
          this.autoCalcOpen = false;
          return;
        }
        if (this.isCellingsProfile && !this.cabinet) {
          this.calcOpen = false;
          // Открыто ссылкой, а не кликом: перехода на запись гость не просил — остаёмся на странице.
          if (!this.autoCalcOpen) {
            this.goBooking(this.measurementServiceId());
          }
          this.autoCalcOpen = false;
          return;
        }
        this.autoCalcOpen = false;
        this.calcOpen = true;
      });
  }

  private loadLanding(): void {
    this.internalState = 'loading';
    this.landingService.getLanding(this.profileId!).pipe(takeUntil(this.destroy$)).subscribe(result => {
      this.landing = result.landing;
      this.internalState = resolveLandingState(result, { cabinet: this.cabinet });
      // Акция приехала: если ссылка просила расчёт, открываем его теперь.
      this.tryAutoOpenCalculator();
    });
  }

  private loadServices(): void {
    measure('services', this.groupService.getAllServices(this.profileId!))
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: services => {
          this.allServices = services as subGroup[];
          this.prices.clear();
          for (const service of this.allServices) {
            if (service.id && service.price) {
              this.prices.set(service.id, service.price);
            }
          }
        },
        error: () => this.allServices = []
      });
  }

  private bookingSlug(): string | null {
    const ids = this.route.pathFromRoot
      .map(item => item.snapshot.paramMap.get('id'))
      .filter((id): id is string => !!id);
    const slug = ids.find(id => id !== this.profileId);
    if (slug) {
      return slug;
    }
    const fromProfile = this.viewedProfile?.link?.replace(/^https?:\/\//, '').split('/')[0];
    if (fromProfile) {
      return fromProfile;
    }
    const firstSeg = this.router.url.split('?')[0].split('/').filter(Boolean)[0];
    const reserved = new Set([
      'ba-edit', 'profilebisacc', 'profile-user', 'page-user', 'search', 'static',
      'catalog', 'landing', 'masters', 'clients', 'chat-page', 'notification', 'cabinet-ba',
      'giveaways', 'admin',
    ]);
    if (firstSeg && !reserved.has(firstSeg)) {
      return firstSeg;
    }
    return ids[0] ?? null;
  }

  private readonly onPendingViewport = (): void => {
    if (this.pendingPinFrame) {
      return;
    }
    this.pendingPinFrame = requestAnimationFrame(() => {
      this.pendingPinFrame = 0;
      const root = this.calcPendingRoot?.nativeElement;
      if (root) {
        pinCalculatorStage(root, this.document);
      }
    });
  };

  private releasePendingStage(): void {
    if (!this.pendingHost) {
      return;
    }
    restoreStageHome(this.pendingHost, this.pendingMark);
    this.pendingHost = null;
    this.pendingMark = null;
  }

  private unbindPendingPin(): void {
    this.unlockPendingScroll?.();
    this.unlockPendingScroll = null;
    if (this.pendingPinned && isPlatformBrowser(this.platformId)) {
      window.removeEventListener('resize', this.onPendingViewport);
      if (this.pendingPinFrame) {
        cancelAnimationFrame(this.pendingPinFrame);
        this.pendingPinFrame = 0;
      }
    }
    this.pendingPinned = false;
    if (this.pendingHost?.parentNode) {
      this.pendingHost.remove();
    }
    if (this.pendingMark?.parentNode) {
      this.pendingMark.parentNode.removeChild(this.pendingMark);
    }
    this.pendingHost = null;
    this.pendingMark = null;
  }
}
