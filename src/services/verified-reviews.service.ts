import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { map, Observable } from 'rxjs';
import { environment } from 'src/enviroments/environment';
import {
  OwnReview, PublicReviewsPage, ReviewAttendance, ReviewAttendanceRequest, ReviewDraft, ReviewEligibility,
  ReviewMediaView, ReviewReport, SavedReview,
} from 'src/app/DTO/views/rating/verified-review';

@Injectable({ providedIn: 'root' })
export class VerifiedReviewsService {
  private readonly base = environment.Uri;
  private readonly reviews = this.base + 'reviews/';

  constructor(private http: HttpClient, private cookies: CookieService) {}

  eligibility(recordId: string): Observable<ReviewEligibility> {
    return this.http.get<ReviewEligibility>(this.base + 'records/' + recordId + '/review-eligibility', this.auth());
  }

  requestAttendance(recordId: string): Observable<unknown> {
    return this.http.post(this.base + 'records/' + recordId + '/review-attendance/request', {}, this.auth());
  }

  attendance(recordId: string): Observable<ReviewAttendance> {
    return this.http.get<ReviewAttendance>(this.base + 'records/' + recordId + '/review-attendance', this.auth());
  }

  decideAttendance(recordId: string, attended: boolean, reason: string): Observable<unknown> {
    return this.http.post(this.base + 'records/' + recordId + '/review-attendance/decision', { attended, reason }, this.auth());
  }

  attendanceRequests() {
    return this.http.get<ReviewAttendanceRequest[]>(this.reviews + 'admin/attendance', this.auth());
  }

  resolveAttendance(recordId: string, attended: boolean, reason: string): Observable<unknown> {
    return this.http.post(this.reviews + 'admin/attendance/' + recordId + '/decision', { attended, reason }, this.auth());
  }

  reports() {
    return this.http.get<ReviewReport[]>(this.reviews + 'admin/reports', this.auth());
  }

  resolveReport(id: string, hide: boolean, reason: string): Observable<unknown> {
    return this.http.post(this.reviews + 'admin/reports/' + id + '/decision', { hide, reason }, this.auth());
  }

  own(id: string): Observable<OwnReview> {
    return this.http.get<OwnReview>(this.reviews + id, this.auth()).pipe(map(review => ({
      ...review,
      media: (review.media ?? []).map(file => ({
        ...file, url: reviewMediaUrl(file.url), thumbnailUrl: reviewMediaUrl(file.thumbnailUrl),
      })),
    })));
  }

  create(recordId: string, draft: ReviewDraft, termsVersion: string | null, key: string): Observable<SavedReview> {
    const { headers } = this.auth();
    return this.http.post<SavedReview>(this.base + 'reviews', { recordId, ...draft, termsVersion }, {
      headers: headers.set('Idempotency-Key', key),
    });
  }

  update(id: string, expectedVersion: number, draft: ReviewDraft): Observable<SavedReview> {
    return this.http.patch<SavedReview>(this.reviews + id, { ...draft, expectedVersion }, this.auth());
  }

  remove(id: string, expectedVersion: number): Observable<unknown> {
    return this.http.delete(this.reviews + id, { ...this.auth(), params: { expectedVersion } });
  }

  publicPage(masterId: string, offset: number): Observable<PublicReviewsPage> {
    return this.http.get<PublicReviewsPage>(this.base + 'profiles/' + masterId + '/reviews', {
      params: { offset, limit: 10 },
    });
  }

  reply(id: string, text: string): Observable<unknown> {
    return this.http.post(this.reviews + id + '/reply', { text }, this.auth());
  }

  report(id: string, reason: string): Observable<unknown> {
    return this.http.post(this.reviews + id + '/report', { text: reason }, this.auth());
  }

  initiateUpload(recordId: string, kind: ReviewMediaView['kind']): Observable<ReviewMediaView> {
    return this.http.post<ReviewMediaView>(this.reviews + 'media/uploads/initiate', { recordId, kind }, this.auth());
  }

  upload(ticket: ReviewMediaView, file: File): Observable<HttpEvent<ReviewMediaView>> {
    const body = new FormData();
    body.set('file', file);
    return this.http.post<ReviewMediaView>(this.reviews + 'media/uploads/' + ticket.id + '/complete', body, {
      headers: this.auth().headers.set('X-Review-Upload-Token', ticket.uploadToken ?? ''),
      observe: 'events', reportProgress: true,
    });
  }

  mediaState(id: string): Observable<ReviewMediaView> {
    return this.http.get<ReviewMediaView>(this.reviews + 'media/uploads/' + id, this.auth());
  }

  removeDraft(id: string): Observable<unknown> {
    return this.http.delete(this.reviews + 'media/uploads/' + id, this.auth());
  }

  private auth(): { headers: HttpHeaders } {
    const token = this.cookies.get('auth-token-ocpio');
    return { headers: token ? new HttpHeaders({ Authorization: 'Bearer ' + token }) : new HttpHeaders() };
  }
}

export function reviewError(error: unknown, fallback: string): string {
  if (!(error instanceof HttpErrorResponse)) return fallback;
  return reviewReason(error.error?.reason ?? error.error?.data?.reason)
    || (typeof error.error?.message === 'string' ? error.error.message : fallback);
}

export function reviewReason(reason?: string | null): string {
  const messages: { [reason: string]: string } = {
    record_not_owned: 'Эта запись недоступна для вашего аккаунта.',
    service_not_completed: 'Оставить отзыв можно после выполненного визита.',
    attendance_confirmation_required: 'Мастер ещё не подтвердил, что визит состоялся.',
    review_already_exists: 'Вы уже оставили отзыв за этот визит.',
    media_not_ready: 'Дождитесь проверки вложений или удалите их.',
    media_not_owned: 'Одно из вложений недоступно. Загрузите его заново.',
    terms_changed: 'Условия изменились. Откройте форму ещё раз и проверьте их перед отправкой.',
    version_conflict: 'Отзыв изменился в другой вкладке. Откройте его ещё раз.',
    media_size: 'Размер файла превышает допустимый предел.',
    media_image_format: 'Поддерживаются JPEG, PNG и WebP. Сохраните фотографию HEIC в одном из этих форматов.',
    media_invalid_image: 'Не удалось прочитать фотографию.',
    media_invalid_video: 'Не удалось прочитать видео. Выберите файл MP4 или MOV.',
    media_video_duration: 'Видео слишком длинное. Обрежьте его перед загрузкой.',
    media_dimensions: 'Размер изображения в пикселях превышает допустимый предел.',
    media_upload_expired: 'Время на загрузку истекло. Уберите вложение и добавьте файл заново.',
    media_limit: 'Достигнут предел числа вложений.',
    media_acknowledgement: 'Подтвердите, что у вас есть право на публикацию вложений.',
  };
  return reason ? (messages[reason] ?? '') : '';
}

export function reviewMediaUrl(path?: string | null): string | null {
  if (!path?.startsWith('/v1/api/reviews/media/')) return null;
  return new URL(path, environment.Uri).href;
}
