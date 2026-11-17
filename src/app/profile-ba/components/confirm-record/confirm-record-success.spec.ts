import { registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';
import { convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { ConfirmRecordComponent } from './confirm-record.component';

describe('Детали финала сохраняются до очистки черновика', () => {
  let component: any;
  let modal: any;
  beforeEach(() => {
    registerLocaleData(ru);
    modal = { componentInstance: {}, result: new Promise(() => {}) };
    component = Object.create(ConfirmRecordComponent.prototype);
    Object.assign(component, {
      chooseServices: [{ id: 'service', name: 'Услуга', price: { price: 2000 } }],
      businessProfile: { id: 'master', name: 'Мастер', link: 'mary', address: { city: 'Запасной адрес' } },
      dayChoose: new Date(2026, 10, 5, 8, 30), masterWorkLocations: [], profile: { id: 'client' },
      welcomeQuote: null, promoQuote: null, applyWelcome: false,
      activatedRoute: { snapshot: { queryParamMap: convertToParamMap({ serviceId: 'service' }) } },
      _welcome: { invalidateMine: () => {}, track: () => {} },
      _analytics: { trackBooking: () => {} }, modalService: { open: () => modal },
    });
    component.resetStateAfterRecordCreated = () => { component.chooseServices = []; component.dayChoose = null; component.businessProfile = null; };
  });
  for (const code of [201, 202]) {
    it(`передаёт время и место в успешное окно при code ${code}`, () => {
      component._api = { saveRecord: () => of({ code, data: {} }) };
      component.submitRecord('master', { location: { locationType: 0, city: 'Озёры', street: 'Болотный переулок', house: '2' } });
      expect(component.chooseServices).toEqual([]);
      expect(modal.componentInstance.successDetails.services).toBe('Услуга');
      expect(modal.componentInstance.successDetails.when).toContain('08:30');
      expect(modal.componentInstance.successDetails.place).toContain('Болотный переулок');
      expect(modal.componentInstance.successDetails.place).not.toContain('Запасной адрес');
    });
  }
  it('передаёт те же детали в гостевое окно', () => {
    component.openBookingContactModal('master', { location: { locationType: 1, city: 'Кашира', street: 'Садовая', house: '5' } });
    expect(modal.componentInstance.successDetails.when).toContain('08:30');
    expect(modal.componentInstance.successDetails.place).toContain('Садовая');
  });
});
