import { CommonModule } from '@angular/common';
import { Component, DestroyRef, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { finalize, Subscription } from 'rxjs';
import { ReviewAttendance } from 'src/app/DTO/views/rating/verified-review';
import { reviewError, VerifiedReviewsService } from 'src/services/verified-reviews.service';

@Component({
  selector: 'app-review-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="attend" *ngIf="state?.canDecide || state?.decision || error || saved">
      <p *ngIf="state?.requestedAt && !state?.decision">Клиент попросил подтвердить визит.</p>
      <p *ngIf="saved || state?.decision === 'attended'" role="status">Визит подтверждён.</p>
      <p *ngIf="state?.decision === 'no_show'" role="status">Отмечена неявка.</p>
      <ng-container *ngIf="state?.canDecide && !state?.decision">
        <div class="attend-actions" *ngIf="decision === null">
          <button type="button" class="btn-green" (click)="decision = true">Визит состоялся</button>
          <button type="button" class="btn-transparent" (click)="decision = false">Клиент не пришёл</button>
        </div>
        <div *ngIf="decision !== null">
          <label class="attend-reason">Комментарий (по желанию)
            <textarea [(ngModel)]="reason" rows="2" maxlength="500" [disabled]="saving"></textarea>
          </label>
          <div class="attend-actions">
            <button type="button" class="btn-green" [disabled]="saving" (click)="submit()">
              {{ decision ? 'Подтвердить визит' : 'Подтвердить неявку' }}
            </button>
            <button type="button" class="btn-transparent" [disabled]="saving" (click)="decision = null">Назад</button>
          </div>
        </div>
      </ng-container>
      <p *ngIf="error" role="alert">{{ error }}</p>
    </div>`,
  styles: [`
    .attend { border-top: 1px solid #d4e0e3; margin: .75rem 0; padding: .75rem .5rem; color: #043c48; }
    .attend p { margin: .25rem 0; }
    .attend-actions { display: flex; flex-wrap: wrap; gap: .5rem; }
    .attend-actions button { min-height: 2.75rem; }
    .attend-reason { display: grid; gap: .35rem; margin-bottom: .5rem; }
    .attend-reason textarea { width: 100%; max-width: 30rem; border: 1px solid #9daeb8; border-radius: .4rem; padding: .5rem; }
  `],
})
export class ReviewAttendanceComponent implements OnChanges {
  @Input() recordId!: string;
  @Output() attendanceSaved = new EventEmitter<void>();
  state: ReviewAttendance | null = null;
  decision: boolean | null = null;
  reason = '';
  error = '';
  saved = false;
  saving = false;
  private load?: Subscription;

  constructor(private api: VerifiedReviewsService, private destroyRef: DestroyRef) {}

  ngOnChanges(): void {
    this.load?.unsubscribe();
    this.state = null;
    this.decision = null;
    this.reason = '';
    this.error = '';
    this.saved = false;
    if (!this.recordId) return;
    this.load = this.api.attendance(this.recordId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: state => this.state = state,
      error: error => this.error = reviewError(error, 'Не удалось загрузить состояние визита.'),
    });
  }

  submit(): void {
    const attended = this.decision;
    const reason = this.reason.trim();
    if (attended === null || this.saving) return;
    this.saving = true;
    this.error = '';
    this.api.decideAttendance(this.recordId, attended, reason).pipe(
      takeUntilDestroyed(this.destroyRef),
      finalize(() => this.saving = false),
    ).subscribe({
      next: () => {
        this.saved = attended;
        this.state = { canDecide: false, decision: attended ? 'attended' : 'no_show' };
        this.attendanceSaved.emit();
      },
      error: error => this.error = reviewError(error, 'Не удалось сохранить результат визита.'),
    });
  }
}
