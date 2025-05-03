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

  constructor(private _fb: FormBuilder,
              private _apiProfile: BackendService,
              private messageService: MessageService,
              private _apiAuth: LoginService,
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
}



