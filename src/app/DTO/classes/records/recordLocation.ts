import { WorkLocationType } from '../../enums/workLocationType';

/**
 * Снапшот локации брони (backend 2026-07-19, `RecordLocationView`).
 * Для выездной услуги фронт заполняет адрес клиента (city/street/house обязательны);
 * для «на месте»/«онлайн» бэк заполняет сам — фронт шлёт `null`.
 */
export interface IRecordLocation {
  locationType: WorkLocationType;
  country?: string | null;
  region?: string | null;
  city?: string | null;
  street?: string | null;
  house?: string | null;
  apartment?: string | null;
  comment?: string | null;
  longitude?: number | null;
  latitude?: number | null;
  onlineLink?: string | null;
}
