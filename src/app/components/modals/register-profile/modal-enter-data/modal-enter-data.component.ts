import { Component, Input, OnInit } from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalRegisterComponent} from "../modal-register/modal-register.component";

import {ModalRegisterNextComponent} from "../modal-register-next/modal-register-next.component";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
 import { Md5 } from 'ts-md5';
 import { AuthServices } from '../../services/auth.service';
import { ISendCode } from '../../../../DTO/ISendCode';
 import { BusService } from '../../../../../services/busService';

import { CookieService } from 'ngx-cookie-service';
import {IViewAuthProfile} from "../../../../DTO/views/profile/IViewAuthProfile";
import {Router} from "@angular/router";
import {LoginService} from "../../../../auth/login.service";
import { environment } from 'src/enviroments/environment';

@Component({
  selector: 'app-modal-enter-data',
  templateUrl: './modal-enter-data.component.html',
  styleUrls: ['./modal-enter-data.component.css'],

  providers: [AuthServices, BusService]

})
export class ModalEnterDataComponent implements OnInit {
  public codeForm: FormGroup;
  public checkCode = false;
  @Input() public session = '';
  @Input() public phone = '';
  @Input() public code = '';
  flagError: boolean = false;
  textError: string = '';
  link: string|null = null;
  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private _authService: AuthServices,
    private _busService: BusService,
    private _cookieService: CookieService
  ) {

    this.codeForm = this.formBuilder.group ({
      a1: new FormControl(undefined, [Validators.max(1), Validators.required]),
      a2: new FormControl(undefined, [Validators.max(1), Validators.required]),
      a3: new FormControl(undefined, [Validators.max(1), Validators.required]),
      a4: new FormControl(undefined, [Validators.max(1), Validators.required])
    });
  }

  ngOnInit(): void {

  }
  closeModal() {
    this.activeModal.close();
  }
  isUuid(): boolean {
    return this._cookieService.check('uuid-ocpio');
  }

  next() {
    let id = '';
    if (this.isUuid()){
      id = this._cookieService.get('uuid-ocpio');
    }else {
      const md5 = new Md5();
      id = md5.appendStr(`${new Date().toLocaleDateString()}${this.phone}`).end()!.toString().substring(20);
      let expiry = new Date();
      let secure = true;
      expiry.setDate(expiry.getDate()+365);

      this._cookieService.set('uuid-ocpio', id, expiry);
    }
    const sendCode = this.codeForm.getRawValue();
    const send = {
      session: this.session,
      code: `${sendCode['a1']}${sendCode['a2']}${sendCode['a3']}${sendCode['a4']}`,
      uuid: id,
    } as ISendCode;

    this._authService.checkCode(send).subscribe(result => {
      if (result.code === 200) {
        let user = result.data as IViewAuthProfile;
        this._busService.transferToken(user);
        this.activeModal.close();
        this.modalService.dismissAll();

        const profileUserId = result.data?.profileUserId;
        if (profileUserId != null) {
          // this.notification.requestPermission(result.message);
          let expiry = new Date();
          expiry.setDate(expiry.getDate()+365);

          this._cookieService.set('auth-token-ocpio', user.token,
            expiry );

          if(user.profileUserId) {
            this._cookieService.set('profileId-ocpio', user.profileUserId,
             expiry );

          }
          this.activeModal.close();
          this.loginService.isAutentificate$.next(true);
          this.loginService.updateProfileUA();
        } else {
          this.activeModal.close();
          let modalRef = this.modalService.open(ModalRegisterNextComponent);
          modalRef.componentInstance.token = result.data;
        }
      } else if (result.code === 500) {
        this.flagError = true;
        this.textError = `Неверный код, попробуйте еще раз`;
      }
    });
  }

  back() {
    this.activeModal.close();
    const modalRef = this.modalService.open(ModalRegisterComponent);
  }
//
  @Input() mask: string = '';
  onSubmitCode() {

  }

  setCell(number: number) {
      if (number === 0) {
        document?.getElementById("sms2")?.focus();
        const num = this.codeForm.get('a1')?.value;
        if (isNaN(Number(num)))
        this.codeForm.patchValue({'a1': ''});
    }
      if (number === 1){
        document?.getElementById("sms3")?.focus();
        const num = this.codeForm.get('a2')?.value;
        if (isNaN(Number(num)))
          this.codeForm.patchValue({'a2': ''});
      }
      if (number === 2) {
        document?.getElementById("sms4")?.focus();
        const num = this.codeForm.get('a3')?.value;
        if (isNaN(Number(num)))
          this.codeForm.patchValue({'a3': ''});
      }
    if (number === 3) {
        // document?.getElementById("sms4")?.focus();
        const num = this.codeForm.get('a4')?.value;
        if (isNaN(Number(num)))
          this.codeForm.patchValue({'a4': ''});
        this.checkCode = true;
      }
  }

  validateInput(event: any, cellIndex: number): void {
    const input = event.target.value;

    if (input.length > 1) {
      event.target.value = input.slice(0, 1);
    }

    if (!/^\d$/.test(input)) {
      event.target.value = '';
    } else {
      this.setCell(cellIndex);
    }
  }
  returnToPhone() {
    this.activeModal.close();
    this.modalService.open(ModalRegisterComponent);
  }
  
}
