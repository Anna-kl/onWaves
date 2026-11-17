import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PersonalPageUserComponent } from './personal-page-user/personal-page-user.component';
import { GiveawayPrizesComponent } from '../giveaways/giveaway-prizes.component';
import { GiveawayMyEntriesComponent } from '../giveaways/giveaway-my-entries.component';
import { ReviewCouponWalletComponent } from './components/review-coupon-wallet/review-coupon-wallet.component';
import { CommonComponentsModule } from '../common/common.module';
import { UIModule } from '../ui/ui.module';

/** Ленивый чанк `/page-user/:id` — личная страница пользователя. */
@NgModule({
  declarations: [PersonalPageUserComponent],
  imports: [
    CommonModule,
    FormsModule,
    CommonComponentsModule,
    UIModule,
    GiveawayPrizesComponent,
    GiveawayMyEntriesComponent,
    ReviewCouponWalletComponent,
    RouterModule.forChild([{ path: ':id', component: PersonalPageUserComponent }]),
  ],
})
export class PersonalPageModule {}
