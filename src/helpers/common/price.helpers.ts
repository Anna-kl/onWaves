import { ActionType } from "@ngrx/store";
import { CurrencyType } from "src/app/DTO/enums/currencyType";
import { PaymentForType } from "src/app/DTO/enums/paymentForType";
import { ServicePriceUnit } from "src/app/DTO/enums/servicePriceUnit";
import { IPrice } from "src/app/DTO/views/services/IPrice";
import { subGroup } from "src/app/DTO/views/services/IViewSubGroups";

/**
 * Дополнительные единицы в форме цены.
 * «Услуга» и «час» сюда не входят: это уже деление типов
 * (`PaymentForType.ForService` / `ForHour`), не единица измерения.
 */
export const SERVICE_PRICE_UNITS: { value: ServicePriceUnit; label: string; hint: string }[] = [
  { value: ServicePriceUnit.Piece, label: 'шт', hint: 'за штуку' },
  { value: ServicePriceUnit.M2, label: 'м²', hint: 'за квадрат' },
  { value: ServicePriceUnit.Meter, label: 'п.м', hint: 'за погонный метр' },
];

/** Устойчиво к PascalCase с бэка. */
export function priceUnitOf(price?: IPrice | null): ServicePriceUnit | null {
  if (!price) {
    return null;
  }
  const raw = (price as { priceUnit?: ServicePriceUnit | null; PriceUnit?: ServicePriceUnit | null })
    .priceUnit ?? (price as { PriceUnit?: ServicePriceUnit | null }).PriceUnit;
  if (raw === null || raw === undefined || raw === ('' as unknown)) {
    return null;
  }
  const n = Number(raw);
  return Number.isFinite(n) ? (n as ServicePriceUnit) : null;
}

export function priceUnitShort(unit: ServicePriceUnit | null | undefined): string {
  switch (unit) {
    case ServicePriceUnit.Piece:
      return 'шт';
    case ServicePriceUnit.M2:
      return 'м²';
    case ServicePriceUnit.Meter:
      return 'п.м';
    default:
      return '';
  }
}

/**
 * Единица для витрины: шт / м² / п.м из поля цены.
 * «Час» берётся из типа услуги, не из чипа.
 */
export function displayPriceUnit(
  price?: IPrice | null,
  paymentForType?: PaymentForType | null
): string {
  const explicit = priceUnitShort(priceUnitOf(price));
  if (explicit) {
    return explicit;
  }
  if (paymentForType === PaymentForType.ForHour) {
    return 'час';
  }
  return '';
}

/**
 * Числовое значение суммы. null/undefined/NaN → 0.
 * Без этого одна услуга без цены или длительности превращала весь итог в «NaN».
 */
function num(value: number | null | undefined): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

/** Граница диапазона: 0 / null / NaN считаем незаполненной. */
export function isPriceBoundSet(value: number | null | undefined): boolean {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0;
}

export function getPrice(chooseServices: subGroup[]){
    let priceServices = 0;
     let countService = 0;
    let duration = 0;
    chooseServices.forEach(item => {
      if (!item.price?.isRange){
        priceServices += num(item.price?.price);
      }else{
        priceServices += num(item.price?.startRange);
      }
      countService += 1;
      duration += num(item.duration);
    });
    return [priceServices, countService, duration];
  }

  export function getPriceString(chooseServices: subGroup[], sale?: number){
    let priceServices = 0;
    if (!sale){
      sale = 0;
    }
    let endPrice = 0;
    let price = 0;

    chooseServices.forEach(item => {
      if (!item.price?.isRange){
       price += num(item.price?.price);
      }else{
        priceServices += num(item.price?.startRange);
        if (isPriceBoundSet(item.price?.endRange)){
          endPrice += num(item.price.endRange);
        }
      }
    });
    let rangeServices = chooseServices.filter(_ => _.price?.isRange);
    if (rangeServices.length > 0){
      sale = 0;
    }
    const from = rangeServices.length > 0 ? 'от ' : '';
    let result = `${from}${priceServices + price - sale}`;
    if (rangeServices.length > 0){
      if (rangeServices.find(_ => isPriceBoundSet(_.price?.endRange)))
        result += ` до ${endPrice + price - sale}`;
    }
    return result.replace(/\s+/g, ' ').trim();
  }

export function getPriceService(price: IPrice){
    if (price.isRange){
        const hasStart = isPriceBoundSet(price.startRange);
        const hasEnd = isPriceBoundSet(price.endRange);
        if (hasStart && hasEnd) return `от ${price.startRange} до ${price.endRange}`;
        if (hasStart) return `от ${price.startRange}`;
        if (hasEnd) return `до ${price.endRange}`;
        return '';
    }else{
        return price.price;
    }    
}

export function getNameCurrency(type: CurrencyType){
  switch(type){
    case CurrencyType.RUB: {
      return '₽';
    }
    case CurrencyType.USD: {
      return 'USD';
    }
    case CurrencyType.EUR: {
      return 'EUR';
    }
    default: {
      return '₽';
    }
  }
}

function formatAmount(n: number | null | undefined): string {
  const val = Number(n);
  if (!Number.isFinite(val)) {
    return '';
  }
  try {
    return val.toLocaleString('ru-RU');
  } catch {
    return String(val);
  }
}

/** Сумма без единицы: «1 500 ₽», «от 400 ₽ до 1 500 ₽». */
export function formatPriceAmount(price?: IPrice | null, symbol = '₽'): string {
  if (!price) {
    return '';
  }
  if (price.isRange) {
    const hasStart = isPriceBoundSet(price.startRange);
    const hasEnd = isPriceBoundSet(price.endRange);
    if (hasStart && hasEnd) {
      return `от ${formatAmount(price.startRange)} ${symbol} до ${formatAmount(price.endRange)} ${symbol}`;
    }
    if (hasStart) {
      return `от ${formatAmount(price.startRange)} ${symbol}`;
    }
    if (hasEnd) {
      return `до ${formatAmount(price.endRange)} ${symbol}`;
    }
    return '';
  }
  const val = formatAmount(price.price);
  return val ? `${val} ${symbol}` : '';
}
  