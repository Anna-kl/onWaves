// src/app/services/analytics.service.ts
import { Injectable } from '@angular/core';

declare global {
  interface Window {
    ym?: (...args: any[]) => void;
    gtag?: (...args: any[]) => void;
  }
}

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private yandexId = 102514111;        // число
  private gaId = 'G-B8XGTEBVBS';        // строка

  constructor() {}

  /** Отправить pageview в оба сервиса */
  public trackPage(path: string) {
    // Yandex
    if (window.ym) {
      window.ym(this.yandexId, 'hit', path);
    }
    // Google Analytics
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: path,
        send_to: this.gaId
      });
    }
  }

  /** Общий метод для произвольных событий */
  public trackEvent(category: string, action: string, label?: string, value?: number) {
    // Yandex: reachGoal
    if (window.ym) {
      window.ym(this.yandexId, 'reachGoal', action, { category, label, value });
    }
    // Google: событие
    if (window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value
      });
    }
  }
}