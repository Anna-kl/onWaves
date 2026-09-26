import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare global {
  interface Window {
    ym?: (...args: any[]) => void;
    _tmr?: { push: (payload: Record<string, unknown>) => void };
  }
}

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private yandexId = 102514111;
  private mailRuId = '3792159';
  /** Ключ последнего отправленного хита — защита от подряд идущих дублей
   *  (initial-хит + NavigationEnd, повторные эмиты подписок и т.п.). */
  private lastHit = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  /**
   * Отправляет просмотр страницы в Яндекс.Метрику и Top.Mail.Ru (VK Ads).
   * ВАЖНО: title передаём явно — для SPA заголовок выставляется JS-ом
   * асинхронно, и без явной передачи Метрика запишет стухший document.title.
   * Счётчики инициализируются без авто-хита (index.html), поэтому все просмотры
   * идут только отсюда — двойного счёта с init нет.
   */
  public trackPage(path: string, title?: string) {
    if (!isPlatformBrowser(this.platformId)) return;

    const key = `${path}|${title ?? ''}`;
    if (key === this.lastHit) return;
    this.lastHit = key;

    if (window.ym) {
      if (title) {
        window.ym(this.yandexId, 'hit', path, { title });
      } else {
        window.ym(this.yandexId, 'hit', path);
      }
    }

    if (window._tmr) {
      window._tmr.push({ id: this.mailRuId, type: 'pageView', start: Date.now() });
    }
  }

  public trackEvent(category: string, action: string, label?: string, value?: number) {
    if (!isPlatformBrowser(this.platformId)) return;
    if (window.ym) {
      window.ym(this.yandexId, 'reachGoal', action, { category, label, value });
    }
    if (window._tmr) {
      const payload: Record<string, unknown> = {
        id: this.mailRuId,
        type: 'reachGoal',
        goal: action,
      };
      if (value != null) {
        payload['value'] = value;
      }
      window._tmr.push(payload);
    }
  }
}
