import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../enviroments/environment';
import { IResponse } from '../app/DTO/classes/IResponse';
import { IViewConsent } from '../app/DTO/views/consent/IViewConsent';
import { ISendConsent } from '../app/DTO/requests/ISendConsent';
import { ISendConsentBulk } from '../app/DTO/requests/ISendConsentBulk';
import { ConsentChannel } from '../app/DTO/enums/consentChannel';
import { map, throwError, timeout } from 'rxjs';

// The profiles route takes backend MessageType, not ConsentChannel.
const messengerLinkTypes: Partial<Record<ConsentChannel, number>> = {
  [ConsentChannel.Telegram]: 1,
  [ConsentChannel.Vk]: 3,
  [ConsentChannel.Max]: 5,
};

export interface INotificationChannelsStatus {
  telegram: boolean;
  telegramFromPersonal?: boolean;
  telegramConnectionPending?: boolean;
  telegramExplicitlyDisabled?: boolean;
  telegramOwnConsent?: boolean;
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
  private readSequence = 0;

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  private authHeaders(): HttpHeaders {
    const token = this.cookieService.get('auth-token-ocpio');
    return new HttpHeaders().set('Authorization', 'Bearer ' + token);
  }

  private freshReadOptions() {
    // Angular 16 can reuse a GET from transfer cache until the app stabilizes.
    return { headers: this.authHeaders(),
      params: new HttpParams().set('_', `${Date.now()}-${++this.readSequence}`) };
  }

  /** Отсортированный по убыванию список версий текста согласия, [0] — актуальная. */
  getTextVersions() {
    return this.http.get<string[]>(`${this.url}text/versions`);
  }

  /** Полный текст согласия для конкретной версии. */
  getText(version: string) {
    return this.http.get(`${this.url}text/${version}`, { responseType: 'text' });
  }

  /** Настройки вошедшего пользователя. Регистрация использует отдельный bulk-контракт. */
  sendConsent(request: ISendConsent) {
    return this.http.post<IResponse>(`${this.url}${request.profileUserId}/settings`, request, { headers: this.authHeaders() });
  }

  /** Зафиксировать согласие/отзыв сразу по нескольким каналам одной транзакцией. channels: null = все каналы. */
  sendConsentBulk(request: ISendConsentBulk) {
    return this.http.post<IResponse>(`${this.url}bulk`, request,
      request.profileUserId ? { headers: this.authHeaders() } : {});
  }

  /** Текущий статус согласий профиля по каждому каналу. */
  getProfileConsents(profileUserId: string) {
    return this.http.get<IViewConsent[]>(`${this.url}${profileUserId}`, this.freshReadOptions());
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
      this.freshReadOptions()
    ).pipe(timeout(15000));
  }

  /** Получить ссылку для подписки на бота конкретного канала. */
  getSubscribeLink(profileUserId: string, channel: ConsentChannel) {
    const type = messengerLinkTypes[channel];
    if (type === undefined) return throwError(() => new Error('Unsupported messenger'));
    return this.http.get<{channel: number; link: string}>(
      `${environment.Uri}profiles/subscribe-link/${profileUserId}/${type}`,
      channel === ConsentChannel.Telegram ? this.freshReadOptions() : { headers: this.authHeaders() }
    ).pipe(timeout(15000), map(response => {
      if (response?.channel !== type || !response.link) throw new Error('Missing messenger link');
      return { channel, link: response.link };
    }));
  }
}
