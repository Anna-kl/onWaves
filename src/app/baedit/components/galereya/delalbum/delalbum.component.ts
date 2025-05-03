import { Component, Input } from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { IViewImage } from 'src/app/DTO/views/images/IViewImage';
import { ElementRef, Renderer2} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../../../../../services/backend.service';
import {IViewBusinessProfile} from "../../../../DTO/views/business/IViewBussinessProfile";
import {CreateAlbumComponent} from "../../modals/create-album/create-album.component";
import {BusService} from "../../../../../services/busService";
import {AlbumsService} from "../../../../../services/albums.service";
import {IAlbumWithFoto} from "../../../../DTO/views/images/IAlbumWithFoto";
import {CropImageModalComponent} from "../../modals/crop-image-modal/crop-image-modal.component";
import {DomSanitizer} from "@angular/platform-browser";
import {MessageService} from "primeng/api";
import {ShowFotoComponent} from "../../../../common/modals/galereya/show-foto/show-foto.component";

@Component({
  selector: 'app-delalbum',
  templateUrl: './delalbum.component.html',
  styleUrls: ['./delalbum.component.css'],
  providers: [AlbumsService, MessageService]
})
export class DelalbumComponent {
  id: string | null = null;
  profile: IViewBusinessProfile | null = null;
  @Input() images: IViewImage[] = [];
  CountReviews = 0;
  Rating = 0;
  albums: IAlbumWithFoto[] = [];
  chooseAlbum?: IAlbumWithFoto = undefined;
  constructor( private router: Router,
    public activeModal: NgbActiveModal,
    private route: ActivatedRoute,
    private _events: BusService,
    private _apiImage: AlbumsService,
    private sanitizer: DomSanitizer,
    private backendService: BackendService,
    private messageService: MessageService,
    private modalService: NgbModal,) {
      this._events.choosedProfile.subscribe(
        result => {
          this.profile = result;
          if (this.profile) {
            this.loadAlbum();
          }
        });
}
ngOnInit(): void {
  this.id = this.route.snapshot.paramMap.get('id');
  // if (this.profile) {
  //   this.loadProfile();
  //
  // }
}
choosedAlbum(albumId: string){
  this.chooseAlbum = this.albums.find(_ => _.id == albumId);
  if (this.chooseAlbum) {
    this._apiImage.getImages(this.chooseAlbum.id).subscribe(
      images => {
        this.images = images;
      });
  }
}
loadAlbum(){
  this._apiImage.getAlbums(this.profile?.id!).subscribe(
    result => {
      this.albums = result;
      if (this.chooseAlbum){
        this.choosedAlbum(this.chooseAlbum.id);
      }
      else if (this.albums.length > 0) {
        this.choosedAlbum(this.albums[0].id);
      }
    });
}
setAlbum(album: IAlbumWithFoto) {
  this.chooseAlbum = this.albums.find(_ => _.id == album.id);
  this.choosedAlbum(album.id);
}
close() {
  this.activeModal.close();

}
deleteAlbum(album: IAlbumWithFoto) {
  this._apiImage.deleteAlbum(album.id).subscribe(
      result => {
        this.loadAlbum();
      }
  );
}
// deleteAlbum() {
//   if (this.chooseAlbum) {
//     this._apiImage.deleteAlbum(this.chooseAlbum.id).subscribe(
//         result => {
//           this.loadAlbum();
//         }
//     );
//   }
// }
}
