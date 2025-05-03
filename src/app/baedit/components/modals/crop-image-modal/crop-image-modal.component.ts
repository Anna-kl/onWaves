import {Component, ElementRef, Input, OnInit, Renderer2, ViewEncapsulation} from '@angular/core';
import {ImageCroppedEvent, LoadedImage} from "ngx-image-cropper";
import {DomSanitizer} from "@angular/platform-browser";
import {AlbumsService} from "../../../../../services/albums.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {MessageService} from "primeng/api";


@Component({
  selector: 'app-crop-image-modal',
  templateUrl: './crop-image-modal.component.html',
  styleUrls: ['./crop-image-modal.component.scss'],
  providers: [AlbumsService, MessageService],
  encapsulation: ViewEncapsulation.None
})
export class CropImageModalComponent implements OnInit {
  isShowCropped: boolean = true;
  formData: any;
  imageChangedEvent: any = null;
  isEdit = false;
  croppedImage: any = '';
  @Input() albumId: string = '';
  isCropperLoad: boolean = false;
  avatar: any;
  // formData: FormData|null = null;
    constructor(
      private renderer2: Renderer2,
      private elementRef: ElementRef,
      private _apiImage: AlbumsService,
      private activeModel: NgbActiveModal,
      private messageService: MessageService,
      private sanitizer: DomSanitizer,private _modals: NgbActiveModal) {
      this.renderer2.listen('window', 'click', (e: Event) => {
        /**
         * Only run when toggleButton is not clicked
         * If we don't check this, all clicks (even on the toggle button) gets into this
         * section which in the result we might never see the menu open!
         * And the menu itself is checked here, and it's where we check just outside of
         * the menu and button the condition abbove must close the menu
         */
        let element = e.target as HTMLElement;
        if (element.className.toString().includes('upfile5') && !this.isShowCropped) {
          const tab = this.elementRef.nativeElement.getElementsByClassName('upfile6')
          if (tab.length > 0) {
            tab[0].click();
            this.isShowCropped = true;
          }
        }
      });
    }

  ngOnInit(): void {
    if (!this.avatar){
    this.croppedImage = '/assets/img/ba-edit/galereya/new-album.svg';
    }
    else {
      
    }
  }

  fileChangeEvent($event: Event) {
    this.imageChangedEvent = $event;
    this.isShowCropped = false;
    this.textSave = 'Готово';
    this.textCropImage = 'Выбрать другое';
  }

  public blobToFile = (theBlob: Blob, fileName:string): File | null => {
    const b: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    if (fileName.includes('jpeg') || fileName.includes('png') || fileName.includes('giff')
    || fileName.includes('jpg')){
      b.name = fileName;
      return theBlob as File;
    }else {
      this.showErrorImage();
      return null;
    }


  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl!);
    const fileToUpload:File = this.imageChangedEvent.target.files[0];
    const myFile = this.blobToFile(event.blob!, fileToUpload.name);
    this.formData = new FormData();

    this.formData.append('file', myFile, fileToUpload.name );
    // event.blob can be used to upload the cropped image
  }

  imageLoaded(image: LoadedImage) {
    this.isShowCropped = false;
  }
  cropperReady() {

  }
  loadImageFailed() {
    // show message
  }
  textSave = 'Готово';
  textCropImage = 'Выберите изображение';
  cropImage() {
    if (this.textSave === 'Готово') {
      this.isShowCropped = true;
      this.textSave = 'Сохранить';
    } else {
      this._apiImage.saveImage(this.formData, this.albumId).subscribe(
        result => {
          if (result){
            this.showSuccessImage();
            this.activeModel.close(true);
          }
        });
    }
  }
  showSuccessImage() {
    this.messageService.add({severity:'success', summary: 'Успешно', detail: 'Изменения сохранены', life:5000});
  }

  showErrorImage() {

    this.messageService.add({severity:'error', summary: 'Ошибка',
      detail: 'Недопустимый формат изображения', life:5000});
  }
  closeModal() {
    this._modals.close();
  }

}
//