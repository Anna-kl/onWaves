import {BehaviorSubject} from "rxjs";
import {Injectable} from "@angular/core";
import {IChooseDayOfCalendar} from "../../DTO/views/calendar/IChooseDayOfCalendar";

@Injectable()
export class NotesService {
  private id = new BehaviorSubject<string | null>(null);
  private dayId = new BehaviorSubject<string | null>(null);
  private today = new BehaviorSubject<IChooseDayOfCalendar>({date: null, dayId: undefined, ifExist: false});
  private isWorkDay = new BehaviorSubject<boolean>(true);
  private _recordId = new BehaviorSubject<string|undefined>(undefined);


  userId = this.id.asObservable();
  dayOff = this.today.asObservable();
  workDay = this.isWorkDay.asObservable();
  ofDayId = this.dayId.asObservable();
  recordId = this._recordId.asObservable();

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

  transferRecordId(recordId?: string): void {
    this._recordId.next(recordId);
  }

  /**
   * Сброс черновика записи (dayId, recordId).
   * Дату для списка не обнуляем: иначе BANotesComponent по dayOff не вызывает getListSchedule (там if (res.date)).
   * @param listDate календарный день, за который показывать записи после возврата (например дата выбранного слота)
   */
  clearRecordDraftState(listDate?: Date): void {
    this.dayId.next(null);
    const prev = this.today.getValue();
    const date = listDate ?? prev.date ?? new Date();
    this.today.next({
      date,
      dayId: undefined,
      ifExist: prev.ifExist ?? false,
      isLast: prev.isLast,
      canAdd: prev.canAdd,
      countNew: prev.countNew,
    });
    this._recordId.next(undefined);
    this.isWorkDay.next(true);
  }
}
