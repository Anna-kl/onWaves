/**
 * Воронка калькулятора считается по расчёту, а не по открытию панели:
 * `calculator_start`, `calculator_complete`, `calculator_max` уходят в Метрику
 * и в get-reference (Kafka → бот администратора) один раз на quote.
 *
 * Повторное открытие панели, F5, «Изменить параметры» и второй клик по MAX
 * продолжают тот же расчёт — новых событий нет. «Начать заново» создаёт новый
 * quote, и события по нему считаются заново.
 *
 * Хранится рядом с `ow-calc-quote:*` в localStorage: живёт столько же, сколько
 * сам проход. Нет хранилища (приватный режим) — дедупликация в памяти вкладки.
 */
export type CalculatorFunnelEvent = 'start' | 'complete' | 'max';

export const CALCULATOR_EVENTS_KEY = 'ow-calc-events';
const MAX_QUOTES = 30;

type EventLog = Record<string, CalculatorFunnelEvent[]>;

const memory: EventLog = {};

/** true — событие по этому расчёту ещё не отправлялось и теперь отмечено. */
export function claimQuoteEvent(quoteId: string | null | undefined, event: CalculatorFunnelEvent): boolean {
  if (!quoteId) {
    return false;
  }
  const log = readLog();
  const done = [...(log[quoteId] ?? []), ...(memory[quoteId] ?? [])];
  if (done.includes(event)) {
    return false;
  }
  const next = [...(log[quoteId] ?? []), event];
  delete log[quoteId];
  log[quoteId] = next;
  if (!writeLog(trim(log))) {
    memory[quoteId] = [...(memory[quoteId] ?? []), event];
  }
  return true;
}

function readLog(): EventLog {
  try {
    const raw = localStorage.getItem(CALCULATOR_EVENTS_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed as EventLog : {};
  } catch {
    return {};
  }
}

/** false — хранилища нет, отметка остаётся в памяти вкладки. */
function writeLog(log: EventLog): boolean {
  try {
    localStorage.setItem(CALCULATOR_EVENTS_KEY, JSON.stringify(log));
    return true;
  } catch {
    return false;
  }
}

/** Порядок вставки ключей сохраняется: самые старые расчёты — первые. */
function trim(log: EventLog): EventLog {
  const ids = Object.keys(log);
  if (ids.length <= MAX_QUOTES) {
    return log;
  }
  const kept: EventLog = {};
  for (const id of ids.slice(ids.length - MAX_QUOTES)) {
    kept[id] = log[id];
  }
  return kept;
}
