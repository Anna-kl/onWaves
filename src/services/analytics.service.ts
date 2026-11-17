import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { UserType } from 'src/app/DTO/classes/profiles/profile-user.model';
import {
  TEST_LINK_KEY,
  clientGoalParams,
  isAnalyticsHost,
  isTestVisit,
  nextPageHit,
  queryHasTestFlag,
} from './analytics-hit';

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
  /** Последний отправленный адрес. Повтор с тем же URL (другой title) не шлём. */
  private hitState = { lastUrl: '' };
  private viewer: UserType | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  /**
   * Просмотр страницы. Счётчики инициализируются только на onwaves.online
   * (index.html), здесь вторая проверка: стейджинг и localhost молчат.
   * В hit уходит полный адрес с query и реферер: у первого хита внешний,
   * у следующих — предыдущая страница.
   */
  public trackPage(path: string, title?: string): void {
    if (!this.enabled()) {
      return;
    }
    const hit = nextPageHit(this.hitState, path, location.origin, document.referrer || '');
    if (!hit) {
      return;
    }
    const options: { title?: string; referer?: string } = {};
    if (title) {
      options.title = title;
    }
    if (hit.referrer) {
      options.referer = hit.referrer;
    }
    window.ym?.(this.yandexId, 'hit', hit.url, options);
    window._tmr?.push({
      id: this.mailRuId,
      type: 'pageView',
      url: hit.url,
      start: Date.now(),
    });
  }

  public trackEvent(category: string, action: string, label?: string, value?: number): void {
    const params: Record<string, string | number | boolean> = { category };
    if (label != null) {
      params['label'] = label;
    }
    if (value != null) {
      params['value'] = value;
    }
    this.reach(action, params, value);
  }

  /** Запись создана: add_record и общее обращение client_contact. */
  public trackBooking(master?: string | null, service?: string | null): void {
    const params = this.goal(master, service);
    this.reach('add_record', params);
    this.reach('client_contact', params);
  }

  /** Клик по телефону на странице мастера. */
  public trackCall(master?: string | null, service?: string | null): void {
    const params = this.goal(master, service);
    this.reach('click_call', params);
    this.reach('client_contact', params);
  }

  /** Переход в мессенджер мастера. */
  public trackMessenger(master?: string | null, service?: string | null): void {
    const params = this.goal(master, service);
    this.reach('click_message', params);
    this.reach('client_contact', params);
  }

  /**
   * «Записаться на замер». Идентификатор цели 637119503 — calculator_record.
   * Шлётся до записи в sessionStorage, чтобы сбой хранилища не съел цель.
   */
  public trackMeasurement(master?: string | null, service?: string | null): void {
    this.reach('calculator_record', this.goal(master, service));
  }

  /**
   * Розыгрыш: показ и клики. В параметры не попадают телефон, имя и токен.
   * Цель в кабинете Метрики этим вызовом не создаётся.
   */
  public trackGiveaway(action: string, params: { campaignCode?: string | null; placement?: string | null; phase?: string | null }): void {
    const payload: Record<string, string> = {};
    if (params.campaignCode) payload['campaignCode'] = params.campaignCode;
    if (params.placement) payload['placement'] = params.placement;
    if (params.phase) payload['phase'] = params.phase;
    this.reach(action, payload);
  }

  /** Клик «Условия акции» у цены или на шаге подтверждения. */
  public trackPromoTerms(master?: string | null): void {
    this.reach('promo_terms_open', this.goal(master, null));
  }

  /** Роль вошедшего: мастер и администратор — тестовый визит. */
  public setViewer(userType: UserType | null | undefined): void {
    this.viewer = userType ?? null;
  }

  /** Запомнить ?test=1. Саму метку из адреса не убираем — её должен увидеть первый хит. */
  public noteTestLink(url: string): void {
    if (!isPlatformBrowser(this.platformId) || !queryHasTestFlag(this.queryOf(url))) {
      return;
    }
    try {
      sessionStorage.setItem(TEST_LINK_KEY, '1');
    } catch {
      // Приватный режим: флаг останется в адресе, пока его не сменит переход.
    }
  }

  private goal(master?: string | null, service?: string | null): Record<string, string | boolean> {
    return clientGoalParams(master, service, this.testVisit());
  }

  private testVisit(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return isTestVisit(false, this.viewer);
    }
    let marked = queryHasTestFlag(location.search);
    if (!marked) {
      try {
        marked = sessionStorage.getItem(TEST_LINK_KEY) === '1';
      } catch {
        marked = false;
      }
    }
    return isTestVisit(marked, this.viewer);
  }

  private queryOf(url: string): string {
    const index = url.indexOf('?');
    return index >= 0 ? url.slice(index + 1) : '';
  }

  private enabled(): boolean {
    return isPlatformBrowser(this.platformId) && isAnalyticsHost(location.hostname);
  }

  private reach(action: string, params: Record<string, string | number | boolean>, value?: number): void {
    if (!this.enabled()) {
      return;
    }
    window.ym?.(this.yandexId, 'reachGoal', action, params);
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
