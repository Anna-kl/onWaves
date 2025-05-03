import {AuthStatus} from "../../enums/authStatus";
import {UserType} from "../../classes/profiles/profile-user.model";
import {CurrencyType} from "../../enums/currencyType";
import {PaymentMethodType} from "../../enums/paymentMethodType";
import {IViewAddress} from "../IViewAddress";
import {urlProfile} from "../../../../helpers/constant/commonConstant";
import { BestProductType } from "../../enums/bestProductType";

export class IViewBusinessProfile {
  id: string | null | undefined;
  parentId?: string;
  name?: string;
  family?: string;
  email?: string;
  link?: string;
  longitude?: number;
  latitude?: number;
  bestProductType?: BestProductType;
  address?: IViewAddress;
  about?: string;
  phone?:string;
  avatar?: any;
  telegram?: string;
  webSite?: string;
  whatsApp?: string;
  mainCategory?: string[];
  register?: Date;
  lastVisit?: Date;
  lastModified?: Date;
  status?: AuthStatus;
  timeZone?: number;
  userType?: UserType;
  isGetOrder?: boolean;
  currency?: CurrencyType[];
  paymentMethods?: PaymentMethodType[];
  countReviews?: number;
  rating?: number;
  constructor() {
  }

  copyProfile(user: IViewBusinessProfile){
      this.id = user.id;
        this.parentId = user.parentId;
        this.family = user.family;
        this.address = user.address;
        this.isGetOrder = user.isGetOrder;
        this.lastModified = user.lastModified,
        this.paymentMethods = user.paymentMethods,
        this.rating = user.rating,
        this.currency = user.currency,
        this.countReviews = user.countReviews,
        this.userType = user.userType,
        this.about = user.about,
        this.status = user.status,
        this.link = user.link,
        this.webSite = user.webSite,
        this.whatsApp = user.whatsApp,
        this.email = user.email,
        this.name = user.name,
        this.phone = user.phone,
        this.lastVisit = user.lastVisit,
        this.mainCategory = user.mainCategory,
        this.telegram = user.telegram,
        this.timeZone = user.timeZone,
        this.avatar = user.avatar,
        this.register = user.register,
        this.longitude = user.longitude,
        this.latitude = user.latitude
  }
  copyProfileWithAddress(user: IViewBusinessProfile, address: IViewAddress) {
        this.id = user.id;
        this.parentId = user.parentId;
        this.family = user.family;
        this.address = address;
        this.isGetOrder = user.isGetOrder;
        this.lastModified = user.lastModified;
        this.paymentMethods = user.paymentMethods;
        this.rating = user.rating;
        this.currency = user.currency;
        this.countReviews = user.countReviews;
        this.userType = user.userType;
        this.about = user.about;
        this.status = user.status;
        this.link = user.link;
        this.webSite = user.webSite;
        this.whatsApp = user.whatsApp;
        this.email = user.email;
        this.name = user.name;
        this.phone = user.phone;
        this.lastVisit = user.lastVisit;
        this.mainCategory = user.mainCategory;
        this.telegram = user.telegram;
        this.timeZone = user.timeZone;
        this.avatar = user.avatar;
        this.register = user.register;
  }
    prepareBeforeSave(){
          this.link = this.link?.replace(urlProfile, '');

    }

}
