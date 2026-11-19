import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject, of } from 'rxjs';
import { WelcomeOfferBannerComponent } from './welcome-offer-banner.component';
import { WelcomeCouponService } from '../../../../services/welcome-coupon.service';
import { WelcomeOffer } from '../../../DTO/views/promo/welcome-coupon';

describe('Public welcome campaign', () => {
  let fixture: ComponentFixture<WelcomeOfferBannerComponent>;
  let service: { getOffer: jasmine.Spy; getMine: jasmine.Spy; track: jasmine.Spy; isLoggedIn: boolean };
  const profile = { id: 'studio', link: 'soblazn_ozery', name: 'Студия красоты «Соблазн»', isGetOrder: true, isPromo: false };
  const offer: WelcomeOffer = {
    active: true, masterParticipates: true,
    campaign: { code: 'test', title: 'Купон', startsAt: '2026-11-01T00:00:00Z', endsAt: '2026-12-10T21:00:00Z', currency: 'RUB',
      tiers: [{ threshold: 2500, discount: 500, thresholdInclusive: false, text: '500 ₽ при сумме строго больше 2500 ₽' }],
      offerText: 'С другими акциями не суммируется.', eligibilityMode: 0 },
  };

  beforeEach(async () => {
    service = { getOffer: jasmine.createSpy().and.returnValue(of(offer)),
      getMine: jasmine.createSpy().and.returnValue(of({ status: 'none' })),
      track: jasmine.createSpy(), isLoggedIn: false };
    await TestBed.configureTestingModule({
      imports: [WelcomeOfferBannerComponent, RouterTestingModule],
      providers: [{ provide: WelcomeCouponService, useValue: service }],
    }).compileComponents();
    fixture = TestBed.createComponent(WelcomeOfferBannerComponent);
  });

  function load(value = profile): void {
    fixture.componentRef.setInput('profile', value);
    fixture.detectChanges();
  }

  it('shows the public offer to a signed-in master even without a personal coupon', () => {
    service.isLoggedIn = true;
    load();
    expect(fixture.nativeElement.querySelector('h2').textContent).toContain('500');
    expect(service.getMine).not.toHaveBeenCalled();
    expect(fixture.nativeElement.textContent).not.toContain('Ваш купон');
  });

  it('shows guest conditions and emits service selection without claiming a coupon', () => {
    load();
    const choose = spyOn(fixture.componentInstance.choose, 'emit');
    fixture.nativeElement.querySelector('button').click();
    expect(choose).toHaveBeenCalledTimes(1);
    expect(service.track).toHaveBeenCalledWith('clicked', 'test');
    expect(fixture.nativeElement.textContent).toContain('Больше');
    expect(fixture.nativeElement.textContent).toContain('С другими акциями не суммируется.');
  });

  it('does not advertise an inactive campaign', () => {
    service.getOffer.and.returnValue(of({ ...offer, active: false }));
    load();
    expect(fixture.nativeElement.querySelector('section')).toBeNull();
  });

  it('does not add a header to Mary or a demo profile', () => {
    load({ ...profile, link: 'mary' });
    expect(fixture.nativeElement.querySelector('section')).toBeNull();
    load({ ...profile, isPromo: true });
    expect(service.getOffer).not.toHaveBeenCalled();
  });

  it('removes the offer when bookings are closed and ignores the previous request', () => {
    const response = new Subject<WelcomeOffer>();
    service.getOffer.and.returnValue(response);
    load();
    load({ ...profile, isGetOrder: false });
    response.next(offer);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('section')).toBeNull();
  });
});
