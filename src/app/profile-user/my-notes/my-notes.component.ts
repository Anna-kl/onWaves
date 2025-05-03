import {Component, OnInit} from '@angular/core';
import {RecordService} from "../../../services/record.service";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {IViewRecordUser} from "../../DTO/views/records/IViewRecordUser";
import {DomSanitizer} from "@angular/platform-browser";
import {ISendRecord} from "../../DTO/requests/ISendRecord";
import {RecordStatus} from "../../DTO/enums/recordStatus";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ReviewsUserComponent} from "../components/reviews-user/reviews-user.component";
import {UTCToLocale, toConstantTime} from "../../../helpers/dateUtils/dateUtils";
import {getHours, getMinutes} from "../../../helpers/common/timeHelpers";
import {getAddressProfile} from "../../../helpers/common/address";
import {IViewBusinessProfile} from "../../DTO/views/business/IViewBussinessProfile";
import {PaymentMethodType} from "../../DTO/enums/paymentMethodType";
import {Observable} from "rxjs";
import {stringToTime} from "../../../helpers/dateUtils/dateUtils";

import { getPriceService, getPriceString } from 'src/helpers/common/price.helpers';
import { getColorLine, getStatusDone } from 'src/helpers/constant/notes';


@Component({
  selector: 'app-my-notes',
  templateUrl: './my-notes.component.html',
  styleUrls: ['./my-notes.component.css'],
  providers: [RecordService]
})
export class MyNotesComponent implements OnInit {

  id!: string | null;
  records$: Observable<IViewRecordUser[]>|null = null;
  constructor(private _apiRecords: RecordService,
              private route: ActivatedRoute,
              private _modal: NgbModal,
              private _router: Router,
              private sanitizer: DomSanitizer) {
  }

  public async getListRecords(){
    this.records$ =  this._apiRecords.getUserRecords(this.id!, new Date().toLocaleString());
      // .subscribe(_=>{
      //   this.records = this._apiRecords.recordsUser$.value;
      //   this.records.forEach(item => {
      //     item.start = item.start ? toConstantTime(new Date(item.start)) : null;
      //     switch (item.recordStatus){
      //       case RecordStatus.Pending:{
      //         item.statusText = "Подтверждено";
      //         item.isCanCancel = true;
      //         break;
      //       }
      //       case RecordStatus.Confirm: {
      //         item.statusText = "В ожидании";
      //         item.isCanCancel = true;
      //         break;
      //       }
      //       case RecordStatus.Success: {
      //         item.statusText = "Выполнено";
      //         item.isCanCancel = false;
      //         break;
      //       }
      //       case RecordStatus.Created: {
      //         item.statusText = "Не подтверждено";
      //         item.isCanCancel = true;
      //         break;
      //       }
      //       case RecordStatus.Canceled: {
      //         item.statusText = "Отменено";
      //         item.isCanCancel = true;
      //         break;
      //       }
      //     }
      //   });
      // });
  }

  getStatus(item: IViewRecordUser){
        switch (item.status){

          case RecordStatus.Confirm: {
            return "В ожидании";
          }
          case RecordStatus.Success: {
            return "Выполнено";

          }
          case RecordStatus.Created: {
            return "Не подтверждено";
          }
          case RecordStatus.Canceled: {
            return  "Отменено";
          }
         case RecordStatus.Pending: {
          return "В процессе";
          }
        }

  }
  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      await this.getListRecords();
    }
  }

  cancel(record: IViewRecordUser) {
    if (this.id){
    this._apiRecords.confirmRecord(this.id,
      {status: RecordStatus.Canceled, id: record.id} as ISendRecord).subscribe(
        result => {
          if (result.code === 200){
              record.status = RecordStatus.Canceled;
          }
        });
    }
  }

  addReview(record: IViewRecordUser) {
    const modalRef = this._modal.open(ReviewsUserComponent);
    modalRef.componentInstance.recordId = record.id;
    modalRef.componentInstance.profileId = this.id;
    modalRef.componentInstance.avatar = record.businessProfile.avatar;
    modalRef.componentInstance.name = record.businessProfile.name;
    modalRef.result.then(result => {
      if (result){
        record.isHasReview = true;
      }
    });
  }

  protected readonly getColorLine = getColorLine;

  getAvatar(avatar: any) {
    if (avatar) {
      return  this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64, ${avatar}`);
    } else {
      return  '/assets/img/AvatarBig.png';
    }
  }
    checkStatus(recordStatus: RecordStatus) {
        return recordStatus === RecordStatus.Success;
    }

  protected readonly getHours = getHours;
  protected readonly getMinutes = getMinutes;
  protected readonly getAddressProfile = getAddressProfile;
  protected readonly getPriceString = getPriceString;
  protected readonly getPriceService = getPriceService;

  checkPhone(businessProfile: IViewBusinessProfile) {
    return businessProfile.phone && businessProfile.phone.length > 0;

  }

  getLinkWhatsApp(businessProfile: IViewBusinessProfile){
    return ``
  }

  checkWhatsApp(businessProfile: IViewBusinessProfile) {
    return businessProfile.whatsApp && businessProfile.whatsApp.length > 1;
  }

  checkWhatsTelegram(businessProfile: IViewBusinessProfile) {
    return businessProfile.telegram && businessProfile.telegram.length > 1;
  }

  protected readonly PaymentMethodType = PaymentMethodType;
  protected readonly toLocale = UTCToLocale;
  protected readonly getStatusDone = getStatusDone;

  checkPaymentType(type: PaymentMethodType, record: IViewRecordUser) {
    return record.methodsPayment.includes(type);
  }

  repeat(record: IViewRecordUser){
    this._router.navigate([`id/${record.businessProfile.id}/choose-date`],
        { queryParams: {recordId: record.id }});
  }

}
