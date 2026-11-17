import { BenefitIconType } from '../../DTO/enums/benefitIconType';
import { ILandingOffer } from '../../DTO/views/landing/ILandingOffer';
import { PromoOrganizer, PromoSeatQuote, PromoSeatService, PromoSeatState } from '../../DTO/views/promo/promo-seats';

export const PROMO_SEATS_CLOSED_TEXT = 'Места по акции закончились. Запишитесь на бесплатную консультацию';
export const PROMO_SEATS_CAPTION = 'Скидка и купон от OnWaves';

/** То, что карточка акции дорисовывает к данным оффера из БД. */
export interface PromoSeatCard {
  /** Главный оффер акции: при закрытии заменяется строкой о консультации. */
  hero: boolean;
  open: boolean;
  /** «Осталось 4 из 5 мест» — рядом со сроком акции. */
  seatsText: string | null;
  /** Подпись акционной цены у карточки услуги. */
  caption: string | null;
  organizer: string | null;
  termsPath: string;
  /**
   * Кампания есть, но ещё не включена: ссылка на условия есть,
   * счётчик и подмена оффера — нет. Иначе демо-страница сказала бы, что места кончились.
   */
  pending: boolean;
  /** Цена услуги оффера по прайсу и цена по акции (null — акция закрыта или это главный оффер на несколько услуг). */
  listAmount: number | null;
  clientPays: number | null;
  /** Услуга, к которой относится карточка. Деньги по ней спрашивает quote, фронт их не складывает. */
  serviceId: string | null;
  serviceName: string | null;
  discountPercent: number | null;
  promoDiscount: number | null;
  couponDiscount: number | null;
  exhausted: boolean;
  ended: boolean;
}

/** Строки карточки акции. Все числа скопированы из ответа сервера. */
export interface PromoPriceView {
  serviceName: string | null;
  listAmount: number;
  promoDiscount: number;
  couponDiscount: number;
  payable: number;
  discountPercent: number | null;
  seatsLeft: number | null;
  seatsLimit: number | null;
  pendingCheck: boolean;
  notice: string | null;
}

export function promoTermsPath(slug: string): string {
  return `/${slug}/usloviya`;
}

export function seatsLeftText(left: number, limit: number): string {
  return left === 1 ? 'Осталось одно место' : `Осталось ${left} из ${limit} мест`;
}

export function seatsCaption(left: number, limit: number): string {
  const seats = seatsLeftText(left, limit);
  return `${PROMO_SEATS_CAPTION} · первым ${limit} записавшимся · ${seats.charAt(0).toLowerCase()}${seats.slice(1)}`;
}

export function organizerLine(organizer: PromoOrganizer | null | undefined): string | null {
  const name = organizer?.name?.trim();
  if (!name) {
    return null;
  }
  const inn = organizer?.inn?.trim();
  return inn ? `Организатор — ${name}, ИНН ${inn}.` : `Организатор — ${name}.`;
}

/** Карточка относится к акции, если это её главный оффер или оффер акционной услуги. */
export function promoSeatCard(state: PromoSeatState | null, offer: ILandingOffer, slug: string | null): PromoSeatCard | null {
  if (!state || !slug) {
    return null;
  }
  const hero = !!offer.id && offer.id === state.heroOfferId;
  const service = !hero && !!offer.serviceId && state.services.some(item => item.serviceId === offer.serviceId);
  if (!hero && !service) {
    return null;
  }
  const pending = state.status === 'closed' && (state.closedReason === 'disabled' || state.closedReason === 'not_started');
  const open = !pending && state.status === 'open' && state.seatsLeft > 0;
  const priced = pricedService(state, offer, hero);
  // Пока акция открыта, цифры state — гостевой ориентир. Личную сумму карточка берёт из quote.
  const money = open && priced ? priced : null;
  return {
    listAmount: money?.listAmount ?? null,
    clientPays: money?.clientPays ?? null,
    serviceId: priced?.serviceId ?? null,
    serviceName: priced?.name ?? null,
    discountPercent: money ? state.discountPercent : null,
    promoDiscount: money?.promoDiscount ?? null,
    couponDiscount: money?.couponDiscount ?? null,
    exhausted: state.closedReason === 'seats_exhausted',
    ended: state.closedReason === 'ended',
    hero,
    open,
    pending,
    seatsText: hero && open ? seatsLeftText(state.seatsLeft, state.seatsLimit) : null,
    caption: !hero && open ? seatsCaption(state.seatsLeft, state.seatsLimit) : null,
    organizer: hero && (open || pending) ? organizerLine(state.organizer) : null,
    termsPath: promoTermsPath(slug),
  };
}

/** Герой с одной услугой или оффер с serviceId. Несколько услуг без id — цену не выбираем. */
function pricedService(state: PromoSeatState, offer: ILandingOffer, hero: boolean): PromoSeatService | null {
  if (offer.serviceId) {
    return state.services.find(item => item.serviceId === offer.serviceId) ?? null;
  }
  return hero && state.services.length === 1 ? state.services[0] : null;
}

/**
 * Карточка акции на странице. Складывать проценты здесь нельзя:
 * payable, скидка и купон уже посчитаны в quote.
 */
export function promoPriceFromQuote(
  quote: PromoSeatQuote | null | undefined,
  serviceName: string | null,
  discountPercent: number | null,
): PromoPriceView | null {
  if (!quote || quote.status === 'none') {
    return null;
  }
  const seatOpen = quote.status === 'available' || quote.status === 'login_required';
  const promoDiscount = seatOpen ? quote.promoDiscount : 0;
  const couponDiscount = quote.couponDiscount > 0 ? quote.couponDiscount : 0;
  return {
    serviceName,
    listAmount: quote.serviceAmount > 0 ? quote.serviceAmount : quote.recordAmount,
    promoDiscount,
    couponDiscount,
    payable: quote.payableAmount,
    discountPercent: promoDiscount > 0 ? discountPercent : null,
    seatsLeft: seatOpen ? quote.seatsLeft : null,
    seatsLimit: seatOpen ? quote.seatsLimit : null,
    pendingCheck: quote.status === 'login_required',
    notice: promoPriceNotice(quote, couponDiscount),
  };
}

function promoPriceNotice(quote: PromoSeatQuote, couponDiscount: number): string | null {
  if (quote.status === 'login_required') {
    return 'Это возможная цена. Право на скидку проверим при записи, после телефона.';
  }
  if (quote.status !== 'unavailable') {
    return null;
  }
  switch (quote.reason) {
    case 'promo_seats_exhausted':
      return couponDiscount > 0
        ? 'Места с дополнительными 20 % закончились. В сумме остался только купон.'
        : 'Места с дополнительными 20 % закончились. Запись — по цене без этой скидки.';
    case 'promo_ended':
      return 'Акция завершилась. Запись — по действующей цене.';
    case 'not_first_booking':
      return 'Дополнительные 20 % — для первой выполненной записи через OnWaves. Для вас сейчас другая цена.';
    case 'promo_already_used':
      return 'На этот номер место по акции уже занято. Для этой записи действует другая цена.';
    case 'promo_visit_too_late':
      return 'На выбранную дату акция уже не действует.';
    default:
      return 'Эту скидку применить нельзя. Ниже цена, которую посчитал сервер.';
  }
}

/** В закрытой акции из описания услуги уходит фраза со спецценой. Пока акция не включена — текст страницы не трогаем. */
export function promoSeatLead(description: string | null | undefined, card: PromoSeatCard | null): string {
  const text = (description ?? '').trim();
  if (!card || card.open || card.pending) {
    return text;
  }
  return text
    .replace(/\s*По спецпредложению\s*—\s*\d[\d\s\u00A0]*₽ вместо \d[\d\s\u00A0]*₽\.?/gu, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/**
 * Акционная цена у карточки услуги — преимущество со значком «%».
 * Открыта акция — подпись со счётчиком; закрыта — преимущество скрыто, остаётся цена по прайсу.
 */
export function promoSeatBenefits(benefits: ILandingOffer['benefits'], card: PromoSeatCard | null): ILandingOffer['benefits'] {
  if (!card || card.hero || card.pending) {
    return benefits;
  }
  if (!card.open) {
    return benefits.filter(item => item.iconType !== BenefitIconType.Percent);
  }
  return benefits.map(item => item.iconType === BenefitIconType.Percent && card.caption
    ? { ...item, description: card.caption }
    : item);
}
export const ULTRASOUND_PROMO = 'biryukova-ultrasound-50-2026-11';
export const ULTRASOUND_MASTER_ID = '8bb0b62b-2ada-441c-adfe-e6e07acf94f8';
export const ULTRASOUND_ANCHOR = 'ultrasound-offer';
export const ULTRASOUND_COVER = '/assets/img/promo/ultrasound-cleansing.webp';

/** API закрывает запись ровно в endsAt, поэтому показываем дату последней допустимой записи. */
export function lastPromoBookingAt(endsAt: string): number {
  return Date.parse(endsAt) - 1;
}
