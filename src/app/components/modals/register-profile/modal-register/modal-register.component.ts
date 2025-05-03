

import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalEnterDataComponent } from '../modal-enter-data/modal-enter-data.component';
import { AuthServices } from '../../services/auth.service';
import { DictionaryService } from '../../../../../services/dictionary.service';
import { ICountry } from '../../../../DTO/classes/ICountry';

import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Router} from "@angular/router";

@Component({
  selector: 'app-modal-register',
  templateUrl: './modal-register.component.html',
  styleUrls: ['./modal-register.component.css'],

  providers: [AuthServices, DictionaryService]

})
export class ModalRegisterComponent implements OnInit {
  public phone: string = '';
  error: boolean = true;

  countries: ICountry[] = [];
  chCountry!: ICountry;

  validateError: string|undefined = undefined;
  flagError: boolean = false;
  public checkRule = true;
  isShow: boolean = false;
  messageError: string = '';

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


  constructor(private modalService: NgbModal,
              public activeModal: NgbActiveModal,

              private authService: AuthServices,
              private _dictionary: DictionaryService,
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
  }
  closeModal() {
    this.activeModal.close();
  }
  next() {
   let tempPhone = `${this.chCountry.code?.replace('+','')}${this.phone}`;
   this.authService.register(tempPhone).subscribe(
     result => {
        if (result.code === 200){
          this.activeModal.close(); // добавил Муконин. Чтобы закрывалось предыдущее окно.
          const modalRef = this.modalService.open(ModalEnterDataComponent);
          modalRef.componentInstance.session = result.data;
          modalRef.componentInstance.phone = this.phone;
          modalRef.componentInstance.code = this.chCountry.code;
          modalRef.componentInstance.mask = this.chCountry.mask;
        }
        if (result.code === 500){
          this.flagError = true;
          this.messageError = `Превышено число запросов`;
        }
        if (result.code === 204){
          this.flagError = true;
          let validateError = result.data.toString().split('.')[0];
          this.messageError = `Повторно запросить код можно будет через ${validateError}`;
        }
        // if (result.code === 204){
        //
        //   this.flagError = true;
        // }
     }
   )
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
}
