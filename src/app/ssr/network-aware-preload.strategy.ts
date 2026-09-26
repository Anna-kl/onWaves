import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PreloadingStrategy, Route } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { EMPTY, Observable } from 'rxjs';

/**
 * Предзагрузка ленивых чанков с оглядкой на SSR и на то, кто пришёл.
 *
 * PreloadAllModules здесь не годится по двум причинам:
 *
 * 1. На сервере предзагрузка бессмысленна и вредна: серверный бандл и так
 *    содержит все модули, а обращение к стратегии во время рендера удлиняет
 *    ожидание стабилизации zone — то есть прямо увеличивает TTFB.
 * 2. Рекламный трафик — это анонимный заход на профиль с мобильного. Тянуть ему
 *    в фоне кабинет мастера значит отбирать полосу у картинок профиля ровно
 *    тогда, когда он их ждёт.
 *
 * Поэтому греем только то, что помечено `data.preload`, только в браузере,
 * только авторизованному пользователю и только на приличном соединении.
 */
@Injectable({ providedIn: 'root' })
export class NetworkAwarePreloadStrategy implements PreloadingStrategy {
  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: object,
    private readonly cookieService: CookieService,
  ) {}

  preload(route: Route, load: () => Observable<unknown>): Observable<unknown> {
    if (!route.data?.['preload']) {
      return EMPTY;
    }
    if (!isPlatformBrowser(this.platformId)) {
      return EMPTY;
    }
    if (!this.cookieService.check('auth-token-ocpio')) {
      return EMPTY;
    }
    if (this.isConstrainedConnection()) {
      return EMPTY;
    }
    return load();
  }

  /** Network Information API есть не везде — при его отсутствии считаем связь нормальной. */
  private isConstrainedConnection(): boolean {
    const connection = (navigator as unknown as {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;

    if (!connection) {
      return false;
    }
    if (connection.saveData) {
      return true;
    }
    return connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g';
  }
}
