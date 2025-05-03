
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';

import { environment } from '../enviroments/environment';
import {Group} from "../app/DTO/views/services/IViewGroups";
import {subGroup} from "../app/DTO/views/services/IViewSubGroups";
import {IResponse} from "../app/DTO/classes/IResponse";
import {Service} from "../app/DTO/classes/services/Service";
import {IFreeSlotSchedule} from "../app/DTO/views/schedule/IFreeSlotSchedule";
import {PaymentMethodType} from "../app/DTO/enums/paymentMethodType";
import {IViewSchedule} from "../app/DTO/views/schedule/IViewSchedule";
import {IViewHistoryCard} from "../app/DTO/views/histories/IViewHistoryCard";
@Injectable({
  providedIn: 'root'
})

export class HistoryService {
  private baseUrl = environment.Uri + 'history/';

  constructor(private http: HttpClient) {
  }
  public listHistoryCard$ = new BehaviorSubject<IViewHistoryCard[]>([]);
  saveViewCard(id: string, businessId: string){
    let  headers: HttpHeaders = new HttpHeaders();
    const historyViewCard = {businessId};
    return this.http.post<IResponse>(`${this.baseUrl}${id}`, historyViewCard ,{headers});
  }

  getHistoryCards(id: string){
    return this.http.get<IViewHistoryCard[]>(`${this.baseUrl}${id}`).pipe(
      tap(data => this.listHistoryCard$.next(data)));
  }
}
