import { Component, HostListener, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../../../../services/backend.service';
import { IViewBusinessProfile } from "../../../DTO/views/business/IViewBussinessProfile";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CreateAlbumComponent } from "../modals/create-album/create-album.component";
import { AlbumsService } from "../../../../services/albums.service";
import { IAlbumWithFoto } from "../../../DTO/views/images/IAlbumWithFoto";

import { CropImageModalComponent } from "../modals/crop-image-modal/crop-image-modal.component";
import { IViewImage } from "../../../DTO/views/images/IViewImage";
import { DomSanitizer } from "@angular/platform-browser";
import { MessageService } from "primeng/api";
import { ShowFotoComponent } from "../../../common/modals/galereya/show-foto/show-foto.component";
import { DelalbumComponent } from './delalbum/delalbum.component';
import { DeleteAlbumComponent } from "../modals/delete-album/delete-album.component";
import { select, Store } from "@ngrx/store";
import { selectProfileMainClient } from "../../../ngrx-store/mainClient/store.select";
import { Subject, takeUntil } from "rxjs";
import { isUpdateRequest } from 'src/app/ngrx-store/update/update.action';


@Component({
  selector: 'app-galereya',
  templateUrl: './galereya.component.html',
  styleUrls: ['./galereya.component.css'],
  providers: [AlbumsService, MessageService]
})
export class GalereyaComponent implements OnDestroy {
  // @Input() deleteYes : number | undefined;
  id: string | null = null;
  profile: IViewBusinessProfile | null = null;
  // сurrency: CurrencyType[] = [];
  // PaymentMethods: PaymentMethodType[] = [];
  CountReviews = 0;
  Rating = 0;
  albums: IAlbumWithFoto[] = [];
  images: IViewImage[] = [];
  chooseAlbum?: IAlbumWithFoto = undefined;
  private screenHeight: number = 0;
  private screenWidth: number = 0;
  isActive: string = '';
  destroy$: Subject<void> = new Subject<void>();
  private modalRef: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store$: Store,
    private _apiImage: AlbumsService,
    private sanitizer: DomSanitizer,
    private backendService: BackendService,
    private messageService: MessageService,
    private modalService: NgbModal
  ) {

    this.route.params.subscribe(params => {
      this.isActive = params['isActive']; 
    });

    this.store$.pipe(select(selectProfileMainClient)).pipe(takeUntil(this.destroy$)).subscribe(
      result => {
        if (result) {
          this.profile = result;
          if (this.profile) {
            this.loadAlbum();
          }
        }
      }
    );
    // this._events.choosedProfile.subscribe(
    //   result => {
    //     this.profile = result;
    //     if (this.profile) {
    //       this.loadAlbum();
    //     }
    //   });

  }

  choosedAlbum(albumId: string) {
    this.chooseAlbum = this.albums.find(_ => _.id == albumId);
    if (this.chooseAlbum) {
      this._apiImage.getImages(this.chooseAlbum.id).subscribe(
        images => {
          this.images = images;
        });
    }
  }

  loadAlbum() {
    this._apiImage.getAlbums(this.profile?.id!).subscribe(
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
  // fileChangeEvent(event: any): void {
  //   const fileToUpload:File = event.target.files[0];
  //   this.formData.append('file', myFile, fileToUpload.name );
  // }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.isActive == 'album'){
      this.createAlbum();
    }
  }

  loadProfile(): void {
    if (this.id) {
      this.backendService.getFullProfile(this.id).subscribe(
        (profile: IViewBusinessProfile) => {
          this.profile = profile;
        },
        (error: any) => {
          console.error('Failed to load profile:', error);
        }
      );
    }
  }

  saveChanges(): void {
    if (this.profile) {
      this.backendService.saveProfile(this.profile.id!, this.profile).subscribe(
        () => {
          console.log('Profile saved successfully.');
          this.showSuccess();
        },
        (error: any) => {
          console.error('Failed to save profile:', error);
        }
      );
    }
  }

  backToProfile() {
    this.router.navigate(['profilebisacc', this.id]);
  }

  createAlbum() {
    this.modalRef  = this.modalService.open(CreateAlbumComponent);
    this.modalRef .componentInstance.profileUserId = this.profile?.id;
    this.modalRef .result.then((result:any) => {
      if (result) {
        this.loadAlbum();
      }
    });
  }

  saveImage() {
    let album = this.albums.find(_ => _.id === this.chooseAlbum?.id);
    const modalRef = this.modalService.open(CropImageModalComponent,
      { modalDialogClass: 'my-crop' });
    modalRef.componentInstance.albumId = this.chooseAlbum?.id;
    modalRef.result.then(result => {
      if (result) {
        if (album) {
          album.countImages = album.countImages + 1;
        }
        this.choosedAlbum(this.chooseAlbum?.id!);
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  @HostListener('window')
  getScreenSize() {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }

  // getImage(image: any) {
  //   return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64, ${image}`);
  // }

  setAlbum(album: IAlbumWithFoto) {
    this.chooseAlbum = this.albums.find(_ => _.id == album.id);
    this.choosedAlbum(album.id);
  }

  /*** выплываюзее уведомление p-toast    */
  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Создано', detail: 'Изменения сохранены', life: 5000 });
  }
  showSuccessImage() {
    this.messageService.add({ severity: 'success', summary: 'Успешно', detail: 'Изменения сохранены', life: 5000 });
  }

  showGalery(image: IViewImage) {
    this.getScreenSize();
    if (this.screenWidth > 500) {
      const modalRef = this.modalService.open(ShowFotoComponent);
      modalRef.componentInstance.albumId = image.albumId;
      modalRef.componentInstance.nameAlbum = this.chooseAlbum!.name;
      modalRef.componentInstance.imageId = image.id;
      modalRef.dismissed.subscribe((reason: any) => {
        this.loadAlbum();
      });
      modalRef.result.then(result => {
        if (result) {
          this.loadAlbum();
        }
      })
    } else {
      this.router.navigate(['common/foto-phone'],
        {
          queryParams: {
            albumId: image.albumId, nameAlbum: this.chooseAlbum!.name, isEdit: true,
            imageId: image.id, page: this.router.url
          }
        });
    }
  }

  checkAddFoto() {
    if (this.images.length > 11) {
      return false;
    }
    return true;
  }

  checkAddAlbum() {
    return this.albums.length <= 2;
  }


  modalopen() {
    const modalRef = this.modalService.open(DelalbumComponent);
    modalRef.componentInstance.name = 'World';
  }



  deleteAlbum(album: IAlbumWithFoto) {
    const modalRef = this.modalService.open(DeleteAlbumComponent);
    modalRef.componentInstance.deleteYes = album.id;
    modalRef.componentInstance.deleted.subscribe(
      (res: any) => {
        if (res == 1) {
          this.loadAlbum();
        }
      });
  }


  contextMenuVisible = false;
  contextMenuX = 0;
  contextMenuY = 0;
  selectedImage: any;

  private calculateContextMenuPosition(event: MouseEvent): { x: number; y: number } {
    const offset = 5;
    const menuWidth = 150;
    const menuHeight = 100;
    let x = event.clientX + offset;
    let y = event.clientY + offset;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    if (x + menuWidth > screenWidth) {
      x = screenWidth - menuWidth - offset;
    }

    if (y + menuHeight > screenHeight) {
      y = screenHeight - menuHeight - offset;
    }

    return { x, y };
  }

  openContextMenu(event: MouseEvent, image: any) {
    event.preventDefault();
    this.selectedImage = image;

    // Calculate and log the position
    const position = this.calculateContextMenuPosition(event);
    console.log('Calculated position:', position);

    this.contextMenuX = position.x;
    this.contextMenuY = position.y;
    this.contextMenuVisible = true;
  }

  closeContextMenu() {
    this.contextMenuVisible = false;
  }

  setMain(event: Event, albumId: any, product: IViewImage) {
    event.stopPropagation();
    event.preventDefault();
    if (product) {
      this.store$.dispatch(isUpdateRequest({ flag: true }));
      this._apiImage.setMainImage(albumId, product.id).subscribe(
        result => {
          if (result.code === 200) {
            this.closeContextMenu();
            this.loadAlbum();
            this.images.forEach(item => {
              item.isCover = item.id === product.id;
            });
          }
        });
    }
  }
  deleteImage(event: Event, product: any) {
    event.stopPropagation();
    event.preventDefault();
    this._apiImage.deleteImage(product.id).subscribe(result => {
      if (result.code === 200){
        this.closeContextMenu();
        this.loadAlbum();
        this.images = this.images.filter(_ => _.id !== product.id);
        if (this.images.length === 0){
        }
      }
    });
  }



  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

}
