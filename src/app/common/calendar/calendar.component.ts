import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
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
export class CalendarComponent implements OnChanges {

  days: IViewCalendar[][] = [];
  @Input() today: Date|null = new Date();
  choosedDay?: IChooseDayOfCalendar;
  user!: IViewBusinessProfile | null;
  @Output() onDate = new EventEmitter<IChooseDayOfCalendar>();
  @Output() clearInterval = new EventEmitter<boolean>();
  @Input('userId') userId: string|null = null;
  @Input() period?: string;
  @Input() isCabinet:boolean = false;
  @Input() type:string = 'BA';
  @Input() isUpdate?: string;
  workDays: Schedule[] = [];
  year = new Date().getFullYear();
  month = new Date().getMonth();
  constructor(private  _api: ScheduleService) {

  }
  async ngOnChanges(): Promise<void> {
    // if(this.type !== 'User' && this.userId && this.today){
    //   this._api.readCalendar(this.userId, this.today).subscribe(result => {
    //       console.log(result);
    //   });
    // }
    if (this.userId) {
      await this.getSchedule(this.userId!, this.year, this.month);
    }
    if (this.isUpdate){
      await this.getSchedule(this.userId!, this.year, this.month);
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

  async getSchedule(id: string, year: number, month: number) {
    (await this._api.getWorkDaysInMonth(id, year, month+1))
      .subscribe(async _ => {
        this.workDays = this._api.getWorkDayInMonth$.value;
        await this.changeToday(year, month, this.today ? this.today.getDate() : undefined);
        if(this.type !== 'User' && this.userId && this.choosedDay?.date){
            this._api.readCalendar(this.userId, this.choosedDay?.date).subscribe(result => {
                console.log(result);
            });
        }
        this.onDate.emit(this.choosedDay);
      });
  }

  async backMonth() {
    let month = this.month - 1;
    if (month === -1) {
      this.month = 11;
      this.year --;
    } else {
      this.month = month;
    }
    // this.checkIsToday();
    await this.getSchedule(this.userId!, this.year, this.month);
  }

  checkIsToday(){
    if (this.year === new Date().getFullYear() && this.month === new Date().getMonth()){
      this.today = new Date();
    }else {
      this.today = null;
    }
  }

  async nextMonth() {
    let month = this.month + 1;
    if (month === 12) {
      this.month = 0;
      this.year ++;
    }else{
      this.month = month;
    }
    // this.checkIsToday();
    await this.getSchedule(this.userId!, this.year, this.month);
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
    this.choosedDay = {
      ifExist: false,
      dayId: undefined,
      date: new Date(year, month, day ?? 1, 0, 0,0)
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
      if (!d.day || this.cellIsPast(d)) {
        return;
      }
        this.days = this.days.map(week => 
        week.map(x => x.dayId === d.dayId ? { ...x, countNew: 0 } : x)
      );
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
            this._api.readCalendar(this.userId, this.choosedDay?.date).subscribe(result => {
                console.log(result);
            });
        }
      this.onDate.emit(this.choosedDay);
    }


  protected readonly getNameMonth = getNameMonth;
}
