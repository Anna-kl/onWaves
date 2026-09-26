import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, forkJoin, map, of, switchMap, timeout } from 'rxjs';
import { ToastService } from 'src/services/toast.service';
import { AlbumsService } from '../../../../../services/albums.service';
import { IViewImage } from '../../../../DTO/views/images/IViewImage';
import { IAlbumWithFoto } from '../../../../DTO/views/images/IAlbumWithFoto';
import { isMediaVideoType, normalizeImageMedia } from '../../../../../helpers/common/media.helpers';
import { ChooseAlbumComponent } from '../../modals/choose-album/choose-album.component';
import { CropImageModalComponent } from '../../modals/crop-image-modal/crop-image-modal.component';
import { CreateAlbumComponent } from '../../modals/create-album/create-album.component';

const MAX_MEDIA = 10;

@Component({
  selector: 'app-service-media',
  templateUrl: './service-media.component.html',
  styleUrls: ['./service-media.component.scss'],
  providers: [AlbumsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceMediaComponent implements OnInit, OnChanges {
  @Input() profileId: string | null = null;
  @Input() serviceId: string | null = null;

  @Output() idsChange = new EventEmitter<string[]>();

  readonly max = MAX_MEDIA;
  images: IViewImage[] = [];
  loading = false;
  uploading = false;

  constructor(
    private albums: AlbumsService,
    private modal: NgbModal,
    private toast: ToastService,
    private cdr: ChangeDetectorRef,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    this.refreshLinked();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['serviceId'] && !changes['serviceId'].firstChange) {
      this.refreshLinked();
    }
  }

  get count(): number {
    return this.images.length;
  }

  get canAdd(): boolean {
    return this.count < this.max;
  }

  previewUrl(image: IViewImage): string | null {
    return normalizeImageMedia(image).previewUrl;
  }

  isVideo(image: IViewImage): boolean {
    return isMediaVideoType(image.typeImage);
  }

  remove(image: IViewImage): void {
    this.images = this.images.filter(item => item.id !== image.id);
    this.emitIds();
  }

  pickFromGallery(): void {
    if (!this.profileId) return;
    const ref = this.modal.open(ChooseAlbumComponent, { scrollable: true });
    ref.componentInstance.profileId = this.profileId;
    ref.componentInstance.selectedIds = this.images.map(item => item.id);
    ref.componentInstance.maxCount = this.max;
    ref.result.then(
      (picked: { albumId?: string; images?: IViewImage[] } | IViewImage[] | null) => {
        if (!picked) return;
        const images = Array.isArray(picked) ? picked : (picked.images ?? []);
        const albumId = Array.isArray(picked) ? images[0]?.albumId : picked.albumId;
        if (albumId) {
          this.images = this.unique([
            ...this.images.filter(item => item.albumId !== albumId),
            ...images,
          ]).slice(0, this.max);
          this.emitIds();
          this.cdr.markForCheck();
          return;
        }
        if (images.length) this.merge(images);
      },
      () => { },
    );
  }

  uploadMedia(): void {
    if (!this.profileId) return;
    if (!this.canAdd) {
      this.toast.add({
        severity: 'warn',
        summary: 'Лимит',
        detail: `К услуге можно прикрепить не больше ${this.max} фото или видео`,
        life: 4000,
      });
      return;
    }
    this.uploading = true;
    this.ensureAlbum()
      .then(albumId => {
        this.uploading = false;
        if (!albumId) return;
        const ref = this.modal.open(CropImageModalComponent, {
          modalDialogClass: 'my-crop',
          scrollable: true,
        });
        ref.componentInstance.albumId = albumId;
        ref.componentInstance.profileId = this.profileId;
        if (this.serviceId) {
          ref.componentInstance.selectedServiceIds = [this.serviceId];
        }
        ref.result.then(
          result => {
            if (!result || result === 'deleted') return;
            this.pullUploadedFromAlbum(albumId);
          },
          () => { },
        );
      })
      .catch(() => {
        this.uploading = false;
        this.cdr.markForCheck();
      });
    this.cdr.markForCheck();
  }

  private refreshLinked(): void {
    if (!this.serviceId) {
      this.emitIds();
      return;
    }
    this.loading = true;
    this.albums.getImagesFromService(this.serviceId).pipe(
      timeout(12000),
      catchError(() => of([] as IViewImage[])),
      switchMap(linked => this.mergeGalleryTagged(linked)),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(images => {
      this.images = images.slice(0, this.max);
      this.loading = false;
      this.emitIds();
      this.cdr.markForCheck();
    });
  }

  /** Join-таблица + теги ServiceIds с карточек галереи — оба контура связи. */
  private mergeGalleryTagged(linked: IViewImage[]) {
    if (!this.profileId || !this.serviceId) return of(linked);
    const serviceId = this.serviceId;
    return this.albums.getAlbums(this.profileId).pipe(
      catchError(() => of([] as IAlbumWithFoto[])),
      switchMap(albums => {
        const requests = albums
          .filter(album => !!album.id)
          .map(album => this.albums.getImages(album.id).pipe(catchError(() => of([] as IViewImage[]))));
        if (!requests.length) return of(linked);
        return forkJoin(requests).pipe(
          map(all => {
            const tagged = all.flat().filter(img =>
              this.serviceIdsOf(img).includes(serviceId.toLowerCase())
            );
            return this.unique([...linked, ...tagged]);
          }),
        );
      }),
      catchError(() => of(linked)),
    );
  }

  /**
   * Кроп грузит один файл в существующий альбом. API не отдаёт id кадра,
   * поэтому берём самый свежий неизвестный. Нельзя merge-ить весь альбом:
   * иначе в услугу попадают чужие фото галереи.
   */
  private pullUploadedFromAlbum(albumId: string): void {
    this.albums.getImages(albumId, true).pipe(
      timeout(12000),
      catchError(() => of([] as IViewImage[])),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(albumImages => {
      const known = new Set(this.images.map(item => item.id));
      const newest = albumImages
        .filter(item => item?.id && !known.has(item.id))
        .sort((a, b) => +new Date(b.dateCreated) - +new Date(a.dateCreated))[0];
      if (newest) this.merge([newest]);
    });
  }

  private merge(incoming: IViewImage[]): void {
    const next = this.unique([...this.images, ...incoming]);
    if (next.length > this.max) {
      this.toast.add({
        severity: 'warn',
        summary: 'Лимит',
        detail: `Добавлено ${this.max - this.images.length} из выбранных — лимит ${this.max}`,
        life: 4000,
      });
    }
    this.images = next.slice(0, this.max);
    this.emitIds();
    this.cdr.markForCheck();
  }

  private unique(list: IViewImage[]): IViewImage[] {
    const seen = new Set<string>();
    return list.filter(item => {
      if (!item?.id || seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
  }

  private serviceIdsOf(image: IViewImage): string[] {
    const raw = (image.serviceIds ?? (image as IViewImage & { ServiceIds?: string[] }).ServiceIds ?? []) as unknown;
    if (!Array.isArray(raw)) return [];
    return raw.map(id => String(id).toLowerCase()).filter(Boolean);
  }

  private emitIds(): void {
    this.idsChange.emit(this.images.map(item => item.id));
  }

  private ensureAlbum(): Promise<string | null> {
    if (!this.profileId) return Promise.resolve(null);
    return new Promise(resolve => {
      this.albums.getAlbums(this.profileId!, true).pipe(
        takeUntilDestroyed(this.destroyRef),
      ).subscribe({
        next: albums => {
          if (albums?.length) {
            const preferred = this.images.find(item => item.albumId)?.albumId;
            resolve(preferred || albums[0].id);
            return;
          }
          const ref = this.modal.open(CreateAlbumComponent);
          ref.componentInstance.profileUserId = this.profileId;
          ref.result.then(
            created => {
              if (!created) {
                resolve(null);
                return;
              }
              this.albums.getAlbums(this.profileId!, true).pipe(
                takeUntilDestroyed(this.destroyRef),
              ).subscribe({
                next: nextAlbums => resolve(nextAlbums[0]?.id ?? null),
                error: () => resolve(null),
              });
            },
            () => resolve(null),
          );
        },
        error: () => {
          this.toast.add({
            severity: 'error',
            summary: 'Галерея',
            detail: 'Не удалось загрузить альбомы',
            life: 5000,
          });
          resolve(null);
        },
      });
    });
  }
}
