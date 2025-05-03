import {PaymentForType} from "../../enums/paymentForType";
import { IPrice } from "./IPrice";

export interface subGroup {
    id: string|null;
    name: string;
    price: IPrice;
    duration?: number;
    about?: string;
    paymentForType: PaymentForType;
    isChecked?: boolean;
    groupServiceId: string|null;
    isTimeUnlimited?: boolean;
  }
