import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from "../../components/uslugi/modal/modal.component";
import { FormatuslugiComponent } from "../../../components/modals/formatuslugi/formatuslugi.component";
import { Service } from "../../../DTO/classes/services/Service";
import { PaymentForType } from "../../../DTO/enums/paymentForType";
import { MessageService } from "primeng/api";
import { ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { Router } from '@angular/router';

import { GroupService } from '../../../../services/groupservice';
import { IViewBusinessProfile } from "../../../DTO/views/business/IViewBussinessProfile";
import { IGroupWithSubGroups } from "../../../DTO/views/services/IGroupWithSubGroup";
import { ProfileDataEditService } from "../../services/ba-edit-service";
import { DictionaryService } from "../../../../services/dictionary.service";
import { IViewAddress } from "../../../DTO/views/IViewAddress";
import { getAddressProfile } from "../../../../helpers/common/address";
import { ProfileService } from "../../../../services/profile.service";
import { AlbumsService } from "../../../../services/albums.service";
import { IAlbumWithFoto } from "../../../DTO/views/images/IAlbumWithFoto";
import { IViewImage } from "../../../DTO/views/images/IViewImage";
import { BusService } from "../../../../services/busService";
import { DomSanitizer, Meta } from "@angular/platform-browser";
import { BackendService } from '../../../../services/backend.service';
import { createMap } from "../../../../helpers/common/maps";
import { Store } from "@ngrx/store";
import { MainProfileComponent } from "../../components/main-profile/main-profile.component";
import { getProfileMainClient } from "../../../ngrx-store/mainClient/store.select";
import { Observable, Subscription } from "rxjs";
import { IViewCoordinates } from "../../../DTO/views/profile/IViewCoordinates";
import { ProfileDataService } from 'src/app/profile-ba/services/profile-data.service';

declare const ymaps: any;
@Component({
  selector: 'app-profile-bainfo',
  templateUrl: './profile-bainfo.component.html',
  styleUrls: ['./profile-bainfo.component.css'],
  providers: [GroupService, DictionaryService, ProfileService, MessageService, AlbumsService]
})
export class ProfileBAInfoComponent implements OnInit {
  id: string | null = null;
  profile: IViewBusinessProfile | null = null;
  albums: IAlbumWithFoto[] = [];
  images: IViewImage[] = [];
  map: any;
  @ViewChild('yamaps', { static: false }) el!: ElementRef;
  companyId: any;
  isHasService = false;
  geoPoint$: Observable<IViewCoordinates> = new Observable<IViewCoordinates>();
  constructor(private messageService: MessageService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router,
    private store$: Store,
    private _dictionaries: DictionaryService,
    private sanitizer: DomSanitizer,
    private _dataService: ProfileDataEditService,
    private _profileData: ProfileDataService,
    private _meta: Meta,
    private backendService: BackendService) { }

  saveChanges(): void {
    if (this.profile) {
      this.backendService.saveProfile(this.profile.id!, this.profile).subscribe(
        () => {
          console.log('Profile saved successfully.');
          this.showSuccess();
        },
        (error: any) => {
          console.error('Failed to save profile:', error);
        }
      );
    }
  }

  backToProfile() {
    this.router.navigate(['profilebisacc', this.id]);
  }

  getImage(image: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64, ${image}`);
  }

  update() {

  }


  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Создано', detail: 'Шруппа успешно добавлена', life: 5000 });
    this.messageService.add({ severity: 'success', summary: 'Создано', detail: 'Изменения сохранены', life: 5000 });
  }

  ngOnInit(): void {
    this.store$.select(getProfileMainClient).subscribe(result => {
      this.profile = result.profileMainClient;
      this.companyId = result.profileMainClient?.id;
      if (this.profile?.address) {
        const addressStr = getAddressProfile(this.profile.address);
        this.geoPoint$ = this._dictionaries.getPoint(addressStr);
      }
    });
  }

  initializeMap(lat: number, lng: number): void {
    if (this.el?.nativeElement) {
      ymaps.ready(() => {
        this.map = new ymaps.Map(this.el.nativeElement, {
          center: [lat, lng],
          zoom: 12
        });

        const placemark = new ymaps.Placemark([lat, lng]);
        this.map.geoObjects.add(placemark);
      });
    }
  }

  openPopUpM() {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.profileUserId = this.companyId;
    modalRef.result.then(res => {
      if (res) {
        this.showSuccess();
      }
    });
  }

  openPopUpMS() {
    const modalRef = this.modalService.open(FormatuslugiComponent);
  }
  getMethodPayment(service: Service) {
    return service.paymentForType === PaymentForType.ForService;

  }

  protected readonly getAddressProfile = getAddressProfile;


  onEdit(childrenPanh: string) {
    this.router.navigate(['ba-edit', this.companyId, childrenPanh]);
  }

}

