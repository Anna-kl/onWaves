import { ConsentChannel } from '../../enums/consentChannel';

/** Текущее или историческое состояние согласия по одному каналу. */
export interface IViewConsent {
  channel: ConsentChannel;
  isGranted: boolean;
  grantedAt: string | null;
  revokedAt: string | null;
  consentTextVersion: string;
}
