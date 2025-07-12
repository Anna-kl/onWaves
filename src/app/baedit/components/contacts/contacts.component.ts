import {Component, ElementRef, Renderer2, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {IViewBusinessProfile} from "../../../DTO/views/business/IViewBussinessProfile";
import {BackendService} from "../../../../services/backend.service";
import {ServiceRegisterBusinessProfile} from "../../../../services/service-register-business";
import {DictionaryService} from "../../../../services/dictionary.service";
import {getAddressProfile, getFullAddressProfile} from "../../../../helpers/common/address";
import {MessageService} from "primeng/api";
import {IViewAddress} from "../../../DTO/views/IViewAddress";
import {LoginService} from "../../../auth/login.service";
import {select, Store} from "@ngrx/store";
import {selectProfileMainClient} from "../../../ngrx-store/mainClient/store.select";
import {Observable} from "rxjs";
import {IViewCoordinates} from "../../../DTO/views/profile/IViewCoordinates";
import { YMapComponent, YMapDefaultSchemeLayerDirective } from 'angular-yandex-maps-v3';
import { DomSanitizer } from '@angular/platform-browser';

declare const ymaps: any;
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  providers: [DictionaryService, MessageService, YMapComponent, YMapDefaultSchemeLayerDirective]
})



export class ContactsComponent implements OnInit{


  address: IViewAddress|null = null;
  strAddress: string = '';

  change($event: any,arg1: string) {
    this.isEdit = true;
  }

  changeAddress($event: {strAddress: string, viewAddress: IViewAddress}) {
    this.isEdit = true;
    this.strAddress = $event.strAddress;
    this.address = $event.viewAddress;
    this.geoPoint$ = this._dictionaries.getPoint(this.strAddress);
             
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
    private messageService: MessageService,
    private sanitizer: DomSanitizer
  ) {

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
    if (avatar) {
      return  this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64, ${avatar}`);
    } else {
      return  '/assets/img/AvatarBig.png';
    }
  }

  //получаем регионы по стране

  saveChanges(): void {
    this.profile?.copyProfileWithAddress(this.profile!, this.address!);
    this.profile?.prepareBeforeSave();
    if (this.profile) {
      this.backendService.saveProfile(this.profile.id!, this.profile! ).subscribe(
        () => {
          this._loginService.updateProfile(this.profile!.id!);
          this.showSuccess()
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

  /*** выплываюзее уведомление p-toast    */
  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Создано', detail: 'Изменения сохранены', life:5000});
  }

}
