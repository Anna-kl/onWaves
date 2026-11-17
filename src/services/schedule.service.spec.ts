import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ScheduleService } from './schedule.service';
import { IViewScheduleDay, shiftIsoDate } from '../app/DTO/views/schedule/IViewScheduleWeek';

describe('Контракт редактора графика', () => {
  let service: ScheduleService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule], providers: [ScheduleService] });
    service = TestBed.inject(ScheduleService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('пустой основной шаблон содержит семь выходных и допустимый шаг', () => {
    service.getTemplate('master').subscribe(result => {
      expect(result.data.weekdays.map((day: {dayOfWeek: number}) => day.dayOfWeek)).toEqual([1, 2, 3, 4, 5, 6, 7]);
      expect(result.data.weekdays.every((day: {isDayOff: boolean; work: unknown}) => day.isDayOff && !day.work)).toBeTrue();
      expect(result.data.period).toBe(30);
    });
    http.expectOne(request => request.url.endsWith('/schedules/template/master'))
      .flush({ code: 200, data: { weekdays: [], period: 0 } });
  });

  it('дополняет неполный шаблон, сохраняя настроенные часы и шаг', () => {
    const work = { start: { hour: '09', minutes: '15' }, end: { hour: '17', minutes: '45' } };
    service.getTemplate('master').subscribe(result => {
      expect(result.data.weekdays.length).toBe(7);
      expect(result.data.weekdays[2]).toEqual({ dayOfWeek: 3, isDayOff: false, work, break: null });
      expect(result.data.period).toBe(60);
    });
    http.expectOne(request => request.url.endsWith('/schedules/template/master'))
      .flush({ code: 200, data: { Weekdays: [{ DayOfWeek: 3, IsDayOff: false, Work: work }], Period: 60 } });
  });

  it('часы выходного передаются редактору отдельно от доступности', () => {
    const savedWork = { start: { hour: '09', minutes: '15' }, end: { hour: '17', minutes: '45' } };
    service.getWeek('master').subscribe(result => {
      expect(result.data.days[0].isDayOff).toBeTrue();
      expect(result.data.days[0].work).toBeNull();
      expect(result.data.days[0].savedWork).toEqual(savedWork);
    });
    http.expectOne(request => request.url.endsWith('/schedules/week/master'))
      .flush({ code: 200, data: { days: [{ IsDayOff: true, Work: null, SavedWork: savedWork }] } });
  });

  it('ритм уходит одним правилом на все графики', () => {
    service.saveRhythm('master', { period: 30, gapAfterMinutes: 15 }).subscribe(result => {
      expect(result.data).toEqual({ period: 30, gapAfterMinutes: 15 });
    });
    const request = http.expectOne(item => item.url.endsWith('/schedules/rhythm/master'));
    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toEqual({ period: 30, gapAfterMinutes: 15 });
    request.flush({ code: 200, data: { Period: 30, GapAfterMinutes: 15 } });
  });

  it('неделя и слоты принимают точку приёма', () => {
    service.getWeek('master', '2026-10-28', 'point-1').subscribe();
    const week = http.expectOne(item => item.url.endsWith('/schedules/week/master'));
    expect(week.request.params.get('pointId')).toBe('point-1');
    week.flush({ code: 200, data: { days: [] } });

    service.getFreeSlotDetailed('master', 60, 'day', '2026-10-28', 'point-1').subscribe();
    const slots = http.expectOne(item => item.url.includes('get-free-slot-detailed'));
    expect(slots.request.body).toEqual(jasmine.objectContaining({ pointId: 'point-1', duration: 60 }));
    slots.flush({ slots: [] });
  });

  it('закрывает одну дату тем же сохранением дня и не запрашивает другие недели', () => {
    const anchor = scheduleDay('2026-10-24', 6, '10:00', '19:00');
    let conflicts: { serviceName?: string }[] = [];
    service.closeInterval('master', anchor, clockPeriod('13:00', '15:00'), 'day', '2026-10-20').subscribe(result => {
      conflicts = result.data.conflicts;
    });
    http.expectNone(request => request.url.includes('/schedules/week/'));
    const put = http.expectOne(request => request.url.endsWith('/schedules/day/master'));
    expect(put.request.body).toEqual(jasmine.objectContaining({
      date: '2026-10-24',
      scope: 'day',
      work: anchor.work,
      blocks: [clockPeriod('13:00', '15:00')],
    }));
    put.flush({ code: 200, data: { conflicts: [{ Start: '13:30', Duration: 90, ServiceName: 'окрашивание' }] } });
    expect(conflicts[0].serviceName).toBe('окрашивание');
  });

  it('каждую субботу закрывает только будущие субботы и оставляет их часы', () => {
    const anchor = scheduleDay('2026-10-24', 6, '10:00', '19:00');
    const applied: string[] = [];
    const works: Record<string, unknown> = {};
    service.closeInterval('master', anchor, clockPeriod('13:00', '15:00'), 'weekday', '2026-10-20').subscribe();
    const weeks = http.match(request => request.url.includes('/schedules/week/'));
    expect(weeks.length).toBeGreaterThan(1);
    for (const request of weeks) {
      const monday = request.request.params.get('date') ?? '';
      request.flush({ code: 200, data: { todayDate: '2026-10-20', days: daysOfWeek(monday) } });
    }
    for (let guard = 0; guard < 12; guard += 1) {
      const pending = http.match(request => request.method === 'PUT' && request.url.includes('/schedules/day/'));
      if (!pending.length) {
        break;
      }
      const put = pending[0];
      applied.push(put.request.body.date);
      works[put.request.body.date] = put.request.body.work;
      expect(put.request.body.scope).toBe('day');
      put.flush({ code: 200, data: { conflicts: [] } });
    }
    expect(applied).toContain('2026-10-24');
    expect(applied).toContain('2026-10-31');
    expect(applied).not.toContain('2026-10-23');
    expect(applied).not.toContain('2026-11-07');
    expect(works['2026-10-31']).toEqual(clockPeriod('09:00', '18:00'));
    expect(works['2026-10-24']).toEqual(clockPeriod('10:00', '19:00'));
  });

  it('неделя запрашивается по дате внутри неё', () => {
    service.getWeek('master', '2026-11-03').subscribe();
    const request = http.expectOne(item => item.url.endsWith('/schedules/week/master'));
    expect(request.request.params.get('date')).toBe('2026-11-03');
    request.flush({ code: 200, data: { days: [] } });
  });
});

function clockPeriod(start: string, end: string) {
  const time = (text: string) => ({ hour: text.slice(0, 2), minutes: text.slice(3) });
  return { start: time(start), end: time(end) };
}

function scheduleDay(date: string, dayOfWeek: number, start: string, end: string): IViewScheduleDay {
  return {
    date,
    dayOfWeek,
    work: clockPeriod(start, end),
    break: null,
    blocks: [],
    breakShared: false,
    isDayOff: false,
    source: 1,
    isToday: false,
    isNearestWorking: false,
    updateDate: 'stamp',
    conflicts: [],
  };
}

function daysOfWeek(monday: string) {
  const friday = shiftIsoDate(monday, 4);
  const saturday = shiftIsoDate(monday, 5);
  if (saturday === '2026-10-24') {
    return [
      scheduleDay(friday, 5, '11:00', '20:00'),
      scheduleDay(saturday, 6, '10:00', '19:00'),
    ];
  }
  if (saturday === '2026-10-31') {
    return [scheduleDay(saturday, 6, '09:00', '18:00')];
  }
  if (saturday === '2026-11-07') {
    return [{ ...scheduleDay(saturday, 6, '10:00', '19:00'), isDayOff: true, work: null }];
  }
  return [scheduleDay(saturday, 6, '08:00', '09:00')];
}
