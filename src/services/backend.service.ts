import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import { IViewFullInfo } from 'src/app/DTO/views/IViewFullInfo';
import { CurrencyType } from 'src/app/DTO/enums/currencyType';
import { PaymentMethodType } from 'src/app/DTO/enums/paymentMethodType';
import { IResponse } from 'src/app/DTO/classes/IResponse';
// import { HttpEvent } from '@angular/common/http';
import { environment } from 'src/enviroments/environment';
import {IViewBusinessProfile} from "../app/DTO/views/business/IViewBussinessProfile";
import {IFreeSlotSchedule} from "../app/DTO/views/schedule/IFreeSlotSchedule";
import {IViewCategoryProfile} from "../app/DTO/views/categories/IViewCategoryProfile";

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  сurrency: CurrencyType[] = [];
  PaymentMethods: PaymentMethodType[] = [];
  CountReviews = 0;
  Rating = 0;

 // private url = environment.Uri + 'profiles/';
  private url = environment.Uri + 'profiles/';
  public categoriesProfile$ = new BehaviorSubject<IViewCategoryProfile[]>([]);
  public mainCategoriesProfile$ = new BehaviorSubject<string[]>([]);
  constructor(private http: HttpClient) {}

  getFullProfile(id: string): Observable<IViewBusinessProfile> {
    const url = `${this.url}get-full-baprofile/${id}`;
    return this.http.get<IViewBusinessProfile>(url);
  }

  checkUserPhone(id: string, phone: string): Observable<IResponse> {
    const url = `${this.url}check-user-phone/${id}?phone=${phone}`;
    return this.http.get<IResponse>(url);
  }
  // saveProfile(id: string, profile: IViewFullInfo): Observable<any> {
  //   const url = `${this.baseUrl}/save-baprofile/${id}`;
  //   return this.http.post(url, profile);
  // }
  saveProfile(id: string, profile: IViewBusinessProfile): Observable<any> {
    const url = `${this.url}update-baprofile/${id}`;
    return this.http.put(url, profile);
  }

  getMainCategoryProfile(id: string){
    return this.http.get<string[]>(`${this.url}get-main-categories-profile/${id}`).pipe(
      tap(data => this.mainCategoriesProfile$.next(data)));
  }

  getCategoryProfile(id: string){
    return this.http.get<IViewCategoryProfile[]>(`${this.url}get-categories-profile/${id}`).pipe(
      tap(data => this.categoriesProfile$.next(data)));
  }

  public save_avatar(id: string, formData: any){
    return this.http.post(`${this.url}${id}/avatar`, formData);
  }

  // getPaymentMethods(): PaymentMethodType[] {
  //   return Object.values(PaymentMethodType);
  // }

  // getCurrencies(): CurrencyType[] {
  //   return Object.values(CurrencyType);
  // }
}
// http://83.222.9.120/v1/api/profiles/business//2b48605e-cbf2-4505-bbed-4bea2bbf5d0a

//'http://83.222.9.120/v1/api/profiles/get-full-baprofile/${id}'
