import { GroupServiceComponent } from './group-service.component';
import { BookingPrice } from '../../helpers/booking-price';

describe('Цена у кнопки выбора даты', () => {
  let component: GroupServiceComponent;
  beforeEach(() => {
    component = Object.create(GroupServiceComponent.prototype);
    component.chooseServices = [{ id: 's', price: { price: 8000, isRange: false } }] as any;
    component.onSelectionPrice({ payable: 7500, original: 8000, coupon: 500, promo: 0, pending: true, isFrom: false, notice: null, termsPath: null } as BookingPrice);
  });
  it('показывает у кнопки тот же итог со скидкой, что и в сводке', () => {
    expect(component.selectionPrice).toContain('7 500');
  });
  it('после смены услуги не оставляет скидочную сумму от прежнего выбора', () => {
    component.chooseServices = [{ id: 'other', price: { price: 2000, isRange: false } }] as any;
    expect(component.selectionPrice).not.toContain('7 500');
    expect(component.selectionPrice).toContain('2000');
  });
});
