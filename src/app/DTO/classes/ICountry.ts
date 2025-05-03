import { SafeResourceUrl } from '@angular/platform-browser';

export interface ICountry {
  id: number;
  name: string;
  icon: string| SafeResourceUrl;
  mask: string;
  code: string;
  countNumber: number;
}
