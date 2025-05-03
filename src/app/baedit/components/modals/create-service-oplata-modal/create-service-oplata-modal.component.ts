import {Component, Input, OnInit} from '@angular/core';
import {ProfileDataEditService} from "../../../services/ba-edit-service";
import {IViewBusinessProfile} from "../../../../DTO/views/business/IViewBussinessProfile";
import {currencyName} from "../../../../../helpers/constant/currencyConstant";
import {PaymentMethodType} from "../../../../DTO/enums/paymentMethodType";
import {Service} from "../../../../DTO/classes/services/Service";
import {PaymentForType} from "../../../../DTO/enums/paymentForType";
import {GroupService} from "../../../../../services/groupservice";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CurrencyType} from "../../../../DTO/enums/currencyType";
import {CreateServiceModalComponent} from "../create-service-modal/create-service-modal.component";
import {
  CreateServiceCategoryModalComponent
} from "../create-service-category-modal/create-service-category-modal.component";
import {Router} from "@angular/router";
// import { DisallowLettersDirective } from 'app/disallow-letters.directive.ts';
@Component({
  selector: 'app-create-service-oplata-modal',
  templateUrl: './create-service-oplata-modal.component.html',
  styleUrls: ['./create-service-oplata-modal.component.css']
})
export class CreateServiceOplataModalComponent implements OnInit {
  profile!: IViewBusinessProfile | null;
  currencies: string[] = [];
  myCurrency: string = '';
  @Input() service: Service|null = null;
  message: string|undefined;
  price: number = 0;
  duration?: number;
  payMethodHour: boolean = false;
  payMethodService: boolean = true;
  constructor(private _dataService: ProfileDataEditService,
              private _apiService: GroupService,
              private _route: Router,
              private modal: NgbModal,
              private activeModal: NgbActiveModal) {
    this._dataService.sendProfile.subscribe(result => {
      this.profile = result;
      this.profile?.currency?.forEach(item => {
        this.currencies?.push(currencyName[item]);
      });
      if (this.currencies.length > 0) {
        this.myCurrency = this.currencies[0];
      }
    });
  }
  ngOnInit(): void {
    // if (this.service?.price) {
    //   this.price = this.service?.price;
    // }
    if (this.service?.duration){
      this.duration = this.service?.duration;
    }
    if (this.service?.price.currencyType){
      this.myCurrency = CurrencyType[this.service?.price.currencyType];
    }
  }
  getMethodsPayment(pay: PaymentMethodType){
    return this.profile?.paymentMethods?.includes(pay);
  }
  chooseCurrency(myCurrency: string){

  }

  setPayment(type: PaymentForType){
    if (type === PaymentForType.ForService){
      this.payMethodService = true;
      this.payMethodHour = false;
    } else {
      this.payMethodService = false;
      this.payMethodHour = true;
    }
}
  onSave(){
    if (this.service){
      let pay = this.payMethodService ? PaymentForType.ForService : PaymentForType.ForHour;
      let currency = currencyName.indexOf(this.myCurrency);
      // this.service.setOplata(pay, currency, Number.parseInt(String(this.price)),
      //   this.duration ? Number.parseInt(String(this.duration)) : undefined);
      // this._apiService.saveService(this.service).subscribe(
      //   result => {
      //     if (result.code === 201){
      //       this.activeModal.close(true);
      //       this._dataService.updateServices();
      //     }
      //   }
      // );
    }
  }

  onBack(){
    this.activeModal.close();
    let modalRef = this.modal.open(CreateServiceCategoryModalComponent);
    modalRef.componentInstance.service = this.service;
  }
  closeModal() {
    this.activeModal.close();
  }
}
