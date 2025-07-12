import { Component, Input, OnInit } from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalEnterDataComponent} from "../modal-enter-data/modal-enter-data.component";
import {ModalRegisterEndComponent} from "../modal-register-end/modal-register-end.component";
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { IProfile } from '../../../../DTO/classes/profiles/IProfile';
import { ProfileService } from '../../../../../services/profile.service';

import { UserService } from 'src/app/DTO/classes/profiles/ProfileUser';
import { BusService } from '../../../../../services/busService';
import {IViewAuthProfile} from "../../../../DTO/views/profile/IViewAuthProfile";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-modal-register-next',
  templateUrl: './modal-register-next.component.html',
  styleUrls: ['./modal-register-next.component.css'],
  providers: [ProfileService, UserService, BusService]
})
export class ModalRegisterNextComponent implements OnInit {
  // name!: string;
  // family!: string;
  formProfile: FormGroup = this._builder.group({
    name: new FormControl(undefined, Validators.required),
    family: new FormControl(undefined)
  });
  @Input() token: string = '';

  constructor(
    private _builder: FormBuilder,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private _profile: ProfileService,
    private _cookie: CookieService
  ) {
  }


  ngOnInit(): void {
  }
  closeModal() {
    this.activeModal.close();
  }
  next() {
    // const modalRef = this.modalService.open(ModalRegisterEndComponent);
    const data = this.formProfile.getRawValue() as IProfile;
    this._profile.createProfile(data, this.token).subscribe(
      result => {
        if (result.code === 201){
          // this.notification.requestPermission(result.message);
          this.activeModal.close();
          const response = result.data as IViewAuthProfile;
          let expiry = new Date();

          expiry.setDate(expiry.getDate()+365);
          this._cookie.set('auth-token-ocpio', response.token,
            expiry);

          this._cookie.set('profileId-ocpio', response.profileUserId!,
            expiry);

          const modalRef = this.modalService.open(ModalRegisterEndComponent);
          modalRef.componentInstance.Id = response.profileUserId;
        }
      }
    );
  }
  isFilled: boolean = false;

  get name(): any { return this.formProfile.get('name'); }
  get family(): any { return this.formProfile.get('family'); }

  onInput(): void {

    if (this.family.value && this.family.value.length > 0) {
      document.querySelectorAll('.fio-text').forEach(input => input.classList.add('green-border'));
      this.isFilled = true;
    } else {
      document.querySelectorAll('.fio-text').forEach(input => input.classList.remove('green-border'));
      this.isFilled = false;
    }
  }


}
