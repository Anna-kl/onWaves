import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ICountry } from 'src/app/DTO/classes/ICountry';
import { AuthServices } from '../../services/auth.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalEnterDataComponent } from '../modal-enter-data/modal-enter-data.component';
import { ModalRegisterComponent } from '../modal-register/modal-register.component';
import { ConsentService } from 'src/services/consent.service';

@Component({
  selector: 'app-register-email-code',
  templateUrl: './register-email-code.component.html',
  styleUrls: ['./register-email-code.component.css'],
  providers: [AuthServices, ConsentService]
})
export class RegisterEmailCodeComponent implements OnInit {

  public checkNotifyConsent = false;
  consentText: string = '';
  consentTextVersion: string = '';
  showConsentModal = false;

  public phone: string = '';
  error: boolean = true;
  policyAgreeError = false;
  countries: ICountry[] = [];
  chCountry!: ICountry;
  showPolicyModal = false;
  validateError: string|undefined = undefined;
  flagError: boolean = false;
  public checkRule = true;
  isShow: boolean = false;
  messageError: string = '';

  email = new FormControl<string>('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.email,
      Validators.maxLength(254),
    ],
  });

  constructor(
    private authService: AuthServices,
    private activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private _consentService: ConsentService,
  ) {}

  ngOnInit(): void {
    this.loadConsentText();
  }

  private loadConsentText(): void {
    this._consentService.getTextVersions().subscribe(versions => {
      const version = versions?.[0];
      if (!version) return;
      this.consentTextVersion = version;
      this._consentService.getText(version).subscribe(text => this.consentText = text);
    });
  }

  private sendNotifyConsentIfNeeded(email: string): void {
    if (!this.checkNotifyConsent || !this.consentTextVersion) return;
    this._consentService.sendConsentBulk({
      profileUserId: null,
      email,
      channels: null,
      isGranted: true,
      consentTextVersion: this.consentTextVersion,
      source: 'registration',
    }).subscribe();
  }

  openConsentText(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.showConsentModal = true;
  }

  closeConsentText(): void {
    this.showConsentModal = false;
  }

  returnToPhone(): void {
    this.activeModal.close();
    this.modalService.open(ModalRegisterComponent);
  }

  next(): void {
    const data = this.email.getRawValue();
    this.authService.registerEmail(data).subscribe(result => {
      if (result.code === 200) {
        this.sendNotifyConsentIfNeeded(data);
        this.activeModal.close();
        const modalRef = this.modalService.open(ModalEnterDataComponent);
        modalRef.componentInstance.session = result.data;
        modalRef.componentInstance.email = data;
      }
      if (result.code === 500) {
        this.flagError = true;
        this.messageError = `Превышено число запросов`;
      }
      if (result.code === 204) {
        this.flagError = true;
        const validateError = result.data.toString().split('.')[0];
        this.messageError = `Повторно запросить код можно будет через ${validateError}`;
      }
    });
  }

  closeModal(): void {
    this.activeModal.close();
  }

  openPolicy(event: MouseEvent): void {
    event.preventDefault();
    this.showPolicyModal = true;
  }

  closePolicy(): void {
    this.showPolicyModal = false;
  }

  isFormValid(): boolean {
    return !!this.countries && !!this.phone && this.checkRule && !this.error;
  }
}
