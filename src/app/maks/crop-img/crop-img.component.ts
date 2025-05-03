import {Component, OnInit} from '@angular/core';
import {ImageCroppedEvent, LoadedImage} from "ngx-image-cropper";
import {DomSanitizer} from "@angular/platform-browser";


@Component({
  selector: 'app-crop-img',
  templateUrl: './crop-img.component.html',
  styleUrls: ['./crop-img.component.css']
})

export class CropImgComponent{
  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(
    private sanitizer: DomSanitizer
  ) {
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl!);
    // event.blob can be used to upload the cropped image
  }
  imageLoaded(image: LoadedImage) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
}
