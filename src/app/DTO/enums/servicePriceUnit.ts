/**
 * Единица цены в каталоге. Числа — контракт JSON.
 * Service/Hour — дефолт типа услуги (за сеанс / почасовая), не чип в форме.
 */
export enum ServicePriceUnit {
  Service = 0,
  Hour = 1,
  Piece = 2,
  M2 = 3,
  Meter = 4,
}
