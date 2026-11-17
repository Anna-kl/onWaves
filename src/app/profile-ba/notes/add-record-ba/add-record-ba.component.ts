import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {BehaviorSubject, catchError, combineLatest, distinctUntilChanged, filter, finalize, map, merge, Observable, of, shareReplay, startWith, Subscription, switchMap, take} from "rxjs";
import {IFreeSlotSchedule} from "../../../DTO/views/schedule/IFreeSlotSchedule";
import {ScheduleService} from "../../../../services/schedule.service";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {PaymentForType} from "../../../DTO/enums/paymentForType";
import {GroupService} from "../../../../services/groupservice";
import {NotesService} from "../notes-events.service";
import { ProfileDataService } from "../../services/profile-data.service";
import {ChooseTimeModalComponent} from "../../components/choose-time-modal/choose-time-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {subGroup} from "../../../DTO/views/services/IViewSubGroups";
import {PaymentMethodType} from "../../../DTO/enums/paymentMethodType";
import {RecordService} from "../../../../services/record.service";
import {Record} from "../../../DTO/classes/records/record";
import {IOptionsRecord} from "../../../DTO/classes/records/optionsRecord";
import {IChooseDayOfCalendar} from "../../../DTO/views/calendar/IChooseDayOfCalendar";
import { getPrice, getPriceService, getPriceString } from 'src/helpers/common/price.helpers';
import { formatDateToString, parseDotDate } from 'src/helpers/dateUtils/dateUtils';
import { RecordStatus } from '../../../DTO/enums/recordStatus';
import { ISendRecord } from '../../../DTO/requests/ISendRecord';
import { v4 as uuidv4 } from 'uuid';
import { WorkLocationType } from '../../../DTO/enums/workLocationType';
import { IWorkLocation } from '../../../DTO/views/IWorkLocation';
import { IRecordLocation } from '../../../DTO/classes/records/recordLocation';
import { ProfileService } from 'src/services/profile.service';
import { fixedPointLine, fixedPointsOf, serviceOfferedAtPoint, serviceWorkLocationType } from 'src/helpers/common/address';
import { applyHourlyDuration } from 'src/helpers/common/hourly';
import { ruPhoneOrNull } from 'src/helpers/common/phone';

/** Пустое поле и голый «+7» — телефон не указан. Начатый номер должен быть полным. */
function optionalPhone(control: AbstractControl): ValidationErrors | null {
  const digits = String(control.value ?? '').replace(/\D/g, '');
  if (!digits || digits === '7' || digits === '8') {
    return null;
  }
  return ruPhoneOrNull(control.value) ? null : { phone: true };
}



function sameDay(a?: Date, b?: Date) {
  if (!a || !b) return a === b;
  return a.getFullYear() === b.getFullYear() &&
         a.getMonth() === b.getMonth() &&
         a.getDate() === b.getDate();
}

@Component({
  selector: 'app-add-record-ba',
  templateUrl: './add-record-ba.component.html',
  styleUrls: ['./add-record-ba.component.scss'],
  providers: [ScheduleService, GroupService, RecordService, ProfileService]
})
export class AddRecordBAComponent implements OnInit, OnDestroy {

  getStatePrice() {
    return this.chooseServices.find(_ => !_.price.isRange) ? 'от': '';
  }

  filter$: Observable<string | null> | undefined;
  id!: string | null;
  dayId!: string|null;
  schedulesListFree: IFreeSlotSchedule[] = [];
  formClient: FormGroup;
  chooseServices : subGroup[] = [];
  priceServices: number = 0;
  countService: number = 0;
  duration: number = 0;
  calculatedDuration = 0;
  durationHours: number | null = 0;
  durationMinutes: number | null = 0;
  durationAdjusted = false;
  durationEditorOpen = false;
  durationError = '';
  durationNotice = '';
  bookingError = '';
  private durationSelection = '';
  services$ = new BehaviorSubject<subGroup|null>(null);
  isChoosed: boolean = false;
  start: Date | null = null;
  startAI?: string;
  day$ = new  Observable<IChooseDayOfCalendar|null>();
  isTimeLimit: boolean = false;
  serviceId?: string;
  slotError =  false;
  isSaving = false;
  /** День журнала, с которого мастер открыл окно: туда и возвращаем после записи. */
  private returnDate: Date | null = null;
  private unsubscribe$: Subscription|null = null;
  private readonly subscriptions = new Subscription();
  private readonly scheduleRevision$ = new BehaviorSubject(0);
  scheduleLoadError = false;

  // ── Локация записи (характер услуги + адрес выезда клиента) ──
  protected readonly WorkLocationType = WorkLocationType;
  masterWorkLocations: IWorkLocation[] = [];
  selectedPointId: string | null = null;
  isErrorPoint = false;
  readonly pointLine = fixedPointLine;
  clientLocation = { city: '', street: '', house: '', apartment: '', comment: '' };
  isErrorClientAddress = false;
  isErrorMixedCharacter = false;

  /** Уникальные характеры выбранных услуг (без legacy null). */
  get bookingTypes(): WorkLocationType[] {
    return Array.from(new Set(
      this.chooseServices.map(s => serviceWorkLocationType(s)).filter((t): t is WorkLocationType => t != null)
    ));
  }
  get isMixedCharacter(): boolean { return this.bookingTypes.length > 1; }
  get bookingCharacter(): WorkLocationType | null {
    return this.bookingTypes.length === 1 ? this.bookingTypes[0] : null;
  }
  /** Выездная запись — нужен адрес клиента. */
  get isMobileBooking(): boolean { return this.bookingCharacter === WorkLocationType.Mobile; }
  get fixedPoints(): IWorkLocation[] {
    return fixedPointsOf(this.masterWorkLocations).filter(point => !!point.id);
  }
  get isFixedBooking(): boolean { return this.bookingCharacter === WorkLocationType.Fixed; }
  /** Города выезда мастера (для выпадающего списка «Город»). */
  get mobileCities(): string[] {
    const m = this.masterWorkLocations.find(w => w.locationType === WorkLocationType.Mobile);
    return (m?.cities ?? []).filter(c => !!c && `${c}`.trim().length > 0);
  }
  get isClientAddressValid(): boolean {
    const a = this.clientLocation;
    return !!(a.city.trim() && a.street.trim() && a.house.trim());
  }
  /** Локация записи: для выезда — адрес клиента; иначе null (бэк заполняет сам). */
  selectPoint(pointId: string | null | undefined): void {
    if ((pointId ?? null) === this.selectedPointId) return;
    this.selectedPointId = pointId ?? null;
    this.isErrorPoint = false;
    this.chooseServices = this.chooseServices.filter(service => serviceOfferedAtPoint(service, pointId));
    this.recalculateDuration();
    this.startAI = undefined;
    this.reloadSchedule();
  }

  get chosenPointId(): string | null {
    return this.chosenPoint()?.id ?? null;
  }

  get bookingPointId(): string | null {
    return this.isFixedBooking ? this.chosenPointId : null;
  }

  reloadSchedule(): void {
    this.isChoosed = this.isTimeLimit;
    this.start = null;
    this.dayId = null;
    this.scheduleRevision$.next(this.scheduleRevision$.value + 1);
  }

  private resolveScheduleDay(day: IChooseDayOfCalendar): Observable<IChooseDayOfCalendar | null> {
    this.scheduleLoadError = false;
    const date = day.date;
    const service = this.chooseServices.find(item => !!item.id);
    if (!date || !this.id || !service || service.isTimeUnlimited || (this.isFixedBooking && !this.chosenPointId)) return of(null);
    // Журнал может передать день другой точки. Перед выбором времени привязываем ту же дату к нужному графику.
    return this._apiSchedule.getWorkDaysInMonth(this.id, date.getFullYear(), date.getMonth() + 1,
      service.id, this.bookingPointId, this.duration).pipe(
      take(1),
      map(rows => {
        const row = rows.find(item => sameDay(new Date(item.daysOfWork), date));
        return { ...day, dayId: row?.id, ifExist: !!row, canAdd: row?.canAdd, countNew: row?.countNew };
      }),
      catchError(() => { this.scheduleLoadError = true; return of(null); }),
      startWith(null),
    );
  }

  private recalculateDuration(): void {
    const selection = this.chooseServices.map(service => `${service.id}:${service.duration}`).sort().join(',');
    [this.priceServices, this.countService, this.calculatedDuration] = getPrice(this.chooseServices);
    this.isTimeLimit = this.chooseServices.length > 0 && this.chooseServices.every(service => service.isTimeUnlimited);
    if (selection !== this.durationSelection) {
      this.durationNotice = this.durationAdjusted ? 'Состав услуг изменился. Восстановлено расчётное время.' : '';
      this.durationSelection = selection;
      this.applyCalculatedDuration();
      this.durationEditorOpen = false;
    }
  }

  private applyCalculatedDuration(): void {
    this.durationAdjusted = false;
    this.durationError = '';
    this.duration = this.calculatedDuration;
    this.durationHours = Math.floor(this.duration / 60);
    this.durationMinutes = this.duration % 60;
  }

  useCalculatedDuration(): void {
    this.durationNotice = '';
    this.applyCalculatedDuration();
    this.durationEditorOpen = false;
    this.startAI = undefined;
    this.reloadSchedule();
  }

  editDuration(hours: number | null, minutes: number | null): void {
    this.durationHours = hours;
    this.durationMinutes = minutes;
    const empty = hours === null || minutes === null;
    const value = (hours ?? 0) * 60 + (minutes ?? 0);
    const valid = !empty && Number.isInteger(hours) && Number.isInteger(minutes)
      && hours >= 0 && minutes >= 0 && minutes < 60
      && value >= 1 && value <= 1440;
    this.durationAdjusted = true;
    this.duration = valid ? value : 0;
    this.durationError = valid ? '' : empty ? 'Заполните часы и минуты. Если их нет, укажите 0.'
      : 'Укажите время от 1 минуты до 24 часов. В поле минут допустимо от 0 до 59.';
    this.durationNotice = '';
    this.startAI = undefined;
    this.reloadSchedule();
  }

  toggleDurationEditor(): void {
    if (!this.durationError) this.durationEditorOpen = !this.durationEditorOpen;
  }

  finishDurationEditing(event: Event, toggle: HTMLButtonElement): void {
    event.preventDefault();
    if (this.durationError) return;
    this.durationEditorOpen = false;
    toggle.focus({ preventScroll: true });
  }

  formatDuration(duration: number): string {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return [hours ? `${hours} ч` : '', minutes ? `${minutes} мин` : ''].filter(Boolean).join(' ');
  }

  private chosenPoint(): IWorkLocation | null {
    const points = this.fixedPoints;
    if (this.selectedPointId) return points.find(point => point.id === this.selectedPointId) ?? null;
    return points.length === 1 ? points[0] : null;
  }

  private buildLocation(): IRecordLocation | null {
    if (this.isMobileBooking) {
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
    const point = this.chosenPoint();
    if (this.isFixedBooking && point?.id) {
      return {
        locationType: WorkLocationType.Fixed,
        workLocationId: point.id,
        title: point.title ?? null,
        country: point.country ?? null,
        region: point.region ?? null,
        city: point.city ?? null,
        street: point.street ?? null,
        house: point.house ?? null,
        apartment: point.apartment ?? null,
      };
    }
    return null;
  }

  constructor(private _routeActivate: ActivatedRoute,
              private _builder: FormBuilder,
              private _router: Router,
              private _events: NotesService,
              private _profileData: ProfileDataService,
              private modalService: NgbModal,
              private _groupService: GroupService,
              private _profileService: ProfileService,
              private _apiRecord: RecordService,
              private _apiSchedule: ScheduleService) {


    this.formClient = this._builder.group({
      phone: new FormControl('', [optionalPhone]),
      name: new FormControl('', [Validators.required,
        Validators.minLength(1)]),
      remandHours: new FormControl(false),
      start: new FormControl('00:00'),
      about: new FormControl('')
    });
  }
  public async getPaymentsMethod(){
    (await this._groupService.getMethodsPayment(this.id!))
      .subscribe(_=> {
      });
  }

  get bookingTotal(): string {
    return getPriceString(this.chooseServices).replace(/-?\d+(?:\.\d+)?/g,
      amount => Number(amount).toLocaleString('ru-RU', { maximumFractionDigits: 2 }));
  }
  // getGroupsWithServices(){
  //   this._groupService.getGroupServices(this.id!).subscribe(groups => {
  //     if (groups.length > 0) {
  //       this.groupShow = [];
  //       this.groups = groups;
  //       this.groups.forEach(item => {
  //         this._groupService.getService(item.id!).subscribe(
  //           sub => {
  //             sub.forEach(subItem => {
  //               subItem.isChecked = false;
  //             });
  //             this.groupShow.push({
  //               isOpen: false,
  //               group: item,
  //               subGroups: sub,
  //             });
  //           });
  //       });
  //     }
  //   });
  // }
  async getFreeSlot() {
    // this.day = {date: null, dayId: this.dayId, ifExist: true} as IChooseDayOfCalendar;
    // (await this._apiSchedule.getFreeSlotForDay(this.id!,this.duration, undefined, this.dayId! ))
    //   .subscribe(_ => {
    //     this.schedulesListFree = _;
    //     this.schedulesListFree.forEach(item => {
    //       item.start = stringToTime(item.start)
    //     });
    //   });
  }

  getAvailableMethod(method: PaymentMethodType){
    return this._groupService.payMethods$.value.includes(method);
  }



  chooseInterval(slot: IFreeSlotSchedule){
    slot.isChoose = !slot.isChoose;
    if (slot.isChoose){
      this.isChoosed = true;
      this.schedulesListFree.filter(_ => _.start !== slot.start).forEach(item => {
        item.isChoose = false;
      });
    } else{
      this.isChoosed = false;
    }
  }

  /** Красным — только после того, как мастер тронул поле, а не пустая форма при открытии. */
  isControlInvalid(controlName: string): boolean {
    const control = this.formClient.get(controlName);
    return !!control && control.invalid && (control.touched || control.dirty);
  }


  async ngOnInit(): Promise<void> {
    const dayFromEvent$ = this._events.dayOff.pipe(filter(result => !!result));
    const dayFromQuery$ = this._routeActivate.queryParamMap.pipe(
        map((params: ParamMap) => {
          if (params.get('serviceId')){
            this.serviceId = params.get('serviceId')!;
          }
          if (params.get('slot')){
            this.startAI = params.get('slot')!;
          } else {
            this.slotError = true;
          }
          if (params.get('name') || params.get('phone')){
            this.formClient.patchValue({
              phone: params.get('phone') ?? '',
              name: params.get('name') ?? '',
              start: params.get('slot') ?? '00:00',
            });
          }
          // Дата дня из журнала. Без неё заголовок слотов показывал сегодня,
          // а слоты и сама запись шли по dayId выбранного дня.
          const fromNotes = parseDotDate(params.get('date') ?? '');
          if (fromNotes) {
            this.returnDate = fromNotes;
          }
          return {date: fromNotes ?? new Date(), dayId: params.get('dayId')} as IChooseDayOfCalendar }
        ));

            // 3) объединяем источники
    const selectedDay$ = merge(dayFromEvent$, dayFromQuery$).pipe(
      distinctUntilChanged((a, b) => sameDay(a.date!, b.date!) && a.dayId === b.dayId),
    );
    this.day$ = combineLatest([selectedDay$, this.scheduleRevision$]).pipe(
      switchMap(([day]) => this.resolveScheduleDay(day)),
      // кэшируем последнее значение для async-пайпа/многократных подписок
      shareReplay({ bufferSize: 1, refCount: true })
    );
    
    this.subscriptions.add(this.services$.subscribe(() => {
      this.recalculateDuration();
      this.reloadSchedule();
    }));

    this.subscriptions.add(this._events.userId.pipe(distinctUntilChanged()).subscribe(res => {
      this.id = res;
      if (res) {
        this.getPaymentsMethod();
        this.loadMasterWorkLocations(res);
      }
      this.reloadSchedule();
    }));

  }

    ngOnDestroy(): void {
    this.unsubscribe$?.unsubscribe();
    this.subscriptions.unsubscribe();
    this.scheduleRevision$.complete();
    this.services$.complete();
  }

  /** Форматы работы мастера — источник списка городов выезда. */
  private loadMasterWorkLocations(id: string): void {
    this.subscriptions.add(this._profileService.getWorkLocation(id).pipe(take(1)).subscribe({
      next: (res) => {
        const data = res?.code === 200 ? res.data : null;
        this.masterWorkLocations = Array.isArray(data) ? data as IWorkLocation[] : (data ? [data as IWorkLocation] : []);
        if (!this.selectedPointId && this.fixedPoints.length === 1) {
          this.selectedPointId = this.fixedPoints[0].id ?? null;
        }
        this.reloadSchedule();
      },
      error: () => this.masterWorkLocations = []
    }));
  }


  setService($event: subGroup[]) {
    $event.forEach(_ => {
      if (!this.chooseServices.includes(_)){
        this.checkedService(_);
      }
    });
    this.chooseServices.forEach(_ => {
      if (_) {
        if (!$event.includes(_)) {
          this.chooseServices = this.chooseServices.filter(item => item !== _);
        }
      }
    });
    this.recalculateDuration();
    this.reloadSchedule();
  }

  get countSuivi(){
    return this.formClient.controls['about'].value.length;
  }
  saveRecord(){
    this.bookingError = '';
    // Нельзя смешивать услуги разного характера в одной записи (бэк вернёт 400).
    this.isErrorMixedCharacter = false;
    if (this.isMixedCharacter) {
      this.isErrorMixedCharacter = true;
      return;
    }
    // Выездная услуга — адрес клиента обязателен.
    this.isErrorClientAddress = false;
    if (this.isMobileBooking && !this.isClientAddressValid) {
      this.isErrorClientAddress = true;
      return;
    }
    this.isErrorPoint = false;
    if (this.isFixedBooking && this.fixedPoints.length > 1 && !this.chosenPoint()) {
      this.isErrorPoint = true;
      return;
    }
    if (this.isAvailable() || (!this.isTimeLimit && (!this.dayId || !this.start))) {
      this.formClient.markAllAsTouched();
      this.slotError = !this.isChoosed;
      return;
    }

    const data = this.formClient.getRawValue();
    let start: string = '';
    if (this.start) {
        start = this.start.toTimeString().split(' ')[0];
      }

    const record = {
      id: uuidv4(),
      daysOfScheduleId: this.dayId!,
      start,
      services: this.chooseServices,
      durationOverrideMinutes: this.durationAdjusted ? this.duration : undefined,
      comment: data['about'],
      serverTime: new Date().toLocaleString(),
      options: {
        name: data['name'],
        phone: ruPhoneOrNull(data['phone']),
        IsRemandHours: data['remandHours'],
        IsRemandDay: false,
      } as IOptionsRecord,
      location: this.buildLocation(),
    } as Record;
    if (this.isSaving) {
      return;
    }
    this.isSaving = true;
    this.subscriptions.add(this._apiRecord.saveRecord(this.id!, record, true).pipe(
      // Свою клиентку мастер вносит сам — подтверждать её ещё раз в журнале незачем.
      // У ручной записи нет clientId, поэтому подтверждение никому не шлёт SMS и пуш.
      // Сбой подтверждения запись не отменяет: она уже создана, кнопка «Подтвердить» в журнале остаётся.
      switchMap(res => res.code !== 201
        ? of(res)
        : this._apiRecord.confirmRecord(this.id!, { id: record.id!, status: RecordStatus.Confirm } as ISendRecord).pipe(
            map(() => res),
            catchError(() => of(res)),
          )),
      finalize(() => this.isSaving = false),
    ).subscribe({
      next: res => {
        if (res.code === 201){
          const recordDay = this.start
            ? new Date(
                this.start.getFullYear(),
                this.start.getMonth(),
                this.start.getDate(),
                0,
                0,
                0,
                0,
              )
            : null;
          const listDate = this.returnDate ?? recordDay ?? new Date();
          this._profileData.clearBookingState();
          this._events.clearRecordDraftState(listDate);
          this.chooseServices = [];
          this.duration = 0;
          this.start = null;
          this.formClient.patchValue({ about: '', name: '', phone: '', remandHours: false, start: '00:00' });
          this._router.navigate(['/notes/', this.id], {
            queryParams: { date: formatDateToString(listDate) },
          });
        } else {
          this.bookingError = res.message || 'Не удалось создать запись.';
          if (res.code === 409) this.reloadSchedule();
        }
      },
      error: () => { this.bookingError = 'Не удалось сохранить запись. Проверьте соединение и попробуйте снова.'; },
    }));
  }

  checkedService(subGroup: subGroup){
    this.isChoosed = false;
    this.isTimeLimit = false;
    if (subGroup.paymentForType === PaymentForType.ForHour) {

      const modalRef = this.modalService.open(ChooseTimeModalComponent);
      modalRef.result.then((result: number | null) => {
        if (applyHourlyDuration(subGroup, result)){
          this.chooseServices.push(subGroup);
          this.services$.next(subGroup);
        }
        else {
          subGroup.isChecked = false;
        }
      }).catch(() => {
        subGroup.isChecked = false;
      });
    }

    if (subGroup.paymentForType === PaymentForType.ForService) {
        this.chooseServices.push(subGroup);
        this.services$.next(subGroup);
      // this.getPrice();
    }
    if (subGroup.isTimeUnlimited){
      this.isTimeLimit = true;
      this.isChoosed = true;

    }

  }

  getMethodPayment(service: subGroup) {
    return service.paymentForType === PaymentForType.ForService;
  }

  isAvailable() {
    if (this.isSaving || this.durationError){
      return true;
    }
    if (!this.isChoosed){
      return true;
    }
    if (!this.formClient.valid){
      return true;
    }
    if (this.chooseServices.length === 0){
      return true;
    }
    // Смешаны характеры услуг или для выезда не заполнен адрес клиента — блокируем.
    if (this.isMixedCharacter){
      return true;
    }
    if (this.isMobileBooking && !this.isClientAddressValid){
      return true;
    }
    return false;
  }

  setInterval($event: IChooseDayOfCalendar|null){
    if ($event){
      this.dayId = $event.dayId!;
      this.start = $event.date;
      this.isChoosed = true;
    } else {
      this.isChoosed = this.isTimeLimit;
      this.start = null;
      this.dayId = null;
    }
  }


}
