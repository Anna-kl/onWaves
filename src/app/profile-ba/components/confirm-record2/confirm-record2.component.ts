


import {Component, Input, OnInit} from '@angular/core';

import {ActivatedRoute, Router} from "@angular/router";

import {DomSanitizer} from "@angular/platform-browser";
import {ScheduleService} from "../../../../services/schedule.service";
import {RecordService} from "../../../../services/record.service";
import {IViewScheduleBA} from "../../../DTO/views/schedule/IViewScheduleBA";
import {RecordStatus} from "../../../DTO/enums/recordStatus";
import {IViewDateSchedule} from "../../../DTO/requests/IViewDateSchedule";
import {ISendRecord} from "../../../DTO/requests/ISendRecord";
import {generateCalendar, localToUTC} from "../../../../helpers/dateUtils/dateUtils";
import {NotesService} from "src/app/profile-ba/notes/notes-events.service";
import {switchMap, tap} from "rxjs";
import { Location } from '@angular/common';
import { getPriceString } from 'src/helpers/common/price.helpers';

@Component({
  selector: 'app-confirm-record2',
  templateUrl: './confirm-record2.component.html',
  styleUrls: ['./confirm-record2.component.css'],
  providers: [ScheduleService, RecordService]
})
export class ConfirmRecord2Component implements OnInit {
  protected readonly getPriceString = getPriceString;
  id: string | null = null;
  today: Date = new Date();

  schedules: IViewScheduleBA[] = [];
  dayId?: string;
  canceled: IViewScheduleBA[] = [];
  constructor( private route: ActivatedRoute,
              private _apiSchedule: ScheduleService,
              private _events: NotesService,
              private router: Router,
               private location: Location,
              private sanitizer: DomSanitizer,
              private _apiRecord: RecordService,
              private _route: Router) {

    this._events.userId.subscribe(res => {
      this.id = res;
    });

      this._events.dayOff.pipe(switchMap(async res => {
            if (res.dayId) {
              this.today = res.date!;
              this.dayId = res.dayId;
            } else {
              let temp = this.location.getState();
              if ((temp as Object).hasOwnProperty('dayId'))
              {
                this.dayId = (temp as any).dayId;
                this.today = new Date((temp as any).date);
              }
            }
          }),
          tap(result => {
            this.getListSchedule();
            this.getListScheduleCanceled();
          })).subscribe();


  }

  public async getListSchedule(){
    const send = {dateRequest: localToUTC(this.today)} as IViewDateSchedule;
    (await this._apiSchedule.getProfileScheduleBA(this.id!, send))
      .subscribe(_=>{
        this.schedules = this._apiSchedule.getScheduleBA$.value;
        if (this.schedules.length === 0){
          this._events.transferIsWorkDay(false);
        }
        this.schedules.forEach(item => {
          if (item.avatar) {
            item.avatar = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64, ${item.avatar}`);
          } else {
            item.avatar = '/assets/img/AvatarBig.png';
          }
          let time = item.start!.toString().split(':');
          item.start = new Date(this.today.setHours(Number(time[0]), Number(time[1])));
          time = item.end.toString().split(':');
          item.end = new Date(this.today.setHours(Number(time[0]), Number(time[1])));
        });
      });
  }

  public async getListScheduleCanceled(){
    const send = {dateRequest: localToUTC(this.today)} as IViewDateSchedule;
    (await this._apiSchedule.getProfileScheduleCanceledBA(this.id!, send))
      .subscribe(_=>{
        this.canceled = this._apiSchedule.getScheduleBA$.value;
        this.canceled.forEach(item => {
          if (item.avatar) {
            item.avatar = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64, ${item.avatar}`);
          } else {
            item.avatar = '/assets/img/AvatarBig.png';
          }
          let time = item.start!.toString().split(':');
          item.start = new Date(this.today.setHours(Number(time[0]), Number(time[1])));
          time = item.end.toString().split(':');
          item.end = new Date(this.today.setHours(Number(time[0]), Number(time[1])));
        });
      });
  }

  async confirmRecord(sch: IViewScheduleBA, status: RecordStatus) {
    // if (sch.status === RecordStatus.Created || sch.status === RecordStatus.Canceled) {
    if (sch.status === RecordStatus.Created || sch.status === RecordStatus.Confirm ) {
      const send = {id: sch.recordId, status} as ISendRecord;
      this._apiRecord.confirmRecord(this.id!, send).subscribe(
        res => {
          if (res.code === 200) {
            sch.status = status;
          }
        });
    }
    if (sch.status === RecordStatus.Canceled){
      this.schedules = this.schedules.filter(_ => _.recordId === sch.recordId);
      this.canceled.push(sch);
    }
    // await this.getListSchedule();
  }

  getStatusConfirm(sch: IViewScheduleBA){
    if (sch.status === RecordStatus.Created){
      return true;
    }
    return false;
  }
  getColorLine(sch: IViewScheduleBA){
    switch (sch.status){
      case RecordStatus.Created:{
        return '#FFAB00';
      }
      case RecordStatus.Confirm:{
        return '#0A6ED8';
      }
      case RecordStatus.Canceled:{
        return '#E24414';
      }
      case RecordStatus.Success: {
        return '#4FB229';
      }
    }
    return '#DDE2ED';
  }

  getStatusDone(sch: IViewScheduleBA){
    if (sch.status === RecordStatus.Canceled
    || sch.status === RecordStatus.Success){
      return false;
    }
    return true;
  }

  addRecord(){
    this.router.navigate([`notes/${this.id}/add-record-ba`],  { queryParams: {dayId: this.dayId}});
  }


  async ngOnInit(): Promise<void> {
    this._events.transferIsWorkDay(true);
 //   await this.getListSchedule();

  }

  isAddRecord(): boolean {
    if (this.today.getDate() >= new Date().getDate()){
      return true;
    } else {
      return false;
    }
  }
  inBack() {
    this._route.navigate([`profile-ba/${this.id}/choose-date`]);
  }
}