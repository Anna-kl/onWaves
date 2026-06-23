import {Injectable} from "@angular/core";
import {environment} from "../../enviroments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, EMPTY, filter, map, take, takeUntil, takeWhile, tap} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {Md5} from "ts-md5";
import {IResponse} from "../DTO/classes/IResponse";
import {IViewProfileMenu} from "../DTO/views/profile/IViewProfileMenu";
import {IViewBusinessProfile} from "../DTO/views/business/IViewBussinessProfile";

import {ProfileService} from "../../services/profile.service";
import { Store, select } from "@ngrx/store";
import { getActionStateMainProfileClient, logoutAction } from "../ngrx-store/mainClient/store.action";
import { UserType } from "../DTO/classes/profiles/profile-user.model";
import { selectLink } from "../ngrx-store/links/link.selector";
import { clearLinkAction } from "../ngrx-store/links/link.action";
import { Router } from "@angular/router";
import { requestAction } from "../ngrx-store/notification/notification.action";
import { PushDebugService } from "src/services/push-notification.service";

@Injectable()
export class LoginService {
    constructor(private http: HttpClient,
                private store$: Store,
                private cookieService: CookieService,
                private _apiProfie: ProfileService,
                private _push: PushDebugService,
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
      if (this.cookieService.check('uuid-ocpio')) {
          // uuid держим в кеше на всю сессию — пересоздаём только когда cookie реально стёрта
          // (logoutAndClearCaches при нажатии "Выход"), а не на каждый запрос.
          id = this.cookieService.get('uuid-ocpio');
      } else {
          let expiry = new Date();
          expiry.setDate(expiry.getDate()+365);
          const md5 = new Md5();
          id = md5.appendStr(`${new Date().toLocaleDateString()}${token}`).end()!.toString().substring(20);
          // ВАЖНО: явный path '/', иначе cookie ставится на путь текущего роута SPA
          // и clearAuthCookies() при логауте её не находит — отсюда "протекание" между аккаунтами.
          this.cookieService.set('uuid-ocpio', id, expiry, '/');
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
                        this._push.subscribe(data.message);
                        this.checkRequestAccount(data);
                    } else {
                        this.isAutentificate$.next(false);
                        this.isLoad$.next(true);
                    }
                }),
                catchError(() => {
                    this.isAutentificate$.next(false);
                    this.isLoad$.next(true);
                    return EMPTY;
                }));
        }
        else {
            this.isAutentificate$.next(false);
            this.isLoad$.next(true);
            return null;
        }
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
    
    // this.push.ensurePwaSubscription(this.VAPID_PUBLIC_KEY);
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

    checkRequestAccount(data: IResponse){
      this.isLoad$.next(true);
      let profile = data.data.profile;
      let view: IViewBusinessProfile[] = [];
      view.push(profile);
      let profileId = this.isProfileId();
      this.getAllBusinessProfile(profile?.id!, data.data.token!,
          profile?.userType!).subscribe(
          result => {

            if (result.code !== 404 && Array.isArray(result.data)) {
              view.push(...result.data);
            }

            if (profileId){
                this.allProfiles$.next(view);
                let tempProfile =  view.find((_:IViewBusinessProfile) => _.id === profileId);
                if (tempProfile){
                    this.store$.dispatch(getActionStateMainProfileClient(
                        { tokenMainClient: data.data.token,
                                    profileMainClient:  tempProfile} ))
                    this.store$.dispatch(requestAction({request: tempProfile.id!}));
                    this.store$.pipe(
                        select(selectLink),
                        filter(linkResult => linkResult.isHasLink),
                        take(1)
                    ).subscribe(
                        linkResult => {
                            this.store$.dispatch(clearLinkAction());
                            this._router.navigate([linkResult.link]);
                        }
                    );
                } else {
                    // profileId-ocpio устарел/не найден среди профилей пользователя —
                    // не сносим JWT-сессию, просто уводим выбрать профиль заново.
                    this._router.navigate(['/']);
                }
            }
          }
      );
    }

    updateProfileUA(){
      let send = this.prepareSend()
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('Authorization', 'Bearer ' + send.token);
      this.http.post<IResponse>(`${this.url}uuid`, send, {headers}).subscribe
        (data => {
            if (data.code === 200) {
              this.checkRequestAccount(data);
    }});
  }

  /** После входа с лэндинга (URL `/landing`) уводим на основной экран приложения. */
  afterLoginNavigateAwayFromLanding(): void {
    const path = (this._router.url || "").split("?")[0];
    if (path === "/landing") {
      void this._router.navigate(["/"]);
    }
  }

  private clearAuthCookies(): void {
      const cookieNames = ['auth-token-ocpio', 'profileId-ocpio', 'uuid-ocpio'];
      for (const name of cookieNames) {
          // Try both root-path and default-path variants to avoid stale auth cookies.
          this.cookieService.delete(name, '/');
          this.cookieService.delete(name);
      }
  }

  async logoutAndClearCaches(): Promise<void> {
      this.clearAuthCookies();

      this.mainCategoriesProfile$.next(null);
      this.allProfiles$.next([]);
      this.isAutentificate$.next(false);
      this.isLoad$.next(true);
      this.store$.dispatch(logoutAction());

      try {
          sessionStorage.clear();
          localStorage.clear();
      } catch {}

      try {
          if ('caches' in window) {
              const keys = await caches.keys();
              await Promise.all(keys.map(key => caches.delete(key)));
          }
      } catch {}

      try {
          if ('serviceWorker' in navigator) {
              const regs = await navigator.serviceWorker.getRegistrations();
              await Promise.all(regs.map(reg => reg.unregister()));
          }
      } catch {}
  }

}

/**
 * APP_INITIALIZER: гарантирует, что проверка авторизации (isLoad$) завершится
 * до старта роутера — иначе guard'ы, ожидающие isLoad$, и checkCookie(),
 * вызываемый из AppComponent.ngOnInit, образуют дедлок при initialNavigation: 'enabledBlocking'.
 */
export function initializeAuth(loginService: LoginService): () => Promise<void> {
  return () => new Promise<void>(resolve => {
    const check$ = loginService.checkCookie();
    if (!check$) {
      resolve();
      return;
    }
    check$.subscribe({ complete: () => resolve() });
  });
}
