import { Subject, of, throwError } from 'rxjs';
import { CalculatorCtaKind } from '../../../DTO/enums/calculatorCtaKind';
import { CalculatorPlayerComponent } from './calculator-player.component';

describe('Необязательная заметка о купоне в калькуляторе', () => {
  it('при сбое скрывает обещание, сохраняет расчёт и запись; следующий запрос восстанавливается', () => {
    const component: any = Object.create(CalculatorPlayerComponent.prototype);
    const result = { ctaKind: CalculatorCtaKind.Record, measurementServiceId: 'measurement', total: 5000 };
    const offer = { active: true, masterParticipates: true, campaign: { code: 'welcome', tiers: [{ threshold: 2000, discount: 300 }] } };
    const quote = { couponStatus: 'login_required', potentialDiscount: 300 };
    const request = jasmine.createSpy('quote').and.returnValues(throwError(() => new Error('HTTP 500')), of(quote));
    Object.assign(component, {
      platformId: 'browser', profileId: 'master', viewingResult: true, state: { result },
      destroy$: new Subject<void>(), couponKey: '', couponOffer: offer, couponQuote: quote,
      coupons: { isLoggedIn: false, getOffer: () => of(offer), quote: request, track: jasmine.createSpy('track') },
    });
    component.refreshCouponNote();
    expect(component.couponNoteText).toBeNull();
    expect(component.result).toBe(result);
    expect(component.result.ctaKind).toBe(CalculatorCtaKind.Record);
    component.refreshCouponNote();
    expect(request).toHaveBeenCalledTimes(2);
    expect(component.couponNoteText).toContain('300');
    expect(component.result).toBe(result);
  });
});
