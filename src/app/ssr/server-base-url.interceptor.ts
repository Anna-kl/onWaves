import { Inject, Injectable, Optional } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';
import { Observable } from 'rxjs';

/**
 * SSR-only: в браузере относительный URL (`/assets/category/category.json`)
 * резолвится от origin страницы, а на сервере у HttpClient origin'а нет —
 * запрос падает мгновенным NetworkError. Здесь дописываем абсолютный origin
 * входящего запроса к относительным URL, чтобы серверный рендер мог забрать
 * статику/ассеты с того же Express-сервера.
 *
 * Регистрируется ТОЛЬКО в AppServerModule, поэтому поведение в браузере не меняется.
 */
@Injectable()
export class ServerBaseUrlInterceptor implements HttpInterceptor {
  constructor(@Optional() @Inject(REQUEST) private request: Request | null) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Абсолютные URL (http/https) и protocol-relative (//host) не трогаем.
    const isRelative = req.url.startsWith('/') && !req.url.startsWith('//');

    if (isRelative && this.request) {
      const host = this.request.get('host');
      const protocol = this.request.protocol || 'http';
      if (host) {
        req = req.clone({ url: `${protocol}://${host}${req.url}` });
      }
    }

    return next.handle(req);
  }
}
