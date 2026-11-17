import { FormBuilder } from '@angular/forms';
import { convertToParamMap } from '@angular/router';
import { of, Subject, Subscription, throwError } from 'rxjs';
import { Schedule } from '../../../DTO/classes/schedules/schedule';
import { IChooseDayOfCalendar } from '../../../DTO/views/calendar/IChooseDayOfCalendar';
import { WorkLocationType } from '../../../DTO/enums/workLocationType';
import { PaymentForType } from '../../../DTO/enums/paymentForType';
import { NotesService } from '../notes-events.service';
import { ScheduleService } from '../../../../services/schedule.service';
import { RecordService } from '../../../../services/record.service';
import { AddRecordBAComponent } from './add-record-ba.component';

describe('Ручная запись на выбранной точке', () => {
  let component: AddRecordBAComponent;
  let api: jasmine.SpyObj<ScheduleService>;
  let records: jasmine.SpyObj<RecordService>;
  let subscription: Subscription | undefined;
  let latest: IChooseDayOfCalendar | null;
  const date = new Date(2030, 9, 30);
  const row = (id: string): Schedule => ({ id, daysOfWork: date, addDate: '', scheduleId: id, canAdd: true });
  beforeEach(() => {
    api = jasmine.createSpyObj('ScheduleService', ['getWorkDaysInMonth']);
    api.getWorkDaysInMonth.and.returnValue(of([row('day-a')]));
    records = jasmine.createSpyObj('RecordService', ['saveRecord']);
    const notes = new NotesService(); notes.transferId('master');
    notes.transferToday({ date, dayId: 'from-journal', ifExist: true });
    component = new AddRecordBAComponent(
      { queryParamMap: of(convertToParamMap({ date: '30.10.2030', dayId: 'from-journal' })) } as any,
      new FormBuilder(), {} as any, notes, {} as any, {} as any,
      { getMethodsPayment: () => of([]) } as any,
      { getWorkLocation: () => of({ code: 200, data: [
        { id: 'point-a', locationType: WorkLocationType.Fixed }, { id: 'point-b', locationType: WorkLocationType.Fixed },
      ] }) } as any, records, api,
    );
    component.selectedPointId = 'point-a';
    component.chooseServices = [{ id: 'service', name: 'Услуга', groupServiceId: null, duration: 60,
      paymentForType: PaymentForType.ForService, price: { price: 1000 },
      workLocationType: WorkLocationType.Fixed, fixedPointIds: ['point-a', 'point-b'] } as any];
    latest = null; component.ngOnInit();
  });
  afterEach(() => { subscription?.unsubscribe(); subscription = undefined; component.ngOnDestroy(); });

  it('день журнала сопоставляется с графиком новой точки, старый ответ не возвращается', () => {
    const first = new Subject<Schedule[]>(); const second = new Subject<Schedule[]>();
    api.getWorkDaysInMonth.and.returnValues(first, second);
    subscription = component.day$.subscribe(day => latest = day);
    component.selectPoint('point-b'); second.next([row('day-b')]); first.next([row('day-a')]);
    expect(latest?.dayId).toBe('day-b');
    expect(api.getWorkDaysInMonth.calls.mostRecent().args[4]).toBe('point-b');
  });

  it('смена точки очищает старое время и блокирует отправку формы', () => {
    subscription = component.day$.subscribe();
    component.formClient.patchValue({ name: 'Ирина' });
    component.setInterval({ date, dayId: 'day-a', ifExist: true });
    component.startAI = '10:00'; component.selectPoint('point-b'); component.saveRecord();
    expect(component.start).toBeNull(); expect(component.dayId).toBeNull();
    expect(component.startAI).toBeUndefined(); expect(records.saveRecord).not.toHaveBeenCalled();
  });

  it('для выезда используется график без фиксированной точки', () => {
    component.chooseServices[0].workLocationType = WorkLocationType.Mobile;
    subscription = component.day$.subscribe();
    expect(component.bookingPointId).toBeNull();
    expect(api.getWorkDaysInMonth.calls.mostRecent().args[4]).toBeNull();
  });

  it('ошибка загрузки графика видна и допускает повтор запроса', () => {
    api.getWorkDaysInMonth.and.returnValues(throwError(() => new Error('network')), of([row('day-a')]));
    subscription = component.day$.subscribe(day => latest = day);
    expect(component.scheduleLoadError).toBeTrue(); expect(latest).toBeNull();
    component.reloadSchedule(); expect(component.scheduleLoadError).toBeFalse(); expect(latest?.dayId).toBe('day-a');
  });

  it('очистка интервала не блокирует услугу без ограничения времени', () => {
    component.isTimeLimit = true; component.setInterval(null);
    expect(component.isChoosed).toBeTrue(); expect(component.start).toBeNull();
  });

  it('считает 150, передаёт в календарь 120 и сбрасывает поправку при смене состава', () => {
    const first = { ...component.chooseServices[0], duration: 90 };
    const second = { ...first, id: 'other', duration: 60 };
    component.setService([first, second]);
    expect(component.calculatedDuration).toBe(150);
    component.setInterval({ date, dayId: 'day-a', ifExist: true });
    subscription = component.day$.subscribe();
    component.editDuration(2, 0);
    expect(component.duration).toBe(120);
    expect(component.start).toBeNull();
    expect(api.getWorkDaysInMonth.calls.mostRecent().args[5]).toBe(120);
    component.reloadSchedule();
    expect(component.duration).toBe(120);
    component.setService([first]);
    expect(component.duration).toBe(90);
    expect(component.durationNotice).toContain('Состав услуг изменился');
    expect(component.durationAdjusted).toBeFalse();
  });
});
