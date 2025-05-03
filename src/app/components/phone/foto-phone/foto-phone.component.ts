import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IViewImage} from "../../../DTO/views/images/IViewImage";
import {isUpdateRequest} from "../../../ngrx-store/update/update.action";
import {AlbumsService} from "../../../../services/albums.service";
import {DomSanitizer} from "@angular/platform-browser";
import {Store} from "@ngrx/store";
import {Product} from "../../../common/modals/galereya/show-foto/show-foto.component";
import {Subject, takeUntil} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import { Location } from '@angular/common'
@Component({
  selector: 'app-foto-phone',
  templateUrl: './foto-phone.component.html',
  styleUrls: ['./foto-phone.component.css'],
  providers: [AlbumsService]
})
export class FotoPhoneComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  albumId: string|null = null;
  imageId: string|null = null;
  nameAlbum: string|null = null;
  isEdit: boolean = false;
  responsiveOptions: any[]  = [];
  images: IViewImage[] = [];
  destroy$: Subject<void> = new Subject<void>();
  private page: string|null = null;
  constructor(private _apiImage: AlbumsService,
              private sanitizer: DomSanitizer,
              private _route: Router,
              private location: Location,
              private _activateRoute: ActivatedRoute,
              private store$: Store) {
  }
  ngOnInit(): void {
    this._activateRoute.queryParams.pipe(takeUntil(this.destroy$)).subscribe(async result => {
      if (result) {
        if (result['albumId']) {
          this.albumId = result['albumId'];
          this.isEdit = result['isEdit'] !== 'false';
          this.nameAlbum = result['nameAlbum'] ;
          this.imageId = result['imageId'];
          this.page = result['page'];
          this._apiImage.getImages(this.albumId!).subscribe(
              images => {
     
                let temp = [];
                temp.push(...images.filter(_ => _.id === this.imageId));
                temp.push(...images.filter(_ => _.id !== this.imageId));
                this.images = temp;
              });
          this.products = this.getProductsData();
          this.responsiveOptions = [
            {
              breakpoint: '2500px',
              numVisible: 1,
              numScroll: 1
            },
            {
              breakpoint: '1199px',
              numVisible: 1,
              numScroll: 1
            },
            {
              breakpoint: '991px',
              numVisible: 1,
              numScroll: 1
            },
            {
              breakpoint: '767px',
              numVisible: 1,
              numScroll: 1
            },
            {
              breakpoint: '350px',
              numVisible: 1,
              numScroll: 1
            }
          ];
        }
      }});
    }

  getProductsData() {
    return [
      {
        id: '1000',
        code: 'f230fh0g3',
        name: 'Bamboo Watch',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5
      },
      {
        id: '1001',
        code: 'nvklal433',
        name: 'Black Watch',
        description: 'Product Description',
        image: 'black-watch.jpg',
        price: 72,
        category: 'Accessories',
        quantity: 61,
        inventoryStatus: 'OUTOFSTOCK',
        rating: 4
      }]
  }
  getImage(image: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64, ${image}`);
  }

  setMain(product: IViewImage) {
    if (product) {
      this.store$.dispatch(isUpdateRequest({flag: true}));
      this._apiImage.setMainImage(this.albumId!, product.id).subscribe(
          result => {
            if (result.code === 200) {
              this.images.forEach(item => {
                item.isCover = item.id === product.id;
              });
            }
          });
    }
  }

  delete(product: IViewImage) {
    this._apiImage.deleteImage(product.id).subscribe(result => {
      if (result.code === 200){
        this.images = this.images.filter(_ => _.id !== product.id);
        if (this.images.length === 0){

        }
      }
    });

  }
  close(){
    if (this.page?.includes('ba-edit')){
      if (this.page.includes('?')){
        this.page = this.page.split('?')[0];
      }
      this._route.navigate([this.page], { queryParams: {menu: 'Галерея' }});
    } else {
      this._route.navigate([this.page]);
    }
  }

  getIsCover(product: IViewImage) {
    return !product.isCover;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
