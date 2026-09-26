import { WorkLocationType } from '../enums/workLocationType';

export interface IWorkLocation {
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
