import { ruPhoneOrNull } from './phone';

describe('ruPhoneOrNull', () => {
  it('treats an empty field and a bare country code as no phone', () => {
    expect(ruPhoneOrNull(null)).toBeNull();
    expect(ruPhoneOrNull('')).toBeNull();
    expect(ruPhoneOrNull('+7')).toBeNull();
    expect(ruPhoneOrNull('7')).toBeNull();
    expect(ruPhoneOrNull('8')).toBeNull();
  });

  it('keeps a full Russian number and drops a partial one', () => {
    expect(ruPhoneOrNull('+7 (900) 123-45-67')).toBe('79001234567');
    expect(ruPhoneOrNull('89001234567')).toBe('79001234567');
    expect(ruPhoneOrNull('9001234567')).toBe('79001234567');
    expect(ruPhoneOrNull('7900')).toBeNull();
  });
});
