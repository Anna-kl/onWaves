import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';

import {Router} from "@angular/router";

import {DomSanitizer} from "@angular/platform-browser";
import {ScheduleService} from "../../../../services/schedule.service";
import {RecordService} from "../../../../services/record.service";
import {IViewScheduleBA} from "../../../DTO/views/schedule/IViewScheduleBA";
import {RecordStatus} from "../../../DTO/enums/recordStatus";
import {IViewDateSchedule} from "../../../DTO/requests/IViewDateSchedule";
import {ISendRecord} from "../../../DTO/requests/ISendRecord";
import { UTCToLocale, localToUTC, toLocale, toLocaleTime} from "../../../../helpers/dateUtils/dateUtils";
import {NotesService} from "../notes-events.service";
import {map, Observable, Subscription, take} from "rxjs";
import {Location} from '@angular/common';
import {getHours, getHoursString, getMinutes,
  getDays} from "../../../../helpers/common/timeHelpers";
import {select, Store} from "@ngrx/store";
import {selectProfileMainClient} from "../../../ngrx-store/mainClient/store.select";
import {IViewBusinessProfile} from "../../../DTO/views/business/IViewBussinessProfile";
import {PaymentMethodType} from "../../../DTO/enums/paymentMethodType";

import { getPriceService, getPriceString } from 'src/helpers/common/price.helpers';
import { getColorLine, getStatusDone } from 'src/helpers/constant/notes';
import { Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-my-notes',
  templateUrl: './ba-notes.component.html',
  styleUrls: ['./ba-notes.component.scss'],
  providers: [ScheduleService, RecordService, MessageService]
})
export class BANotesComponent implements OnInit, OnDestroy {

  checkStateUpdateTime(record: IViewScheduleBA): any {
    if (record.duration === 0){
      return false;
    }
    if (record.status === RecordStatus.Created){
      return true;
    }
    return false;
  }

  async saveTime() {
    this.unsubsribe$ = this._apiRecord.updateTime(this.profileId, {time: this.newTime, recordId: this.updateRecordId})
    .subscribe(result => {
             if (result.code === 200){
              this.modalService.dismissAll();
              this.getListSchedule();
              this.showSuccess();
             }
        });
    
    // .pipe(
    //   map(data => {
    //    if (data.code === 200)
    //       this.showSuccess();
    //     })
    // );
  }

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Создано', detail: 'Изменения сохранены', life:5000});
  }

  closeModal() {
    this.modalService.dismissAll();
  }
  @ViewChild('timeModal') timeModal!: TemplateRef<any>;
  updateRecordId: string = '';

  openTimeModal(time: number, resordId: string) {
    this.newTime = time;
    this.updateRecordId = resordId;
    this.modalService.open(this.timeModal, { centered: true });
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
  newTime: number = 0;
  schedules$: Observable<IViewScheduleBA[]>|null = null;
  dayId?: string;
  canceled$: Observable<IViewScheduleBA[]>|null = null;
  // private profileSubscribe: Subscription|null = null;
  private profile: IViewBusinessProfile | null  = null;
  private profileId: string = '';
  private unsubsribe$: Subscription|null = null;
  constructor(private _apiSchedule: ScheduleService,
              private _events: NotesService,
              private router: Router,
              private messageService: MessageService,
              private store$: Store,
              private location: Location,
              private sanitizer: DomSanitizer,
              private renderer: Renderer2,
              private route: ActivatedRoute,
              private modalService: NgbModal,
              private _apiRecord: RecordService) {

    // this._events.userId.subscribe(res => {
    //   this.id = res;
    // });
    this.store$.pipe(select(selectProfileMainClient)).subscribe((result: any) => {
      if (result){
        this.profile = result;
        this.profileId = result?.id!
      }else{
        this.route.paramMap.subscribe((params: any) => { 
          const id = params.get('id');
          if (id) {
            this.profileId = id; 
          }
        });
      }
       
    });

  }

  public async getListSchedule(){
    const send = {dateRequest: localToUTC(this.today)} as IViewDateSchedule;
    this.schedules$ = this._apiSchedule.getProfileScheduleBA(this.profileId, send);
    
  }

  public async getListScheduleCanceled(){
    const send = {dateRequest: localToUTC(this.today)} as IViewDateSchedule;
    this.canceled$ = this._apiSchedule.getProfileScheduleCanceledBA(this.profileId, send);
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
        { queryParams: {dayId: this.dayId, date: this.today}});
  }

  protected readonly getPriceService = getPriceService;
  protected readonly getPriceString = getPriceString;
  
  async ngOnInit(): Promise<void> {
    this.unsubsribe$ = this.store$.pipe(select(selectProfileMainClient)).pipe(take(1))
        .subscribe(
        result => this.profile = result
    );
    let element = document.getElementById('top');
    element?.scrollIntoView(true);

    this.unsubsribe$ = this._events.dayOff.subscribe(async res => {
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
      this._apiRecord.confirmRecord(this.profile?.id!, send).subscribe(
          res => {
            if (res.code === 200) {
              sch.status = status;
            }
          });
    }
  }

  protected readonly getHoursString = getHoursString;
  protected readonly getMinutes = getMinutes;
  protected readonly getColorLine = getColorLine;
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
  }

  getAvatar(avatar: any) {
    if (avatar) {
      return  this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64, ${avatar}`);
    } else {
      return  '/assets/img/AvatarBig.png';
    }
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
