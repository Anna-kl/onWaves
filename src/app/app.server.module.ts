import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { ServerTimeoutInterceptor } from './ssr/server-timeout.interceptor';
import { SsrHttpLoggerInterceptor } from './ssr/ssr-http-logger.interceptor';
import { ServerBaseUrlInterceptor } from './ssr/server-base-url.interceptor';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  providers: [
    // Дописываем абсолютный origin к относительным URL (иначе /assets/*.json падает на сервере).
    { provide: HTTP_INTERCEPTORS, useClass: ServerBaseUrlInterceptor, multi: true },
    // ВРЕМЕННО: лог всех SSR HTTP-запросов, чтобы найти зависающий/падающий URL.
    { provide: HTTP_INTERCEPTORS, useClass: SsrHttpLoggerInterceptor, multi: true },
    // Не даём одному зависшему апстрим-запросу подвесить весь SSR-рендер.
    { provide: HTTP_INTERCEPTORS, useClass: ServerTimeoutInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
