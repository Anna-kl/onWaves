import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, DestroyRef, Inject, Input, OnChanges, PLATFORM_ID } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, Subscription } from 'rxjs';
import { ReviewRewardWallet } from 'src/app/DTO/views/promo/review-rewards';
import { formatRub } from 'src/helpers/common/welcome-coupon';
import { ReviewRewardsService } from 'src/services/review-rewards.service';

@Component({
  selector: 'app-review-coupon-wallet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review-coupon-wallet.component.html',
  styleUrls: ['./review-coupon-wallet.component.scss'],
})
export class ReviewCouponWalletComponent implements OnChanges {
  @Input() profileId?: string | null;
  wallet: ReviewRewardWallet | null = null;
  loading = false;
  failed = false;
  readonly money = formatRub;
  private request?: Subscription;

  constructor(
    private api: ReviewRewardsService,
    private destroyRef: DestroyRef,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  ngOnChanges(): void {
    this.reload();
  }

  reload(): void {
    if (!this.profileId || !isPlatformBrowser(this.platformId)) return;
    this.request?.unsubscribe();
    this.loading = true;
    this.failed = false;
    this.wallet = null;
    this.request = this.api.mine().pipe(
      takeUntilDestroyed(this.destroyRef),
      finalize(() => this.loading = false),
    ).subscribe({
      next: wallet => this.wallet = wallet,
      error: () => this.failed = true,
    });
  }
}
