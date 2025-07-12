import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import { ICountry } from '../app/DTO/classes/ICountry';
import { environment } from '../enviroments/environment';
import { IProfile } from '../app/DTO/classes/profiles/IProfile';
import { IResponse } from '../app/DTO/classes/IResponse';
import { BusService } from './busService';
import { ProfileUser, UserType } from 'src/app/DTO/classes/profiles/profile-user.model';
import {ICategory} from "../app/DTO/classes/ICategory";
import {IViewBusinessProfile} from "../app/DTO/views/business/IViewBussinessProfile";
import {IViewChangeOrder} from "../app/DTO/views/business/IViewChangeOrder";
import { ICoupon } from 'src/app/DTO/classes/promo/IPoupon';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {
  private url = environment.Uri + 'profiles/';

  constructor(private http: HttpClient, private busService: BusService) {
  }
  public listClientsCard$ = new BehaviorSubject<IResponse|null>(null);
  createProfile(profile: IProfile, token: any): Observable<IResponse>{
    let  headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token.token);
    const profileUser: ProfileUser = {
      Name: JSON.stringify({Name: profile.name, Family: profile.family}),
      UserType: UserType.User
    };
    return this.http.post<IResponse>(this.url, profileUser, {headers});
  }

  hasCoupon(id: string){
     return this.http.get<boolean>(`${this.url}has-coupon/${id}`);
  }

  getCoupon(id: string){
     return this.http.get<ICoupon|null>(`${this.url}get-coupon/${id}`);
  }


  // sendIfClickContact(profileId: string,  whoIs: string|null){
  //       if (whoIs)
  //             return this.http.get<string[]>(`${this.url}get-reference/${profileId}?whoIs=${whoIs}`);
  //       else
  //           return this.http.get<string[]>(`${this.url}get-reference/${profileId}`);
  // }


  sendWhoisVisit(profileId: string, option: string, whoIs: string|null){
    let urlTemp = `${this.url}get-reference/${profileId}?option=${option}`;
    if (whoIs)
      return this.http.get<string[]>(`${urlTemp}&whoIs=${whoIs}&`);
    else
     return this.http.get<string[]>(urlTemp);
    
  }

  getCoordinates(id: string){
    return this.http.get<IResponse>(
      `${this.url}get-coordinate/${id}`);
  }

  getMainTags(id: string){
     return this.http.get<string[]>(`${this.url}get-main-tags/${id}`);
  }

  checkLink(word: string){
    return this.http.get<IResponse>(`${this.url}check-link/${word}`);
  }

  translateLink(link: string){
    return this.http.get<IResponse>(`${this.url}translate-link/${link}`);
  }
  deleteProfile(id: string){
    return this.http.delete<IResponse>(`${this.url}${id}`);
  }


  createBAProfile(view: IViewBusinessProfile, token: string){
    let  headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token);
    return this.http.post<IResponse>(`${this.url}business`, view,
      {headers});
  }

  setStatusOrder(id: string){
    let  headers: HttpHeaders = new HttpHeaders();
    // headers = headers.append('Authorization', 'Bearer ' + token);
    return this.http.put<IResponse>(`${this.url}set-status/${id}`, null,
      {headers});
  }
  setCategories(id: string, categories: ICategory[], token: string){
    let  headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token);
    return this.http.post<IResponse>(`${this.url}${id}/add-category/`, categories,
      {headers});
  }

  public async getProfileSkillsAsync(skip: number, isRecommend: boolean, id?: string) {
    if (id)
    return this.http.get<IResponse>(`${this.url}?id=${id}&type=1&&isRecommend=${isRecommend}&skip=${skip}`).pipe(
      tap(data => this.listClientsCard$.next(data))
    );
    else{
       return this.http.get<IResponse>(`${this.url}?type=1&&isRecommend=${isRecommend}&skip=${skip}`).pipe(
            tap(data => this.listClientsCard$.next(data))
    );
    }
  };

  getFullAddress(id: string){
    return this.http.get<IResponse>(`${this.url}get-full-address/${id}`);
  }
  getBusinessProfileById(id: string): Observable<IResponse>
  {
    return this.http.get<IResponse>(`${this.url}get-full-baprofile/${id}`);
  }

  changeIsGetOrder(id: string, data: { isGetOrder: boolean | undefined }){
    return this.http.put<IResponse>(`${this.url}change-IsGetOrder/${id}`, data);
  }

  getBusinessProfileForEditById(id: string): Observable<IResponse>
  {
    return this.http.get<IResponse>(`${this.url}get-for-edit-baprofile/${id}`);
  }

  getViewProfile(id: string){
    return this.http.get<IViewBusinessProfile>(`${this.url}${id}`);
 }

}
