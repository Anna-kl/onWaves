import { Component, DestroyRef, Input, OnChanges } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, Subscription } from 'rxjs';
import { PublicReview } from 'src/app/DTO/views/rating/verified-review';
import { reviewError, reviewMediaUrl, VerifiedReviewsService } from 'src/services/verified-reviews.service';

@Component({
  selector: 'app-reviews-carusel',
  templateUrl: './razrab.component.html',
  styleUrls: ['./razrab.component.css'],
})
export class ReviewsCaruselComponent implements OnChanges {
  @Input() id: string | null = null;
  @Input() canManage = false;
  items: PublicReview[] = [];
  total = 0;
  loading = false;
  sending = false;
  error = '';
  actionError = '';
  message = '';
  action: { reviewId: string; kind: 'reply' | 'report' } | null = null;
  draft = '';
  readonly mediaUrl = reviewMediaUrl;
  private request?: Subscription;

  constructor(private api: VerifiedReviewsService, private destroyRef: DestroyRef) {}

  ngOnChanges(): void {
    this.request?.unsubscribe();
    this.items = [];
    this.total = 0;
    this.action = null;
    this.error = '';
    this.load();
  }

  load(): void {
    if (!this.id || this.loading) return;
    this.loading = true;
    this.error = '';
    this.request = this.api.publicPage(this.id, this.items.length).pipe(
      takeUntilDestroyed(this.destroyRef),
      finalize(() => this.loading = false),
    ).subscribe({
      next: page => {
        this.items = [...this.items, ...page.items];
        this.total = page.total;
      },
      error: () => this.error = 'Не удалось загрузить отзывы.',
    });
  }

  open(reviewId: string, kind: 'reply' | 'report'): void {
    if (this.sending) return;
    this.action = { reviewId, kind };
    this.draft = '';
    this.message = '';
    this.actionError = '';
  }

  submit(): void {
    const action = this.action;
    const text = this.draft.trim();
    if (!action || !text || this.sending) return;
    this.sending = true;
    this.actionError = '';
    const request = action.kind === 'reply' ? this.api.reply(action.reviewId, text) : this.api.report(action.reviewId, text);
    request.pipe(
      takeUntilDestroyed(this.destroyRef),
      finalize(() => this.sending = false),
    ).subscribe({
      next: () => {
        this.action = null;
        this.draft = '';
        this.message = action.kind === 'reply' ? 'Ответ опубликован.' : 'Жалоба отправлена.';
        if (action.kind === 'reply') {
          this.request?.unsubscribe();
          this.items = [];
          this.load();
        }
      },
      error: error => this.actionError = reviewError(error, 'Не удалось отправить сообщение. Повторите попытку.'),
    });
  }
}
