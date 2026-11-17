import { CommonModule } from '@angular/common';
import { Component, DestroyRef, Input, OnChanges } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subscription } from 'rxjs';
import { PromoSeatEntry, PromoSeatReport } from '../../../DTO/views/promo/promo-seats';
import { PromoSeatsService } from '../../../../services/promo-seats.service';

@Component({
  selector: 'app-promo-participants', standalone: true, imports: [CommonModule],
  templateUrl: './promo-participants.component.html', styleUrls: ['./promo-participants.component.scss'],
})
export class PromoParticipantsComponent implements OnChanges {
  @Input() masterId: string | null | undefined;
  reports: PromoSeatReport[] = [];
  loading = false;
  error: string | null = null;
  saving: string | null = null;
  confirmingNoShow: string | null = null;
  private request?: Subscription;

  constructor(private promos: PromoSeatsService, private destroyRef: DestroyRef) {
    destroyRef.onDestroy(() => this.request?.unsubscribe());
  }

  ngOnChanges(): void { this.reports = []; this.load(); }

  load(): void {
    this.request?.unsubscribe();
    if (!this.masterId) return;
    this.loading = true;
    this.error = null;
    this.request = this.promos.getReports(this.masterId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: reports => { this.reports = reports; this.loading = false; },
      error: () => { this.loading = false; this.error = 'Не удалось загрузить участников акции. Попробуйте ещё раз.'; },
    });
  }

  mark(entry: PromoSeatEntry, attended: boolean): void {
    if (!this.masterId || !entry.canMarkAttendance || this.saving || this.loading) return;
    this.saving = entry.recordId;
    this.error = null;
    this.promos.markAttendance(this.masterId, entry.recordId, attended)
      .pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: result => {
          this.saving = null;
          this.confirmingNoShow = null;
          if (result.code === 200) this.load();
          else this.error = result.message || 'Не удалось сохранить итог визита. Обновите реестр.';
        },
        error: () => { this.saving = null; this.error = 'Итог визита не сохранился. Попробуйте ещё раз.'; },
      });
  }

  progress(report: PromoSeatReport): number { return report.seatsLimit > 0 ? Math.min(100, report.taken / report.seatsLimit * 100) : 0; }
  outcome(entry: PromoSeatEntry): string {
    switch (entry.outcome) {
      case 'attended': return 'Пришёл';
      case 'no_show': return 'Не пришёл · место учтено';
      case 'cancelled': return 'Отменено · место свободно';
      case 'auto_completed': return 'Выполнено автоматически';
      default: return entry.canMarkAttendance ? 'Нужна отметка явки' : 'Ожидает визита';
    }
  }
  visitTimezone(entry: PromoSeatEntry): string {
    const hours = Math.abs(entry.timeZone);
    return `${entry.timeZone < 0 ? '-' : '+'}${String(hours).padStart(2, '0')}00`;
  }
}
