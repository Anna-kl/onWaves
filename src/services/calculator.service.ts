import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../enviroments/environment';
import { IResponse } from '../app/DTO/classes/IResponse';
import {
  ICalculatorAnswer,
  ICalculatorConnection,
  ICalculatorMasterNotify,
  ICalculatorQuoteState,
} from '../app/DTO/views/calculator/ICalculator';

const TOKEN_HEADER = 'X-Quote-Token';

@Injectable({ providedIn: 'root' })
export class CalculatorService {
  private readonly url = environment.Uri + 'calculators/';

  constructor(private readonly http: HttpClient) {}

  getByProfile(profileId: string): Observable<ICalculatorConnection[]> {
    return this.http.get<IResponse>(`${this.url}by-profile/${profileId}`).pipe(
      map(res => (res.code === 200 ? (res.data as ICalculatorConnection[]) ?? [] : []))
    );
  }

  startQuote(profileCalculatorId: string, requestId: string): Observable<IResponse> {
    return this.http.post<IResponse>(`${this.url}quotes`, { profileCalculatorId, requestId });
  }

  getQuote(quoteId: string, token: string): Observable<IResponse> {
    return this.http.get<IResponse>(`${this.url}quotes/${quoteId}`, {
      headers: this.tokenHeaders(token)
    });
  }

  putAnswer(
    quoteId: string,
    stepId: string,
    token: string,
    expectedRevision: number,
    requestId: string,
    answer: ICalculatorAnswer
  ): Observable<IResponse> {
    return this.http.put<IResponse>(
      `${this.url}quotes/${quoteId}/answers/${stepId}`,
      { expectedRevision, requestId, answer },
      { headers: this.tokenHeaders(token) }
    );
  }

  submitLead(
    quoteId: string,
    token: string,
    expectedRevision: number,
    requestId: string,
    body: { name: string; phone: string; city?: string; comment?: string; consentAccepted: boolean }
  ): Observable<IResponse> {
    return this.http.post<IResponse>(
      `${this.url}quotes/${quoteId}/leads`,
      { expectedRevision, requestId, ...body },
      { headers: this.tokenHeaders(token) }
    );
  }

  /**
   * Расчёт мастеру в MAX от бота OnWaves (служебный канал). Сервер сам решает, есть ли
   * у мастера привязка и согласие; ответ `{ sent, reason }`. Старый бэк отдаёт 404.
   */
  notifyMaster(quoteId: string, token: string, requestId: string): Observable<IResponse> {
    return this.http.post<IResponse>(
      `${this.url}quotes/${quoteId}/master-notify`,
      { requestId, channel: 'max' },
      { headers: this.tokenHeaders(token) }
    );
  }

  asNotify(res: IResponse): ICalculatorMasterNotify | null {
    if (res?.code !== 200 || !res.data) {
      return null;
    }
    return res.data as ICalculatorMasterNotify;
  }

  asState(res: IResponse): ICalculatorQuoteState | null {
    if (!res?.data) {
      return null;
    }
    if (res.code !== 200 && res.code !== 409) {
      return null;
    }
    return res.data as ICalculatorQuoteState;
  }

  private tokenHeaders(token: string): HttpHeaders {
    return new HttpHeaders().set(TOKEN_HEADER, token);
  }
}
