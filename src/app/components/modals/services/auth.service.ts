import {Injectable} from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../enviroments/environment';
import { Observable } from 'rxjs';
import { IResponse } from '../../../DTO/classes/IResponse';
import { ISendCode } from '../../../DTO/ISendCode';


@Injectable()

export class AuthServices {
  private url = environment.Uri + 'auths/';
  private readonly statusHttp: HttpClient;

  constructor(private http: HttpClient, backend: HttpBackend) {
    // Angular 16 may cache repeated GETs until the application becomes stable.
    // A live authentication status must always come from the server.
    this.statusHttp = new HttpClient(backend);

  }

  register(phone: string): Observable<IResponse> {
    return this.http.get<IResponse>(`${this.url}${phone}`);
  }

  sendSms(phone: string): Observable<IResponse> {
    return this.http.get<IResponse>(`${this.url}${phone}?method=sms`);
  }

  /**
   * Flash-call через Zvonok — запасной канал, когда звонок Plusofon не дошёл.
   * Код снова последние 4 цифры входящего номера; сессия новая (пин задаёт Zvonok).
   */
  sendZvonok(phone: string): Observable<IResponse> {
    return this.http.get<IResponse>(`${this.url}${phone}?method=zvonok`);
  }

  /** Привязан ли к номеру аккаунт MAX — от этого зависит, слать код или открывать бота. */
  isMaxAvailable(phone: string): Observable<IResponse> {
    return this.http.get<IResponse>(`${this.url}max/available/${phone}`);
  }

  /**
   * Продублировать код в мессенджер MAX.
   * Живая сессия (моложе 5 минут) переиспользуется: в MAX уходит тот же код,
   * поэтому код, который всё-таки дойдёт звонком, не обесценивается.
   * Ошибки в body.code: 409 — не привязан, 502 — MAX не принял сообщение.
   */
  sendCodeToMax(phone: string, sessionId?: string, uuid?: string): Observable<IResponse> {
    return this.http.post<IResponse>(`${this.url}max/send-code`, {phone, sessionId, uuid});
  }

  /**
   * Вход через MAX без привязки: диплинк на бота.
   * Телефон уже есть с первого экрана (звонок не дошёл) — кладём его в сессию.
   */
  startMaxLogin(phone: string, uuid: string): Observable<IResponse> {
    const query = uuid ? `?uuid=${encodeURIComponent(uuid)}` : '';
    return this.http.post<IResponse>(`${this.url}max/login${query}`, { phone });
  }

  /** 0 ждали бота, 1 подтверждение номера, 2 код ушёл, 3 авторизован, 4 ссылка просрочена. */
  getMaxLoginStatus(sessionId: string, uuid?: string): Observable<IResponse> {
    return this.statusHttp.get<IResponse>(`${this.url}max/login-status/${sessionId}`, { params: uuid ? { uuid } : {} });
  }

  cancelMaxLogin(sessionId: string, uuid: string): Observable<IResponse> {
    return this.http.post<IResponse>(`${this.url}max/login-cancel/${sessionId}`, null, { params: { uuid } });
  }

  checkCode(send: ISendCode): Observable<IResponse> {
    let headers: HttpHeaders = new HttpHeaders();
    return this.http.post<IResponse>(`${this.url}`, send, {headers});
  }

  registerEmail(email:string){
    let headers: HttpHeaders = new HttpHeaders();
    return this.http.post<IResponse>(`${this.url}register-email/`, {email}, {headers});
  }

  /** Лёгкая регистрация без SMS-кода: вернёт существующий профиль по телефону или создаст новый. */
  quickRegister(payload: { phone: string; name: string }): Observable<IResponse> {
    return this.http.post<IResponse>(`${this.url}quick-register`, payload);
  }
}
