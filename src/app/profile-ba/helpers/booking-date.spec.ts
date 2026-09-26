import {
  fromCalendarDateTime,
  toCalendarDate,
  toClockTime
} from './booking-date';

describe('booking calendar date', () => {
  it('round-trips a calendar day without UTC conversion', () => {
    const restored = fromCalendarDateTime('2026-07-25', '08:15');

    expect(restored).not.toBeNull();
    expect(toCalendarDate(restored!)).toBe('2026-07-25');
    expect(toClockTime(restored!)).toBe('08:15');
  });

  it('rejects normalized and invalid dates', () => {
    expect(fromCalendarDateTime('2026-02-30', '08:15')).toBeNull();
    expect(fromCalendarDateTime('2026-07-25', '25:00')).toBeNull();
  });
});
