import { CurrencyType } from "../../enums/currencyType";

export interface IPrice {
    isRange: boolean;
    price: number|null;
    startRange: number|null;
    endRange: number|null;
    currencyType: CurrencyType;
}