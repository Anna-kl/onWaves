import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../enviroments/environment';
import { IResponse } from '../app/DTO/classes/IResponse';
import { IViewConsent } from '../app/DTO/views/consent/IViewConsent';
import { ISendConsent } from '../app/DTO/requests/ISendConsent';
import { ISendConsentBulk } from '../app/DTO/requests/ISendConsentBulk';
import { ConsentChannel } from '../app/DTO/enums/consentChannel';

export interface INotificationChannelsStatus {
  telegram: boolean;
  vk: boolean;
  max: boolean;
}

export interface ISubscribeLink {
  channel: ConsentChannel;
  link: string;
}

@Injectable({
  providedIn: 'root',
})
export class ConsentService {
  private url = environment.Uri + 'Consent/';

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  private authHeaders(): HttpHeaders {
    const token = this.cookieService.get('auth-token-ocpio');
    return new HttpHeaders().set('Authorization', 'Bearer ' + token);
  }

  /** Отсортированный по убыванию список версий текста согласия, [0] — актуальная. */
  getTextVersions() {
    return this.http.get<string[]>(`${this.url}text/versions`);
  }

  /** Полный текст согласия для конкретной версии. */
  getText(version: string) {
    return this.http.get(`${this.url}text/${version}`, { responseType: 'text' });
  }

  /** Зафиксировать выдачу или отзыв согласия. Доступен без авторизации. */
  sendConsent(request: ISendConsent) {
    return this.http.post<IResponse>(this.url, request);
  }

  /** Зафиксировать согласие/отзыв сразу по нескольким каналам одной транзакцией. channels: null = все каналы. */
  sendConsentBulk(request: ISendConsentBulk) {
    return this.http.post<IResponse>(`${this.url}bulk`, request);
  }

  /** Текущий статус согласий профиля по каждому каналу. */
  getProfileConsents(profileUserId: string) {
    return this.http.get<IViewConsent[]>(`${this.url}${profileUserId}`, { headers: this.authHeaders() });
  }

  /** Лёгкая проверка: подписан ли профиль хотя бы на один канал уведомлений. */
  hasActiveChannel(profileUserId: string) {
    return this.http.get<IResponse>(`${this.url}${profileUserId}/has-active-channel`, { headers: this.authHeaders() });
  }

  /** Отозвать сразу все активные согласия профиля. */
  revokeAllConsents(profileUserId: string) {
    return this.http.delete<IResponse>(`${this.url}${profileUserId}`, { headers: this.authHeaders() });
  }

  /** Полная история согласий профиля (для аудита/выгрузки по запросу субъекта ПДн). */
  getHistory(profileUserId: string) {
    return this.http.get<IViewConsent[]>(`${this.url}${profileUserId}/history`, { headers: this.authHeaders() });
  }

  /** Статус подключения каналов уведомлений: { telegram, vk, max }. */
  getNotificationChannelsStatus(profileUserId: string) {
    return this.http.get<INotificationChannelsStatus>(
      `${environment.Uri}profiles/messenger-channels-status/${profileUserId}`,
      { headers: this.authHeaders() }
    );
  }

  /** Получить ссылку для подписки на бота конкретного канала. */
  getSubscribeLink(profileUserId: string, channel: ConsentChannel) {
    return this.http.get<ISubscribeLink>(
      `${environment.Uri}profiles/subscribe-link/${profileUserId}/${channel}`,
      { headers: this.authHeaders() }
    );
  }
}
