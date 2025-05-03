import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {AlbumsService} from "../../../../../services/albums.service";
import {IViewImage} from "../../../../DTO/views/images/IViewImage";
import {DomSanitizer} from "@angular/platform-browser";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Store} from "@ngrx/store";
import {isUpdateRequest} from "../../../../ngrx-store/update/update.action";

export interface Product {
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  inventoryStatus?: string;
  category?: string;
  image?: string;
  rating?: number;
}
@Component({
  selector: 'app-show-foto',
  templateUrl: './show-foto.component.html',
  styleUrls: ['./show-foto.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [AlbumsService ]
})
export class ShowFotoComponent implements OnInit{
  products: Product[] = [];
  @Input() albumId!: string;
  @Input() imageId!: string;
  @Input() nameAlbum!: string;
  @Input() isEdit: boolean = true;
  responsiveOptions: any[]  = [];
  images: IViewImage[] = [];
  newChanges = false;
  constructor(private _apiImage: AlbumsService,
              private activeModal: NgbActiveModal,
              private sanitizer: DomSanitizer,
              private store$: Store) {
  }
  ngOnInit(): void {
    if (this.imageId){
    this._apiImage.getImages(this.albumId).subscribe(
        images => {
          this.images = [];
          this.images.push(...images.filter(item => item.id === this.imageId));
          this.images.push(...images.filter(_ => _.id !== this.imageId));
        });
      }
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
        this._apiImage.setMainImage(this.albumId, product.id).subscribe(
          result => {
            if (result.code === 200) {
                  this.images.forEach(item => {
                    item.isCover = item.id === product.id;
                  });
                  this.newChanges = true;
            }
          });
      }
    }

  delete(product: IViewImage) {
    this._apiImage.deleteImage(product.id).subscribe(result => {
      if (result.code === 200){
        this.images = this.images.filter(_ => _.id !== product.id);
        if (this.images.length === 0){
          this.activeModal.close(true);
        }
      }
    });

  }
  close(){
    this.activeModal.close(this.newChanges);
  }

  getIsCover(product: IViewImage) {
    return !product.isCover;
  }
}
