import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, Output} from '@angular/core';
import {Observable, Subject, map, takeUntil} from 'rxjs';

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
    // Приходит и с бэка, и выставляется локально, когда у услуги не пришла длительность:
    // раньше в этом случае блок просто оставался пустым без единого слова на экране.
    invalid_duration: 'Не удалось определить длительность услуги — обновите страницу или выберите услугу заново',
  };

  dateRecord: Date = new Date();
  dayId: string | null = null;

  status: SlotsStatus = 'idle';
  slots: IFreeSlotSchedule[] = [];
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

  @Output() setInterval = new EventEmitter<IChooseDayOfCalendar | null>();
  @Output() restoreFailed = new EventEmitter<void>();

  private lastRequestKey?: string;
  private restoredStart?: string;
  private readonly destroy$ = new Subject<void>();

  constructor(private readonly api: ScheduleService) {}

  ngOnChanges(): void {
    // `idle` — только когда день не выбран. Раньше сюда же попадали «день без dayId» и
    // «услуга без duration»: экран молча оставался пустым, «Далее» не активировалась
    // и пользователь не получал ни слотов, ни объяснения.
    if (!this.day?.date || !this.id) {
      this.lastRequestKey = undefined;
      this.restoredStart = undefined;
      this.status = 'idle';
      this.slots = [];
      this.emptyReason = null;
      return;
    }

    if (this.duration <= 0) {
      this.lastRequestKey = undefined;
      this.restoredStart = undefined;
      this.status = 'empty';
      this.slots = [];
      this.emptyReason = 'invalid_duration';
      return;
    }

    this.loadFreeSlots(this.day);
  }

  /** Текст пустого состояния. Показывается только при успешном ответе с пустым списком. */
  get emptyMessage(): string {
    const reason = this.emptyReason ?? '';
    return SetIntervalStartComponent.EMPTY_MESSAGES[reason] ?? 'Нет доступных слотов для записи';
  }

  retry(): void {
    if (!this.day) return;
    this.lastRequestKey = undefined;
    this.loadFreeSlots(this.day);
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

    const requestKey = `${this.id}:${day.dayId ?? ''}:${this.duration}:${this.mode}:${toCalendarDate(this.dateRecord)}`;
    if (requestKey === this.lastRequestKey) {
      // День и услуга те же — данные уже загружены, осталось разобрать восстановление черновика.
      this.restoreStartIfNeeded();
      return;
    }

    this.lastRequestKey = requestKey;
    this.restoredStart = undefined;
    this.status = 'loading';
    this.slots = [];
    this.emptyReason = null;

    this.requestSlots(day)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => this.applyResponse(response),
        // Сбой сети не должен стирать выбранную запись: показываем ошибку с «Повторить»,
        // черновик остаётся — restoreFailed здесь намеренно не эмитим.
        error: () => {
          this.status = 'error';
          this.slots = [];
          this.emptyReason = null;
        }
      });
  }

  private requestSlots(day: IChooseDayOfCalendar): Observable<IFreeSlotsResponse> {
    const isoDay = toCalendarDate(this.dateRecord);
    if (this.mode === 'master') {
      return this.api.getFreeSlotForDay(this.id!, this.duration, isoDay, day.dayId)
        .pipe(map(slots => ({slots: slots ?? [], reason: null})));
    }
    return this.api.getFreeSlotDetailed(this.id!, this.duration, day.dayId, isoDay);
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
    this.slots = this.mode === 'client'
      ? rawSlots.filter(item => !isPastBookingSlot(day, item.start))
      : rawSlots;

    // Запись создаётся по `daysOfScheduleId` — без него выбранное время нельзя отправить.
    // Показываем ошибку, а не чипы, ведущие в неактивную «Далее».
    if (this.slots.length > 0 && !this.dayId) {
      this.status = 'error';
      this.slots = [];
      this.emptyReason = null;
      return;
    }

    if (this.slots.length === 0) {
      // Бэк прислал слоты, но все они уже прошли — свой же предохранитель их вырезал.
      // Показываем тот же текст, что бэк дал бы сам при рабочем лид-тайме.
      this.status = 'empty';
      this.emptyReason = rawSlots.length > 0 ? 'too_late_today' : response.reason;
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
    this.destroy$.next();
    this.destroy$.complete();
  }
}
