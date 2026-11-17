import { convertToParamMap } from '@angular/router';
import { ConfirmRecordComponent } from './confirm-record.component';
import { BOOKING_TIMEZONE } from '../../helpers/booking-date';

describe('Черновик подтверждения записи привязан к точке', () => {
  let component: any;
  const base = 'choose-date-selection:master:service';
  const draft = (pointId?: string) => ({ version: 3, profileId: 'master', serviceId: 'service', pointId,
    date: '2030-10-30', time: '10:00', start: '10:00', dayId: 'day-a', timezone: BOOKING_TIMEZONE });
  beforeEach(() => {
    component = Object.create(ConfirmRecordComponent.prototype);
    component.activatedRoute = { snapshot: { queryParamMap: convertToParamMap({ point: 'point-a' }) } };
  });
  afterEach(() => {
    sessionStorage.removeItem('booking-draft');
    sessionStorage.removeItem(base + ':point:point-a'); sessionStorage.removeItem(base + ':point:point-b');
  });
  it('отклоняет последний общий черновик другой точки', () => {
    sessionStorage.setItem('booking-draft', JSON.stringify(draft('point-b')));
    expect(component.readBookingDraft('service')).toBeNull();
  });
  it('восстанавливает черновик своей точки', () => {
    sessionStorage.setItem('booking-draft', JSON.stringify(draft('point-a')));
    expect(component.readBookingDraft('service')?.dayId).toBe('day-a');
  });
  it('старый черновик без точки допустим только для графика без точки', () => {
    sessionStorage.setItem('booking-draft', JSON.stringify(draft()));
    expect(component.readBookingDraft('service')).toBeNull();
    component.activatedRoute.snapshot.queryParamMap = convertToParamMap({});
    expect(component.readBookingDraft('service')?.dayId).toBe('day-a');
  });
  it('после записи очищается черновик этой точки, соседний остаётся', () => {
    sessionStorage.setItem(base + ':point:point-a', 'a'); sessionStorage.setItem(base + ':point:point-b', 'b');
    component.clearStoredDraft(draft('point-a'));
    expect(sessionStorage.getItem(base + ':point:point-a')).toBeNull();
    expect(sessionStorage.getItem(base + ':point:point-b')).toBe('b');
  });
});
