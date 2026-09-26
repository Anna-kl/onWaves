import { LandingOfferType } from '../../DTO/enums/landingOfferType';
import { LandingTemplateType } from '../../DTO/enums/landingTemplateType';
import { ILandingOffer } from '../../DTO/views/landing/ILandingOffer';
import { IViewLanding } from '../../DTO/views/landing/IViewLanding';
import {
  LandingLoadResult,
  resolveLandingState,
  showCellingsFallback,
} from './landing-state';

function offer(partial: Partial<ILandingOffer> = {}): ILandingOffer {
  return {
    offerType: LandingOfferType.Discount,
    title: 'Скидка',
    description: '',
    buttonText: 'Записаться',
    isActive: true,
    sortOrder: 0,
    benefits: [],
    ...partial,
  };
}

function landing(partial: Partial<IViewLanding> = {}): IViewLanding {
  return {
    templateType: LandingTemplateType.Classic,
    isActive: true,
    offers: [offer()],
    ...partial,
  };
}

function ok(data: IViewLanding | null): LandingLoadResult {
  return { ok: true, landing: data };
}

describe('resolveLandingState', () => {
  const now = new Date('2026-09-13T12:00:00Z');

  it('failed when envelope is not ok', () => {
    expect(resolveLandingState({ ok: false, landing: null, message: 'column missing' }))
      .toBe('failed');
  });

  it('absent when code 200 and data is null', () => {
    expect(resolveLandingState(ok(null))).toBe('absent');
  });

  it('absent when landing is inactive', () => {
    expect(resolveLandingState(ok(landing({ isActive: false })))).toBe('absent');
  });

  it('ready when landing is active and has a public offer', () => {
    expect(resolveLandingState(ok(landing()), { now })).toBe('ready');
  });

  it('absent when offers are outside validFrom/validTo', () => {
    const expired = landing({
      offers: [offer({ validFrom: '2026-01-01T00:00:00Z', validTo: '2026-01-31T00:00:00Z' })],
    });
    const scheduled = landing({
      offers: [offer({ validFrom: '2026-12-01T00:00:00Z', validTo: '2026-12-31T00:00:00Z' })],
    });
    expect(resolveLandingState(ok(expired), { now })).toBe('absent');
    expect(resolveLandingState(ok(scheduled), { now })).toBe('absent');
  });
});

describe('showCellingsFallback', () => {
  it('never mounts the legacy form — first screen is landing-section', () => {
    expect(showCellingsFallback(true, 'failed')).toBe(false);
    expect(showCellingsFallback(true, 'loading')).toBe(false);
    expect(showCellingsFallback(true, 'ready')).toBe(false);
    expect(showCellingsFallback(true, 'absent')).toBe(false);
    expect(showCellingsFallback(false, 'absent')).toBe(false);
  });
});
