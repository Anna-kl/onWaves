import { ActionType } from "@ngrx/store";
import { CurrencyType } from "src/app/DTO/enums/currencyType";
import { IPrice } from "src/app/DTO/views/services/IPrice";
import { subGroup } from "src/app/DTO/views/services/IViewSubGroups";

export function getPrice(chooseServices: subGroup[]){
    let priceServices = 0;
     let countService = 0;
    let duration = 0;
    chooseServices.forEach(item => {
      if (!item.price.isRange){
        priceServices += item.price.price!;
      }else{
        priceServices += item.price.startRange!;
      }
      countService += 1;
      duration += item.duration!;
    });
    return [priceServices, countService, duration];
  }

  export function getPriceString(chooseServices: subGroup[], sale?: number){
    let priceServices = 0;
    if (!sale){
      sale = 0;
    }
    let endPrice = 0;
    let price = 0;

    chooseServices.forEach(item => {
      if (!item.price.isRange){
       price += item.price.price!;
      }else{
        priceServices += item.price.startRange!;
        if (item.price.endRange){
          endPrice += item.price.endRange;
        }
      }
    });
    let rangeServices = chooseServices.filter(_ => _.price.isRange);
    if (rangeServices.length > 0){
      sale = 0;
    }
    let result = `${rangeServices.length > 0 ? 'от':''}
     ${priceServices + price - sale}`;
    if (rangeServices.length > 0){
      if (rangeServices.find(_ => _.price.endRange !== null))
        result += ` до ${endPrice + price - sale}`;
    }
    return result;
  }

export function getPriceService(price: IPrice){
    if (price.isRange){
        let result = `от ${price.startRange}`;
        if (price.endRange){
          result += ` до ${price.endRange}`;
        }
        return result;
    }else{
        return price.price;
    }    
}

export function getNameCurrency(type: CurrencyType){
  switch(type){
    case CurrencyType.RUB: {
      return '₽';
    }
    case CurrencyType.USD: {
      return 'USD';
    }
    case CurrencyType.EUR: {
      return 'EUR';
    }
    default: {
      return '₽';
    }
  }
}
  