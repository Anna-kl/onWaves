// import { Component, OnInit } from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProfileService} from "../../../../../services/profile.service";
import {Component, ElementRef, OnDestroy, Renderer2} from '@angular/core';
import {ProfileDataEditService} from "../../../services/ba-edit-service";
import {DomSanitizer} from "@angular/platform-browser";
import {IViewBusinessProfile} from "../../../../DTO/views/business/IViewBussinessProfile";
import {BackendService} from "../../../../../services/backend.service";
import {ImageCroppedEvent, LoadedImage} from "ngx-image-cropper";
import {blobToFile} from "../../../../../helpers/common/image.helper";import {select, Store} from "@ngrx/store";
import {selectProfileMainAndBaClient} from "../../../../ngrx-store/profileBAClient/ba-store.select";
import {Router} from "@angular/router";
import {selectProfileMainClient} from "../../../../ngrx-store/mainClient/store.select";
import { LoginService } from "src/app/auth/login.service";
import { Subscription, filter, map } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { environment } from "src/enviroments/environment";


@Component({
  selector: 'app-deleteacc',
  templateUrl: './deleteacc.component.html',
  styleUrls: ['./deleteacc.component.css'],
  providers: [BackendService, ProfileService]
})
export class DeleteaccComponent implements OnDestroy {
  profile: IViewBusinessProfile | null = null;
  avatar: any;
  private unsubscribe$: Subscription|null = null;
  remainingText = environment.TEXT_LENGTH;
  isShowCropped: boolean = true;
  formData: any;
  imageChangedEvent: any = null;
  isEdit = false;
  businessProfile: IViewBusinessProfile | null = null;
  constructor(
    private _loginService: LoginService,
    private router: Router,
    public activeModal: NgbActiveModal,
    public _cookie: CookieService,
    private _apiProfile:ProfileService,
    private store$:Store) {
      this.unsubscribe$ = this.store$.pipe(select(selectProfileMainClient)).subscribe(
        result => {
          this.profile = result;
        }
    );

    
  }
  ngOnDestroy(): void {
    this.unsubscribe$?.unsubscribe();
  }

    close() {
      this.activeModal.close();
    
    }
    deleteBaAccount() {
      const deletedProfileId = this.profile?.id;
      const token = this._cookie.get('auth-token-ocpio');

      if (!deletedProfileId) {
        return;
      }

      this._apiProfile.deleteProfile(deletedProfileId, token).subscribe(result => {
        if (result.code === 200){
          this.activeModal.close();
          const preferredProfileId = typeof result.data === 'string' ? result.data : undefined;
          const nextProfile = this._loginService.removeDeletedProfileFromClientState(
            deletedProfileId,
            preferredProfileId);

          this._loginService.updateProfileUA();
          const targetProfileId = preferredProfileId ?? nextProfile?.id;
          this.router.navigate(targetProfileId ? [`/page-user/${targetProfileId}`] : ['/']);
        }
      });
    }

}
