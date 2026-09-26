import {PaymentForType} from "../../enums/paymentForType";
import { IPrice } from "./IPrice";
import { WorkLocationType } from "../../enums/workLocationType";

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
    /** Характер услуги (backend 2026-07-19): 0 Fixed | 1 Mobile | 2 Online. */
    workLocationType?: WorkLocationType | null;
  }
