import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable, shareReplay, tap, throwError} from 'rxjs';
import { environment } from '../enviroments/environment';
import { IResponse } from '../app/DTO/classes/IResponse';
import { BusService } from './busService';
import {ICategory} from "../app/DTO/classes/ICategory";
import {IViewBusinessProfile} from "../app/DTO/views/business/IViewBussinessProfile";
import { ICoupon } from 'src/app/DTO/classes/promo/IPoupon';
import {CookieService} from "ngx-cookie-service";
import { IWorkLocation } from "../app/DTO/views/IWorkLocation";

interface ReadCacheEntry {
  expiresAt: number;
  value$: Observable<IResponse>;
}

@Injectable({
  providedIn: 'root'
})

export class ProfileService {
  private url = environment.Uri + 'profiles/';

  // Короткоживущий кеш чтения профиля и work-location: гасит повторные GET от
  // разных компонентов страницы и при быстрой навигации туда-обратно.
  private static readonly READ_CACHE_TTL = 30_000;
  private readonly profileCache = new Map<string, ReadCacheEntry>();
  private readonly workLocationCache = new Map<string, ReadCacheEntry>();

  constructor(
    private http: HttpClient,
    private busService: BusService,
    private cookieService: CookieService,
  ) {
  }

  /**
   * TTL-кеш чтения для GET, возвращающих IResponse. shareReplay держит один общий
   * ответ на всех подписчиков (дедуп параллельных вызовов от разных компонентов)
   * и отдаёт его повторным подписчикам в пределах TTL.
   *
   * Перенос данных SSR→браузер отдельно НЕ нужен: `provideClientHydration()` в этой
   * версии Angular включает httpcache — GET-ответы, сделанные при SSR, сериализуются
   * в ng-state и клиент не повторяет их после гидратации.
   */
  private cachedResponse(
    cache: Map<string, ReadCacheEntry>,
    id: string,
    factory: () => Observable<IResponse>,
  ): Observable<IResponse> {
    const hit = cache.get(id);
    if (hit && hit.expiresAt > Date.now()) {
      return hit.value$;
    }
    const value$ = factory().pipe(
      shareReplay({ bufferSize: 1, refCount: false })
    );
    cache.set(id, { expiresAt: Date.now() + ProfileService.READ_CACHE_TTL, value$ });
    return value$;
  }

  /** Сбрасываем кеш профиля после мутаций (смена города, статуса приёма заказов и т.п.). */
  private invalidateProfile(id: string): void {
    this.profileCache.delete(id);
  }
  private invalidateWorkLocation(id: string): void {
    this.workLocationCache.delete(id);
  }
  public listClientsCard$ = new BehaviorSubject<IResponse|null>(null);
  createProfile(profile: IViewBusinessProfile, token: string): Observable<IResponse>{
    let  headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token);
    // let profileUser: IViewBusinessProfile = {
    //   name: profile.name, Family: profile.family},
 
    //   UserType: UserType.User
    // };
    // if (Object.keys(profile).includes('email')){
    //   profile.email = profile['email']
    // }
    return this.http.post<IResponse>(this.url, profile, {headers});
  }

  changeCity(id: string, city: string){
     return this.http.post<IResponse>(`${this.url}change-city/${id}`, {city}).pipe(
       tap(() => this.invalidateProfile(id))
     );
  }

  /** Публичный — получить локацию работы (WorkLocation) профиля. Кеш + TransferState. */
  getWorkLocation(id: string): Observable<IResponse> {
     return this.cachedResponse(this.workLocationCache, id,
       () => this.http.get<IResponse>(`${this.url}${id}/work-location`));
  }

  /** Создать/обновить локацию работы (тип Mobile/Fixed, список городов для разъездной). */
  updateWorkLocation(id: string, body: IWorkLocation){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.cookieService.get('auth-token-ocpio'));
    return this.http.put<IResponse>(`${this.url}${id}/work-location`, body, {headers}).pipe(
      tap(() => this.invalidateWorkLocation(id))
    );
  }

  /**
   * Создать одну запись локации работы (по одному формату: Online / Fixed / Mobile).
   * Бэк различает формат по body.locationType и отвечает кодом 201.
   * Для мультивыбора вызывается по разу на каждый выбранный формат (см. forkJoin в вызывающем коде).
   */
  createWorkLocation(id: string, body: IWorkLocation, token?: string){
    let headers: HttpHeaders = new HttpHeaders();
    const auth = token ?? this.cookieService.get('auth-token-ocpio');
    headers = headers.append('Authorization', 'Bearer ' + auth);
    return this.http.post<IResponse>(`${this.url}${id}/work-location`, body, {headers}).pipe(
      tap(() => this.invalidateWorkLocation(id))
    );
  }

  hasCoupon(id: string){
     return this.http.get<boolean>(`${this.url}has-coupon/${id}`);
  }

  /**
   * GET profiles/has-telegram-notification/{id}
   * Бэкенд возвращает Task<bool> — в теле ответа JSON true/false (HttpClient.get<boolean>).
   */
  hasTelegramNotification(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}messenger-channels-status/${id}`);
  }

  getCoupon(id: string){
     return this.http.get<ICoupon|null>(`${this.url}get-coupon/${id}`);
  }


  // getHistoryCards удалён: он собирал тот же URL, что и getProfileAsync,
  // и подсовывал список рекомендаций под видом истории просмотров.
  // История — HistoryService.getHistoryCards (GET history/{id}).

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

  /** События лендингов без профиля (например /masters). В Prod уходит в Kafka send-reference. */
  sendLandingEvent(page: string, option: string, whoIs: string|null){
    let urlTemp = `${this.url}get-landing-event?page=${encodeURIComponent(page)}&option=${encodeURIComponent(option)}`;
    if (whoIs)
      return this.http.get<IResponse>(`${urlTemp}&whoIs=${whoIs}`);
    else
      return this.http.get<IResponse>(urlTemp);
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
  deleteProfile(id: string, token: string): Observable<IResponse>{
    if (!token?.trim()) {
      return throwError(() => new Error('Auth token is required to delete profile'));
    }

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token);
    return this.http.delete<IResponse>(`${this.url}${id}`, {headers});
  }


  createBAProfile(view: IViewBusinessProfile, token: string, requestId?: string){
    let  headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token);

    // ══════════════════════════════════════════════════════════════
    // КРИТИЧНО: Добавляем уникальный ID запроса для идемпотентности
    // Бэк должен использовать этот header для предотвращения дублей
    // ══════════════════════════════════════════════════════════════
    if (requestId) {
      headers = headers.append('Idempotency-Key', requestId);
    }

    return this.http.post<IResponse>(`${this.url}business`, view, {headers});
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

   getProfileAsync(skip: number, isRecommend: boolean, id?: string|null) {
    if (id)
    return this.http.get<IViewBusinessProfile[]>(`${this.url}?id=${id}&type=1&&isRecommend=${isRecommend}&skip=${skip}`);
    else{
       return this.http.get<IViewBusinessProfile[]>(`${this.url}?type=1&&isRecommend=${isRecommend}&skip=${skip}`);
    }
  };

  getFullAddress(id: string){
    return this.http.get<IResponse>(`${this.url}get-full-address/${id}`);
  }
  getBusinessProfileById(id: string): Observable<IResponse>
  {
    return this.cachedResponse(this.profileCache, id,
      () => this.http.get<IResponse>(`${this.url}get-full-baprofile/${id}`));
  }

  changeIsGetOrder(id: string, data: { isGetOrder: boolean | undefined }){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.cookieService.get('auth-token-ocpio'));
    return this.http.put<IResponse>(`${this.url}change-IsGetOrder/${id}`, data, {headers}).pipe(
      tap(() => this.invalidateProfile(id))
    );
  }

  changeIsPromo(id: string, data: { isPromo: boolean | undefined }){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.cookieService.get('auth-token-ocpio'));
    return this.http.put<IResponse>(`${this.url}change-IsPromo/${id}`, data, {headers}).pipe(
      tap(() => this.invalidateProfile(id))
    );
  }

  getBusinessProfileForEditById(id: string): Observable<IResponse>
  {
    return this.http.get<IResponse>(`${this.url}get-for-edit-baprofile/${id}`);
  }

  getViewProfile(id: string){
    return this.http.get<IViewBusinessProfile>(`${this.url}${id}`);
 }

}
