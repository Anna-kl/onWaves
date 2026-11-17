

import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalEnterDataComponent } from '../modal-enter-data/modal-enter-data.component';
import { AuthServices } from '../../services/auth.service';
import { DictionaryService } from '../../../../../services/dictionary.service';
import { ICountry } from '../../../../DTO/classes/ICountry';

import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Router} from "@angular/router";
import { RegisterEmailCodeComponent } from '../register-email-code/register-email-code.component';
import { ConsentService } from '../../../../../services/consent.service';

@Component({
  selector: 'app-modal-register',
  templateUrl: './modal-register.component.html',
  styleUrls: ['./modal-register.component.css'],

  providers: [AuthServices, DictionaryService, ConsentService]

})
export class ModalRegisterComponent implements OnInit {

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

  /** Согласие на информационные SMS-уведомления о записях, статусах и новостях сервиса. Необязательно. */
  public checkNotifyConsent = false;
  consentText: string = '';
  consentTextVersion: string = '';
  showConsentModal = false;
  callSending = false;
  zvonokSending = false;

  iconsFlags: any[] = [
    {id:1, icon: '../assets/img/ico/flags/flag_RU_pc_24.svg', name:'Россия', mask: '(XXX)XXX-XX-XX', code:'+7',  countNumber:'' },
    {id:3, icon: '../assets/img/ico/flags/flag_BY_pc_24.svg', name:'Беларусь', mask: '(XX)XXX-XX-XX', code:'+375',  countNumber:'' },
    {id:2, icon: '../assets/img/ico/flags/flag_AM_pc_24.svg', name:'Армения', mask: '(XX)XX-XX-XX', code:'+374',  countNumber:'' },
    {id:4, icon: '../assets/img/ico/flags/flag_GE_pc_24.svg', name:'Грузия', mask: '(XXX)XXX-XXX', code:'+995',  countNumber:'' },
    {id:5, icon: '../assets/img/ico/flags/flag_KZ_pc_24.svg', name:'Казахстан', mask: '(XXXX)XX-XXX', code:'+7',  countNumber:'' },
    {id:7, icon: '../assets/img/ico/flags/flag_MD_pc_24.svg', name:'Молдова', mask: '(XXX)XXX-XXX', code:'+373',  countNumber:'' },
    {id:6, icon: '../assets/img/ico/flags/flag_KG_pc_24.svg', name:'Кыргызстан', mask: '(XXX)XX-XXXX', code:'+996',  countNumber:'' },
    {id:8, icon: '../assets/img/ico/flags/flag_TJ_pc_24.svg', name:'Таджикистан', mask: '(XX)XXX-XX-XX', code:'+992',  countNumber:'' },
    {id:9, icon: '../assets/img/ico/flags/flag_TM_pc_24.svg', name:'Туркменистан', mask: '(XX)XX-XX-XX', code:'+993',  countNumber:'' },
    {id:10, icon: '../assets/img/ico/flags/flag_UZ_pc_24.svg', name:'Узбекистан ', mask: '(XX)XXX-XX-XX', code:'+998',  countNumber:'' },
    {id:11, icon: '../assets/img/ico/flags/flag_AZ_pc_24.svg', name:'Азербайджан ', mask: '(XX)XXX-XX-XX', code:'+994',  countNumber:'' },
  ]


  returnToEmail() {
    this.activeModal.close();
    let modal = this.modalService.open(RegisterEmailCodeComponent);
  }
  constructor(private modalService: NgbModal,
              public activeModal: NgbActiveModal,

              private authService: AuthServices,
              private _dictionary: DictionaryService,
              private _consentService: ConsentService,
              private _router: Router,
              private sanitizer: DomSanitizer) {
    this.chCountry = this.iconsFlags.find(_ => _.id === 1)!;
  }

  ngOnInit(): void {
    this.isShow = false;
    this._dictionary.getCounties().subscribe(
      result =>
      {
        this.countries = result as ICountry[];
        this.countries.forEach(item => {
          item.icon = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,'
            + item.icon);
        });

      });
    this.loadConsentText();
  }

  private loadConsentText(): void {
    this._consentService.getTextVersions().subscribe(versions => {
      const version = versions?.[0];
      if (!version) {
        return;
      }
      this.consentTextVersion = version;
      this._consentService.getText(version).subscribe(text => this.consentText = text);
    });
  }

  /** Зафиксировать согласие на уведомления по всем каналам, если пользователь его дал. Регистрация не блокируется при отказе. */
  private sendNotifyConsentIfNeeded(phone: string): void {
    if (!this.checkNotifyConsent || !this.consentTextVersion) {
      return;
    }
    this._consentService.sendConsentBulk({
      profileUserId: null,
      phone: phone,
      channels: null,
      isGranted: true,
      consentTextVersion: this.consentTextVersion,
      source: 'registration'
    }).subscribe();
  }
  closeModal() {
    this.activeModal.close();
  }
  next() {
    if (!this.isFormValid() || this.callSending || this.zvonokSending) {
      return;
    }
    const tempPhone = `${this.chCountry.code?.replace('+','')}${this.phone}`;
    this.callSending = true;
    this.flagError = false;
    this.authService.register(tempPhone).subscribe({
      next: result => {
        this.callSending = false;
        this.handleCodeSession(result, tempPhone, 'call');
      },
      error: () => {
        this.callSending = false;
        this.flagError = true;
        this.messageError = 'Не удалось запросить код. Попробуйте ещё раз или войдите по email.';
      }
    });
  }

  /** Запасной flash-call: Plusofon часто «успешен», а звонок до абонента не доходит. */
  nextZvonok() {
    if (!this.isFormValid() || this.callSending || this.zvonokSending) {
      return;
    }
    const tempPhone = `${this.chCountry.code?.replace('+','')}${this.phone}`;
    this.zvonokSending = true;
    this.flagError = false;
    this.authService.sendZvonok(tempPhone).subscribe({
      next: result => {
        this.zvonokSending = false;
        this.handleCodeSession(result, tempPhone, 'zvonok');
      },
      error: () => {
        this.zvonokSending = false;
        this.flagError = true;
        this.messageError = 'Не удалось заказать звонок через Zvonok';
      }
    });
  }

  private handleCodeSession(result: { code?: number; data?: unknown }, tempPhone: string, channel: 'call' | 'zvonok') {
    if (result.code === 200 && typeof result.data === 'string' && result.data) {
      this.sendNotifyConsentIfNeeded(tempPhone);
      this.activeModal.close();
      const modalRef = this.modalService.open(ModalEnterDataComponent);
      modalRef.componentInstance.session = result.data;
      modalRef.componentInstance.phone = this.phone;
      modalRef.componentInstance.code = this.chCountry.code;
      modalRef.componentInstance.mask = this.chCountry.mask;
      modalRef.componentInstance.lastChannel = channel;
      return;
    }
    this.flagError = true;
    const waitSeconds = result.code === 204 ? result.data?.toString().split('.')[0] : null;
    this.messageError = waitSeconds
      ? `Повторно запросить код можно будет через ${waitSeconds} с.`
      : 'Не удалось запросить код. Попробуйте ещё раз или войдите по email.';
  }

  // back() {
  //   this.activeModal.close();
  //   const modalRef = this.modalService.open(ModalNextComponent);
  //   modalRef.componentInstance.name = 'World';

  // }

  getPhone($event: any) {
    if (this.checkWord($event)) {
      this.phone = $event;
    }
    if (this.phone.length >= this.chCountry.countNumber){
      this.error = false;
    }

  }

  checkWord(str: string): boolean {
    if (str.length > 1 && !isNaN(Number(str.substr(str.length - 1, 1)))){
     return true;
    }
    if (str.length === 1 && !isNaN(Number(str))){
      return true;
    }
    return  false;
  }


  chooseCountry(country: ICountry) {
      this.chCountry = country;
      this.error = true;
      this.isShow = true;
  }
  isFormValid(): boolean {
    return !!this.countries && !!this.phone && this.checkRule && !this.error;
  }

  checkPhone() {
    console.log('test');
  }
  goToRulePage() {
    this._router.navigate(['static/pravila']);
  }

  openRulesInNewWindow() {
    window.open('static/pravila', '_blank');
  }

    closePolicy() {
    this.showPolicyModal = false;
  }

    /** Открыть модальное окно */
  openPolicy(event: MouseEvent) {
    event.preventDefault();
    this.showPolicyModal = true;
  }

  closeConsentText() {
    this.showConsentModal = false;
  }

  /** Показать полный текст согласия на информационные уведомления */
  openConsentText(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.showConsentModal = true;
  }
}
