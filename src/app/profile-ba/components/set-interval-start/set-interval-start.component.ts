import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {IFreeSlotSchedule} from "../../../DTO/views/schedule/IFreeSlotSchedule";
import {compareTimeHour, setTime, toHoursMinutesString} from "../../../../helpers/dateUtils/dateUtils";
import {IChooseDayOfCalendar} from "../../../DTO/views/calendar/IChooseDayOfCalendar";
import {ScheduleService} from "../../../../services/schedule.service";
import {BehaviorSubject, EMPTY, map, Observable, shareReplay, take, tap} from "rxjs";


@Component({
  selector: 'app-set-interval-start',
  templateUrl: './set-interval-start.component.html',
  styleUrls: ['./set-interval-start.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})


export class SetIntervalStartComponent implements OnChanges {
  dateRecord: Date = new Date();
  isChoosed = false;
  freeSlots$: Observable<IFreeSlotSchedule[]> | undefined = undefined;
//  freeSlots: IFreeSlotSchedule[] = [];
  dayId: string|null = null;
  @Input() id: string | null = null;
  @Input() duration: number = 0;
  @Input() day: IChooseDayOfCalendar|null = null;
  @Output() setInterval = new EventEmitter<IChooseDayOfCalendar|null>();
  @Input() start?: string;
  @Input() errorEmpty: boolean = false;
  constructor(private  _api: ScheduleService,) {

  }


private lastKey?: string; // чтобы не дёргать одинаковое
  async getFreeSlotForDay(day: IChooseDayOfCalendar) {
    if(day.dayId) {
      this.dayId = day.dayId;
      this.dateRecord =  new Date(Date.UTC(day.date!.getFullYear(), day.date!.getMonth(),
        day.date!.getDate()));
        console.log(this.lastKey);
          // if (this.lastKey !== this.dateRecord.toDateString()) {
          const src$ = this._api
            .getFreeSlotForDay(this.id!, this.duration,   this.dateRecord.toDateString(), day.dayId)
            .pipe(
              map(items => this.prepareFreeSlots(items, day)),
            
            );

          this.freeSlots$ = src$;             // для шаблона (| async)
          this.lastKey = this.dateRecord.toDateString();

          if (this.start) {
            src$                                   // подписываемся на ТУ ЖЕ «разделённую» струю
              .pipe(
                take(1),
                tap(items => {
                  const found = items.find(x => x.start === this.start);
                  if (found) this.chooseInterval(found);
                })
              )
              .subscribe();
          }
        

    }
  }

  prepareFreeSlots(items: IFreeSlotSchedule[], day: IChooseDayOfCalendar){
    if (day.date?.toDateString() === new Date().toDateString()){
      items = items.filter(_ => compareTimeHour(_.start.toString(), new Date()));
    }
    items.forEach(_ => {
      _.start = toHoursMinutesString(_.start as string);
      _.isChoose = false;
    });
    return items;
  }

  setUnlock(items: IFreeSlotSchedule[], slot: IFreeSlotSchedule){
    items.forEach(item => {
      item.isChoose = item.start === slot.start;
    });
    return items;
  }

  chooseInterval(slot: IFreeSlotSchedule){
    slot.isChoose = !slot.isChoose;

    if (slot.isChoose){
      this.dateRecord = setTime(this.dateRecord, slot.start.toString());
      this.freeSlots$ = this.freeSlots$?.pipe(map(items => this.setUnlock(items, slot)));
      this.errorEmpty = false;
      this.setInterval.emit({ date: this.dateRecord, dayId: this.dayId, ifExist: true } as IChooseDayOfCalendar);
    } else{
      this.setInterval.emit(null);
    }
  }

  async ngOnChanges(): Promise<void> {

    if (this.day && this.duration > 0) {
      await this.getFreeSlotForDay(this.day);
    } else {
      this.freeSlots$ = EMPTY;
    }
  }

}
