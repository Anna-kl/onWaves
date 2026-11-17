import { IViewPeriod, IViewScheduleDay } from './IViewScheduleWeek';
import {
  bookingOverlapWarning,
  closeTimeError,
  futureSameWeekdays,
  planClose,
  quarterHours,
} from './schedule-close';

function period(start: string, end: string): IViewPeriod {
  const time = (text: string) => ({ hour: text.slice(0, 2), minutes: text.slice(3) });
  return { start: time(start), end: time(end) };
}

function day(patch: Partial<IViewScheduleDay> & Pick<IViewScheduleDay, 'date' | 'dayOfWeek'>): IViewScheduleDay {
  return {
    work: period('10:00', '19:00'),
    break: null,
    blocks: [],
    breakShared: false,
    isDayOff: false,
    source: 1,
    isToday: false,
    isNearestWorking: false,
    updateDate: 'stamp',
    conflicts: [],
    ...patch,
  };
}

describe('Закрытие времени', () => {
  const block = period('13:00', '15:00');
  const today = '2026-10-20';

  it('требует, чтобы окончание было позже начала и внутри часов работы', () => {
    const work = period('10:00', '19:00');
    expect(closeTimeError('', '15:00', work)).toContain('Укажите время');
    expect(closeTimeError('15:00', '13:00', work)).toBe('Время окончания должно быть позже начала');
    expect(closeTimeError('18:00', '20:00', work)).toContain('пределах');
    expect(closeTimeError('13:00', '15:00', work)).toBe('');
    expect(quarterHours(work)).toContain('13:00');
    expect(quarterHours(work)).not.toContain('19:15');
  });

  it('собирает будущие субботы и не задевает другие дни', () => {
    expect(futureSameWeekdays(today, 6)).toEqual([
      '2026-10-24', '2026-10-31', '2026-11-07', '2026-11-14',
      '2026-11-21', '2026-11-28', '2026-12-05', '2026-12-12',
    ]);
    const friday = day({ date: '2026-10-23', dayOfWeek: 5, work: period('11:00', '20:00') });
    const saturday = day({ date: '2026-10-24', dayOfWeek: 6, work: period('10:00', '19:00'), blocks: [period('16:00', '17:00')] });
    const otherSaturday = day({ date: '2026-10-31', dayOfWeek: 6, work: period('09:00', '18:00') });
    const dayOff = day({ date: '2026-11-07', dayOfWeek: 6, isDayOff: true, work: null });
    const plan = planClose(saturday, block, [friday, saturday, otherSaturday, dayOff], today, 'weekday');
    expect(plan.bodies.map(item => item.date)).toEqual(['2026-10-24', '2026-10-31']);
    expect(plan.bodies[0].work).toEqual(period('10:00', '19:00'));
    expect(plan.bodies[0].blocks).toEqual([period('16:00', '17:00'), block]);
    expect(plan.bodies[0].scope).toBe('day');
    expect(plan.bodies[1].work).toEqual(period('09:00', '18:00'));
    expect(plan.bodies.every(item => item.date !== friday.date)).toBeTrue();
    expect(plan.skipped).toBeGreaterThan(0);
  });

  it('одна дата не переписывает остальные дни недели', () => {
    const saturday = day({ date: '2026-10-24', dayOfWeek: 6 });
    const plan = planClose(saturday, block, [saturday], today, 'day');
    expect(plan.bodies.length).toBe(1);
    expect(plan.bodies[0].date).toBe('2026-10-24');
    expect(plan.bodies[0].breakForSchedule).toBeFalse();
  });

  it('отличает уже закрытое окно от дня, где часов работы нет', () => {
    const closed = day({ date: '2026-10-24', dayOfWeek: 6, blocks: [block] });
    expect(planClose(closed, block, [closed], today, 'day').anchorIssue).toBe('closed');
    const dayOff = day({ date: '2026-10-24', dayOfWeek: 6, isDayOff: true });
    expect(planClose(dayOff, block, [dayOff], today, 'day').anchorIssue).toBe('outside');
    const opened = day({ date: '2026-10-24', dayOfWeek: 6 });
    expect(planClose(opened, block, [opened], today, 'day').bodies[0].isDayOff).toBeFalse();
  });

  it('предупреждает о записи и называет услугу, если она пришла', () => {
    expect(bookingOverlapWarning([{ start: '13:30', duration: 90, serviceName: 'окрашивание' }]))
      .toBe('На 13:30 есть запись: окрашивание. Её не отменим — закрыто будет только свободное время');
    expect(bookingOverlapWarning([{ start: '13:30', duration: 90 }]))
      .toBe('На 13:30 есть запись. Её не отменим — закрыто будет только свободное время');
    expect(bookingOverlapWarning([])).toBe('');
  });
});
