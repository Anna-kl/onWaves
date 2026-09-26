import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { WelcomeCampaign, WelcomeTier } from 'src/app/DTO/views/promo/welcome-coupon';
import { welcomeTierList } from 'src/helpers/common/welcome-coupon';
import { WelcomeCouponService } from 'src/services/welcome-coupon.service';

/**
 * Окно гостя на публичной странице мастера: выгода от первой записи через Onwaves.
 * Условия приходят с сервера (кампания); окно само ничего не считает.
 * Родитель решает, показывать ли его (гость, мастер участвует, запись открыта, один раз за посещение).
 */
@Component({
  selector: 'app-coupon-new-user',
  templateUrl: './coupon-new-user.component.html',
  styleUrls: ['./coupon-new-user.component.scss']
})
export class CouponNewUserComponent implements OnInit, OnDestroy {
  @Input() campaign: WelcomeCampaign | null = null;
  /** Пауза перед показом, мс: не перекрываем первый экран. */
  @Input() delay = 1500;

  /** Клик «Выбрать услугу»: родитель прокручивает к списку услуг. */
  @Output() choose = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  isVisible = false;
  private timer: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private coupons: WelcomeCouponService,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  get tiers(): WelcomeTier[] {
    return welcomeTierList(this.campaign);
  }

  ngOnInit(): void {
    // На сервере окно не рисуем: SSR и индексируемый HTML остаются прежними.
    if (!isPlatformBrowser(this.platformId) || !this.campaign?.tiers?.length) {
      return;
    }
    this.timer = setTimeout(() => {
      this.isVisible = true;
      this.coupons.track('shown', this.campaign?.code);
    }, this.delay);
  }

  ngOnDestroy(): void {
    if (this.timer) clearTimeout(this.timer);
  }

  pick(): void {
    this.coupons.track('clicked', this.campaign?.code);
    this.isVisible = false;
    this.choose.emit();
    this.closed.emit();
  }

  hide(): void {
    this.isVisible = false;
    this.closed.emit();
  }
}
