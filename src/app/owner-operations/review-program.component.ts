import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { ReviewRewardsAdmin } from '../DTO/views/promo/review-rewards';
import { moscowDateTime, OperationsMoneyPipe } from './operations-format';
import { ReviewRewardsService } from '../../services/review-rewards.service';
import { reviewError } from '../../services/verified-reviews.service';

@Component({
  selector: 'app-review-program',
  standalone: true,
  imports: [CommonModule, FormsModule, OperationsMoneyPipe],
  templateUrl: './review-program.component.html',
  styleUrls: ['./review-program.component.scss'],
})
export class ReviewProgramComponent implements OnInit {
  program: ReviewRewardsAdmin | null = null;
  loading = false;
  sending = false;
  editing = false;
  error = '';
  notice = '';
  enabled = false;
  startsAt = '';
  reason = '';

  constructor(private api: ReviewRewardsService, private destroyRef: DestroyRef) {}

  ngOnInit(): void {
    this.reload();
  }

  reload(): void {
    if (this.loading || this.sending) return;
    this.loading = true;
    this.error = '';
    this.api.admin().pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.loading = false)).subscribe({
      next: state => this.program = state,
      error: error => this.error = reviewError(error, 'Не удалось загрузить программу купонов за отзывы.'),
    });
  }

  edit(): void {
    if (!this.program) return;
    this.enabled = this.program.program?.enabled ?? false;
    this.startsAt = this.program.program ? moscowDateTime(new Date(this.program.program.startsAt)) : moscowDateTime();
    this.reason = '';
    this.notice = '';
    this.error = '';
    this.editing = true;
  }

  save(): void {
    if (this.sending || !this.program || !this.reason.trim()) return;
    const date = new Date(this.startsAt + ':00+03:00');
    if (!Number.isFinite(date.getTime())) {
      this.error = 'Укажите дату и время начала в Москве.';
      return;
    }
    this.sending = true;
    this.error = '';
    this.api.configure(this.enabled, date.toISOString(), this.program.program?.revision ?? 0, this.reason.trim())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.sending = false;
          this.editing = false;
          this.notice = 'Настройки сохранены.';
          this.reload();
        },
        error: error => {
          this.sending = false;
          this.error = reviewError(error, 'Не удалось сохранить настройки программы.');
        },
      });
  }
}
