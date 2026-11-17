import { IRecordLocation } from '../../DTO/classes/records/recordLocation';
import { WorkLocationType } from '../../DTO/enums/workLocationType';
import { recordPlaceText } from '../../../helpers/common/address';

export interface BookingSuccessDetails {
  services: string;
  master: string;
  when: string;
  place: string;
  locationType: WorkLocationType | null;
}

/** Снимок перед очисткой черновика. Выезд и онлайн не подменяем адресом мастера. */
export function bookingSuccessDetails(
  services: string, master: string, when: string, location: IRecordLocation | null | undefined,
  fallbackPlace = '', locationType: WorkLocationType | null = null,
): BookingSuccessDetails {
  const type = location?.locationType ?? locationType;
  const place = type === WorkLocationType.Online ? 'Онлайн — подключение согласует мастер'
    : type === WorkLocationType.Mobile ? recordPlaceText({ location }) || 'Адрес выезда уточнит мастер'
      : recordPlaceText({ location }) || fallbackPlace.trim() || 'Место визита уточнит мастер';
  return { services, master, when, place, locationType: type };
}
