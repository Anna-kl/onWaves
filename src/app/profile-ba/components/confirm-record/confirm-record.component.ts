import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {subGroup} from "../../../DTO/views/services/IViewSubGroups";
import {Record} from "../../../DTO/classes/records/record";
import {RecordService} from "../../../../services/record.service";
import { Router} from "@angular/router";
import {ProfileDataService} from "../../services/profile-data.service";
import {IViewBusinessProfile} from "../../../DTO/views/business/IViewBussinessProfile";
import {getAddressProfile} from "../../../../helpers/common/address";
import {NgbActiveModal, NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { RecordSuccessTelegramModalComponent } from '../record-success-telegram-modal/record-success-telegram-modal.component';
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
import { finalize, map, Observable, Subscription, switchMap, tap } from 'rxjs';
import { getPrice, getPriceService, getPriceString } from 'src/helpers/common/price.helpers';
import { ErrorConfirmRecordComponent } from '../errorConfirmRecord/error-confirm-record.component';
import { ProfileService } from 'src/services/profile.service';
import { ICoupon } from 'src/app/DTO/classes/promo/IPoupon';
import { v4 as uuidv4 } from 'uuid';



@Component({
  selector: 'app-confirm-record',
  templateUrl: './confirm-record.component.html',
  styleUrls: ['./confirm-record.component.scss'],
  providers: [RecordService,NgbActiveModal,ScheduleService]

})
export class ConfirmRecordComponent implements OnInit, OnDestroy {

  token: string|null = null;
  useCoupon: any;
  hasCoupon$: Observable<boolean>|null = null;
  coupon$: Observable<ICoupon|null>|null = null;
  totalPrice: number = 0;
  sale = 0;
  yourCoupon: ICoupon|null = null;
  
  getStatusConfirm(): any {
    if (this.record){
      if (this.record.status === RecordStatus.Created || this.record.status === RecordStatus.Pending){
        return true;
      }
    }
    return false;
  }

  uses(coupon: ICoupon) {
    if (this.useCoupon){
       this.sale = coupon.balance;
       this.yourCoupon = coupon;
    } else {
      this.sale = 0;
      this.yourCoupon = null;
    }
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
  /** Блокировка «Далее» (saveRecord) до ответа сервера */
  saveInProgress = false;
  /** Блокировка «Подтвердить» / «Отменить» (confirmRecord) до ответа сервера */
  confirmInProgress = false;
  constructor(private _api: RecordService,
              private _profileData: ProfileDataService,
              private _route: Router,
              private sanitizer: DomSanitizer,
              private location: Location,
              private store$: Store,
              private _profile: ProfileService,
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
    this.unsubscribe$ = this.store$.pipe(select(selectProfileMainClient)).pipe(
      tap(user => {
          if (user)
           this.coupon$ =  this._profile.getCoupon(user.id!);
        // this._profile.getCoupon(user.id!).subscribe(result => 
        // {
        //   console.log(result);
        // }
        // )
      })
    ).subscribe();
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
    this._profileData.clearBookingState();
    this._events.clearRecordDraftState();
    this.dayId = null;
    this.dayChoose = null;
    this.chooseServices = [];
    this.message = '';
    this.duration = 0;
    this.price = 0;
    this.sale = 0;
    this.yourCoupon = null;
    this.useCoupon = false;
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

    const record = {
      id: uuidv4(),
      daysOfScheduleId: this.dayId,
      isRemandDay: this.IsRemandDay,
      isRemandHours: this.IsRemandHours,
      start: this.dayChoose ? `${this.dayChoose.getHours()}:${this.dayChoose.getMinutes()}:00` : null,
      comment: this.message,
      services: this.chooseServices,
      clientId: this.profile?.id,
      serverTime: new Date().toLocaleString(),
      couponId: this.yourCoupon ? this.yourCoupon.id : null,
    } as Record;
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
      .subscribe((result) => {
        if (result.code === 201 || result.code === 202) {
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
      return  '/assets/img/onwaves/user.png';
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
