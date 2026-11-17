import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, catchError, forkJoin, map, Observable, of, switchMap, tap} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

import { environment } from '../enviroments/environment';
import { toBusinessCalendarDate } from '../helpers/dateUtils/dateUtils';
import {Group} from "../app/DTO/views/services/IViewGroups";
import {Injectable} from "@angular/core";
import {IResponse} from "../app/DTO/classes/IResponse";
import {IFreeSlotSchedule} from "../app/DTO/views/schedule/IFreeSlotSchedule";
import {IFreeSlotsResponse} from "../app/DTO/views/schedule/IFreeSlotsResponse";
import {Schedule} from "../app/DTO/classes/schedules/schedule";
import {IDaysOfSchedule, IViewSchedule} from "../app/DTO/views/schedule/IViewSchedule";
import {IViewScheduleBA} from "../app/DTO/views/schedule/IViewScheduleBA";
import {IViewDateSchedule} from "../app/DTO/requests/IViewDateSchedule";
import {
  ISaveScheduleDay,
  IScheduleConflict,
  IViewPeriod,
  IViewScheduleDay,
  IViewScheduleTemplate,
  IViewScheduleWeek,
  IViewScheduleWeekday,
  IViewTime,
  mondayOf,
} from '../app/DTO/views/schedule/IViewScheduleWeek';
import { futureSameWeekdays, IClosePlan, planClose } from '../app/DTO/views/schedule/schedule-close';

/** JSON с бэка не приводится к интерфейсу TS: часто PascalCase (.NET), у объекта нет camelCase до нормализации. */
function pickJson(obj: Record<string, unknown>, camel: string, pascal: string): unknown {
  if (obj[camel] !== undefined && obj[camel] !== null) {
    return obj[camel];
  }
  if (obj[pascal] !== undefined && obj[pascal] !== null) {
    return obj[pascal];
  }
  return undefined;
}

function normalizeDaysInMonthRow(row: Schedule): Schedule {
  const r = row as unknown as Record<string, unknown>;
  const canRaw = pickJson(r, 'canAdd', 'CanAdd');
  let canAdd: boolean | undefined;
  if (typeof canRaw === 'boolean') {
    canAdd = canRaw;
  } else if (canRaw === 1 || canRaw === '1' || canRaw === 'true') {
    canAdd = true;
  } else if (canRaw === 0 || canRaw === '0' || canRaw === 'false') {
    canAdd = false;
  }
  const dowRaw = pickJson(r, 'daysOfWork', 'DaysOfWork');
  const daysOfWork = toBusinessCalendarDate(dowRaw instanceof Date ? dowRaw : String(dowRaw ?? ''));
  return {
    id: String(pickJson(r, 'id', 'Id') ?? ''),
    daysOfWork,
    addDate: String(pickJson(r, 'addDate', 'AddDate') ?? ''),
    scheduleId: String(pickJson(r, 'scheduleId', 'ScheduleId') ?? ''),
    canAdd,
    countNew: (() => {
      const n = pickJson(r, 'countNew', 'CountNew');
      return n === undefined || n === null ? undefined : Number(n);
    })(),
    freeSlotsCount: (() => {
      const n = pickJson(r, 'freeSlotsCount', 'FreeSlotsCount');
      return n === undefined || n === null ? null : Number(n);
    })(),
  };
}

/** Ответ ручки слотов: бэк может отдать PascalCase, а поле slots — отсутствовать вместо пустого массива. */
function normalizeFreeSlotsResponse(raw: IFreeSlotsResponse): IFreeSlotsResponse {
  const r = raw as unknown as Record<string, unknown>;
  const slots = pickJson(r, 'slots', 'Slots');
  const num = (camel: string, pascal: string) => {
    const v = pickJson(r, camel, pascal);
    return v === undefined || v === null ? undefined : Number(v);
  };
  return {
    slots: Array.isArray(slots) ? slots as IFreeSlotSchedule[] : [],
    reason: (pickJson(r, 'reason', 'Reason') as string | null) ?? null,
    timezone: (pickJson(r, 'timezone', 'TimeZone') ?? pickJson(r, 'timezone', 'Timezone')) as string | undefined,
    utcOffsetMinutes: num('utcOffsetMinutes', 'UtcOffsetMinutes'),
    minLeadTimeMinutes: num('minLeadTimeMinutes', 'MinLeadTimeMinutes'),
  };
}

@Injectable()
export class ScheduleService {
  private baseUrl = environment.Uri;

  public allSchedules$ = new BehaviorSubject<IFreeSlotSchedule[]>([]);
  public getToday$ = new BehaviorSubject<IResponse|null>(null);
  public getWorkDayInMonth$ = new BehaviorSubject<Schedule[]>([]);
  public getFreeSlot$ = new BehaviorSubject<IFreeSlotSchedule[]>([]);
  public freeSlotForDay$ = new BehaviorSubject<IFreeSlotSchedule[]>([]);
  public getSchedule$ = new BehaviorSubject<IViewSchedule[]>([]);
  public getScheduleBA$ = new BehaviorSubject<IViewScheduleBA[]>([]);
  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  private weekHeaders(): HttpHeaders {
    const token = this.cookieService.get('auth-token-ocpio');
    let headers = new HttpHeaders({
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    });
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }

  checkServiceAvailability(id: string, datetime: Date) {
    const url = `${this.baseUrl}schedules/check-available-record/${id}?datetime=${datetime.toDateString()}`;
    return this.http.get<IResponse>(url);
  }
  public getProfileScheduleBA(id: string, request: IViewDateSchedule, includeVisitPayment = false){
    return this.http.post<IViewScheduleBA[]>(`${this.baseUrl}schedules/get-ba-schedule/${id}`,
        request, { headers: this.weekHeaders() });
  }

  readCalendar(id: string, today: Date){
    return this.http.get(`${this.baseUrl}schedules/read-calendar/${id}?date=${new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(),
      0,0,0)).toISOString()}`);
  }

  public getProfileScheduleCanceledBA(id: string, request: IViewDateSchedule, includeVisitPayment = false){
    return this.http.post<IViewScheduleBA[]>(`${this.baseUrl}schedules/get-ba-canceled-schedule/${id}`,
      request, { headers: this.weekHeaders() }).pipe(
      tap(data => this.getScheduleBA$.next(data)));
  }

  public getAnotherDays(id: string, request: IViewDateSchedule){
      return this.http.post<IDaysOfSchedule[]>(`${this.baseUrl}schedules/get-another-days/${id}`, request);
  }

  public async getProfileScheduleToday(id: string){
    const today = new Date();
    return this.http.get<IResponse>(`${this.baseUrl}schedules/today/${id}
    ?date=${new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(),
      0,0,0)).toISOString()}`).pipe(
      tap(data => this.getToday$.next(data)));
  }

  saveSchedules(id: string, schedules: IViewSchedule[]){
    return this.http.post<IResponse>(`${this.baseUrl}schedules/${id}`, schedules);
  }
  public getScheduleProfile(id: string){
    // `_` сбивает HTTP transfer cache и браузерный GET: после PUT gap/period
    // тот же URL иначе отдаёт список до сохранения — селект прыгает назад.
    return this.http.get<IViewSchedule[]>(`${this.baseUrl}schedules/${id}`, {
      params: { _: String(Date.now()) },
      headers: new HttpHeaders({
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
      }),
    });
  }

  public updateSchedule(id: string, sch: IViewSchedule){
    return this.http.put<IResponse>(`${this.baseUrl}schedules/update-schedule/${id}`, sch);
  }

  /**
   * Дни месяца для календаря. С `serviceId` бэк считает `canAdd` тем же кодом, что и ручка
   * слотов («поместится ли ЭТА услуга»), плюс отсекает прошедшие дни и лид-тайм. Без него —
   * прежняя эвристика по самой короткой услуге мастера (её ждёт календарь БА, там нужен `countNew`).
   */
  public getWorkDaysInMonth(id: string, year: number, month: number, serviceId?: string | null, pointId?: string | null, duration?: number){
    const service = serviceId ? `&serviceId=${encodeURIComponent(serviceId)}` : '';
    const minutes = duration && duration > 0 ? `&duration=${duration}` : '';
    const point = pointQuery(pointId);
    return this.http.get<Schedule[]>(`${this.baseUrl}schedules/days-in-month?year=${year}&month=${month}&id=${id}${service}${point}${minutes}`).pipe(
      map(rows => rows.map(normalizeDaysInMonthRow)),
      tap(data => this.getWorkDayInMonth$.next(data)));
  }

  public async getScheduleForDay(id: string, dayId: string){
    return this.http.get<IFreeSlotSchedule[]>(`${this.baseUrl}schedules/get-free-slot-day/${id}?dayId=${dayId}`).pipe(
      tap(data => this.allSchedules$.next(data)));
  }

  public saveSchedule(id: string, schedule: IViewSchedule):Observable<IResponse>{
      return this.http.post<IResponse>(`${this.baseUrl}schedules/add-schedule/${id}`, schedule);
  }
  /**
   * Легаси-ручка: время НЕ фильтруется, отдаёт голый массив без объяснения пустоты.
   * Оставлена для сценариев мастера (запись можно поставить впритык и задним числом).
   * Для клиентской записи используйте `getFreeSlotDetailed`.
   */
  public  getFreeSlotForDay(id: string, duration: number, day?: string, dayId?: string, pointId?: string | null){
  let send = { duration, day, dayId, ...pointBody(pointId) };
    return this.http.post<IFreeSlotSchedule[]>(`${this.baseUrl}services/get-free-slot/${id}`, send);
        //.pipe(
      // tap(data => this.freeSlotForDay$.next(data)));
  }

  /**
   * Слоты для клиентской записи. Бэк сам отсекает прошедшее время и лид-тайм в таймзоне
   * бизнеса и объясняет пустой ответ полем `reason`. Клиентская фильтрация по локальному
   * времени больше не нужна — она давала разный результат при SSR и в браузере, из-за чего
   * на экране одновременно оказывались слоты и сообщение «нет доступных слотов».
   *
   * `dayId` — основной идентификатор; `day` (ISO `yyyy-MM-dd`) используется бэком как запасной.
   * Контракт: docs/backend/booking-free-slots-consistency.md
   */
  public getFreeSlotDetailed(id: string, duration: number, dayId?: string, day?: string, pointId?: string | null): Observable<IFreeSlotsResponse>{
    return this.http.post<IFreeSlotsResponse>(`${this.baseUrl}services/get-free-slot-detailed/${id}`, { duration, dayId, day, ...pointBody(pointId) })
      .pipe(map(normalizeFreeSlotsResponse));
  }


  /**
   * Функция удаляет карточку график работы.
   */
  public async deleteScheduleProfileCart(id: any){
    return await this.http.delete<IViewSchedule[]>(`${this.baseUrl}schedules/${id}`).pipe(
      tap(data => this.getSchedule$.next(data)));
  }

  /** Неделя мастера. `date` — любой день нужной недели; без него сервер отдаёт неделю «сегодня». */
  getWeek(profileId: string, date?: string | null, pointId?: string | null): Observable<IResponse> {
    const params: Record<string, string> = { _: String(Date.now()) };
    if (date && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
      params['date'] = date;
    }
    const point = `${pointId ?? ''}`.trim();
    if (point) params['pointId'] = point;
    return this.http.get<IResponse>(`${this.baseUrl}schedules/week/${profileId}`, {
      headers: this.weekHeaders(),
      params,
    }).pipe(map(body => ({ ...body, data: normalizeWeek(body?.data) })));
  }

  /** Интервал и пауза между услугами. Сервер пишет одно значение на все карточки графика. */
  saveRhythm(profileId: string, body: { period: number; gapAfterMinutes: number }, pointId?: string | null): Observable<IResponse> {
    return this.http.put<IResponse>(`${this.baseUrl}schedules/rhythm/${profileId}`, { ...body, ...pointBody(pointId) }, {
      headers: this.weekHeaders(),
    }).pipe(map(res => {
      const row = asRecord(res?.data);
      return {
        ...res,
        data: {
          period: asNumber(field(row, 'period', 'Period'), 30),
          gapAfterMinutes: asNumber(field(row, 'gapAfterMinutes', 'GapAfterMinutes')),
        },
      };
    }));
  }

  saveDay(profileId: string, body: ISaveScheduleDay, pointId?: string | null): Observable<IResponse> {
    return this.http.put<IResponse>(`${this.baseUrl}schedules/day/${profileId}`, { ...body, ...pointBody(pointId) }, {
      headers: this.weekHeaders(),
    });
  }

  /**
   * Закрыть окно тем же `schedules/day`, не меняя часы работы.
   * «Каждый такой день» — отдельные сохранения будущих дат: серверный scope weekday
   * переписывает часы недели и оставляет окно только на выбранной дате.
   */
  closeInterval(
    profileId: string,
    anchor: IViewScheduleDay,
    block: IViewPeriod,
    scope: 'day' | 'weekday',
    today: string,
    pointId?: string | null,
  ): Observable<IResponse> {
    const finish = (applied: string[], conflicts: IScheduleConflict[], skipped: number) => ({
      code: 200,
      message: '',
      data: { conflicts, applied, skipped },
    });
    if (scope !== 'weekday') {
      const plan = planClose(anchor, block, [anchor], today, 'day');
      if (!plan.bodies.length) {
        return of({ code: 400, message: closePlanMessage(plan), data: { conflicts: [], applied: [], skipped: 0 } });
      }
      return this.saveDay(profileId, plan.bodies[0], pointId).pipe(
        map(result => {
          if (result?.code !== 200) {
            return result;
          }
          return finish([anchor.date], conflictsOf(result.data), 0);
        }),
      );
    }
    const mondays = [...new Set(futureSameWeekdays(today || anchor.date, anchor.dayOfWeek).map(mondayOf))];
    const weeks$ = mondays.length
      ? forkJoin(mondays.map(date => this.getWeek(profileId, date, pointId).pipe(
        catchError(() => of({ code: 0, message: '', data: null } as IResponse)),
      )))
      : of([] as IResponse[]);
    return weeks$.pipe(switchMap(weeks => {
      const known: IViewScheduleDay[] = [];
      for (const week of weeks) {
        const days = (week?.data as IViewScheduleWeek | null)?.days ?? [];
        known.push(...days);
      }
      const plan = planClose(anchor, block, known, today || anchor.date, 'weekday');
      if (!plan.bodies.length) {
        return of({ code: 400, message: closePlanMessage(plan), data: { conflicts: [], applied: [], skipped: plan.skipped } });
      }
      return this.savePlanned(profileId, plan.bodies, pointId, [], [], plan.skipped);
    }));
  }

  private savePlanned(
    profileId: string,
    bodies: ISaveScheduleDay[],
    pointId: string | null | undefined,
    applied: string[],
    conflicts: IScheduleConflict[],
    skipped: number,
  ): Observable<IResponse> {
    const [current, ...rest] = bodies;
    if (!current) {
      return of({ code: 200, message: '', data: { conflicts, applied, skipped } });
    }
    return this.saveDay(profileId, current, pointId).pipe(
      catchError(() => of({ code: 0, message: 'Не сохранилось', data: null } as IResponse)),
      switchMap(result => {
        if (result?.code !== 200) {
          const done = applied.length ? ` Уже закрыто: ${applied.join(', ')}.` : '';
          return of({ ...result, message: `${result?.message || 'Не сохранилось'}${done}` });
        }
        return this.savePlanned(
          profileId,
          rest,
          pointId,
          [...applied, current.date],
          [...conflicts, ...conflictsOf(result.data)],
          skipped,
        );
      }),
    );
  }

  resetDay(profileId: string, date: string, pointId?: string | null): Observable<IResponse> {
    const params: Record<string, string> = { date };
    const point = `${pointId ?? ''}`.trim();
    if (point) params['pointId'] = point;
    return this.http.delete<IResponse>(`${this.baseUrl}schedules/day/${profileId}`, {
      headers: this.weekHeaders(),
      params,
    });
  }

  getTemplate(profileId: string, pointId?: string | null): Observable<IResponse> {
    const params: Record<string, string> = { _: String(Date.now()) };
    const point = `${pointId ?? ''}`.trim();
    if (point) params['pointId'] = point;
    return this.http.get<IResponse>(`${this.baseUrl}schedules/template/${profileId}`, {
      headers: this.weekHeaders(),
      params,
    }).pipe(map(body => ({ ...body, data: normalizeTemplate(body?.data) })));
  }

  saveTemplate(profileId: string, body: IViewScheduleTemplate, pointId?: string | null): Observable<IResponse> {
    return this.http.put<IResponse>(`${this.baseUrl}schedules/template/${profileId}`, { ...body, ...pointBody(pointId) }, {
      headers: this.weekHeaders(),
    }).pipe(map(res => ({ ...res, data: normalizeTemplate(res?.data) })));
  }

  saveWeekday(profileId: string, body: IViewScheduleWeekday, pointId?: string | null): Observable<IResponse> {
    return this.http.put<IResponse>(`${this.baseUrl}schedules/template/${profileId}/weekday`, { ...body, ...pointBody(pointId) }, {
      headers: this.weekHeaders(),
    }).pipe(map(res => ({ ...res, data: normalizeTemplate(res?.data) })));
  }
}

function pointBody(pointId?: string | null): { pointId?: string } {
  const point = `${pointId ?? ''}`.trim();
  return point ? { pointId: point } : {};
}

function pointQuery(pointId?: string | null): string {
  const point = `${pointId ?? ''}`.trim();
  return point ? `&pointId=${encodeURIComponent(point)}` : '';
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' ? value as Record<string, unknown> : {};
}

function field(obj: Record<string, unknown>, camel: string, pascal: string): unknown {
  if (obj[camel] !== undefined && obj[camel] !== null) {
    return obj[camel];
  }
  if (obj[pascal] !== undefined && obj[pascal] !== null) {
    return obj[pascal];
  }
  return undefined;
}

function asNumber(value: unknown, fallback = 0): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function asBool(value: unknown): boolean {
  return value === true || value === 1 || value === '1' || value === 'true';
}

function asTime(value: unknown): IViewTime | null {
  const row = asRecord(value);
  const hour = field(row, 'hour', 'Hour');
  const minutes = field(row, 'minutes', 'Minutes');
  if (hour === undefined || minutes === undefined) {
    return null;
  }
  return {
    hour: String(hour).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
  };
}

function asPeriod(value: unknown): IViewPeriod | null {
  if (!value) {
    return null;
  }
  const row = asRecord(value);
  const start = asTime(field(row, 'start', 'Start'));
  const end = asTime(field(row, 'end', 'End'));
  if (!start || !end) {
    return null;
  }
  return { start, end };
}

function asPeriods(value: unknown): IViewPeriod[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.map(asPeriod).filter((item): item is IViewPeriod => !!item);
}

function closePlanMessage(plan: IClosePlan): string {
  return plan.anchorIssue === 'outside'
    ? 'Этот день не рабочий или время вне часов работы. Сначала сохраните часы'
    : 'Это время уже закрыто';
}

function conflictsOf(value: unknown): IScheduleConflict[] {
  return asConflicts(field(asRecord(value), 'conflicts', 'Conflicts'));
}

function serviceNameOf(row: Record<string, unknown>): string {
  const direct = field(row, 'serviceName', 'ServiceName')
    ?? field(row, 'service', 'Service')
    ?? field(row, 'title', 'Title');
  if (typeof direct === 'string') {
    return direct.trim();
  }
  const services = field(row, 'services', 'Services');
  if (!Array.isArray(services) || !services.length) {
    return '';
  }
  const name = field(asRecord(services[0]), 'name', 'Name');
  return typeof name === 'string' ? name.trim() : '';
}

function asConflicts(value: unknown): IScheduleConflict[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.map(item => {
    const row = asRecord(item);
    return {
      recordId: (field(row, 'recordId', 'RecordId') as string | null) ?? null,
      start: String(field(row, 'start', 'Start') ?? ''),
      duration: asNumber(field(row, 'duration', 'Duration')),
      serviceName: serviceNameOf(row),
    };
  });
}

function asDay(value: unknown): IViewScheduleDay {
  const row = asRecord(value);
  return {
    date: String(field(row, 'date', 'Date') ?? ''),
    dayOfWeek: asNumber(field(row, 'dayOfWeek', 'DayOfWeek')),
    work: asPeriod(field(row, 'work', 'Work')),
    savedWork: asPeriod(field(row, 'savedWork', 'SavedWork')),
    break: asPeriod(field(row, 'break', 'Break')),
    blocks: asPeriods(field(row, 'blocks', 'Blocks')),
    breakShared: asBool(field(row, 'breakShared', 'BreakShared')),
    isDayOff: asBool(field(row, 'isDayOff', 'IsDayOff')),
    source: asNumber(field(row, 'source', 'Source')),
    isToday: asBool(field(row, 'isToday', 'IsToday')),
    isNearestWorking: asBool(field(row, 'isNearestWorking', 'IsNearestWorking')),
    updateDate: (field(row, 'updateDate', 'UpdateDate') as string | null) ?? null,
    conflicts: asConflicts(field(row, 'conflicts', 'Conflicts')),
  };
}

function asWeekday(value: unknown): IViewScheduleWeekday {
  const row = asRecord(value);
  return {
    dayOfWeek: asNumber(field(row, 'dayOfWeek', 'DayOfWeek')),
    work: asPeriod(field(row, 'work', 'Work')),
    break: asPeriod(field(row, 'break', 'Break')),
    isDayOff: asBool(field(row, 'isDayOff', 'IsDayOff')),
  };
}

function normalizeWeek(value: unknown): IViewScheduleWeek | null {
  if (!value) {
    return null;
  }
  const row = asRecord(value);
  const days = field(row, 'days', 'Days');
  return {
    lastWorkingDate: lastWorkingDate(row),
    scheduleMode: asNumber(field(row, 'scheduleMode', 'ScheduleMode')),
    templateConfirmed: asBool(field(row, 'templateConfirmed', 'TemplateConfirmed')),
    todayDate: String(field(row, 'todayDate', 'TodayDate') ?? ''),
    period: asNumber(field(row, 'period', 'Period')),
    gapAfterMinutes: asNumber(field(row, 'gapAfterMinutes', 'GapAfterMinutes')),
    days: Array.isArray(days) ? days.map(asDay) : [],
  };
}

function normalizeTemplate(value: unknown): IViewScheduleTemplate | null {
  if (!value) {
    return null;
  }
  const row = asRecord(value);
  const weekdays = field(row, 'weekdays', 'Weekdays');
  const skipped = field(row, 'skipped', 'Skipped');
  const existing = Array.isArray(weekdays) ? weekdays.map(asWeekday) : [];
  const period = asNumber(field(row, 'period', 'Period'));
  return {
    lastWorkingDate: lastWorkingDate(row),
    confirmed: asBool(field(row, 'confirmed', 'Confirmed')),
    period: period > 0 ? period : 30,
    gapAfterMinutes: asNumber(field(row, 'gapAfterMinutes', 'GapAfterMinutes')),
    weekdays: Array.from({ length: 7 }, (_, index) => existing.find(day => day.dayOfWeek === index + 1)
      ?? { dayOfWeek: index + 1, isDayOff: true, work: null, break: null }),
    skipped: Array.isArray(skipped) ? skipped.map(item => String(item)) : [],
  };
}

function lastWorkingDate(row: Record<string, unknown>): string | null | undefined {
  if (!('lastWorkingDate' in row) && !('LastWorkingDate' in row)) return undefined;
  const date = field(row, 'lastWorkingDate', 'LastWorkingDate');
  return date ? String(date) : null;
}
