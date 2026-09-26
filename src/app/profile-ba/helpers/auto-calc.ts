/**
 * Параметр рекламной ссылки: `/cellings?calc=1` открывает расчёт сразу после гидрации.
 * Объявление обещает расчёт — гость не должен искать кнопку.
 *
 * Параметр только в query, в ключ SSR-кеша он не входит (`server.ts` кеширует по пути),
 * поэтому отдельного документа для робота не создаёт. На сервере ничего не открывает.
 */
export const AUTO_CALC_PARAM = 'calc';

const TRUTHY = new Set(['1', 'true', 'yes', 'y', 'on', 'open']);

/** Мусорное, пустое и отсутствующее значение считаем «не просили»: страница ведёт себя как обычно. */
export function wantsAutoCalculator(value: string | null | undefined): boolean {
  if (value == null) {
    return false;
  }
  return TRUTHY.has(value.trim().toLowerCase());
}
