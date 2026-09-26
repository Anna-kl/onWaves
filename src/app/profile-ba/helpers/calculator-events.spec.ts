import { CALCULATOR_EVENTS_KEY, claimQuoteEvent } from './calculator-events';

describe('claimQuoteEvent', () => {
  beforeEach(() => localStorage.removeItem(CALCULATOR_EVENTS_KEY));

  it('lets each funnel event through once per quote', () => {
    expect(claimQuoteEvent('q1', 'start')).toBeTrue();
    expect(claimQuoteEvent('q1', 'start')).toBeFalse();
    expect(claimQuoteEvent('q1', 'complete')).toBeTrue();
    expect(claimQuoteEvent('q1', 'max')).toBeTrue();
    expect(claimQuoteEvent('q1', 'max')).toBeFalse();
  });

  it('counts a new quote (after "start over") separately', () => {
    expect(claimQuoteEvent('q1', 'start')).toBeTrue();
    expect(claimQuoteEvent('q2', 'start')).toBeTrue();
  });

  it('survives a reopened panel: the mark lives in localStorage', () => {
    claimQuoteEvent('q-stored', 'complete');
    const stored = JSON.parse(localStorage.getItem(CALCULATOR_EVENTS_KEY)!);
    expect(stored['q-stored']).toEqual(['complete']);
  });

  it('ignores a missing quote id', () => {
    expect(claimQuoteEvent(null, 'start')).toBeFalse();
    expect(claimQuoteEvent('', 'start')).toBeFalse();
  });

  it('keeps only the last 30 quotes', () => {
    for (let i = 0; i < 35; i++) {
      claimQuoteEvent(`trim-${i}`, 'start');
    }
    const stored = JSON.parse(localStorage.getItem(CALCULATOR_EVENTS_KEY)!);
    expect(Object.keys(stored).length).toBe(30);
    expect(stored['trim-0']).toBeUndefined();
    expect(stored['trim-34']).toEqual(['start']);
  });
});
