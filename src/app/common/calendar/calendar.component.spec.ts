import { SimpleChange } from '@angular/core';
import { Subject } from 'rxjs';
import { ScheduleService } from '../../../services/schedule.service';
import { Schedule } from '../../DTO/classes/schedules/schedule';
import { CalendarComponent } from './calendar.component';

describe('Календарь выбранной точки', () => {
  let api: jasmine.SpyObj<ScheduleService>;
  let component: CalendarComponent;
  const date = new Date(2030, 9, 30);
  const row = (id: string): Schedule => ({ id, daysOfWork: date, addDate: '', scheduleId: id, canAdd: true });
  beforeEach(() => {
    api = jasmine.createSpyObj('ScheduleService', ['getWorkDaysInMonth']); component = new CalendarComponent(api);
    component.type = 'User'; component.userId = 'master'; component.pointId = 'point-a';
    component.today = date; component.year = 2030; component.month = 9;
  });
  afterEach(() => component.ngOnDestroy());

  it('во время загрузки новой точки старую дату выбрать нельзя', () => {
    const first = new Subject<Schedule[]>(); const second = new Subject<Schedule[]>();
    api.getWorkDaysInMonth.and.returnValues(first, second); component.getSchedule('master', 2030, 9);
    first.next([row('day-a')]); const oldCell = component.days.flat().find(day => day.day === 30)!;
    const selected = spyOn(component.onDate, 'emit'); const cleared = spyOn(component.clearInterval, 'emit');
    component.pointId = 'point-b'; component.ngOnChanges({ pointId: new SimpleChange('point-a', 'point-b', false) });
    component.chooseDay(oldCell); expect(selected).not.toHaveBeenCalled();
    expect(cleared).toHaveBeenCalledOnceWith(true); expect(component.isLoading).toBeTrue();
    second.next([row('day-b')]); expect(component.choosedDay?.dayId).toBe('day-b'); expect(component.isLoading).toBeFalse();
  });

  it('данные родителя отменяют незавершённый старый запрос', () => {
    const pending = new Subject<Schedule[]>(); api.getWorkDaysInMonth.and.returnValue(pending);
    component.getSchedule('master', 2030, 9); component.initialWorkDays = [row('day-b')];
    component.ngOnChanges({ initialWorkDays: new SimpleChange(null, component.initialWorkDays, true) });
    pending.next([row('day-a')]); expect(component.workDays.map(day => day.id)).toEqual(['day-b']);
    expect(component.choosedDay?.dayId).toBe('day-b');
  });
});
