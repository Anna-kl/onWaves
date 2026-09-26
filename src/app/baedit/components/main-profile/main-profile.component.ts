import {Component, OnInit} from '@angular/core';
import { ToastService } from 'src/services/toast.service';
import {IViewBusinessProfile} from "../../../DTO/views/business/IViewBussinessProfile";
import {BackendService} from "../../../../services/backend.service";
import {ProfileService} from "../../../../services/profile.service";
import {select, Store} from "@ngrx/store";
import {selectProfileMainClient} from "../../../ngrx-store/mainClient/store.select";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { DeleteaccComponent } from '../modals/deleteacc/deleteacc.component';
import {LoginService} from "../../../auth/login.service";
import {urlProfile} from "../../../../helpers/constant/commonConstant";
import {Clipboard} from '@angular/cdk/clipboard';
import { environment } from 'src/enviroments/environment';
@Component({
  selector: 'app-main-profile',
  templateUrl: './main-profile.component.html',
  styleUrls: ['./main-profile.component.scss'],
  providers: [BackendService, ProfileService]
})
export class MainProfileComponent implements OnInit {
  profile: IViewBusinessProfile | null = null;
  avatar: any;
  remainingText = environment.TEXT_LENGTH;
  isShowCropped: boolean = true;
  formData: any;
  imageChangedEvent: any = null;
  isEdit = false;
  TEXT_LENGTH: number = environment.TEXT_LENGTH;

  constructor(private store$:Store,
              private _loginService: LoginService,
              private messageService: ToastService,
              protected _apiServiceProfile: BackendService,
              private _profileService: ProfileService,
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
         this.isEdit = false;
         this._loginService.updateProfile(this.profile!.id!);
        },
        (error: any) => {
          console.error('Failed to save profile:', error);
          this.showSaveError(error);
        }
      );
    }
  }

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Создано', detail: 'Изменения сохранены', life:5000});
  }

  /**
   * Показывает причину отказа вместо молчания.
   *
   * Бэк с 2026-07-29 отдаёт 400 с текстом «имя уже занято», если адрес карточки
   * занят другим мастером (раньше дубль сохранялся молча). Без этой ветки
   * пользователь на экране, где как раз и правится адрес, не получал вообще
   * никакого отклика на кнопку «сохранить».
   */
  private showSaveError(error: any): void {
    const message = typeof error?.error?.message === 'string' && error.error.message.trim()
      ? error.error.message
      : 'Не удалось сохранить изменения. Попробуйте ещё раз.';
    this.messageService.add({
      severity: 'error',
      summary: 'Не сохранено',
      detail: message,
      life: 7000,
    });
  }

  setAbout() {
    if (this.profile?.about) {
      this.isEdit = true;
      if (this.profile?.about!.length >= environment.TEXT_LENGTH) {
        this.profile.about = this.profile.about.substring(0,149);
      }
      this.remainingText = environment.TEXT_LENGTH - this.profile.about.length;
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

    changePromo() {
      if (!this.profile?.id) {
        return;
      }
      const profileId = this.profile.id;
      this._profileService.changeIsPromo(profileId, { isPromo: !!this.profile.isPromo }).subscribe({
        next: result => {
          if (result.code === 200) {
            if (this.profile?.isPromo) {
              this.profile.isGetOrder = false;
            }
            this._loginService.updateProfile(profileId);
            this.messageService.add({
              severity: 'success',
              summary: this.profile?.isPromo ? 'Промо-страница' : 'Обычная страница',
              detail: this.profile?.isPromo
                ? 'Страница скрыта из каталога, запись отключена'
                : 'Страница снова может быть в каталоге',
              life: 5000
            });
          }
        },
        error: () => {
          this.profile!.isPromo = !this.profile!.isPromo;
          this.messageService.add({
            severity: 'error',
            summary: 'Не сохранено',
            detail: 'Не удалось изменить режим страницы',
            life: 5000
          });
        }
      });
    }

    onInputChange() {
      // Удаление пробелов из введенной строки
      if (this.profile?.link) {
        this.profile.link = this.profile.link.replace(/\s/g, '');
      }
    }
}
