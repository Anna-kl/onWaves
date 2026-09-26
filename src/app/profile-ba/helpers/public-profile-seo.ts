import { IViewBusinessProfile } from '../../DTO/views/business/IViewBussinessProfile';
import { IWorkLocation } from '../../DTO/views/IWorkLocation';
import {
  cellingsMasterLabel,
  displayOfferCities,
  formatCitiesTitle,
  isCellingsOfferSlug,
} from './cellings-offer';

export interface PublicProfileSeoSource {
  name?: string | null;
  about?: string | null;
  city?: string | null;
  /** Рубрика этого мастера. Чужую услугу сюда не подставляем. */
  category?: string | null;
  link?: string | null;
  workLocations?: IWorkLocation[] | null;
  fallbackPath?: string;
}

/** Канонический путь карточки — сохранённый slug, не текущее написание в адресной строке. */
/**
 * Город в PostalAddress — один. Если в поле адреса лежит список городов
 * этого мастера, в locality остаётся первый, остальные уже в areaServed.
 * «Кашира, Клубная, 15» не режем: это не список городов выезда.
 */
export function postalLocality(city: string | null | undefined, areaCities: string[]): string {
  const value = (city ?? '').trim();
  const parts = value.split(',').map(part => part.trim()).filter(Boolean);
  if (parts.length < 2) {
    return value;
  }
  const area = new Set(areaCities.map(item => item.trim().toLowerCase()).filter(Boolean));
  if (!area.size || !parts.every(part => area.has(part.toLowerCase()))) {
    return value;
  }
  return parts[0];
}

export function publicProfileCanonicalPath(
  link: string | null | undefined,
  fallbackUrl: string,
): string {
  const stored = (link ?? '').trim();
  const isPlainSegment = !!stored && !/[\/:?#\s]/.test(stored);
  return isPlainSegment ? `/${stored}` : (fallbackUrl.split('?')[0] ?? '');
}

export function isPublicCellingsProfile(
  link: string | null | undefined,
  path: string,
): boolean {
  return isCellingsOfferSlug(link) || isCellingsOfferSlug(path.replace(/^\//, ''));
}

/**
 * Title публичной карточки. Для `/cellings` услуга и география важнее имени:
 * с Директа ищут потолки, не бренд мастера. Имя не подставляем, если оно
 * пустое или дублирует «натяжной».
 */
export function buildPublicProfileTitle(source: PublicProfileSeoSource): string {
  const name = (source.name ?? '').trim();
  const city = (source.city ?? '').trim();
  const path = publicProfileCanonicalPath(source.link, source.fallbackPath ?? '');
  if (isPublicCellingsProfile(source.link, path)) {
    const geo = formatCitiesTitle(displayOfferCities(source.workLocations ?? [])) || city;
    const label = cellingsMasterLabel(name);
    const who = label ? `мастер ${label}` : '';
    return ['Натяжные потолки', [who, geo].filter(Boolean).join(', '), 'OnWaves']
      .filter(Boolean)
      .join(' — ');
  }
  const who = [name, city].filter(Boolean).join(', ');
  const category = masterCategory(source.category, name);
  if (category && who) {
    return `${category} — ${who} | OnWaves`;
  }
  return [who, 'онлайн-запись | OnWaves'].filter(Boolean).join(' — ');
}

/** Рубрика карточки, если она есть и не повторяет имя мастера. */
function masterCategory(category: string | null | undefined, name: string): string {
  const value = (category ?? '').trim();
  if (!value) {
    return '';
  }
  if (name && name.toLowerCase().includes(value.toLowerCase())) {
    return '';
  }
  return value;
}

/**
 * Description сниппета. На `/cellings` — расчёт по прайсу и бесплатный замер,
 * не каталог салонов. Обычная карточка держит призыв записаться в первых ~160.
 */
export function buildPublicProfileDescription(source: PublicProfileSeoSource): string {
  const name = (source.name ?? '').trim();
  const city = (source.city ?? '').trim();
  const about = source.about ?? '';
  const path = publicProfileCanonicalPath(source.link, source.fallbackPath ?? '');
  if (isPublicCellingsProfile(source.link, path)) {
    const geo = formatCitiesTitle(displayOfferCities(source.workLocations ?? [])) || city;
    const label = cellingsMasterLabel(name);
    const who = label ? `мастера ${label} ` : '';
    // Список городов в именительном. Предлог «в» давал «в Кашира».
    return `Натяжные потолки ${who}— ${geo}. Онлайн-калькулятор сметы по прайсу мастера и запись на бесплатный замер.`;
  }
  const SNIPPET_LIMIT = 160;
  const head = [
    [name, city].filter(Boolean).join(', '),
    'запись онлайн: свободное время, услуги и цены.',
  ].filter(Boolean).join(' — ');

  const rest = about.replace(/\s+/g, ' ').trim();
  if (!rest) {
    return head;
  }

  const room = SNIPPET_LIMIT - head.length - 1;
  if (room < 30) {
    return head;
  }
  const tail = rest.length > room ? `${rest.slice(0, room - 1).trimEnd()}…` : rest;
  return `${head} ${tail}`;
}

export function publicProfileSeoFrom(
  profile: IViewBusinessProfile,
  workLocations: IWorkLocation[],
  fallbackUrl: string,
): { path: string; title: string; description: string } {
  const source: PublicProfileSeoSource = {
    name: profile.name,
    about: profile.about,
    city: profile.address?.city,
    category: profile.mainCategory?.[0],
    link: profile.link,
    workLocations,
    fallbackPath: fallbackUrl,
  };
  const path = publicProfileCanonicalPath(profile.link, fallbackUrl);
  return {
    path,
    title: buildPublicProfileTitle(source),
    description: buildPublicProfileDescription(source),
  };
}
