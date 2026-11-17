/**
 * Метка амбассадора и UTM с первой страницы визита.
 * Живут в sessionStorage вкладки, пока запись не создана:
 * шаги воронки query не тащат, а Mary должна увидеть источник в комментарии.
 */
export interface VisitSource {
  ref: string | null;
  utm: Record<string, string>;
}

export const VISIT_SOURCE_KEY = 'ow-visit-source';

const REF_RE = /^[A-Z0-9]{1,12}$/;
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;
const UTM_VALUE_RE = /^[A-Za-z0-9._~-]{1,64}$/;

export function captureVisitSource(params: { get(name: string): string | null }): void {
  if (typeof sessionStorage === 'undefined') {
    return;
  }
  const incoming = readIncoming(params);
  if (!incoming.ref && !Object.keys(incoming.utm).length) {
    return;
  }
  const current = readVisitSource() ?? { ref: null, utm: {} };
  let changed = false;
  if (incoming.ref && !current.ref) {
    current.ref = incoming.ref;
    changed = true;
  }
  for (const [key, value] of Object.entries(incoming.utm)) {
    if (!current.utm[key]) {
      current.utm[key] = value;
      changed = true;
    }
  }
  if (!changed) {
    return;
  }
  try {
    sessionStorage.setItem(VISIT_SOURCE_KEY, JSON.stringify(current));
  } catch {
    // Приватный режим: метка не переживёт шаг, запись всё равно создастся.
  }
}

export function readVisitSource(): VisitSource | null {
  if (typeof sessionStorage === 'undefined') {
    return null;
  }
  try {
    const raw = sessionStorage.getItem(VISIT_SOURCE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as Partial<VisitSource>;
    const ref = typeof parsed.ref === 'string' && REF_RE.test(parsed.ref) ? parsed.ref : null;
    const utm: Record<string, string> = {};
    if (parsed.utm && typeof parsed.utm === 'object') {
      for (const key of UTM_KEYS) {
        const value = parsed.utm[key];
        if (typeof value === 'string' && UTM_VALUE_RE.test(value)) {
          utm[key] = value;
        }
      }
    }
    if (!ref && !Object.keys(utm).length) {
      return null;
    }
    return { ref, utm };
  } catch {
    return null;
  }
}

/** Префикс комментария записи. Поля источника в API записи нет. */
export function visitSourceComment(source: VisitSource | null): string {
  if (!source) {
    return '';
  }
  const parts: string[] = [];
  if (source.ref) {
    parts.push(`[ref:${source.ref}]`);
  }
  for (const key of UTM_KEYS) {
    const value = source.utm[key];
    if (value) {
      parts.push(`${key}=${value}`);
    }
  }
  return parts.join(' ');
}

export function clearVisitSource(): void {
  if (typeof sessionStorage === 'undefined') {
    return;
  }
  try {
    sessionStorage.removeItem(VISIT_SOURCE_KEY);
  } catch {
  }
}

function readIncoming(params: { get(name: string): string | null }): VisitSource {
  const refRaw = (params.get('ref') ?? '').trim().toUpperCase();
  const ref = REF_RE.test(refRaw) ? refRaw : null;
  const utm: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const value = (params.get(key) ?? '').trim();
    if (UTM_VALUE_RE.test(value)) {
      utm[key] = value;
    }
  }
  return { ref, utm };
}
