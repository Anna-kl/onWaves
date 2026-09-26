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

/**
 * Плоский адрес мастера из массива форматов работы (бэк 2026-07-20).
 * Просто адрес, всё склеено через запятую, без лейблов «Офис/г./кв.».
 * Fixed → город, улица, дом, кв.; Mobile → регион + города; Online → «Онлайн».
 * Несколько локаций тоже склеиваются запятой.
 */
export function formatWorkLocations(locations: IWorkLocation[] | null | undefined): string {
  if (!locations || !locations.length) {
    return '';
  }
  const segments: string[] = [];
  for (const w of locations) {
    switch (w.locationType) {
      case WorkLocationType.Online:
        segments.push('Онлайн');
        break;
      case WorkLocationType.Mobile: {
        const cities = (w.cities ?? []).filter(c => !!c && `${c}`.trim().length > 0);
        const seg = [w.region, ...cities].filter(v => !!v && `${v}`.trim().length > 0).join(', ');
        if (seg) segments.push(seg);
        break;
      }
      case WorkLocationType.Fixed:
      default: {
        const seg = [w.city, w.street, w.house, w.apartment]
          .filter(v => !!v && `${v}`.trim().length > 0)
          .join(', ');
        if (seg) segments.push(seg);
        break;
      }
    }
  }
  return segments.join(', ');
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
