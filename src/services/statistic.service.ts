
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';

import { environment } from '../enviroments/environment';

import {Injectable} from "@angular/core";
import {IViewProfit} from "../app/DTO/views/statistic/IViewProfit";
import {IViewDateSchedule} from "../app/DTO/requests/IViewDateSchedule";
import {IViewScheduleBA} from "../app/DTO/views/schedule/IViewScheduleBA";
import {IViewRecordsStatistic} from "../app/DTO/views/statistic/IViewRecordsStatistic";
import {IViewClientsStatistic} from "../app/DTO/views/statistic/IViewClientsStatistic";
import { IViewClient } from 'src/app/DTO/views/clients/IViewClient';



@Injectable()
export class StatisticService {
  constructor(private http: HttpClient) {
  }
  private baseUrl = environment.Uri + 'statistic/';


  public records$ = new BehaviorSubject<IViewRecordsStatistic|null>(null);
  public clients$ = new BehaviorSubject<IViewClientsStatistic|null>(null);

  public getProfileProfit(id: string, startDate: Date, endDate: Date){
    return this.http.get<IViewProfit>(`${this.baseUrl}profit/${id}?startDate=${startDate.toLocaleString()}&endDate=${endDate.toLocaleString()}`, );
  }

  public getCoefficient(id: string){
    return this.http.get<number>(`${this.baseUrl}get-coefficient/${id}`);
    }

  public async getClientsStatistic(id: string,startDate: Date, endDate: Date){
    return this.http.get<IViewClientsStatistic>(`${this.baseUrl}clients/${id}?startDate=${startDate.toLocaleString()}&endDate=${endDate.toLocaleString()}`, ).pipe(
      tap(data => this.clients$.next(data)));
  }

  public async getProfileRecords(id: string, startDate: Date, endDate: Date){
    return this.http.get<IViewRecordsStatistic>(`${this.baseUrl}records/${id}?startDate=${startDate.toLocaleString()}&endDate=${endDate.toLocaleString()}`).pipe(
      tap(data => this.records$.next(data)));
  }

  public getListClients(id: string){
    return this.http.get<IViewClient[]>(`${this.baseUrl}get-clients/${id}`);
  }

}
