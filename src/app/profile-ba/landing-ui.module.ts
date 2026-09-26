import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonComponentsModule } from '../common/common.module';
import { LandingOfferCardComponent } from './components/landing-offer-card/landing-offer-card.component';
import { LandingSectionComponent } from './components/landing-section/landing-section.component';
import { CalculatorPlayerComponent } from './components/calculator-player/calculator-player.component';

/** Карточка акции: публичный профиль и превью «как видит клиент». Без роутов. */
@NgModule({
  declarations: [LandingOfferCardComponent, LandingSectionComponent, CalculatorPlayerComponent],
  imports: [CommonModule, FormsModule, CommonComponentsModule],
  exports: [LandingOfferCardComponent, LandingSectionComponent, CalculatorPlayerComponent],
})
export class LandingUiModule {}
