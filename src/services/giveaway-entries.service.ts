import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../enviroments/environment';
import { IResponse } from '../app/DTO/classes/IResponse';

export const WEBSITE_PHONE = 1;

export interface GiveawayEntrySource {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  entryPoint?: 'home' | 'master' | 'direct';
}

export interface GiveawayEntryRequest {
  phone: string;
  firstName: string;
  lastName?: string;
  rulesVersion: number;
  privacyVersion: string;
  attribution: GiveawayEntrySource;
}

export interface GiveawayEntry {
  entryId: string;
  campaignCode: string;
  title: string;
  city?: string;
  number: number;
  createdAt: string;
  resultsPlannedAt?: string;
  phase: string;
  alreadyRegistered: boolean;
  result: 'participating' | 'won' | 'not_won';
}

export interface GiveawayEntryPage {
  total: number;
  page: number;
  pageSize: number;
  canExport: boolean;
  items: {
    number: number;
    createdAt: string;
    firstName?: string;
    lastName?: string;
    phoneMasked: string;
    attribution: GiveawayEntrySource;
    status: string;
  }[];
}

export interface GiveawaySession { token: string; profileUserId: string | null; }

@Injectable({ providedIn: 'root' })
export class GiveawayEntriesService {
  private readonly url = environment.Uri + 'giveaways/';
  private readonly auth = environment.Uri + 'auths';

  constructor(private http: HttpClient, private cookies: CookieService) {}

  get token(): string { return this.cookies.get('auth-token-ocpio'); }

  requestCode(phone: string, channel = 0) {
    return this.http.post<IResponse>(this.auth + '/request-code', { phone, channel }, { headers: this.noStore() });
  }

  verify(session: string, code: string, uuid: string, preferredProfileId: string | null) {
    return this.http.post<IResponse>(this.auth, { session, code, uuid, giveawayEntry: true, preferredProfileId },
      { headers: this.noStore() });
  }

  openCabinet(code: string, token: string) {
    return this.http.post<GiveawaySession>(this.path(code) + '/session', {}, { headers: this.headers(token) });
  }

  enter(code: string, request: GiveawayEntryRequest) {
    return this.http.post<GiveawayEntry>(this.path(code) + '/confirmed-phone', request, { headers: this.headers() });
  }

  own(code: string) {
    return this.http.get<GiveawayEntry>(this.path(code) + '/me', { headers: this.headers() });
  }

  mine() {
    return this.http.get<GiveawayEntry[]>(this.url + 'me/entries', { headers: this.headers() });
  }

  registry(code: string, page: number, source: string) {
    let params = new HttpParams().set('page', page).set('size', 25);
    if (source) params = params.set('source', source);
    return this.http.get<GiveawayEntryPage>(this.ownerPath(code) + '/entries', { headers: this.headers(), params });
  }

  export(code: string) {
    return this.http.get(this.ownerPath(code) + '/entries/export', { headers: this.headers(), responseType: 'blob' });
  }

  publish(code: string, expectedVersion: number) {
    return this.http.post(this.ownerPath(code) + '/results', { expectedVersion }, { headers: this.headers() });
  }

  private path(code: string): string { return this.url + encodeURIComponent(code) + '/entries'; }
  private ownerPath(code: string): string { return this.url + 'admin/campaigns/' + encodeURIComponent(code); }
  private noStore(): HttpHeaders { return new HttpHeaders({ 'Cache-Control': 'no-store' }); }
  private headers(token = this.token): HttpHeaders { return this.noStore().set('Authorization', 'Bearer ' + token); }
}
