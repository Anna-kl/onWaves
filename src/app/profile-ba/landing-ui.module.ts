import { PromotionPublicationsComponent } from '../promotions/promotion-publications.component';
import { PromotionLegacyDirective } from '../promotions/promotion-legacy.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonComponentsModule } from '../common/common.module';
import { LandingOfferCardComponent } from './components/landing-offer-card/landing-offer-card.component';
import { LandingSectionComponent } from './components/landing-section/landing-section.component';
import { CalculatorPlayerComponent } from './components/calculator-player/calculator-player.component';
import { PromoMediaCarouselComponent } from './components/promo-media-carousel/promo-media-carousel.component';

/** Карточка акции: публичный профиль и превью «как видит клиент». Без роутов. */
@NgModule({
  declarations: [LandingOfferCardComponent, LandingSectionComponent, CalculatorPlayerComponent, PromoMediaCarouselComponent],
  imports: [PromotionPublicationsComponent, PromotionLegacyDirective,CommonModule, FormsModule, RouterModule, CommonComponentsModule],
  exports: [LandingOfferCardComponent, LandingSectionComponent, CalculatorPlayerComponent],
})
export class LandingUiModule {}
