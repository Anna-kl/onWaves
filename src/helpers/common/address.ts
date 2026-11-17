import {IViewAddress} from "../../app/DTO/views/IViewAddress";
import {IWorkLocation} from "../../app/DTO/views/IWorkLocation";
import {WorkLocationType} from "../../app/DTO/enums/workLocationType";
import {IRecordLocation} from "../../app/DTO/classes/records/recordLocation";

/**
 * Адрес выезда из локации записи (RecordLocation). Возвращает строку только для разъездной
 * (Mobile) — куда едет мастер: город, улица, дом, кв. Для «на месте»/«онлайн» — пусто.
 * Устойчиво к регистру ключей (city/City, locationType/LocationType) — на случай, если
 * это поле приходит в PascalCase.
 */
export function formatRecordLocation(loc: IRecordLocation | any | null | undefined): string {
  if (!loc) return '';
  const pick = (a: string, b: string) => loc[a] ?? loc[b];
  const type = pick('locationType', 'LocationType');
  if (type !== WorkLocationType.Mobile) {
    return '';
  }
  return [pick('city', 'City'), pick('street', 'Street'), pick('house', 'House'), pick('apartment', 'Apartment')]
    .filter(v => !!v && `${v}`.trim().length > 0)
    .join(', ');
}

/**
 * Адрес выезда по объекту записи/уведомления/расписания — достаёт `location`/`Location`
 * (устойчиво к регистру) и форматирует. Пусто, если не разъездная или нет данных.
 */
export function recordLocationText(container: any): string {
  const loc = container?.location ?? container?.Location ?? null;
  return formatRecordLocation(loc);
}

/**
 * Характер услуги (workLocationType) устойчиво к регистру ключа
 * (`workLocationType` / `WorkLocationType`) — бэк может слать PascalCase.
 */
export function serviceWorkLocationType(service: any): WorkLocationType | null | undefined {
  return service?.workLocationType ?? service?.WorkLocationType;
}

/**
 * Приводит `locationType` из ответа бэка к числовому enum.
 * Терпит все виды сериализации, которые реально встречались: число (0|1|2),
 * числовая строка ("0"), имя члена enum ("Fixed"/"mobile") и PascalCase-ключ.
 * Возвращает null, если распознать не удалось — вызывающий код обязан
 * ТРАКТОВАТЬ null КАК «формат не задан», а не подставлять Fixed по умолчанию.
 */
export function parseWorkLocationType(raw: any): WorkLocationType | null {
  const value = raw?.locationType ?? raw?.LocationType ?? raw;
  if (value === null || value === undefined || value === '') return null;

  if (typeof value === 'number') {
    return value === WorkLocationType.Fixed || value === WorkLocationType.Mobile || value === WorkLocationType.Online
      ? value
      : null;
  }
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (/^\d+$/.test(trimmed)) return parseWorkLocationType(Number(trimmed));
    switch (trimmed.toLowerCase()) {
      case 'fixed':  return WorkLocationType.Fixed;
      case 'mobile': return WorkLocationType.Mobile;
      case 'online': return WorkLocationType.Online;
    }
  }
  return null;
}

/**
 * Набор форматов, реально настроенных у профиля, из ответа
 * `GET profiles/{id}/work-location` (бэк отдаёт запись на формат, но может
 * вернуть и одиночный объект). Нераспознанные записи отбрасываются.
 */
export function workLocationTypesOf(data: any): WorkLocationType[] {
  const list: any[] = Array.isArray(data) ? data : (data ? [data] : []);
  const set = new Set<WorkLocationType>();
  for (const item of list) {
    const type = parseWorkLocationType(item);
    if (type !== null) set.add(type);
  }
  return [WorkLocationType.Fixed, WorkLocationType.Mobile, WorkLocationType.Online]
    .filter(t => set.has(t));
}

function filled(value: unknown): boolean {
  return !!value && `${value}`.trim().length > 0;
}

function pickField(raw: any, camel: string, pascal: string): any {
  return raw?.[camel] ?? raw?.[pascal] ?? null;
}

/** Строка «название — город, улица, дом». Без названия остаётся адрес. */
export function fixedPointLine(point: Pick<IWorkLocation, 'title' | 'city' | 'street' | 'house' | 'apartment'> | null | undefined): string {
  if (!point) return '';
  const title = `${point.title ?? ''}`.trim();
  const address = [point.city, point.street, point.house, point.apartment].filter(filled).join(', ');
  if (title && address) return `${title} — ${address}`;
  return title || address;
}

/** Строка для геокодера: страна, регион, город, улица, дом. */
export function fixedPointGeocodeQuery(point: IWorkLocation | null | undefined): string {
  if (!point) return '';
  return [point.country, point.region, point.city, point.street, point.house].filter(filled).join(', ');
}

/** Все стационарные точки из ответа `GET work-location`. Выезд и онлайн сюда не входят. */
export function fixedPointsOf(data: any): IWorkLocation[] {
  const list: any[] = Array.isArray(data) ? data : (data ? [data] : []);
  const points: IWorkLocation[] = [];
  for (const raw of list) {
    if (parseWorkLocationType(raw) !== WorkLocationType.Fixed) continue;
    const id = pickField(raw, 'id', 'Id');
    const cities = raw?.cities ?? raw?.Cities;
    points.push({
      id: id ? `${id}` : null,
      title: pickField(raw, 'title', 'Title'),
      locationType: WorkLocationType.Fixed,
      country: pickField(raw, 'country', 'Country'),
      region: pickField(raw, 'region', 'Region'),
      city: pickField(raw, 'city', 'City'),
      street: pickField(raw, 'street', 'Street'),
      house: pickField(raw, 'house', 'House'),
      apartment: pickField(raw, 'apartment', 'Apartment'),
      cities: Array.isArray(cities) ? cities : [],
      longitude: pickField(raw, 'longitude', 'Longitude'),
      latitude: pickField(raw, 'latitude', 'Latitude'),
    });
  }
  return points;
}

/** Id точек на услуге. Пустой список значит «все точки», пока у профиля она одна. */
export function serviceFixedPointIds(service: any): string[] {
  const raw = service?.fixedPointIds ?? service?.FixedPointIds;
  if (!Array.isArray(raw)) return [];
  return raw.map((id: unknown) => `${id ?? ''}`.trim()).filter(id => id.length > 0);
}

/**
 * Услуга видна на точке. Выезд и онлайн от точки не зависят.
 * Fixed без списка точек остаётся на всех точках — так живёт услуга до миграции.
 */
export function serviceOfferedAtPoint(service: any, pointId: string | null | undefined): boolean {
  if (serviceWorkLocationType(service) !== WorkLocationType.Fixed) return true;
  if (!pointId) return true;
  const ids = serviceFixedPointIds(service);
  if (!ids.length) return true;
  return ids.includes(pointId);
}

/**
 * Плоский адрес мастера из массива форматов работы (бэк 2026-07-20).
 * Просто адрес, всё склеено через запятую, без лейблов «Офис/г./кв.».
 * Fixed → город, улица, дом, кв.; Mobile → регион + города; Online → «Онлайн».
 * Несколько локаций тоже склеиваются запятой.
 */
/** Строки адреса для витрины: каждая стационарная точка отдельно, не одной склейкой. */
export function workLocationLines(locations: IWorkLocation[] | null | undefined): string[] {
  if (!locations?.length) return [];
  const lines: string[] = [];
  for (const place of locations) {
    const type = parseWorkLocationType(place);
    if (type === WorkLocationType.Online) {
      lines.push('Онлайн');
      continue;
    }
    if (type === WorkLocationType.Mobile) {
      const cities = (place.cities ?? []).filter(filled);
      const line = [place.region, ...cities].filter(filled).join(', ');
      if (line) lines.push(line);
      continue;
    }
    if (type === WorkLocationType.Fixed) {
      const line = fixedPointLine(place);
      if (line) lines.push(line);
    }
  }
  return lines;
}

export function formatWorkLocations(locations: IWorkLocation[] | null | undefined): string {
  const lines = workLocationLines(locations);
  if (!lines.length) return '';
  const fixedCount = (locations ?? []).filter(place => parseWorkLocationType(place) === WorkLocationType.Fixed).length;
  return lines.join(fixedCount > 1 ? ' · ' : ', ');
}

/** Адрес на карточке записи: выезд — адрес клиента, «на месте» — точка. */
export function recordPlaceText(container: any): string {
  const loc = container?.location ?? container?.Location ?? null;
  if (!loc) return '';
  const type = parseWorkLocationType(loc);
  if (type === WorkLocationType.Mobile) return formatRecordLocation(loc);
  if (type === WorkLocationType.Fixed) {
    return fixedPointLine({
      title: pickField(loc, 'title', 'Title'),
      city: pickField(loc, 'city', 'City'),
      street: pickField(loc, 'street', 'Street'),
      house: pickField(loc, 'house', 'House'),
      apartment: pickField(loc, 'apartment', 'Apartment'),
    });
  }
  return '';
}

export function getAddressProfile(address: IViewAddress | null | undefined): string{
    let str = '';
    if (!address){
      return str;
    }
    // if (address.country){
    //   str = `${address.country}\n`;
    // }
    // if (address.region){
    //   str = `${str}, ${address.region}`;
    // }
    if (address.city){
      str = `${str} ${address.city}`;
    }
    if (address.street){
      str = `${str}, ${address.street}`;
    }
    if (address.home){
      str = `${str}, ${address.home}`;
    }
    if (address.apartment){
      str = `${str}, ${address.apartment}`;
    }
    return str;
  }

  export function getFullAddressProfile(address: IViewAddress | null | undefined): string{
    let str = '';
    if (!address){
      return str;
    }
    if (address.country){
      str = `${address.country}\n`;
    }
    if (address.region){
      str = `${str}, ${address.region}`;
    }
    if (address.city){
      str = `${str} ${address.city}`;
    }
    if (address.street){
      str = `${str}, ${address.street}`;
    }
    if (address.home){
      str = `${str}, ${address.home}`;
    }
    if (address.apartment){
      str = `${str}, ${address.apartment}`;
    }
    return str;
  }


export function getAddressProfileStreet(address?: IViewAddress): string{
    let str = '';
    if (address) {
        if (address.street) {
            str = `${address.street}`;
        }
        if (address.home) {
            str = `${str}, ${address.home}`;
        }
        if (address.apartment) {
            str = `${str}, ${address.apartment}`;
        }
    }
    return str;
}

export function getAddressCity(address?: IViewAddress): string {
    if (address) {
        return address.city!;
    }
    return '';
}

export function prepareAddressProfile(address: IViewAddress): string{
  let str = '';

  if (address.street){
    str = `${str}, ${address.street}`;
  }
  if (address.home){
    str = `${str}, ${address.home}`;
  }
  if (address.apartment){
    str = `${str}, ${address.apartment}`;
  }
  return str;
}
