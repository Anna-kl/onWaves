import { IViewAddress } from './IViewAddress';

/** Черновик стационарной точки. `id` пустой, пока сервер её не создал. */
export interface IFixedPointDraft {
  id: string | null;
  title: string;
  country: string | null;
  region: string | null;
  city: string | null;
  street: string | null;
  house: string | null;
  apartment: string | null;
}

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
  /** Стационарные точки. Есть только в кабинете, где их можно несколько. */
  fixedPoints?: IFixedPointDraft[];
  /** Id точек, которые мастер убрал. Сервер не удаляет точку с будущими записями. */
  removedFixedPointIds?: string[];
  /** true — изменение сделал пользователь (а не автозаполнение при загрузке). */
  userChanged?: boolean;
}
