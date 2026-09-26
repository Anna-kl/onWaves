import {
  Component, ElementRef, Input, NgZone,
  OnDestroy, OnInit, ViewChild, ViewEncapsulation
} from '@angular/core';
import { ToastService } from 'src/services/toast.service';
import { SafeUrl } from '@angular/platform-browser';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';
import { AlbumsService } from '../../../../../services/albums.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupService } from '../../../../../services/groupservice';
import { Service } from '../../../../DTO/classes/services/Service';
import { IViewImage } from '../../../../DTO/views/images/IViewImage';
import { FALLBACK_VIDEO_POSTER, normalizeImageMedia } from '../../../../../helpers/common/media.helpers';
import { forkJoin, from, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

type FileType = 'photo' | 'video' | null;

@Component({
  selector: 'app-crop-image-modal',
  templateUrl: './crop-image-modal.component.html',
  styleUrls: ['./crop-image-modal.component.scss'],
  providers: [AlbumsService],
  encapsulation: ViewEncapsulation.None
})
export class CropImageModalComponent implements OnInit, OnDestroy {

  @Input() albumId: string = '';
  @Input() profileId: string = '';
  @Input() editImage?: IViewImage;
  /** Предвыбор услуг при загрузке из карточки услуги. */
  @Input() selectedServiceIds: string[] = [];

  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('coverFileInput') coverFileInputRef!: ElementRef<HTMLInputElement>;

  // ── file state ──
  fileType: FileType = null;

  // photo
  isCropping = false;
  hasCroppedImage = false;
  imageChangedEvent: any = null;
  croppedImage: any = '';
  formData: any = null;

  // video
  videoFile: File | null = null;
  videoPreviewUrl: SafeUrl | null = null;
  videoPosterUrl: string | null = null;
  private rawVideoUrl: string | null = null;
  uploadProgress = 0;
  isVideoUploading = false;

  // video cover
  isCroppingCover = false;
  hasCoverImage = false;
  coverImageChangedEvent: any = null;
  croppedCoverImage: any = '';
  coverFormData: FormData | null = null;
  /** В правке ролика: пользователь снял текущую обложку. */
  coverRemoved = false;

  // ── meta ──
  description = '';
  /**
   * Держать синхронно с бэком: [MaxLength] в UploadImageRequest и VideoCompleteRequest.
   * Колонка Images.Description в БД — text, ограничения по длине там нет.
   */
  readonly maxDescription = 1500;

  // ── services ──
  services: Service[] = [];
  showAllServices = false;
  readonly visibleServicesCount = 5;

  // ── ui ──
  isSaving = false;
  confirmDelete = false;
  isDeleting = false;

  constructor(
    private _apiImage: AlbumsService,
    private activeModal: NgbActiveModal,
    private messageService: ToastService,
    private sanitizer: DomSanitizer,
    private groupService: GroupService,
    private ngZone: NgZone) {}

  // ── lifecycle ──

  ngOnInit(): void {
    if (this.isEditMode) this.applyEditMedia();
    if (this.profileId) this.loadServices();
  }

  ngOnDestroy(): void {
    if (this.rawVideoUrl) URL.revokeObjectURL(this.rawVideoUrl);
  }

  // ── computed ──

  get isEditMode(): boolean { return !!this.editImage; }

  /**
   * Редактирование открывает ту же модалку и для фото, и для видео.
   * Раньше любой editImage считался фото: url ролика попадал в <img>,
   * заголовок был «Редактировать фото», сохранить шло как UploadImage
   * с битым превью — мастер не мог поправить описание и услуги.
   */
  private applyEditMedia(): void {
    const image = this.editImage!;
    const media = normalizeImageMedia(image);
    this.description = image.description ?? '';
    this.selectedServiceIds = [...(image.serviceIds ?? [])];

    if (media.isVideo) {
      this.fileType = 'video';
      this.videoPosterUrl = media.thumbUrl || FALLBACK_VIDEO_POSTER;
      if (media.mediaUrl) {
        this.videoPreviewUrl = this.sanitizer.bypassSecurityTrustUrl(media.mediaUrl);
      }
      if (media.thumbUrl) {
        this.hasCoverImage = true;
        this.croppedCoverImage = media.thumbUrl;
      }
      return;
    }

    this.fileType = 'photo';
    this.croppedImage = media.previewUrl || image.url;
    this.hasCroppedImage = true;
  }

  get title(): string {
    if (this.isEditMode) {
      return this.fileType === 'video' ? 'Редактировать видео' : 'Редактировать фото';
    }
    if (this.fileType === 'video') return 'Добавить видео';
    return 'Добавить фото / видео';
  }

  get saveLabel(): string {
    if (this.isVideoUploading) return `Загрузка ${this.uploadProgress}%`;
    if (this.isSaving) return 'Сохранение…';
    if (this.isEditMode) return 'Сохранить';
    if (this.fileType === 'video') return 'Добавить видео';
    return 'Добавить фото';
  }

  get canSave(): boolean {
    if (this.isSaving || this.isVideoUploading) return false;
    if (this.isEditMode) return true;
    if (this.fileType === 'video') return !!this.videoFile;
    return this.hasCroppedImage && !!this.formData;
  }

  get descriptionLength(): number { return this.description.length; }

  get visibleServices(): Service[] {
    return this.showAllServices ? this.services : this.services.slice(0, this.visibleServicesCount);
  }

  get mediaHint(): string {
    if (this.isEditMode && this.fileType === 'video') {
      return 'Можно изменить обложку, описание и привязку к услугам.';
    }
    if (this.fileType === 'video') return 'Поддерживаются MP4, MOV. Максимальный размер — 500 МБ.';
    if (this.fileType === 'photo') return 'Поддерживаются JPG, PNG. Максимальный размер — 10 МБ.';
    return 'Фото (JPG, PNG) или видео (MP4, MOV).';
  }

  // ── services ──

  loadServices(): void {
    forkJoin([
      this.groupService.getServiceWithout(this.profileId),
      this.groupService.getGroupServices(this.profileId).pipe(
        switchMap(groups => {
          if (!groups?.length) return of([] as Service[]);
          const requests = groups.filter(g => g.id).map(g => this.groupService.getService(g.id!));
          return requests.length
            ? forkJoin(requests).pipe(map(r => r.flat()))
            : of([] as Service[]);
        })
      )
    ]).subscribe({
      next: ([withoutGroup, fromGroups]) => {
        this.services = [...withoutGroup, ...fromGroups];
      }
    });
  }

  toggleService(id: string): void {
    this.selectedServiceIds = this.selectedServiceIds.includes(id)
      ? this.selectedServiceIds.filter(s => s !== id)
      : [...this.selectedServiceIds, id];
  }

  isServiceSelected(id: string | null): boolean {
    return !!id && this.selectedServiceIds.includes(id);
  }

  // ── file select ──

  triggerFileInput(): void {
    this.fileInputRef.nativeElement.value = '';
    this.fileInputRef.nativeElement.click();
  }

  fileChangeEvent(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    const file = input.files[0];

    // cleanup prev video url
    if (this.rawVideoUrl) {
      URL.revokeObjectURL(this.rawVideoUrl);
      this.rawVideoUrl = null;
      this.videoPreviewUrl = null;
    }

    if (file.type.startsWith('video/')) {
      this.fileType = 'video';
      this.videoFile = file;
      this.rawVideoUrl = URL.createObjectURL(file);
      this.videoPreviewUrl = this.sanitizer.bypassSecurityTrustUrl(this.rawVideoUrl);
      this.videoPosterUrl = null;
      this.isCropping = false;
      this.hasCroppedImage = false;
      this.imageChangedEvent = null;
      this.formData = null;
      this.croppedImage = '';
    } else {
      this.fileType = 'photo';
      this.videoFile = null;
      this.imageChangedEvent = event;
      this.isCropping = true;
      this.hasCroppedImage = false;
      this.croppedImage = '';
    }
  }

  // ── crop ──

  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl!);
    const fileToUpload = (this.imageChangedEvent.target as HTMLInputElement).files![0];
    const myFile = this.blobToFile(event.blob!, fileToUpload.name);
    if (myFile) {
      this.formData = new FormData();
      this.formData.append('file', myFile, fileToUpload.name);
    }
  }

  imageLoaded(_image: LoadedImage): void {}
  loadImageFailed(): void {
    this.messageService.add({ severity: 'error', summary: 'Ошибка', detail: 'Недопустимый формат изображения', life: 5000 });
    this.isCropping = false;
  }
  loadCoverImageFailed(): void {
    this.messageService.add({ severity: 'error', summary: 'Ошибка', detail: 'Недопустимый формат обложки', life: 5000 });
    this.isCroppingCover = false;
  }

  confirmCrop(): void {
    this.isCropping = false;
    this.hasCroppedImage = true;
  }

  // ── video cover ──

  triggerCoverInput(): void {
    this.coverFileInputRef.nativeElement.value = '';
    this.coverFileInputRef.nativeElement.click();
  }

  coverFileChangeEvent(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    this.coverImageChangedEvent = event;
    this.isCroppingCover = true;
    this.hasCoverImage = false;
    this.croppedCoverImage = '';
    this.coverFormData = null;
    this.coverRemoved = false;
  }

  coverImageCropped(event: ImageCroppedEvent): void {
    this.croppedCoverImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl!);
    if (event.objectUrl) this.videoPosterUrl = event.objectUrl;
    const file = (this.coverImageChangedEvent.target as HTMLInputElement).files![0];
    const blob = this.blobToFile(event.blob!, file.name);
    if (blob) {
      this.coverFormData = new FormData();
      this.coverFormData.append('cover', blob, file.name);
    }
  }

  confirmCoverCrop(): void {
    this.isCroppingCover = false;
    this.hasCoverImage = true;
    this.coverRemoved = false;
  }

  removeCover(): void {
    this.isCroppingCover = false;
    this.hasCoverImage = false;
    this.croppedCoverImage = '';
    this.coverFormData = null;
    this.coverImageChangedEvent = null;
    this.coverRemoved = this.isEditMode;
    this.videoPosterUrl = FALLBACK_VIDEO_POSTER;
  }

  // ── save ──

  save(): void {
    if (!this.canSave) return;
    if (this.fileType === 'video' && !this.isEditMode) {
      this.saveVideo();
    } else {
      this.savePhoto();
    }
  }

  private savePhoto(): void {
    this.isSaving = true;
    const albumId = this.isEditMode ? (this.editImage!.albumId ?? this.albumId) : this.albumId;
    const cover$ = this.coverFormData
      ? this.uploadCoverAndGetKey()
      : of(null as string | null);

    cover$.pipe(
      switchMap(coverKey => {
        if (this.coverFormData && !coverKey) {
          return throwError(() => ({ error: { message: 'Не удалось загрузить обложку' } }));
        }
        const fd: FormData = this.formData ? this.formData : new FormData();
        if (this.description.trim()) fd.append('description', this.description.trim());
        this.selectedServiceIds.forEach(id => fd.append('serviceIds', id));
        if (this.isEditMode) fd.append('imageId', this.editImage!.id);
        if (coverKey) fd.append('coverKey', coverKey);
        if (this.coverRemoved && !coverKey) fd.append('clearCover', 'true');
        return this._apiImage.saveImage(fd, albumId);
      })
    ).subscribe({
      next: result => { if (result) this.activeModal.close(true); },
      error: err => {
        this.isSaving = false;
        this.messageService.add({
          severity: 'error', summary: 'Ошибка',
          detail: this.describeError(err, 'Не удалось сохранить'), life: 7000
        });
      }
    });
  }

  /**
   * Достаёт человекочитаемую причину из ответа API.
   *
   * Контроллер помечен [ApiController], поэтому на невалидную модель ASP.NET сам
   * отдаёт 400 с ValidationProblemDetails: {title, status, errors: {Поле: [текст]}}.
   * Раньше обработчик игнорировал тело и показывал «Не удалось сохранить фото» —
   * настоящая причина (например, превышение MaxLength у описания) не доходила ни до
   * пользователя, ни в консоль.
   */
  private describeError(err: any, fallback: string): string {
    const body = err?.error;
    if (typeof body === 'string' && body.trim()) return body;

    const errors = body?.errors;
    if (errors && typeof errors === 'object') {
      const first = Object.values(errors).flat().filter(Boolean)[0];
      if (typeof first === 'string') return first;
    }

    return body?.message || body?.title || fallback;
  }

  private saveVideo(): void {
    if (!this.videoFile) return;
    this.isSaving = true;
    this.isVideoUploading = true;
    this.uploadProgress = 0;

    this._apiImage.getVideoUploadUrl(this.albumId, this.videoFile.name, this.videoFile.type).subscribe({
      next: ({ uploadUrl, key }) => this.uploadToS3(uploadUrl, key),
      error: () => {
        this.isSaving = false;
        this.isVideoUploading = false;
        this.messageService.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось получить URL загрузки', life: 5000 });
      }
    });
  }

  private uploadToS3(uploadUrl: string, key: string): void {
    const xhr = new XMLHttpRequest();
    xhr.timeout = 0; // без таймаута — большие файлы грузятся долго

    xhr.upload.onprogress = (e: ProgressEvent) => {
      if (e.lengthComputable) {
        this.ngZone.run(() => { this.uploadProgress = Math.round((e.loaded / e.total) * 100); });
      }
    };

    xhr.onload = () => {
      this.ngZone.run(() => {
        const success = xhr.status >= 200 && xhr.status < 300;

        // 504: прокси/nginx обрезал соединение по таймауту,
        // но если прогресс 100% — данные дошли до S3, пробуем завершить
        const likelyUploaded = xhr.status === 504 && this.uploadProgress === 100;

        if (success || likelyUploaded) {
          this.finishUpload(key);
        } else {
          this.isSaving = false;
          this.isVideoUploading = false;
          const detail = xhr.status === 504
            ? 'Сервер не успел ответить (504). Попробуйте ещё раз или уменьшите размер файла.'
            : `Ошибка загрузки: ${xhr.status}`;
          this.messageService.add({ severity: 'error', summary: 'Ошибка', detail, life: 7000 });
        }
      });
    };

    xhr.onerror = () => {
      this.ngZone.run(() => {
        this.isSaving = false;
        this.isVideoUploading = false;
        this.messageService.add({ severity: 'error', summary: 'Ошибка', detail: 'Ошибка сети при загрузке видео', life: 5000 });
      });
    };

    xhr.ontimeout = () => {
      this.ngZone.run(() => {
        this.isSaving = false;
        this.isVideoUploading = false;
        this.messageService.add({ severity: 'warn', summary: 'Таймаут', detail: 'Загрузка прервана. Попробуйте ещё раз.', life: 7000 });
      });
    };

    xhr.open('PUT', uploadUrl);
    xhr.setRequestHeader('Content-Type', this.videoFile!.type);
    xhr.send(this.videoFile!);
  }

  private finishUpload(videoKey: string): void {
    const cover$ = this.coverFormData
      ? this.uploadCoverAndGetKey()
      : of(null as string | null);

    cover$.pipe(
      switchMap(coverKey => this._apiImage.videoComplete(
        this.albumId, videoKey,
        this.description.trim(),
        this.selectedServiceIds,
        coverKey
      ))
    ).subscribe({
      next: () => this.activeModal.close(true),
      error: err => {
        this.isSaving = false;
        this.isVideoUploading = false;
        this.messageService.add({
          severity: 'error', summary: 'Ошибка',
          detail: this.describeError(err, 'Видео загружено, но не удалось сохранить'), life: 7000
        });
      }
    });
  }

  private uploadCoverAndGetKey(): Observable<string | null> {
    const coverFile = this.coverFormData!.get('cover') as File;
    if (!coverFile) return of(null);
    const albumId = this.isEditMode ? (this.editImage!.albumId ?? this.albumId) : this.albumId;

    return this._apiImage.getCoverUploadUrl(albumId, coverFile.name, coverFile.type).pipe(
      switchMap(({ key, uploadUrl }) =>
        from(fetch(uploadUrl, {
          method: 'PUT',
          headers: { 'Content-Type': coverFile.type },
          body: coverFile
        })).pipe(
          map(() => key),
          catchError(() => of(null as string | null))
        )
      ),
      catchError(() => of(null as string | null))
    );
  }

  formatFileSize(bytes?: number): string {
    if (!bytes) return '';
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} КБ`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} МБ`;
  }

  deletePhoto(): void {
    if (!this.editImage) return;
    this.isDeleting = true;
    this._apiImage.deleteImage(this.editImage.id).subscribe({
      next: () => this.activeModal.close('deleted'),
      error: () => {
        this.isDeleting = false;
        this.confirmDelete = false;
        this.messageService.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось удалить фото', life: 5000 });
      }
    });
  }

  closeModal(): void { this.activeModal.close(); }

  private blobToFile(blob: Blob, fileName: string): File | null {
    const lower = fileName.toLowerCase();
    if (lower.endsWith('.jpeg') || lower.endsWith('.jpg') || lower.endsWith('.png') || lower.endsWith('.gif')) {
      const b: any = blob;
      b.lastModifiedDate = new Date();
      b.name = fileName;
      return blob as File;
    }
    this.messageService.add({ severity: 'error', summary: 'Ошибка', detail: 'Недопустимый формат. Поддерживаются JPG, PNG.', life: 5000 });
    return null;
  }
}
