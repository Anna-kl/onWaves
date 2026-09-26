import { CalculatorCtaKind } from '../../DTO/enums/calculatorCtaKind';
import { CalculatorResultKind } from '../../DTO/enums/calculatorResultKind';
import { ICalculatorQuoteResult } from '../../DTO/views/calculator/ICalculator';
import {
  CALCULATOR_HANDOFF_KEY,
  CALCULATOR_HANDOFF_TTL_MS,
  buildCalculatorHandoff,
  calculatorHandoffComment,
  formatMasterIntro,
  masterIntroText,
  clearCalculatorHandoff,
  readCalculatorHandoff,
  writeCalculatorHandoff,
} from './calculator-handoff';

const NOW = Date.UTC(2026, 8, 16, 10, 0, 0);

function result(partial: Partial<ICalculatorQuoteResult> = {}): ICalculatorQuoteResult {
  return {
    resultKind: CalculatorResultKind.PriceFrom,
    total: 42100,
    totalIsFrom: true,
    ctaKind: CalculatorCtaKind.Record,
    breakdown: [
      { key: 'material_matte', label: 'Матовое полотно, материал и монтаж', amount: 18000, quantity: 20, unit: 'm2' },
      { key: 'shadow_ceiling', label: 'Теневой профиль, материал и монтаж', amount: 14400, quantity: 18, unit: 'm' },
    ],
    measurements: [{ label: 'Гипсокартон' }, { label: 'Плитка до потолка' }, { label: 'Гипсокартон' }],
    ...partial,
  };
}

describe('calculator handoff', () => {
  afterEach(() => sessionStorage.removeItem(CALCULATOR_HANDOFF_KEY));

  it('carries total, priced rows and every measurement item once', () => {
    const handoff = buildCalculatorHandoff({
      profileId: 'master-1', quoteId: 'abcdef12-3456', result: result(), clientNote: '  без пыли ', now: NOW,
    })!;

    const text = calculatorHandoffComment(handoff);

    expect(text.startsWith('Расчёт на сайте: от 42')).toBeTrue();
    expect(text).toContain('Матовое полотно, материал и монтаж 20 м²');
    expect(text).toContain('Отдельно посчитает мастер: Гипсокартон, Плитка до потолка.');
    expect(text).toContain('Пожелание: без пыли');
    expect(text).toContain('Расчёт №abcdef12');
  });

  it('does not build without quote or result', () => {
    expect(buildCalculatorHandoff({ profileId: 'm', quoteId: null, result: result() })).toBeNull();
    expect(buildCalculatorHandoff({ profileId: 'm', quoteId: 'q', result: null })).toBeNull();
  });

  it('unavailable price still tells the master the client came from the calculator', () => {
    const handoff = buildCalculatorHandoff({
      profileId: 'm', quoteId: 'q1234567', now: NOW,
      result: result({ resultKind: CalculatorResultKind.Unavailable, total: null, breakdown: [], measurements: [] }),
    });

    expect(calculatorHandoffComment(handoff)).toBe('Клиент прошёл расчёт на сайте. Расчёт №q1234567');
  });

  it('is read back only for the same master and only while fresh', () => {
    writeCalculatorHandoff(buildCalculatorHandoff({ profileId: 'master-1', quoteId: 'q', result: result(), now: NOW })!);

    expect(readCalculatorHandoff('master-1', NOW + 1000)).not.toBeNull();
    expect(readCalculatorHandoff('master-2', NOW + 1000)).toBeNull();
    expect(readCalculatorHandoff('master-1', NOW + CALCULATOR_HANDOFF_TTL_MS + 1)).toBeNull();

    clearCalculatorHandoff();
    expect(readCalculatorHandoff('master-1', NOW + 1000)).toBeNull();
  });

  it('intro for MAX names the job, total and quote number', () => {
    const handoff = buildCalculatorHandoff({ profileId: 'm', quoteId: 'abcdef12-3456', result: result(), now: NOW });

    const text = masterIntroText(handoff, 'Расчёт стоимости натяжного потолка').replace(/\s/g, ' ');

    expect(text).toBe(
      'Здравствуйте! Пишу с OnWaves: «Расчёт стоимости натяжного потолка» — от 42 100 ₽, расчёт №abcdef12. Хочу уточнить работу, которой нет в прайсе, и записаться на замер.'
    );
    expect(masterIntroText(null, 'x')).toBe('');
  });

  it('intro text does not need a profile id', () => {
    expect(formatMasterIntro('abcdef12-3456', 'от 42 100 ₽', 'Расчёт стоимости натяжного потолка'))
      .toBe('Здравствуйте! Пишу с OnWaves: «Расчёт стоимости натяжного потолка» — от 42 100 ₽, расчёт №abcdef12. Хочу обсудить замер.');
  });
});
