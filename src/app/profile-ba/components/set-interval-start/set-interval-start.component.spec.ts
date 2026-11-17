import { of, Subject } from 'rxjs';
import { ScheduleService } from '../../../../services/schedule.service';
import { IFreeSlotsResponse } from '../../../DTO/views/schedule/IFreeSlotsResponse';
import { SetIntervalStartComponent } from './set-interval-start.component';

describe('Слоты при смене точки и даты', () => {
  let api: jasmine.SpyObj<ScheduleService>;
  let component: SetIntervalStartComponent;
  const date = new Date(2030, 9, 30);
  beforeEach(() => {
    api = jasmine.createSpyObj('ScheduleService', ['getFreeSlotDetailed', 'getFreeSlotForDay']);
    component = new SetIntervalStartComponent(api);
    component.id = 'master'; component.duration = 60;
    component.day = { date, dayId: 'day-a', ifExist: true }; component.pointId = 'point-a';
  });
  afterEach(() => component.ngOnDestroy());

  it('ответ другой точки не заменяет актуальные слоты', () => {
    const first = new Subject<IFreeSlotsResponse>(); const second = new Subject<IFreeSlotsResponse>();
    api.getFreeSlotDetailed.and.returnValues(first, second);
    component.ngOnChanges(); component.pointId = 'point-b';
    component.day = { date, dayId: 'day-b', ifExist: true }; component.ngOnChanges();
    second.next({ slots: [{ start: '14:00' }], reason: null }); first.next({ slots: [{ start: '09:00' }], reason: null });
    expect(component.slots.map(slot => slot.start)).toEqual(['14:00']);
    expect(component.dayId).toBe('day-b');
  });

  it('очистка даты отменяет запрос и не возвращает старые окна', () => {
    const pending = new Subject<IFreeSlotsResponse>(); api.getFreeSlotDetailed.and.returnValue(pending);
    component.ngOnChanges(); component.day = null; component.ngOnChanges();
    pending.next({ slots: [{ start: '10:00' }], reason: null });
    expect(component.status).toBe('idle'); expect(component.dayId).toBeNull(); expect(component.slots).toEqual([]);
  });

  it('смена дня сбрасывает выбор и отклоняет клик по старому слоту', () => {
    api.getFreeSlotDetailed.and.returnValue(of({ slots: [{ start: '10:00' }], reason: null }));
    const changed = spyOn(component.setInterval, 'emit'); component.ngOnChanges();
    const oldSlot = component.slots[0]; component.chooseInterval(oldSlot); changed.calls.reset();
    api.getFreeSlotDetailed.and.returnValue(new Subject<IFreeSlotsResponse>());
    component.day = { date: new Date(2030, 9, 31), dayId: 'next-day', ifExist: true }; component.ngOnChanges();
    expect(changed).toHaveBeenCalledOnceWith(null); component.chooseInterval(oldSlot);
    expect(changed).toHaveBeenCalledTimes(1); expect(component.status).toBe('loading');
  });

  it('мастер получает окна нужной точки без отсечения лид-тайма', () => {
    api.getFreeSlotForDay.and.returnValue(of([{ start: '10:00' }])); component.mode = 'master'; component.ngOnChanges();
    expect(api.getFreeSlotForDay).toHaveBeenCalledWith('master', 60, '2030-10-30', 'day-a', 'point-a');
    expect(api.getFreeSlotDetailed).not.toHaveBeenCalled(); expect(component.status).toBe('ready');
  });
});
