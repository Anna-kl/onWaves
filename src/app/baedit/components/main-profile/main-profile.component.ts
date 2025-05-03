import {Component, OnInit} from '@angular/core';
import {IViewBusinessProfile} from "../../../DTO/views/business/IViewBussinessProfile";
import {BackendService} from "../../../../services/backend.service";
import {MessageService} from "primeng/api";
import {ProfileService} from "../../../../services/profile.service";
import {select, Store} from "@ngrx/store";
import {selectProfileMainClient} from "../../../ngrx-store/mainClient/store.select";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { DeleteaccComponent } from '../modals/deleteacc/deleteacc.component';
import {LoginService} from "../../../auth/login.service";
import {urlProfile} from "../../../../helpers/constant/commonConstant";
import {Clipboard} from '@angular/cdk/clipboard';
@Component({
  selector: 'app-main-profile',
  templateUrl: './main-profile.component.html',
  styleUrls: ['./main-profile.component.scss'],
  providers: [BackendService, MessageService, ProfileService]
})
export class MainProfileComponent implements OnInit {
  profile: IViewBusinessProfile | null = null;
  avatar: any;
  remainingText = 150;
  isShowCropped: boolean = true;
  formData: any;
  imageChangedEvent: any = null;
  isEdit = false;

  constructor(private store$:Store,
              private _loginService: LoginService,
              private messageService: MessageService,
              protected _apiServiceProfile: BackendService,
              private modalService: NgbModal,
              private clipboard: Clipboard
             ) {

  }
  urlProfileLocal = urlProfile;
  ngOnInit(): void {
    this.store$.pipe(select(selectProfileMainClient)).subscribe(
      result => {
        if (result) {
            this.profile = new IViewBusinessProfile();
            this.profile.copyProfile(result);
        }
      }
    );

  }
 OpenModalDelete() {
    const modalRef = this.modalService.open(DeleteaccComponent);
  }
  
  saveChanges(): void {
    if (this.profile) {
      this.profile.prepareBeforeSave();
      this._apiServiceProfile.saveProfile(this.profile.id!, this.profile ).subscribe(
        result => {
         this.showSuccess();
         this._loginService.updateProfile(this.profile!.id!);
        },
        (error: any) => {
          console.error('Failed to save profile:', error);
        }
      );
    }
  }

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Создано', detail: 'Изменения сохранены', life:5000});
  }

  setAbout() {
    if (this.profile?.about) {
      this.isEdit = true;
      if (this.profile?.about!.length >= 150) {
        this.profile.about = this.profile.about.substring(0,149);
      }
      this.remainingText = 150 - this.profile.about.length;
    }
  }

  change() {
    this.isEdit = true;
  }

    onSave($event: boolean) {
      if (this.profile && $event) {
          this._loginService.updateProfile(this.profile.id!);
      }
    }

    // getLink() {
    //     this.clipboard.copy(`${urlProfile}${this.profile?.link}`);
    // }

    getLink() {
      const cleanLink = this.profile?.link ? this.profile.link.replace(/^https:\/\//, '') : '';
      this.clipboard.copy(`${urlProfile}${cleanLink}`);
    }

    onInputChange() {
      // Удаление пробелов из введенной строки
      if (this.profile?.link) {
        this.profile.link = this.profile.link.replace(/\s/g, '');
      }
    }
}
