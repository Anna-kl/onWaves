import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, map, Observable, tap} from 'rxjs';

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
  constructor(private http: HttpClient) {
  }

  checkServiceAvailability(id: string, datetime: Date) {
    const url = `${this.baseUrl}schedules/check-available-record/${id}?datetime=${datetime.toDateString()}`;
    return this.http.get<IResponse>(url);
  }
  public getProfileScheduleBA(id: string, request: IViewDateSchedule){
    return this.http.post<IViewScheduleBA[]>(`${this.baseUrl}schedules/get-ba-schedule/${id}`,
        request);
  }

  readCalendar(id: string, today: Date){
    return this.http.get(`${this.baseUrl}schedules/read-calendar/${id}?date=${new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(),
      0,0,0)).toISOString()}`);
  }

  public getProfileScheduleCanceledBA(id: string, request: IViewDateSchedule){
    return this.http.post<IViewScheduleBA[]>(`${this.baseUrl}schedules/get-ba-canceled-schedule/${id}`, request).pipe(
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
  public getWorkDaysInMonth(id: string, year: number, month: number, serviceId?: string | null){
    const service = serviceId ? `&serviceId=${encodeURIComponent(serviceId)}` : '';
    return this.http.get<Schedule[]>(`${this.baseUrl}schedules/days-in-month?year=${year}&month=${month}&id=${id}${service}`).pipe(
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
  public  getFreeSlotForDay(id: string, duration: number, day?: string, dayId?: string){
  let send = { duration, day, dayId };
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
  public getFreeSlotDetailed(id: string, duration: number, dayId?: string, day?: string): Observable<IFreeSlotsResponse>{
    return this.http.post<IFreeSlotsResponse>(`${this.baseUrl}services/get-free-slot-detailed/${id}`, { duration, dayId, day })
      .pipe(map(normalizeFreeSlotsResponse));
  }


  /**
   * Функция удаляет карточку график работы.
   */
  public async deleteScheduleProfileCart(id: any){
    return await this.http.delete<IViewSchedule[]>(`${this.baseUrl}schedules/${id}`).pipe(
      tap(data => this.getSchedule$.next(data)));
  }









}
