import { PaymentForType } from 'src/app/DTO/enums/paymentForType';
import { subGroup } from 'src/app/DTO/views/services/IViewSubGroups';

/**
 * Почасовые услуги (`PaymentForType.ForHour`): цена в каталоге указана ЗА ЧАС,
 * а при записи умножается на выбранное клиентом число часов.
 *
 * Раньше пересчёт делали «туда-обратно» прямо по объекту услуги:
 *   выбор:  price = minutes/60 * price
 *   отмена: price = price / (duration/60)
 * Обратное деление разрушало данные, как только duration оказывался null или
 * undefined (модал закрыт крестиком, услуга без длительности с бэка):
 * `price/0` → Infinity, `price/NaN` → NaN — отсюда «NaN рублей» в шапке.
 *
 * Здесь базовая (часовая) цена запоминается один раз и все производные значения
 * считаются от неё. Обратного деления нет — испортить цену повторными
 * выбор/отмена невозможно.
 *
 * База живёт в WeakMap, а не в DTO: она не должна уезжать на бэк в теле записи.
 */
interface HourlyBase {
  price: number | null;
  startRange: number | null;
  endRange: number | null;
  duration?: number;
}

const baseByService = new WeakMap<object, HourlyBase>();

export function isHourly(service: subGroup | null | undefined): boolean {
  return service?.paymentForType === PaymentForType.ForHour;
}

/** Снимок часовых значений услуги. Делается один раз на объект. */
function ensureBase(service: subGroup): HourlyBase {
  const existing = baseByService.get(service);
  if (existing) return existing;
  const base: HourlyBase = {
    price: service.price?.price ?? null,
    startRange: service.price?.startRange ?? null,
    endRange: service.price?.endRange ?? null,
    duration: service.duration
  };
  baseByService.set(service, base);
  return base;
}

const scale = (value: number | null, hours: number): number | null =>
  value === null ? null : Math.round(value * hours * 100) / 100;

/**
 * Применяет выбранную длительность к почасовой услуге.
 * `minutes` — из ChooseTimeModalComponent. Возвращает false, если значение
 * непригодно (отмена в модале, 0, NaN) — вызывающий код обязан в этом случае
 * НЕ добавлять услугу в заказ.
 */
export function applyHourlyDuration(service: subGroup, minutes: number | null | undefined): boolean {
  if (!isHourly(service)) return false;
  if (minutes === null || minutes === undefined) return false;
  const value = Number(minutes);
  if (!Number.isFinite(value) || value <= 0) return false;

  const base = ensureBase(service);
  const hours = value / 60;
  if (service.price) {
    service.price.price = scale(base.price, hours);
    service.price.startRange = scale(base.startRange, hours);
    service.price.endRange = scale(base.endRange, hours);
  }
  service.duration = value;
  return true;
}

/** Возвращает почасовую услугу к каталожному виду (цена за час, исходная длительность). */
export function resetHourly(service: subGroup): void {
  if (!isHourly(service)) return;
  const base = baseByService.get(service);
  if (!base) return;
  if (service.price) {
    service.price.price = base.price;
    service.price.startRange = base.startRange;
    service.price.endRange = base.endRange;
  }
  service.duration = base.duration;
}
