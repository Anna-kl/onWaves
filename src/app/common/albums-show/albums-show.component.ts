import { Component, HostListener, Input, OnChanges, OnInit } from '@angular/core';
import { IAlbumWithFoto } from "../../DTO/views/images/IAlbumWithFoto";

import { ModalAlbumComponent } from "../../baedit/profilebisacc/modalalbum/modalalbum.component";

import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AlbumsService } from "../../../services/albums.service";
import { DomSanitizer } from "@angular/platform-browser";
import { Store } from "@ngrx/store";
import { updateSelector } from "../../ngrx-store/update/update.selectors";
import { isUpdateRequest } from "../../ngrx-store/update/update.action";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'app-albums-show',
    templateUrl: './albums-show.component.html',
    styleUrls: ['./albums-show.component.css'],
    providers: [AlbumsService]
})
export class AlbumsShowComponent implements OnChanges {
    chooseAlbum?: IAlbumWithFoto = undefined;
    albums: IAlbumWithFoto[] = [];
    private screenHeight = 0;
    private screenWidth = 0;

    @Input() profileId: string | null = null;
    @Input() isEdit: boolean = true;
    showCreateAlbumBlock: boolean = false;

    constructor(private modalService: NgbModal,
        private _apiImage: AlbumsService,
        private store$: Store,
        private _route: Router,
        private route: ActivatedRoute,
        private sanitizer: DomSanitizer) {
        this.store$.select(updateSelector).subscribe(
            result => {
                if (result.isUpdate) {
                    this.loadAlbum();
                    this.store$.dispatch(isUpdateRequest({ flag: false }));
                }
            }
        );
        this.checkIfProfilebisaccRoute();
    }

    checkIfProfilebisaccRoute() {
        const currentUrl = this._route.url;
        const desiredRoute = '/profilebisacc/';

        this.showCreateAlbumBlock = currentUrl.includes(desiredRoute);
    }

    getImage(image: any) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64, ${image}`);
    }

    setAlbum(album: any) {
        this.chooseAlbum = this.albums.find(_ => _.id == album.id);
        this.choosedAlbum(album.id);
    }

    choosedAlbum(albumId: string) {
        this.chooseAlbum = this.albums.find(_ => _.id == albumId);

    }

    loadAlbum() {
        this._apiImage.getAlbums(this.profileId!).subscribe(
            result => {
                this.albums = result;
                if (this.chooseAlbum) {
                    this.choosedAlbum(this.chooseAlbum.id);
                }
                else if (this.albums.length > 0) {
                    this.choosedAlbum(this.albums[0].id);
                }
            });
    }
    @HostListener('window:resize', ['$event'])
    @HostListener('window')
    getScreenSize() {
        this.screenHeight = window.innerHeight;
        this.screenWidth = window.innerWidth;
    }

    showAlbum2(album: any) {
        this.getScreenSize();
        if (this.screenWidth > 500) {
            const modalRef = this.modalService.open(ModalAlbumComponent);
            // Передает выбранный albumId в модальное окно
            modalRef.componentInstance.albumId = album.id;
            modalRef.componentInstance.albumName = album.name;
            modalRef.componentInstance.isEdit = this.isEdit;
            modalRef.result.then(result => {
                this.loadAlbum();
            });
        } else {
            this._route.navigate(['/common/albums-phone/'],
                {
                    queryParams: {
                        albumId: album.id, albumName: album.name,
                        isEdit: this.isEdit, page: this._route.url
                    }
                });
        }

        this.setAlbum(album);
    }
    ngOnChanges(): void {
        if (this.profileId) {
            this.loadAlbum();
        }
    }

    onEdit(childrenPanh: string,  type: string) {
        const id = this.route.snapshot.paramMap.get('id');
        this._route.navigate([`/ba-edit/${id}/${childrenPanh}`, { isActive: type }]);
    }

}
