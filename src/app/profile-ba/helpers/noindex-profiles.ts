/**
 * Демо-аккаунты, которые не должны быть в индексе, карте сайта и каталоге.
 *
 * Страница остаётся открытой (200): это показ мастерам, а не ошибка.
 * Закрытие — `noindex, follow`, не Disallow: `/Bussiness` уже в индексе Google,
 * и робот должен прочитать мета-тег, чтобы адрес убрать.
 *
 * Временный список, пока `GET /Profiles/sitemap` не отдаст `isTest` / `isPublic`.
 * Тогда константу удалить. `Victoria`, `Manikure_design`, `Manikure_kashira`
 * сюда не входят: владелец не подтвердил, что это демо.
 */
export const NOINDEX_PROFILE_SLUGS = new Set([
  'developer',
  'user-example',
  'bussiness',
]);

export function isNoindexProfileSlug(link: string | null | undefined): boolean {
  const slug = (link ?? '').trim().toLowerCase();
  return NOINDEX_PROFILE_SLUGS.has(slug);
}

/** `noindex, follow` для демо-карточки. Живой профиль — пустой объект, теги не меняются. */
export function noindexFollowMeta(
  link: string | null | undefined,
): { noindex: true; follow: true } | Record<string, never> {
  if (!isNoindexProfileSlug(link)) {
    return {};
  }
  return { noindex: true, follow: true };
}

/**
 * Сегмент, который можно положить в sitemap и `/catalog`.
 * `reserved` — служебные пути витрины (`catalog`, `landing`, …).
 */
export function isIndexableProfileLink(link: string, reserved: ReadonlySet<string>): boolean {
  if (!link || link.length > 120 || /[\/:?#\s]/.test(link)) {
    return false;
  }
  const key = link.toLowerCase();
  return !reserved.has(key) && !NOINDEX_PROFILE_SLUGS.has(key);
}

/** Loc карточек из фикстуры: тот же фильтр, что у сборки карты. Регистр slug не важен. */
export function profileSitemapLocs(
  links: readonly string[],
  reserved: ReadonlySet<string>,
  siteUrl: string,
): string[] {
  const seen = new Set<string>();
  const locs: string[] = [];
  for (const raw of links) {
    const link = raw.trim();
    if (!isIndexableProfileLink(link, reserved)) {
      continue;
    }
    const key = link.toLowerCase();
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    locs.push(`${siteUrl}/${encodeURIComponent(link)}`);
  }
  return locs;
}
