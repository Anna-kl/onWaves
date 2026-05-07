import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare global {
  interface Window {
    ym?: (...args: any[]) => void;
  }
}

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private yandexId = 102514111;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  public trackPage(path: string) {
    if (!isPlatformBrowser(this.platformId)) return;
    if (window.ym) {
      window.ym(this.yandexId, 'hit', path);
    }
  }

  public trackEvent(category: string, action: string, label?: string, value?: number) {
    if (!isPlatformBrowser(this.platformId)) return;
    if (window.ym) {
      window.ym(this.yandexId, 'reachGoal', action, { category, label, value });
    }
  }
}