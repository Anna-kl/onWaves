import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IDaysOfSchedule, IPeriod} from "../../../../DTO/views/schedule/IViewSchedule";
import {comparisonDate, generateCalendar, getNameMonth, localToUTC, toBusinessCalendarDate} from "../../../../../helpers/dateUtils/dateUtils";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ScheduleService} from "../../../../../services/schedule.service";
import {IViewDateSchedule} from "../../../../DTO/requests/IViewDateSchedule";
import {IViewScheduleBA} from "../../../../DTO/views/schedule/IViewScheduleBA";
import {RecordStatus} from "../../../../DTO/enums/recordStatus";
import { Subscription, take } from 'rxjs';
import { DayHasRecordsModalComponent } from '../day-has-records-modal/day-has-records-modal.component';

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
  checkingDay = false;
  constructor(private activeModal: NgbActiveModal,
              private modalService: NgbModal,
              private _api: ScheduleService) {

  }
  ngOnDestroy(): void {
    this.unsubscribe$?.unsubscribe();
  }

  changeMonth(){
    this.monthDays = this.workDays.filter(_ => this.isSameMonth(_.daysOfWork));
      this.days.forEach(item => {
        item.forEach((sub: any) => {
          if (!sub.day) {
            return;
          }
          let day = this.monthDays
            .find(_=>
              toBusinessCalendarDate(_.daysOfWork).getDate() === sub.day);
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
    if (this.break?.start && this.break?.end){
      const sameBreak =
        this.break.start.hour === this.break.end.hour &&
        this.break.start.minutes === this.break.end.minutes;
      if (sameBreak) {
        this.breakTime = 'Нет перерыва';
      } else {
        this.breakTime = `c ${this.break.start.hour}:${this.break.start.minutes} до ${this.break.end.hour}:${this.break.end.minutes}`;
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
            toBusinessCalendarDate(_.daysOfWork).getDate() === new Date(this.year, this.month + 1, sub.day, 0,0, 0).getDate());
        if (day) {
          sub.isBusy = true;
        }
      });
    });
  }
  addDays(day: any){
    if (!day.day || this.checkingDay) {
      return;
    }
    if (day.isBusy) {
      day.isChecked = !day.isChecked;
      return;
    }
    if (day.ifExist || day.isChecked) {
      this.tryUnselectDay(day);
      return;
    }
    const already = this.findWorkDay(day.day);
    if (already) {
      day.ifExist = true;
      day.isChecked = true;
      day.dayId = already.id;
      if (!this.monthDays.includes(already)) {
        this.monthDays.push(already);
      }
      return;
    }
    const temp = {
      daysOfWork: new Date(Date.UTC(this.year, this.month, day.day, 0, 0, 0)),
      scheduleId: this.scheduleId ?? undefined,
    };
    day.ifExist = true;
    day.isChecked = true;
    this.monthDays.push(temp);
    this.workDays.push(temp);
  }

  private tryUnselectDay(day: any): void {
    const existing = this.findWorkDay(day.day);
    if (!existing?.id || !this.profileId) {
      this.unselectDay(day);
      return;
    }
    this.checkingDay = true;
    const date = new Date(this.year, this.month, day.day);
    this._api.getProfileScheduleBA(this.profileId, {
      dateRequest: localToUTC(date),
      scheduleId: this.scheduleId ?? null
    } as IViewDateSchedule).pipe(take(1)).subscribe({
      next: list => {
        this.checkingDay = false;
        const records = this.onlyBookings(list);
        if (records.length) {
          this.openBusyDayModal(date, existing.id, records);
          return;
        }
        this.unselectDay(day);
      },
      error: () => {
        this.checkingDay = false;
        this.openBusyDayModal(date, existing.id, []);
      }
    });
  }

  private unselectDay(day: any): void {
    day.ifExist = false;
    day.isChecked = false;
    this.monthDays = this.monthDays.filter(_ => toBusinessCalendarDate(_.daysOfWork).getDate() !== day.day);
    this.workDays = this.workDays.filter(_ => comparisonDate(_.daysOfWork, this.year, this.month, day.day));
  }

  private onlyBookings(list: IViewScheduleBA[] | null | undefined): IViewScheduleBA[] {
    if (!Array.isArray(list)) {
      return [];
    }
    return list
      .map(row => this.normalizeBooking(row))
      .filter((row): row is IViewScheduleBA => !!row);
  }

  private normalizeBooking(row: IViewScheduleBA): IViewScheduleBA | null {
    const raw = row as IViewScheduleBA & {
      RecordId?: string;
      IsBreak?: boolean | string;
      Name?: string;
      Start?: Date;
      End?: Date;
      Services?: IViewScheduleBA['services'];
      Status?: number;
    };
    const recordId = row.recordId ?? raw.RecordId;
    // API отдаёт isBreak строкой, PascalCase-вариант — ещё и boolean
    const isBreak = String(row.isBreak ?? raw.IsBreak ?? '');
    const status = row.status ?? raw.Status;
    // Отмена не держит слот: иначе день нельзя снять, хотя журнал уже пуст
    if (!recordId || isBreak.toLowerCase() === 'true' || status === RecordStatus.Canceled) {
      return null;
    }
    return {
      ...row,
      recordId,
      name: row.name ?? raw.Name,
      start: row.start ?? raw.Start ?? null,
      end: row.end ?? raw.End,
      services: row.services ?? raw.Services ?? [],
      status: row.status ?? raw.Status
    };
  }

  private openBusyDayModal(date: Date, dayId: string | undefined, records: IViewScheduleBA[]): void {
    const modalRef = this.modalService.open(DayHasRecordsModalComponent, { centered: true });
    modalRef.componentInstance.date = date;
    modalRef.componentInstance.records = records;
    modalRef.componentInstance.profileId = this.profileId;
    modalRef.componentInstance.dayId = dayId;
    modalRef.result.then(result => {
      if (result === 'goto') {
        this.activeModal.dismiss();
      }
    }).catch(() => {});
  }

  private isSameMonth(value: Date | string): boolean {
    const d = toBusinessCalendarDate(value);
    return d.getFullYear() === this.year && d.getMonth() === this.month;
  }

  private findWorkDay(dayOfMonth: number): IDaysOfSchedule | undefined {
    return this.workDays.find(_ => !comparisonDate(_.daysOfWork, this.year, this.month, dayOfMonth));
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
