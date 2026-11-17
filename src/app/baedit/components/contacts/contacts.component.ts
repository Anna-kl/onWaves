import {Component, ElementRef, Renderer2, OnInit, ViewChild} from '@angular/core';
import { ToastService } from 'src/services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';

import {IViewBusinessProfile} from "../../../DTO/views/business/IViewBussinessProfile";
import {BackendService} from "../../../../services/backend.service";
import {ServiceRegisterBusinessProfile} from "../../../../services/service-register-business";
import {DictionaryService} from "../../../../services/dictionary.service";
import {getAddressProfile, getFullAddressProfile} from "../../../../helpers/common/address";
import {IViewAddress} from "../../../DTO/views/IViewAddress";
import {WorkLocationType} from "../../../DTO/enums/workLocationType";
import {IWorkLocation} from "../../../DTO/views/IWorkLocation";
import {IFixedPointDraft, IWorkFormats, IWorkLocationChange} from "../../../DTO/views/IWorkFormats";
import {resolveAvatarUrl} from "../../../../helpers/common/avatar1";
import {ProfileService} from "../../../../services/profile.service";
import {LoginService} from "../../../auth/login.service";
import {select, Store} from "@ngrx/store";
import {selectProfileMainClient} from "../../../ngrx-store/mainClient/store.select";
import {Observable, forkJoin, of} from "rxjs";
import {catchError, map, switchMap} from "rxjs/operators";
import {IViewCoordinates} from "../../../DTO/views/profile/IViewCoordinates";
import {IResponse} from "../../../DTO/classes/IResponse";
import { YMapComponent, YMapDefaultSchemeLayerDirective } from 'angular-yandex-maps-v3';
import { DomSanitizer } from '@angular/platform-browser';

declare const ymaps: any;
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  providers: [DictionaryService, YMapComponent, YMapDefaultSchemeLayerDirective]
})


export class ContactsComponent implements OnInit{


  address: IViewAddress|null = null;
  strAddress: string = '';
  formats: IWorkFormats = { online: false, fixed: true, mobile: false };
  cities: string[] = [];
  fixedPoints: IFixedPointDraft[] = [];
  removedFixedPointIds: string[] = [];
  // Маркеры городов для разъездной работы
  geoList: IViewCoordinates[] = [];

  change($event: any,arg1: string) {
    if (arg1 === 'site')
    if ($event.length == 1 && $event[0] !== 'h'){
      if (this.profile)
        this.profile.webSite = 'https://'+ $event
    }
    this.isEdit = true;
  }

  changeAddress($event: IWorkLocationChange) {
    // Помечаем форму изменённой только при пользовательском действии, а не при автозаполнении на загрузке
    if ($event.userChanged) {
      this.isEdit = true;
    }
    this.strAddress = $event.strAddress;
    this.address = $event.viewAddress;
    this.formats = $event.formats;
    this.cities = $event.cities ?? [];
    this.fixedPoints = $event.fixedPoints ?? [];
    this.removedFixedPointIds = $event.removedFixedPointIds ?? [];
    this.refreshMap();
  }

  /** Маркер на каждую точку и на каждый город выезда. Одна точка без выезда остаётся главной меткой. */
  private refreshMap(): void {
    const pointQueries = this.formats.fixed
      ? this.fixedPoints
        .map(point => [point.country, point.region, point.city, point.street, point.house]
          .filter(part => !!part && `${part}`.trim().length > 0)
          .join(', '))
        .filter(query => query.length > 0)
      : [];
    const cityQueries = this.formats.mobile
      ? this.cities
        .filter(city => !!city && city.trim().length > 0)
        .map(city => [this.address?.country, this.address?.region, city]
          .filter(part => !!part && `${part}`.trim().length > 0)
          .join(', '))
      : [];
    if (pointQueries.length === 1 && !cityQueries.length) {
      this.geoPoint$ = this._dictionaries.getPoint(pointQueries[0]);
      this.geoList = [];
      return;
    }
    const queries = [...pointQueries, ...cityQueries];
    if (!queries.length) {
      this.geoPoint$ = of(null);
      this.geoList = [];
      return;
    }
    this.geoPoint$ = of(null);
    forkJoin(queries.map(query => this._dictionaries.getPoint(query).pipe(catchError(() => of(null)))))
      .subscribe(results => {
        this.geoList = results.filter((item): item is IViewCoordinates => !!item);
      });
  }

  lng = 0;
  lat = 0;
  isEdit = false;
  id: string | null = null;
  profile: IViewBusinessProfile | null = null;
  phone!: string;
  geoPoint$: Observable<IViewCoordinates|null> = new Observable<IViewCoordinates | null>();
 

  constructor(
    private router: Router,
    private store$: Store,
    private _dictionaries: DictionaryService,
    private backendService: BackendService,
    private _loginService: LoginService,
    private messageService: ToastService,
    private _profileService: ProfileService,
    private sanitizer: DomSanitizer
  ) {

  }

  private pointBody(point: IFixedPointDraft): IWorkLocation {
    return {
      ...(point.id ? { id: point.id } : {}),
      title: point.title.trim() || null,
      locationType: WorkLocationType.Fixed,
      country: point.country,
      region: point.region,
      city: point.city,
      street: point.street,
      house: point.house,
      apartment: point.apartment,
      longitude: null,
      latitude: null,
    };
  }

  private saveCall(request: Observable<IResponse | null>): Observable<boolean> {
    return request.pipe(
      map(res => res?.code === 200 || res?.code === 201 || res?.code === 204),
      catchError(err => {
        console.error('Failed to save work location:', err);
        return of(false);
      })
    );
  }

  /**
   * Сохраняем выбранные форматы работы (по одному POST на формат).
   *
   * Возвращает Observable<boolean> — сохранились ли ВСЕ форматы. Раньше ошибки
   * здесь молча съедались (`catchError → of(null)`) и пользователь всё равно
   * видел «Изменения сохранены», хотя ни одной записи work-location не создалось.
   * Именно из-за этого раздел «Услуги» затем сообщал, что форматы не настроены.
   */
  private saveWorkLocation(id: string): Observable<boolean> {
    const calls: Observable<boolean>[] = [];
    const a = this.address;
    if (this.formats.online) {
      calls.push(this.saveCall(this._profileService.createWorkLocation(id, { locationType: WorkLocationType.Online })));
    }
    if (this.formats.mobile) {
      calls.push(this.saveCall(this._profileService.createWorkLocation(id, {
        locationType: WorkLocationType.Mobile,
        country: a?.country ?? null,
        region: a?.region ?? null,
        cities: this.cities.filter(city => !!city && city.trim().length > 0),
        longitude: null,
        latitude: null,
      })));
    }
    for (const locationId of this.removedFixedPointIds) {
      calls.push(this.saveCall(this._profileService.deleteWorkLocation(id, locationId)));
    }
    if (this.formats.fixed) {
      for (const point of this.fixedPoints) {
        const body = this.pointBody(point);
        calls.push(this.saveCall(point.id
          ? this._profileService.updateWorkLocation(id, body)
          : this._profileService.createWorkLocation(id, body)));
      }
    }
    if (!calls.length) return of(true);
    return forkJoin(calls).pipe(map(results => results.every(Boolean)));
  }

  /**
   * Фиксированное место без адреса бэк не примет — ловим это до отправки,
   * иначе POST падает, а пользователь остаётся с ощущением, что всё сохранено.
   */
  private missingFixedAddress(): boolean {
    if (!this.formats.fixed) return false;
    if (!this.fixedPoints.length) return true;
    return this.fixedPoints.some(point =>
      !point.city?.trim() || !point.street?.trim() || !point.house?.trim());
  }

  async ngOnInit(): Promise<void> {
      this.store$.pipe(select(selectProfileMainClient)).subscribe(_ => {
          if (_) {
              this.profile = new IViewBusinessProfile();
              this.profile.copyProfile(_);
              if (this.profile.address){
                this.strAddress = getFullAddressProfile(this.profile.address);
                this.geoPoint$ = this._dictionaries.getPoint(this.strAddress);
                // this.geoPoint$.subscribe(result => {
                //   console.log(result);
                // });
              }
          }
      });
  
  }

    getAvatar(avatar: any) {
    return resolveAvatarUrl(avatar);
  }

  //получаем регионы по стране

  saveChanges(): void {
    if (!this.profile) return;

    if (this.missingFixedAddress()) {
      this.showError('Для каждой точки укажите город, улицу и дом — иначе формат работы не сохранится.');
      return;
    }

    // this.address заполняется только после эмита из select-address. Если пользователь
    // ничего не трогал, он null — раньше он затирал сохранённый адрес профиля.
    const address = this.address ?? this.profile.address ?? null;
    this.profile.copyProfileWithAddress(this.profile, address!);
    this.profile.prepareBeforeSave();

    const id = this.profile.id!;
    this.backendService.saveProfile(id, this.profile).pipe(
      switchMap(() => this.saveWorkLocation(id))
    ).subscribe({
      next: (formatsSaved) => {
        this._loginService.updateProfile(id);
        if (formatsSaved) {
          this.showSuccess();
        } else {
          this.showError('Профиль сохранён, но форматы работы записать не удалось. Попробуйте ещё раз.');
        }
      },
      error: (error: any) => {
        console.error('Failed to save profile:', error);
        this.showError('Не удалось сохранить изменения. Попробуйте ещё раз.');
      }
    });
  }

  backToProfile() {
    this.router.navigate(['profilebisacc', this.id]);
  }

  /*** выплываюзее уведомление p-toast    */
  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Создано', detail: 'Изменения сохранены', life:5000});
  }

  showError(detail: string) {
    this.messageService.add({severity:'error', summary: 'Ошибка', detail, life:7000});
  }

}
