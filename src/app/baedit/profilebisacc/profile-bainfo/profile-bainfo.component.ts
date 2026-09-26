import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastService } from 'src/services/toast.service';
import { ModalComponent } from "../../components/uslugi/modal/modal.component";
import { FormatuslugiComponent } from "../../../components/modals/formatuslugi/formatuslugi.component";
import { Service } from "../../../DTO/classes/services/Service";
import { PaymentForType } from "../../../DTO/enums/paymentForType";import { ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { Router } from '@angular/router';

import { GroupService } from '../../../../services/groupservice';
import { IViewBusinessProfile } from "../../../DTO/views/business/IViewBussinessProfile";
import { ProfileDataEditService } from "../../services/ba-edit-service";
import { DictionaryService } from "../../../../services/dictionary.service";
import { getAddressProfile, formatWorkLocations } from "../../../../helpers/common/address";
import { ProfileService } from "../../../../services/profile.service";
import { AlbumsService } from "../../../../services/albums.service";
import { IAlbumWithFoto } from "../../../DTO/views/images/IAlbumWithFoto";
import { IViewImage } from "../../../DTO/views/images/IViewImage";
import { BusService } from "../../../../services/busService";
import { DomSanitizer, Meta } from "@angular/platform-browser";
import { BackendService } from '../../../../services/backend.service';
import { createMap } from "../../../../helpers/common/maps";
import { Store } from "@ngrx/store";
import { getProfileMainClient } from "../../../ngrx-store/mainClient/store.select";
import { Observable, Subscription, forkJoin, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { IViewCoordinates } from "../../../DTO/views/profile/IViewCoordinates";
import { ProfileDataService } from 'src/app/profile-ba/services/profile-data.service';
import { IWorkLocation } from "../../../DTO/views/IWorkLocation";
import { WorkLocationType } from "../../../DTO/enums/workLocationType";
import { AccordionComponent } from "../../../common/accordion/accordion.component";

declare const ymaps: any;
@Component({
  selector: 'app-profile-bainfo',
  templateUrl: './profile-bainfo.component.html',
  styleUrls: ['./profile-bainfo.component.css'],
  providers: [GroupService, DictionaryService, ProfileService, AlbumsService]
})
export class ProfileBAInfoComponent implements OnInit {
  id: string | null = null;
  profile: IViewBusinessProfile | null = null;
  albums: IAlbumWithFoto[] = [];
  images: IViewImage[] = [];
  map: any;
  @ViewChild('yamaps', { static: false }) el!: ElementRef;
  /** Список услуг на этой странице — обновляем напрямую после создания группы. */
  @ViewChild(AccordionComponent) accordion?: AccordionComponent;
  companyId: any;
  isHasService = false;
  geoPoint$: Observable<IViewCoordinates | null> = new Observable<IViewCoordinates | null>();

  // Локации работы: GET /work-location отдаёт массив (по записи на формат).
  protected readonly WorkLocationType = WorkLocationType;
  workLocations: IWorkLocation[] = [];
  geoList: IViewCoordinates[] = [];

  constructor(private messageService: ToastService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router,
    private store$: Store,
    private _dictionaries: DictionaryService,
    private sanitizer: DomSanitizer,
    private _dataService: ProfileDataEditService,
    private _profileData: ProfileDataService,
    private _meta: Meta,
    private _profileService: ProfileService,
    private backendService: BackendService) { }

  get fixedLoc(): IWorkLocation | undefined {
    return this.workLocations.find(w => w.locationType === WorkLocationType.Fixed);
  }
  get mobileLoc(): IWorkLocation | undefined {
    return this.workLocations.find(w => w.locationType === WorkLocationType.Mobile);
  }
  get hasOnline(): boolean {
    return this.workLocations.some(w => w.locationType === WorkLocationType.Online);
  }
  get isMobileWork(): boolean {
    return !!this.mobileLoc;
  }

  /** Строка адреса: плоский адрес по всем форматам (через запятую); фолбэк — address от бэка. */
  get addressText(): string {
    const text = formatWorkLocations(this.workLocations);
    if (text) return text;
    return this.profile?.address ? getAddressProfile(this.profile.address) : '';
  }

  get hasAddress(): boolean {
    return !!this.addressText;
  }

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
      // Пока грузится work-location — предварительная точка из адреса профиля.
      if (this.profile?.address) {
        this.geoPoint$ = this._dictionaries.getPoint(getAddressProfile(this.profile.address));
      }
      if (this.companyId) {
        this.loadWorkLocations(this.companyId);
      }
    });
  }

  /** Читаем локации работы массивом (по записи на формат) и обновляем карту. */
  private loadWorkLocations(id: string): void {
    this._profileService.getWorkLocation(id).subscribe({
      next: (res) => {
        const data = res?.code === 200 ? res.data : null;
        this.workLocations = Array.isArray(data) ? data as IWorkLocation[] : (data ? [data as IWorkLocation] : []);
        this.updateGeo();
      },
      error: () => {
        this.workLocations = [];
      }
    });
  }

  /** Карта: точка по офисной записи + маркеры городов по разъездной. */
  private updateGeo(): void {
    const f = this.fixedLoc;
    if (f) {
      const str = [f.country, f.region, f.city, f.street, f.house]
        .filter(v => !!v && `${v}`.trim().length > 0)
        .join(', ');
      this.geoPoint$ = str ? this._dictionaries.getPoint(str) : of(null);
    } else if (!this.isMobileWork && this.profile?.address) {
      this.geoPoint$ = this._dictionaries.getPoint(getAddressProfile(this.profile.address));
    } else {
      this.geoPoint$ = of(null);
    }

    if (this.isMobileWork) {
      this.updateCityMarkers();
    } else {
      this.geoList = [];
    }
  }

  /** Геокодируем каждый город разъездной работы и ставим маркеры. */
  private updateCityMarkers(): void {
    const m = this.mobileLoc;
    const cities = (m?.cities ?? []).filter(c => !!c && c.trim().length > 0);
    if (!cities.length) {
      this.geoList = [];
      return;
    }
    const region = m?.region ?? '';
    const country = m?.country ?? '';
    const requests = cities.map(city =>
      this._dictionaries.getPoint(`${country}, ${region}, ${city}`).pipe(
        catchError(() => of(null))
      )
    );
    forkJoin(requests).subscribe(results => {
      this.geoList = results.filter((r): r is IViewCoordinates => !!r);
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
    modalRef.result.then(
      res => {
        if (!res) return;
        this.showSuccess();
        // Здесь не было вообще ничего, кроме тоста: группа создавалась на бэке,
        // а аккордеон ниже по странице оставался со старым списком до F5.
        this.accordion?.update(true);
      },
      // dismiss (Esc/клик по фону) — гасим Unhandled Promise Rejection.
      () => { }
    );
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

