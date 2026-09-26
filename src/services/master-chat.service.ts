import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../enviroments/environment';
import { IResponse } from '../app/DTO/classes/IResponse';
import { IStartMasterThreadRequest } from '../app/DTO/views/chat/IMasterChat';

const QUOTE_TOKEN_HEADER = 'X-Quote-Token';
const AUTH_COOKIE = 'auth-token-ocpio';

/**
 * Треды «клиент × мастер» (v1/api/chats/threads). Старый ChatService страницы
 * /chat-page переедет сюда отдельной задачей — см. CHATS-MASTER-THREADS-2026-09-16.md.
 */
@Injectable({ providedIn: 'root' })
export class MasterChatService {
  private readonly url = environment.Uri + 'chats/';

  constructor(
    private readonly http: HttpClient,
    private readonly cookies: CookieService,
  ) {}

  /** Первое сообщение мастеру: находит или создаёт тред и кладёт в него сообщение. */
  startThread(body: IStartMasterThreadRequest, quoteToken?: string | null): Observable<IResponse> {
    let headers = new HttpHeaders();
    const jwt = this.cookies.get(AUTH_COOKIE);
    if (jwt) {
      headers = headers.set('Authorization', `Bearer ${jwt}`);
    }
    if (quoteToken && body.calculatorQuoteId) {
      headers = headers.set(QUOTE_TOKEN_HEADER, quoteToken);
    }
    return this.http.post<IResponse>(`${this.url}threads`, body, { headers });
  }
}
