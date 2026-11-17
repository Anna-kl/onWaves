import { WorkLocationType } from '../enums/workLocationType';

export interface IWorkLocation {
  /** Id строки. У Fixed их несколько; у выезда и онлайна — одна. */
  id?: string | null;
  /** Короткое имя точки: «Студия на Ленина». */
  title?: string | null;
  locationType: WorkLocationType;
  region?: string | null;
  cities?: string[];
  country?: string | null;
  city?: string | null;
  street?: string | null;
  house?: string | null;
  apartment?: string | null;
  longitude?: number | null;
  latitude?: number | null;
}
