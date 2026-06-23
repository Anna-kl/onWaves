import { ConsentChannel } from '../enums/consentChannel';
import { ConsentSource } from './ISendConsent';

export interface ISendConsentBulk {
  profileUserId: string | null;
  phone?: string;
  email?: string;
  channels: ConsentChannel[] | null; // null или [] = все каналы
  isGranted: boolean;
  consentTextVersion: string;
  source: ConsentSource;
}
