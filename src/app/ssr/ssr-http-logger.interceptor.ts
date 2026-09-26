import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

/**
 * SSR-only ВРЕМЕННЫЙ логгер HTTP. Помогает найти запрос, который вешает серверный
 * рендер (стартовал, но не завершился) или падает с ошибкой. Для каждого запроса
 * печатает старт, а также завершение с длительностью и статусом.
 *
 * Запрос, у которого в логе есть «-> START», но нет «<- DONE/ERROR» за время
 * рендера, — и есть виновник зависания.
 *
 * Регистрируется ТОЛЬКО в AppServerModule. После диагностики удалить.
 */
@Injectable()
export class SsrHttpLoggerInterceptor implements HttpInterceptor {
  private seq = 0;

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const id = ++this.seq;
    const started = Date.now();
    // eslint-disable-next-line no-console
    console.log(`[SSR HTTP] #${id} -> START ${req.method} ${req.urlWithParams}`);

    let settled = false;

    return next.handle(req).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            settled = true;
            const ms = Date.now() - started;
            // eslint-disable-next-line no-console
            console.log(
              `[SSR HTTP] #${id} <- DONE ${event.status} ${req.method} ${req.urlWithParams} (${ms}ms)`,
            );
          }
        },
        error: (error) => {
          settled = true;
          const ms = Date.now() - started;
          // eslint-disable-next-line no-console
          console.error(
            `[SSR HTTP] #${id} <- ERROR ${error?.status ?? ''} ${req.method} ${req.urlWithParams} (${ms}ms)`,
            error?.message ?? error,
          );
        },
      }),
      finalize(() => {
        // Если стрим закрылся, но ни ответа, ни ошибки не было — запрос отменён/подвис.
        if (!settled) {
          const ms = Date.now() - started;
          // eslint-disable-next-line no-console
          console.warn(
            `[SSR HTTP] #${id} <- CANCELLED/UNSETTLED ${req.method} ${req.urlWithParams} (${ms}ms)`,
          );
        }
      }),
    );
  }
}
