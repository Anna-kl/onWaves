import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {subGroup} from "../../../DTO/views/services/IViewSubGroups";
import {Record} from "../../../DTO/classes/records/record";
import {RecordService} from "../../../../services/record.service";
import { Router} from "@angular/router";
import {ProfileDataService} from "../../services/profile-data.service";
import {BusService} from "../../../../services/busService";
import {IViewBusinessProfile} from "../../../DTO/views/business/IViewBussinessProfile";
import {getAddressProfile} from "../../../../helpers/common/address";
import {NgbActiveModal, NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import {Location} from "@angular/common";
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
import { Subscription, switchMap } from 'rxjs';
import { getPrice, getPriceService, getPriceString } from 'src/helpers/common/price.helpers';
import { ErrorConfirmRecordComponent } from '../errorConfirmRecord/error-confirm-record.component';


@Component({
  selector: 'app-confirm-record',
  templateUrl: './confirm-record.component.html',
  styleUrls: ['./confirm-record.component.css'],
  providers: [RecordService,NgbActiveModal,ScheduleService]

})
export class ConfirmRecordComponent implements OnInit, OnDestroy {
  token: string|null = null;
  
  getStatusConfirm(): any {
    if (this.record){
      if (this.record.status === RecordStatus.Created || this.record.status === RecordStatus.Pending){
        return true;
      }
    }
    return false;
  }

  getStrTime(): any {
    if (!this.record){
      return true;
    }
    if (this.record){
      if (this.record.day){
        return true;
      }
      return false;
    }
  }

  today: Date = new Date();
  private unsubscribe$: Subscription|null = null;
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
  constructor(private _api: RecordService,
              private _profileData: ProfileDataService,
              private _route: Router,
              private sanitizer: DomSanitizer,
              private location: Location,
              private store$: Store,

              private modalService: NgbModal,
              private _events: NotesService,
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
        this.chooseServices = result;
        this.chooseServices.forEach(item => {
          this.duration += item.duration ? item.duration : 0;
         // this.price += item.price.isRange ? item.price.startRange! : item.price!;
        });
      });
      this.unsubscribe$ = this._profileData.sendProfileBA.subscribe(result => {
          this.businessProfile = result;
      });
      this.unsubscribe$ = this.store$.pipe(select(selectProfileMainClient)).subscribe(firstResult => {
        if (firstResult)
            this.profile = firstResult; // Сохраняем результат первого Observable
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
  }
  ngOnInit(): void {
    this._events.transferIsWorkDay(true);
  }

  protected readonly getPrice = getPriceString;
  protected readonly getPriceService = getPriceService;
  // async ngOnInit(): Promise<void> {
  //   this._events.transferIsWorkDay(true);
  // //   await this.getListSchedule();

  // }
  async confirmRecord(status: RecordStatus) {
    // if (sch.status === RecordStatus.Created || sch.status === RecordStatus.Canceled) {
      const send = {id: this.recordId!, status} as ISendRecord;
      this.unsubscribe$ = this._api.confirmRecord(this.businessProfile?.id!, send).subscribe(
          res => {
            if (res.code === 200) {
              this.store$.dispatch(requestAction({request: this.businessProfile?.id!}));
              this._route.navigate(['/']);
            }
          });
    }

  goPage(){
      if (this.businessProfile?.link){
        this._route.navigate(['/', this.businessProfile!.link])
      } else {
          this._route.navigate(['id/', this.businessProfile!.id]);
      }
    
  }

  onConfirm(){
    let record = {
      daysOfScheduleId: this.dayId,
      isRemandDay: this.IsRemandDay,
      isRemandHours: this.IsRemandHours,
      start: this.dayChoose ? `${this.dayChoose.getHours()}:${this.dayChoose.getMinutes()}:00` : null,
      comment: this.message,
      services: this.chooseServices,
      clientId: this.profile?.id,
      serverTime: new Date().toLocaleString()
    } as Record;
    let option: NgbModalOptions = {
      backdrop:'static',
      keyboard: false
    }
    this.unsubscribe$ = this._api.saveRecord(this.businessProfile?.id!, record).subscribe(result => {
      if (result.code === 201){
        //this._route.navigate(['/']);
        this.status = !this.status;
       
        let modalRef = this.modalService.open(ConfirmModalComponent, option);
        modalRef.result.then(res => {
          this.goPage();

        });
      }else {
        let modalRef = this.modalService.open(ErrorConfirmRecordComponent, option);
        modalRef.result.then(res => {

            this.goPage();
        });
      }
    });
  }
  // openPopUpModal() {
  //   // this.status = !this.status;
  //   const modalRef = this.modalService.open(ConfirmModalComponent);
  // }

  inBack() {
    this._location.back();
  }
  getAvatar(avatar?: string){
    if (avatar) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64,
        ${avatar}`);
    } else {
      return  '/assets/img/AvatarBig.png';
    }
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
