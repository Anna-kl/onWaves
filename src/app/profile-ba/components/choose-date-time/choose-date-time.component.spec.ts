import { Location } from '@angular/common';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { GroupService } from '../../../../services/groupservice';
import { ProfileService } from '../../../../services/profile.service';
import { ScheduleService } from '../../../../services/schedule.service';
import { PaymentForType } from '../../../DTO/enums/paymentForType';
import { subGroup } from '../../../DTO/views/services/IViewSubGroups';
import { BOOKING_TIMEZONE } from '../../helpers/booking-date';
import { ProfileDataService } from '../../services/profile-data.service';
import { ChooseDateTimeComponent } from './choose-date-time.component';

describe('Почасовая запись: календарь', () => {
  let router: jasmine.SpyObj<Router>;
  let component: ChooseDateTimeComponent;
  let catalog: subGroup;
  let schedules: jasmine.SpyObj<ScheduleService>;
  const key = 'choose-date-selection:master:hour';

  beforeEach(() => {
    sessionStorage.removeItem(key);
    router = jasmine.createSpyObj('Router', ['navigate']);
    catalog = { id: 'hour', name: 'Почасовая', groupServiceId: null,
      paymentForType: PaymentForType.ForHour, duration: 0,
      price: { price: 1000, startRange: null, endRange: null } } as subGroup;
    const data = {
      sendChooseServices: of([]), transferId: () => {}, transferProfileBA: () => {},
      transferChooseService: () => {}, transferDate: () => {}, transferDayId: () => {},
    };
    schedules = jasmine.createSpyObj('ScheduleService', ['getWorkDaysInMonth']);
    schedules.getWorkDaysInMonth.and.returnValue(of([]));
    component = new ChooseDateTimeComponent(
      schedules,
      { getServiceById: () => of(catalog) } as unknown as GroupService,
      { translateLink: () => of({ data: 'master' }), getViewProfile: () => of({}) } as unknown as ProfileService,
      router, {} as Location,
      { snapshot: { paramMap: convertToParamMap({ id: 'test' }), queryParamMap: convertToParamMap({ serviceId: 'hour' }) } } as ActivatedRoute,
      data as unknown as ProfileDataService,
    );
    component.serviceId = 'hour';
  });

  afterEach(() => {
    for (const suffix of ['', ':point:point-a', ':point:point-b']) sessionStorage.removeItem(key + suffix);
    sessionStorage.removeItem('booking-draft'); component.ngOnDestroy();
  });

  it('прямой вход без длительности ведёт к выбору услуг, сохраняя услугу', () => {
    component.loadPage('test', 'hour');
    expect(router.navigate).toHaveBeenCalledWith(['/', 'test', 'choose-service'], {
      queryParams: { serviceId: 'hour', noAutoDate: 1 }, replaceUrl: true,
    });
  });

  it('после обновления восстанавливает два часа и цену из каталога', () => {
    sessionStorage.setItem(key, JSON.stringify({ version: 3, profileId: 'master', serviceId: 'hour',
      date: '2030-10-21', time: '10:00', start: '10:00', dayId: 'day', timezone: BOOKING_TIMEZONE, duration: 120 }));
    component.loadPage('test', 'hour');
    expect(component.duration).toBe(120);
    expect(component.services[0].price.price).toBe(2000);
    expect(router.navigate).not.toHaveBeenCalled();
    expect(component.restoredStart).toBe('10:00');
  });

  it('позднее расписание другой точки не перезаписывает страницу записи', () => {
    catalog.paymentForType = PaymentForType.ForService; catalog.duration = 60;
    const first = new Subject<any[]>(); const second = new Subject<any[]>();
    schedules.getWorkDaysInMonth.and.returnValues(first, second);
    component.pointId = 'point-a'; component.loadPage('test', 'hour');
    component.pointId = 'point-b'; component.loadPage('test', 'hour');
    second.next([{ id: 'day-b' }]); second.complete(); first.next([{ id: 'day-a' }]); first.complete();
    expect(component.workDays?.map(day => day.id)).toEqual(['day-b']);
  });

  it('черновики точек раздельны, старое время не восстанавливается на новой точке', () => {
    catalog.paymentForType = PaymentForType.ForService; catalog.duration = 60;
    sessionStorage.setItem(key + ':point:point-a', JSON.stringify({ version: 3, profileId: 'master', serviceId: 'hour', pointId: 'point-a',
      date: '2030-10-30', time: '10:00', start: '10:00', dayId: 'day-a', timezone: BOOKING_TIMEZONE, duration: 60 }));
    component.pointId = 'point-a'; component.loadPage('test', 'hour');
    expect(component.restoredStart).toBe('10:00');
    component.pointId = 'point-b'; component.loadPage('test', 'hour');
    expect(component.restoredStart).toBeUndefined(); expect(component.isChoosed).toBeFalse();
    component.setInterval({ date: new Date(2030, 9, 30, 14), dayId: 'day-b', ifExist: true });
    expect(JSON.parse(sessionStorage.getItem(key + ':point:point-a')!).dayId).toBe('day-a');
    expect(JSON.parse(sessionStorage.getItem(key + ':point:point-b')!).dayId).toBe('day-b');
    expect(JSON.parse(sessionStorage.getItem('booking-draft')!).pointId).toBe('point-b');
  });
});


describe('Приз v2: несколько услуг в календаре', () => {
  it('сохраняет весь набор и запрашивает дни под суммарную длительность', () => {
    const schedules = jasmine.createSpyObj('ScheduleService', ['getWorkDaysInMonth']);
    schedules.getWorkDaysInMonth.and.returnValue(of([]));
    const transfer = jasmine.createSpy('transferChooseService');
    const route = { snapshot: { paramMap: convertToParamMap({ id: 'svetlana' }),
      queryParamMap: convertToParamMap({ serviceId: 'one', services: 'one,two', award: 'award' }) } };
    const services = [20, 50].map((duration, index) => ({ id: index ? 'two' : 'one', duration,
      paymentForType: PaymentForType.ForService, price: { price: 1500 } } as subGroup));
    const data = { sendChooseServices: of([]), transferId: () => {}, transferProfileBA: () => {},
      transferChooseService: transfer, transferDate: () => {}, transferDayId: () => {} };
    const component = new ChooseDateTimeComponent(schedules,
      { getServiceById: (_: string, id: string) => of(services.find(service => service.id === id)) } as unknown as GroupService,
      { translateLink: () => of({ data: 'master' }), getViewProfile: () => of({}) } as unknown as ProfileService,
      jasmine.createSpyObj('Router', ['navigate']), {} as Location, route as ActivatedRoute, data as unknown as ProfileDataService);
    component.awardId = 'award';
    component.loadPage('svetlana', 'one');
    expect(component.duration).toBe(70);
    expect(component.services.map(service => service.id)).toEqual(['one', 'two']);
    expect(transfer).toHaveBeenCalledWith(services);
    expect(schedules.getWorkDaysInMonth.calls.mostRecent().args.slice(3)).toEqual([null, null, 70]);
    component.ngOnDestroy();
  });
});
