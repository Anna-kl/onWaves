import { HttpEventType } from '@angular/common/http';
import { Component, DestroyRef, Input, OnDestroy, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { concatMap, filter, finalize, Observable, of, Subscription, switchMap, take, tap, timer } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { OwnReview, ReviewDraft, ReviewEligibility, ReviewMediaView, SavedReview } from 'src/app/DTO/views/rating/verified-review';
import { formatRub } from 'src/helpers/common/welcome-coupon';
import { reviewError, reviewReason, VerifiedReviewsService } from 'src/services/verified-reviews.service';

interface Attachment {
  name: string;
  kind: ReviewMediaView['kind'];
  state: ReviewMediaView['status'];
  preview?: string | null;
  file?: File;
  media?: ReviewMediaView;
  ticket?: ReviewMediaView;
  progress: number | null;
  error?: string;
  upload?: Subscription;
}

@Component({
  selector: 'app-reviews-user',
  templateUrl: './reviews-user.component.html',
  styleUrls: ['./reviews-user.component.css'],
})
export class ReviewsUserComponent implements OnInit, OnDestroy {
  @Input() recordId!: string;
  @Input() clientId!: string;
  @Input() eligibility!: ReviewEligibility;
  @Input() name = '';
  @Input() services: string[] = [];

  readonly stars = [1, 2, 3, 4, 5];
  readonly money = formatRub;
  rating = 0;
  text = '';
  consent = false;
  attachments: Attachment[] = [];
  own: OwnReview | null = null;
  saved: SavedReview | null = null;
  busy = false;
  loading = false;
  confirmRemove = false;
  loadError = '';
  error = '';
  private readonly requestId = uuidv4();

  constructor(private api: VerifiedReviewsService, private modal: NgbActiveModal, private destroyRef: DestroyRef) {}

  ngOnInit(): void {
    const id = this.eligibility.existingReviewId;
    if (!id) return;
    this.loading = true;
    this.api.own(id).pipe(
      takeUntilDestroyed(this.destroyRef),
      finalize(() => this.loading = false),
    ).subscribe({
      next: review => {
        if (review.deleted) {
          this.loadError = 'Этот отзыв уже удалён.';
          return;
        }
        this.own = review;
        this.rating = review.rating;
        this.text = review.text ?? '';
        this.consent = review.media.length > 0;
        this.attachments = review.media.map(media => ({
          name: media.kind === 'photo' ? 'Фото' : 'Видео',
          kind: media.kind,
          state: media.status,
          preview: media.thumbnailUrl || media.url,
          media,
          progress: null,
        }));
      },
      error: error => this.loadError = reviewError(error, 'Не удалось открыть отзыв. Попробуйте ещё раз.'),
    });
  }

  ngOnDestroy(): void {
    this.attachments.forEach(item => this.cleanup(item));
  }

  get canSave(): boolean {
    return !this.loading && !this.loadError && !this.own?.moderationReason && !this.busy && !this.confirmRemove
      && this.rating >= 1 && this.rating <= 5
      && (!!this.text.trim() || this.attachments.length > 0)
      && (!this.attachments.length || (this.consent && this.attachments.every(item => item.state === 'ready')));
  }

  chooseFiles(input: HTMLInputElement, kind: Attachment['kind']): void {
    const limits = this.eligibility.mediaLimits;
    if (!limits || !input.files?.length || this.busy) return;
    const files = Array.from(input.files);
    input.value = '';
    this.error = '';
    const limit = kind === 'photo' ? limits.maxPhotos : limits.maxVideos;
    const maximumBytes = kind === 'photo' ? limits.maxPhotoBytes : limits.maxVideoBytes;
    if (this.attachments.filter(item => item.kind === kind).length + files.length > limit) {
      this.error = kind === 'photo' ? 'Можно добавить до ' + limit + ' фото.' : 'Можно добавить до ' + limit + ' видео.';
      return;
    }
    for (const file of files) {
      const valid = (kind === 'photo' ? /\.(jpeg|jpg|png|webp)$/i : /\.(mp4|mov)$/i).test(file.name);
      if (!valid || file.size > maximumBytes || file.size === 0) {
        this.error = kind === 'photo'
          ? 'Поддерживаются JPEG, PNG и WebP. Проверьте формат и размер фото.'
          : 'Поддерживаются MP4 и MOV. Проверьте формат и размер видео.';
        continue;
      }
      const item: Attachment = {
        name: file.name, file, kind, state: 'uploading', preview: URL.createObjectURL(file), progress: null,
      };
      this.attachments.push(item);
      this.upload(item);
    }
  }

  upload(item: Attachment): void {
    if (!item.file || this.busy) return;
    item.state = 'uploading';
    item.error = undefined;
    item.progress = null;
    item.upload?.unsubscribe();
    const file = item.file;
    if (item.media?.status === 'rejected') {
      item.ticket = undefined;
      item.media = undefined;
    }
    const ticket$ = item.ticket ? of(item.ticket) : this.api.initiateUpload(this.recordId, item.kind);
    item.upload = ticket$.pipe(
      tap(ticket => item.ticket = ticket),
      switchMap(ticket => this.api.upload(ticket, file)),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: event => {
        if (event.type === HttpEventType.UploadProgress) {
          item.progress = event.total ? Math.round(100 * event.loaded / event.total) : null;
          if (item.progress === 100) item.state = 'processing';
        }
        if (event.type === HttpEventType.Response && event.body) {
          if (event.body.status === 'processing') this.waitForMedia(item, event.body.id);
          else this.acceptMedia(item, event.body);
        }
      },
      error: error => {
        if (error?.status === 409 && item.ticket) {
          this.waitForMedia(item, item.ticket.id);
          return;
        }
        item.state = 'rejected';
        item.error = reviewError(error, 'Не удалось обработать файл. Повторите загрузку или удалите его.');
      },
    });
  }

  private acceptMedia(item: Attachment, media: ReviewMediaView): void {
    item.media = media;
    item.state = media.status;
    if (media.status === 'rejected') item.error = reviewReason(media.reason) || 'Не удалось обработать файл. Попробуйте выбрать другой.';
  }

  private waitForMedia(item: Attachment, id: string): void {
    item.state = 'processing';
    const checks: Observable<ReviewMediaView> = timer(0, 2000).pipe(
      take(30),
      concatMap(() => this.api.mediaState(id)),
      filter(media => media.status !== 'processing'),
      take(1),
    );
    item.upload = checks.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: media => {
        if (media.status === 'uploading') {
          item.state = 'rejected';
          item.error = 'Загрузка прервалась. Повторите попытку.';
          return;
        }
        this.acceptMedia(item, media);
      },
      error: () => {
        item.state = 'rejected';
        item.error = 'Не удалось проверить файл. Повторите попытку.';
      },
      complete: () => {
        if (item.state !== 'processing') return;
        item.state = 'rejected';
        item.error = 'Обработка занимает больше времени. Повторите проверку или уберите вложение.';
      },
    });
  }

  removeAttachment(item: Attachment): void {
    this.cleanup(item);
    this.attachments = this.attachments.filter(attachment => attachment !== item);
    if (item.ticket) {
      this.api.removeDraft(item.ticket.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        error: error => this.error = reviewError(error, 'Не удалось очистить черновик вложения.'),
      });
    }
  }

  save(): void {
    if (!this.canSave) return;
    const draft: ReviewDraft = {
      rating: this.rating,
      text: this.text.trim(),
      mediaIds: this.attachments.flatMap(item => item.media ? [item.media.id] : []),
      acceptMediaTerms: this.consent,
    };
    this.busy = true;
    this.error = '';
    if (this.own) {
      this.api.update(this.own.id, this.own.version, draft).pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.busy = false),
      ).subscribe({
        next: () => this.modal.close(true),
        error: error => this.error = reviewError(error, 'Не удалось сохранить отзыв. Попробуйте ещё раз.'),
      });
      return;
    }
    this.api.create(this.recordId, draft, this.eligibility.termsVersion ?? null, this.requestId).pipe(
      takeUntilDestroyed(this.destroyRef),
      finalize(() => this.busy = false),
    ).subscribe({
      next: result => {
        if (!result?.id) {
          this.error = 'Сервер не подтвердил публикацию. Повторите отправку.';
          return;
        }
        this.saved = result;
      },
      error: error => this.error = reviewError(error, 'Не удалось опубликовать отзыв. Попробуйте ещё раз.'),
    });
  }

  delete(): void {
    if (!this.own || this.busy) return;
    this.busy = true;
    this.error = '';
    this.api.remove(this.own.id, this.own.version).pipe(
      takeUntilDestroyed(this.destroyRef),
      finalize(() => this.busy = false),
    ).subscribe({
      next: () => this.modal.close(true),
      error: error => this.error = reviewError(error, 'Не удалось удалить отзыв. Попробуйте ещё раз.'),
    });
  }

  close(): void {
    this.modal.close(!!this.saved);
  }

  megabytes(bytes: number): number {
    return Math.round(bytes / (1024 * 1024));
  }

  private cleanup(item: Attachment): void {
    item.upload?.unsubscribe();
    if (item.file && item.preview) URL.revokeObjectURL(item.preview);
  }
}
