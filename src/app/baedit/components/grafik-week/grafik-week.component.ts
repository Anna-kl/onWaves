import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { distinctUntilChanged, finalize, map, Subscription, take } from 'rxjs';
import { LoginService } from '../../../auth/login.service';
import { IViewBusinessProfile } from '../../../DTO/views/business/IViewBussinessProfile';
import {
  bookingOverlapWarning,
  closedRangeLabel,
  closeTimeError,
  quarterHours,
  weekdayRangeLabel,
} from '../../../DTO/views/schedule/schedule-close';
import {
  clock,
  dayRelation,
  formatScheduleDate,
  hoursLabel,
  IScheduleConflict,
  IViewPeriod,
  IViewScheduleDay,
  IViewScheduleWeek,
  mondayOf,
  parseClock,
  shiftIsoDate,
  weekdayShort,
  weekShiftAllowed,
  weekSpan,
} from '../../../DTO/views/schedule/IViewScheduleWeek';
import { selectProfileMainClient } from '../../../ngrx-store/mainClient/store.select';
import { ProfileService } from '../../../../services/profile.service';
import { ScheduleService } from '../../../../services/schedule.service';
import { ToastService } from '../../../../services/toast.service';
import { schedulePointId } from './grafik-point-switch.component';

@Component({
  selector: 'app-grafik-week',
  templateUrl: './grafik-week.component.html',
  styleUrls: ['./grafik-schedule.scss'],
  providers: [ScheduleService, ProfileService],
})
export class GrafikWeekComponent implements OnInit, OnDestroy {
  profile: IViewBusinessProfile | null = null;
  week: IViewScheduleWeek | null = null;
  loading = true;
  pending = false;
  rhythmSaving = false;
  rhythmError = '';
  error = '';
  readonly steps = [15, 30, 45, 60, 120];
  readonly gaps = [0, 15, 30, 45, 60];
  readonly hoursLabel = hoursLabel;
  readonly weekdayShort = weekdayShort;
  readonly formatScheduleDate = formatScheduleDate;
  readonly clock = clock;
  readonly weekdayRangeLabel = weekdayRangeLabel;
  readonly closedRangeLabel = closedRangeLabel;
  profileId = '';
  pointId: string | null = null;
  rhythmOpen = false;
  showPast = false;
  sheet: {
    day: IViewScheduleDay;
    start: string;
    end: string;
    scope: 'day' | 'weekday';
    error: string;
    saving: boolean;
  } | null = null;
  opening: { date: string; label: string } | null = null;
  private requestId = 0;
  private rhythmDecided = false;
  private focusDate = '';
  private sub = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store$: Store,
    private schedules: ScheduleService,
    private profiles: ProfileService,
    private login: LoginService,
    private toast: ToastService,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  ngOnInit(): void {
    this.profileId = this.route.parent?.parent?.snapshot.paramMap.get('id') ?? '';
    this.sub.add(this.store$.pipe(select(selectProfileMainClient)).subscribe(result => {
      if (!result) {
        return;
      }
      this.profile = new IViewBusinessProfile();
      this.profile.copyProfile(result);
    }));
    this.sub.add(this.route.queryParamMap.pipe(
      map(params => ({ week: params.get('week') ?? '', point: params.get('point') ?? '' })),
      distinctUntilChanged((left, right) => left.week === right.week && left.point === right.point),
    ).subscribe(({ week, point }) => {
      this.sheet = null;
      this.opening = null;
      const nextPoint = schedulePointId(point);
      if (nextPoint !== this.pointId) this.week = null;
      this.pointId = nextPoint;
      this.load(week || undefined);
    }));
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.sheet && !this.sheet.saving) {
      this.sheet = null;
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  load(date?: string): void {
    if (!this.profileId) {
      this.loading = false;
      this.pending = false;
      this.error = 'Профиль не найден';
      return;
    }
    const request = ++this.requestId;
    const first = !this.week;
    this.loading = first;
    this.pending = true;
    this.error = '';
    this.schedules.getWeek(this.profileId, date, this.pointId).pipe(take(1)).subscribe({
      next: result => {
        if (request !== this.requestId) {
          return;
        }
        this.loading = false;
        this.pending = false;
        if (result?.code === 200 && result.data) {
          this.week = result.data as IViewScheduleWeek;
          if (!this.rhythmDecided) {
            this.rhythmOpen = !(this.week.period > 0);
            this.rhythmDecided = true;
          }
          this.error = '';
          const focus = this.focusDate;
          this.focusDate = '';
          if (focus) {
            this.reveal(focus);
          }
          return;
        }
        if (first) {
          this.week = null;
        }
        this.error = result?.message || 'Не удалось открыть неделю';
      },
      error: () => {
        if (request !== this.requestId) {
          return;
        }
        this.loading = false;
        this.pending = false;
        if (first) {
          this.week = null;
        }
        this.error = 'Не удалось открыть неделю';
      },
    });
  }

  get canPrev(): boolean {
    return weekShiftAllowed(this.weekStart, this.week?.todayDate ?? '', -1);
  }

  get canNext(): boolean {
    return weekShiftAllowed(this.weekStart, this.week?.todayDate ?? '', 1);
  }

  get isCurrentWeek(): boolean {
    const start = this.weekStart;
    const today = this.week?.todayDate ?? '';
    return !start || !today || start === mondayOf(today);
  }

  get pastDaysCount(): number {
    return this.isCurrentWeek ? this.week?.days.filter(day => this.past(day)).length ?? 0 : 0;
  }

  get visibleDays(): IViewScheduleDay[] {
    const days = this.week?.days ?? [];
    return this.isCurrentWeek && !this.showPast ? days.filter(day => !this.past(day)) : days;
  }

  shiftWeek(step: -1 | 1): void {
    const start = this.weekStart;
    if (!start || this.pending || !weekShiftAllowed(start, this.week?.todayDate ?? '', step)) {
      return;
    }
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { week: shiftIsoDate(start, step * 7) },
      queryParamsHandling: 'merge',
    });
  }

  showCurrent(): void {
    if (this.pending || this.isCurrentWeek) {
      return;
    }
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { week: null },
      queryParamsHandling: 'merge',
    });
  }

  stepChoices(): number[] {
    return withCurrent(this.steps, this.week?.period ?? 0);
  }

  gapChoices(): number[] {
    return withCurrent(this.gaps, this.week?.gapAfterMinutes ?? 0);
  }

  intervalHint(): string {
    const step = this.steps.includes(this.week?.period ?? 0) ? this.week!.period : 30;
    const times = [0, 1, 2].map(index => minutesClock(10 * 60 + step * index));
    return `Клиент выбирает, во сколько начать запись. Шаг ${stepWords(step)}: ${times[0]}, ${times[1]} и ${times[2]}.`;
  }

  stepLabel(minutes: number): string {
    if (minutes === 60) {
      return '1 ч';
    }
    if (minutes === 120) {
      return '2 ч';
    }
    return `${minutes} мин`;
  }

  gapLabel(minutes: number): string {
    if (!minutes) {
      return 'Нет';
    }
    if (minutes === 60) {
      return '1 ч';
    }
    return `${minutes} мин`;
  }

  setRhythm(period: number, gap: number): void {
    if (!this.week || !this.profileId || this.rhythmSaving) {
      return;
    }
    if (this.week.period === period && this.week.gapAfterMinutes === gap) {
      return;
    }
    const nextPeriod = this.steps.includes(period) ? period : 30;
    const previous = { period: this.week.period, gap: this.week.gapAfterMinutes };
    this.week.period = nextPeriod;
    this.week.gapAfterMinutes = gap;
    this.rhythmSaving = true;
    this.rhythmError = '';
    this.schedules.saveRhythm(this.profileId, { period: nextPeriod, gapAfterMinutes: gap }, this.pointId).pipe(
      take(1),
      finalize(() => this.rhythmSaving = false),
    ).subscribe({
      next: result => {
        if (!this.week) {
          return;
        }
        if (result?.code === 200 && result.data) {
          this.week.period = result.data.period;
          this.week.gapAfterMinutes = result.data.gapAfterMinutes;
          if (!previous.period && this.week.period > 0) {
            this.rhythmOpen = false;
          }
          return;
        }
        this.week.period = previous.period;
        this.week.gapAfterMinutes = previous.gap;
        this.rhythmError = result?.message || 'Не сохранилось';
      },
      error: () => {
        if (!this.week) {
          return;
        }
        this.week.period = previous.period;
        this.week.gapAfterMinutes = previous.gap;
        this.rhythmError = 'Не сохранилось';
      },
    });
  }

  get rangeLabel(): string {
    return weekSpan((this.week?.days ?? []).map(day => day.date));
  }

  relation(day: IViewScheduleDay): string {
    if (day.isToday) {
      return 'сегодня';
    }
    return dayRelation(day.date, this.week?.todayDate ?? '');
  }

  past(day: IViewScheduleDay): boolean {
    const today = this.week?.todayDate ?? '';
    return !!today && day.date < today;
  }

  onRhythmToggle(event: Event): void {
    this.rhythmOpen = (event.target as HTMLDetailsElement).open;
  }

  canClose(day: IViewScheduleDay): boolean {
    return !this.past(day) && !day.isDayOff && !!day.work;
  }

  choices(day: IViewScheduleDay): string[] {
    return quarterHours(day.work);
  }

  openSheet(day: IViewScheduleDay): void {
    if (!this.canClose(day) || this.sheet?.saving || this.pending) {
      return;
    }
    this.opening = null;
    this.sheet = { day, start: '', end: '', scope: 'day', error: '', saving: false };
  }

  dismissSheet(): void {
    if (!this.sheet?.saving) {
      this.sheet = null;
    }
  }

  submitSheet(): void {
    const sheet = this.sheet;
    const week = this.week;
    if (!sheet || sheet.saving || !week) {
      return;
    }
    sheet.error = closeTimeError(sheet.start, sheet.end, sheet.day.work);
    if (sheet.error) {
      return;
    }
    const block = periodFrom(sheet.start, sheet.end);
    if (!block) {
      sheet.error = 'Укажите время в полях «С» и «До».';
      return;
    }
    if ((sheet.day.blocks ?? []).some(item => closedRangeLabel(item) === closedRangeLabel(block))) {
      sheet.error = 'Это время уже закрыто';
      return;
    }
    const range = closedRangeLabel(block);
    const scope = sheet.scope;
    sheet.saving = true;
    this.schedules.closeInterval(this.profileId, sheet.day, block, scope, week.todayDate, this.pointId).pipe(
      take(1),
      finalize(() => {
        if (this.sheet) {
          this.sheet.saving = false;
        }
      }),
    ).subscribe({
      next: result => {
        const data = result?.data as { conflicts?: IScheduleConflict[]; skipped?: number } | null;
        if (result?.code !== 200) {
          if (this.sheet) {
            this.sheet.error = result?.message || 'Не сохранилось';
          }
          return;
        }
        this.sheet = null;
        this.toast.add({
          severity: 'success',
          summary: `${range} закрыто. Клиенты не увидят это время`,
          detail: scope === 'weekday'
            ? `${weekdayRangeLabel(sheet.day.dayOfWeek, week.todayDate)}. Выходные и другие часы не менялись.`
            : '',
          life: 4000,
        });
        const warning = bookingOverlapWarning(data?.conflicts ?? []);
        if (warning) {
          this.toast.add({ severity: 'warn', summary: warning, life: 7000 });
        }
        this.focusDate = sheet.day.date;
        this.load(sheet.day.date);
      },
      error: () => {
        if (this.sheet) {
          this.sheet.error = 'Не сохранилось';
        }
      },
    });
  }

  openingBlock(day: IViewScheduleDay): IViewPeriod | null {
    if (this.opening?.date !== day.date) {
      return null;
    }
    return (day.blocks ?? []).find(block => closedRangeLabel(block) === this.opening?.label) ?? null;
  }

  askOpen(day: IViewScheduleDay, block: IViewPeriod): void {
    if (this.past(day)) {
      return;
    }
    this.opening = { date: day.date, label: closedRangeLabel(block) };
  }

  sameOpening(day: IViewScheduleDay, block: IViewPeriod): boolean {
    return this.opening?.date === day.date && this.opening.label === closedRangeLabel(block);
  }

  cancelOpen(): void {
    this.opening = null;
  }

  confirmOpen(day: IViewScheduleDay, block: IViewPeriod): void {
    if (this.past(day) || this.pending) {
      return;
    }
    const label = closedRangeLabel(block);
    const blocks = (day.blocks ?? []).filter(item => closedRangeLabel(item) !== label);
    this.pending = true;
    this.schedules.saveDay(this.profileId, {
      date: day.date,
      isDayOff: false,
      scope: 'day',
      expectedUpdateDate: day.updateDate,
      work: day.work,
      break: day.break,
      blocks,
      breakForSchedule: false,
    }, this.pointId).pipe(take(1), finalize(() => this.pending = false)).subscribe({
      next: result => {
        if (result?.code !== 200) {
          this.toast.add({ severity: 'error', summary: 'Не открылось', detail: result?.message || 'Повторите', life: 5000 });
          return;
        }
        this.opening = null;
        this.toast.add({ severity: 'success', summary: `${label} снова можно записаться`, life: 4000 });
        this.focusDate = day.date;
        this.load(day.date);
      },
      error: () => this.toast.add({ severity: 'error', summary: 'Не открылось', detail: 'Повторите', life: 5000 }),
    });
  }

  private reveal(date: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    setTimeout(() => {
      document.getElementById(`day-${date}`)?.scrollIntoView({ block: 'nearest' });
    });
  }

  private get weekStart(): string {
    const dates = (this.week?.days ?? []).map(day => day.date).filter(Boolean).sort();
    return dates[0] ?? '';
  }

  openDay(day: IViewScheduleDay): void {
    if (this.past(day)) {
      return;
    }
    this.router.navigate(['day', day.date], {
      relativeTo: this.route.parent,
      queryParams: { point: this.route.snapshot.queryParamMap.get('point') },
      queryParamsHandling: 'merge',
    });
  }

  openTemplate(): void {
    this.router.navigate(['template'], {
      relativeTo: this.route.parent,
      queryParamsHandling: 'merge',
    });
  }

  changeGetOrder(): void {
    if (!this.profile?.id || this.profile.isPromo) {
      if (this.profile) {
        this.profile.isGetOrder = false;
      }
      return;
    }
    this.profiles.changeIsGetOrder(this.profile.id, { isGetOrder: this.profile.isGetOrder }).subscribe(result => {
      if (result.code === 200) {
        this.login.updateProfile(this.profile!.id!);
      }
    });
  }
}

function periodFrom(startText: string, endText: string): IViewPeriod | null {
  const start = parseClock(startText);
  const end = parseClock(endText, true);
  if (!start || !end) {
    return null;
  }
  return { start, end };
}

function stepWords(minutes: number): string {
  if (minutes === 60) {
    return '1 час';
  }
  if (minutes === 120) {
    return '2 часа';
  }
  return `${minutes} минут`;
}

function minutesClock(total: number): string {
  const hour = Math.floor(total / 60);
  const minutes = total % 60;
  return `${hour}:${String(minutes).padStart(2, '0')}`;
}

function withCurrent(options: number[], current: number): number[] {
  if (!current || options.includes(current)) {
    return options;
  }
  return [...options, current].sort((a, b) => a - b);
}
