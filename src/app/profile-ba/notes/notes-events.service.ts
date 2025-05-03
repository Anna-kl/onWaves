import {BehaviorSubject} from "rxjs";
import {Injectable} from "@angular/core";
import {IChooseDayOfCalendar} from "../../DTO/views/calendar/IChooseDayOfCalendar";

@Injectable()
export class NotesService {
  private id = new BehaviorSubject<string | null>(null);
  private dayId = new BehaviorSubject<string | null>(null);
  private today = new BehaviorSubject<IChooseDayOfCalendar>({date: null, dayId: undefined, ifExist: false});
  private isWorkDay = new BehaviorSubject<boolean>(true);

  userId = this.id.asObservable();
  dayOff = this.today.asObservable();
  workDay = this.isWorkDay.asObservable();
  ofDayId = this.dayId.asObservable();
  constructor() {
  }

  transferId(user: string): void {
    this.id.next(user);
  }

  transferDayId(dayId: string){
    this.dayId.next(dayId);
  }

  transferToday(date: IChooseDayOfCalendar): void {
    this.today.next(date);
  }

  transferIsWorkDay(flag: boolean): void {
    this.isWorkDay.next(flag);
  }
}
