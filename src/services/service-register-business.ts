import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {HttpClient, HttpEvent, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {environment} from "../enviroments/environment";
import {IResponse} from "../app/DTO/classes/IResponse";

@Injectable({providedIn: 'root'})
export class ServiceRegisterBusinessProfile {

  public uri = environment.Uri;
  public countryList$ = new BehaviorSubject<string[]>([]);
  public allRegions$ = new BehaviorSubject<string[]>([]);
  public allCity$ = new BehaviorSubject<string[]>([]);
  public getAllStreet$ = new BehaviorSubject<string[]>([]);
  public getAllCity$ = new BehaviorSubject<string[]>([]);

  constructor(private  readonly http: HttpClient,
              private readonly cookieService: CookieService) {}

  // страна
  public async getAllCountry(){
    return this.http.get<string[]>(`${this.uri}dictionaries/address/country`).pipe(
      tap(data => this.countryList$.next(data)));
  }

  public async getCities(){
    return this.http.get<string[]>(`${this.uri}dictionaries/address/cities`).pipe(
        tap(data => this.getAllCity$.next(data)));
  }

  //получаем регионы по стране
  public async getAllRegions(countrie: string){
    return this.http.get<string[]>(`${this.uri}dictionaries/address/region?country=${countrie}`).pipe(
      tap(res => this.allRegions$.next(res)));
  }

  //получаем города по региону
  public async getAllCity(region: string){
    return this.http.get<string[]>(`${this.uri}dictionaries/address/area?region=${region}`).pipe(
      tap(res => this.allCity$.next(res)));
  }

  //получаем улица по городу
  public async getAllStreet(region: string){
    return this.http.get<string[]>(`${this.uri}/dictionaries/address/area?region=${region}`).pipe(
      tap(res => this.getAllStreet$.next(res)));
  }

  /**
   * Загрузка аватара профиля. Эндпоинт закрыт авторизацией, а глобального
   * auth-интерцептора в проекте нет — токен обязателен, иначе бэк отвечает 401.
   * При регистрации БА токен приходит из стора (профиль ещё не в куках).
   */
  public save_avatar(id:string, formData: any, token?: string): Observable<HttpEvent<IResponse>> {
    const auth = token ?? this.cookieService.get('auth-token-ocpio');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + auth);
    return this.http.post<IResponse>(`${this.uri}profiles/${id}/avatar`, formData, {
      headers,
      reportProgress: true,
      observe: 'events',
    });
  }
}
