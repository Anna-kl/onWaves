import {Component, Input, OnInit} from '@angular/core';
import {AlbumsService} from "../../../../../services/albums.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ImageCroppedEvent, LoadedImage} from "ngx-image-cropper";
import {blobToFile} from "../../../../../helpers/common/image.helper";
import {DomSanitizer} from "@angular/platform-browser";
import {BackendService} from "../../../../../services/backend.service";

@Component({
  selector: 'app-create-album',
  templateUrl: './create-album.component.html',
  styleUrls: ['./create-album.component.scss'],
  providers: [AlbumsService]
})
export class CreateAlbumComponent implements OnInit {
  albumName: string = '';

  isShowCropped: boolean = true;
  formData: any;
  imageChangedEvent: any = null;
  imagesGalery: any;
  isEdit = false;

  @Input() profileUserId: string|null = null;
  constructor(private _albums: AlbumsService, private sanitizer: DomSanitizer,
              protected _apiServiceProfile: BackendService,
              private _modals: NgbActiveModal) {
  }
  ngOnInit(): void {

        // if (this.profileUserId?.avatar){
        //   this.avatar = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64, ${this.profile.avatar}`);
        // } else {
          this.imagesGalery = '/assets/img/ba-edit/galereya/new-album.svg';
        // }

  }

  saveAlbum() {
    let album = {
      name: this.albumName,
    }
    if(this.albumName.length >=1)
    this._albums.saveAlbums(this.profileUserId!, album).subscribe(
      result => {
        if (result.code === 201){
            this._modals.close(true);
        } else {
          this.errorMessage = result.message;
        }
      }
    );
  }


  closeModal() {
    this._modals.close();
  }



  // --------------   Загрузка photo
  errorMessage: string = '';
  fileChangeEvent(event: any): void {
    this.isShowCropped = false;
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.imagesGalery = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl!);
    const myFile = blobToFile(event.blob!, this.imageChangedEvent.target.files[0].name);
    this.formData = new FormData();
    const fileToUpload:File = this.imageChangedEvent.target.files[0];
    this.formData.append('file', myFile, fileToUpload.name );
    this.isEdit = true;
    // event.blob can be used to upload the cropped image
  }
  imageLoaded(image: LoadedImage) {
    this.isShowCropped = false;
  }


  cropImage() {
    this.isShowCropped = true;
    console.log("741----"+this.profileUserId)

    this._apiServiceProfile.save_avatar(this.profileUserId!, this.formData )
      .subscribe(
        () => {
          console.log('Фотография успешно загружена');
        },
        (error) => {
          console.error('Ошибка при загрузке фотографии:', error);
        }
      );
  }





}
