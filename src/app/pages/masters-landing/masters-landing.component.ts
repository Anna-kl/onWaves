import { AfterViewInit, Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { take } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { ProfileService } from '../../../services/profile.service';
import { AnalyticsService } from '../../../services/analytics.service';
import { selectProfileMainClient } from '../../ngrx-store/mainClient/store.select';

/**
 * Маркетинговая страница /masters: страница и неделя рекламы для мастеров.
 * Вёрстка статична и отдаётся SSR; визиты и клики — только в браузере.
 */
@Component({
  selector: 'app-masters-landing',
  templateUrl: './masters-landing.component.html',
  styleUrls: ['./masters-landing.component.scss'],
})
export class MastersLandingComponent implements OnInit, AfterViewInit {
  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: Object,
    private readonly profileService: ProfileService,
    private readonly analytics: AnalyticsService,
    private readonly store: Store,
  ) {}

  /** Личный Telegram и MAX основательницы — единственный способ подать заявку. */
  public readonly telegramUrl = 'https://t.me/ANUTTA_K';
  public readonly maxUrl = 'https://max.ru/u/f9LHodD0cOIAS7JFuf5nfiFvyvNq7d181qWuJ2w9neyiyv8m4oHbvAmnlsQ';

  /** Живой пример оформленной страницы мастера. */
  public readonly examplePageUrl = 'https://onwaves.online/cellings';

  /**
   * Срок и организатор видны в блоке «Условия акции»: без них оффер со скидкой
   * публиковать нельзя. Форму ИП или самозанятости не домысливаем — в политике
   * ПДн указано имя оператора.
   */
  public readonly promoUntil = '31 октября 2026 года';
  public readonly promoOrganizer = 'Климова Анна Геннадиевна';

  @ViewChild('contact') private readonly contactSection?: ElementRef<HTMLElement>;

  ngOnInit(): void {
    this.trackLandingEvent('masters_page_visit');
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (window.location.hash === '#contact') {
      setTimeout(() => this.scrollToContact(), 0);
    }
  }

  /**
   * Клик по кнопке мессенджера: ссылка открывается как обычно.
   * Kafka — оповещение основательнице, reachGoal — сравнение кликов в Метрике.
   */
  public trackMessenger(channel: 'telegram' | 'max'): void {
    this.trackLandingEvent(
      channel === 'telegram' ? 'masters_click_telegram' : 'masters_click_max',
    );
    this.analytics.trackEvent(
      'masters',
      channel === 'telegram' ? 'masters_cta_tg' : 'masters_cta_max',
    );
  }

  /**
   * Основная кнопка ведёт к мессенджерам. Цель не шлётся при открытии #contact:
   * прокрутка по хешу и клик — разные действия.
   */
  public onMainCta(event: Event): void {
    event.preventDefault();
    this.analytics.trackEvent('masters', 'masters_cta_main');
    this.scrollToContact();
  }

  /**
   * На сервере scrollIntoView недоступен, поэтому прокрутка только в браузере.
   * Без JS срабатывает href="#contact" у самой ссылки.
   */
  public scrollToContact(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.contactSection?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  private trackLandingEvent(option: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.store.pipe(select(selectProfileMainClient), take(1)).subscribe(user => {
      this.profileService
        .sendLandingEvent('masters', option, user?.id ?? null)
        .pipe(take(1))
        .subscribe({ error: () => {} });
    });
  }
}
