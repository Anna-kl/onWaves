import { PromoCalcUnit } from '../../enums/promoCalcUnit';

export interface IPromoCalculatorExtra {
  id: string;
  label: string;
  price: number;
  perUnit: boolean;
}

export interface IPromoCalculator {
  unit: PromoCalcUnit;
  unitLabel: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  priceServiceId: string;
  resultMode: 'from' | 'range';
  rangePercent?: number;
  askCity: boolean;
  askComment: boolean;
  extras?: IPromoCalculatorExtra[];
}
