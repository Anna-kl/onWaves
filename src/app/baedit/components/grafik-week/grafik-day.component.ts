import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, distinctUntilChanged, finalize, map, of, Subscription, take } from 'rxjs';
import {
  bookingOverlapWarning,
  closedRangeLabel,
  closeTimeError,
  quarterHours,
  weekdayRangeLabel,
} from '../../../DTO/views/schedule/schedule-close';
import {
  clock,
  formatScheduleDate,
  IScheduleConflict,
  IViewPeriod,
  IViewScheduleDay,
  IViewScheduleWeek,
  IViewTime,
  minutesOf,
  parseClock,
  weekdayShort,
} from '../../../DTO/views/schedule/IViewScheduleWeek';
import { ScheduleService } from '../../../../services/schedule.service';
import { ToastService } from '../../../../services/toast.service';
import { schedulePointId } from './grafik-point-switch.component';

@Component({
  selector: 'app-grafik-day',
  templateUrl: './grafik-day.component.html',
  styleUrls: ['./grafik-schedule.scss'],
  providers: [ScheduleService],
})
export class GrafikDayComponent implements OnInit, OnDestroy {
  day: IViewScheduleDay | null = null;
  loading = true;
  error = '';
  saving = false;
  workError = '';
  breakError = '';
  blockErrors: string[] = [];
  isDayOff = false;
  isPast = false;
  hasBreak = false;
  breakChanged = false;
  breakStartText = '';
  breakEndText = '';
  startText = '10:00';
  endText = '19:00';
  closed: { startText: string; endText: string }[] = [];
  showCloseForm = false;
  closeStart = '';
  closeEnd = '';
  closeScope: 'day' | 'weekday' = 'day';
  closeError = '';
  pendingRelease: number | null = null;
  todayDate = '';
  readonly clock = clock;
  readonly weekdayShort = weekdayShort;
  readonly formatScheduleDate = formatScheduleDate;
  readonly weekdayRangeLabel = weekdayRangeLabel;
  profileId = '';
  pointId: string | null = null;
  private sub = new Subscription();
  private loadSub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private schedules: ScheduleService,
    private toast: ToastService,
  ) {}

  ngOnInit(): void {
    this.profileId = this.route.parent?.parent?.snapshot.paramMap.get('id') ?? '';
    this.sub.add(combineLatest([
      this.route.paramMap ?? of(this.route.snapshot.paramMap),
      this.route.queryParamMap ?? of(this.route.snapshot.queryParamMap),
    ]).pipe(
      map(([params, query]) => ({ date: params.get('date') ?? '', point: query.get('point') ?? '' })),
      distinctUntilChanged((a, b) => a.date === b.date && a.point === b.point),
    ).subscribe(({ date, point }) => this.loadDay(date, schedulePointId(point))));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.loadSub?.unsubscribe();
  }

  private loadDay(date = this.route.snapshot.paramMap.get('date') ?? '', point = this.pointId): void {
    this.loadSub?.unsubscribe();
    this.pointId = point;
    this.day = null;
    this.error = '';
    this.loading = true;
    this.loadSub = this.schedules.getWeek(this.profileId, date, this.pointId).pipe(take(1)).subscribe({
      next: result => {
        this.loading = false;
        const week = result?.data as IViewScheduleWeek | null;
        const found = week?.days?.find(item => item.date === date) ?? null;
        if (result?.code !== 200 || !found) {
          this.error = 'Этот день не открылся';
          return;
        }
        this.day = found;
        this.todayDate = week?.todayDate ?? '';
        this.isPast = !!week?.todayDate && found.date < week.todayDate;
        this.isDayOff = found.isDayOff;
        this.hasBreak = !!found.break;
        this.breakChanged = false;
        this.breakStartText = found.break ? clock(found.break.start) : '';
        this.breakEndText = found.break ? clock(found.break.end) : '';
        this.closed = (found.blocks ?? []).map(block => ({
          startText: clock(block.start),
          endText: clock(block.end),
        }));
        this.showCloseForm = false;
        this.closeStart = '';
        this.closeEnd = '';
        this.closeScope = 'day';
        this.closeError = '';
        this.pendingRelease = null;
        const work = found.work ?? found.savedWork;
        if (work) {
          this.startText = clock(work.start);
          this.endText = clock(work.end);
        }
      },
      error: () => {
        this.loading = false;
        this.error = 'Не удалось открыть день';
      },
    });
  }

  get breakPeriod(): IViewPeriod | null {
    return this.hasBreak ? periodOf(this.breakStartText, this.breakEndText) : null;
  }

  get workPeriod(): IViewPeriod | null {
    return periodOf(this.startText, this.endText);
  }

  get closedPeriods(): IViewPeriod[] {
    return this.closed
      .map(item => periodOf(item.startText, item.endText))
      .filter((item): item is IViewPeriod => !!item);
  }

  get scheduleLead(): string {
    if (this.isDayOff) {
      return 'Выходной. Клиенты не увидят окон.';
    }
    const schedule = `График работы с ${this.startText || '…'} до ${this.endText || '…'}`;
    if (!this.closedPeriods.length) {
      return `Только эта дата. ${schedule}.`;
    }
    const closed = this.closedPeriods.map(block => `${clock(block.start)}–${clock(block.end)}`).join(', ');
    return `${schedule}. Закрыто ${closed}.`;
  }

  get clientLabel(): string {
    const work = this.workPeriod;
    if (this.isDayOff) {
      return 'Выходной';
    }
    if (!work) {
      return 'Укажите часы работы';
    }
    return `${clock(work.start)}–${clock(work.end)}`;
  }

  get recordMarks(): { left: number; width: number }[] {
    return (this.day?.conflicts ?? [])
      .map(conflict => this.recordSpan(conflict.start, conflict.duration))
      .filter((mark): mark is { left: number; width: number } => !!mark);
  }

  span(from: IViewTime, to: IViewTime): { left: number; width: number } {
    return placeOnAxis(minutesOf(from), minutesOf(to));
  }

  addBreak(): void {
    if (this.isPast) {
      return;
    }
    this.hasBreak = true;
    this.breakChanged = true;
    this.breakError = '';
    this.breakStartText = '';
    this.breakEndText = '';
  }

  removeBreak(): void {
    if (this.isPast) {
      return;
    }
    this.hasBreak = false;
    this.breakChanged = true;
    this.breakError = '';
    this.breakStartText = '';
    this.breakEndText = '';
  }

  get closeChoices(): string[] {
    return quarterHours(this.workPeriod);
  }

  openCloseForm(): void {
    if (this.isPast || this.isDayOff) {
      return;
    }
    this.showCloseForm = true;
    this.closeError = '';
  }

  cancelCloseForm(): void {
    this.showCloseForm = false;
    this.closeStart = '';
    this.closeEnd = '';
    this.closeError = '';
  }

  askRelease(index: number): void {
    if (this.isPast) {
      return;
    }
    this.pendingRelease = index;
  }

  releaseBlock(index: number): void {
    if (!this.day || this.isPast || this.saving || index < 0 || index >= this.closed.length) {
      return;
    }
    const label = `${this.closed[index].startText}–${this.closed[index].endText}`;
    const blocks = this.closed
      .filter((_, item) => item !== index)
      .map(item => periodOf(item.startText, item.endText))
      .filter((item): item is IViewPeriod => !!item);
    this.pendingRelease = null;
    this.saving = true;
    this.schedules.saveDay(this.profileId, {
      date: this.day.date,
      isDayOff: false,
      scope: 'day',
      expectedUpdateDate: this.day.updateDate,
      work: this.workPeriod,
      break: this.breakPeriod,
      blocks,
      breakForSchedule: false,
    }, this.pointId).pipe(take(1), finalize(() => this.saving = false)).subscribe({
      next: result => {
        if (result?.code === 200) {
          this.toast.add({ severity: 'success', summary: `${label} снова можно записаться`, life: 4000 });
          this.loadDay();
          return;
        }
        this.toast.add({ severity: 'error', summary: 'Не открылось', detail: result?.message || 'Повторите', life: 5000 });
      },
      error: () => this.toast.add({ severity: 'error', summary: 'Не открылось', detail: 'Повторите', life: 5000 }),
    });
  }

  submitClose(): void {
    if (!this.day || this.isPast || this.isDayOff || this.saving) {
      return;
    }
    this.closeError = closeTimeError(this.closeStart, this.closeEnd, this.workPeriod);
    if (this.closeError) {
      return;
    }
    const block = periodOf(this.closeStart, this.closeEnd);
    if (!block) {
      this.closeError = 'Укажите время в полях «С» и «До».';
      return;
    }
    if (this.closedPeriods.some(item => closedRangeLabel(item) === closedRangeLabel(block))) {
      this.closeError = 'Это время уже закрыто';
      return;
    }
    const range = closedRangeLabel(block);
    const scope = this.closeScope;
    this.saving = true;
    this.schedules.closeInterval(
      this.profileId,
      { ...this.day, isDayOff: false, work: this.workPeriod, break: this.breakPeriod, blocks: this.closedPeriods },
      block,
      scope,
      this.todayDate || this.day.date,
      this.pointId,
    ).pipe(take(1), finalize(() => this.saving = false)).subscribe({
      next: result => {
        const data = result?.data as { conflicts?: IScheduleConflict[] } | null;
        if (result?.code !== 200) {
          this.closeError = result?.message || 'Не сохранилось';
          return;
        }
        this.toast.add({
          severity: 'success',
          summary: `${range} закрыто. Клиенты не увидят это время`,
          detail: scope === 'weekday' ? `${weekdayRangeLabel(this.day!.dayOfWeek, this.todayDate)}. Выходные и другие часы не менялись.` : '',
          life: 4000,
        });
        const warning = bookingOverlapWarning(data?.conflicts ?? []);
        if (warning) {
          this.toast.add({ severity: 'warn', summary: warning, life: 7000 });
        }
        this.loadDay();
      },
      error: () => {
        this.closeError = 'Не сохранилось';
      },
    });
  }

  back(): void {
    // day/:date — два сегмента, одного «..» мало: останется schedule/day без даты.
    this.router.navigate(['/ba-edit', this.profileId, 'schedule'], {
      queryParams: {
        week: this.day?.date ?? null,
        point: this.route.snapshot.queryParamMap.get('point'),
      },
    });
  }

  save(scope: 'day' | 'weekday'): void {
    if (!this.day || this.isPast || this.saving) {
      return;
    }
    this.workError = this.isDayOff ? '' : periodError(this.startText, this.endText);
    const work = this.workPeriod;
    this.breakError = !this.isDayOff && this.hasBreak
      ? periodError(this.breakStartText, this.breakEndText, work)
      : '';
    this.blockErrors = this.isDayOff ? [] : this.closed.map(block => periodError(block.startText, block.endText, work));
    if (this.workError || this.breakError || this.blockErrors.some(Boolean)) {
      return;
    }
    const dayBreak = this.isDayOff ? null : this.breakPeriod;
    this.saving = true;
    this.schedules.saveDay(this.profileId, {
      date: this.day.date,
      isDayOff: this.isDayOff,
      scope,
      expectedUpdateDate: this.day.updateDate,
      work: this.isDayOff ? null : work,
      break: dayBreak,
      blocks: this.isDayOff ? [] : this.closedPeriods,
      // Неизменённый собственный перерыв дня не должен становиться общим.
      breakForSchedule: false,
    }, this.pointId).pipe(take(1), finalize(() => this.saving = false)).subscribe({
      next: result => this.afterSave(result?.code, result?.message, result?.data),
      error: error => this.toast.add({ severity: 'error', summary: 'Не сохранилось', detail: error?.error?.message || 'Повторите', life: 5000 }),
    });
  }

  reset(): void {
    if (!this.day || this.isPast || this.saving) {
      return;
    }
    this.saving = true;
    this.schedules.resetDay(this.profileId, this.day.date, this.pointId).pipe(take(1), finalize(() => this.saving = false)).subscribe({
      next: result => {
        if (result?.code === 200) {
          this.toast.add({ severity: 'success', summary: 'Возвращено', detail: 'Часы снова как в постоянном графике', life: 4000 });
          this.back();
          return;
        }
        this.toast.add({ severity: 'error', summary: 'Не вернулось', detail: result?.message || 'Повторите', life: 5000 });
      },
      error: () => this.toast.add({ severity: 'error', summary: 'Не вернулось', detail: 'Повторите', life: 5000 }),
    });
  }

  private afterSave(code: number | undefined, message: string | undefined, data: unknown): void {
    if (code === 200) {
      const conflicts = (data as { conflicts?: unknown[] } | null)?.conflicts;
      const extra = Array.isArray(conflicts) && conflicts.length ? ' Записи в закрытых часах остаются.' : '';
      this.toast.add({ severity: 'success', summary: 'Сохранено', detail: `Часы обновлены.${extra}`, life: 4000 });
      this.back();
      return;
    }
    this.toast.add({ severity: 'error', summary: 'Не сохранилось', detail: message || 'Повторите', life: 5000 });
  }

  private recordSpan(start: string, duration: number): { left: number; width: number } | null {
    const match = /^(\d{1,2}):(\d{2})/.exec(start);
    if (!match) {
      return null;
    }
    const from = Number(match[1]) * 60 + Number(match[2]);
    return placeOnAxis(from, from + Math.max(duration, 15));
  }
}

function periodOf(startText: string, endText: string): IViewPeriod | null {
  const start = parseClock(startText);
  const end = parseClock(endText, true);
  if (!start || !end || minutesOf(end) <= minutesOf(start)) {
    return null;
  }
  return { start, end };
}

function periodError(start: string, end: string, work?: IViewPeriod | null): string {
  if (!parseClock(start) || !parseClock(end, true)) {
    return 'Укажите время в полях «С» и «До».';
  }
  const period = periodOf(start, end);
  if (!period) {
    return 'Время «До» должно быть позже времени «С».';
  }
  if (work && (minutesOf(period.start) < minutesOf(work.start) || minutesOf(period.end) > minutesOf(work.end))) {
    return 'Интервал должен быть в пределах рабочих часов.';
  }
  return '';
}

const AXIS_START = 0;
const AXIS_END = 24 * 60;

function placeOnAxis(from: number, to: number): { left: number; width: number } {
  const start = Math.max(from, AXIS_START);
  const end = Math.min(to, AXIS_END);
  const span = AXIS_END - AXIS_START;
  if (end <= start) {
    return { left: 0, width: 0 };
  }
  return {
    left: ((start - AXIS_START) / span) * 100,
    width: ((end - start) / span) * 100,
  };
}
