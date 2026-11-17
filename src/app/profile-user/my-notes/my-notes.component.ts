import {Component, DestroyRef, OnInit} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
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
import {resolveAvatarUrl} from "../../../helpers/common/avatar1";
import {IViewBusinessProfile} from "../../DTO/views/business/IViewBussinessProfile";
import {PaymentMethodType} from "../../DTO/enums/paymentMethodType";
import {Observable} from "rxjs";
import {stringToTime} from "../../../helpers/dateUtils/dateUtils";

import { getPriceService, getPriceString } from 'src/helpers/common/price.helpers';
import { formatAmount, formatRub } from 'src/helpers/common/welcome-coupon';
import { getColorLine, getStatusDone } from 'src/helpers/constant/notes';
import { ReviewEligibility } from 'src/app/DTO/views/rating/verified-review';
import { reviewError, VerifiedReviewsService } from 'src/services/verified-reviews.service';

interface ReviewState {
  loading: boolean;
  eligibility?: ReviewEligibility;
  error?: string;
  attendanceRequested?: boolean;
}


@Component({
  selector: 'app-my-notes',
  templateUrl: './my-notes.component.html',
  styleUrls: ['./my-notes.component.css'],
  providers: [RecordService]
})
export class MyNotesComponent implements OnInit {

  id!: string | null;
  records$: Observable<IViewRecordUser[]>|null = null;
  reviewActions: { [recordId: string]: ReviewState | undefined } = {};
  sale: number = 0;
  constructor(private _apiRecords: RecordService,
              private route: ActivatedRoute,
              private _modal: NgbModal,
              private _router: Router,
              private sanitizer: DomSanitizer,
              private reviews: VerifiedReviewsService,
              private destroyRef: DestroyRef) {
  }

  public async getListRecords(){
    this.records$ =  this._apiRecords.getUserRecords(this.id!, new Date().toLocaleString());

  }

  getStatus(item: IViewRecordUser){
        switch (item.status){

          case RecordStatus.Confirm: {
            return "Ждём встречи";
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
        case RecordStatus.InWork: {
          return "В работе";
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
    const eligibility = this.reviewActions[record.id]?.eligibility;
    if (!this.id || !(eligibility?.canReview || eligibility?.existingReviewId)) return;
    const modalRef = this._modal.open(ReviewsUserComponent, {
      centered: true, scrollable: true, backdrop: 'static', keyboard: false, ariaLabelledBy: 'review-dialog-title',
    });
    modalRef.componentInstance.recordId = record.id;
    modalRef.componentInstance.clientId = this.id;
    modalRef.componentInstance.eligibility = eligibility;
    modalRef.componentInstance.name = eligibility.masterName || record.businessProfile.name;
    modalRef.componentInstance.services = eligibility.services ?? record.services.map(service => service.name);
    void modalRef.result.then(() => this.checkReview(record), () => {});
  }

  checkReview(record: IViewRecordUser): void {
    if (record.status !== RecordStatus.Success && record.status !== RecordStatus.InWork && record.status !== RecordStatus.Pending
      && record.status !== RecordStatus.Confirm && !record.isHasReview) return;
    const requested = this.reviewActions[record.id]?.attendanceRequested;
    this.reviewActions[record.id] = { loading: true, attendanceRequested: requested };
    this.reviews.eligibility(record.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: eligibility => this.reviewActions[record.id] = { loading: false, eligibility, attendanceRequested: requested },
      error: error => this.reviewActions[record.id] = {
        loading: false, error: reviewError(error, 'Не удалось проверить доступность отзыва.'), attendanceRequested: requested,
      },
    });
  }

  requestAttendance(record: IViewRecordUser): void {
    const state = this.reviewActions[record.id];
    if (state?.eligibility?.reason !== 'attendance_confirmation_required' || state.loading) return;
    state.loading = true;
    state.error = undefined;
    this.reviews.requestAttendance(record.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        state.loading = false;
        state.attendanceRequested = true;
      },
      error: error => {
        state.loading = false;
        state.error = reviewError(error, 'Не удалось отправить запрос. Попробуйте ещё раз.');
      },
    });
  }

  protected readonly getColorLine = getColorLine;

  getAvatar(avatar: any) {
    return resolveAvatarUrl(avatar);
  }

  protected readonly getHours = getHours;
  protected readonly getMinutes = getMinutes;
  protected readonly getAddressProfile = getAddressProfile;
  protected readonly getPriceString = getPriceString;
  protected readonly formatRub = formatRub;
  protected readonly formatAmount = formatAmount;
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
