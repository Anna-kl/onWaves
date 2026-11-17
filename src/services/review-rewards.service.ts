import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ReviewRewardWallet, ReviewRewardsAdmin, ReviewRewardProgram, ReviewRewardsQuote } from 'src/app/DTO/views/promo/review-rewards';
import { environment } from 'src/enviroments/environment';

export interface ReviewRewardsSelection {
  clientId: string;
  serviceIds: string[];
  daysOfScheduleId?: string | null;
  rewardCouponIds: string[];
  useWelcomeCoupon: boolean;
  usePromoSeat: boolean;
  prizeAwardId: string | null;
}

@Injectable({ providedIn: 'root' })
export class ReviewRewardsService {
  private readonly url = environment.Uri + 'coupons/review-rewards/';

  constructor(private http: HttpClient, private cookies: CookieService) {}

  mine() {
    return this.http.get<ReviewRewardWallet>(this.url + 'me', this.auth());
  }

  quote(masterId: string, selection: ReviewRewardsSelection) {
    return this.http.post<{ reviewRewards: ReviewRewardsQuote }>(
      environment.Uri + 'records/' + masterId + '/discount-quote', selection, this.auth());
  }

  admin() {
    return this.http.get<ReviewRewardsAdmin>(this.url + 'admin', this.auth());
  }

  configure(enabled: boolean, startsAt: string, expectedVersion: number, reason: string) {
    return this.http.put<ReviewRewardProgram>(this.url + 'admin', { enabled, startsAt, expectedVersion, reason }, this.auth());
  }

  private auth() {
    const token = this.cookies.get('auth-token-ocpio');
    const headers = token ? new HttpHeaders({ Authorization: 'Bearer ' + token }) : new HttpHeaders();
    return { headers };
  }
}
