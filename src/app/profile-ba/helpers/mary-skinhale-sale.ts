/** Первая SKINHALE у Mary. Скидка мастера уже в прайсе: 5 000 вместо 7 000, на любую запись. */
export const MARY_SKIN_SERVICE_ID = '01a0a109-232b-7b69-acb7-d6bb33bf1210';
export const MARY_SKIN_LIST_RUB = 7000;
export const MARY_SKIN_SALE_RUB = 5000;
export const MARY_SKIN_OFF_RUB = 2000;
/** Купон OnWaves считается от цены без акции, 7 000 ₽, поэтому это 500, не 300. */
export const MARY_SKIN_COUPON_RUB = 500;

export function marySkinOnlinePay(saleRub = MARY_SKIN_SALE_RUB, couponRub = MARY_SKIN_COUPON_RUB): number {
  const pay = saleRub - Math.max(0, couponRub);
  return pay > 0 ? pay : 0;
}
