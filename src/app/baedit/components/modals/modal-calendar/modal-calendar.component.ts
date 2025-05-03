import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IDaysOfSchedule, IPeriod} from "../../../../DTO/views/schedule/IViewSchedule";
import {comparisonDate, generateCalendar, getNameMonth} from "../../../../../helpers/dateUtils/dateUtils";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ScheduleService} from "../../../../../services/schedule.service";
import {IViewDateSchedule} from "../../../../DTO/requests/IViewDateSchedule";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal-calendar',
  templateUrl: './modal-calendar.component.html',
  styleUrls: ['./modal-calendar.component.css'],
  providers:[ScheduleService]
})
export class ModalCalendarComponent implements OnInit, OnDestroy {

  changePeriod(arg0: string) {
  throw new Error('Method not implemented.');
  }
  
  @Input() workDays: IDaysOfSchedule[] = [];
  @Input() scheduleId: string|undefined;
  @Input() work: IPeriod|null = null;
  @Input() break: IPeriod|null = null;
  @Input() profileId: string|null = null;
  today: Date = new Date();
  days: any[]  = [];
  monthDays: IDaysOfSchedule[] = [];
  busyDays: IDaysOfSchedule[] = [];
  workTime: string = '';
  breakTime: string = '';
  year: number = 0;
  month: number = 0;
  period: string[] = ['15 минут', '30 минут', '45 минут', '60 минут'];
  private unsubscribe$: Subscription|null = null;
  choosePeriod: string = this.period[0];
  constructor(private activeModal: NgbActiveModal,
              private _api: ScheduleService) {

  }
  ngOnDestroy(): void {
    this.unsubscribe$?.unsubscribe();
  }

  changeMonth(){
    this.monthDays = this.workDays.filter(_ =>
      new Date(_.daysOfWork).getMonth() === this.month);
      this.days.forEach(item => {
        item.forEach((sub: any) => {
          let day = this.monthDays
            .find(_=>
              new Date(_.daysOfWork).getDate() === sub.day);
          if (day){
            sub.ifExist = true;
            sub.dayId = day.id;
            sub.isChecked = true;
          }
        });
    });
  }

  setToday(){
    this.days.forEach(_ => {
      _.forEach((item: any) => {
        if (item.day) {
          if (item.day === this.today.getDate() && this.month === this.today.getMonth() && this.today.getFullYear() === this.year) {
            item.isToday = true;
          }
        }
      });
    });
  }
  ngOnInit() {
    this.year = this.today.getFullYear();
    this.month = this.today.getMonth();
    this.unsubscribe$ =  this._api.getAnotherDays(this.profileId!, {
      dateRequest: this.today,
      year: this.year,
      month: this.month + 1,
      scheduleId: this.scheduleId
    } as IViewDateSchedule)
      .subscribe(result => {
        this.busyDays = result;
        this.days = generateCalendar(this.year, this.month);
        this.setToday();
        if (this.workDays.length > 0) {
          // this.workDays.forEach(item => {
          //   item.daysOfWork = new Date(item.daysOfWork);
          // });
          this.changeMonth();
        }
        this.setBusyDay();
      });
    this.setTime();
  }

  setTime(){
    if (this.work){
      this.workTime = `c ${this.work.start.hour}:${this.work.start.minutes} до ${this.work.end.hour}:${this.work.end.minutes}`;
    }
    if (this.break){
      if (this.break.start !== this.break.end) {
        this.breakTime = `c ${this.break.start.hour}:${this.break.start.minutes} до ${this.break.end.hour}:${this.break.start.minutes}`;
      } else {
        this.breakTime = 'Нет перерыва';
      }
    }
  }

  initCalendar(date: Date){
   // this.days = generateCalendar(this.year, this.month);
    this.setTime();
    this.unsubscribe$ = this._api.getAnotherDays(this.profileId!, {
      year: this.year,
      month: this.month + 1,
      scheduleId: this.scheduleId
    } as IViewDateSchedule)
        .subscribe(result => {
          this.busyDays = result;
          this.days = generateCalendar(this.year, this.month);
          this.setToday();
          if (this.workDays.length > 0) {
            // this.workDays.forEach(item => {
            //   item.daysOfWork = new Date(item.daysOfWork);
            // });
            this.changeMonth();
          }
          this.setBusyDay();
        });

  }
  setBusyDay(){
    this.days.forEach(item => {
      item.forEach((sub: any) => {
        let day = this.busyDays
          .find(_ =>
            new Date(_.daysOfWork).getDate() === new Date(this.year, this.month + 1, sub.day, 0,0, 0).getDate());
        if (day) {
          sub.isBusy = true;
        }
      });
    });
  }
  addDays(day: any){
    if (!day.isBusy) {
      day.ifExist = !day.ifExist;
      day.isChecked = !day.isChecked;

      if (day.ifExist) {
        let temp = {
          daysOfWork: new Date(Date.UTC(this.year, this.month, day.day, 0, 0, 0)),
          scheduleId: this.scheduleId ?? undefined,
        };
        this.monthDays.push(temp);
        this.workDays.push(temp);
      } else {
        this.monthDays = this.monthDays.filter(_ => new Date(_.daysOfWork).getDate() !== day.day);
        this.workDays = this.workDays.filter(_ => comparisonDate(_.daysOfWork, this.year, this.month, day.day));
        
      }
    } else {
      day.isChecked = !day.isChecked;
    }
  }
  saveChanges() {
    this.activeModal.close(this.workDays);
  }


  async backMonth() {
    this.month = this.month - 1;

    if (this.month === -1){
      this.year = this.year - 1;
      this.month = 11;
    }
    let date = new Date(this.year, this.month,
        1, 1, 1, 1);


     this.initCalendar(date);
  }

  async nextMonth() {
    this.month = this.month + 1;
    if (this.month === 12){
      this.year = this.year + 1;
      this.month = 0;
    }

    let date = new Date(this.year, this.month,
        1, 1, 1, 1);
    this.initCalendar(date);
  }

  protected readonly getNameMonth = getNameMonth;


  close(){
    this.activeModal.close();
  }


}
