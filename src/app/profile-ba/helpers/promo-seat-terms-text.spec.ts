import { PromoSeatState } from '../../DTO/views/promo/promo-seats';
import { promoMoscowDate, promoPeriodText, promoStatusNotice } from './promo-seat-terms-text';

describe('Shared seat promotion terms', () => {
  const state = {
    startsAt: '2026-11-09T21:00:00Z', endsAt: '2026-12-15T20:59:59.999Z',
    visitDeadline: '2026-12-15T00:00:00Z', status: 'closed', closedReason: 'disabled',
  } as PromoSeatState;
  it('uses Moscow midnight without adding a second year suffix', () => {
    expect(promoMoscowDate(state.startsAt)).toBe('10 ноября 2026');
    expect(promoMoscowDate('2026-11-09T20:59:59Z')).toBe('9 ноября 2026');
    expect(promoMoscowDate('invalid')).toBe('');
  });
  it('keeps the complete period identical in both presentations', () => {
    expect(promoPeriodText(state)).toBe('Записаться по акции можно с 10 ноября по 15 декабря 2026 года включительно или пока не закончатся места. Визит по акционной записи — не позже 15 декабря 2026 года.');
    expect(promoPeriodText({ ...state, startsAt: '2025-12-31T21:00:00Z', endsAt: '2027-01-02T20:59:59Z' })).toContain('с 1 января 2026 года по 2 января 2027 года');
  });
  it('displays the last bookable day when the exclusive limit is midnight in Moscow', () => {
    expect(promoPeriodText({
      ...state, startsAt: '2026-11-18T21:00:00Z', endsAt: '2026-12-10T21:00:00Z', visitDeadline: '2027-01-10T00:00:00Z',
    })).toContain('с 19 ноября по 10 декабря 2026 года включительно');
  });
  it('distinguishes disabled, scheduled and open without changing server state', () => {
    expect(promoStatusNotice(state)).toBe('Акция пока не включена. Запись по её условиям недоступна.');
    expect(promoStatusNotice({ ...state, closedReason: 'not_started' })).toBe('Акция начнётся 10 ноября 2026 года.');
    expect(promoStatusNotice({ ...state, status: 'open', closedReason: null })).toBeNull();
    expect(state.closedReason).toBe('disabled');
  });
});
