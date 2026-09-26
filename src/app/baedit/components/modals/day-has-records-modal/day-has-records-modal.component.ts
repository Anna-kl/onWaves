import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IViewScheduleBA } from '../../../../DTO/views/schedule/IViewScheduleBA';
import { UTCToLocale, formatDateToString, getNameMonth } from '../../../../../helpers/dateUtils/dateUtils';

@Component({
  selector: 'app-day-has-records-modal',
  templateUrl: './day-has-records-modal.component.html',
  styleUrls: ['./day-has-records-modal.component.scss']
})
export class DayHasRecordsModalComponent {
  @Input() date: Date = new Date();
  @Input() records: IViewScheduleBA[] = [];
  @Input() profileId: string | null = null;
  @Input() dayId: string | undefined;

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private router: Router
  ) {}

  get dateLabel(): string {
    const month = (getNameMonth(this.date.getMonth()) || '').toLowerCase();
    return `${this.date.getDate()} ${month}`;
  }

  recordTime(sch: IViewScheduleBA): string {
    if (!sch.start) {
      return 'Время не указано';
    }
    const start = UTCToLocale(sch.start);
    const hours = String(start.getHours()).padStart(2, '0');
    const minutes = String(start.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  recordServices(sch: IViewScheduleBA): string {
    const names = (sch.services ?? [])
      .map(s => s?.name)
      .filter((name): name is string => !!name);
    return names.join(', ');
  }

  goToRecord(sch?: IViewScheduleBA): void {
    if (!this.profileId) {
      return;
    }
    this.goToNotes(sch ?? this.records[0]);
  }

  stay(): void {
    this.activeModal.dismiss();
  }

  private goToNotes(sch?: IViewScheduleBA): void {
    this.modalService.dismissAll();
    this.router.navigate(['/notes', this.profileId], {
      queryParams: {
        date: formatDateToString(this.date),
        ...(this.dayId ? { dayId: this.dayId } : {}),
        ...(sch?.recordId ? { recordId: sch.recordId } : {})
      }
    });
  }
}
