import {Component, OnDestroy, OnInit} from '@angular/core';
import {environment} from '../../../enviroments/environment';
import {IViewBusinessProfile} from "../../DTO/views/business/IViewBussinessProfile";
import {Store} from "@ngrx/store";
import {LoginService} from "../../auth/login.service";
import {UserType} from "../../DTO/classes/profiles/profile-user.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {BackendService} from "../../../services/backend.service";
import {MessageService} from "primeng/api";
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/navigation-service.service';
import { Subscription } from 'rxjs';
import { ConsentService } from 'src/services/consent.service';
import { ConsentChannel } from '../../DTO/enums/consentChannel';
import { IViewConsent } from '../../DTO/views/consent/IViewConsent';

interface IConsentToggle {
  channel: ConsentChannel;
  name: string;
  hint: string;
  isGranted: boolean;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers: [BackendService, MessageService ]
})
export class SettingsComponent implements OnInit, OnDestroy{

  
  private unsubscribe$: Subscription|null = null;
  profile!: IViewBusinessProfile | undefined;
  settingsForm!: FormGroup;

  consentTextVersion: string = '';
  consentItems: IConsentToggle[] = [
    { channel: ConsentChannel.Sms, name: 'SMS', hint: 'Уведомления о записях и статусах на номер телефона', isGranted: false },
    { channel: ConsentChannel.Email, name: 'Email', hint: 'Письма о записях, новостях и спецпредложениях сервиса', isGranted: false },
    { channel: ConsentChannel.Telegram, name: 'Telegram', hint: 'Сообщения от Telegram-бота сервиса', isGranted: false },
    { channel: ConsentChannel.Push, name: 'Push-уведомления', hint: 'Push-уведомления в браузере и мобильном приложении', isGranted: false },
    { channel: ConsentChannel.Vk, name: 'VK', hint: 'Уведомления через мессенджер ВКонтакте', isGranted: false },
  ];

  constructor(private _fb: FormBuilder,
              private _apiProfile: BackendService,
              private messageService: MessageService,
              private _apiAuth: LoginService,
              private _apiConsent: ConsentService,
              private _router: Router,
              private navigationService: NavigationService) {
    this.settingsForm = this._fb.nonNullable.group({
      phone: '',
      name: '',
      family: '',
      email: ''
    });
  }

  errors = {
    errorLink: '',
    errorLinkStyle: 'border-color: red; color: red',
  };

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Успешно', detail: 'Изменения сохранены', life:5000});
  }

  ngOnDestroy(): void {
    this.unsubscribe$?.unsubscribe();
  }

  showError(text: string) {
    this.messageService.add({severity:'success', summary: 'Ошибка', detail: text, life:5000});
  }

  saveChanges(): void {
    let data = this.settingsForm.getRawValue();
    if (this.profile) {
      this.profile.family = data['family'];
      this.profile.phone = data['phone'];
      this.profile.name = data['name'];
      this.profile.email = data['email'];
      this.unsubscribe$ = this._apiProfile.saveProfile(this.profile?.id!, this.profile).subscribe(
          result => {
            if (result.code === 200){
                this.showSuccess();
                this._apiAuth.updateProfile(this.profile?.id!);
            } else {
              this.showError(result.message);
            }
          }
      );
    }

    // this.http.put(`${this.url}/update-baprofile/${this.profile?.id}`, { viewbusinell: data })
    //   .subscribe(response => {
    //     console.log('Данные сохранены', response);
    //   }, error => {
    //     console.error('Ошибка', error);
    //   });
  }

  ngOnInit(): void {
    
    this.unsubscribe$ = this._apiAuth.allProfiles$.subscribe(result => {
      let profile = result.find(_ => _.userType === UserType.User);
      if (profile) {
        this.profile = new IViewBusinessProfile();
        this.profile.copyProfile(profile as IViewBusinessProfile);
        this.settingsForm = this._fb.group({
          phone: this.profile?.phone,
          email: this.profile?.email,
          name: this.profile?.name,
          family: this.profile?.family
        });
        this.loadConsents();
      }
    });
    this.settingsForm.get('phone')?.valueChanges.subscribe(result => {
      if (result.length != 11){
        this.errors.errorLink = 'Не правильно указан номер телефона';
      } else {
        this.unsubscribe$ = this._apiProfile.checkUserPhone(this.profile?.id!, result).subscribe(res => {
          if (res.code === 404){
            this.errors.errorLink = '';
          } else {
            this.errors.errorLink = 'Этот номер уже используется в дрцгом аккаунте';
          }
        });
      }
    });
  }
  goToMainPage() {
    this._router.navigate(['/']);
  }
  goToBack(): void {
    this.navigationService.goToBack();
  }

  private loadConsents(): void {
    if (!this.profile?.id) {
      return;
    }
    this.unsubscribe$ = this._apiConsent.getTextVersions().subscribe(versions => {
      this.consentTextVersion = versions?.[0] ?? '';
    });
    this.unsubscribe$ = this._apiConsent.getProfileConsents(this.profile.id).subscribe(result => {
      this.applyConsentStatuses(result);
    });
  }

  private applyConsentStatuses(statuses: IViewConsent[]): void {
    this.consentItems = this.consentItems.map(item => {
      const status = statuses.find(_ => _.channel === item.channel);
      return { ...item, isGranted: status ? status.isGranted : false };
    });
  }

  onToggleConsent(item: IConsentToggle, event: Event): void {
    if (!this.profile?.id) {
      return;
    }
    const isGranted = (event.target as HTMLInputElement).checked;
    if (!this.consentTextVersion) {
      (event.target as HTMLInputElement).checked = item.isGranted;
      this.showError('Не удалось загрузить текст согласия, попробуйте позже');
      return;
    }
    this.unsubscribe$ = this._apiConsent.sendConsent({
      profileUserId: this.profile.id,
      channel: item.channel,
      isGranted: isGranted,
      consentTextVersion: this.consentTextVersion,
      source: 'settings'
    }).subscribe({
      next: result => {
        if (result.code === 200) {
          item.isGranted = isGranted;
          this.showSuccess();
        } else {
          (event.target as HTMLInputElement).checked = item.isGranted;
          this.showError(result.message);
        }
      },
      error: () => {
        (event.target as HTMLInputElement).checked = item.isGranted;
        this.showError('Не удалось сохранить согласие, попробуйте позже');
      }
    });
  }

  unsubscribeFromAll(): void {
    if (!this.profile?.id) {
      return;
    }
    this.unsubscribe$ = this._apiConsent.revokeAllConsents(this.profile.id).subscribe({
      next: result => {
        this.consentItems = this.consentItems.map(item => ({ ...item, isGranted: false }));
        this.messageService.add({severity:'success', summary: 'Готово', detail: result.message, life:5000});
      },
      error: () => this.showError('Не удалось отписаться от рассылок, попробуйте позже')
    });
  }
}



