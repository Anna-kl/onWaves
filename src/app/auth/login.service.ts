import {DestroyRef, Inject, Injectable, PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RememberedSessionService } from './remembered-session.service';
import {environment} from "../../enviroments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, EMPTY, filter, finalize, map, of, switchMap, take, tap, timeout, withLatestFrom} from 'rxjs';
import {CookieService} from "ngx-cookie-service";
import {Md5} from "ts-md5";
import {IResponse} from "../DTO/classes/IResponse";
import {IViewProfileMenu} from "../DTO/views/profile/IViewProfileMenu";
import {IViewBusinessProfile} from "../DTO/views/business/IViewBussinessProfile";

import {ProfileService} from "../../services/profile.service";
import { Store, select } from "@ngrx/store";
import { clearActiveProfileAction, getActionStateMainProfileClient, logoutAction } from "../ngrx-store/mainClient/store.action";
import { UserType } from "../DTO/classes/profiles/profile-user.model";
import { selectLink } from "../ngrx-store/links/link.selector";
import { clearLinkAction } from "../ngrx-store/links/link.action";
import { takePrizeCabinetReturn } from "../../helpers/giveaway";
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
                private _router: Router,
                public readonly session: RememberedSessionService,
                @Inject(PLATFORM_ID) private readonly platformId: string,
                destroyRef: DestroyRef) {
        this.session.ended$.pipe(takeUntilDestroyed(destroyRef)).subscribe(() => {
            this.mainCategoriesProfile$.next(null);
            this.allProfiles$.next([]);
            this.isAutentificate$.next(false);
        });
        // Инициализация могла пройти офлайн. Успешное тихое продление после возврата
        // сети восстанавливает и профиль, а не только cookie с JWT.
        this.session.renewed$.pipe(
            filter(() => this.isLoad$.value && !this.isAutentificate$.value),
            tap(() => this.isLoad$.next(false)),
            switchMap(data => this.checkRequestAccount(data).pipe(
                tap(() => this.isAutentificate$.next(this.isAuthenticated())),
                catchError(() => EMPTY),
                finalize(() => this.isLoad$.next(true)),
            )),
            takeUntilDestroyed(destroyRef),
        ).subscribe();
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
    checkCookie(keepPage = false){
        if (!isPlatformBrowser(this.platformId) || !this.isAuthenticated()) {
            this.isAutentificate$.next(false);
            this.isLoad$.next(true);
            return null;
        }
        if (!keepPage) this.isLoad$.next(false);
        return this.session.renew().pipe(
            switchMap(data => this.checkRequestAccount(data, !keepPage)),
            tap(() => this.isAutentificate$.next(this.isAuthenticated())),
            // Сетевой сбой не стирает cookie: следующий заход снова восстановит сессию.
            catchError(() => {
                if (!this.isAuthenticated()) this.isAutentificate$.next(false);
                return EMPTY;
            }),
            finalize(() => { if (!keepPage) this.isLoad$.next(true); }),
        );
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
                  this.mainCategoriesProfile$.next({profile: result.data, token: this.cookieService.get('auth-token-ocpio')});
                }
            }
        );
    }

    checkRequestAccount(data: IResponse, followLink = true){
      const profile = data.data.profile as IViewBusinessProfile;
      const token = data.data.token as string;
      const profileId = this.isProfileId();
      return this.getAllBusinessProfile(profile.id!, token, profile.userType!).pipe(
          take(1),
          timeout(10_000),
          catchError(() => of({ code: 503, data: [], message: '' } as IResponse)),
          withLatestFrom(this.store$.pipe(select(selectLink))),
          tap(([result, link]) => {
              if (!this.session.sameSession(token, this.cookieService.get('auth-token-ocpio'))) return;
              const extra = Array.isArray(result.data) ? result.data.filter(Boolean) : [];
              const view: IViewBusinessProfile[] = [profile, ...extra.filter((item: IViewBusinessProfile) => item.id !== profile.id)];
              // При временной ошибке списка BA сохраняем уже выбранный профиль из текущей сессии.
              const previous = this.mainCategoriesProfile$.value?.profile;
              const selected = view.find(item => item.id === profileId)
                  ?? (result.code === 503 && previous?.id === profileId ? previous : profile);
              const currentToken = this.cookieService.get('auth-token-ocpio');
              this.session.remember(currentToken, result.code === 503 && profileId ? profileId : selected.id);
              this.allProfiles$.next(view);
              this.mainCategoriesProfile$.next({ profile: selected, token: currentToken });
              this.store$.dispatch(getActionStateMainProfileClient({
                  tokenMainClient: currentToken, profileMainClient: selected,
              }));
              this.store$.dispatch(requestAction({request: selected.id!}));
              const notificationProfile = view.find(item => item.userType === UserType.User) ?? selected;
              void this._push.syncExistingSubscription(notificationProfile.id!).catch(() => {});
              if (followLink && link.isHasLink) {
                  this.store$.dispatch(clearLinkAction());
                  const ua = view.find(item => item.userType === UserType.User);
                  if (takePrizeCabinetReturn() && ua?.id) {
                      void this._router.navigate(['/page-user', ua.id], { fragment: 'prizes' });
                  } else {
                      void this._router.navigate([link.link]);
                  }
              }
          }),
      );
    }

    updateProfileUA(){
      this.checkCookie()?.subscribe();
  }

  /**
   * Синхронно удаляет профиль из клиентского состояния после успешного DELETE.
   * Повторная загрузка с сервера выполняется отдельно через updateProfileUA().
   */
  removeDeletedProfileFromClientState(
    deletedProfileId: string,
    preferredProfileId?: string,
  ): IViewBusinessProfile | null {
      const remainingProfiles = this.allProfiles$.value.filter(
          profile => profile.id !== deletedProfileId,
      );
      this.allProfiles$.next(remainingProfiles);

      const nextProfile =
          remainingProfiles.find(profile => profile.id === preferredProfileId) ??
          remainingProfiles.find(profile => profile.userType === UserType.User) ??
          remainingProfiles[0] ??
          null;

      if (nextProfile?.id) {
          const expiry = new Date();
          expiry.setDate(expiry.getDate() + 365);
          const token = this.cookieService.get('auth-token-ocpio');

          this.cookieService.set('profileId-ocpio', nextProfile.id, expiry, '/');
          this.mainCategoriesProfile$.next({profile: nextProfile, token});
          this.store$.dispatch(getActionStateMainProfileClient({
              tokenMainClient: token,
              profileMainClient: nextProfile,
          }));
          this.store$.dispatch(requestAction({request: nextProfile.id}));
      } else if (preferredProfileId) {
          const expiry = new Date();
          expiry.setDate(expiry.getDate() + 365);
          this.cookieService.set('profileId-ocpio', preferredProfileId, expiry, '/');
          this.mainCategoriesProfile$.next(null);
          this.store$.dispatch(clearActiveProfileAction());
      } else {
          this.cookieService.delete('profileId-ocpio', '/');
          this.cookieService.delete('profileId-ocpio');
          this.mainCategoriesProfile$.next(null);
          this.store$.dispatch(clearActiveProfileAction());
      }

      void this.clearApplicationCacheAfterProfileDeletion(deletedProfileId);
      return nextProfile;
  }

  private async clearApplicationCacheAfterProfileDeletion(deletedProfileId: string): Promise<void> {
      try {
          if (typeof window !== 'undefined') {
              for (const storage of [localStorage, sessionStorage]) {
                  Object.keys(storage)
                      .filter(key => key.includes(deletedProfileId))
                      .forEach(key => storage.removeItem(key));
              }
          }
      } catch {}

      try {
          if (typeof window !== 'undefined' && 'caches' in window) {
              const cacheNames = await caches.keys();
              await Promise.all(
                  cacheNames
                      .filter(cacheName => cacheName.startsWith('onwaves-cache-'))
                      .map(cacheName => caches.delete(cacheName)),
              );
          }
      } catch {}
  }

  /** После входа с лэндинга (URL `/landing`) уводим на основной экран приложения. */
  afterLoginNavigateAwayFromLanding(): void {
    const path = (this._router.url || "").split("?")[0];
    if (path === "/landing") {
      void this._router.navigate(["/"]);
    }
  }

  async logoutAndClearCaches(): Promise<void> {
      if (!isPlatformBrowser(this.platformId)) return;
      const revoke = this.session.logout();

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

      // Service worker здесь НЕ разрегистрируется намеренно. Вместе с
      // регистрацией браузер аннулирует push-подписку origin'а: endpoint в
      // push_subscriptions становится мёртвым, отписаться от него бэкенд узнает
      // только по 410 Gone, а UI до тех пор показывает канал подключённым
      // (IsSubscribed = согласие AND строка в БД). Подписка привязана к
      // устройству, а не к сессии: она переживает логаут, а при входе другого
      // профиля upsert по endpoint на бэкенде перепривяжет её к нему.
      // Кеши выше почищены — на push они не влияют.
      await revoke;
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
