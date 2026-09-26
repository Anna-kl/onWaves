import {Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges} from '@angular/core';
import {Subscription} from 'rxjs';
import {ScheduleService} from "../../../services/schedule.service";
import {generateCalendar, getNameMonth, setDayInMonth, setMonth} from "../../../helpers/dateUtils/dateUtils";
import {BusService} from "../../../services/busService";
import {IViewCalendar} from "../../DTO/views/calendar/IViewCalendar";
import {IChooseDayOfCalendar} from "../../DTO/views/calendar/IChooseDayOfCalendar";
import {Schedule} from "../../DTO/classes/schedules/schedule";
import {IViewBusinessProfile} from "../../DTO/views/business/IViewBussinessProfile";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [ScheduleService]
})
export class CalendarComponent implements OnChanges, OnDestroy {

  days: IViewCalendar[][] = [];
  @Input() today: Date|null = new Date();
  choosedDay?: IChooseDayOfCalendar;
  user!: IViewBusinessProfile | null;
  @Output() onDate = new EventEmitter<IChooseDayOfCalendar>();
  @Output() clearInterval = new EventEmitter<boolean>();
  @Input('userId') userId: string|null = null;
  /** Услуга, под которую считать занятость дня. Без неё бэк отдаёт `canAdd` по старой эвристике. */
  @Input() serviceId: string|null = null;
  @Input() initialWorkDays: Schedule[] | null = null;
  @Input() period?: string;
  @Input() isCabinet:boolean = false;
  @Input() type:string = 'BA';
  @Input() isUpdate?: string;
  workDays: Schedule[] = [];
  /** Месяц не загрузился. Показываем «Повторить» вместо разметки прошлого месяца. */
  loadError = false;
  private scheduleSubscription?: Subscription;
  private scheduleRequestId = 0;
  /** Родитель сам грузит расписание и передаёт его входом — свой запрос не дублируем. */
  private parentOwnsWorkDays = false;
  year = new Date().getFullYear();
  month = new Date().getMonth();
  constructor(private  _api: ScheduleService) {

  }
  ngOnChanges(changes: SimpleChanges): void {
    // if(this.type !== 'User' && this.userId && this.today){
    //   this._api.readCalendar(this.userId, this.today).subscribe(result => {
    //       console.log(result);
    //   });
    // }
    if (changes['initialWorkDays']) {
      this.parentOwnsWorkDays = true;
    }

    // Месяц синхронизируем с `today` только когда родитель его реально поменял. Раньше это
    // делалось на каждый ngOnChanges и сбрасывало месяц, выбранный стрелками.
    if (changes['today'] && this.today && !isNaN(this.today.getTime())) {
      this.year = this.today.getFullYear();
      this.month = this.today.getMonth();
    }

    // Применяем данные родителя только в момент их прихода. Любой другой ngOnChanges после
    // перелистывания месяца накладывал бы разметку чужого месяца на текущую сетку: все
    // пометки доступности пропадали, а `dayId` выбранного дня становился undefined.
    if (changes['initialWorkDays'] && this.initialWorkDays !== null) {
      this.scheduleSubscription?.unsubscribe();
      this.loadError = false;
      this.workDays = this.initialWorkDays;
      this.changeToday(this.year, this.month, this.today?.getDate());
      if (this.choosedDay) this.onDate.emit(this.choosedDay);
      return;
    }

    // Родитель ещё грузит расписание — ждём его, а не шлём второй days-in-month.
    if (this.parentOwnsWorkDays && this.initialWorkDays === null) {
      return;
    }

    if (this.userId && (changes['userId'] || changes['isUpdate'] || changes['serviceId'])) {
      this.getSchedule(this.userId, this.year, this.month);
    }

  }

  checkedInterval(_t25: IViewCalendar) {
    if (this.today && this.period){
      let startDate = new Date(this.today);
      switch (this.period){
        case 'today': { startDate.setDate(this.today.getDate() - 1); break; }
        case 'week': { startDate.setDate(this.today.getDate() - 7); break; }
        case 'month': { startDate.setMonth(this.today.getMonth()-1); break; }

    }
      let tempDttm = new Date(this.year, this.month, _t25.day, 0,0,0,0);
      if (tempDttm < this.today && tempDttm > startDate){
        return true;
      }
     
    }
     return false;
  }

  getSchedule(id: string, year: number, month: number): void {
    const requestId = ++this.scheduleRequestId;
    this.scheduleSubscription?.unsubscribe();
    this.loadError = false;
    this.scheduleSubscription = this._api.getWorkDaysInMonth(id, year, month + 1, this.serviceId)
      .subscribe({
        next: workDays => {
          if (requestId !== this.scheduleRequestId || year !== this.year || month !== this.month) return;
          this.workDays = workDays;
          this.changeToday(year, month, this.today ? this.today.getDate() : undefined);
          if(this.type !== 'User' && this.userId && this.choosedDay?.date){
              this._api.readCalendar(this.userId, this.choosedDay?.date).subscribe({
                  next: result => console.log(result),
                  error: () => {}
              });
          }
          if (this.choosedDay) {
            this.onDate.emit(this.choosedDay);
          }
        },
        // Без обработчика ошибка уходила в глобальный ErrorHandler («ERROR …» в консоли),
        // а на экране оставалась разметка предыдущего месяца: дни выглядели свободными,
        // но их `dayId` относился к другому месяцу.
        error: () => {
          if (requestId !== this.scheduleRequestId) return;
          this.loadError = true;
          this.workDays = [];
          this.changeToday(year, month, this.today ? this.today.getDate() : undefined);
        }
      });
  }

  /** Повторная загрузка месяца после сетевой ошибки. */
  retryMonth(): void {
    if (this.userId) this.getSchedule(this.userId, this.year, this.month);
  }

  backMonth(): void {
    this.resetMonthSelection();
    let month = this.month - 1;
    if (month === -1) {
      this.month = 11;
      this.year --;
    } else {
      this.month = month;
    }
    // this.checkIsToday();
    if (this.userId) this.getSchedule(this.userId, this.year, this.month);
  }

  checkIsToday(){
    if (this.year === new Date().getFullYear() && this.month === new Date().getMonth()){
      this.today = new Date();
    }else {
      this.today = null;
    }
  }

  nextMonth(): void {
    this.resetMonthSelection();
    let month = this.month + 1;
    if (month === 12) {
      this.month = 0;
      this.year ++;
    }else{
      this.month = month;
    }
    // this.checkIsToday();
    if (this.userId) this.getSchedule(this.userId, this.year, this.month);
  }

  private resetMonthSelection(): void {
    this.today = null;
    this.choosedDay = undefined;
    this.clearInterval.emit(true);
  }

  ngOnDestroy(): void {
    this.scheduleRequestId++;
    this.scheduleSubscription?.unsubscribe();
  }

  /** Расписание на конкретную дату ячейки (год/месяц сетки + число). Без этого «сегодня» могло не совпасть с workDays при сравнении только по getDate(). */
  private scheduleForCell(year: number, month: number, dayOfMonth: number | undefined): Schedule | undefined {
    if (dayOfMonth == null) {
      return undefined;
    }
    return this.workDays.find(w => {
      const wDate = new Date(w.daysOfWork);
      return wDate.getFullYear() === year && wDate.getMonth() === month && wDate.getDate() === dayOfMonth;
    });
  }

  changeToday(year: number, month: number, day?: number){
    this.days = generateCalendar(year, month);
    this.choosedDay = day == null ? undefined : {
      ifExist: false,
      dayId: undefined,
      date: new Date(year, month, day, 0, 0, 0)
    };
    this.days.forEach(item => {
      item.forEach((sub: any) => {
        sub.isChecked = this.period === undefined ? false : this.checkedInterval(sub);
        const day = this.scheduleForCell(year, month, sub.day);
        if (day) {
          sub.ifExist = true;
          sub.dayId = day.id;
          sub.canAdd = day.canAdd;
          sub.countNew = day.countNew;
          const wDate = new Date(day.daysOfWork);
          sub.isToday =
            wDate.getFullYear() === this.today?.getFullYear() &&
            wDate.getMonth() === this.today?.getMonth() &&
            wDate.getDate() === this.today?.getDate();
        }
        if (this.today) {
          if (
            sub.day === this.today.getDate() &&
            month === this.today.getMonth() &&
            year === this.today.getFullYear()
          ) {
            sub.isChecked = true;
            if (this.choosedDay) {
              const sel = this.scheduleForCell(year, month, sub.day);
              this.choosedDay.dayId = sel?.id;
              this.choosedDay.ifExist = !!sel;
              if (sel) {
                this.choosedDay.canAdd = sel.canAdd;
                this.choosedDay.countNew = sel.countNew;
              }
            }
          }
        }

      });
    });
  }
  /** Начало календарного дня ячейки (00:00 локально). */
  private cellDate(d: IViewCalendar): Date | null {
    if (d.day == null) {
      return null;
    }
    return new Date(this.year, this.month, d.day, 0, 0, 0, 0);
  }

  private startOfToday(): Date {
    const t = new Date();
    return new Date(t.getFullYear(), t.getMonth(), t.getDate(), 0, 0, 0, 0);
  }

  /** День уже прошёл (строго до сегодняшней даты). */
  cellIsPast(d: IViewCalendar): boolean {
    const cd = this.cellDate(d);
    return cd != null && cd.getTime() < this.startOfToday().getTime();
  }

  /** Сегодняшняя дата на календаре (не путать с this.today — там выбранный день). */
  isRealToday(d: IViewCalendar): boolean {
    const cd = this.cellDate(d);
    return cd != null && cd.getTime() === this.startOfToday().getTime();
  }

  /** Есть свободные слоты (рабочий день и можно добавить запись). */
  hasFreeSlots(d: IViewCalendar): boolean {
    return !!(d.ifExist && d.canAdd === true);
  }

  /** Рабочий день в будущем/сегодня, но свободных слотов нет (занято / нельзя записаться). */
  isFullyBookedWorkDay(d: IViewCalendar): boolean {
    return !!(d.ifExist && d.canAdd !== true && !this.cellIsPast(d));
  }

  chooseDay(d: IViewCalendar) {
      // При ошибке загрузки месяца разметки нет: клик дал бы день без `dayId`,
      // и блок времени молча остался бы пустым.
      if (!d.day || this.cellIsPast(d) || this.loadError) {
        return;
      }
      this.today = new Date(this.year, this.month, d.day, 0,0,0);
      this.changeToday(this.year, this.month);
      this.choosedDay = {
        date: this.today,
        ifExist: d.ifExist,
        dayId: d.dayId,
        isLast: d.isLast,
        canAdd: d.canAdd,
        countNew: d.countNew,
      };
       if(this.type !== 'User' && this.userId && this.choosedDay?.date){
            this._api.readCalendar(this.userId, this.choosedDay?.date).subscribe({
                next: result => console.log(result),
                error: () => {}
            });
        }
      this.onDate.emit(this.choosedDay);
    }


  protected readonly getNameMonth = getNameMonth;
}
