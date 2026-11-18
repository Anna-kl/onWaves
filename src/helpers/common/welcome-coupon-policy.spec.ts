import { welcomeHasOffer, welcomeOfferLine, welcomeReasonText, welcomeTierList } from './welcome-coupon';
import { WelcomeCampaign } from '../../app/DTO/views/promo/welcome-coupon';

describe('Индивидуальные условия приветственного купона', () => {
  const campaign: WelcomeCampaign = {
    code: 'individual', title: 'Купон мастера', startsAt: '2026-11-01T00:00:00Z', endsAt: '2026-12-01T00:00:00Z',
    tiers: [], currency: 'RUB', policyId: 'policy', amountMode: 'fixed', fixedDiscountRub: 500,
    eligibilityMode: 1, serviceScope: 1, minEligibleAmountRub: 2500,
    offerText: 'До 500 ₽ на первую запись к этому мастеру через OnWaves при сумме выбранных услуг от 2 500 ₽.',
  };
  it('показывает полученные условия и сохраняет пустую историческую сетку', () => {
    expect(welcomeHasOffer(campaign)).toBeTrue();
    expect(welcomeOfferLine(campaign)).toBe(campaign.offerText!);
    expect(welcomeTierList(campaign)).toEqual([]);
  });
  for (const reason of ['quantity_exhausted', 'policy_paused', 'not_first_master_visit', 'not_first_platform_visit', 'price_requires_confirmation']) {
    it(`объясняет отказ ${reason}`, () => {
      expect(welcomeReasonText(reason)).toBeTruthy();
      expect(welcomeReasonText(reason)).not.toBe(welcomeReasonText('unknown'));
    });
  }
});
