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
        let day = this.workDays
          .find(_=> new Date(_.daysOfWork).getDate() === sub.day);
          if (day){
          sub.ifExist = true;
          sub.dayId = day.id;
          sub.canAdd = day.canAdd;
          sub.countNew = day.countNew;
          // sub.isChecked = !this.period ? false : this.checkedInterval(sub);
          sub.isToday = new Date(day.daysOfWork).getDate() === this.today?.getDate() ? true : false;
        }
          if (this.today) {
            if (sub.day === this.today.getDate() && this.month === this.today.getMonth()) {
              sub.isChecked = true;
              // sub.ifExist = true;
              if (this.choosedDay) {
                this.choosedDay.dayId = this.workDays
                    .find(_ => new Date(_.daysOfWork).getDate() === sub.day)?.id;
                this.choosedDay.ifExist = sub.ifExist;
              }
            }
          }
         
      });
    });
  }
  chooseDay(d: IViewCalendar) {
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
