import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AlbumsService} from "../../../../../services/albums.service";



@Component({
  selector: 'app-delete-album',
  templateUrl: './delete-album.component.html',
  styleUrls: ['./delete-album.component.css'],
  providers: [AlbumsService]
})
export class DeleteAlbumComponent {


  constructor(private activeModal: NgbActiveModal,
              private apiImage: AlbumsService) {}

  @Output() deleted = new EventEmitter(); // передаем в galereya.component.ts
  @Input() deleteYes : any | undefined; //передаем значение из galereya.component.ts


  //*********************  удаление альбома  *****************//
  deleteAlbum() {
    if (!this.deleteYes) {
      this.activeModal.close();
      return;
    }
    this.apiImage.deleteAlbum(this.deleteYes).subscribe({
      next: result => {
        this.deleted.emit(result.code === 200 || result.code === 404
          ? 1
          : (result.message || 'Не удалось удалить альбом'));
        this.activeModal.close();
      },
      error: () => {
        this.deleted.emit('Не удалось удалить альбом');
        this.activeModal.close();
      }
    });
  }

  close(){  this.activeModal.close(); }

}

