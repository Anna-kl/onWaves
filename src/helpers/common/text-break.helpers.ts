/**
 * Знаки, после которых вставляется U+200B (zero-width space), чтобы перенос строки
 * был возможен сразу после символа (пунктуация, тире, & и т.д.).
 * Длинные фрагменты без пробелов и без этих знаков не режутся посередине.
 */
const RE_BREAK_AFTER =
  /[.,;:!?…·•\-–—‐_&@#%/+=|\\()[\]{}<>«»„“”‚‘’№*]/g;

/**
 * @returns Исходная строка с невидимыми точками переноса после знаков из набора; `null`/`''` → `''`.
 */
export function addBreakOpportunitiesAfterPunctuation(
  text: string | null | undefined,
): string {
  if (text == null || text === '') {
    return '';
  }
  return text.replace(RE_BREAK_AFTER, (ch) => ch + '\u200B');
}
