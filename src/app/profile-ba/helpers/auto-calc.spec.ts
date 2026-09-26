import { wantsAutoCalculator } from './auto-calc';

describe('wantsAutoCalculator', () => {
  it('открывает расчёт на явных значениях из рекламной ссылки', () => {
    expect(wantsAutoCalculator('1')).toBeTrue();
    expect(wantsAutoCalculator('true')).toBeTrue();
    expect(wantsAutoCalculator('TRUE')).toBeTrue();
    expect(wantsAutoCalculator(' yes ')).toBeTrue();
    expect(wantsAutoCalculator('open')).toBeTrue();
  });

  it('не открывает расчёт без параметра и на пустом значении', () => {
    expect(wantsAutoCalculator(null)).toBeFalse();
    expect(wantsAutoCalculator(undefined)).toBeFalse();
    expect(wantsAutoCalculator('')).toBeFalse();
    expect(wantsAutoCalculator('   ')).toBeFalse();
  });

  it('мусор и отрицания не считаются просьбой открыть расчёт', () => {
    expect(wantsAutoCalculator('0')).toBeFalse();
    expect(wantsAutoCalculator('false')).toBeFalse();
    expect(wantsAutoCalculator('no')).toBeFalse();
    expect(wantsAutoCalculator('calc')).toBeFalse();
    expect(wantsAutoCalculator('<script>')).toBeFalse();
  });
});
