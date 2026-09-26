import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {AlbumsService} from "../../../../../services/albums.service";
import {IAlbumWithFoto} from "../../../../DTO/views/images/IAlbumWithFoto";
import {IChooseImage, IViewImage} from "../../../../DTO/views/images/IViewImage";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import { isMediaVideoType, normalizeImageMedia } from '../../../../../helpers/common/media.helpers';

@Component({
  selector: 'app-choose-album',
  templateUrl: './choose-album.component.html',
  styleUrls: ['./choose-album.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [AlbumsService]
})
export class ChooseAlbumComponent implements OnInit{
  @Input() profileId!: string;
  /** Уже прикреплённые к услуге кадры — отмечаем в альбоме. */
  @Input() selectedIds: string[] = [];
  @Input() maxCount = 10;
  step= 0;
  albums: IAlbumWithFoto[] = [];
  images: IChooseImage[] = [];
  currentAlbumId: string | null = null;
  readonly isVideo = isMediaVideoType;
  constructor(private _apiImage: AlbumsService,
              private activeModal: NgbActiveModal) {

  }

  close(){
    this.activeModal.close(null);
  }
  ngOnInit(): void {
    this._apiImage.getAlbums(this.profileId, true).subscribe(
      result => {
        this.albums = result;
      });
  }


  /**
   * Обложка альбома с API — публичный URL (S3), не base64.
   * Старый getImage клеил data:image/jpg;base64 к URL, и превью в акции было пустым.
   */
  coverSrc(album: IAlbumWithFoto): string | null {
    const image = album?.image;
    if (typeof image !== 'string') return null;
    const value = image.trim();
    if (!value) return null;
    if (value.startsWith('http') || value.startsWith('/') || value.startsWith('data:')) {
      return value;
    }
    return `data:image/jpg;base64,${value}`;
  }

  /** Превью кадра в сетке: для ролика без обложки не подставляем mp4 в <img>. */
  previewSrc(image: IViewImage): string {
    return normalizeImageMedia(image).previewUrl || '';
  }

  setAlbum(album: IAlbumWithFoto) {
    this.step = 1;
    this.currentAlbumId = album.id;
    this.images = [];
    this._apiImage.getImages(album.id).subscribe(
      images => {
        const selected = new Set(this.selectedIds || []);
        this.images = images.map(item => ({
          ...item,
          isChoose: selected.has(item.id)
        }));
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
      const img = this.images.find(_ => _.id === id);
      if (!img) return;
      if (!img.isChoose && this.chosenCount >= this.maxCount) {
        return;
      }
      img.isChoose = !img.isChoose;
  }

  get chosenCount(): number {
    return this.images.filter(item => item.isChoose).length;
  }

  saveChanges() {
      const chosen: IViewImage[] = this.images.filter(_ => _.isChoose);
      this.activeModal.close({ albumId: this.currentAlbumId, images: chosen });
  }
}
