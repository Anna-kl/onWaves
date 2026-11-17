import {Component, DestroyRef, OnDestroy, OnInit} from "@angular/core";
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Subscription} from "rxjs";
import {ScheduleService} from "../../../services/schedule.service";
import {RecordService} from "../../../services/record.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NotesService} from "./notes-events.service";
import { Location } from "@angular/common";
import {IChooseDayOfCalendar} from "../../DTO/views/calendar/IChooseDayOfCalendar";
import { parseDotDate } from "src/helpers/dateUtils/dateUtils";



@Component({
  selector: 'app-common-notes',
  templateUrl: './common-notes.component.html',
  styleUrls: ['./common-notes.component.css'],
  providers: [ScheduleService, RecordService, NotesService]
})
export class CommonNotesComponent implements OnInit, OnDestroy {
  days: any[]  = [];
  choosedDay?: IChooseDayOfCalendar;
  id: string|null = null;
  today = new Date();
  isWorkDay: boolean = true;
  recordId?: string;
  /** Меняется после переноса, чтобы календарь заново спросил countNew. */
  calendarStamp = '';
  currentYear: string = '';
  private calendarSub?: Subscription;
  constructor(private location: Location,
              private route: ActivatedRoute,
              private router: Router,
              private _events: NotesService,
              private _router: Router,
              private destroyRef: DestroyRef)
               {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
      this.id = params.get('id');
      if (this.id) this._events.transferId(this.id);
    });
    this.calendarSub = this._events.calendarRevision.subscribe(revision => {
      if (revision > 0) {
        this.calendarStamp = String(revision);
      }
    });
  }

  ngOnDestroy(): void {
    this.calendarSub?.unsubscribe();
  }
   ngOnInit() {
    this.currentYear = (new Date().getFullYear()).toString();
    this._events.recordId.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(result => {
      this.recordId = result;
    });
      this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(p => {
        const date = p.get('date');     // обрабатываешь новую дату
       
    if (date){
              if (date.includes(this.currentYear)){
                this.today = parseDotDate(date)!;
              }
          }
          if (this.today === null && date){
            this.today = new Date(date);
          }
          const recordId =  p.get('recordId');
          if (recordId){
            this._events.transferRecordId(recordId);
          }
          const dayId = p.get('dayId');
          if (date && this.today) {
            this._events.transferToday({
              date: this.today,
              dayId: dayId || undefined,
              ifExist: true
            });
          }
});
  }

  onDate($event: IChooseDayOfCalendar) {
    if ($event) {
      if ($event.date) this.today = $event.date;
      this.isWorkDay = $event.ifExist;
      this.choosedDay = { ifExist: $event.ifExist, dayId: $event.dayId, date: this.today, isLast: $event.isLast, canAdd: $event.canAdd, countNew:$event.countNew } as IChooseDayOfCalendar;
      this._events.transferToday($event);
      
    }
  }

  isMyNote() {
    return !this._router.url.includes('add-record-ba');

  }

  returnToNote() {
    this.location.back();
  }
  onActivate($event: any) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}

