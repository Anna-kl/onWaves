import {Injectable} from "@angular/core";
import {environment} from "../enviroments/environment";
import {HttpClient} from "@angular/common/http";
import {Record} from "../app/DTO/classes/records/record";
import {IResponse} from "../app/DTO/classes/IResponse";
import {BehaviorSubject, tap} from "rxjs";

import {IViewRecordUser} from "../app/DTO/views/records/IViewRecordUser";

import {ISendRecord} from "../app/DTO/requests/ISendRecord";
import {IViewRecordData} from "../app/DTO/views/records/IViewRecordData";

@Injectable()

export class RecordService {
  private url = environment.Uri + 'records/';

  public recordsUser$ = new BehaviorSubject<IViewRecordUser[]>([]);
  constructor(private http: HttpClient) {
  }

  saveRecord(id: string, record: Record){
    return this.http.post<IResponse>(`${this.url}add-user/${id}`, record);
  }

  getRecord(id: string){
    return this.http.get<IViewRecordUser>(`${this.url}get/${id}`);
  }

  confirmRecord(id: string, record: ISendRecord){
    return this.http.post<IResponse>(`${this.url}confirm-record/${id}`, record);
    // return this.http.post<IResponse>(`${this.url}confirm-record2/${id}`, record);
  }

  getUserRecords(id: string, date: string){
    return this.http.get<IViewRecordUser[]>(`${this.url}get-user/${id}?dateTimeStr=${date}`).pipe(
      tap(data => this.recordsUser$.next(data)));
  }

  getCountRecordsForToday(id: string, date: string){
    return this.http.get<number>(`${this.url}get-count-record-today/${id}?dateStr=${date}`);
  }

  getDataForRecord(recordId: string){
    return this.http.get<IViewRecordData>(`${this.url}get-data-for-record/${recordId}`);
  }
}
