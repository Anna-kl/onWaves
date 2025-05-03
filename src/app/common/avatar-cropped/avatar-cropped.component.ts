import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2}
  from '@angular/core';
import {ImageCroppedEvent, LoadedImage} from "ngx-image-cropper";
import {blobToFile} from "../../../helpers/common/image.helper";

import {DomSanitizer} from "@angular/platform-browser";

import {BackendService} from "../../../services/backend.service";

@Component({
  selector: 'app-avatar-cropped',
  templateUrl: './avatar-cropped.component.html',
  styleUrls: ['./avatar-cropped.component.scss']
})
export class AvatarCroppedComponent implements OnInit {
isSetAvatar: boolean = false;
  constructor(private sanitizer: DomSanitizer,
              private _apiServiceProfile: BackendService,
              private renderer2: Renderer2,
              private elementRef: ElementRef) {

    this.renderer2.listen('window', 'click',(e:Event)=>{
      /**
       * Only run when toggleButton is not clicked
       * If we don't check this, all clicks (even on the toggle button) gets into this
       * section which in the result we might never see the menu open!
       * And the menu itself is checked here, and it's where we check just outside of
       * the menu and button the condition abbove must close the menu
       */
      let element = e.target as HTMLElement;
      if(element.className.toString().includes('change')){
        const tab = this.elementRef.nativeElement.getElementsByClassName('upfile')
        if (tab.length > 0){
          tab[0].click();
        }
      }
    });
  }

  ngOnInit(): void {

    }

  getAvatar(avatar: any) {
    if (avatar) {
      if (avatar.includes('blob')){
        return false;
      }
      return  this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64, ${avatar}`);

    } else {
      return  '/assets/img/AvatarBig.png';
    }
  }
  newAvatar: any|null = null;
  @Output() onSave = new EventEmitter<boolean>();
  @Output() getData = new EventEmitter<boolean>();
  @Input() avatar: any;
  @Input() id: string|null = null;
  isShowCropped: boolean = true;
  formData: any;
  imageChangedEvent: any = null;
  fileChangeEvent(event: any): void {
    this.isShowCropped = false;
    this.isSetAvatar = false;
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.newAvatar = event.objectUrl!;
    const myFile = blobToFile(event.blob!, this.imageChangedEvent.target.files[0].name);
    this.formData = new FormData();
    const fileToUpload:File = this.imageChangedEvent.target.files[0];
    this.formData.append('file', myFile, fileToUpload.name );
    // event.blob can be used to upload the cropped image
  }
  imageLoaded(image: LoadedImage) {
    this.isShowCropped = false;
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  cropImage() {
    this.isSetAvatar = true;
    this.isShowCropped = true;
 
  }

  save(){
    if (this.id) {
      this._apiServiceProfile.save_avatar(this.id!, this.formData)
        .subscribe(result => {
            console.error('Ошибка при загрузке фотографии:', '');
            this.onSave.emit(true);
          },
          (error) => {
            console.error('Ошибка при загрузке фотографии:', error);
          }
        );
    } else {
      console.log(this.formData);
      this.onSave.emit(this.formData);
    }
    this.isSetAvatar = false;
  }

}
