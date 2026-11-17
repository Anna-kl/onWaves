import { formatRub } from '../../../helpers/common/welcome-coupon';

/** Шугаринг «Ноги полностью» у Mary. Скидка только на онлайн-запись, прайс не меняется. */
export const MARY_LEGS_SERVICE_ID = '01a09517-ad15-7c8f-b94a-1d13faa36c4a';
export const MARY_LEGS_SALE_PERCENT = 20;

export function maryLegsSaleRub(listRub: number, percent = MARY_LEGS_SALE_PERCENT): number {
  if (!Number.isFinite(listRub) || listRub <= 0 || percent <= 0) {
    return 0;
  }
  return Math.round(listRub * percent / 100);
}

/** Сколько платит клиент: прайс минус 20% и, если есть, купон. Купон считается от прайса, не от цены после скидки. */
export function maryLegsPayRub(listRub: number, couponRub: number, percent = MARY_LEGS_SALE_PERCENT): number {
  const pay = listRub - maryLegsSaleRub(listRub, percent) - Math.max(0, couponRub);
  return pay > 0 ? pay : 0;
}

export function formatSaleRub(value: number): string {
  return formatRub(value);
}
