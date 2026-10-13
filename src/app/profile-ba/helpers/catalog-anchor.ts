export interface CatalogAnchorSource {
  link: string;
  name?: string | null;
  city?: string | null;
  mainCategory?: string | null;
}

/**
 * Анкор каталога. Пока бэк не отдаёт name — slug как есть, без «очеловечивания».
 * Когда появятся name, mainCategory и city: «{name} — {рубрика}, {город}»,
 * пустые части пропускаются.
 */
export function catalogAnchorLabel(profile: CatalogAnchorSource): string {
  const name = (profile.name ?? '').trim();
  if (!name) {
    return profile.link;
  }
  const detail = [profile.mainCategory, profile.city]
    .map(part => (part ?? '').trim())
    .filter(Boolean)
    .join(', ');
  return detail ? `${name} — ${detail}` : name;
}
