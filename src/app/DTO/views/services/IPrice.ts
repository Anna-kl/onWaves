import { CurrencyType } from "../../enums/currencyType";
import { ServicePriceUnit } from "../../enums/servicePriceUnit";

export interface IPrice {
    isRange: boolean;
    price: number|null;
    startRange: number|null;
    endRange: number|null;
    currencyType: CurrencyType;
    /** Доп. единица: шт / м² / п.м. Услуга и час — из типа услуги, не из этого поля. Null у старых услуг. */
    priceUnit?: ServicePriceUnit | null;
}