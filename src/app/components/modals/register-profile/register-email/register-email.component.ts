import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalRegisterComponent } from '../modal-register/modal-register.component';
import { AuthService } from 'src/services/auth.service';
import { IResponse } from '../../../../DTO/classes/IResponse';
import { catchError, debounceTime, distinctUntilChanged, EMPTY, filter, map, switchMap, take, tap } from 'rxjs';
import { ProfileService } from 'src/services/profile.service';
import { CookieService } from 'ngx-cookie-service';
import { ModalRegisterEndComponent } from '../modal-register-end/modal-register-end.component';
import { IViewAuthProfile } from 'src/app/DTO/views/profile/IViewAuthProfile';
import { IProfile } from 'src/app/DTO/classes/profiles/IProfile';
import { Md5 } from 'ts-md5';
import { DataService } from 'src/app/profile-ba/components/group-service/dataservice.service';
import { LoginService } from 'src/app/auth/login.service';
import { BusService } from 'src/services/busService';
import { IViewProfileMenu } from 'src/app/DTO/views/profile/IViewProfileMenu';
import { IViewBusinessProfile } from 'src/app/DTO/views/business/IViewBussinessProfile';

@Component({
  selector: 'app-register-email',
  templateUrl: './register-email.component.html',
  styleUrls: ['./register-email.component.css'],
  providers: [AuthService, ProfileService]
})
export class RegisterEmailComponent implements OnInit {
    policyAgreeError = false;
    errorEmail: string|null = null;

    closePolicy() {
    this.showPolicyModal = false;
  }

    /** Открыть модальное окно */
  openPolicy(event: MouseEvent) {
    event.preventDefault();
    this.showPolicyModal = true;
  }

    errorText = '';
    hasError = false;

    registerForm: FormGroup = this._builder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      family: [null],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(8)]],
      checkRule: [true, [Validators.requiredTrue]]
    });

    showPolicyModal = false;

    toRegister() {
        this.isRegister = !this.isRegister;
          this.hasError = false;
          this.errorText = '';
    }

    register() {
       const md5 = new Md5();
       
         let data = this.registerForm.getRawValue();
         let id = md5.appendStr(`${new Date().toLocaleDateString()}${data['email']}`).end()!.toString().substring(20);
         if (data['password'] !== data['repeatPassword']){
          this.hasError = true;
          this.errorText = "Пароли не совпадают";
          return;
         }
         if (this.registerForm.valid)
   this.auth.registerEmail(data['email'], data['password'], data['name'], id, data['family']).pipe(

  switchMap(res => {
    // обрабатываем разные коды от registerEmail
    if (res.code === 201) {
      // успех регистрации → создаём профиль
      return this.profile.createProfile(
        {
          name: data['name'],
          family: data['family'],
          email: data['email']
        } as IViewBusinessProfile,
        res.data // payload/uuid/токен, что вернул registerEmail
      ).pipe(
        map(profileRes => ({ registerRes: res, profileRes }))
      );
    }

    // примеры веток для других кодов
    if (res.code === 500) {
      this.hasError = true;
      this.errorText = res.message;
      return EMPTY;
    }


    return EMPTY;
  }),

  tap(({ profileRes }) => {
    // успех создания профиля
    if (profileRes.code === 201) {
      this.activeModal.close();

      const response = profileRes.data as IViewAuthProfile;

      const expiry = new Date();
      expiry.setDate(expiry.getDate() + 365);

      this._cookie.set('uuid-ocpio', id, expiry);
      this._cookie.set('auth-token-ocpio', response.token, expiry);
      this._cookie.set('profileId-ocpio', response.profileUserId!, expiry);

      const modalRef = this.modalService.open(ModalRegisterEndComponent);
      modalRef.componentInstance.Id = response.profileUserId;

    } else {
        this.hasError = true;
        this.errorText = "Возникли ошибки, обратитесь в администратору"
    }
  }),

  catchError((err) => {
    // HttpErrorResponse и любые сбои сети/сервера
    console.error('register/create failed', err);

    return EMPTY;
  })

).subscribe();
        

            // if ((result as IResponse).code === 201){


            // } else {
            //   this.hasError = true;
            //   this.errorText = (result as IResponse).message;
            // }
          
      
    }

    returnToPhone() {
      this.activeModal.close();
        let modal = this.modalService.open(ModalRegisterComponent);
    }

    isRegister = false;
    closeModal() {
      this.activeModal.close();
    }
    next() {
      let data = this.formEmail.getRawValue();
       const md5 = new Md5();
       let id = md5.appendStr(`${new Date().toLocaleDateString()}${data['email']}`).end()!.toString().substring(20);
        if (this.formEmail.valid){
          
          this.auth.sendEmail(data['email'], data['password'], id).pipe(take(1))
          .subscribe(result => {
            if ((result as IResponse).code === 200){

                      let temp = result.data as IViewProfileMenu;
                      let profile = temp.profile;
                      let expiry = new Date();
                     
                      expiry.setDate(expiry.getDate()+365);
                
                      this._cookie.set('uuid-ocpio', id, expiry);
                    
                  
                        this._busService.transferToken(result.data);
                        this.activeModal.close();
                        this.modalService.dismissAll();
                
                        const profileUserId = profile?.id;
                        if (profileUserId != null) {
                          // this.notification.requestPermission(result.message);
                          let expiry = new Date();
                          expiry.setDate(expiry.getDate()+365);
                
                          this._cookie.set('auth-token-ocpio', temp.token,
                            expiry );
                
                          if(profile) {
                            this._cookie.set('profileId-ocpio', profile.id!,
                             expiry );
                
                          }
                          this.activeModal.close();
                          this.loginService.isAutentificate$.next(true);
                          this.loginService.updateProfileUA();
                          this.loginService.afterLoginNavigateAwayFromLanding();
                          
                        }
                      }
             else {
              this.hasError = true;
              this.errorText = (result as IResponse).message;
            }
          });
        }
      } 
    

    formEmail: FormGroup = this._builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

    constructor(private _builder: FormBuilder,
      private modalService: NgbModal,
      private auth: AuthService,
      public activeModal: NgbActiveModal,
      private profile: ProfileService,
        private _cookie: CookieService,
    private _busService: BusService,
      private loginService: LoginService,
    ){}

    ngOnInit(): void {
       this.email.valueChanges.pipe(
          debounceTime(300),
          distinctUntilChanged()
        ).subscribe(result => {
          const raw = (result ?? '').toString();

          // убираем все пробельные символы
          let cleaned = raw.replace(/\s+/g, '');

          // опционально: убираем кириллицу целиком
          // cleaned = cleaned.replace(/[А-Яа-яЁё]/g, '');

          if (cleaned !== raw) {
            this.email.setValue(cleaned, { emitEvent: false }); // не триггерим valueChanges повторно
          }

          // при необходимости дожимаем валидацию
          this.email.updateValueAndValidity({ onlySelf: true, emitEvent: false });

    });
    this.email_enter.valueChanges.pipe(
          debounceTime(300),
          distinctUntilChanged()
        ).subscribe(result => {
          const raw = (result ?? '').toString();

          // убираем все пробельные символы
          let cleaned = raw.replace(/\s+/g, '');

          // опционально: убираем кириллицу целиком
          // cleaned = cleaned.replace(/[А-Яа-яЁё]/g, '');

          if (cleaned !== raw) {
            this.email_enter.setValue(cleaned, { emitEvent: false }); // не триггерим valueChanges повторно
          }

          // при необходимости дожимаем валидацию
          this.email_enter.updateValueAndValidity({ onlySelf: true, emitEvent: false });

    });
    }

    get email() { return this.registerForm.get('email')!; }
    get email_enter() { return this.formEmail.get('email')!; }

}


