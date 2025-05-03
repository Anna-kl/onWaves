import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ClientStatus } from 'src/app/DTO/enums/clientStatus';
import { PaymentMethodType } from 'src/app/DTO/enums/paymentMethodType';
import { RecordStatus } from 'src/app/DTO/enums/recordStatus';
import { ISendRecord } from 'src/app/DTO/requests/ISendRecord';
import { IViewBusinessProfile } from 'src/app/DTO/views/business/IViewBussinessProfile';
import { IViewClient } from 'src/app/DTO/views/clients/IViewClient';
import { IViewRecordUser } from 'src/app/DTO/views/records/IViewRecordUser';
import { selectProfileMainClient } from 'src/app/ngrx-store/mainClient/store.select';
import { ReviewsUserComponent } from 'src/app/profile-user/components/reviews-user/reviews-user.component';
import { getAddressProfile } from 'src/helpers/common/address';
import { getHours, getMinutes } from 'src/helpers/common/timeHelpers';
import { UTCToLocale } from 'src/helpers/dateUtils/dateUtils';
import { RecordService } from 'src/services/record.service';
import { StatisticService } from 'src/services/statistic.service';

@Component({
  selector: 'app-PageClient1',
  templateUrl: './PageClient1.component.html',
  styleUrls: ['./PageClient1.component.css'],
  providers: [RecordService, StatisticService]
})
export class PageClient1Component implements OnInit {

  getClients(_t3: IViewClient[]) {
    switch(this.currentTypeClient){
        case 'all':
          return _t3;
        case 'new': 
          return _t3.filter(_ => _.visitCount === 1);
        case 'constant': 
          return _t3.filter(_ => _.visitCount > 1);
        default:
          return _t3.filter(_ => _.statusClient === ClientStatus.BLACK);
    }
  }

  setTypeClient(arg0: string) {
    this.currentTypeClient = arg0;
  }

  currentTypeClient = 'all';
  getTypeClient(arg0: string): boolean {
    if (arg0 === this.currentTypeClient){
      return true;
    } else {
      return false;
    }
  }

  id!: string | null;
  records$: Observable<IViewClient[]>|null = null;

  constructor(private _apiRecords: RecordService,
              private route: ActivatedRoute,
              private store$: Store,
              private _router: Router,
              private _statistic: StatisticService,
              private sanitizer: DomSanitizer) {
  }


  getColorLine(sch: IViewClient){
    if (sch.visitCount > 1){
        return '#4FB229';
      }
    if (sch.visitCount === 1){
        return '#0A6ED8';
      }

    return '#E24414';
  }

  public getListRecords(id: string){
   
    this.records$ = this._statistic
    .getListClients(id);
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

  getStatus(item: IViewClient){
        if (item.visitCount > 1){
            return "Постоянный";
          }
        if (item.visitCount === 1) {
            return "Новый ";

          }
        return 'В чернoм списке';

  }

  async ngOnInit(): Promise<void> {
    this.id = '51643f0d-f417-42ae-bc6b-7551b65ec0fb';
   // this.id = this.route.snapshot.paramMap.get('id');
   this.store$.pipe(select(selectProfileMainClient)).subscribe(result => {
    if (result?.id) {
      this.getListRecords(result.id);
    }});
  }

  cancel(record: IViewRecordUser) {
    if (this.id){
    this._apiRecords.confirmRecord(this.id,
      {status: RecordStatus.Canceled, id: record.id} as ISendRecord).subscribe(
        result => {
          // if (result.code === 200){
          //     record.status = RecordStatus.Canceled;
          //   record.isCanCancel = false;
          // }
        });
    }
  }


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

  checkPaymentType(type: PaymentMethodType, record: IViewRecordUser) {
    return record.methodsPayment.includes(type);
  }

  repeat(record: IViewRecordUser){
    this._router.navigate([`id/${record.businessProfile.id}/choose-date`],
        { queryParams: {recordId: record.id }});
  }


}
