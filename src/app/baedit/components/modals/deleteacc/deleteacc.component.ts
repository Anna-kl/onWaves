// import { Component, OnInit } from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProfileService} from "../../../../../services/profile.service";
import {Component, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {ProfileDataEditService} from "../../../services/ba-edit-service";
import {DomSanitizer} from "@angular/platform-browser";
import {IViewBusinessProfile} from "../../../../DTO/views/business/IViewBussinessProfile";
import {BackendService} from "../../../../../services/backend.service";
import {ImageCroppedEvent, LoadedImage} from "ngx-image-cropper";
import {blobToFile} from "../../../../../helpers/common/image.helper";
import {MessageService} from "primeng/api";
import {select, Store} from "@ngrx/store";
import {selectProfileMainAndBaClient} from "../../../../ngrx-store/profileBAClient/ba-store.select";
import {Router} from "@angular/router";
import {selectProfileMainClient} from "../../../../ngrx-store/mainClient/store.select";
import { LoginService } from "src/app/auth/login.service";
import { Subscription, filter, map } from "rxjs";
import { CookieService } from "ngx-cookie-service";


@Component({
  selector: 'app-deleteacc',
  templateUrl: './deleteacc.component.html',
  styleUrls: ['./deleteacc.component.css'],
  providers: [BackendService, MessageService, ProfileService]
})
export class DeleteaccComponent implements OnInit, OnDestroy {
  profile: IViewBusinessProfile | null = null;
  avatar: any;
  private unsubscribe$: Subscription|null = null;
  remainingText = 150;
  isShowCropped: boolean = true;
  formData: any;
  imageChangedEvent: any = null;
  isEdit = false;
  businessProfile: IViewBusinessProfile | null = null;
  private _allProfiles: IViewBusinessProfile[] = [];
  constructor(
    private _loginService: LoginService,
    private router: Router,
    public activeModal: NgbActiveModal,
    public _cookie: CookieService,
    private _apiProfile:ProfileService,
    private store$:Store) {
      this.store$.pipe(select(selectProfileMainClient)).subscribe(
        result => {
          this.profile = result;
        }
    );

    
  }
  ngOnDestroy(): void {
    this.unsubscribe$?.unsubscribe();
  }

  ngOnInit(): void {
    this.unsubscribe$ = this._loginService.allProfiles$.subscribe(
    item => {
      this._allProfiles = item;
    });
            
  }

    close() {
      this.activeModal.close();
    
    }
    deleteBaAccount() {
      this._apiProfile.deleteProfile(this.profile?.id!).subscribe(result => {
        if (result.code === 200){
          this.activeModal.close();
          this._allProfiles = this._allProfiles.filter(_ => _.id !== this.profile?.id!);

          let expiry = new Date();
          expiry.setDate(expiry.getDate()+365);
          let profileUA = this._allProfiles.filter(_ => _.id !== this.profile?.id);
          if (profileUA){
          this._cookie.set('profileId-ocpio', profileUA.pop()?.id!,
              expiry );
          }
       //  this._loginService.allProfiles$.next(this._allProfiles);
          this._loginService.updateProfileUA();
          this.router.navigate([`/page-user/${result.data}` ]);
        }
      });
    }

}
