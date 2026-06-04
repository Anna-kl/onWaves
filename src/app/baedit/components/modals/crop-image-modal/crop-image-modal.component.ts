import {
  Component, ElementRef, Input, NgZone,
  OnDestroy, OnInit, ViewChild, ViewEncapsulation
} from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';
import { AlbumsService } from '../../../../../services/albums.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { GroupService } from '../../../../../services/groupservice';
import { Service } from '../../../../DTO/classes/services/Service';
import { IViewImage } from '../../../../DTO/views/images/IViewImage';
import { forkJoin, from, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

type FileType = 'photo' | 'video' | null;

@Component({
  selector: 'app-crop-image-modal',
  templateUrl: './crop-image-modal.component.html',
  styleUrls: ['./crop-image-modal.component.scss'],
  providers: [AlbumsService, MessageService],
  encapsulation: ViewEncapsulation.None
})
export class CropImageModalComponent implements OnInit, OnDestroy {

  @Input() albumId: string = '';
  @Input() profileId: string = '';
  @Input() editImage?: IViewImage;

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
  private rawVideoUrl: string | null = null;
  uploadProgress = 0;
  isVideoUploading = false;

  // video cover
  isCroppingCover = false;
  hasCoverImage = false;
  coverImageChangedEvent: any = null;
  croppedCoverImage: any = '';
  coverFormData: FormData | null = null;

  // ── meta ──
  description = '';
  readonly maxDescription = 300;

  // ── services ──
  services: Service[] = [];
  selectedServiceIds: string[] = [];
  showAllServices = false;
  readonly visibleServicesCount = 5;

  // ── ui ──
  isSaving = false;
  confirmDelete = false;
  isDeleting = false;

  constructor(
    private _apiImage: AlbumsService,
    private activeModal: NgbActiveModal,
    private messageService: MessageService,
    private sanitizer: DomSanitizer,
    private groupService: GroupService,
    private ngZone: NgZone,
  ) {}

  // ── lifecycle ──

  ngOnInit(): void {
    if (this.isEditMode) {
      this.croppedImage = this.editImage!.url;
      this.hasCroppedImage = true;
      this.fileType = 'photo';
      this.description = this.editImage!.description ?? '';
      this.selectedServiceIds = [...(this.editImage!.serviceIds ?? [])];
    }
    if (this.profileId) this.loadServices();
  }

  ngOnDestroy(): void {
    if (this.rawVideoUrl) URL.revokeObjectURL(this.rawVideoUrl);
  }

  // ── computed ──

  get isEditMode(): boolean { return !!this.editImage; }

  get title(): string {
    if (this.isEditMode) return 'Редактировать фото';
    if (this.fileType === 'video') return 'Добавить видео';
    return 'Добавить фото / видео';
  }

  get saveLabel(): string {
    if (this.isVideoUploading) return `Загрузка ${this.uploadProgress}%`;
    if (this.isSaving) return 'Сохранение…';
    if (this.fileType === 'video') return 'Добавить видео';
    return this.isEditMode ? 'Сохранить' : 'Добавить фото';
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
  }

  coverImageCropped(event: ImageCroppedEvent): void {
    this.croppedCoverImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl!);
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
  }

  removeCover(): void {
    this.isCroppingCover = false;
    this.hasCoverImage = false;
    this.croppedCoverImage = '';
    this.coverFormData = null;
    this.coverImageChangedEvent = null;
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
    const fd: FormData = this.formData ? this.formData : new FormData();
    if (this.description.trim()) fd.append('description', this.description.trim());
    this.selectedServiceIds.forEach(id => fd.append('serviceIds', id));
    if (this.isEditMode) fd.append('imageId', this.editImage!.id);

    const albumId = this.isEditMode ? (this.editImage!.albumId ?? this.albumId) : this.albumId;

    this._apiImage.saveImage(fd, albumId).subscribe({
      next: result => { if (result) this.activeModal.close(true); },
      error: () => {
        this.isSaving = false;
        this.messageService.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось сохранить фото', life: 5000 });
      }
    });
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
      error: () => {
        this.isSaving = false;
        this.isVideoUploading = false;
        this.messageService.add({
          severity: 'error', summary: 'Ошибка',
          detail: 'Видео загружено, но не удалось сохранить', life: 5000
        });
      }
    });
  }

  private uploadCoverAndGetKey(): Observable<string | null> {
    const coverFile = this.coverFormData!.get('cover') as File;
    if (!coverFile) return of(null);

    return this._apiImage.getCoverUploadUrl(this.albumId, coverFile.name, coverFile.type).pipe(
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
