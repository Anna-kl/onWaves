import {Component, OnInit} from "@angular/core";
import {ScheduleService} from "../../../services/schedule.service";
import {RecordService} from "../../../services/record.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NotesService} from "./notes-events.service";
import { Location } from "@angular/common";
import {IChooseDayOfCalendar} from "../../DTO/views/calendar/IChooseDayOfCalendar";

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
  constructor(private location: Location,
              private route: ActivatedRoute,
              private _events: NotesService,
              private _router: Router)
               {
    this.id = this.route.snapshot.paramMap.get('id');
    this._events.transferId(this.id!);
  }
  async ngOnInit(): Promise<void> {

  }

  onDate($event: IChooseDayOfCalendar) {
    if ($event) {
      this.today = $event.date!;
      this.isWorkDay = $event.ifExist;
      this.choosedDay = { ifExist: $event.ifExist, dayId: $event.dayId, date: this.today, isLast: $event.isLast } as IChooseDayOfCalendar;
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
