import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ScheduleService} from "../../../../services/schedule.service";
import {
  setTime,
} from "../../../../helpers/dateUtils/dateUtils";

import {IFreeSlotSchedule} from "../../../DTO/views/schedule/IFreeSlotSchedule";
import {ActivatedRoute, Router} from "@angular/router";
import {ProfileDataService} from "../../services/profile-data.service";
import {IChooseDayOfCalendar} from "../../../DTO/views/calendar/IChooseDayOfCalendar";
import {subGroup} from "../../../DTO/views/services/IViewSubGroups";
import {Location} from '@angular/common';
import {Subject, takeUntil} from "rxjs";
import {RecordService} from "../../../../services/record.service";


@Component({
  selector: 'app-choose-date-time',
  templateUrl: './choose-date-time.component.html',
  styleUrls: ['./choose-date-time.component.css'],
  providers: [ScheduleService, RecordService]
})
export class ChooseDateTimeComponent implements OnInit, OnDestroy {
  today: Date = new Date();
  days: any[] = [];
  isChoosed = false;
  id: string | null = null;
  // freeSlots: IFreeSlotSchedule[] = [];
  duration: number = 0;
  @Output() onChooseDate = new EventEmitter();
  dateRecord: Date = new Date();
  dayId: string|null = null;
  services: subGroup[] = [];
  daySetInterval: IChooseDayOfCalendar|null = null;
  private recordId: string|null = null;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private  _api: ScheduleService,
              private _route: Router,
              private _location: Location,
              private _apiRecord: RecordService,
              private _activateRoute: ActivatedRoute,
              public _profileData: ProfileDataService) {
    this._profileData.sendId.subscribe(result => {
      this.id = result
    });
    this._profileData.sendChooseServices.subscribe(result => {
      this.services = result;
      this.services.forEach(item => {
        if (item.duration) {
          this.duration += item.duration;
        }
      });
    });
  }

  async getSchedule(id: string, year: number, month: number) {
    (await this._api.getWorkDaysInMonth(id, year, month))
      .subscribe(async _ => {
        let workDays = this._api.getWorkDayInMonth$.value;
        this.days.forEach(item => {
          item.forEach((sub: any) => {
            let day = workDays
              .find(_=> new Date(_.daysOfWork).getDate() === sub.day);
            if (day){
            sub.ifExist = true;
            sub.dayId = day.id;
          }
        });
      });
      });
  }

  // async getFreeSlotForDay(day: IChooseDayOfCalendar) {
  //   if(day.dayId) {
  //     this.dayId = day.dayId;
  //     this.dateRecord =  new Date(Date.UTC(day.date!.getFullYear(), day.date!.getMonth(),
  //         day.date!.getDate()));
  //     (await this._api.getFreeSlotForDay(this.id!, this.duration, this.dateRecord.toDateString(), day.dayId))
  //       .subscribe(async _ => {
  //         this.freeSlots = this._api.freeSlotForDay$.value;
  //         if (day.date?.toDateString() === new Date().toDateString()){
  //           this.freeSlots = this.freeSlots.filter(_ => compareTimeHour(_.start.toString(), new Date()));
  //         }
  //         this.freeSlots.forEach(item => {
  //           item.start = toHoursMinutesString(item.start as string);
  //           // item.start = `${items[0]}:${items[1]}`;
  //           item.isChoose = false;
  //         });
  //       });
  //   }
  // }

  chooseInterval(slot: IFreeSlotSchedule){
    slot.isChoose = !slot.isChoose;
    if (slot.isChoose){
      this.dateRecord = setTime(this.dateRecord, slot.start.toString());
      this.isChoosed = true;
      // this.freeSlots.filter(_ => _.start !== slot.start).forEach(item => {
      //   item.isChoose = false;
      // });
    } else{
      this.isChoosed = false;
    }
  }

  nextConfirm(){
    if (this.dayId && this.dateRecord) {
      this._profileData.transferDate(this.dateRecord);
      this._profileData.transferDayId(this.dayId!);
      this._route.navigate(['../confirm-record'], { relativeTo: this._activateRoute });
    }
  }
  async ngOnInit(): Promise<void> {
    this._activateRoute.queryParams.pipe(takeUntil(this.destroy$)).subscribe(async result => {
      if (result) {
        if (result['recordId']) {
          this.recordId = result['recordId'];
          this._apiRecord.getRecord(this.recordId!).pipe(takeUntil(this.destroy$)).subscribe(
              record => {
                this.id = record.businessProfile.id!;
                this.duration =  record.services.map(_ => _.duration)
                    .reduce(_ => _! + this.duration)!;
                this._profileData.transferChooseService(record.services);
                this._profileData.transferId(record.businessProfile.id!);
              }
          );
        } else {
          await this.getSchedule(this.id!, this.today.getFullYear(), this.today.getMonth() + 1);
        }
      }
    });
  }

  async onDate($event: IChooseDayOfCalendar) {
    if ($event.isLast){
      this.daySetInterval = null;
    }else {
      this.daySetInterval = $event;
    }
  }

  inBack() {
    this._location.back();
  }


  clearInterval($event: boolean){
    if ($event){
      this.daySetInterval = null;
    }
  }

    setInterval($event: IChooseDayOfCalendar | null){
    if (!$event){
      this.isChoosed = false;
    } else {
      this.isChoosed = true;
      this.dateRecord = $event.date!;
      this.dayId = $event.dayId!;
    }
  }

  ngOnDestroy(): void {
    if (this.destroy$) {
      this.destroy$.next(true);

      this.destroy$.unsubscribe();
    }
  }
}
