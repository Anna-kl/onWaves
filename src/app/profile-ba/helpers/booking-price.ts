import { WelcomeQuote } from '../../DTO/views/promo/welcome-coupon';
import { PromoSeatQuote } from '../../DTO/views/promo/promo-seats';
import { GiveawayLoad, GiveawayPrizeQuote } from '../../DTO/views/giveaway/giveaway';
import { subGroup } from '../../DTO/views/services/IViewSubGroups';
import { getPrice } from '../../../helpers/common/price.helpers';
import { formatRub, welcomeReasonText } from '../../../helpers/common/welcome-coupon';
import { promoTermsPath } from './promo-seats';

/** Снимок показа цены. Право и денежные значения скидок приходят из quote API. */
export interface BookingPrice {
  original: number;
  payable: number;
  coupon: number;
  promo: number;
  pending: boolean;
  isFrom: boolean;
  notice: string | null;
  termsPath: string | null;
  seats?: { limit: number; left: number };
  promoLabel?: string | null;
  couponLabel?: string | null;
  totalLabel?: string | null;
  pendingNote?: string | null;
  couponTerms?: string | null;
  unpriced?: boolean;
  prize?: boolean;
  prizeDiscount?: number;
  reviewRewardDiscount?: number;
}

export function bookingPrizePrice(quote: GiveawayPrizeQuote, notice: string | null = null): BookingPrice {
  return {
    original: quote.originalAmount, payable: quote.payableAmount, prizeDiscount: quote.prizeDiscountAmount,
    prize: true, coupon: 0, promo: 0, pending: false, isFrom: false, notice, termsPath: null,
  };
}

export function bookingPrizeIssue(load: GiveawayLoad<GiveawayPrizeQuote>): string | null {
  if (load.kind === 'ready' && load.value?.status === 'available') return null;
  if (load.kind === 'verification_required') return 'Подтвердите номер телефона, чтобы записаться на приз.';
  if (load.value?.reason === 'prize_service_mismatch' && load.value.policy?.maxVisits === 1) {
    return 'Для записи с призом выберите одну услугу из условий приза.';
  }
  return 'Приз сейчас нельзя применить. Проверьте выбранную услугу и время.';
}

export function couponDiscount(quote: WelcomeQuote | null): number {
  // В старом ответе API бесплатная запись могла содержать номинал купона. Цену не пересчитываем.
  if (!quote || quote.originalAmount <= 0) return 0;
  if (quote?.couponStatus === 'available') return quote.discountAmount;
  return 0;
}

export function promoReasonText(reason?: string | null): string {
  switch (reason) {
    case 'promo_visit_too_late': return 'Выбранная дата позже срока акции. Выберите более раннюю дату или подтвердите запись по обычной цене.';
    case 'promo_already_used': return 'На этот номер уже занято место по акции. Для этой записи действует обычная цена.';
    case 'promo_ended': return 'Акция завершилась. Запись доступна по обычной цене.';
    case 'promo_seats_exhausted': return 'Места по акции закончились. Запись — по цене без этой скидки.';
    case 'not_first_booking': return 'Скидка действует на первую выполненную запись через OnWaves.';
    case 'phone_required': return 'Для участия в акции нужен номер телефона в профиле.';
    case 'promo_phone_unverified': return 'Подтвердите номер телефона для записи по акции.';
    case 'promo_single_service_required': return 'Запишите УЗ-чистку по акции отдельно от других услуг.';
    case 'promo_price_changed': return 'Прайс изменился. Запись за полцены сейчас недоступна.';
    case 'promo_combination_forbidden': return 'УЗ-чистка за полцены не суммируется с купоном или призом.';
    default: return 'Акция для этой записи недоступна. Проверьте условия и итоговую сумму.';
  }
}

export function bookingPrice(
  services: subGroup[], quote: WelcomeQuote | null, promo: PromoSeatQuote | null,
  applyCoupon = true, slug?: string | null,
): BookingPrice {
  const hasPromo = !!promo && ['available', 'login_required'].includes(promo.status) && promo.promoDiscount > 0;
  // Ответ акции включает её собственный расчёт купона. Не смешиваем его с параллельным quote.
  const couponQuote = promo && promo.status !== 'none' ? promo.coupon : quote;
  const historicalPreview = hasPromo && !couponQuote?.policyId && couponQuote?.couponStatus === 'login_required';
  const coupon = applyCoupon ? Math.max(0, historicalPreview ? promo!.couponDiscount : couponDiscount(couponQuote)) : 0;
  const pricedQuote = couponQuote && couponQuote.couponStatus !== 'none'
    && !['price_not_fixed', 'services_not_found'].includes(couponQuote.reason ?? '')
    ? couponQuote : null;
  const quotedCoupon = Math.max(0, couponDiscount(couponQuote));
  const original = hasPromo ? promo!.recordAmount : pricedQuote?.originalAmount ?? getPrice(services)[0];
  const masterDiscount = pricedQuote ? Math.max(0, pricedQuote.originalAmount - pricedQuote.payableAmount - quotedCoupon) : 0;
  const payable = hasPromo
    ? promo!.payableAmount + (coupon > 0 ? 0 : promo!.couponDiscount)
    : pricedQuote ? pricedQuote.payableAmount + (applyCoupon ? 0 : quotedCoupon) : original;
  const fixed = !!couponQuote?.policyId || couponQuote?.amountMode === 'fixed' || promo?.coupon?.amountMode === 'fixed';
  return {
    ...(couponQuote?.policyId ? { couponTerms: couponQuote.offerText, unpriced: couponQuote.amountKnown === false } : {}),
    ...(hasPromo ? { seats: { limit: promo!.seatsLimit, left: promo!.seatsLeft } } : {}),
    original, payable, coupon: hasPromo && coupon > 0 ? promo!.couponDiscount : coupon,
    promo: (hasPromo ? promo!.promoDiscount : 0) + masterDiscount,
    pending: (hasPromo && promo!.status === 'login_required') || (coupon > 0 && couponQuote?.couponStatus === 'login_required'),
    isFrom: !!couponQuote?.amountIsFrom || services.some(s => !!s.price?.isRange),
    notice: couponQuote?.couponStatus === 'login_required' && couponQuote.potentialDiscount > 0
      ? `Возможен купон до ${formatRub(couponQuote.potentialDiscount)} после входа и проверки условий.`
      : promo?.status === 'unavailable'
      ? (promo.exclusive && promo.reason === 'promo_seats_exhausted'
        ? 'Все места по акции на УЗ-чистку заняты.'
        : promo.reason === 'promo_seats_exhausted' && coupon > 0
        ? 'Места по акции закончились. В сумме остался только купон.'
        : promo.reason === 'not_first_booking'
          ? 'Скидка действует на первую выполненную запись через OnWaves.'
          : promoReasonText(promo.reason))
      : couponQuote?.reason && couponQuote.couponStatus !== 'login_required' && coupon <= 0
      && couponQuote.couponStatus !== 'none' ? welcomeReasonText(couponQuote.reason) : null,
    termsPath: hasPromo && slug && !promo?.exclusive ? promoTermsPath(slug) : coupon > 0 && !couponQuote?.policyId ? '/static/kupon' : null,
    // Quote не содержит процент: не подменяем условия акции фиксированными 20/50 %.
    promoLabel: hasPromo ? 'Скидка по акции' : null,
    couponLabel: fixed && coupon > 0 ? `Купон OnWaves ${formatRub(hasPromo ? promo!.couponDiscount : coupon)}` : null,
    totalLabel: fixed ? 'Вы платите' : null,
    pendingNote: fixed ? 'Сумма действует при выполнении условий. Вход сам по себе место не резервирует.' : null,
  };
}
