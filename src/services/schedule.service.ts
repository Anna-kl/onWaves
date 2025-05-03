import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';

import { environment } from '../enviroments/environment';
import {Group} from "../app/DTO/views/services/IViewGroups";
import {Injectable} from "@angular/core";
import {IResponse} from "../app/DTO/classes/IResponse";
import {IFreeSlotSchedule} from "../app/DTO/views/schedule/IFreeSlotSchedule";
import {Schedule} from "../app/DTO/classes/schedules/schedule";
import {IDaysOfSchedule, IViewSchedule} from "../app/DTO/views/schedule/IViewSchedule";
import {IViewScheduleBA} from "../app/DTO/views/schedule/IViewScheduleBA";
import {IViewDateSchedule} from "../app/DTO/requests/IViewDateSchedule";

@Injectable()
export class ScheduleService {
  private baseUrl = environment.Uri;

  public allSchedules$ = new BehaviorSubject<IFreeSlotSchedule[]>([]);
  public getToday$ = new BehaviorSubject<IResponse|null>(null);
  public getWorkDayInMonth$ = new BehaviorSubject<Schedule[]>([]);
  public getFreeSlot$ = new BehaviorSubject<IFreeSlotSchedule[]>([]);
  public freeSlotForDay$ = new BehaviorSubject<IFreeSlotSchedule[]>([]);
  public getSchedule$ = new BehaviorSubject<IViewSchedule[]>([]);
  public getScheduleBA$ = new BehaviorSubject<IViewScheduleBA[]>([]);
  constructor(private http: HttpClient) {
  }

  checkServiceAvailability(id: string, datetime: Date) {
    const url = `${this.baseUrl}schedules/check-available-record/${id}?datetime=${datetime.toDateString()}`;
    return this.http.get<IResponse>(url);
  }
  public getProfileScheduleBA(id: string, request: IViewDateSchedule){
    return this.http.post<IViewScheduleBA[]>(`${this.baseUrl}schedules/get-ba-schedule/${id}`,
        request);
  }

  public getProfileScheduleCanceledBA(id: string, request: IViewDateSchedule){
    return this.http.post<IViewScheduleBA[]>(`${this.baseUrl}schedules/get-ba-canceled-schedule/${id}`, request).pipe(
      tap(data => this.getScheduleBA$.next(data)));
  }

  public getAnotherDays(id: string, request: IViewDateSchedule){
      return this.http.post<IDaysOfSchedule[]>(`${this.baseUrl}schedules/get-another-days/${id}`, request);
  }

  public async getProfileScheduleToday(id: string){
    const today = new Date();
    return this.http.get<IResponse>(`${this.baseUrl}schedules/today/${id}
    ?date=${new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(),
      0,0,0)).toISOString()}`).pipe(
      tap(data => this.getToday$.next(data)));
  }

  saveSchedules(id: string, schedules: IViewSchedule[]){
    return this.http.post<IResponse>(`${this.baseUrl}schedules/${id}`, schedules);
  }
  public getScheduleProfile(id: string){
    return this.http.get<IViewSchedule[]>(`${this.baseUrl}schedules/${id}`);
  }

  public updateSchedule(id: string, sch: IViewSchedule){
    return this.http.put<IResponse>(`${this.baseUrl}schedules/update-schedule/${id}`, sch);
  }

  public async getWorkDaysInMonth(id: string, year: number, month: number){
    return this.http.get<Schedule[]>(`${this.baseUrl}schedules/days-in-month?year=${year}&month=${month}&id=${id}`).pipe(
      tap(data => this.getWorkDayInMonth$.next(data)));
  }

  public async getScheduleForDay(id: string, dayId: string){
    return this.http.get<IFreeSlotSchedule[]>(`${this.baseUrl}schedules/get-free-slot-day/${id}?dayId=${dayId}`).pipe(
      tap(data => this.allSchedules$.next(data)));
  }

  public saveSchedule(id: string, schedule: IViewSchedule):Observable<IResponse>{
      return this.http.post<IResponse>(`${this.baseUrl}schedules/add-schedule/${id}`, schedule);
  }
  public async getFreeSlotForDay(id: string, duration: number, day?: string, dayId?: string){
  let send = { duration, day, dayId };
    return this.http.post<IFreeSlotSchedule[]>(`${this.baseUrl}services/get-free-slot/${id}`, send);
        //.pipe(
      // tap(data => this.freeSlotForDay$.next(data)));
  }


  /**
   * Функция удаляет карточку график работы.
   */
  public async deleteScheduleProfileCart(id: any){
    return await this.http.delete<IViewSchedule[]>(`${this.baseUrl}schedules/${id}`).pipe(
      tap(data => this.getSchedule$.next(data)));
  }









}
