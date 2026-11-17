import { isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, Injector, PLATFORM_ID } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { environment } from '../../enviroments/environment';
import { RememberedSessionService } from './remembered-session.service';

@Injectable()
export class SessionRenewalInterceptor implements HttpInterceptor {
  constructor(private readonly injector: Injector, @Inject(PLATFORM_ID) private readonly platformId: string) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const bearer = request.headers.get('Authorization');
    // Bearer по-прежнему задаёт HTTP-сервис. Гостей, SSR, другие API и вход не трогаем.
    if (!isPlatformBrowser(this.platformId) || !request.url.startsWith(environment.Uri)
      || request.url.startsWith(environment.Uri + 'auths/') || !bearer?.startsWith('Bearer ')) {
      return next.handle(request);
    }
    const session = this.injector.get(RememberedSessionService);
    const cookies = this.injector.get(CookieService);
    const current = cookies.get('auth-token-ocpio');
    const original = bearer.substring(7);
    if (!session.sameSession(original, current)) return next.handle(request);
    const sendRenewed = () => {
      const renewed = cookies.get('auth-token-ocpio');
      if (!session.sameSession(original, renewed)) {
        return throwError(() => new HttpErrorResponse({ status: 401, statusText: 'Сессия изменилась' }));
      }
      return next.handle(request.clone({ setHeaders: { Authorization: 'Bearer ' + renewed } }));
    };
    // Часть старых контроллеров отвечает HTTP 200 с бизнес-кодом вместо HTTP 401.
    // Просроченный JWT обновляем до запроса, чтобы эти методы тоже продолжали работать.
    if (session.expiresSoon(current)) {
      return session.renew().pipe(switchMap(sendRenewed));
    }
    const authenticated = request.clone({ setHeaders: { Authorization: 'Bearer ' + current } });
    return next.handle(authenticated).pipe(
      catchError(error => {
        if (!(error instanceof HttpErrorResponse) || error.status !== 401) return throwError(() => error);
        if (!session.sameSession(original, cookies.get('auth-token-ocpio'))) return throwError(() => error);
        return session.renew().pipe(switchMap(sendRenewed));
      }),
    );
  }
}
