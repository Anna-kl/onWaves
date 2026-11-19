import { clock, minutesOf, parseClock, timeFromMinutes } from './IViewScheduleWeek';

describe('Полночь как конец рабочего дня',()=>{
  it('сохраняет 1440 минут без превращения в начало дня',()=>{
    const end=parseClock('24:00',true)!;
    expect(minutesOf(end)).toBe(1440);expect(clock(timeFromMinutes(1440))).toBe('24:00');
  });
  it('не разрешает полночь следующего дня как начало',()=>{
    expect(parseClock('24:00')).toBeNull();expect(parseClock('24:01',true)).toBeNull();
    expect(parseClock('25:00',true)).toBeNull();expect(parseClock('24:00oops',true)).toBeNull();
    expect(minutesOf(parseClock('00:00'))).toBe(0);
  });
  it('сохраняет точный смысл старого окончания 23:59',()=>{
    expect(minutesOf(parseClock('23:59',true))).toBe(1439);
  });
});
