import {Component, OnDestroy, OnInit} from '@angular/core';
import {StatisticService} from "../../../services/statistic.service";
import {IViewProfit} from "../../DTO/views/statistic/IViewProfit";
import {IViewRecordsStatistic} from "../../DTO/views/statistic/IViewRecordsStatistic";
import {IViewClientsStatistic} from "../../DTO/views/statistic/IViewClientsStatistic";
import {IViewBusinessProfile} from "../../DTO/views/business/IViewBussinessProfile";
import {Store} from "@ngrx/store";
import { selectProfileMainClient} from "../../ngrx-store/mainClient/store.select";
import {IDaysOfSchedule, IPeriod, IViewSchedule} from "../../DTO/views/schedule/IViewSchedule";
import {ScheduleService} from "../../../services/schedule.service";
import {generateCalendar} from "../../../helpers/dateUtils/dateUtils";
import { IChooseDayOfCalendar } from 'src/app/DTO/views/calendar/IChooseDayOfCalendar';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-cabinet-ba',
  templateUrl: './cabinet-ba.component.html',
  styleUrls: ['./cabinet-ba.component.scss'],
  providers: [StatisticService, ScheduleService]
})
export class CabinetBAComponent implements OnInit, OnDestroy {
  period: string = 'today';
  amount: number = 0;

  profit$: Observable<IViewProfit>|null = null;
  currentDay = new Date();
  coefficient$: Observable<number> = new Observable();
  async onDate($event: IChooseDayOfCalendar) {
    if ($event.date){
      this.currentDay = $event.date;
      await this.getListClients($event.date);
      await this.getListRecords($event.date);
      await this.getProfit();
    }
  }

  setPeriod(arg0: string) {
    this.period = arg0;
   this.getProfit();
  }

  profile!: IViewBusinessProfile | null;
  today: Date = new Date();
  // profit: IViewProfit;
  monthDays: IDaysOfSchedule[] = [];
  records: IViewRecordsStatistic;
  clients: IViewClientsStatistic;
  days: any[] = [];
  allWorksDays: IDaysOfSchedule[] = [];
  schedules: IViewSchedule[] = [];
  private unsubscribe$: Subscription|null = null;
  endDate: Date = new Date();

  
  constructor(private _apiStatistic: StatisticService,
              private store$: Store,
              public _apiSchedule: ScheduleService,) {
      // this.profit = {
      //   countWorkDays: 0,
      //   profit: '0'
      // };
      this.records = {
        allRecord: 0,
        canceled: 0,
        pending: 0,
        complete: 0,
        confirm: 0
      };
      this.clients = {
        countClients: 0,
        constClients: 0,
        newClients: 0
      };
  }
  ngOnDestroy(): void {
    this.unsubscribe$?.unsubscribe();
  }

  async backMonth() {
    let month = this.today.getMonth() - 1;
    let year = this.today.getFullYear();
    if (month === 0){
      year = year - 1;
      month = 12;
    }
    let date = new Date(year, month,
        1, 1, 1, 1);
    this.today = date;

    await  this.initCalendar(date);
  }

  async nextMonth() {
    let month = this.today.getMonth() + 1;
    let year = this.today.getFullYear();
    if (month === 13){
      year = year + 1;
      month = 1;
    }

    let date = new Date(year, month,
        1, 1, 1, 1);
    this.today = date;
    await this.initCalendar(date);
  }

  async initCalendar(date: Date) {
    await this.getSchedule();
    await this.chooseDays({day: date.getDate()});
  }

  public getStartEnd(){
    let startDate = new Date(this.currentDay.getTime());
     let endDate = new Date(this.currentDay.getTime());
     
     switch (this.period){
      case 'today': { startDate.setDate(endDate.getDate() - 1); break; }
      case 'week': { startDate.setDate(endDate.getDate() - 7); break; }
      case 'month': { startDate.setMonth(endDate.getMonth()-1); break; }

    }
    return {startDate,  endDate};
  }

  public async getProfit(){
     let {startDate, endDate} = this.getStartEnd();
    //  let endDate = new Date(this.currentDay.getTime());
     
    //  switch (this.period){
    //   case 'today': { startDate.setDate(endDate.getDate() - 1); break; }
    //   case 'week': { startDate.setDate(endDate.getDate() - 7); break; }
    //   case 'month': { startDate.setMonth(endDate.getMonth()-1); break; }

    // }
    this.profit$ =  this._apiStatistic.getProfileProfit(this.profile?.id!, startDate, endDate);
  }

  public async getListRecords(date: Date){
     let {startDate, endDate} = this.getStartEnd();
    (await this._apiStatistic.getProfileRecords(this.profile?.id!, startDate, endDate))
      .subscribe(_=>{
        this.records = this._apiStatistic.records$.value!;
      });
  }

  public async getListClients(date: Date){
    let {startDate, endDate} = this.getStartEnd();
    (await this._apiStatistic.getClientsStatistic(this.profile?.id!, startDate, endDate))
      .subscribe(_=>{
        this.clients = this._apiStatistic.clients$.value!;
      });
  }
  async getSchedule() {
    (await this._apiSchedule.getScheduleProfile(this.profile?.id!))
        .subscribe(_ => {
          this.allWorksDays = [];
          this.schedules = this._apiSchedule.getSchedule$.value;
          this.schedules.forEach(item => {
            this.allWorksDays.push(...item.daysOfWork);
          });
          this.days = generateCalendar(this.today.getFullYear(), this.today.getMonth());
          this.setToday();
          if (this.allWorksDays.length > 0) {
            // this.workDays.forEach(item => {
            //   item.daysOfWork = new Date(item.daysOfWork);
            // });
            this.changeMonth(this.today);
          }
        });
  }


  setToday(){
    this.days.forEach(_ => {
      _.forEach((item: any) => {
        if (item.day) {
          if (item.day === this.today.getDate()) {
            item.isToday = true;
          }
        }
      });
    });
  }

  changeMonth(date: Date){
    this.monthDays = this.allWorksDays.filter(_ =>
        new Date(_.daysOfWork).getMonth() === date.getMonth());
    this.allWorksDays = this.allWorksDays.filter(_=>
        new Date(_.daysOfWork).getMonth() !== date.getMonth());
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


  async ngOnInit(): Promise<void> {
    this.unsubscribe$ = this.store$.select(selectProfileMainClient).subscribe(
        result =>
          { 
            this.profile = result;
            this.coefficient$ = this._apiStatistic.getCoefficient(this.profile?.id!); 
          }
    );
 
    await this.initCalendar(this.today);
  }

  async chooseDays(day: any) {
    day.isToday = true;
    this.currentDay = day;
    this.days.forEach(item => {
      item.forEach((_: { day: any; isToday: boolean; }) => {
        if (_.day !== day.day){
          _.isToday = false;
        }
      });
    });
    let date = new Date(this.today.getFullYear(), this.today.getMonth(), day.day,0,0,0)
    await this.getListClients(date);
    await this.getListRecords(date);
    await this.getProfit();
  }
}
