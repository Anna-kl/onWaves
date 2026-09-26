import {AuthStatus} from "../../enums/authStatus";
import {UserType} from "../../classes/profiles/profile-user.model";
import {CurrencyType} from "../../enums/currencyType";
import {PaymentMethodType} from "../../enums/paymentMethodType";
import {IViewAddress} from "../IViewAddress";
import {urlProfile} from "../../../../helpers/constant/commonConstant";
import { BestProductType } from "../../enums/bestProductType";
import { ExternalReviewSource } from "../../enums/externalReviewSource";
import { IWorkLocation } from "../IWorkLocation";

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
  /** Относительный URL аватара (бэк 2026-07-18). `avatar` base64 больше не приходит. */
  avatarUrl?: string | null;
  telegram?: string;
  /** Контакт в мессенджере MAX: username или ссылка вида https://max.ru/u/... */
  max?: string;
  webSite?: string;
  socialLink?: string;
  whatsApp?: string;
  mainCategory?: string[];
  register?: Date;
  lastVisit?: Date;
  lastModified?: Date;
  status?: AuthStatus;
  timeZone?: number;
  userType?: UserType;
  isGetOrder?: boolean;
  /** Промо-страница: не в каталоге, без записи, только прямая ссылка. */
  isPromo?: boolean;
  currency?: CurrencyType[];
  paymentMethods?: PaymentMethodType[];
  countReviews?: number;
  rating?: number;
  experienceText?: string | null;
  externalRating?: number | null;
  externalReviewCount?: number | null;
  externalRatingSource?: ExternalReviewSource | null;
  /** Форматы работы мастера (бэк 2026-07-20): по записи на формат (Fixed/Mobile/Online). */
  workLocations?: IWorkLocation[];
  constructor() {
  }

  copyProfile(user: IViewBusinessProfile){
      this.id = user.id;
        this.parentId = user.parentId;
        this.family = user.family;
        this.address = user.address;
        this.isGetOrder = user.isGetOrder;
        this.isPromo = user.isPromo;
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
        this.max = user.max,
        this.timeZone = user.timeZone,
        this.avatar = user.avatar,
        this.avatarUrl = user.avatarUrl,
        this.workLocations = user.workLocations,
        this.register = user.register,
        this.longitude = user.longitude,
        this.latitude = user.latitude,
        this.socialLink = user.socialLink
  }
  copyProfileWithAddress(user: IViewBusinessProfile, address: IViewAddress) {
        this.id = user.id;
        this.parentId = user.parentId;
        this.family = user.family;
        this.address = address;
        this.isGetOrder = user.isGetOrder;
        this.isPromo = user.isPromo;
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
        this.max = user.max;
        this.timeZone = user.timeZone;
        this.avatar = user.avatar;
        this.avatarUrl = user.avatarUrl;
        this.workLocations = user.workLocations;
        this.register = user.register;
        this.socialLink = user.socialLink;
  }
    prepareBeforeSave(){
          this.link = this.link?.replace(urlProfile, '');

    }

}
