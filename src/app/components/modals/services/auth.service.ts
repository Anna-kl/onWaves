import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../enviroments/environment';
import { Observable } from 'rxjs';
import { IResponse } from '../../../DTO/classes/IResponse';
import { ISendCode } from '../../../DTO/ISendCode';


@Injectable()

export class AuthServices {
  private url = environment.Uri + 'auths/';

  constructor(private http: HttpClient) {

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
  sendCodeToMax(phone: string, sessionId?: string): Observable<IResponse> {
    return this.http.post<IResponse>(`${this.url}max/send-code`, {phone, sessionId});
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
  getMaxLoginStatus(sessionId: string): Observable<IResponse> {
    return this.http.get<IResponse>(`${this.url}max/login-status/${sessionId}`);
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
