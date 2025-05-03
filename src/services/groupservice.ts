// не доделал. По хорошему нужно сделать сервис, для получения группы услуги и услуг. Муконин.

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
import {IViewImage} from "../app/DTO/views/images/IViewImage";
@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private baseUrl = environment.Uri + 'services/';
  public payMethods$ = new BehaviorSubject<PaymentMethodType[]>([]);
  public checkStatusServices$ = new BehaviorSubject<IResponse|null>(null);
  constructor(private http: HttpClient) { }

  getGroupById(id: string): Observable<Group> {
    const url = `https://83.222.9.120/v1/api/services/groups/${id}`;
    return this.http.get<Group>(url);

  }

  getImages(id: string){
    return this.http
      .get<IViewImage[]>(`${this.baseUrl}get-images/${id}`);
  }

  getServiceWithout(profileId: string){
    return this.http
      .get<Service[]>(`${this.baseUrl}without-group/${profileId}`);
  }

  saveGroup(group: Group): Observable<Group> {
    const url = `${this.baseUrl}group`;
    let  headers: HttpHeaders = new HttpHeaders();

    return this.http.post<Group>(url, group ,{headers});
  }

  getGroupServices(id: string){
    let  headers: HttpHeaders = new HttpHeaders();
    return this.http
      .get<Group[]>(`${this.baseUrl}groups/${id}`);
  }

  getService(groupId: string){
    return this.http
      .get<Service[]>(`${this.baseUrl}get-by-group/${groupId}`)

  }

  deleteGroup(groupId: string): Observable<any> {
      const deleteUrl = `${this.baseUrl}group/${groupId}`;
      return this.http.delete(deleteUrl);
    }

  deleteService(id: string): Observable<IResponse> {
    const deleteUrl = `${this.baseUrl}service/${id}`;
    return this.http.delete<IResponse>(deleteUrl);
  }

  changeGroup(serviceId: string, groupId: string){
    return this.http.get(`${this.baseUrl}change-group/${serviceId}?groupId=${groupId}`);
  }
  saveService(service: Service){
    let  headers: HttpHeaders = new HttpHeaders();
    return this.http.post<IResponse>(`${this.baseUrl}`, service ,{headers});
  }


  public async getMethodsPayment(id: string){
    return this.http.get<PaymentMethodType[]>(`${this.baseUrl}get-payMethods/${id}`).pipe(
      tap(data => this.payMethods$.next(data)));
  }

  public async checkStatus(id: string){
    return this.http.get<IResponse>(`${this.baseUrl}check-service/${id}`).pipe(
      tap(data => this.checkStatusServices$.next(data)));
  }

}
