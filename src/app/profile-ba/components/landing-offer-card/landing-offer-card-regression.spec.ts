import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AnalyticsService } from 'src/services/analytics.service';
import { LandingTemplateType } from '../../../DTO/enums/landingTemplateType';
import { LandingOfferCardComponent } from './landing-offer-card.component';

describe('Shared offer card regression', () => {
  for (const templateType of [LandingTemplateType.Classic, LandingTemplateType.Premium]) {
    it(`keeps the existing price, proposal and booking service for template ${templateType}`, async () => {
      await TestBed.configureTestingModule({
        imports: [CommonModule, RouterTestingModule], declarations: [LandingOfferCardComponent],
        providers: [{ provide: AnalyticsService, useValue: {} }, { provide: NgbModal, useValue: {} }],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
      const fixture = TestBed.createComponent(LandingOfferCardComponent);
      const card = fixture.componentInstance;
      const action = { kind: 0, role: 0, text: 'Записаться', serviceId: 'existing-master-service' };
      card.offer = { title: 'Уход другого мастера', description: '', buttonText: '', offerType: 1,
        isActive: true, sortOrder: 0, benefits: [], actions: [action], templateType,
        proposals: [{ text: 'Существующий купон', tone: 'coupon' }] };
      card.priceText = '2 000 ₽';
      const emitted: unknown[] = []; card.actionClick.subscribe(value => emitted.push(value));
      fixture.detectChanges();
      const element: HTMLElement = fixture.nativeElement;
      expect(element.textContent).toContain('Уход другого мастера');
      expect(element.textContent).toContain('2 000 ₽');
      expect(element.querySelector('.offer__proposal--coupon')?.textContent).toContain('Существующий купон');
      expect(element.querySelector('.offer__service-options')).toBeNull();
      element.querySelector<HTMLButtonElement>('.offer__actions button')!.click();
      expect(emitted).toEqual([jasmine.objectContaining(action)]);
    });
  }
});
