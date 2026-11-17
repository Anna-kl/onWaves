import { UserType } from 'src/app/DTO/classes/profiles/profile-user.model';

/** Единственный хост, с которого уходят хиты. Стейджинг и localhost счётчик не кормят. */
export const ANALYTICS_HOST = 'onwaves.online';

/** ?test=1 живёт до конца вкладки: шаги записи query не тащат. */
export const TEST_LINK_KEY = 'ow-analytics-test';

export function isAnalyticsHost(hostname: string): boolean {
  return hostname === ANALYTICS_HOST;
}

/** Полный адрес хита: origin + путь роутера вместе с query (UTM, yclid). */
export function absoluteHitUrl(origin: string, path: string): string {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${origin.replace(/\/$/, '')}${normalized}`;
}

export interface PageHit {
  url: string;
  referrer: string;
}

/**
 * Один адрес — один хит. Смена title повтор не даёт.
 * Первый реферер — внешний document.referrer, дальше предыдущая страница.
 */
export function nextPageHit(
  state: { lastUrl: string },
  path: string,
  origin: string,
  documentReferrer: string,
): PageHit | null {
  const url = absoluteHitUrl(origin, path);
  if (!url || url === state.lastUrl) {
    return null;
  }
  const referrer = state.lastUrl || documentReferrer || '';
  state.lastUrl = url;
  return { url, referrer };
}

export function queryHasTestFlag(query: string): boolean {
  const raw = query.startsWith('?') ? query.slice(1) : query;
  return new URLSearchParams(raw).get('test') === '1';
}

/** Тестовая запись: аккаунт мастера или администратора, либо заход по ?test=1. */
export function isTestVisit(linkMarked: boolean, userType: UserType | null | undefined): boolean {
  return linkMarked
    || userType === UserType.Business
    || userType === UserType.Admin;
}

/** Слаг из link профиля. В цель не попадают телефон, почта и query. */
export function masterSlug(link: string | null | undefined): string | undefined {
  if (!link) {
    return undefined;
  }
  const path = link.trim().replace(/^[a-z]+:\/\//i, '').split('?')[0];
  const parts = path.split('/').filter(Boolean);
  if (!parts.length) {
    return undefined;
  }
  const slug = parts[0].includes('.') ? parts[parts.length - 1] : parts[0];
  if (!slug || /[\s@+]/.test(slug) || /^\d{6,}$/.test(slug)) {
    return undefined;
  }
  return slug.slice(0, 120);
}

export function clientGoalParams(
  master: string | null | undefined,
  service: string | null | undefined,
  test: boolean,
): Record<string, string | boolean> {
  const params: Record<string, string | boolean> = { test };
  const slug = masterSlug(master);
  if (slug) {
    params['master'] = slug;
  }
  const serviceId = (service ?? '').trim();
  if (serviceId && !/[\s@+]/.test(serviceId) && !/^\d{6,}$/.test(serviceId)) {
    params['service'] = serviceId.slice(0, 80);
  }
  return params;
}
