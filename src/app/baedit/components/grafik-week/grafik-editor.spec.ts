import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { convertToParamMap, ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { LoginService } from '../../../auth/login.service';
import { ScheduleService } from '../../../../services/schedule.service';
import { ToastService } from '../../../../services/toast.service';
import { ProfileService } from '../../../../services/profile.service';
import { IViewPeriod, IViewScheduleDay, IViewScheduleTemplate, mondayOf, weekShiftAllowed } from '../../../DTO/views/schedule/IViewScheduleWeek';
import { GrafikDayComponent } from './grafik-day.component';
import { GrafikTemplateComponent } from './grafik-template.component';
import { GrafikWeekComponent } from './grafik-week.component';

function period(start: string, end: string): IViewPeriod {
  const time = (text: string) => ({ hour: text.slice(0, 2), minutes: text.slice(3) });
  return { start: time(start), end: time(end) };
}

describe('Листание недель', () => {
  it('держится в горизонте генератора и встаёт на понедельник', () => {
    expect(mondayOf('2026-10-20')).toBe('2026-10-19');
    expect(weekShiftAllowed('2026-10-19', '2026-10-20', 1)).toBeTrue();
    expect(weekShiftAllowed('2026-10-19', '2026-10-20', -1)).toBeTrue();
    expect(weekShiftAllowed('2026-12-14', '2026-10-20', 1)).toBeFalse();
    expect(weekShiftAllowed('2026-08-24', '2026-10-20', -1)).toBeFalse();
  });
});

describe('Редактор графика', () => {
  let schedules: jasmine.SpyObj<ScheduleService>;
  let router: jasmine.SpyObj<Router>;
  let day: IViewScheduleDay;
  let template: IViewScheduleTemplate;

  beforeEach(async () => {
    day = {
      date: '2026-10-20', dayOfWeek: 2, work: period('10:00', '19:00'),
      break: period('13:00', '14:00'), breakShared: false, blocks: [period('16:00', '17:00')],
      isDayOff: false, isToday: true, isNearestWorking: true, source: 2,
      updateDate: 'stamp', conflicts: [],
    };
    template = {
      confirmed: true, period: 15, gapAfterMinutes: 0, skipped: [],
      weekdays: [1, 2, 3, 4, 5, 6, 7].map(dayOfWeek => ({
        dayOfWeek, work: period('10:00', '19:00'), break: null, isDayOff: dayOfWeek > 5,
      })),
    };
    schedules = jasmine.createSpyObj('ScheduleService', ['getWeek', 'saveDay', 'resetDay', 'getTemplate', 'saveTemplate', 'closeInterval']);
    schedules.closeInterval.and.returnValue(of({ code: 200, message: '', data: { conflicts: [], applied: [], skipped: 0 } }));
    schedules.getWeek.and.returnValue(of({ code: 200, message: '', data: { todayDate: '2026-10-20', days: [day] } }));
    schedules.getTemplate.and.returnValue(of({ code: 200, message: '', data: template }));
    schedules.saveDay.and.returnValue(of({ code: 200, message: '', data: {} }));
    schedules.saveTemplate.and.returnValue(of({ code: 200, message: '', data: template }));
    schedules.resetDay.and.returnValue(of({ code: 200, message: '', data: {} }));
    router = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [GrafikDayComponent, GrafikTemplateComponent, GrafikWeekComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: ActivatedRoute, useValue: {
          snapshot: { paramMap: convertToParamMap({ date: day.date }), queryParamMap: convertToParamMap({}) },
          queryParamMap: of(convertToParamMap({})),
          parent: { parent: { snapshot: { paramMap: convertToParamMap({ id: 'master' }) } } },
        } },
        { provide: Router, useValue: router },
        { provide: ToastService, useValue: { add: jasmine.createSpy('add') } },
        { provide: Store, useValue: { pipe: () => of(null) } },
        { provide: LoginService, useValue: { updateProfile() {} } },
      ],
    }).overrideComponent(GrafikDayComponent, { set: { providers: [{ provide: ScheduleService, useValue: schedules }] } })
      .overrideComponent(GrafikTemplateComponent, { set: { providers: [{ provide: ScheduleService, useValue: schedules }] } })
      .overrideComponent(GrafikWeekComponent, { set: { providers: [
        { provide: ScheduleService, useValue: schedules },
        { provide: ProfileService, useValue: {} },
      ] } })
      .compileComponents();
  });

  function openDay(): ComponentFixture<GrafikDayComponent> {
    const fixture = TestBed.createComponent(GrafikDayComponent);
    fixture.detectChanges();
    return fixture;
  }

  it('показывает поля времени, несмотря на глобальный label > input', async () => {
    const fixture = openDay();
    await fixture.whenStable();
    fixture.detectChanges();
    const inputs: HTMLInputElement[] = Array.from(fixture.nativeElement.querySelectorAll('input[type=time]'));
    expect(inputs.map(input => input.value)).toEqual(['10:00', '19:00', '13:00', '14:00']);
    expect(fixture.nativeElement.textContent).toContain('Закрыто 16:00–17:00');
    expect(fixture.nativeElement.textContent).toContain('Закрыть окно');
    expect(fixture.nativeElement.textContent).not.toContain('Добавить перерыв');
    expect(fixture.nativeElement.textContent).not.toContain('Только этот день');
    expect(fixture.nativeElement.textContent).not.toContain('На все');
    expect(inputs.every(input => getComputedStyle(input).display !== 'none')).toBeTrue();
    expect(getComputedStyle(fixture.nativeElement.querySelector('input[type=checkbox]')).display).not.toBe('none');
  });

  it('восстанавливает сохранённые часы выходного вместо 10–19', () => {
    day.isDayOff = true;
    day.work = null;
    day.savedWork = period('09:15', '17:45');
    const component = openDay().componentInstance;
    component.isDayOff = false;
    component.save('day');
    expect(schedules.saveDay.calls.mostRecent().args[1].work).toEqual(day.savedWork);
  });

  it('не отправляет пустое или обратное время и объясняет ошибку', () => {
    const fixture = openDay();
    fixture.componentInstance.startText = '';
    fixture.componentInstance.save('day');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#work-error').textContent).toContain('Укажите время');
    fixture.componentInstance.startText = '20:00';
    fixture.componentInstance.save('day');
    expect(fixture.componentInstance.workError).toContain('позже');
    expect(schedules.saveDay).not.toHaveBeenCalled();
  });

  it('требует заполнить добавленный перерыв и проверяет пределы дня', () => {
    const component = openDay().componentInstance;
    component.addBreak();
    component.save('day');
    expect(component.breakError).toContain('Укажите время');
    component.breakStartText = '08:00';
    component.breakEndText = '09:00';
    component.save('day');
    expect(component.breakError).toContain('пределах');
    expect(schedules.saveDay).not.toHaveBeenCalled();
  });

  it('не превращает неизменённый собственный перерыв дня в общий', () => {
    openDay().componentInstance.save('day');
    expect(schedules.saveDay.calls.mostRecent().args[1].breakForSchedule).toBeFalse();
  });

  it('убирает перерыв только даты, сохраняя её закрытые часы', () => {
    const component = openDay().componentInstance;
    component.removeBreak();
    component.save('day');
    expect(schedules.saveDay.calls.mostRecent().args[1]).toEqual(jasmine.objectContaining({
      break: null, breakForSchedule: false, blocks: [period('16:00', '17:00')],
    }));
  });

  it('сохраняет новый перерыв локально без смены перерывов карточки', () => {
    const component = openDay().componentInstance;
    component.addBreak();
    component.breakStartText = '12:00';
    component.breakEndText = '13:00';
    component.save('weekday');
    expect(schedules.saveDay.calls.mostRecent().args[1]).toEqual(jasmine.objectContaining({
      date: day.date, scope: 'weekday', break: period('12:00', '13:00'), breakForSchedule: false,
      blocks: [period('16:00', '17:00')],
    }));
  });

  it('не закрывает пустое, обратное или время вне рабочего дня', () => {
    const component = openDay().componentInstance;
    component.showCloseForm = true;
    component.submitClose();
    expect(component.closeError).toContain('Укажите время');
    component.closeStart = '15:00';
    component.closeEnd = '13:00';
    component.submitClose();
    expect(component.closeError).toContain('позже');
    component.closeStart = '18:00';
    component.closeEnd = '20:00';
    component.submitClose();
    expect(component.closeError).toContain('пределах');
    expect(schedules.closeInterval).not.toHaveBeenCalled();
  });

  it('закрывает время одной кнопкой и остаётся на этом дне', () => {
    const component = openDay().componentInstance;
    component.openCloseForm();
    component.closeStart = '13:00';
    component.closeEnd = '15:00';
    component.submitClose();
    expect(schedules.closeInterval.calls.mostRecent().args[2]).toEqual(period('13:00', '15:00'));
    expect(schedules.closeInterval.calls.mostRecent().args[3]).toBe('day');
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('предупреждает, что онлайн-запись внутри окна не отменится', () => {
    schedules.closeInterval.and.returnValue(of({
      code: 200,
      message: '',
      data: { conflicts: [{ start: '13:30', duration: 90, serviceName: 'окрашивание' }] },
    }));
    const toast = TestBed.inject(ToastService) as unknown as { add: jasmine.Spy };
    const component = openDay().componentInstance;
    component.closeStart = '13:00';
    component.closeEnd = '15:00';
    component.submitClose();
    expect(toast.add).toHaveBeenCalledWith(jasmine.objectContaining({
      severity: 'warn',
      summary: 'На 13:30 есть запись: окрашивание. Её не отменим — закрыто будет только свободное время',
    }));
    expect(schedules.saveDay).not.toHaveBeenCalled();
  });

  it('убирает только выбранное закрытие, оставляя перерыв', () => {
    const component = openDay().componentInstance;
    component.releaseBlock(0);
    expect(schedules.saveDay.calls.mostRecent().args[1]).toEqual(jasmine.objectContaining({
      break: day.break, breakForSchedule: false, blocks: [],
    }));
  });

  it('на карточке недели закрывает будущий рабочий день и не трогает прошедший', async () => {
    schedules.getWeek.and.returnValue(of({
      code: 200,
      message: '',
      data: {
        todayDate: '2026-10-20',
        period: 30,
        gapAfterMinutes: 0,
        days: [
          { date: '2026-10-19', dayOfWeek: 1, work: period('10:00', '19:00'), break: null, blocks: [], isDayOff: false, source: 1, isToday: false, isNearestWorking: false, updateDate: 'a', conflicts: [] },
          { date: '2026-10-20', dayOfWeek: 2, work: null, break: null, blocks: [], isDayOff: true, source: 1, isToday: true, isNearestWorking: false, updateDate: 'b', conflicts: [] },
          { date: '2026-10-24', dayOfWeek: 6, work: period('10:00', '19:00'), break: null, blocks: [period('13:00', '15:00')], isDayOff: false, source: 1, isToday: false, isNearestWorking: true, updateDate: 'c', conflicts: [] },
        ],
      },
    }));
    const fixture = TestBed.createComponent(GrafikWeekComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const text = fixture.nativeElement.textContent as string;
    const buttons = Array.from(fixture.nativeElement.querySelectorAll('button')) as HTMLButtonElement[];
    const closeButtons = buttons.filter(button => button.textContent?.includes('Закрыть время'));
    expect(closeButtons.length).toBe(1);
    expect(text).toContain('Закрыто 13:00–15:00');
    expect(text).not.toContain('Только этот день');
    closeButtons[0].click();
    fixture.detectChanges();
    const component = fixture.componentInstance;
    component.sheet!.start = '15:00';
    component.sheet!.end = '13:00';
    component.submitSheet();
    expect(component.sheet?.error).toContain('позже');
    component.sheet!.start = '14:00';
    component.sheet!.end = '16:00';
    component.submitSheet();
    expect(schedules.closeInterval.calls.mostRecent().args[3]).toBe('day');
    expect(schedules.closeInterval.calls.mostRecent().args[2]).toEqual(period('14:00', '16:00'));
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('блокирует сохранение, сброс и переключатель прошедшего дня по серверной дате', async () => {
    day.date = '2026-10-19';
    const fixture = TestBed.createComponent(GrafikDayComponent);
    Object.assign(TestBed.inject(ActivatedRoute).snapshot, { paramMap: convertToParamMap({ date: day.date }) });
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    fixture.componentInstance.save('day');
    fixture.componentInstance.reset();
    expect(fixture.nativeElement.querySelector('input[type=checkbox]').disabled).toBeTrue();
    expect(schedules.saveDay).not.toHaveBeenCalled();
    expect(schedules.resetDay).not.toHaveBeenCalled();
  });

  it('на текущей неделе сначала показывает будущие даты, сохраняя доступ к прошедшим', () => {
    const past = { ...day, date: '2026-10-19', dayOfWeek: 1 };
    schedules.getWeek.and.returnValue(of({ code: 200, message: '', data: { todayDate: '2026-10-20', days: [past, day] } }));
    const fixture = TestBed.createComponent(GrafikWeekComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#day-2026-10-19')).toBeNull();
    expect(fixture.nativeElement.querySelector('#day-2026-10-20')).not.toBeNull();
    expect(fixture.nativeElement.textContent).toContain('Показать прошедшие дни (1)');
    fixture.componentInstance.showPast = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#day-2026-10-19 button').disabled).toBeTrue();
  });

  it('не отправляет второй запрос во время сохранения и возвращается на неделю', () => {
    const pending = new Subject<any>();
    schedules.saveDay.and.returnValue(pending);
    const component = openDay().componentInstance;
    component.save('day');
    component.save('weekday');
    expect(schedules.saveDay).toHaveBeenCalledTimes(1);
    pending.next({ code: 200, data: {} });
    pending.complete();
    expect(router.navigate).toHaveBeenCalledWith(
      ['/ba-edit', 'master', 'schedule'],
      { queryParams: { week: '2026-10-20', point: null } },
    );
    expect(component.saving).toBeFalse();
  });

  it('не сохраняет старое время после очистки поля постоянного графика', () => {
    const fixture = TestBed.createComponent(GrafikTemplateComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    component.setWorkTime(template.weekdays[0], 'start', '');
    component.save();
    expect(component.workTimes[1].start).toBe('');
    expect(component.opened).toBe(1);
    expect(component.timeError).toContain('Укажите время');
    expect(schedules.saveTemplate).not.toHaveBeenCalled();
  });

  it('проверяет порядок времени и сохраняет часы постоянного графика', () => {
    const fixture = TestBed.createComponent(GrafikTemplateComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    component.setWorkTime(template.weekdays[0], 'end', '09:00');
    component.save();
    expect(schedules.saveTemplate).not.toHaveBeenCalled();
    component.setWorkTime(template.weekdays[0], 'end', '18:30');
    component.save();
    expect(schedules.saveTemplate.calls.mostRecent().args[1].weekdays[0].work).toEqual(period('10:00', '18:30'));
    expect(schedules.saveTemplate.calls.mostRecent().args[1].confirmed).toBeTrue();
  });

  it('сохраняет перерыв постоянного графика и не даёт вынести его за часы приёма', () => {
    template.weekdays[0].break = period('13:00', '14:00');
    const fixture = TestBed.createComponent(GrafikTemplateComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    component.setBreakTime(template.weekdays[0], 'start', '08:00');
    component.setBreakTime(template.weekdays[0], 'end', '09:00');
    component.save();
    expect(component.timeError).toContain('пределах');
    expect(schedules.saveTemplate).not.toHaveBeenCalled();
    component.setBreakTime(template.weekdays[0], 'start', '13:30');
    component.setBreakTime(template.weekdays[0], 'end', '14:30');
    component.save();
    expect(schedules.saveTemplate.calls.mostRecent().args[1].weekdays[0].break).toEqual(period('13:30', '14:30'));
  });

  it('применяет часы и перерыв каждого дня без сброса ритма', () => {
    const fixture = TestBed.createComponent(GrafikTemplateComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    const monday = component.template!.weekdays[0];
    component.setWorkTime(monday, 'start', '09:00');
    component.setWorkTime(monday, 'end', '18:00');
    component.addBreak(monday);
    component.save();
    expect(component.timeError).toContain('перерыва');
    expect(schedules.saveTemplate).not.toHaveBeenCalled();
    component.setBreakTime(monday, 'start', '13:00');
    component.setBreakTime(monday, 'end', '14:00');
    component.save();
    const body = schedules.saveTemplate.calls.mostRecent().args[1];
    expect(body.weekdays[0].work).toEqual(period('09:00', '18:00'));
    expect(body.weekdays[0].break).toEqual(period('13:00', '14:00'));
    expect(body.weekdays[1].break).toBeNull();
    expect(body.weekdays[5].isDayOff).toBeTrue();
    expect(body.period).toBe(15);
    expect(body.confirmed).toBeTrue();
  });
  it('старый create URL открывает текущую неделю выбранной точки', () => {
    const route = TestBed.inject(ActivatedRoute) as any;
    route.snapshot.queryParamMap = convertToParamMap({ point: 'point-a', create: '1' });
    route.queryParamMap = of(route.snapshot.queryParamMap);
    const fixture = TestBed.createComponent(GrafikTemplateComponent);
    fixture.detectChanges();
    expect(schedules.getTemplate).toHaveBeenCalledWith('master', 'point-a');
    expect(fixture.nativeElement.textContent).toContain('Постоянный график');
    expect(fixture.nativeElement.textContent).not.toContain('Добавить ещё один');
    fixture.componentInstance.save();
    expect(schedules.saveTemplate.calls.mostRecent().args[2]).toBe('point-a');
  });

  it('смена точки отменяет старую загрузку и не позволяет сохранить её часы', () => {
    const route = TestBed.inject(ActivatedRoute) as any;
    const query = new BehaviorSubject(convertToParamMap({ point: 'point-a' }));
    route.queryParamMap = query;
    const first = new Subject<any>();
    const second = new Subject<any>();
    schedules.getTemplate.and.callFake((_id, point) => point === 'point-a' ? first : second);
    const fixture = TestBed.createComponent(GrafikTemplateComponent);
    fixture.detectChanges();
    query.next(convertToParamMap({ point: 'point-b' }));
    fixture.componentInstance.save();
    expect(schedules.saveTemplate).not.toHaveBeenCalled();
    second.next({ code: 200, data: { ...template, period: 60 } });
    first.next({ code: 200, data: template });
    expect(fixture.componentInstance.template?.period).toBe(60);
    fixture.componentInstance.save();
    expect(schedules.saveTemplate.calls.mostRecent().args[2]).toBe('point-b');
    expect(schedules.saveTemplate.calls.mostRecent().args[1].period).toBe(60);
  });

  it('при ошибке API не показывает успех и сохраняет введённые часы для повтора', () => {
    schedules.saveTemplate.and.returnValue(of({ code: 500, message: 'Даты не открылись', data: null }));
    const fixture = TestBed.createComponent(GrafikTemplateComponent);
    fixture.detectChanges();
    fixture.componentInstance.setWorkTime(template.weekdays[0], 'start', '09:15');
    fixture.componentInstance.save();
    fixture.detectChanges();
    expect(fixture.componentInstance.saved).toBeFalse();
    expect(fixture.componentInstance.workTimes[1].start).toBe('09:15');
    expect(fixture.nativeElement.querySelector('[role=alert]').textContent).toContain('Даты не открылись');
  });

});
