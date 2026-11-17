/**
 * Условия акций. Цены считаются из полей, а не из готовой фразы:
 * страница условий, карточка и подтверждение записи берут одни и те же числа.
 *
 * Реквизиты вносит Анна. Пока нет наименования и ИНН, страницу условий
 * нельзя указывать в рекламе: маршрут отдаёт текст, но с noindex.
 */
export interface PromoOrganizer {
  name: string;
  status: string;
  inn: string;
  ogrn: string;
  email: string;
}

export const PROMO_ORGANIZER: PromoOrganizer = {
  name: '',
  status: '',
  inn: '',
  ogrn: '',
  email: 'askme@onwaves.online',
};

export function organizerReady(organizer: PromoOrganizer = PROMO_ORGANIZER): boolean {
  return !!organizer.name.trim() && !!organizer.inn.trim();
}

export type PromoDiscountScope = 'any' | 'online';

export interface PromoOffer {
  anchor: string;
  title: string;
  listRub: number;
  /** Скидка мастера: процент от прайса или сумма в рублях. */
  masterPercent: number | null;
  masterRub: number | null;
  /** any — при любой записи, online — только вместе с онлайн-записью. */
  masterScope: PromoDiscountScope;
  couponRub: number;
  firstVisitOnly: boolean;
  note: string;
  analyticsKey?: string;
  serviceId?: string;
}

export interface MasterPromos {
  slug: string;
  masterName: string;
  place: string;
  /** Последний день акции включительно, для подписи. */
  validThroughLabel: string;
  /** Момент окончания, после него страница остаётся с пометкой «Акция завершена». */
  endsAt: string;
  updatedLabel: string;
  offers: PromoOffer[];
}

export const MARY_PROMOS: MasterPromos = {
  slug: 'mary',
  masterName: 'Mary',
  place: 'Кашира, Каширский пр., 11А',
  validThroughLabel: '30 ноября 2026 года',
  endsAt: '2026-12-01T00:00:00+03:00',
  updatedLabel: '22 октября 2026',
  offers: [
    {
      anchor: 'sugar-legs',
      title: 'Шугаринг ног, первый визит',
      listRub: 1700,
      masterPercent: 20,
      masterRub: null,
      masterScope: 'online',
      couponRub: 200,
      firstVisitOnly: true,
      note: '',
      analyticsKey: 'mary-sugar-legs',
      serviceId: '01a09517-ad15-7c8f-b94a-1d13faa36c4a',
    },
    {
      anchor: 'skinhale',
      title: 'SKINHALE, первый визит',
      listRub: 7000,
      masterPercent: null,
      masterRub: 2000,
      masterScope: 'any',
      couponRub: 500,
      firstVisitOnly: true,
      note: 'Акция и купон действуют на разовую процедуру первого визита. Есть противопоказания, перед процедурой нужна консультация специалиста.',
      analyticsKey: 'первая-skinhale-со-скидкои',
      serviceId: '01a0a109-232b-7b69-acb7-d6bb33bf1210',
    },
  ],
};

const PROMOS_BY_SLUG: Record<string, MasterPromos> = {
  mary: MARY_PROMOS,
};

export function masterPromos(slug: string | null | undefined): MasterPromos | null {
  if (!slug) {
    return null;
  }
  return PROMOS_BY_SLUG[slug.trim().toLowerCase()] ?? null;
}

export function promoEnded(promos: MasterPromos, now = new Date()): boolean {
  const end = new Date(promos.endsAt);
  return !Number.isNaN(end.getTime()) && now.getTime() >= end.getTime();
}

export function masterSaleRub(offer: PromoOffer): number {
  if (offer.masterRub != null && offer.masterRub > 0) {
    return offer.masterRub;
  }
  const percent = offer.masterPercent ?? 0;
  if (!Number.isFinite(offer.listRub) || offer.listRub <= 0 || percent <= 0) {
    return 0;
  }
  return Math.round(offer.listRub * percent / 100);
}

/** Цена после скидки мастера, без купона. */
export function promoPriceRub(offer: PromoOffer): number {
  const price = offer.listRub - masterSaleRub(offer);
  return price > 0 ? price : 0;
}

/** Итог онлайн-записи: скидка мастера и купон, если он задан. */
export function onlinePayRub(offer: PromoOffer): number {
  const pay = promoPriceRub(offer) - Math.max(0, offer.couponRub);
  return pay > 0 ? pay : 0;
}

export function promoByLanding(
  slug: string | null | undefined,
  analyticsKey: string | null | undefined,
  serviceId: string | null | undefined,
): PromoOffer | null {
  const promos = masterPromos(slug);
  if (!promos) {
    return null;
  }
  return promos.offers.find(offer =>
    (analyticsKey && offer.analyticsKey === analyticsKey)
    || (serviceId && offer.serviceId === serviceId)
  ) ?? null;
}
