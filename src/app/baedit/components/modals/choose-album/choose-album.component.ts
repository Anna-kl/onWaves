import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {AlbumsService} from "../../../../../services/albums.service";
import {IAlbumWithFoto} from "../../../../DTO/views/images/IAlbumWithFoto";
import {DomSanitizer} from "@angular/platform-browser";
import {IChooseImage, IViewImage} from "../../../../DTO/views/images/IViewImage";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-choose-album',
  templateUrl: './choose-album.component.html',
  styleUrls: ['./choose-album.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [AlbumsService]
})
export class ChooseAlbumComponent implements OnInit{
  @Input() profileId!: string;
  step= 0;
  albums: IAlbumWithFoto[] = [];
  images: IChooseImage[] = [];
  constructor(private _apiImage: AlbumsService,
              private sanitizer: DomSanitizer,
              private activeModal: NgbActiveModal) {

  }

  close(){
    this.activeModal.close(null);
  }
  ngOnInit(): void {
    this._apiImage.getAlbums(this.profileId).subscribe(
      result => {
        this.albums = result;
      });
  }


  getImage(image: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64, ${image}`);
  }

  setAlbum(album: IAlbumWithFoto) {
    this.step = 1;
    this._apiImage.getImages(album.id).subscribe(
      images => {
        images.forEach(item => {
          this.images.push({...item, isChoose: false});
        })
      });
  }

  back() {
    if (this.step === 1){
      this.step = 0;
    } else {
      this.activeModal.close(null);
    }
  }

  setMain(id: string) {
      let img = this.images.find(_ => _.id === id);
      if (img) {
        img.isChoose = !img.isChoose;
      }
  }

  saveChanges() {
      this.activeModal.close(this.images.filter(_ => _.isChoose).map(_ => _.id));
  }
}
