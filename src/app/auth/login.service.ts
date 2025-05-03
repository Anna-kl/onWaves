import {Injectable} from "@angular/core";
import {environment} from "../../enviroments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, filter, map, take, takeUntil, takeWhile, tap} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {Md5} from "ts-md5";
import {IResponse} from "../DTO/classes/IResponse";
import {IViewProfileMenu} from "../DTO/views/profile/IViewProfileMenu";
import {IViewBusinessProfile} from "../DTO/views/business/IViewBussinessProfile";

import {ProfileService} from "../../services/profile.service";
import { Store, select } from "@ngrx/store";
import { getActionStateMainProfileClient } from "../ngrx-store/mainClient/store.action";
import { UserType } from "../DTO/classes/profiles/profile-user.model";
import { selectLink } from "../ngrx-store/links/link.selector";
import { clearLinkAction } from "../ngrx-store/links/link.action";
import { Router } from "@angular/router";
import { requestAction } from "../ngrx-store/notification/notification.action";

@Injectable()
export class LoginService {
    constructor(private http: HttpClient,
                private store$: Store,
                private cookieService: CookieService,
                private _apiProfie: ProfileService,
                private _router: Router) {

    }
    private url = environment.Uri + 'auths/';
    private urlProfile = environment.Uri + 'profiles/';

    public isLoad$ = new BehaviorSubject<boolean>(false);
    public isAutentificate$ = new BehaviorSubject<boolean>(false);
    public mainCategoriesProfile$ = new BehaviorSubject<IViewProfileMenu|null>(null);
    public allProfiles$ = new BehaviorSubject<IViewBusinessProfile[]>([]);

    getAccount(){
        this.mainCategoriesProfile$.subscribe(_ => {
            if (_) {
                let headers: HttpHeaders = new HttpHeaders();
                headers = headers.append('Authorization', 'Bearer ' + _.token);
                return this.http.get<IResponse>(`${this.url}get-ba-profile/${_.profile?.id}`,
                    {headers});
            } else {
                return null;
            }
            }
        )
    }

    prepareSend(){
      let token = this.cookieService.get('auth-token-ocpio');
            let id = '';
            if (this.isUuid()) {
                id = this.cookieService.get('uuid-ocpio');
            } else {
                const md5 = new Md5();
                let expiry = new Date();
                let secure = true;
                expiry.setDate(expiry.getDate()+365);
                id = md5.appendStr(`${new Date().toLocaleDateString()}${token}`).end()!.toString().substring(20);
                this.cookieService.set('uuid-ocpio', id,
                    expiry );
            }
            const send = {
                token,
                'uuid': id,
            };
      return send;
    }
    checkCookie(){
     //   this.getAccount()
        if (this.isAuthenticated()) {
            this.isAutentificate$.next(true);
            let send = this.prepareSend();
            let headers: HttpHeaders = new HttpHeaders();
            headers = headers.append('Authorization', 'Bearer ' + send.token);
            return this.http.post<IResponse>(`${this.url}uuid`, send, {headers}).pipe(
                tap(data => {
                    if (data.code === 200) {
                        this.isLoad$.next(true);
                        let profile = data.data.profile;
                        let view: IViewBusinessProfile[] = [];
                        view.push(profile);
                        this.getAllBusinessProfile(profile?.id!, data.data.token!,
                            profile?.userType!).subscribe(
                            result => {
                                this.checkRequestAccount(result, view, data);
                                // if (result.code !== 404) {
                  
                                //     let profileId: string|null = null;
                                //     if (result.data.length > 0){
                                //       view.push(result.data.pop());                
                                //     }
                                // }
                                // let profileId: string|null = null;
                                // if (result.data.length > 0){
                                //   profileId = this.isProfileId();
                                //   view.push(result.data.pop());
                                //   this.allProfiles$.next(view as IViewBusinessProfile[]);
                                // }
                                // if (!profileId){
                                //   profileId = profile.id;
                                // }
                                // if (profileId){
                                //     let tempProfile =  view.find((_:IViewBusinessProfile) => _.id === profileId);
                                //     if (tempProfile){
                                //         this.store$.dispatch(getActionStateMainProfileClient(
                                //             { tokenMainClient: data.data.profile,
                                //                           profileMainClient:  tempProfile} ))
                                //         this.store$.dispatch(requestAction({request: tempProfile.id!}));
                                //         this.store$.pipe(select(selectLink)).subscribe(
                                //             linkResult => {
                                //                 if (linkResult.isHasLink){
                                //                     this.store$.dispatch(clearLinkAction());
                                //                     this._router.navigate([linkResult.link]);
                                //                 }
                                //             }
                                //         );
                                //     } else {
                                //         this.cookieService.deleteAll();
                                //         window.location.href = '/';
                                //     }
                                // }
                            }
                        );
                        // this.store$.dispatch(getActionStateMainProfileClient(
                        //     { tokenMainClient: data.data.token,
                        //          profileMainClient: data.data.profile }));

                        // this._notification.requestPermission(data.message);
                        // this._notification.receiveMessage();
                    } else {
                        this.isAutentificate$.next(false);
                        this.isLoad$.next(true);
                    }
                }));
        }
        else {
            this.isAutentificate$.next(false);
            this.isLoad$.next(true);
            return null;
        }
    }
    isUuid(): boolean {
        return this.cookieService.check('uuid-ocpio');
    }

    isProfileId() {
        return this.cookieService.get('profileId-ocpio');
    }

    isAuthenticated(): boolean {
        return this.cookieService.check('auth-token-ocpio');
    }

    getAllBusinessProfile(id: string, token: string, type: UserType){
        let  headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Authorization', 'Bearer ' + token);
        return this.http.get<IResponse>(`${this.urlProfile}get-ba-profile/${id}?typeUser=${type}`,
           {headers});
      }

    updateProfile(id: string){
        this._apiProfie.getBusinessProfileForEditById(id).subscribe(
            result => {
                if (result.code === 200) {
                  let profile =  result.data as IViewBusinessProfile;
                  let flag = false;
                  this.allProfiles$.pipe(take(1),
                    map(_ => _.filter(x => x.id !== profile.id!) ),
                    map(x => { 
                        x.push(profile);
                        flag = true;
                    return x;})
                        
                  ).subscribe(res => {
                    
                    this.allProfiles$.next(res);
                  });
                  this.mainCategoriesProfile$.next({profile: result.data, token: result.message});
                }
            }
        );
    }

    checkRequestAccount(result: IResponse, view: IViewBusinessProfile[],
       data: IResponse){
        if (result.code !== 404) {
                  
            let profileId: string|null = null;
            if (result.data.length > 0){
              view.push(result.data.pop());                
            }
          }
          let profileId: string|null = null;
          profileId = this.isProfileId();
          if (profileId){
              this.allProfiles$.next(view);
              let tempProfile =  view.find((_:IViewBusinessProfile) => _.id === profileId);
              if (tempProfile){
                  this.store$.dispatch(getActionStateMainProfileClient(
                      { tokenMainClient: data.data.token,
                                  profileMainClient:  tempProfile} ))
                  this.store$.dispatch(requestAction({request: tempProfile.id!}));
                  this.store$.pipe(select(selectLink)).subscribe(
                      linkResult => {
                          if (linkResult.isHasLink){
                              this.store$.dispatch(clearLinkAction());
                              this._router.navigate([linkResult.link]);
                          }
                      }
                  );
              } else {
                  this.cookieService.deleteAll();
                  window.location.href = '/';
              }
          }
        }
    

    prepareProfiles(data: any){
      this.isLoad$.next(true);
      let profile = data.data.profile;
      let view: IViewBusinessProfile[] = [];
      view.push(profile);
      let profileId = this.isProfileId();
      this.getAllBusinessProfile(profile?.id!, data.data.token!,
          profile?.userType!).subscribe(
          result => {

            if (result.code !== 404) {
                  
              let profileId: string|null = null;
              if (result.data.length > 0){
                view.push(result.data.pop());                
              }
            }
              
            if (profileId){
                this.allProfiles$.next(view);
                let tempProfile =  view.find((_:IViewBusinessProfile) => _.id === profileId);
                if (tempProfile){
                    this.store$.dispatch(getActionStateMainProfileClient(
                        { tokenMainClient: data.data.token,
                                    profileMainClient:  tempProfile} ))
                    this.store$.dispatch(requestAction({request: tempProfile.id!}));
                    this.store$.pipe(select(selectLink)).subscribe(
                        linkResult => {
                            if (linkResult.isHasLink){
                                this.store$.dispatch(clearLinkAction());
                                this._router.navigate([linkResult.link]);
                            }
                        }
                    );
                } else {
                    this.cookieService.deleteAll();
                    window.location.href = '/';
                }
            }
          }
      );
      // this.store$.dispatch(getActionStateMainProfileClient(
      //     { tokenMainClient: data.data.token,
      //          profileMainClient: data.data.profile }));

    //   this._notification.requestPermission(data.message);
    //   this._notification.receiveMessage();
    }

    updateProfileUA(){
      let send = this.prepareSend()
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('Authorization', 'Bearer ' + send.token);
      this.http.post<IResponse>(`${this.url}uuid`, send, {headers}).subscribe
        (data => {
            if (data.code === 200) {
              this.prepareProfiles(data);
    }});
  }

}
