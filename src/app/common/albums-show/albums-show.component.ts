import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { forkJoin, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAlbumWithFoto } from "../../DTO/views/images/IAlbumWithFoto";
import { IViewImage } from "../../DTO/views/images/IViewImage";
import { CardDetailModalComponent } from "../modals/card-detail-modal/card-detail-modal.component";
import { Service } from "../../DTO/classes/services/Service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AlbumsService } from "../../../services/albums.service";
import { GroupService } from "../../../services/groupservice";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { ProfileDataService } from "../../profile-ba/services/profile-data.service";
import { updateSelector } from "../../ngrx-store/update/update.selectors";
import { isUpdateRequest } from "../../ngrx-store/update/update.action";
import { getMediaTitle, MediaCard, toMediaCard, FALLBACK_VIDEO_POSTER } from "../../../helpers/common/media.helpers";
import { PageMediaCacheService } from '../media-cache/page-media-cache.service';
import { ProfileService } from '../../../services/profile.service';

@Component({
    selector: 'app-albums-show',
    templateUrl: './albums-show.component.html',
    styleUrls: ['./albums-show.component.css'],
    providers: [AlbumsService, PageMediaCacheService]
})
export class AlbumsShowComponent implements OnChanges, OnDestroy {
    albums: IAlbumWithFoto[] = [];
    selectedAlbumId: string | null = null;
    displayCards: MediaCard[] = [];
    isLoading = false;
    showAll = false;
    /** Сколько карточек в первом ряду, как на макете баннера. */
    readonly previewCount = 6;
    serviceMap: Record<string, string> = {};
    allServices: Service[] = [];
    private updateSubscription?: Subscription;
    private mediaLoadId = 0;
    onImgError(event: Event): void {
        (event.target as HTMLImageElement).style.display = 'none';
    }  // Храним полные объекты услуг

    @Input() profileId: string | null = null;
    @Input() isEdit: boolean = false;
    @Input() canBook: boolean = false;

    constructor(
        private modalService: NgbModal,
        private _apiImage: AlbumsService,
        private groupService: GroupService,
        private router: Router,
        private route: ActivatedRoute,
        private profileDataService: ProfileDataService,
        private store$: Store,
        private pageMediaCache: PageMediaCacheService,
        private profileService: ProfileService
    ) {
        this.updateSubscription = this.store$.select(updateSelector).subscribe(result => {
            if (result.isUpdate) {
                this.loadAlbum();
                this.store$.dispatch(isUpdateRequest({ flag: false }));
            }
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('profileId' in changes) {
            this.pageMediaCache.clear();
        }

        if (this.profileId) {
            this.loadAlbum();
            this.loadServiceNames(this.profileId);
        }
    }

    ngOnDestroy(): void {
        this.updateSubscription?.unsubscribe();
        this.pageMediaCache.clear();
    }

    loadAlbum() {
        this._apiImage.getAlbums(this.profileId!).subscribe({
            next: result => {
                this.albums = result;
                this.selectTab(null);
            },
            error: () => {
                this.albums = [];
                this.displayCards = [];
                this.isLoading = false;
            }
        });
    }

    loadServiceNames(profileId: string): void {
        this.groupService.getAllServices(profileId).subscribe({
            next: allServices => {
                this.allServices = allServices;
                allServices.forEach((s: any) => {
                    if (s.id) this.serviceMap[s.id] = s.name;
                });
            },
            error: () => {
                this.allServices = [];
                this.serviceMap = {};
            }
        });
    }

    getFirstServiceName(ids?: string[]): string | null {
        if (!ids?.length) return null;
        for (const id of ids) {
            const name = this.serviceMap[id];
            if (name) return name.length > 30 ? name.slice(0, 30) + '…' : name;
        }
        return null;
    }

    toCard(img: IViewImage, albumId: string): MediaCard {
        return toMediaCard(img, albumId);
    }

    selectTab(albumId: string | null) {
        const loadId = ++this.mediaLoadId;
        this.selectedAlbumId = albumId;
        this.showAll = false;
        this.isLoading = true;
        this.pageMediaCache.clear();

        if (albumId === null) {
            if (this.albums.length === 0) {
                this.displayCards = [];
                this.isLoading = false;
                return;
            }
            const requests = this.albums.map(album =>
                this._apiImage.getImages(album.id).pipe(
                    map(images => images.map((img: IViewImage) => this.toCard(img, album.id)))
                )
            );
            forkJoin(requests).subscribe({
                next: results => {
                    if (loadId !== this.mediaLoadId) return;
                    this.isLoading = false;
                    this.displayCards = results.flat().slice(0, 24);
                    this.pageMediaCache.warmCards(this.displayCards);
                },
                error: () => {
                    if (loadId !== this.mediaLoadId) return;
                    this.isLoading = false;
                    this.displayCards = [];
                }
            });
        } else {
            this._apiImage.getImages(albumId).subscribe({
                next: images => {
                    if (loadId !== this.mediaLoadId) return;
                    this.isLoading = false;
                    this.displayCards = images.slice(0, 24).map(img => this.toCard(img, albumId));
                    this.pageMediaCache.warmCards(this.displayCards);
                },
                error: () => {
                    if (loadId !== this.mediaLoadId) return;
                    this.isLoading = false;
                    this.displayCards = [];
                }
            });
        }
    }

    openCard(card: MediaCard) {
        const modalRef = this.modalService.open(CardDetailModalComponent, {
            centered: true,
            size: 'xl',
            windowClass: 'card-detail-modal'
        });
        modalRef.componentInstance.card = card;
        modalRef.componentInstance.profileId = this.profileId;
        modalRef.componentInstance.canBook = this.canBook;
        // Modal может открыться раньше, чем профиль мастера завершит загрузку.
        // Передаём поток, чтобы кнопка записи обновилась и в уже открытой карточке.
        modalRef.componentInstance.canBook$ = this.profileDataService.canBook$;

        // Передаем уже загруженные услуги вместо того, чтобы модал их перезагружал
        // Это избегает дублирования запросов и ускоряет отображение
        if (card.serviceIds?.length && this.allServices.length) {
            modalRef.componentInstance.linkedServices = this.allServices.filter(s =>
                s.id && card.serviceIds?.includes(s.id)
            );
        }

        modalRef.result.then((result: any) => {
            if (result?.action === 'book' && result.service) {
                if (this.profileId) {
                    this.profileService.sendWhoisVisit(this.profileId, 'click_record', null)
                        .subscribe({error: () => {}});
                }
                this.profileDataService.transferDate(null);
                this.router.navigate(['choose-service'], {
                    relativeTo: this.route,
                    queryParams: { serviceId: result.service.id }
                });
            }
        }, () => {});
    }

    get visibleCards(): MediaCard[] {
        return this.showAll ? this.displayCards : this.displayCards.slice(0, this.previewCount);
    }

    get hasMore(): boolean {
        return this.displayCards.length > this.previewCount;
    }

    cardThumb(card: MediaCard): string {
        if (card.isVideo) {
            return card.thumbUrl || card.previewUrl || FALLBACK_VIDEO_POSTER;
        }
        return card.previewUrl || card.imageUrl || FALLBACK_VIDEO_POSTER;
    }

    seeAll() {
        if (this.hasMore && !this.showAll) {
            this.showAll = true;
            return;
        }
        if (this.showAll) {
            this.showAll = false;
            return;
        }
        const targetAlbumId = this.selectedAlbumId ?? (this.albums[0]?.id ?? null);
        if (!targetAlbumId) return;
        const album = this.albums.find(a => a.id === targetAlbumId);
        if (!album) return;
        this.openCard({
            id: album.id,
            mediaUrl: album.image,
            imageUrl: album.image,
            previewUrl: album.image,
            name: album.name,
            isVideo: false,
            albumId: album.id,
            caption: getMediaTitle(album.name)
        });
    }
}
