import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnChanges, OnDestroy, Output, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { IViewBusinessProfile } from '../../../DTO/views/business/IViewBussinessProfile';
import { WelcomeCampaign, WelcomeOffer } from '../../../DTO/views/promo/welcome-coupon';
import { WelcomeCouponService } from '../../../../services/welcome-coupon.service';
import { formatRub, welcomeDeadlineText, welcomeHasOffer, welcomeIsFixed, welcomeTierList } from '../../../../helpers/common/welcome-coupon';

@Component({
  selector: 'app-welcome-offer-banner',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './welcome-offer-banner.component.html',
  styleUrls: ['./welcome-offer-banner.component.scss'],
})
export class WelcomeOfferBannerComponent implements OnChanges, OnDestroy {
  @Input() profile: IViewBusinessProfile | null = null;
  @Output() choose = new EventEmitter<void>();
  offer: WelcomeOffer | null = null;
  private request?: Subscription;
  readonly formatRub = formatRub;
  readonly tierList = welcomeTierList;
  readonly deadlineText = welcomeDeadlineText;

  constructor(private coupons: WelcomeCouponService, @Inject(PLATFORM_ID) private platformId: object) {}

  get campaign(): WelcomeCampaign | null {
    return this.offer?.active && this.offer.masterParticipates && welcomeHasOffer(this.offer.campaign)
      ? this.offer.campaign : null;
  }

  get maximumDiscount(): string {
    const campaign = this.campaign;
    const discounts = welcomeIsFixed(campaign)
      ? [campaign!.fixedDiscountRub!] : welcomeTierList(campaign).map(tier => tier.discount);
    return discounts.length ? formatRub(Math.max(...discounts)) : '';
  }

  ngOnChanges(): void {
    this.request?.unsubscribe();
    this.offer = null;
    if (!isPlatformBrowser(this.platformId) || !this.profile?.id || !this.profile.isGetOrder
        || this.profile.isPromo) return;
    // Условия акции публичны. Личный статус купона не должен скрывать их от мастера.
    // Не переносим этот запрос в SSR: доступность кампании не должна попадать в HTML-кеш.
    this.request = this.coupons.getOffer(this.profile.id).pipe(take(1)).subscribe(offer => {
      this.offer = offer;
      if (this.campaign) this.coupons.track('shown', this.campaign.code);
    });
  }

  book(): void {
    if (!this.campaign) return;
    this.coupons.track('clicked', this.campaign.code);
    this.choose.emit();
  }

  ngOnDestroy(): void {
    this.request?.unsubscribe();
  }
}
