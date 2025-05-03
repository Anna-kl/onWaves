import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IViewBusinessProfile} from "../../../DTO/views/business/IViewBussinessProfile";
import {IAlbumWithFoto} from "../../../DTO/views/images/IAlbumWithFoto";
import {IViewImage} from "../../../DTO/views/images/IViewImage";
import {ActivatedRoute, Router} from "@angular/router";
import {AlbumsService} from "../../../../services/albums.service";
import {DomSanitizer} from "@angular/platform-browser";
import {MessageService} from "primeng/api";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-album-phone',
  templateUrl: './album-phone.component.html',
  styleUrls: ['./album-phone.component.css'],
  providers: [AlbumsService, MessageService]
})
export class AlbumPhoneComponent implements OnInit, OnDestroy {
  destroy$: Subject<void> = new Subject<void>();
  displayBasic: boolean = false;
  private page: string|null = null;


  constructor(    private router: Router,
                  private _apiImage: AlbumsService,
                  private sanitizer: DomSanitizer,
                  private _activateRoute: ActivatedRoute,
                  private messageService: MessageService) {
  }

  albumId: string|null = null;
  albumName: string|null = null;
  isEdit:boolean = true;
  id: string | null = null;
  profile: IViewBusinessProfile | null = null;

  albums: IAlbumWithFoto[] = [];
  images: IViewImage[] = [];
  activeIndex: number = 0;
  ngOnInit(): void {
    this._activateRoute.queryParams.pipe(takeUntil(this.destroy$)).subscribe(async result => {
      if (result) {
        if (result['albumId']){
        this.albumId = result['albumId'];
        this.albumName = result['albumName'];
        this.isEdit = result['isEdit'] !== 'false';
        this.page = result['page'];
        if (this.albumId) {
          this._apiImage.getImages(this.albumId).subscribe(
              images => {
                this.images = images;
              });
        }}
      }
      });
  }
  backToProfile() {
    this.router.navigate(['profilebisacc', this.id]);
  }
  responsiveOptions: any[] = [
    {
      breakpoint: '1500px',
      numVisible: 5
    },
    {
      breakpoint: '1024px',
      numVisible: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];


  getImage(image: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64, ${image}`);
  }

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Создано', detail: 'Изменения сохранены', life:5000});
  }
  close(){
   this.router.navigate([this.page]);
  }

  showImage(image: IViewImage) {
    this.router.navigate(['common/foto-phone'],
        { queryParams: {albumId: this.albumId, nameAlbum: this.albumName, isEdit: this.isEdit,
          imageId: image.id, page: this.page}});
    // const modalRef = this.modalService.open(ShowFotoComponent);
    // modalRef.componentInstance.albumId = this.albumId;
    // modalRef.componentInstance.nameAlbum = this.albumName;
    // modalRef.componentInstance.imageId = image.id;
    // modalRef.componentInstance.isEdit = this.isEdit;
    // this.activeModal.close();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
