import { StatusNotification } from '../../enums/statusNotification';

/** PUT notifications/change-status-by-record/{profileId} — как IChangeNotification + recordId. */
export interface IChangeNotificationByRecord {
  recordId: string;
  statusNotification: StatusNotification;
}
