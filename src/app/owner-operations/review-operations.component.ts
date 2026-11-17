import { CommonModule } from '@angular/common';
import { Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { finalize, forkJoin } from 'rxjs';
import { ReviewAttendanceRequest, ReviewReport } from '../DTO/views/rating/verified-review';
import { reviewError, VerifiedReviewsService } from '../../services/verified-reviews.service';

@Component({
  selector: 'app-review-operations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './review-operations.component.html',
  styleUrls: ['./review-operations.component.scss'],
})
export class ReviewOperationsComponent {
  attendance: ReviewAttendanceRequest[] = [];
  reports: ReviewReport[] = [];
  open = false;
  loading = false;
  loaded = false;
  sending = false;
  error = '';
  notice = '';
  decision: { kind: 'attendance' | 'report'; id: string; value: boolean } | null = null;
  reason = '';

  constructor(private api: VerifiedReviewsService, private destroyRef: DestroyRef) {}

  toggle(): void {
    this.open = !this.open;
    if (this.open) this.reload();
  }

  reload(): void {
    if (this.loading || this.sending) return;
    this.loading = true;
    this.loaded = false;
    this.error = '';
    forkJoin({ attendance: this.api.attendanceRequests(), reports: this.api.reports() }).pipe(
      takeUntilDestroyed(this.destroyRef),
      finalize(() => this.loading = false),
    ).subscribe({
      next: records => {
        this.attendance = records.attendance;
        this.reports = records.reports;
        this.loaded = true;
      },
      error: error => this.error = reviewError(error, 'Не удалось загрузить очередь отзывов.'),
    });
  }

  choose(kind: 'attendance' | 'report', id: string, value: boolean): void {
    this.notice = '';
    this.error = '';
    this.decision = { kind, id, value };
    this.reason = '';
  }

  save(): void {
    const decision = this.decision;
    const reason = this.reason.trim();
    if (this.sending || !decision || !reason) return;
    this.error = '';
    this.sending = true;
    const request = decision.kind === 'attendance'
      ? this.api.resolveAttendance(decision.id, decision.value, reason)
      : this.api.resolveReport(decision.id, decision.value, reason);
    request.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.sending = false;
        this.decision = null;
        this.notice = 'Решение сохранено.';
        this.reload();
      },
      error: error => {
        this.sending = false;
        this.error = reviewError(error, 'Не удалось сохранить решение. Попробуйте ещё раз.');
      },
    });
  }
}
