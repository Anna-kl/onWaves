import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged, finalize, map, of, Subscription, take } from 'rxjs';
import {
  clock,
  formatScheduleDate,
  IViewScheduleTemplate,
  IViewScheduleWeekday,
  minutesOf,
  parseClock,
  timeFromMinutes,
  weekdayName,
} from '../../../DTO/views/schedule/IViewScheduleWeek';
import { ScheduleService } from '../../../../services/schedule.service';
import { ToastService } from '../../../../services/toast.service';
import { schedulePointId } from './grafik-point-switch.component';

@Component({
  selector: 'app-grafik-template',
  templateUrl: './grafik-template.component.html',
  styleUrls: ['./grafik-schedule.scss'],
  providers: [ScheduleService],
})
export class GrafikTemplateComponent implements OnInit, OnDestroy {
  template: IViewScheduleTemplate | null = null;
  loading = true;
  error = '';
  saving = false;
  saveError = '';
  saved = false;
  timeError = '';
  workTimes: Record<number, { start: string; end: string }> = {};
  breakTimes: Record<number, { start: string; end: string }> = {};
  /** Перерыв включён, даже если поля ещё пустые: иначе пустое «С» сохранило бы старые часы. */
  breakOn: Record<number, boolean> = {};
  readonly clock = clock;
  readonly weekdayName = weekdayName;
  readonly formatScheduleDate = formatScheduleDate;
  profileId = '';
  pointId: string | null = null;
  private sub = new Subscription();
  private loadSub?: Subscription;
  opened: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private schedules: ScheduleService,
    private toast: ToastService,
  ) {}

  ngOnInit(): void {
    this.profileId = this.route.parent?.parent?.snapshot.paramMap.get('id') ?? '';
    // Старые ссылки ?create=1 тоже открывают существующую неделю: второго шаблона в API нет.
    this.sub.add((this.route.queryParamMap ?? of(this.route.snapshot.queryParamMap)).pipe(
      map(params => params.get('point') ?? ''), distinctUntilChanged(),
    ).subscribe(point => {
      this.pointId = schedulePointId(point);
      this.loadTemplate();
    }));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.loadSub?.unsubscribe();
  }

  private loadTemplate(): void {
    this.loadSub?.unsubscribe();
    this.template = null;
    this.loading = true;
    this.error = '';
    this.saveError = '';
    this.saved = false;
    this.loadSub = this.schedules.getTemplate(this.profileId, this.pointId).pipe(take(1)).subscribe({
      next: result => {
        this.loading = false;
        if (result?.code === 200 && result.data) {
          this.template = result.data as IViewScheduleTemplate;
          this.template.weekdays = [...this.template.weekdays].sort((a, b) => a.dayOfWeek - b.dayOfWeek);
          this.loadWorkTimes();
          return;
        }
        this.error = result?.message || 'Постоянный график не открылся';
      },
      error: () => {
        this.loading = false;
        this.error = 'Постоянный график не открылся';
      },
    });
  }

  back(): void {
    const week = this.route.snapshot.queryParamMap.get('week');
    this.router.navigate(['/ba-edit', this.profileId, 'schedule'], {
      queryParams: {
        week: week || null,
        point: this.route.snapshot.queryParamMap.get('point'),
      },
    });
  }

  ensureWork(day: IViewScheduleWeekday): void {
    if (!day.isDayOff && !day.work) {
      day.work = { start: timeFromMinutes(10 * 60), end: timeFromMinutes(19 * 60) };
    }
  }

  setWorking(day: IViewScheduleWeekday, working: boolean): void {
    this.saved = false;
    day.isDayOff = !working;
    this.ensureWork(day);
    this.workTimes[day.dayOfWeek] = { start: clock(day.work?.start), end: clock(day.work?.end) };
    if (!this.breakTimes[day.dayOfWeek]) {
      this.breakTimes[day.dayOfWeek] = { start: '', end: '' };
    }
    if (!working) {
      this.opened = null;
    } else {
      this.opened = day.dayOfWeek;
    }
  }

  toggleOpen(dayOfWeek: number): void {
    this.opened = this.opened === dayOfWeek ? null : dayOfWeek;
  }

  setWorkTime(day: IViewScheduleWeekday, edge: 'start' | 'end', value: string): void {
    this.saved = false;
    this.workTimes[day.dayOfWeek][edge] = value;
    const time = parseClock(value || '', edge === 'end');
    if (!time || !day.work) {
      return;
    }
    day.work = {
      start: edge === 'start' ? time : day.work.start,
      end: edge === 'end' ? time : day.work.end,
    };
  }

  addBreak(day: IViewScheduleWeekday): void {
    this.saved = false;
    this.breakOn[day.dayOfWeek] = true;
    this.breakTimes[day.dayOfWeek] = { start: '', end: '' };
    day.break = null;
    this.opened = day.dayOfWeek;
    this.timeError = '';
  }

  removeBreak(day: IViewScheduleWeekday): void {
    this.saved = false;
    this.breakOn[day.dayOfWeek] = false;
    this.breakTimes[day.dayOfWeek] = { start: '', end: '' };
    day.break = null;
    this.timeError = '';
  }

  setBreakTime(day: IViewScheduleWeekday, edge: 'start' | 'end', value: string): void {
    this.saved = false;
    if (!this.breakTimes[day.dayOfWeek]) {
      this.breakTimes[day.dayOfWeek] = { start: '', end: '' };
    }
    this.breakTimes[day.dayOfWeek][edge] = value;
    const start = parseClock(this.breakTimes[day.dayOfWeek].start);
    const end = parseClock(this.breakTimes[day.dayOfWeek].end, true);
    day.break = start && end && minutesOf(end) > minutesOf(start) ? { start, end } : null;
  }

  hasBreak(day: IViewScheduleWeekday): boolean {
    return !!this.breakOn[day.dayOfWeek];
  }

  fillWeekdays(): void {
    this.saved = false;
    if (!this.template) {
      return;
    }
    for (const day of this.template.weekdays) {
      if (day.dayOfWeek >= 1 && day.dayOfWeek <= 5) {
        day.isDayOff = false;
        day.work = { start: timeFromMinutes(10 * 60), end: timeFromMinutes(19 * 60) };
        day.break = null;
      } else {
        day.isDayOff = true;
        day.break = null;
      }
    }
    this.loadWorkTimes();
  }

  copyMonday(): void {
    this.saved = false;
    if (!this.template) {
      return;
    }
    const monday = this.template.weekdays.find(day => day.dayOfWeek === 1);
    if (!monday) {
      return;
    }
    for (const day of this.template.weekdays) {
      if (day.dayOfWeek === 1) {
        continue;
      }
      day.isDayOff = monday.isDayOff;
      day.work = monday.work ? { start: { ...monday.work.start }, end: { ...monday.work.end } } : null;
      day.break = monday.break ? { start: { ...monday.break.start }, end: { ...monday.break.end } } : null;
    }
    // Копируем и незаполненные поля: сохранение должно потребовать их заполнить.
    const times = this.workTimes[1];
    const breakTimes = this.breakTimes[1] ?? { start: '', end: '' };
    const breakOn = !!this.breakOn[1];
    for (const day of this.template.weekdays) {
      this.workTimes[day.dayOfWeek] = { ...times };
      this.breakTimes[day.dayOfWeek] = { ...breakTimes };
      this.breakOn[day.dayOfWeek] = breakOn;
    }
  }

  save(): void {
    if (!this.template || this.saving || !this.validateTimes()) {
      return;
    }
    this.saveError = '';
    this.saved = false;
    const body = this.payload(true);
    this.saving = true;
    this.sub.add(this.schedules.saveTemplate(this.profileId, body, this.pointId).pipe(take(1), finalize(() => this.saving = false)).subscribe({
      next: result => {
        if (result?.code === 200 && result.data) {
          this.template = result.data as IViewScheduleTemplate;
          this.loadWorkTimes();
          this.saved = true;
          this.toast.add({ severity: 'success', summary: 'Постоянный график сохранён', detail: 'Даты обновлены. Разовые изменения оставлены как есть.', life: 4000 });
          return;
        }
        this.saveError = result?.message || 'Не удалось применить график. Повторите сохранение.';
      },
      error: () => this.saveError = 'Не удалось применить график. Проверьте соединение и повторите сохранение.',
    }));
  }

  reset(date: string): void {
    if (this.saving) {
      return;
    }
    this.saving = true;
    this.sub.add(this.schedules.resetDay(this.profileId, date, this.pointId).pipe(take(1), finalize(() => this.saving = false)).subscribe({
      next: result => {
        if (result?.code === 200 && this.template) {
          this.template.skipped = this.template.skipped.filter(item => item !== date);
          this.template.lastWorkingDate = undefined;
          this.toast.add({ severity: 'success', summary: 'Возвращено', detail: formatScheduleDate(date), life: 4000 });
          return;
        }
        this.toast.add({ severity: 'error', summary: 'Не вернулось', detail: result?.message || 'Повторите', life: 5000 });
      },
      error: () => this.toast.add({ severity: 'error', summary: 'Не вернулось', detail: 'Повторите', life: 5000 }),
    }));
  }

  private payload(confirmed: boolean): IViewScheduleTemplate {
    return {
      ...this.template!,
      confirmed,
      weekdays: this.template!.weekdays.map(day => ({
        ...day,
        work: day.isDayOff ? null : day.work,
        break: day.isDayOff ? null : day.break,
      })),
    };
  }

  private loadWorkTimes(): void {
    this.timeError = '';
    this.workTimes = {};
    this.breakTimes = {};
    this.breakOn = {};
    for (const day of this.template?.weekdays ?? []) {
      this.workTimes[day.dayOfWeek] = { start: clock(day.work?.start), end: clock(day.work?.end) };
      this.breakOn[day.dayOfWeek] = !!day.break;
      this.breakTimes[day.dayOfWeek] = {
        start: day.break ? clock(day.break.start) : '',
        end: day.break ? clock(day.break.end) : '',
      };
    }
  }

  private validateTimes(): boolean {
    this.timeError = '';
    for (const day of this.template?.weekdays ?? []) {
      if (day.isDayOff) {
        continue;
      }
      const times = this.workTimes[day.dayOfWeek];
      const start = parseClock(times?.start);
      const end = parseClock(times?.end, true);
      let message = '';
      if (!start || !end) {
        message = 'Укажите время в полях «С» и «До».';
      } else if (minutesOf(end) <= minutesOf(start)) {
        message = 'Время «До» должно быть позже времени «С».';
      } else if (this.breakOn[day.dayOfWeek]) {
        const pause = this.breakTimes[day.dayOfWeek];
        const breakStart = parseClock(pause?.start);
        const breakEnd = parseClock(pause?.end, true);
        if (!breakStart || !breakEnd) {
          message = 'Укажите время перерыва в полях «С» и «До».';
        } else if (minutesOf(breakEnd) <= minutesOf(breakStart)) {
          message = 'Время «До» перерыва должно быть позже времени «С».';
        } else if (minutesOf(breakStart) < minutesOf(start) || minutesOf(breakEnd) > minutesOf(end)) {
          message = 'Перерыв должен быть в пределах часов приёма.';
        } else {
          day.break = { start: breakStart, end: breakEnd };
        }
      } else {
        day.break = null;
      }
      if (message) {
        this.opened = day.dayOfWeek;
        this.timeError = `${weekdayName(day.dayOfWeek)}: ${message}`;
        return false;
      }
      day.work = { start: start!, end: end! };
    }
    return true;
  }
}
