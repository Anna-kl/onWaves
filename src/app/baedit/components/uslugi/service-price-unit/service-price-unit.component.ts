import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ServicePriceUnit } from 'src/app/DTO/enums/servicePriceUnit';
import { SERVICE_PRICE_UNITS } from 'src/helpers/common/price.helpers';

/**
 * Дополнительная единица цены (шт / м² / п.м).
 * «Услуга» и «час» не чипы: они уже заданы типом услуги.
 * Повторный тап снимает выбор и возвращает implicitValue.
 */
@Component({
    selector: 'app-service-price-unit',
  templateUrl: './service-price-unit.component.html',
  styleUrls: ['./service-price-unit.component.scss'],
})
export class ServicePriceUnitSelectComponent {
  @Input() value: ServicePriceUnit | null = ServicePriceUnit.Service;
  @Input() implicitValue: ServicePriceUnit = ServicePriceUnit.Service;
  @Output() valueChange = new EventEmitter<ServicePriceUnit>();

  readonly units = SERVICE_PRICE_UNITS;

  select(unit: ServicePriceUnit): void {
    const next = this.value === unit ? this.implicitValue : unit;
    this.value = next;
    this.valueChange.emit(next);
  }
}
