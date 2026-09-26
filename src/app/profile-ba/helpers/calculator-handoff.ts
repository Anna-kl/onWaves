import { ICalculatorBreakdownItem, ICalculatorQuoteResult } from '../../DTO/views/calculator/ICalculator';

/**
 * Расчёт, который посетитель унёс из калькулятора в запись на замер.
 * Живёт в sessionStorage одной вкладки: F5 на шагах записи его не теряет,
 * чужая вкладка и чужой мастер его не видят.
 *
 * Это мост до серверной связи quote ↔ record (см. Onwaves-manage/docs/calculator-to-record-2026-09-16.md):
 * пока бэк не принимает quoteId в записи, расчёт уходит мастеру текстом в комментарии.
 */
export interface CalculatorHandoff {
  version: 1;
  /** Мастер, у которого считали. Запись к другому мастеру расчёт не подхватывает. */
  profileId: string;
  quoteId: string;
  totalText: string | null;
  lines: string[];
  measurements: string[];
  clientNote: string | null;
  createdAt: number;
}

export const CALCULATOR_HANDOFF_KEY = 'ow-calc-handoff';

/** Сколько живёт расчёт без записи. Дальше он устарел и в комментарий не идёт. */
export const CALCULATOR_HANDOFF_TTL_MS = 6 * 60 * 60 * 1000;

const MAX_LINES = 8;
const MAX_MEASUREMENTS = 6;
const MAX_NOTE = 300;

export function formatRub(amount: number): string {
  return `${Math.round(amount).toLocaleString('ru-RU')} ₽`;
}

export function resultTotalText(result: ICalculatorQuoteResult | null | undefined): string | null {
  if (result?.total == null) {
    return null;
  }
  const money = formatRub(result.total);
  return result.totalIsFrom ? `от ${money}` : money;
}

export function buildCalculatorHandoff(input: {
  profileId: string | null | undefined;
  quoteId: string | null | undefined;
  result: ICalculatorQuoteResult | null | undefined;
  clientNote?: string | null;
  now?: number;
}): CalculatorHandoff | null {
  const { profileId, quoteId, result } = input;
  if (!profileId || !quoteId || !result) {
    return null;
  }
  const measurements = (result.measurements ?? [])
    .map(item => (item.label ?? '').trim())
    .filter(Boolean);
  return {
    version: 1,
    profileId,
    quoteId,
    totalText: resultTotalText(result),
    lines: (result.breakdown ?? [])
      .filter(row => row.amount != null)
      .map(breakdownLine)
      .filter(Boolean)
      .slice(0, MAX_LINES),
    measurements: unique(measurements).slice(0, MAX_MEASUREMENTS),
    clientNote: (input.clientNote ?? '').trim().slice(0, MAX_NOTE) || null,
    createdAt: input.now ?? Date.now(),
  };
}

/**
 * Текст для мастера. Первая строка читается в уведомлении без раскрытия:
 * сумма и откуда пришёл клиент.
 */
export function calculatorHandoffComment(handoff: CalculatorHandoff | null): string {
  if (!handoff) {
    return '';
  }
  const head = handoff.totalText
    ? `Расчёт на сайте: ${handoff.totalText}`
    : 'Клиент прошёл расчёт на сайте';
  const parts = [head];
  if (handoff.lines.length) {
    parts.push(`Состав: ${handoff.lines.join('; ')}`);
  }
  if (handoff.measurements.length) {
    parts.push(`Отдельно посчитает мастер: ${handoff.measurements.join(', ')}`);
  }
  if (handoff.clientNote) {
    parts.push(`Пожелание: ${handoff.clientNote}`);
  }
  parts.push(`Расчёт №${quoteNumber(handoff.quoteId)}`);
  return parts.join('. ');
}

/**
 * Первое сообщение клиента мастеру в MAX. Короткое: сумма и номер расчёта —
 * по номеру мастер сопоставит сообщение с расчётом, который прислал бот OnWaves.
 */
export function masterIntroText(handoff: CalculatorHandoff | null, calculatorName?: string | null): string {
  if (!handoff) {
    return '';
  }
  return formatMasterIntro(handoff.quoteId, handoff.totalText, calculatorName, handoff.measurements);
}

/** Текст в буфер: не зависит от profileId, иначе гость без профиля уйдёт в MAX с пустым сообщением. */
export function formatMasterIntro(
  quoteId: string,
  totalText: string | null | undefined,
  calculatorName?: string | null,
  extras?: string[] | null,
): string {
  const name = (calculatorName ?? '').trim();
  const what = name ? `«${name}»` : 'расчёт';
  const total = totalText ? ` — ${totalText}` : '';
  const ask = extras?.length
    ? 'Хочу уточнить работу, которой нет в прайсе, и записаться на замер.'
    : 'Хочу обсудить замер.';
  return `Здравствуйте! Пишу с OnWaves: ${what}${total}, расчёт №${quoteNumber(quoteId)}. ${ask}`;
}

/** Короткий номер расчёта: первые 8 hex без дефисов — тот же, что видит мастер. */
export function quoteNumber(quoteId: string): string {
  return quoteId.replace(/-/g, '').slice(0, 8);
}

export function writeCalculatorHandoff(handoff: CalculatorHandoff): void {
  try {
    sessionStorage.setItem(CALCULATOR_HANDOFF_KEY, JSON.stringify(handoff));
  } catch {
    return;
  }
}

/** Расчёт для записи к этому мастеру; чужой или протухший — null. */
export function readCalculatorHandoff(
  profileId: string | null | undefined,
  now: number = Date.now(),
): CalculatorHandoff | null {
  if (!profileId) {
    return null;
  }
  try {
    const raw = sessionStorage.getItem(CALCULATOR_HANDOFF_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as CalculatorHandoff;
    return isUsableHandoff(parsed, profileId, now) ? parsed : null;
  } catch {
    return null;
  }
}

export function clearCalculatorHandoff(): void {
  try {
    sessionStorage.removeItem(CALCULATOR_HANDOFF_KEY);
  } catch {
    return;
  }
}

export function isUsableHandoff(
  value: CalculatorHandoff | null | undefined,
  profileId: string,
  now: number,
): boolean {
  if (!value || value.version !== 1 || !value.quoteId || value.profileId !== profileId) {
    return false;
  }
  const age = now - (value.createdAt ?? 0);
  return age >= 0 && age <= CALCULATOR_HANDOFF_TTL_MS;
}

function breakdownLine(row: ICalculatorBreakdownItem): string {
  const label = (row.label || row.key || '').trim();
  if (!label) {
    return '';
  }
  const qty = row.quantity != null
    ? ` ${row.quantity.toLocaleString('ru-RU', { maximumFractionDigits: 2 })}${unitSuffix(row.unit)}`
    : '';
  return `${label}${qty} — ${formatRub(row.amount)}`;
}

function unitSuffix(unit?: string | null): string {
  switch (unit) {
    case 'm2': return ' м²';
    case 'm': return ' м';
    case 'pcs': return ' шт.';
    case 'groups': return ' гр.';
    default: return '';
  }
}

function unique(values: string[]): string[] {
  return [...new Set(values)];
}
