import { IViewAddress } from './IViewAddress';

/**
 * Набор выбранных форматов работы БА (мультивыбор).
 * Каждый флаг = отдельная запись WorkLocation, которая POST-ится на бэк своим типом.
 */
export interface IWorkFormats {
  /** Онлайн / дистанционно — доп. данных не требует. */
  online: boolean;
  /** Фиксированное место — нужен адрес. */
  fixed: boolean;
  /** Разъездная работа — нужен регион + список районов/городов. */
  mobile: boolean;
}

/** Payload, который select-address отдаёт наверх при любом изменении. */
export interface IWorkLocationChange {
  strAddress: string;
  viewAddress: IViewAddress | null;
  formats: IWorkFormats;
  /** Районы/города для разъездной работы. */
  cities: string[];
  /** true — изменение сделал пользователь (а не автозаполнение при загрузке). */
  userChanged?: boolean;
}
