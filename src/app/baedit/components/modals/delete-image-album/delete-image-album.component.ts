import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AlbumsService} from "../../../../../services/albums.service";

@Component({
  selector: 'app-delete-image-album',
  templateUrl: './delete-image-album.component.html',
  styleUrls: ['./delete-image-album.component.css']
})
export class DeleteImageAlbumComponent {
  constructor(private activeModal: NgbActiveModal,
              private apiImage: AlbumsService) {}

  @Output() deleted = new EventEmitter(); // передаем в galereya.component.ts
  @Input() deleteYes : any | undefined; //передаем значение из galereya.component.ts

  deleteAlbum() {
    if(this.deleteYes){
      console.log("модалка---"+this.deleteYes)
      this.apiImage.deleteAlbum(this.deleteYes).subscribe(
        result => {
          console.log("альбом удален"+result);
          this.deleted.emit(1);
        }
      );}
    this.activeModal.close();
  }

  close(){      this.activeModal.close();   }



}
