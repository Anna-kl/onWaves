import {Component, DestroyRef, Inject, OnDestroy, OnInit, PLATFORM_ID, TemplateRef, ViewChild} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import { ToastService } from 'src/services/toast.service';

import {Router} from "@angular/router";

import {DomSanitizer} from "@angular/platform-browser";
import {resolveAvatarUrl} from "../../../../helpers/common/avatar1";
import {recordPlaceText} from "../../../../helpers/common/address";
import {ScheduleService} from "../../../../services/schedule.service";
import {RecordService} from "../../../../services/record.service";
import { IViewScheduleBA, VisitPayment } from '../../../DTO/views/schedule/IViewScheduleBA';
import {RecordStatus} from "../../../DTO/enums/recordStatus";
import {IViewDateSchedule} from "../../../DTO/requests/IViewDateSchedule";
import {ISendRecord} from "../../../DTO/requests/ISendRecord";
import { UTCToLocale, formatDateToString, localToUTC, toLocale, toLocaleTime} from "../../../../helpers/dateUtils/dateUtils";
import {NotesService} from "../notes-events.service";
import {catchError, firstValueFrom, map, Observable, of, Subscription, take} from "rxjs";
import {isPlatformBrowser, Location} from '@angular/common';
import {getHours, getHoursString, getMinutes,
  getDays} from "../../../../helpers/common/timeHelpers";
import {IViewBusinessProfile} from "../../../DTO/views/business/IViewBussinessProfile";
import {PaymentMethodType} from "../../../DTO/enums/paymentMethodType";

import { getPriceService, getPriceString } from 'src/helpers/common/price.helpers';
import { getColorLine, getStatusDone } from 'src/helpers/constant/notes';
import { Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IChooseDayOfCalendar } from '../../../DTO/views/calendar/IChooseDayOfCalendar';
import { formatAmount, formatRub } from 'src/helpers/common/welcome-coupon';
import { InsertPinCodeComponent } from 'src/app/components/modals/insert-pin-code/insert-pin-code.component';
import { MessageNotificationService } from 'src/services/notification.service';
import { StatusNotification } from 'src/app/DTO/enums/statusNotification';
import { getMaxUrl, getSmsUrl, getTelUrl, getTelegramUrl } from 'src/helpers/common/messenger';



@Component({
  selector: 'app-my-notes',
  templateUrl: './ba-notes.component.html',
  styleUrls: ['./ba-notes.component.scss'],
  providers: [ScheduleService, RecordService]
})
export class BANotesComponent implements OnInit, OnDestroy {
  recordId: string|null = null;

  // --- Связь с клиентом ---------------------------------------------------
  // Мессенджер показываем, только если канал реально подключён, т.е. бэк прислал
  // контакт клиента. Достраивать канал из номера нельзя: у MAX ссылки по номеру нет
  // вовсе, а t.me/+7… у незарегистрированного открывает пустой чат — мастер решит,
  // что написал, а сообщение никто не получит. Когда мессенджеров нет — SMS.

  clientTelHref(sch: IViewScheduleBA): string {
    return getTelUrl(sch.phone);
  }

  clientMaxHref(sch: IViewScheduleBA): string {
    return getMaxUrl(sch.max);
  }

  clientTelegramHref(sch: IViewScheduleBA): string {
    return getTelegramUrl(sch.telegram);
  }

  /** Фолбэк: показываем только когда не подключён ни один мессенджер. */
  clientSmsHref(sch: IViewScheduleBA): string {
    if (this.clientMaxHref(sch) || this.clientTelegramHref(sch)) return '';
    return getSmsUrl(sch.phone);
  }
  protected readonly formatRub = formatRub;
  protected readonly formatAmount = formatAmount;

  visitPayment(sch: IViewScheduleBA): VisitPayment | null {
    if (sch.visitPayment) return sch.visitPayment;
    const snap = sch.couponSnapshot;
    const cancelled = sch.status === RecordStatus.Canceled;
    if (snap) {
      return {
        kind: snap.kind === 'giveaway_prize' || snap.kind === 'promo_seat' ? snap.kind : 'welcome',
        clientPays: snap.payableAmount,
        onwavesPays: snap.discountAmount,
        amountIsFrom: snap.amountIsFrom,
        status: cancelled ? 'cancelled' : snap.status === 'redeemed' ? 'review' : 'pending',
      };
    }
    if (!sch.couponId) return null;
    const amount = Number(sch.couponId);
    return { kind: 'legacy_coupon', clientPays: null, onwavesPays: null, status: cancelled ? 'cancelled' : 'legacy',
      couponAmount: Number.isFinite(amount) && amount > 0 ? amount : null };
  }

  readonly visitPaymentLabels: Record<VisitPayment['kind'], string> = {
    giveaway_prize: 'Приз розыгрыша OnWaves',
    promo_seat: 'Скидка OnWaves',
    welcome: 'Приветственный купон OnWaves',
    legacy_coupon: 'Купон с PIN',
    master_discount: 'Скидка мастера',
    review_reward: 'Купоны за отзывы',
  };

  readonly visitPaymentStatus: Record<VisitPayment['status'], string> = {
    pending: 'Компенсация после подтверждения визита.',
    earned: 'Компенсация начислена.',
    paid: 'Компенсация выплачена.',
    cancelled: 'Расчёт по визиту отменён.',
    review: 'Статус компенсации требует уточнения.',
    legacy: 'По старому купону нет сохранённой разбивки оплаты.',
    none: '',
    test: 'Тестовая запись. Сумма справочная.',
  };

  openCouponModal(_t9: IViewScheduleBA) {
      let modal = this.modalService.open(InsertPinCodeComponent,  { centered: true });
      modal.componentInstance.recordId = _t9.recordId;
  }

 checkCoupon(_t9: IViewScheduleBA): boolean {
      if (_t9.status == RecordStatus.Success){
        if (_t9.couponId === 'notUse'){
          return true
        }
      }
      //  else {
      //   return await this.hasCouponAsync(_t9.recordId);
      // }
      return false;
  }


  checkStateUpdateTime(record: IViewScheduleBA): boolean {
    return !!record.recordId && !record.isBreak;
  }

  get validDurationEdit(): boolean {
    return this.newTime != null && Number.isInteger(this.newTime) && this.newTime >= 1 && this.newTime <= 1440;
  }

  async hasCouponAsync(id: string): Promise<boolean> {
  return await firstValueFrom(
    this._apiRecord.getCoupon(id).pipe(
      map(res => !!res),
      catchError(() => of(false)),
      take(1))
  );
}

  // checkCoupon(sch:IViewScheduleBA): any {
  //   this._apiRecord.getCoupon(sch.recordId).pipe(take(1)).subscribe(result => {
      
  //   });
  // }

  saveTime(): void {
    if (!this.validDurationEdit || this.timeSaving || !this.updateRecordId) return;
    this.timeSaving = true;
    this.timeError = '';
    this.unsubsribe$ = this._apiRecord.updateTime(this.profileId, {
      time: this.newTime!, recordId: this.updateRecordId, expectedVersion: this.durationRevision,
    }).pipe(take(1)).subscribe({
      next: result => {
        this.timeSaving = false;
        if (result.code !== 200 || !Number.isInteger(result.data?.duration)) {
          this.timeError = result.message || 'Не удалось сохранить длительность.';
          return;
        }
        if (this.recordForDuration?.recordId === this.updateRecordId) {
          this.recordForDuration.duration = result.data.duration;
          this.recordForDuration.durationRevision = result.data.durationRevision;
        }
        this.timeModalRef?.close();
        this.getListSchedule();
        this.showSuccess();
      },
      error: () => {
        this.timeSaving = false;
        this.timeError = 'Не удалось сохранить длительность. Проверьте соединение и повторите попытку.';
      },
    });
  }

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Создано', detail: 'Изменения сохранены', life:5000});
  }

  closeModal() {
    this.modalService.dismissAll();
  }
  @ViewChild('timeModal') timeModal!: TemplateRef<any>;
  @ViewChild('rescheduleModal') rescheduleModal!: TemplateRef<unknown>;
  rescheduleRecord: IViewScheduleBA | null = null;
  rescheduleDay: IChooseDayOfCalendar | null = null;
  rescheduleChoice: IChooseDayOfCalendar | null = null;
  rescheduleToday: Date | null = null;
  rescheduleSaving = false;
  rescheduleError = '';
  private rescheduleModalRef: NgbModalRef | null = null;
  updateRecordId: string = '';
  timeSaving = false;
  timeError = '';
  private durationRevision = 0;
  private recordForDuration?: IViewScheduleBA;
  private timeModalRef?: NgbModalRef;

  openTimeModal(record: IViewScheduleBA): void {
    if (!this.checkStateUpdateTime(record)) return;
    this.newTime = record.duration > 0 ? record.duration : null;
    this.updateRecordId = record.recordId;
    this.recordForDuration = record;
    this.durationRevision = record.durationRevision ?? 0;
    this.timeError = '';
    this.timeSaving = false;
    this.timeModalRef = this.modalService.open(this.timeModal, {
      centered: true, backdrop: 'static', beforeDismiss: () => !this.timeSaving,
    });
  }

  opened: Record<string | number, boolean> = {};

  open(id: string | number) {
    this.opened[id] = true;
  }
  close(id: string | number) {
    this.opened[id] = false;
  }
  toggle(id: string | number) {
    this.opened[id] = !this.opened[id];
  }

  openOnly(id: string | number) {
  for (const k in this.opened) this.opened[k] = false;
  this.opened[id] = true;
  }

getAllTimeWorking(time: number) {
    if (time >= 1440) {
      return `${getDays(time)}дн ${getHours(time)}ч.
        ${getMinutes(time)}мин.`
    }
    if (time < 1440 && time >= 60) {
      return `${getHours(time)}ч.
        ${getMinutes(time)}мин.`
    }
    else {
      return `${getMinutes(time)}мин.`
    }
   
}
  // id: string | null = null;
  today: Date = new Date();
  newTime: number | null = null;
  schedules$: Observable<IViewScheduleBA[] | null>|null = null;
  scheduleLoadError = false;
  dayId?: string;
  canceled$: Observable<IViewScheduleBA[] | null>|null = null;
  canceledLoadError = false;
  // private profileSubscribe: Subscription|null = null;
  private profile: IViewBusinessProfile | null  = null;
  private profileId: string = '';
  private unsubsribe$: Subscription|null = null;
  constructor(private _apiSchedule: ScheduleService,
              private _events: NotesService,
              private router: Router,
              private messageService: ToastService,
              private location: Location,
              private sanitizer: DomSanitizer,
              private renderer: Renderer2,
              private route: ActivatedRoute,
              private modalService: NgbModal,
              private _apiRecord: RecordService,
              private _notifications: MessageNotificationService,
              private destroyRef: DestroyRef,
              @Inject(PLATFORM_ID) private platformId: string) {

    // Родитель уже проверил принадлежность профиля в URL. Активный профиль
    // шапки может быть другим BA той же семьи и не должен подменять журнал.
    (this.route.parent ?? this.route).data.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(data => {
      const previousId = this.profileId;
      this.profile = data['notesProfile'] ?? null;
      this.profileId = this.profile?.id ?? '';
      if (previousId && previousId !== this.profileId) {
        this.dayId = undefined;
        this.canceled$ = null;
        this.canceledLoadError = false;
        this.getListSchedule();
      }
    });

  }

  public async getListSchedule(){
    this.scheduleLoadError = false;
    if (!this.profileId) return;
    const send = {dateRequest: localToUTC(this.today)} as IViewDateSchedule;
    this.schedules$ = this._apiSchedule.getProfileScheduleBA(this.profileId, send, true).pipe(
      catchError(() => {
        this.scheduleLoadError = true;
        return of(null);
      }),
    );
  
  }

  public async getListScheduleCanceled(){
    this.canceledLoadError = false;
    if (!this.profileId) return;
    const send = {dateRequest: localToUTC(this.today)} as IViewDateSchedule;
    this.canceled$ = this._apiSchedule.getProfileScheduleCanceledBA(this.profileId, send, true).pipe(
      catchError(() => {
        this.canceledLoadError = true;
        return of(null);
      }),
    );
   }

  async confirmRecord(sch: IViewScheduleBA, status: RecordStatus) {
    // if (sch.status === RecordStatus.Created || sch.status === RecordStatus.Canceled) {
    if (this.profile){
      const send = {id: sch.recordId, status} as ISendRecord;
      this._apiRecord.confirmRecord(this.profile?.id!, send).subscribe(
        res => {
          if (res.code === 200) {
            sch.status = status;
          }
            if (sch.status === RecordStatus.Canceled){
                this.getListSchedule();
                this.getListScheduleCanceled();
            }
        });

      }
    // await this.getListSchedule();
  }

  getStatusConfirm(sch: IViewScheduleBA){
    return sch.status === RecordStatus.Created;

  }
 

  addRecord(){
    this.router.navigate([`notes/${this.profile?.id!}/add-record-ba`],
        { queryParams: {dayId: this.dayId, date: formatDateToString(this.today)}});
  }

  /** Id для SeenDirective (как message.id в уведомлениях). */
  scheduleSeenId(sch: IViewScheduleBA): string {
    return sch.notificationId ?? sch.recordId;
  }

  /** Карточка была в зоне видимости ≥ seenDelayMs — помечаем уведомление прочитанным по записи. */
  onScheduleSeenNew(sch: IViewScheduleBA): void {
    if (!sch.isNew || !this.profileId) {
      return;
    }
    const notificationId = sch.notificationId ?? sch.recordId;
    this._notifications
      .changeStatusByRecord({
        recordId: sch.recordId,
        statusNotification: StatusNotification.READ,
      })
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          if (res.code === 200) {
            sch.isNew = false;
          }
        },
      });
  }

  protected readonly getPriceService = getPriceService;
  protected readonly getPriceString = getPriceString;
  protected RecordStatus = RecordStatus;

  async ngOnInit(): Promise<void> {

    this._events.recordId.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(result => {
      if (result)
              setTimeout(() => {
          this.openOnly(result)
        }, 300);
    });
    if (isPlatformBrowser(this.platformId)) {
      document.getElementById('top')?.scrollIntoView(true);
    }

    this._events.dayOff.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(async res => {
      if (res.date){
        this.today = res.date;
        this.getListSchedule();
      }
      if (res.dayId) {
        this.today = res.date!;
        this.dayId = res.dayId;
      } else {
        let temp = this.location.getState();
        if ((temp as Object).hasOwnProperty('dayId'))
        {
          this.dayId = (temp as any).dayId;
          this.today = new Date((temp as any).date);
        }
      }
      if (res.dayId){
        this.getListScheduleCanceled();
      } else {
        this.canceled$ = null;
        this.canceledLoadError = false;
      }
    });

  }

  isAddRecord(): boolean {
    let today = new Date();
    return this.today >= new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0,0,0);
  }

  getStatusComplete(sch: IViewScheduleBA) {
    return sch.status === RecordStatus.Pending;
  }

  setComplete(sch: IViewScheduleBA, status: RecordStatus) {
    if (this.profile){
      const send = {id: sch.recordId, status} as ISendRecord;
      this._apiRecord.confirmRecord(this.profile?.id!, send).pipe(take(1)).subscribe(
          res => {
            if (res.code === 200) {
              sch.status = status;
              if (status === RecordStatus.Success && this.visitPayment(sch)) {
                this.getListSchedule();
              }
            }
          });
    }
  }

  protected readonly getHoursString = getHoursString;
  protected readonly getMinutes = getMinutes;
  protected readonly getColorLine = getColorLine;
  /** Адрес выезда (разъездная услуга) по объекту записи расписания. */
  protected readonly recordLocationText = recordPlaceText;
  protected readonly getStatusDone = getStatusDone;

  protected readonly getHours = getHours;
  protected readonly toLocale = UTCToLocale;

  checkPaymentMethod(type: PaymentMethodType) {
    return this.profile?.paymentMethods?.includes(type);
  }

  protected readonly PaymentMethodType = PaymentMethodType;
  trackByFn: any;

  ngOnDestroy(): void {
    this.unsubsribe$?.unsubscribe();
    this.dismissReschedule();
  }

  /** Живую запись с длительностью можно перенести на свободный слот. */
  canReschedule(sch: IViewScheduleBA): boolean {
    return this.getStatusDone(sch) && sch.duration > 0;
  }

  rescheduleServiceId(): string | null {
    return this.rescheduleRecord?.services?.find(service => !!service.id)?.id ?? null;
  }

  /** Публичный id профиля: поле сессии приватное, шаблон окна его читает. */
  get notesProfileId(): string {
    return this.profileId;
  }

  rescheduleSubmitLabel(): string {
    if (this.rescheduleSaving) {
      return 'Переносим…';
    }
    const when = this.rescheduleChoice?.date;
    if (!when) {
      return 'Выберите время';
    }
    return `Перенести на ${when.toLocaleString('ru-RU', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}`;
  }

  openReschedule(sch: IViewScheduleBA, event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    if (!this.canReschedule(sch) || !this.profileId) {
      return;
    }
    this.rescheduleRecord = sch;
    this.rescheduleDay = null;
    this.rescheduleChoice = null;
    this.rescheduleError = '';
    this.rescheduleSaving = false;
    const current = sch.start ? UTCToLocale(sch.start) : new Date();
    this.rescheduleToday = new Date(current.getFullYear(), current.getMonth(), current.getDate());
    this.rescheduleModalRef = this.modalService.open(this.rescheduleModal, {
      centered: true,
      scrollable: true,
      backdrop: true,
      windowClass: 'reschedule-window',
    });
    this.rescheduleModalRef.result.then(
      () => this.clearReschedule(),
      () => this.clearReschedule()
    );
  }

  closeReschedule(): void {
    this.rescheduleModalRef?.dismiss();
  }

  onRescheduleDate(day: IChooseDayOfCalendar): void {
    const nextId = day?.dayId ?? '';
    const prevId = this.rescheduleDay?.dayId ?? '';
    if (nextId !== prevId) {
      this.rescheduleChoice = null;
    }
    this.rescheduleDay = day;
    this.rescheduleError = '';
  }

  get reschedulePointId(): string | null {
    const record = this.rescheduleRecord;
    return record?.schedulePointId !== undefined
      ? record.schedulePointId
      : record?.location?.workLocationId ?? null;
  }

  onRescheduleCleared(): void {
    this.rescheduleDay = null;
    this.rescheduleChoice = null;
  }

  onRescheduleSlot(slot: IChooseDayOfCalendar | null): void {
    this.rescheduleChoice = slot;
    this.rescheduleError = '';
  }

  submitReschedule(): void {
    const record = this.rescheduleRecord;
    const choice = this.rescheduleChoice;
    if (!record || !choice?.date || !choice.dayId || !this.profileId || this.rescheduleSaving) {
      this.rescheduleError = 'Выберите день и свободное время';
      return;
    }
    const start = this.formatSlotStart(choice.date);
    this.rescheduleSaving = true;
    this.rescheduleError = '';
    this._apiRecord.rescheduleRecord(this.profileId, {
      recordId: record.recordId,
      dayId: choice.dayId,
      start,
    }).pipe(take(1)).subscribe({
      next: (res) => {
        this.rescheduleSaving = false;
        if (res.code !== 200) {
          this.rescheduleError = res.message || 'Не удалось перенести запись';
          return;
        }
        const when = choice.date
          ? choice.date.toLocaleString('ru-RU', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })
          : '';
        const notified = res.data?.notified !== false;
        this.messageService.add({
          severity: 'success',
          summary: 'Запись перенесена',
          detail: notified
            ? `Новое время: ${when}. Клиенту отправили уведомление`
            : `Новое время: ${when}. У клиента нет аккаунта — уведомление не отправилось`,
          life: 5000,
        });
        const modal = this.rescheduleModalRef;
        this.rescheduleModalRef = null;
        modal?.close();
        this.getListSchedule();
        this._events.refreshCalendar();
        if (this.dayId) {
          this.getListScheduleCanceled();
        }
      },
      error: () => {
        this.rescheduleSaving = false;
        this.rescheduleError = 'Не удалось перенести запись — повторите';
      },
    });
  }

  private formatSlotStart(date: Date): string {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}:00`;
  }

  private dismissReschedule(): void {
    const modal = this.rescheduleModalRef;
    this.rescheduleModalRef = null;
    if (!modal) {
      return;
    }
    try {
      modal.dismiss();
    } catch {
      // Окно уже закрыто успешным переносом.
    }
  }

  private clearReschedule(): void {
    this.rescheduleModalRef = null;
    this.rescheduleRecord = null;
    this.rescheduleDay = null;
    this.rescheduleChoice = null;
    this.rescheduleSaving = false;
  }

  getAvatar(avatar: any) {
    return resolveAvatarUrl(avatar);
  }

  getStatusStart(sch: IViewScheduleBA) {
    return !sch.start && sch.status === RecordStatus.Confirm;
  }

  startRecord(sch: IViewScheduleBA, number: number) {

  }

  confirmAndUncheck(sch: any): void {
    this.confirmRecord(sch, 1);
    const checkbox = this.renderer.selectRootElement(`#${sch.recordId}`, true);
    this.renderer.setProperty(checkbox, 'checked', false);
  }
}
