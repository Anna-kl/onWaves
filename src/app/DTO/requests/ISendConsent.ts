import { ConsentChannel } from '../enums/consentChannel';

export type ConsentSource = 'registration' | 'settings' | 'popup' | 'api';

/** Тело запроса POST /v1/api/Consent — выдача или отзыв согласия. */
export interface ISendConsent {
  profileUserId: string | null;
  phone?: string;
  email?: string;
  channel: ConsentChannel;
  isGranted: boolean;
  consentTextVersion: string;
  source: ConsentSource;
}
