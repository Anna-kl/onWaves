import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../../../../services/backend.service';
import { IViewBusinessProfile } from "../../../DTO/views/business/IViewBussinessProfile";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CreateAlbumComponent } from "../modals/create-album/create-album.component";
import { AlbumsService } from "../../../../services/albums.service";
import { IAlbumWithFoto } from "../../../DTO/views/images/IAlbumWithFoto";
import { CropImageModalComponent } from "../modals/crop-image-modal/crop-image-modal.component";
import { IViewImage } from "../../../DTO/views/images/IViewImage";
import { MessageService } from "primeng/api";
import { DelalbumComponent } from './delalbum/delalbum.component';
import { DeleteAlbumComponent } from "../modals/delete-album/delete-album.component";
import { select, Store } from "@ngrx/store";
import { selectProfileMainClient } from "../../../ngrx-store/mainClient/store.select";
import { Subject, forkJoin, of, takeUntil } from "rxjs";
import { map, switchMap } from 'rxjs/operators';
import { isUpdateRequest } from 'src/app/ngrx-store/update/update.action';
import { GroupService } from '../../../../services/groupservice';
import { isMediaVideoType, normalizeImageMedia, NormalizedMedia } from '../../../../helpers/common/media.helpers';

type GalleryImage = IViewImage & NormalizedMedia;

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
  images: GalleryImage[] = [];
  chooseAlbum?: IAlbumWithFoto = undefined;
  serviceMap: Record<string, string> = {};
  isActive: string = '';
  destroy$: Subject<void> = new Subject<void>();
  private modalRef: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store$: Store,
    private _apiImage: AlbumsService,
    private backendService: BackendService,
    private messageService: MessageService,
    private modalService: NgbModal,
    private groupService: GroupService
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
            this.loadServiceNames(this.profile.id!);
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
          this.images = images.map(image => this.toGalleryImage(image));
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

  loadServiceNames(profileId: string): void {
    forkJoin([
      this.groupService.getServiceWithout(profileId),
      this.groupService.getGroupServices(profileId).pipe(
        switchMap(groups => {
          if (!groups?.length) return of([] as any[]);
          const requests = groups.filter((g: any) => g.id).map((g: any) => this.groupService.getService(g.id!));
          return requests.length
            ? forkJoin(requests).pipe(map((r: any[][]) => r.flat()))
            : of([] as any[]);
        })
      )
    ]).subscribe({
      next: ([withoutGroup, fromGroups]) => {
        [...withoutGroup, ...fromGroups].forEach((s: any) => {
          if (s.id) this.serviceMap[s.id] = s.name;
        });
      }
    });
  }

  getServiceNames(ids?: string[]): string[] {
    if (!ids?.length) return [];
    return ids.map(id => this.serviceMap[id]).filter(Boolean);
  }

  isUUID(text?: string): boolean {
    if (!text) return false;
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}(\.(png|jpg|jpeg|gif|mp4|webm))?$/i;
    return uuidRegex.test(text);
  }

  getImageDescription(image: IViewImage): string | null {
    if (image.description) return image.description;
    if (image.name && !this.isUUID(image.name)) return image.name;
    return null;
  }

  isVideo(image: IViewImage): boolean {
    return isMediaVideoType(image.typeImage);
  }

  private toGalleryImage(image: IViewImage): GalleryImage {
    const media = normalizeImageMedia(image);

    return {
      ...image,
      url: media.mediaUrl || image.url,
      ...media
    };
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
    this.modalRef .componentInstance.profileUserId = this.profile?.id ?? this.id;
    this.modalRef .result.then((result:any) => {
      if (result) {
        this.loadAlbum();
      }
    });
  }

  saveImage() {
    let album = this.albums.find(_ => _.id === this.chooseAlbum?.id);
    const modalRef = this.modalService.open(CropImageModalComponent,
      { modalDialogClass: 'my-crop', scrollable: true });
    modalRef.componentInstance.albumId = this.chooseAlbum?.id;
    modalRef.componentInstance.profileId = this.profile?.id ?? this.id ?? '';
    modalRef.result.then(result => {
      if (result) {
        if (album) {
          album.countImages = album.countImages + 1;
        }
        this.choosedAlbum(this.chooseAlbum?.id!);
      }
    });
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
    const modalRef = this.modalService.open(CropImageModalComponent, { modalDialogClass: 'my-crop' });
    modalRef.componentInstance.editImage = image;
    modalRef.componentInstance.profileId = this.profile?.id ?? this.id;
    modalRef.result
      .then(result => { if (result) this.choosedAlbum(this.chooseAlbum!.id); })
      .catch(() => {});
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
