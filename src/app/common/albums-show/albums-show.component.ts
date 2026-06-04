import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { forkJoin, of, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { IAlbumWithFoto } from "../../DTO/views/images/IAlbumWithFoto";
import { IViewImage } from "../../DTO/views/images/IViewImage";
import { CardDetailModalComponent } from "../modals/card-detail-modal/card-detail-modal.component";
import { Service } from "../../DTO/classes/services/Service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AlbumsService } from "../../../services/albums.service";
import { GroupService } from "../../../services/groupservice";
import { Store } from "@ngrx/store";
import { updateSelector } from "../../ngrx-store/update/update.selectors";
import { isUpdateRequest } from "../../ngrx-store/update/update.action";
import { MediaCard, toMediaCard } from "../../../helpers/common/media.helpers";
import { PageMediaCacheService } from '../media-cache/page-media-cache.service';

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
    serviceMap: Record<string, string> = {};
    allServices: Service[] = [];
    private updateSubscription?: Subscription;
    private mediaLoadId = 0;
    onImgError(event: Event): void {
        (event.target as HTMLImageElement).style.display = 'none';
    }  // Храним полные объекты услуг

    @Input() profileId: string | null = null;
    @Input() isEdit: boolean = false;

    constructor(
        private modalService: NgbModal,
        private _apiImage: AlbumsService,
        private groupService: GroupService,
        private store$: Store,
        private pageMediaCache: PageMediaCacheService
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
        this._apiImage.getAlbums(this.profileId!).subscribe(result => {
            this.albums = result;
            this.selectTab(null);
        });
    }

    loadServiceNames(profileId: string): void {
        forkJoin([
            this.groupService.getServiceWithout(profileId),
            this.groupService.getGroupServices(profileId).pipe(
                switchMap((groups: any[]) => {
                    if (!groups?.length) return of([] as any[]);
                    const requests = groups.filter(g => g.id).map(g => this.groupService.getService(g.id!));
                    return requests.length
                        ? forkJoin(requests).pipe(map((r: any[][]) => r.flat()))
                        : of([] as any[]);
                })
            )
        ]).subscribe({
            next: ([withoutGroup, fromGroups]) => {
                const allServices = [...withoutGroup, ...fromGroups];
                this.allServices = allServices;
                allServices.forEach((s: any) => {
                    if (s.id) this.serviceMap[s.id] = s.name;
                });
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
            forkJoin(requests).subscribe(results => {
                if (loadId !== this.mediaLoadId) return;
                this.isLoading = false;
                this.displayCards = results.flat().slice(0, 8);
                this.pageMediaCache.warmCards(this.displayCards);
            });
        } else {
            this._apiImage.getImages(albumId).subscribe(images => {
                if (loadId !== this.mediaLoadId) return;
                this.isLoading = false;
                this.displayCards = images.slice(0, 8).map(img => this.toCard(img, albumId));
                this.pageMediaCache.warmCards(this.displayCards);
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

        // Передаем уже загруженные услуги вместо того, чтобы модал их перезагружал
        // Это избегает дублирования запросов и ускоряет отображение
        if (card.serviceIds?.length && this.allServices.length) {
            modalRef.componentInstance.linkedServices = this.allServices.filter(s =>
                s.id && card.serviceIds?.includes(s.id)
            );
        }

        modalRef.result.then(() => {}, () => {});
    }

    seeAll() {
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
            albumId: album.id
        });
    }
}
