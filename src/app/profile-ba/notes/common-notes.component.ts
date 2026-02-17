import {Component, OnInit} from "@angular/core";
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
  providers: [ScheduleService, RecordService]
})
export class CommonNotesComponent implements OnInit {
  days: any[]  = [];
  choosedDay?: IChooseDayOfCalendar;
  readonly id: string|null = null;
  today = new Date();
  isWorkDay: boolean = true;
  recordId?: string;
  currentYear: string = '';
  constructor(private location: Location,
              private route: ActivatedRoute,
              private router: Router,
              private _events: NotesService,
              private _router: Router)
               {
    this.id = this.route.snapshot.paramMap.get('id');
    this._events.transferId(this.id!);
    
  }
   ngOnInit() {
    this.currentYear = (new Date().getFullYear()).toString();
    this._events.recordId.subscribe(result => {
      this.recordId = result;
    });
    this.router.routerState.root.queryParamMap.subscribe(p => {
          
           
        });
      this.route.queryParamMap.subscribe(p => {
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
});
  }

  onDate($event: IChooseDayOfCalendar) {
    if ($event) {
      // this.today = $event.date!;
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

