import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {BehaviorSubject, distinctUntilChanged, filter, map, merge, Observable, shareReplay, Subscription} from "rxjs";
import {IFreeSlotSchedule} from "../../../DTO/views/schedule/IFreeSlotSchedule";
import {ScheduleService} from "../../../../services/schedule.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PaymentForType} from "../../../DTO/enums/paymentForType";
import {GroupService} from "../../../../services/groupservice";
import {NotesService} from "../notes-events.service";
import {ChooseTimeModalComponent} from "../../components/choose-time-modal/choose-time-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {subGroup} from "../../../DTO/views/services/IViewSubGroups";
import {PaymentMethodType} from "../../../DTO/enums/paymentMethodType";
import {RecordService} from "../../../../services/record.service";
import {Record} from "../../../DTO/classes/records/record";
import {IOptionsRecord} from "../../../DTO/classes/records/optionsRecord";
import {getHours, getMinutes} from "../../../../helpers/common/timeHelpers";
import {IChooseDayOfCalendar} from "../../../DTO/views/calendar/IChooseDayOfCalendar";
import { getPrice, getPriceService, getPriceString } from 'src/helpers/common/price.helpers';
import { isString } from 'src/helpers/dateUtils/dateUtils';



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
  providers: [ScheduleService, GroupService, RecordService]
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
  durationHours: number = 0;
  durationMinutes: number = 0;
  duration: number = 0;
  services$ = new BehaviorSubject<subGroup|null>(null);
  isChoosed: boolean = false;
  start: Date | null = null;
  startAI?: string;
  day$ = new  Observable<IChooseDayOfCalendar|null>();
  isTimeLimit: boolean = false;
  serviceId?: string;
  slotError =  false;
  private unsubscribe$: Subscription|null = null;

  constructor(private _routeActivate: ActivatedRoute,
              private _builder: FormBuilder,
              private _router: Router,
              private _events: NotesService,
              private modalService: NgbModal,
              private _groupService: GroupService,
              private _apiRecord: RecordService) {


    this.formClient = this._builder.group({
      phone: new FormControl('+7',  [Validators.required,
      Validators.minLength(4)]),
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

  protected readonly getPriceString = getPriceString;
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

  isControlInvalid(controlName: string): boolean {
    const control = this.formClient.get(controlName);
    const test = !!control;
    return !!control && control.invalid;
  }


  async ngOnInit(): Promise<void> {
    const dayFromEvent$ = this._events.dayOff.pipe(filter(result => !!result));
    const dayFromQuery$ = this._routeActivate.queryParamMap.pipe(
        map((params: ParamMap) => {
          let dttm = new Date();
          if (params.get('serviceId')){
            this.serviceId = params.get('serviceId')!;
          }
          if (params.get('slot')){
            this.startAI = params.get('slot')!;
          } else {
            this.slotError = true;
          }
          if (params.get('name') || params.get('phone')){
            this.formClient = this._builder.group({
                phone: new FormControl(params.get('phone'), [Validators.required,  Validators.minLength(4)]),
                name: new FormControl(params.get('name')),
                remandHours: new FormControl(false),
                start: new FormControl(params.get('slot') ?? '00:00'),
                about: new FormControl('')
          });
          if (params.get('date')){
            if (isString(params.get('date'))){
                const [day, month, year] = params.get('date')!.split('.').map(Number);
                dttm = new Date(year, month - 1, day);
            } 
          }
          }
          return {date: dttm, dayId: params.get('dayId')} as IChooseDayOfCalendar }
        ));

            // 3) объединяем источники
    this.day$ = merge(dayFromEvent$, dayFromQuery$).pipe(
      // убираем повтор той же даты/того же dayId
      distinctUntilChanged((a, b) => sameDay(a.date!, b.date!) && a.dayId === b.dayId),
      // кэшируем последнее значение для async-пайпа/многократных подписок
      shareReplay({ bufferSize: 1, refCount: true })
    );
    
    this.services$.subscribe(async (result: any) => {
      if (result) {
        [this.priceServices, this.countService, this.duration] = getPrice(this.chooseServices);

      }

    this.unsubscribe$ = this._events.userId.subscribe(res => {
      this.id = res;
      // this.getGroupsWithServices();
      this.getPaymentsMethod();
    });
    this.filter$?.subscribe(async response => {
      this.dayId = response;
    });
  });

  }

    ngOnDestroy(): void {
    this.unsubscribe$?.unsubscribe();
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
          [this.priceServices, this.countService, this.duration] = getPrice(this.chooseServices);
          console.log(this.duration);
        }
      }
    });
  }

  get countSuivi(){
    return this.formClient.controls['about'].value.length;
  }
  saveRecord(){
    const data = this.formClient.getRawValue();
    let start: string = '';
    if (this.start) {
        start = this.start.toTimeString().split(' ')[0];
      }

    const record = {daysOfScheduleId: this.dayId, start: start,
    services: this.chooseServices, comment: data['about'],
      options: {name: data['name'], phone: data['phone'],
        IsRemandHours: data['remandHours'], IsRemandDay: false} as IOptionsRecord } as Record;
    this._apiRecord.saveRecord(this.id!, record).subscribe(
      res => {
        if (res.code === 201){
          this._events.transferRecordId(res.data);
          this._router.navigate(['/notes/', this.id]);
        }
      });
  }

  checkedService(subGroup: subGroup){
    this.isChoosed = false;
    this.isTimeLimit = false;
    if (subGroup.paymentForType === PaymentForType.ForHour) {

      const modalRef = this.modalService.open(ChooseTimeModalComponent);
      modalRef.result.then((result: number) => {
        if (result !== null){
          subGroup.price.price = result/60 * subGroup.price.price!;
          subGroup.duration = result;
          this.chooseServices.push(subGroup);
          this.services$.next(subGroup);
        } 
        else {
          subGroup.isChecked = false;
         // this.services$.next(subGroup);
        }
        // this.getPrice();
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
    if (!this.isChoosed){
      return true;
    }
    if (!this.formClient.valid){
      return true;
    }
    return this.chooseServices.length === 0;
  }

  setInterval($event: IChooseDayOfCalendar|null){
    if ($event){
      this.dayId = $event.dayId!;
      this.start = $event.date;
      this.isChoosed = true;
    } else {
      this.isChoosed = false;
    }
  }

  protected readonly getHours = getHours;
  protected readonly getMinutes = getMinutes;

}
