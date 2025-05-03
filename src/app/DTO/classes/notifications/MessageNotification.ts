import {TypeNotification} from "../../enums/typeNotification";
import {StatusNotification} from "../../enums/statusNotification";

export interface MessageNotification {
  id: string;
  created: Date;
  readed?: Date;
  title :string
  profileUser: string;
  profileUserId: string;
  message: string;
  typeNotification: TypeNotification;
  statusNotification: StatusNotification;
}
