import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../../../../services/backend.service';
import {IViewBusinessProfile} from "../../../DTO/views/business/IViewBussinessProfile";
import {CurrencyType} from "../../../DTO/enums/currencyType";
import {PaymentMethodType} from "../../../DTO/enums/paymentMethodType";
import {ProfileDataEditService} from "../../services/ba-edit-service";
import {MessageService} from "primeng/api";
import {LoginService} from "../../../auth/login.service";
import {select, Store} from "@ngrx/store";
import {selectProfileMainClient} from "../../../ngrx-store/mainClient/store.select";

@Component({
  selector: 'app-oplata',
  templateUrl: './oplata.component.html',
  styleUrls: ['./oplata.component.scss'],
  providers: [MessageService]
})
export class OplataComponent {
  id: string | null = null;
  profile!: IViewBusinessProfile | null;
  currency: CurrencyType[] = [];
  paymentMethods: PaymentMethodType[] = [];
  isEdit = false;
  constructor(
    private router: Router,
    private _loginService: LoginService,
    private store$: Store,
    private backendService: BackendService,
    private messageService: MessageService,
  ) {
    this.store$.pipe(select(selectProfileMainClient)).subscribe(result => {
      if (result) {
        this.profile = new IViewBusinessProfile();
        this.profile.copyProfile(result);
        if (this.profile?.currency === undefined) {
          this.currency = [];
        } else {
          this.currency.push(...this.profile?.currency);
        }
        if (this.profile?.paymentMethods === undefined) {
          this.paymentMethods = [];
        } else {
          this.paymentMethods.push(...this.profile?.paymentMethods as PaymentMethodType[]);
        }
      }
    });

  }

  ngOnInit(): void {}

  setCurrency(type:CurrencyType){
    this.isEdit = true;
          if(this.currency.includes(type)){
              this.currency = this.currency.filter(_ => _ !== type);// это удаляет руб,$ из массива

              this.isEdit = this.currency.length != 0;
        } else {
          this.currency.push(type);
              if(this.currency.length!=0){
                  this.isEdit=true;
               }
        }
    }

  setPaymentMethod(type: PaymentMethodType){
  if (this.paymentMethods.find(_ => _ === type)){
    this.paymentMethods = this.paymentMethods.filter(_ => _ !== type);
  } else {
    this.paymentMethods.push(type);
  }
}
  saveChanges(): void {
  if (this.profile && this.currency.length!=0) {
  this.profile.paymentMethods = this.paymentMethods;
  this.profile.currency = this.currency;
  this.backendService.saveProfile(this.profile.id!, this.profile! ).subscribe(
    result => {
      this._loginService.updateProfile(this.profile!.id!);
      this.showSuccess();
    },
    (error: any) => {
      console.error('Failed to save profile:', error);
    }
  );
}
} 
  /*** выплываюзее уведомление p-toast    */
  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Создано', detail: 'Изменения сохранены', life:5000});
  } 
  backToProfile() {
    this.router.navigate(['profilebisacc', this.id]);
  } 
  getMethodsPayment(number: PaymentMethodType) {
      return this.paymentMethods.includes(number);
  } 
  addPayment(number: PaymentMethodType) {
    this.isEdit = true;
    if (this.paymentMethods.includes(number)){
      this.paymentMethods = this.paymentMethods.filter(_ => _ !== number);
    } else {
      this.paymentMethods.push(number);
    }
  }
}
