import {Injectable} from "@angular/core";
import {environment} from "../enviroments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Record} from "../app/DTO/classes/records/record";
import {IResponse} from "../app/DTO/classes/IResponse";
import {BehaviorSubject, Observable, tap} from "rxjs";

import {IViewRecordUser} from "../app/DTO/views/records/IViewRecordUser";

import {ISendRecord} from "../app/DTO/requests/ISendRecord";
import {IViewRecordData} from "../app/DTO/views/records/IViewRecordData";
import { IViewUpdateTime } from "src/app/DTO/views/records/IViewUpdateTime";
import { ICoupon } from "src/app/DTO/classes/promo/IPoupon";
import { ISendPromo } from "src/app/DTO/views/promo/ISendPromo";
import { formatDateTimeForApi } from "src/helpers/dateUtils/dateUtils";

@Injectable()

export class RecordService {
  private url = environment.Uri + 'records/';

  public recordsUser$ = new BehaviorSubject<IViewRecordUser[]>([]);
  constructor(private http: HttpClient, private cookies: CookieService) {
  }

  updateTime(userId: string, data: IViewUpdateTime){
    return this.http.put<IResponse>(`${this.url}update-time/${userId}`, data, { headers: this.authHeaders() });
  }

  getSale(id: string){
    
  }

  ckeckPin(recordId: string, pin: string): Observable<ISendPromo>{
    return this.http.post<ISendPromo>(`${this.url}check-coupon`, {recordId, pin});
  }
  
  saveRecord(id: string, record: Record, fromMasterCabinet = false){
    const headers = fromMasterCabinet || record.useWelcomeCoupon || record.usePromoSeat ||
      record.prizeAwardId || record.reviewRewardCouponIds?.length ? this.authHeaders() : new HttpHeaders();
    return this.http.post<IResponse>(`${this.url}add-user/${id}`, record, {headers});
  }

  private authHeaders(): HttpHeaders {
    const token = this.cookies.get('auth-token-ocpio');
    return token ? new HttpHeaders().set('Authorization', 'Bearer ' + token) : new HttpHeaders();
  }

  getCoupon(id: string){
    return this.http.get<number>(`${this.url}get-coupon/${id}`);
  }

  getRecord(id: string){
    return this.http.get<IViewRecordUser>(`${this.url}get/${id}`);
  }

  confirmRecord(id: string, record: ISendRecord){
    // Смена статуса требует JWT: без токена сервер не принимает «выполнено» и отмену.
    let headers = new HttpHeaders();
    if (this.cookies.check('auth-token-ocpio')) {
      headers = headers.set('Authorization', 'Bearer ' + this.cookies.get('auth-token-ocpio'));
    }
    return this.http.post<IResponse>(`${this.url}confirm-record/${id}`, record, {headers});
  }

  /** Перенос записи мастером. Уведомление клиенту собирает сервер тем же контуром, что подтверждение. */
  rescheduleRecord(profileId: string, body: { recordId: string; dayId: string; start: string }) {
    return this.http.post<IResponse>(`${this.url}reschedule/${profileId}`, body, { headers: this.authHeaders() });
  }

  getUserRecords(id: string, date: string){
    return this.http.get<IViewRecordUser[]>(`${this.url}get-user/${id}?dateTimeStr=${date}`).pipe(
      tap(data => this.recordsUser$.next(data)));
  }

  getCountRecordsForToday(id: string, date: Date = new Date()){
    const dateStr = formatDateTimeForApi(date);
    return this.http.get<number>(`${this.url}get-count-record-today/${id}?dateStr=${encodeURIComponent(dateStr)}`);
  }

  getDataForRecord(recordId: string){
    return this.http.get<IViewRecordData>(`${this.url}get-data-for-record/${recordId}`);
  }
}
