
// import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
// import {AlbumsService} from "../../../../services/albums.service";
// import {IAlbumWithFoto} from "../../../DTO/views/images/IAlbumWithFoto";
// import {DomSanitizer} from "@angular/platform-browser";
// import {IViewImage} from "../../../DTO/views/images/IViewImage";
// import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

// @Component({
//   selector: 'app-modalalbum',
//   templateUrl: './modalalbum.component.html',
//   styleUrls: ['./modalalbum.component.css'],
//   encapsulation: ViewEncapsulation.None,
//   providers: [AlbumsService]
// })
// export class ModalalbumComponent {
//   @Input() profileId!: string;
//   step= 0;
//   albums: IAlbumWithFoto[] = [];
//   images: IViewImage[] = [];
//   constructor(private _apiImage: AlbumsService,
//               private sanitizer: DomSanitizer,
//               private activeModal: NgbActiveModal) {

//   }

//   close(){
//     this.activeModal.close(null);
//   }
//   ngOnInit(): void {
//     this._apiImage.getAlbums(this.profileId).subscribe(
//       result => {
//         this.albums = result;
//       });
//   }


//   getImage(image: any) {
//     return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64, ${image}`);
//   }

//   setAlbum(album: IAlbumWithFoto) {
//     this.step = 1;
//     this._apiImage.getImages(album.id).subscribe(
//       images => {
//         this.images = images;
//       });
//   }

//   back() {
//     if (this.step === 1){
//       this.step = 0;
//     } else {
//       this.activeModal.close(null);
//     }
//   }

//   setMain(id: string) {
//       let img = this.images.find(_ => _.id === id);
//       if (img) {
//         img.isCover = !img.isCover;
//       }
//   }

//   saveChanges() {
//       this.activeModal.close(this.images.filter(_ => _.isCover).map(_ => _.id));
//   }
// }
import {Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Component, ElementRef, Renderer2} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../../../../services/backend.service';
import {IViewBusinessProfile} from "../../../DTO/views/business/IViewBussinessProfile";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CreateAlbumComponent} from "src/app/baedit/components/modals/create-album/create-album.component";
import {BusService} from "../../../../services/busService";
import {AlbumsService} from "../../../../services/albums.service";
import {IAlbumWithFoto} from "../../../DTO/views/images/IAlbumWithFoto";

import {CropImageModalComponent} from "src/app/baedit/components/modals/crop-image-modal/crop-image-modal.component";
import {IViewImage} from "../../../DTO/views/images/IViewImage";
import {DomSanitizer} from "@angular/platform-browser";
import {MessageService} from "primeng/api";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalComponent} from "../../components/uslugi/modal/modal.component";
import {ShowFotoComponent} from "../../../common/modals/galereya/show-foto/show-foto.component";

@Component({
     selector: 'app-modalalbum',
     templateUrl: './modalalbum.component.html',
     styleUrls: ['./modalalbum.component.css'],
     encapsulation: ViewEncapsulation.None,
     providers: [AlbumsService, MessageService]
   })
export class ModalAlbumComponent {
  @Input() albumId: string|null = null;
  @Input() albumName!: string;
  @Input() isEdit:boolean = true;
  id: string | null = null;
  profile: IViewBusinessProfile | null = null;
  // сurrency: CurrencyType[] = [];
  // PaymentMethods: PaymentMethodType[] = [];
  CountReviews = 0;
  Rating = 0;
  albums: IAlbumWithFoto[] = [];
  images: IViewImage[] = [];
  chooseAlbum?: IAlbumWithFoto = undefined;
  selectedAlbumId: string | null = null;
// selectedAlbumId: string | null | undefined;
  constructor(
    private router: Router,
    private _apiImage: AlbumsService,
    private sanitizer: DomSanitizer,
    private backendService: BackendService,
    private messageService: MessageService,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal
  ) {

    // this._events.choosedProfile.subscribe(
    //   result => {
    //     this.profile = result;
    //     if (this.profile) {
    //       this.loadAlbum();
    //     }
    //   });

  }

  // choosedAlbum(albumId: string){
  //   this.chooseAlbum = this.albums.find(_ => _.id == albumId);
  //   if (this.chooseAlbum) {
  //     this._apiImage.getImages(this.chooseAlbum.id).subscribe(
  //       images => {
  //         this.images = images;
  //       });
  //   }
  // }
  // loadAlbum(){
  //   this._apiImage.getAlbums(this.profile?.id!).subscribe(
  //     result => {
  //       this.albums = result;
  //       if (this.chooseAlbum){
  //         this.choosedAlbum(this.chooseAlbum.id);
  //       }
  //       else if (this.albums.length > 0) {
  //         this.choosedAlbum(this.albums[0].id);
  //       }
  //     });
  // }
  // fileChangeEvent(event: any): void {
  //   const fileToUpload:File = event.target.files[0];
  //   this.formData.append('file', myFile, fileToUpload.name );
  // }

  ngOnInit(): void {

    if (this.albumId) {
      this._apiImage.getImages(this.albumId).subscribe(
        images => {
          this.images = images;
        });
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


  getImage(image: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64, ${image}`);
  }

  /*** выплываюзее уведомление p-toast    */
  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Создано', detail: 'Изменения сохранены', life:5000});
  }
  close(){
        this.activeModal.close(null);
     }

    showImage(image: IViewImage) {
        const modalRef = this.modalService.open(ShowFotoComponent);
        modalRef.componentInstance.albumId = this.albumId;
        modalRef.componentInstance.nameAlbum = this.albumName;
        modalRef.componentInstance.imageId = image.id;
        modalRef.componentInstance.isEdit = this.isEdit;
        this.activeModal.close();
    }
}
