import '@angular/compiler';
import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CalculatorPlayerComponent } from '../../src/app/profile-ba/components/calculator-player/calculator-player.component';
import { CalculatorService } from '../../src/services/calculator.service';
import { AnalyticsService } from '../../src/services/analytics.service';
import { ICalculatorConnection } from '../../src/app/DTO/views/calculator/ICalculator';

@Component({
  selector: 'app-root',
  template: `<main><p>Локальный стенд · тестовые ставки 100 ₽ за единицу</p>
    <app-calculator-player
      [connection]="connection"
      [profileId]="'14d9565a-6f4c-424e-b680-a50d8b47d369'"
      [masterName]="'Алексей'"
      [masterMaxUrl]="'https://max.ru/u/demo'">
    </app-calculator-player></main>`,
  styles: ['main { max-width: 900px; margin: 24px auto; padding: 0 12px; }']
})
class PreviewComponent {
  connection: ICalculatorConnection | null = null;
  constructor(api: CalculatorService) {
    api.getByProfile('14d9565a-6f4c-424e-b680-a50d8b47d369').subscribe(items => this.connection = items[0]);
  }
}

@NgModule({
  declarations: [PreviewComponent, CalculatorPlayerComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [
    { provide: AnalyticsService, useValue: { trackEvent: () => undefined } },
    { provide: CalculatorService, deps: [HttpClient], useFactory: (http: HttpClient) => {
      const api = new CalculatorService(http);
      Object.assign(api, { url: '/v1/api/calculators/' });
      return api;
    } }
  ],
  bootstrap: [PreviewComponent]
})
class PreviewModule {}

platformBrowserDynamic().bootstrapModule(PreviewModule).catch(error => console.error(error));
