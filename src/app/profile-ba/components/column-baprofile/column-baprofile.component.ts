import {Component, ElementRef, EventEmitter, HostListener, Inject, Input, NgZone, OnChanges, OnDestroy, OnInit, Output, PLATFORM_ID, SimpleChanges, ViewChild} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {Schedule} from "../../../DTO/classes/schedules/schedule";
import {ScheduleService} from "../../../../services/schedule.service";
import {DomSanitizer} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {ProfileDataService} from "../../services/profile-data.service";
import {ProfileService} from "../../../../services/profile.service";
import {IViewBusinessProfile} from "../../../DTO/views/business/IViewBussinessProfile";
import {select, Store} from "@ngrx/store";
import {selectProfileMainClient} from "../../../ngrx-store/mainClient/store.select";
import {
  ModalRegisterComponent
} from "../../../components/modals/register-profile/modal-register/modal-register.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { DeviceDetectorService } from 'ngx-device-detector';
import { Subject, takeUntil } from 'rxjs';
import { SocialType } from 'src/app/DTO/enums/socialType';
import { WorkLocationType } from 'src/app/DTO/enums/workLocationType';
import { IWorkLocation } from 'src/app/DTO/views/IWorkLocation';
import { ExternalReviewSource } from 'src/app/DTO/enums/externalReviewSource';
import { getAddressProfile, formatWorkLocations, workLocationLines } from 'src/helpers/common/address';
import { resolveAvatarUrl } from 'src/helpers/common/avatar1';
import { measure } from 'src/helpers/common/perf';
import { getMaxUrl as buildMaxUrl, getTelegramUrl as buildTelegramUrl } from 'src/helpers/common/messenger';
import { formatRuPhone } from 'src/helpers/common/phone';
import { isCellingsOfferSlug } from '../../helpers/cellings-offer';
import { isOwnWebsite as urlIsOwnWebsite } from 'src/helpers/common/website';
import { WelcomeCouponService } from 'src/services/welcome-coupon.service';
import { AnalyticsService } from 'src/services/analytics.service';
import { WelcomeCouponMe, WelcomeOffer } from 'src/app/DTO/views/promo/welcome-coupon';
import { formatRub, welcomeDeadlineText, welcomeHasOffer, welcomeIsFixed, welcomeOfferLine, welcomeTierList } from 'src/helpers/common/welcome-coupon';
import { switchMap, of } from 'rxjs';



@Component({
  selector: 'app-column-baprofile',
  templateUrl: './column-baprofile.component.html',
  styleUrls: ['./column-baprofile.component.scss'],
  host: {
    '[class.split-for-promo]': 'splitForPromo'
  },
  // ProfileService — корневой: резолвер публичной карточки уже прогрел кеш
  // get-full-baprofile / work-location, и колонка должна попасть в тот же экземпляр.
  providers: [ScheduleService]
})
export class ColumnBAProfileComponent implements OnInit, OnChanges, OnDestroy {

  isAuth: boolean = false;
  destroy$: Subject<void> = new Subject<void>();
  protected SocialType = SocialType;
  protected readonly ExternalReviewSource = ExternalReviewSource;

  sendMessages(receiverId: string|null|undefined) {
    if (receiverId){
      this._router.navigate(['chat-page'],
        { queryParams: {receiverId: receiverId}});
    }
  }

  deviceInfo: any;

  @Input() id: string | null = null;
  /** На публичном профиле шапка и «О мастере» участвуют в сетке с акцией. */
  @Input() splitForPromo = false;
  openOrNot: any; //для вспылвающего меню при нажатии- записаться Онлайн
  businessProfile: IViewBusinessProfile | null = null;
  /** Раскрытие «О мастере» на узком экране. На десктопе кнопка скрыта стилями. */
  aboutOpen = false;
  aboutIsLong = false;
  protected readonly WorkLocationType = WorkLocationType;
  // GET /work-location отдаёт массив: по одной записи на формат (Fixed/Mobile/Online).
  workLocations: IWorkLocation[] = [];

  get fixedLoc(): IWorkLocation | undefined {
    return this.workLocations.find(w => w.locationType === WorkLocationType.Fixed);
  }
  get mobileLoc(): IWorkLocation | undefined {
    return this.workLocations.find(w => w.locationType === WorkLocationType.Mobile);
  }
  get hasOnline(): boolean {
    return this.workLocations.some(w => w.locationType === WorkLocationType.Online);
  }
  get isMobileWork(): boolean {
    return !!this.mobileLoc;
  }

  /**
   * Адрес для показа: собираем сегменты по всем выбранным форматам
   * (офис — полный адрес, разъездная — регион + города, онлайн — «Онлайн»).
   * Если разбор пуст — фолбэк на готовую строку address.city от бэка.
   */
  get addressLines(): string[] {
    const lines = workLocationLines(this.workLocations);
    if (lines.length) return lines;
    const fallback = this.businessProfile?.address ? getAddressProfile(this.businessProfile.address) : '';
    return fallback ? [fallback] : [];
  }

  get addressText(): string {
    const text = formatWorkLocations(this.workLocations);
    if (text) return text;
    return this.businessProfile?.address ? getAddressProfile(this.businessProfile.address) : '';
  }

  get hasAddress(): boolean {
    return !!this.addressText;
  }

  /** Три строки на телефоне — около 140 символов, либо явные переносы. */
  private syncAbout(): void {
    const text = this.businessProfile?.about?.trim() ?? '';
    const lines = text ? text.split(/\n/).length : 0;
    this.aboutIsLong = lines > 3 || text.length > 140;
    this.aboutOpen = false;
  }

  /** Пилот потолков: H1 услуги живёт в оффере, здесь имя не h1. Запись в колонке оставляем. */
  get isCellingsOffer(): boolean {
    return isCellingsOfferSlug(this.route.snapshot.paramMap.get('id'))
      || isCellingsOfferSlug(this.businessProfile?.link);
  }
  scheduleToday: string | undefined;
  isHasSchedule: boolean = false;
  /** Часы приёма на сегодня: «10:00 - 19:00», не «Сегодня не работает». */
  hasReceptionHours = false;
  schedulesListFree: string[]|undefined = [];
  isHasRecord = true;
  isHandset = true;
  profileUA: IViewBusinessProfile | null = null;
  constructor(private businessProfileService: ProfileService,
              private _apiSchedule: ScheduleService,
              private _router: Router,
              private modalService: NgbModal,
              private store$: Store,
              private route: ActivatedRoute,
              private _dataService: ProfileDataService,
              private sanitizer: DomSanitizer,
              private deviceService: DeviceDetectorService,
              private _coupons: WelcomeCouponService,
              private analytics: AnalyticsService,
              private zone: NgZone,
              @Inject(PLATFORM_ID) private platformId: object) {
  }

  // ── Купон мастера ────────────────────────────────────────────────────────
  // Условия приходят с сервера. Плашка показывается, только если кампания активна,
  // мастер в ней участвует и у клиента право ещё не израсходовано.
  couponOffer: WelcomeOffer | null = null;
  couponMine: WelcomeCouponMe | null = null;
  /** Нижняя кнопка, когда билет уехал из первого экрана. Только телефон. */
  couponDocked = false;
  private couponLoadedFor: string | null = null;
  private couponObserver?: IntersectionObserver;

  @ViewChild('maryCoupon')
  set maryCouponRef(ref: ElementRef<HTMLElement> | undefined) {
    this.watchMaryCoupon(ref?.nativeElement);
  }

  get showCouponBadge(): boolean {
    if (!this.businessProfile?.isGetOrder || this.businessProfile.isPromo) {
      return false;
    }
    if (!this.couponOffer?.active || !this.couponOffer.masterParticipates) {
      return false;
    }
    if (!welcomeHasOffer(this.couponOffer.campaign)) {
      return false;
    }
    // Вошедшему — только пока право доступно; гостю показываем как приглашение.
    return this.isAuth ? this.couponMine?.status === 'available' : true;
  }

  /** «200–500 ₽» по уровням кампании; одна ступень — просто её сумма. */
  get couponAmountText(): string {
    if (welcomeIsFixed(this.couponOffer?.campaign)) {
      return `${this.couponOffer?.campaign?.policyId ? 'до ' : ''}${formatRub(this.couponOffer?.campaign?.fixedDiscountRub)}`;
    }
    const tiers = welcomeTierList(this.couponOffer?.campaign);
    if (!tiers.length) {
      return '';
    }
    const min = tiers[0].discount;
    const max = tiers[tiers.length - 1].discount;
    return min === max
      ? formatRub(min)
      : `${min.toLocaleString('ru-RU')}–${formatRub(max)}`;
  }

  get couponBadgeTitle(): string {
    return this.isAuth
      ? `Ваш купон: скидка ${this.couponAmountText}`
      : `Купон на скидку ${this.couponAmountText}`;
  }

  /**
   * Билет «500 ₽» выключен: это ступень от 7 000 ₽. Первый экран Mary — шугаринг ног
   * за 1 700 ₽, купон к нему 200 ₽ и стоит на карточке акции.
   */
  get showMaryCoupon(): boolean {
    return false;
  }

  get couponHeroAmount(): string {
    const tiers = welcomeTierList(this.couponOffer?.campaign);
    const top = tiers[tiers.length - 1];
    return top ? formatRub(top.discount) : '';
  }

  get couponHeroNote(): string {
    const tiers = welcomeTierList(this.couponOffer?.campaign);
    const top = tiers[tiers.length - 1];
    return top ? `на первую запись от ${top.threshold.toLocaleString('ru-RU')} ₽` : '';
  }

  get couponTiers() {
    return welcomeTierList(this.couponOffer?.campaign);
  }

  get couponDeadline(): string | null {
    return welcomeDeadlineText(this.couponOffer?.campaign?.endsAt);
  }

  bookWithCoupon(): void {
    this._coupons.track('clicked', this.couponOffer?.campaign?.code);
    this.onlineRecord();
  }

  private watchMaryCoupon(el?: HTMLElement): void {
    this.couponObserver?.disconnect();
    this.couponObserver = undefined;
    this.couponDocked = false;
    if (!el || !isPlatformBrowser(this.platformId) || typeof IntersectionObserver === 'undefined') {
      return;
    }
    this.couponObserver = new IntersectionObserver(entries => {
      const docked = entries.every(entry => !entry.isIntersecting);
      this.zone.run(() => {
        this.couponDocked = docked;
      });
    });
    this.couponObserver.observe(el);
  }

  private loadCoupon(): void {
    const masterId = this.businessProfile?.id ?? this.id;
    if (!isPlatformBrowser(this.platformId) || !masterId || this.couponLoadedFor === masterId) {
      return;
    }
    this.couponLoadedFor = masterId;
    this._coupons.getOffer(masterId).pipe(
      switchMap(offer => {
        this.couponOffer = offer;
        const worthChecking = offer.active && offer.masterParticipates && this._coupons.isLoggedIn;
        return worthChecking ? this._coupons.getMine(null, masterId) : of(null);
      }),
      takeUntil(this.destroy$),
    ).subscribe(mine => this.couponMine = mine);
  }

  getTypeSocialLink(link:string){
    switch(true){
      case link.includes('instagram.com'): {
        return SocialType.INSTAGRAMM;
      }
      case link.includes('vk.com'): {
        return SocialType.VK;
      }
      case link.includes('youtube.com'): {
        return SocialType.YOUTUBE;
      }
      default: {
        return SocialType.ANOTHER;
      }
    }
  }


  ngOnDestroy(): void {
    this.couponObserver?.disconnect();
    this.destroy$.next();
    this.destroy$.complete();
  }
  async getSchedule(id: string) {
    measure('schedule-today', await this._apiSchedule.getProfileScheduleToday(id))
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: async _ => {
          const today = this._apiSchedule.getToday$.value;
          const message = today?.message ?? '';
          this.schedulesListFree = message ? message.split('\n') : [];
          // Часы относятся к сегодняшней дате. Запись на будущие даты разрешает профиль.
          this.hasReceptionHours = today?.code === 200 && /\d{1,2}:\d{2}/.test(message);
          this.isHasSchedule = this.hasReceptionHours;
        },
        error: () => {
          this.schedulesListFree = [];
          this.isHasSchedule = false;
          this.hasReceptionHours = false;
        }
      });
  }

  get telHref(): string | null {
    const raw = this.businessProfile?.phone ?? '';
    const digits = raw.replace(/\D/g, '');
    if (!digits) return null;
    return `tel:+${digits}`;
  }

  /** Номер одной строкой: в 360px-колонке маска ngx ломала его посередине. */
  get formattedPhone(): string {
    return formatRuPhone(this.businessProfile?.phone);
  }


  /** id, по которому уже загружены данные — защита от повторных запросов на каждый ngOnChanges. */
  private loadedProfileId: string | null = null;

  ngOnInit(): void {
    // Подписка на стор жила в ngOnChanges и создавалась заново на каждый вызов,
    // без takeUntil — накапливались подписки, а с ними и лишние прогоны CD.
    this.store$.pipe(select(selectProfileMainClient), takeUntil(this.destroy$)).subscribe(
        result => {
          this.profileUA = result;
          if (this.profileUA){
            this.isAuth = true;
          }
        }
    );
    // Резолвер публичной карточки кладёт профиль в шину до создания колонки.
    // Берём replay, чтобы h1 был в первом SSR HTML, не только после HTTP колонки.
    this._dataService.sendProfileBA.pipe(takeUntil(this.destroy$)).subscribe(profile => {
      if (profile) {
        this.businessProfile = profile;
        this.syncAbout();
        this.updateCanBook();
        this.loadCoupon();
      }
    });
    this._dataService.sendWorkLocation.pipe(takeUntil(this.destroy$)).subscribe(wl => {
      this.workLocations = wl ?? [];
    });
  }

  ngOnChanges(): void {
    this.isHandset = this.deviceService.isMobile() || this.deviceService.isTablet();

    // ngOnChanges вызывается на любое изменение входов; без этой проверки
    // GET work-location и GET get-full-baprofile уходили повторно.
    if (!this.id || this.id === this.loadedProfileId) {
      return;
    }
    this.loadedProfileId = this.id;

    // Для БА адрес берём из WorkLocation (там же квартира и список городов).
    // GET отдаёт массив: по одной записи на формат (Fixed/Mobile/Online).
    measure('work-location', this.businessProfileService.getWorkLocation(this.id)).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res) => {
        const data = res?.code === 200 ? res.data : null;
        this.workLocations = Array.isArray(data) ? data as IWorkLocation[] : (data ? [data as IWorkLocation] : []);
        this._dataService.transferWorkLocation(this.workLocations);
      },
      error: () => {
        // Не затираем локации, которые резолвер уже положил в шину.
        if (!this.workLocations.length) {
          this._dataService.transferWorkLocation([]);
        }
      }
    });
    measure('profile', this.businessProfileService.getBusinessProfileById(this.id)).pipe(takeUntil(this.destroy$)).subscribe({
      next: (businessProfile) => {
        if (businessProfile.code === 200) {
          this.businessProfile = businessProfile.data as IViewBusinessProfile;
          this.syncAbout();

          // Имя мастера, описание и CTA отдаём в шапку сразу. Раньше здесь стоял
          // `await this.getSchedule(...)` ПЕРЕД transferProfileBA — основной контент
          // профиля ждал ответа расписания и появлялся на один RTT позже.
          this._dataService.transferProfileBA(this.businessProfile);
          this.updateCanBook();

          if (this.businessProfile.isGetOrder){
            void this.getSchedule(this.id!);
          } else {
            this.hasReceptionHours = false;
            this.scheduleToday = 'Заказы не принимаются';
          }
        }
      },
      error: () => {
        if (!this.businessProfile) {
          this.updateCanBook();
        }
      }
    });
  }

  clickContact(arg0: string) {
    this.businessProfileService.sendWhoisVisit(this.businessProfile?.id!, arg0, this.profileUA ? this.profileUA.id! : null)
      .pipe(takeUntil(this.destroy$))
      .subscribe({error: () => {}});
    if (arg0 === 'click_call') {
      this.analytics.trackCall(this.masterSlug());
    }
    if (arg0 === 'click_message') {
      this.analytics.trackMessenger(this.masterSlug());
    }
  }

  private masterSlug(): string | undefined {
    return this.businessProfile?.link || this.route.snapshot.paramMap.get('id') || undefined;
  }


  private updateCanBook(): void {
    // Возможность записи задаётся настройкой мастера. Отсутствие свободного
    // времени сегодня не означает, что нельзя записаться на будущую дату.
    const canBook = !!this.businessProfile?.isGetOrder && !this.businessProfile?.isPromo;
    this._dataService.transferCanBook(canBook);
  }

  onlineRecord(option?: string) {
    if (this.businessProfile?.isPromo || !this.businessProfile?.isGetOrder) {
      return;
    }
    this._dataService.transferDate(null);
    this.businessProfileService.sendWhoisVisit(this.businessProfile?.id!, option ?? 'click_record', this.profileUA ? this.profileUA.id! : null)
      .pipe(takeUntil(this.destroy$))
      .subscribe({error: () => {}});
    const link = this.route.snapshot.paramMap.get('id');
    this._router.navigate(['/', link, 'choose-service']);
  }

  getAvatar(businessProfile: IViewBusinessProfile | null) {
    return resolveAvatarUrl(businessProfile?.avatarUrl);
  }

  isInstagram(url: string | undefined): boolean {
    return !!url && url.toLowerCase().includes('instagram');
  }

  readonly isOwnWebsite = urlIsOwnWebsite;

  get vkProfileUrl(): string | null {
    const value = this.businessProfile?.socialLink?.trim();
    if (!value) return null;

    try {
      const url = new URL(value);
      const isVk = ['vk.ru', 'vk.com', 'www.vk.ru', 'www.vk.com'].includes(url.hostname);
      return isVk && (url.protocol === 'https:' || url.protocol === 'http:')
        && !url.username && !url.password && !url.port && url.pathname.length > 1
        ? value : null;
    } catch {
      return null;
    }
  }

  getInstagramName(url: string | undefined): string {
    if (!url) return '';
    const username = url.replace(/\/$/, '').split('/').pop() ?? '';
    return username ? '@' + username : url;
  }

  isPhoneTelegram(url: string | undefined): boolean {
    return !!url && /^\+\d{7,15}$/.test(url.trim());
  }

  trackMessenger(): void {
    this.analytics.trackMessenger(this.masterSlug());
  }

  getTelegramUrl(url: string | undefined): string {
    return buildTelegramUrl(url);
  }

  getMaxUrl(url: string | undefined): string {
    return buildMaxUrl(url);
  }

  /** Есть ли у мастера контакт MAX, по которому реально можно открыть чат. */
  get hasMax(): boolean {
    return !!this.getMaxUrl(this.businessProfile?.max);
  }

  get hasTelegram(): boolean {
    return !!this.getTelegramUrl(this.businessProfile?.telegram);
  }

  /**
   * Куда ведёт кнопка «Написать»: приоритет у MAX, при отсутствии — Telegram.
   * Пусто — ни один мессенджер не подключён, кнопку не рендерим.
   */
  get writeUrl(): string {
    return this.getMaxUrl(this.businessProfile?.max)
      || this.getTelegramUrl(this.businessProfile?.telegram);
  }

}
