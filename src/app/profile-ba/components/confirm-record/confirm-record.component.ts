import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {subGroup} from "../../../DTO/views/services/IViewSubGroups";
import {Record} from "../../../DTO/classes/records/record";
import {RecordService} from "../../../../services/record.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProfileDataService} from "../../services/profile-data.service";
import {IViewBusinessProfile} from "../../../DTO/views/business/IViewBussinessProfile";
import {getAddressProfile, recordLocationText, serviceWorkLocationType} from "../../../../helpers/common/address";
import {NgbActiveModal, NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { RecordSuccessTelegramModalComponent } from '../record-success-telegram-modal/record-success-telegram-modal.component';
import {DatePipe, Location} from "@angular/common";
import {IViewRecordData} from "../../../DTO/views/records/IViewRecordData";
import {DomSanitizer} from "@angular/platform-browser";
import {IViewScheduleBA} from "../../../DTO/views/schedule/IViewScheduleBA";
import {RecordStatus} from "../../../DTO/enums/recordStatus";
import {ISendRecord} from "../../../DTO/requests/ISendRecord";
import {requestAction} from "../../../ngrx-store/notification/notification.action";
import {select, Store} from "@ngrx/store";

import {ScheduleService} from "../../../../services/schedule.service";
import {NotesService} from "src/app/profile-ba/notes/notes-events.service";
import {getTokenMainClient, selectProfileMainClient} from "../../../ngrx-store/mainClient/store.select";
import {getHours, getMinutes} from "../../../../helpers/common/timeHelpers";
import {PaymentMethodType} from "../../../DTO/enums/paymentMethodType";
import { finalize, map, Observable, Subscription, switchMap, tap } from 'rxjs';
import { getPrice, getPriceService, getPriceString } from 'src/helpers/common/price.helpers';
import { ErrorConfirmRecordComponent } from '../errorConfirmRecord/error-confirm-record.component';
import { BookingContactModalComponent } from '../booking-contact-modal/booking-contact-modal.component';
import { ProfileService } from 'src/services/profile.service';
import { WelcomeQuote } from 'src/app/DTO/views/promo/welcome-coupon';
import { WelcomeCouponService } from 'src/services/welcome-coupon.service';
import { formatAmount, formatRub, welcomeReasonText } from 'src/helpers/common/welcome-coupon';
import { v4 as uuidv4 } from 'uuid';
import { AnalyticsService } from 'src/services/analytics.service';
import { resolveAvatarUrl } from 'src/helpers/common/avatar1';
import { WorkLocationType } from '../../../DTO/enums/workLocationType';
import { IRecordLocation } from '../../../DTO/classes/records/recordLocation';
import { IWorkLocation } from '../../../DTO/views/IWorkLocation';
import { GroupService } from 'src/services/groupservice';
import { toHoursMinutesString } from 'src/helpers/dateUtils/dateUtils';
import { forkJoin } from 'rxjs';
import { quoteDraftComment, readCellingsQuoteDraft } from '../../helpers/cellings-offer';
import {
  CalculatorHandoff,
  calculatorHandoffComment,
  clearCalculatorHandoff,
  readCalculatorHandoff,
} from '../../helpers/calculator-handoff';
import {
  BOOKING_TIMEZONE,
  fromCalendarDateTime,
  toCalendarDate
} from '../../helpers/booking-date';

interface StoredBookingDraft {
  version: 3;
  profileId: string;
  serviceId: string;
  date: string;
  time: string;
  timezone: string;
  dayId: string;
  start: string;
}



@Component({
  selector: 'app-confirm-record',
  templateUrl: './confirm-record.component.html',
  styleUrls: ['./confirm-record.component.scss'],
  providers: [RecordService,NgbActiveModal,ScheduleService]

})
export class ConfirmRecordComponent implements OnInit, OnDestroy {

  // ── Приветственный купон ────────────────────────────────────────────────
  // Суммы и право считает сервер (coupons/welcome/quote). Здесь только показ и флаг «применить».
  welcomeQuote: WelcomeQuote | null = null;
  /** Клиент может снять галочку и записаться без скидки. */
  applyWelcome = true;
  /** Причина, по которой сервер не применил скидку при отправке. */
  couponRefusal: string | null = null;
  private quoteKey = '';
  private quoteSub?: Subscription;
  protected readonly formatRub = formatRub;
  protected readonly formatAmount = formatAmount;

  /** Сервер сообщил, что скидка может быть применена (для гостя — после входа). */
  get welcomeOffered(): boolean {
    const q = this.welcomeQuote;
    if (!q) return false;
    return q.couponStatus === 'available' || (q.couponStatus === 'login_required' && q.potentialDiscount > 0);
  }
  get welcomeApplies(): boolean {
    return this.welcomeOffered && this.applyWelcome;
  }
  get welcomeDiscount(): number {
    const q = this.welcomeQuote;
    if (!q) return 0;
    return q.couponStatus === 'available' ? q.discountAmount : q.potentialDiscount;
  }
  /** Подсказка, почему скидки нет (только понятные клиенту случаи). */
  get welcomeHint(): string | null {
    const q = this.welcomeQuote;
    if (!q || this.welcomeOffered) return null;
    const show = ['below_threshold', 'already_used', 'already_reserved', 'not_first_booking', 'price_not_fixed', 'expired'];
    return q.reason && show.includes(q.reason) ? welcomeReasonText(q.reason) : null;
  }
  get isRecordView(): boolean {
    return !!this.recordId;
  }

  /**
   * Цену со скидкой показываем, только когда сервер подтвердил её именно для этой записи
   * и клиент не отказался от купона. Гостю (login_required) — нет: право ещё не закреплено,
   * и зачёркнутая цена обещала бы то, чего сервер пока не дал.
   */
  get showDiscountedTotal(): boolean {
    const quote = this.welcomeQuote;
    if (!this.welcomeApplies || !quote) {
      return false;
    }
    // Гостю тоже показываем зачёркнутую цену: сумму считает сервер, а подпись рядом
    // честно говорит, что скидка появится после входа.
    return (quote.couponStatus === 'available' && quote.discountAmount > 0)
      || (quote.couponStatus === 'login_required' && quote.potentialDiscount > 0);
  }

  /** Подпись у новой цены. Условие входа объясняет текст билета ниже, здесь — просто метка. */
  get totalBadgeText(): string {
    return this.welcomeQuote?.couponStatus === 'login_required' ? 'купон' : 'с купоном';
  }

  /** Заголовок купона: право клиента, без разговора о новой цене. */
  get welcomeTitle(): string | null {
    const amount = this.welcomeDiscount;
    return this.welcomeOffered && amount > 0 ? `Вам доступен купон на ${formatRub(amount)}` : null;
  }

  /** Почему купон доступен: сумма записи и порог. Обе цифры — из расчёта сервера. */
  get welcomeNote(): string | null {
    const quote = this.welcomeQuote;
    if (!quote || !this.welcomeOffered) {
      return null;
    }
    // Отказался — не обещаем закрепление, но и не пугаем: право остаётся.
    if (!this.applyWelcome) {
      return 'Купон останется у вас — его можно применить к другой записи.';
    }
    // Порог называем, только когда он отличается от суммы записи: иначе строка
    // «запись на 7 000 ₽ подходит под условие — от 7 000 ₽» повторяет одно и то же.
    const amount = formatAmount(quote.originalAmount, quote.amountIsFrom);
    const showThreshold = !!quote.threshold && !quote.amountIsFrom && quote.originalAmount > quote.threshold;
    const base = showThreshold
      ? `Ваша запись на ${amount} подходит под условие — от ${formatRub(quote.threshold!)}.`
      : `Ваша запись ${quote.amountIsFrom ? '' : 'на '}${amount} подходит под условие купона.`;
    return quote.couponStatus === 'login_required'
      ? `${base} Войдите или зарегистрируйтесь при оформлении, чтобы закрепить купон за записью.`
      : `${base} Купон закрепится за этой записью.`;
  }

  toggleWelcome(): void {
    this.applyWelcome = !this.applyWelcome;
    this.onToggleWelcome();
  }

  onToggleWelcome(): void {
    this._welcome.track(this.applyWelcome ? 'applied' : 'removed', this.welcomeQuote?.campaignCode);
  }

  /** Расчёт по выбранным услугам. Запрашиваем только при смене мастера/услуг/клиента. */
  private refreshWelcomeQuote(): void {
    if (this.recordId || typeof window === 'undefined') return;
    const masterId = this.getMasterId();
    const ids = this.chooseServices.map(s => s.id).filter((id): id is string => !!id);
    if (!masterId || !ids.length) return;
    const clientId = this._welcome.isLoggedIn ? (this.profile?.id ?? null) : null;
    const key = `${masterId}|${ids.join(',')}|${clientId ?? ''}`;
    if (key === this.quoteKey) return;
    this.quoteKey = key;
    this.quoteSub?.unsubscribe();
    this.quoteSub = this._welcome.quote(masterId, ids, clientId).subscribe(q => {
      this.welcomeQuote = q;
      this.couponRefusal = null;
      if (q && (q.couponStatus === 'available' || q.couponStatus === 'login_required') && q.potentialDiscount > 0) {
        this._welcome.track('quote', q.campaignCode, q.discountAmount || q.potentialDiscount);
      }
    });
  }

  getStatusConfirm(): any {
    if (this.record){
      if (this.record.status === RecordStatus.Created || this.record.status === RecordStatus.Pending){
        return true;
      }
    }
    return false;
  }

  getStrTime(): boolean {
    if (this.chooseServices.length > 0 && this.chooseServices.every(s => s.isTimeUnlimited)) {
      return false;
    }
    if (!this.record){
      return true;
    }
    return !!this.record.day;
  }

  today: Date = new Date();
  private unsubscribe$: Subscription|null = null;
  private restoreSubscription?: Subscription;
  schedules: IViewScheduleBA[] = [];
  isLoad = false;
  canceled: IViewScheduleBA[] = [];
  status: boolean = false;
  @Input() idBaPage: string | null = null;
  chooseServices: subGroup[] = [];
  dayChoose: Date|null = null;
  businessProfile: IViewBusinessProfile|null = null;
  dayId: string|null = null;
  message: string = '';
  IsRemandDay = false;
  IsRemandHours = false;
  profile: IViewBusinessProfile | null = null;
  record: IViewRecordData|null = null;
  recordId: string|null = null;
  remainingText = 150;
  /** Блокировка «Далее» (saveRecord) до ответа сервера */
  saveInProgress = false;
  protected readonly WorkLocationType = WorkLocationType;
  /** Адрес выезда (разъездная) по объекту записи — для режима редактирования. */
  protected readonly recordLocationText = recordLocationText;
  /** Адрес клиента для выездной услуги (поля RecordLocation). Обязателен, если бронь Mobile. */
  clientLocation = { city: '', street: '', house: '', apartment: '', comment: '' };
  isErrorClientAddress = false;
  isErrorMixedCharacter = false;
  /** Форматы работы мастера (грузит column-baprofile) — источник списка городов выезда. */
  masterWorkLocations: IWorkLocation[] = [];

  /** Города/районы, куда мастер выезжает (из его разъездной локации). */
  get mobileCities(): string[] {
    const mobile = this.masterWorkLocations.find(w => w.locationType === WorkLocationType.Mobile);
    return (mobile?.cities ?? []).filter(c => !!c && `${c}`.trim().length > 0);
  }

  /** Уникальные характеры выбранных услуг (без legacy null). */
  get bookingTypes(): WorkLocationType[] {
    return Array.from(new Set(
      this.chooseServices.map(s => serviceWorkLocationType(s)).filter((t): t is WorkLocationType => t != null)
    ));
  }
  /** Смешаны ли услуги разного характера (бэк такое отклоняет). */
  get isMixedCharacter(): boolean {
    return this.bookingTypes.length > 1;
  }
  /** Единый характер брони (null — legacy или смешанные). */
  get bookingCharacter(): WorkLocationType | null {
    return this.bookingTypes.length === 1 ? this.bookingTypes[0] : null;
  }
  /** Выездная бронь — нужен адрес клиента. Определяется характером услуги (workLocationType). */
  get isMobileBooking(): boolean {
    return this.bookingCharacter === WorkLocationType.Mobile;
  }
  /** Заполнены ли обязательные поля адреса выезда (город/улица/дом). */
  get isClientAddressValid(): boolean {
    const a = this.clientLocation;
    return !!(a.city.trim() && a.street.trim() && a.house.trim());
  }
  /** Блокировка «Подтвердить» / «Отменить» (confirmRecord) до ответа сервера */
  confirmInProgress = false;
  restoringDraft = false;
  constructor(private _api: RecordService,
              private _profileData: ProfileDataService,
              private _route: Router,
              private activatedRoute: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private location: Location,
              private store$: Store,
              private _profile: ProfileService,
              private _welcome: WelcomeCouponService,
              private modalService: NgbModal,
              private _events: NotesService,
              private _analytics: AnalyticsService,
              private groupService: GroupService,
              private scheduleService: ScheduleService,
              private _location: Location) {

    let temp = this.location.getState();
    if ((temp as Object).hasOwnProperty('recordId')){
      this.recordId = (temp as any).recordId;
      this._api.getDataForRecord(this.recordId!).subscribe(result => {
        this.record = result;
        this.isLoad = true;
      
        if (this.record) {
          this.dayId = this.record.daysOfScheduleId;
          this.businessProfile = this.record.profile;
          this.dayChoose = this.record.day;
          this.chooseServices = this.record.services;
          this.profile = this.record.profile;
          if (this.record.comment) {
            this.message = this.record.comment;
          }
          let option = this.record.options;
          if (option){
            this.IsRemandDay = option.IsRemandDay;
            this.IsRemandHours = option.IsRemandHours
          }
        }
      });
    }else {
      this.unsubscribe$ = this._profileData.sendDayId.subscribe(result => this.dayId = result);
      this.unsubscribe$ = this._profileData.sendDate.subscribe(result =>
          this.dayChoose = result
      );
      this.unsubscribe$ = this._profileData.sendChooseServices.subscribe(result =>
      {
        this.setChooseServices(result);
      });
      this.unsubscribe$ = this._profileData.sendProfileBA.subscribe(result => {
          this.businessProfile = result;
          this.refreshWelcomeQuote();
      });
      // Форматы работы мастера — для списка городов выезда в форме адреса клиента.
      this._profileData.sendWorkLocation.subscribe(wl => this.masterWorkLocations = wl ?? []);
      this.unsubscribe$ = this.store$.pipe(select(selectProfileMainClient)).subscribe(firstResult => {
        if (firstResult)
            this.profile = firstResult; // Сохраняем результат первого Observable
        this.refreshWelcomeQuote();
         // Переходим к выполнению второго Observable
      });
      // this.unsubscribe$ = this.store$.pipe(select(selectProfileMainClient))
      // .pipe((switchMap()=> {
      //     return  this.store$.pipe(select(getTokenMainClient))
      //   })).subscribe(
      //   result => {
      //     this.profile = result;
      //   }
      // );
    }

  }

  ngOnDestroy(): void {
    this.unsubscribe$?.unsubscribe();
    this.restoreSubscription?.unsubscribe();
    this.quoteSub?.unsubscribe();
  }
  ngOnInit(): void {
    this._events.transferIsWorkDay(true);
    // Дата нужна только если есть хотя бы одна услуга с ограничением по времени.
    // Для онлайн/безлимитных услуг dayChoose/dayId легитимно отсутствуют — это НЕ повод
    // восстанавливать черновик и редиректить (иначе онлайн-запись выкидывает на страницу мастера).
    const needsDate = this.chooseServices.some(s => !s.isTimeUnlimited);
    const missingRequiredState = !this.chooseServices.length || (needsDate && (!this.dayChoose || !this.dayId));
    if (!this.recordId && missingRequiredState) {
      this.restoreBookingDraft();
    }
    this.refreshWelcomeQuote();
    this.prefillQuoteComment();
  }

  private prefillQuoteComment(): void {
    if (this.message) {
      return;
    }
    const extra = quoteDraftComment(readCellingsQuoteDraft());
    if (extra) {
      this.message = extra;
    }
  }

  private restoreBookingDraft(): void {
    const serviceId = this.activatedRoute.snapshot.queryParamMap.get('serviceId');
    const profileLink = this.activatedRoute.snapshot.paramMap.get('id');
    if (!serviceId || !profileLink) {
      this.clearStoredDraft();
      this.redirectAfterRestoreFailure(serviceId);
      return;
    }

    const draft = this.readBookingDraft(serviceId);
    if (!draft) {
      // Безлимит приходит сюда без слота и без черновика календаря.
      this.hydrateUnlimitedService(profileLink, serviceId);
      return;
    }

    const date = fromCalendarDateTime(draft.date, draft.time)!;
    this.restoringDraft = true;
    this.restoreSubscription = this._profile.translateLink(profileLink).pipe(
      map(response => String(response.data ?? '')),
      switchMap(profileId => {
        if (!profileId || profileId !== draft.profileId) throw new Error('Booking profile mismatch');
        return forkJoin({
          profile: this._profile.getViewProfile(profileId),
          service: this.groupService.getServiceById(profileId, serviceId)
        });
      }),
      switchMap(({profile, service}) => {
        // Сверяем черновик той же ручкой, что рисует экран выбора времени: у старой не отсекался
        // лид-тайм, и черновик «через 10 минут» проходил проверку, хотя записаться на него уже нельзя.
        const requestDay = toCalendarDate(new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          0, 0, 0, 0
        ));
        return this.scheduleService.getFreeSlotDetailed(
          draft.profileId,
          service.duration ?? 0,
          draft.dayId,
          requestDay
        ).pipe(map(response => {
          const isStillAvailable = response.slots.some(slot => toHoursMinutesString(String(slot.start)) === draft.start);
          if (!isStillAvailable) throw new Error('Stored booking slot is no longer available');
          return {profile, service};
        }));
      }),
      finalize(() => this.restoringDraft = false)
    ).subscribe({
      next: ({profile, service}) => {
        this.setChooseServices([service]);
        this.businessProfile = profile;
        this.dayChoose = date;
        this.dayId = draft.dayId;
        this._profileData.transferId(draft.profileId);
        this._profileData.transferProfileBA(profile);
        this._profileData.transferChooseService(this.chooseServices);
        this._profileData.transferDate(date);
        this._profileData.transferDayId(draft.dayId);
      },
      error: () => {
        this.clearStoredDraft(draft);
        this.redirectAfterRestoreFailure(serviceId);
      }
    });
  }

  private readBookingDraft(serviceId: string | null): StoredBookingDraft | null {
    if (!serviceId || typeof sessionStorage === 'undefined') return null;
    try {
      const draft = JSON.parse(sessionStorage.getItem('booking-draft') ?? 'null') as StoredBookingDraft | null;
      const date = draft?.date && draft?.time
        ? fromCalendarDateTime(draft.date, draft.time)
        : null;
      const valid = draft?.version === 3 && draft.serviceId === serviceId && !!draft.profileId &&
        draft.time === draft.start && draft.timezone === BOOKING_TIMEZONE &&
        !!draft.dayId && /^\d{2}:\d{2}$/.test(draft.start) && !!date &&
        date.getTime() >= Date.now() - 60_000;
      return valid ? draft : null;
    } catch {
      return null;
    }
  }

  private clearStoredDraft(draft?: StoredBookingDraft | null): void {
    if (typeof sessionStorage === 'undefined') return;
    sessionStorage.removeItem('booking-draft');
    if (draft) sessionStorage.removeItem(`choose-date-selection:${draft.profileId}:${draft.serviceId}`);
  }

  private setChooseServices(services: subGroup[] | null | undefined): void {
    const unique = Array.from(
      new Map((services ?? []).map((service, index) => [service.id ?? `missing-id:${index}`, service])).values()
    );
    this.chooseServices = unique;
    this.duration = unique.reduce((sum, service) => sum + (service.duration ?? 0), 0);
    this.refreshWelcomeQuote();
  }

  /**
   * Услуга без ограничения по времени не оставляет booking-draft:
   * календарь пропускается. Поднимаем услугу по serviceId, иначе редирект
   * на choose-date снова покажет «недоступно».
   */
  private hydrateUnlimitedService(profileLink: string, serviceId: string): void {
    this.restoringDraft = true;
    this.restoreSubscription = this._profile.translateLink(profileLink).pipe(
      map(response => String(response.data ?? '')),
      switchMap(profileId => {
        if (!profileId) throw new Error('Profile was not found');
        return forkJoin({
          profile: this._profile.getViewProfile(profileId),
          service: this.groupService.getServiceById(profileId, serviceId)
        }).pipe(map(({profile, service}) => ({profile, service, profileId})));
      }),
      finalize(() => this.restoringDraft = false)
    ).subscribe({
      next: ({profile, service, profileId}) => {
        if (!service.isTimeUnlimited) {
          this.redirectAfterRestoreFailure(serviceId);
          return;
        }
        this.setChooseServices([service]);
        this.businessProfile = profile;
        this._profileData.transferId(profileId);
        this._profileData.transferProfileBA(profile);
        this._profileData.transferChooseService(this.chooseServices);
      },
      error: () => this.redirectAfterRestoreFailure(serviceId)
    });
  }

  private redirectAfterRestoreFailure(serviceId: string | null): void {
    if (serviceId) {
      this._route.navigate(['../choose-date'], {
        relativeTo: this.activatedRoute,
        queryParams: {serviceId, restoreError: 1},
        replaceUrl: true
      });
      return;
    }
    this._route.navigate(['../'], {relativeTo: this.activatedRoute, replaceUrl: true});
  }

  protected readonly getPrice = getPriceString;
  protected readonly getPriceService = getPriceService;
  // async ngOnInit(): Promise<void> {
  //   this._events.transferIsWorkDay(true);
  // //   await this.getListSchedule();

  // }
  /** Id мастера (страница БА): из профиля или с инпута маршрута */
  private getMasterId(): string | null {
    return this.businessProfile?.id ?? this.idBaPage ?? null;
  }

  confirmRecord(status: RecordStatus) {
    if (this.confirmInProgress) {
      return;
    }
    const masterId = this.getMasterId();
    if (!masterId || !this.recordId) {
      return;
    }
    const send = { id: this.recordId, status } as ISendRecord;
    this.confirmInProgress = true;
    this.unsubscribe$ = this._api
      .confirmRecord(masterId, send)
      .pipe(finalize(() => (this.confirmInProgress = false)))
      .subscribe((res) => {
        if (res.code === 200) {
          this.store$.dispatch(requestAction({ request: masterId }));
          this._route.navigate(['/']);
        }
      });
  }

  /**
   * Возврат на публичную страницу мастера.
   * После clearBookingState() this.businessProfile может быть null — передавайте link/id из вызова.
   */
  /** Очистка локального состояния после успешного создания записи (201 / 202). */
  private resetStateAfterRecordCreated(): void {
    clearCalculatorHandoff();
    this.handoffCache = null;
    this._profileData.clearBookingState();
    this._events.clearRecordDraftState();
    this.dayId = null;
    this.dayChoose = null;
    this.chooseServices = [];
    this.message = '';
    this.duration = 0;
    this.price = 0;
    this.welcomeQuote = null;
    this.quoteKey = '';
    this.couponRefusal = null;
    this.IsRemandDay = false;
    this.IsRemandHours = false;
    this.status = false;
    this.record = null;
    this.recordId = null;
    this.remainingText = 150;
  }

  goPage(masterLink?: string | null, masterId?: string | null): void {
    const link = masterLink ?? this.businessProfile?.link;
    const id = masterId ?? this.businessProfile?.id;
    if (link) {
      this._route.navigate(['/', link]);
    } else if (id) {
      this._route.navigate(['id/', id]);
    }
  }

  onConfirm() {
    if (this.saveInProgress) {
      return;
    }
    const masterId = this.getMasterId();
    if (!masterId) {
      return;
    }

    // Нельзя смешивать услуги разного характера в одной записи (бэк вернёт 400).
    this.isErrorMixedCharacter = false;
    if (this.isMixedCharacter) {
      this.isErrorMixedCharacter = true;
      return;
    }
    // Выездная услуга — адрес клиента обязателен (во всех сценариях записи).
    this.isErrorClientAddress = false;
    if (this.isMobileBooking && !this.isClientAddressValid) {
      this.isErrorClientAddress = true;
      return;
    }

    const record = {
      id: uuidv4(),
      daysOfScheduleId: this.dayId,
      isRemandDay: this.IsRemandDay,
      isRemandHours: this.IsRemandHours,
      start: this.dayChoose ? `${this.dayChoose.getHours()}:${this.dayChoose.getMinutes()}:00` : null,
      comment: this.recordComment(),
      services: this.chooseServices,
      clientId: this.profile?.id,
      serverTime: new Date().toLocaleString(),
      useWelcomeCoupon: this.welcomeApplies ? true : undefined,
      expectedCouponDiscount: this.welcomeApplies ? this.welcomeDiscount : undefined,
      location: this.buildLocation(),
    } as Record;

    if (!this.profile) {
      this.openBookingContactModal(masterId, record);
      return;
    }

    this.submitRecord(masterId, record);
  }

  /**
   * Локация брони: для выезда — адрес клиента; для «на месте»/«онлайн»/legacy — null
   * (бэк подставляет адрес мастера/ссылку сам).
   */
  private buildLocation(): IRecordLocation | null {
    if (!this.isMobileBooking) {
      return null;
    }
    const a = this.clientLocation;
    return {
      locationType: WorkLocationType.Mobile,
      city: a.city.trim(),
      street: a.street.trim(),
      house: a.house.trim(),
      apartment: a.apartment.trim() || null,
      comment: a.comment.trim() || null,
    };
  }

  /** Гость: контакты + лёгкая регистрация перед сохранением записи (BookingContactModalComponent). */
  private openBookingContactModal(masterId: string, record: Record): void {
    const masterLink = this.businessProfile?.link;
    const masterIdForNav = this.businessProfile?.id ?? masterId;
    const summaryTitle = this.chooseServices.map(service => service.name).join(', ');
    const summaryWhen = this.dayChoose
      ? new DatePipe('ru').transform(this.dayChoose, 'd MMMM yyyy, HH:mm') ?? ''
      : '';

    const modalRef = this.modalService.open(BookingContactModalComponent, {
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.masterId = masterId;
    modalRef.componentInstance.record = record;
    modalRef.componentInstance.summaryTitle = summaryTitle;
    modalRef.componentInstance.summaryWhen = summaryWhen;
    // Купон показываем и в последнем окне — но только если он действительно применится.
    modalRef.componentInstance.couponQuote = this.welcomeApplies ? this.welcomeQuote : null;

    modalRef.result.then(
      () => {
        this.resetStateAfterRecordCreated();
        this.goPage(masterLink, masterIdForNav);
      },
      (reason) => {
        // «Изменить» — вернуть гостя к календарю с сохранённым выбором.
        // Крестик/бэкдроп (reason !== 'edit') — просто остаёмся на сводке.
        if (reason === 'edit') {
          this.goToCalendar();
        }
      }
    );
  }

  /** Возврат к календарю (choose-date) с сохранением выбора: услуга — в query, дата/время — в sessionStorage. */
  private goToCalendar(): void {
    const serviceId = this.activatedRoute.snapshot.queryParamMap.get('serviceId')
      ?? this.chooseServices[0]?.id;
    const unlimited = this.chooseServices.length > 0
      && this.chooseServices.every(s => s.isTimeUnlimited);
    if (unlimited) {
      this._route.navigate(['../choose-service'], {
        relativeTo: this.activatedRoute,
        queryParams: serviceId ? { serviceId, noAutoDate: 1 } : undefined,
      });
      return;
    }
    if (serviceId) {
      this._route.navigate(['../choose-date'], {
        relativeTo: this.activatedRoute,
        queryParams: { serviceId },
      });
    } else {
      // Нет serviceId (например, вход по recordId) — безопасный откат назад.
      this.location.back();
    }
  }

  /** Авторизованный пользователь: сохранение записи и обработка 201/202/ошибки. */
  private submitRecord(masterId: string, record: Record): void {
    const option: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
    };
    const masterLink = this.businessProfile?.link;
    const masterIdForNav = this.businessProfile?.id ?? masterId;

    this.saveInProgress = true;
    this.unsubscribe$ = this._api
      .saveRecord(masterId, record)
      .pipe(finalize(() => (this.saveInProgress = false)))
      .subscribe({ next: (result) => {
        if (result.code === 409 && result.data?.couponReason) {
          this.onCouponRefused(result);
          return;
        }
        if (result.code === 201 || result.code === 202) {
          // Конверсия: услуга заказана (авторизованный клиент). Цель Метрики add_record.
          this._analytics.trackEvent('booking', 'add_record', masterId);
          const applied = result.data?.coupon as WelcomeQuote | null | undefined;
          if (applied) {
            this._welcome.track('booked', applied.campaignCode, applied.discountAmount);
          }
          this.resetStateAfterRecordCreated();
          const afterModal = () => this.goPage(masterLink, masterIdForNav);

          if (result.code === 201) {
            const modalRef = this.modalService.open(ConfirmModalComponent, option);
            modalRef.result.then(afterModal, afterModal);
          } else {
            const modalRef = this.modalService.open(RecordSuccessTelegramModalComponent, {
              ...option,
              centered: true,
              size: 'md',
              windowClass: 'record-success-telegram-dialog',
            });
            modalRef.componentInstance.accountId = this.profile?.id ?? null;
            modalRef.result.then(afterModal, afterModal);
          }
        } else {
          const modalRef = this.modalService.open(ErrorConfirmRecordComponent, option);
          modalRef.result.then(() => {
            this.goPage();
          });
        }
      }, error: (err) => {
        const body = err?.error;
        if (err?.status === 409 && body?.data?.couponReason) {
          this.onCouponRefused(body);
        } else {
          console.error('Не удалось сохранить запись', err);
        }
      } });
  }

  /**
   * Сервер не применил скидку и запись не создал. Показываем актуальный расчёт и причину:
   * при смене суммы клиент подтверждает новую, иначе скидка снимается и запись оформляется без неё.
   */
  private onCouponRefused(result: { message?: string; data?: any }): void {
    const reason = result.data?.couponReason as string;
    const quote = result.data?.quote as WelcomeQuote | null | undefined;
    this._welcome.track('refused', quote?.campaignCode);
    if (quote) {
      this.welcomeQuote = quote;
    }
    if (reason !== 'amount_changed') {
      this.applyWelcome = false;
    }
    this.couponRefusal = result.message || welcomeReasonText(reason);
  }
  // openPopUpModal() {
  //   // this.status = !this.status;
  //   const modalRef = this.modalService.open(ConfirmModalComponent);
  // }

  inBack() {
    this._location.back();
  }

  /**
   * Расчёт калькулятора, с которым клиент пришёл к этому мастеру. Пустой на записи
   * по recordId, к другому мастеру и после TTL.
   */
  get calculatorHandoff(): CalculatorHandoff | null {
    if (this.record || typeof sessionStorage === 'undefined') {
      return null;
    }
    const masterId = this.businessProfile?.id ?? null;
    if (this.handoffFor !== masterId) {
      this.handoffFor = masterId;
      this.handoffCache = readCalculatorHandoff(masterId);
    }
    return this.handoffCache;
  }
  private handoffFor: string | null | undefined = undefined;
  private handoffCache: CalculatorHandoff | null = null;

  /** Комментарий записи: поле на экране + расчёт калькулятора + город/площадь с легаси-формы потолков. */
  private recordComment(): string {
    const current = (this.message ?? '').trim();
    const extras = [
      calculatorHandoffComment(this.calculatorHandoff),
      quoteDraftComment(readCellingsQuoteDraft()),
    ].filter(extra => extra && !current.includes(extra));
    return [current, ...extras].filter(Boolean).join('\n');
  }
  getAvatar(avatar?: string | null){
    return resolveAvatarUrl(avatar);
  }


  setAbout() {
    if (this.message) {
      if (this.message.length >= 150) {
        this.message.substring(0,149);
      }
      this.remainingText = 150 - this.message.length;
    }
  }

  protected readonly getAddressProfile = getAddressProfile;
  duration: number = 0;
  price: number = 0;
  protected readonly getMinutes = getMinutes;
  protected readonly getHours = getHours;

    checkPaymentMethods(type: PaymentMethodType) {
        return this.businessProfile?.paymentMethods?.includes(type);
    }

  protected readonly PaymentMethodType = PaymentMethodType;
}
