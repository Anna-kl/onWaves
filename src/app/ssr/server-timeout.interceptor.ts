import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, timeout } from 'rxjs';

/**
 * SSR-only: у Angular Universal нет встроенного тайм-аута на HTTP, а рендер ждёт
 * стабилизации zone (завершения всех XHR). Один зависший/медленный апстрим-запрос
 * подвесил бы весь серверный рендер до бесконечности. Здесь ограничиваем время
 * серверного запроса — по истечении он завершается ошибкой (как обычный сбой сети),
 * приложение рендерит оболочку, а данные догрузятся на клиенте после гидрации.
 *
 * Регистрируется ТОЛЬКО в AppServerModule, поэтому поведение в браузере не меняется.
 */
@Injectable()
export class ServerTimeoutInterceptor implements HttpInterceptor {
  /** Максимум ожидания ответа при SSR. Рядом с API запросы укладываются в доли секунды. */
  private static readonly SSR_HTTP_TIMEOUT_MS = 5000;

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      timeout(ServerTimeoutInterceptor.SSR_HTTP_TIMEOUT_MS),
    );
  }
}
