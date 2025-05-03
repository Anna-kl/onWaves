import {Gender} from "../../enums/gender";
import {PaymentForType} from "../../enums/paymentForType";
import {ServiceStatus} from "../../enums/serviceStatus";
import {subGroup} from "../../views/services/IViewSubGroups";
import {IViewImage} from "../../views/images/IViewImage";
import { IPrice } from "../../views/services/IPrice";

export class Service implements subGroup{
  name: string;
  gender: Gender[];
  profileUserId: string;
  serviceStatus: ServiceStatus;
  dateModified: Date;
  categoryId?: number;
  price: IPrice;
  paymentForType: PaymentForType;
  prepayment?: boolean;
  about?: string;
  duration?: number;
  groupServiceId: string|null;
  id: string|null;
  message?: string;
  isChecked?: boolean;
  images?: IViewImage[];
  isTimeUnlimited?: boolean;
  constructor(id: string|null, name: string, gender: Gender[],profileUserId: string, price: IPrice,
              paymentForType: PaymentForType,groupServiceId: string|null,
              about?: string,  duration?: number, isTimeUnlimited?: boolean, categoryId?: number  ) {
    this.serviceStatus = ServiceStatus.Active;
    this.prepayment = false;
    this.dateModified = new Date();
    this.name = name;
    this.gender = gender;
    this.price = price;
    this.paymentForType = paymentForType;
    this.duration = duration;
    this.profileUserId = profileUserId;
    this.id = null;
    this.about = about;
    this.groupServiceId = groupServiceId;
    this.isTimeUnlimited = isTimeUnlimited;
    this.id = id;
    this.categoryId = categoryId;
  }

  setCheck(flag: boolean){
    this.isChecked = flag;
    return this;
  }

}
