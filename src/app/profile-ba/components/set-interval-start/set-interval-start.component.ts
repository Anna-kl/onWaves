import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, Output} from '@angular/core';
import {Observable, Subject, Subscription, map, takeUntil} from 'rxjs';

import {IFreeSlotSchedule} from '../../../DTO/views/schedule/IFreeSlotSchedule';
import {FreeSlotsReason, IFreeSlotsResponse} from '../../../DTO/views/schedule/IFreeSlotsResponse';
import {setTime, toHoursMinutesString} from '../../../../helpers/dateUtils/dateUtils';
import {IChooseDayOfCalendar} from '../../../DTO/views/calendar/IChooseDayOfCalendar';
import {ScheduleService} from '../../../../services/schedule.service';
import {isPastBookingSlot, toCalendarDate} from '../../helpers/booking-date';

/**
 * Состояние блока слотов. Ровно одно значение за раз — поэтому «список слотов» и
 * «нет доступных слотов» больше не могут оказаться на экране одновременно, как это
 * было при рассинхроне SSR-рендера и клиентского.
 */
type SlotsStatus = 'idle' | 'loading' | 'ready' | 'empty' | 'error';

interface SlotGroup {
  key: 'morning' | 'day' | 'evening';
  label: string;
  slots: IFreeSlotSchedule[];
}

@Component({
  selector: 'app-set-interval-start',
  templateUrl: './set-interval-start.component.html',
  styleUrls: ['./set-interval-start.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class SetIntervalStartComponent implements OnChanges, OnDestroy {
  /** Тексты пустого ответа по `reason` с бэка. Незнакомая причина — общий текст. */
  private static readonly EMPTY_MESSAGES: Record<string, string> = {
    not_working_day: 'В этот день мастер не работает',
    day_passed: 'Этот день уже прошёл — выберите другую дату',
    too_late_today: 'На сегодня запись закрыта — выберите другой день',
    fully_booked: 'Все окна на этот день заняты',
    service_too_long: 'Для этой услуги нужно больше свободного времени — выберите другой день',
  };

  dateRecord: Date = new Date();
  dayId: string | null = null;

  status: SlotsStatus = 'idle';
  slots: IFreeSlotSchedule[] = [];
  groups: SlotGroup[] = [];
  readonly skeleton = Array.from({length: 8});
  emptyReason: FreeSlotsReason | string | null = null;

  @Input() id: string | null = null;
  @Input() duration = 0;
  @Input() day: IChooseDayOfCalendar | null = null;
  @Input() start?: string;
  @Input() errorEmpty = false;
  /**
   * `client` — онлайн-запись: слоты берём из ручки, которая уже отсекла прошедшее время и лид-тайм.
   * `master` — мастер заводит запись руками: нужна легаси-ручка без фильтрации по времени,
   * иначе пропадёт возможность поставить запись впритык или задним числом.
   */
  @Input() mode: 'client' | 'master' = 'client';
  /** Точка приёма. Пусто — график выезда, онлайна или единственной точки на сервере. */
  @Input() pointId: string | null = null;
  /** Тон пустого ответа: в кабинете мастера не пишем «мастер не работает». */
  @Input() voice: 'client' | 'master' = 'client';

  @Output() setInterval = new EventEmitter<IChooseDayOfCalendar | null>();
  @Output() restoreFailed = new EventEmitter<void>();

  private lastRequestKey?: string;
  private restoredStart?: string;
  private slotsRequest?: Subscription;
  private readonly destroy$ = new Subject<void>();

  constructor(private readonly api: ScheduleService) {}

  ngOnChanges(): void {
    // `idle` — день не выбран или у услуги нет длительности.
    // «Без ограничений» и почасовая без выбранных часов дают 0 минут: это не поломка,
    // слоты строить не из чего. Текст «обновите страницу» здесь врал.
    if (!this.day?.date || !this.id || this.duration <= 0) {
      this.slotsRequest?.unsubscribe();
      if (this.selectedSlot) this.setInterval.emit(null);
      this.dayId = null;
      this.lastRequestKey = undefined;
      this.restoredStart = undefined;
      this.status = 'idle';
      this.setSlots([]);
      this.emptyReason = null;
      return;
    }

    this.loadFreeSlots(this.day);
  }

  /** Текст пустого состояния. Показывается только при успешном ответе с пустым списком. */
  get emptyMessage(): string {
    const reason = this.emptyReason ?? '';
    if (this.voice === 'master') {
      const master: Record<string, string> = {
        not_working_day: 'В этот день нет рабочего графика',
        day_passed: 'Этот день уже прошёл — выберите другую дату',
        too_late_today: 'На сегодня свободных окон уже нет — выберите другой день',
        fully_booked: 'Все окна на этот день заняты',
        service_too_long: 'Услуга не помещается в свободные окна этого дня',
      };
      return master[reason] ?? 'Нет свободных окон';
    }
    return SetIntervalStartComponent.EMPTY_MESSAGES[reason] ?? 'Нет доступных слотов для записи';
  }

  retry(): void {
    if (!this.day) return;
    this.lastRequestKey = undefined;
    this.loadFreeSlots(this.day);
  }

  get selectedSlot(): IFreeSlotSchedule | undefined {
    return this.slots.find(item => item.isChoose);
  }

  get slotsCountLabel(): string {
    const n = this.slots.length;
    const mod10 = n % 10;
    const mod100 = n % 100;
    const word = mod10 === 1 && mod100 !== 11 ? 'свободное окно'
      : mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14) ? 'свободных окна'
      : 'свободных окон';
    return `${n} ${word}`;
  }

  get durationLabel(): string {
    const hours = Math.floor(this.duration / 60);
    const minutes = this.duration % 60;
    return [hours ? `${hours} ч` : '', minutes ? `${minutes} мин` : ''].filter(Boolean).join(' ');
  }

  /** Конец визита для подписи на выбранном чипе. Только отображение, в запись не уходит. */
  endTime(slot: IFreeSlotSchedule): string {
    const [h, m] = String(slot.start).split(':').map(Number);
    const total = (h * 60 + m + this.duration) % (24 * 60);
    return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
  }

  trackGroup(_: number, group: SlotGroup): string {
    return group.key;
  }

  trackSlot(_: number, slot: IFreeSlotSchedule): string {
    return String(slot.start);
  }

  private setSlots(slots: IFreeSlotSchedule[]): void {
    this.slots = slots;
    const groups: SlotGroup[] = [
      {key: 'morning', label: 'Утро', slots: []},
      {key: 'day', label: 'День', slots: []},
      {key: 'evening', label: 'Вечер', slots: []},
    ];
    for (const slot of slots) {
      const hour = Number(String(slot.start).split(':')[0]);
      groups[hour < 12 ? 0 : hour < 17 ? 1 : 2].slots.push(slot);
    }
    this.groups = groups.filter(group => group.slots.length > 0);
  }

  private loadFreeSlots(day: IChooseDayOfCalendar): void {
    // `dayId` может не прийти (нерабочий день, день без материализованной строки расписания).
    // Это не повод молчать: у ручки есть запасной ключ — ISO-дата, и она сама объяснит
    // пустой ответ через `reason` (`not_working_day` и т.д.).
    this.dayId = day.dayId ?? null;
    this.dateRecord = new Date(
      day.date!.getFullYear(),
      day.date!.getMonth(),
      day.date!.getDate(),
      0, 0, 0, 0
    );

    const requestKey = `${this.id}:${day.dayId ?? ''}:${this.duration}:${this.mode}:${toCalendarDate(this.dateRecord)}:${this.pointId ?? ''}`;
    if (requestKey === this.lastRequestKey) {
      // День и услуга те же — данные уже загружены, осталось разобрать восстановление черновика.
      this.restoreStartIfNeeded();
      return;
    }

    this.lastRequestKey = requestKey;
    this.slotsRequest?.unsubscribe();
    if (this.selectedSlot) this.setInterval.emit(null);
    this.restoredStart = undefined;
    this.status = 'loading';
    this.setSlots([]);
    this.emptyReason = null;

    this.slotsRequest = this.requestSlots(day)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => this.applyResponse(response),
        // Сбой сети не должен стирать выбранную запись: показываем ошибку с «Повторить»,
        // черновик остаётся — restoreFailed здесь намеренно не эмитим.
        error: () => {
          this.status = 'error';
          this.setSlots([]);
          this.emptyReason = null;
        }
      });
  }

  private requestSlots(day: IChooseDayOfCalendar): Observable<IFreeSlotsResponse> {
    const isoDay = toCalendarDate(this.dateRecord);
    if (this.mode === 'master') {
      return this.api.getFreeSlotForDay(this.id!, this.duration, isoDay, day.dayId, this.pointId)
        .pipe(map(slots => ({slots: slots ?? [], reason: null})));
    }
    return this.api.getFreeSlotDetailed(this.id!, this.duration, day.dayId, isoDay, this.pointId);
  }

  private applyResponse(response: IFreeSlotsResponse): void {
    const rawSlots = response.slots.map(item => ({
      ...item,
      start: toHoursMinutesString(String(item.start)),
      isChoose: false
    }));

    // Временный предохранитель: на бэке сейчас сломан расчёт «сейчас» в SlotCalculator
    // (docs/backend/booking-free-slots-consistency.md §8.4) — лид-тайм и day_passed не
    // применяются, уже прошедшие слоты сегодняшнего дня приходят как свободные. Отсекаем
    // их сами для клиентской записи, по бизнес-таймзоне (не по таймзоне хоста — иначе
    // получим тот же рассинхром SSR/CSR, который уже был). Мастера не трогаем — ему нужно
    // ставить записи впритык и задним числом. Снять после починки бэка.
    const day = toCalendarDate(this.dateRecord);
    this.setSlots(this.mode === 'client'
      ? rawSlots.filter(item => !isPastBookingSlot(day, item.start))
      : rawSlots);

    // Запись создаётся по `daysOfScheduleId` — без него выбранное время нельзя отправить.
    // Показываем ошибку, а не чипы, ведущие в неактивную «Далее».
    if (this.slots.length > 0 && !this.dayId) {
      this.status = 'error';
      this.setSlots([]);
      this.emptyReason = null;
      return;
    }

    if (this.slots.length === 0) {
      // Бэк прислал слоты, но все они уже прошли — свой же предохранитель их вырезал.
      // Показываем тот же текст, что бэк дал бы сам при рабочем лид-тайме.
      const reason = rawSlots.length > 0 ? 'too_late_today' : response.reason;
      // Контракт FreeSlotsReason: invalid_duration пользователю не показываем.
      if (reason === 'invalid_duration') {
        this.status = 'idle';
        this.emptyReason = null;
      } else {
        this.status = 'empty';
        this.emptyReason = reason;
      }
    } else {
      this.status = 'ready';
      this.emptyReason = null;
    }

    this.restoreStartIfNeeded();
  }

  /** Восстановление ранее выбранного времени. Слота нет в свежем списке — сообщаем наверх. */
  private restoreStartIfNeeded(): void {
    const wanted = this.start;
    if (!wanted || wanted === this.restoredStart || this.status === 'loading' || this.status === 'error') {
      return;
    }

    this.restoredStart = wanted;
    const found = this.slots.find(item => item.start === wanted);
    if (found) {
      this.chooseInterval(found);
    } else {
      this.restoreFailed.emit();
    }
  }

  chooseInterval(slot: IFreeSlotSchedule): void {
    if (this.status !== 'ready' || !this.slots.includes(slot)) return;
    const shouldChoose = !slot.isChoose;
    if (!shouldChoose) {
      // Клиент нажимает на уже выбранное время, чтобы подтвердить выбор, а не отменить его.
      // Снятие выбора оставляло экран со временем на глазах, но с неактивной «Далее»,
      // и человек решал, что кнопка сломана. Время меняют выбором другого слота.
      if (this.mode === 'client') {
        return;
      }
      this.slots.forEach(item => item.isChoose = false);
      this.setInterval.emit(null);
      return;
    }

    this.dateRecord = setTime(this.dateRecord, slot.start.toString());
    this.slots.forEach(item => item.isChoose = item.start === slot.start);
    this.errorEmpty = false;
    this.setInterval.emit({
      date: this.dateRecord,
      dayId: this.dayId,
      ifExist: true
    } as IChooseDayOfCalendar);
  }

  ngOnDestroy(): void {
    this.slotsRequest?.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
