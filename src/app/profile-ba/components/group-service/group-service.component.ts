import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IGroupWithSubGroups} from "../../../DTO/views/services/IGroupWithSubGroup";
import {GroupService} from "../../../../services/groupservice";
import {PaymentForType} from "../../../DTO/enums/paymentForType";
import {subGroup} from "../../../DTO/views/services/IViewSubGroups";
import {ActivatedRoute, Router, Routes} from "@angular/router";
import {ProfileDataService} from "../../services/profile-data.service";
import {BehaviorSubject} from "rxjs";
import {ChooseTimeModalComponent} from "../choose-time-modal/choose-time-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MessageService} from "primeng/api";
import {IViewBusinessProfile} from "../../../DTO/views/business/IViewBussinessProfile";
import { getPrice, getPriceString } from 'src/helpers/common/price.helpers';

@Component({
  selector: 'app-group-service',
  templateUrl: './group-service.component.html',
  styleUrls: ['./group-service.component.scss'],
  providers: [GroupService, MessageService]
})
export class GroupServiceComponent implements OnInit {
  groupShow: IGroupWithSubGroups[] = [];
  @Input() openGroupBlock: boolean = false;
  isEdit: boolean = false;
  textChooseService = 'Не выбрано';
  priceServices: number = 0;
  chooseServices : subGroup[] = [];
  duration = 0;
  services$ = new BehaviorSubject<subGroup|null>(null);
  address: string|null = null;
  services: subGroup[] = [];
  @Output() onChecked = new EventEmitter();
  businessProfile: IViewBusinessProfile | null = null;

  constructor(private _profileData: ProfileDataService,
              private _route: Router,
              private _activateRoute: ActivatedRoute,
              private messageService: MessageService,
              private modalService: NgbModal) {

    this._profileData.servicesProfile
      .subscribe(result => this.groupShow = result);
  }

  showError() {
    this.messageService.add({severity:'error', summary: 'Ошибка',
      detail: 'Услуги не выбраны', life:5000});
  }
  chooseDate(){
    if (this.chooseServices.length > 0) {
      this._profileData.transferChooseService(this.chooseServices)
      if (this.chooseServices.filter(_ => !_.isTimeUnlimited).length === 0){
        this._route.navigate(['../confirm-record'], { relativeTo: this._activateRoute });
      } else {
        this._route.navigate(['../choose-date'], {relativeTo: this._activateRoute});
      }
    } else {
      this.showError();
    }
  }
  // addService($event: subGroup){
  //   if ($event.isChecked){
  //     this.countService += 1;
  //     if ($event.paymentForType === PaymentForType.ForHour){
  //       const modalRef = this.modalService.open(ChooseTimeModalComponent);
  //       modalRef.close((result: number) => {
  //         $event.price = result * $event.price;
  //         $event.duration = result;
  //       });
  //     }
  //     this.chooseServices.push($event);
  //     this.services$.next($event);
  //   }
  //   else {
  //     this.chooseServices = this.chooseServices.filter(_ => _.id !== $event.id);
  //   }
  // }
  // getPrice(){
  //   this.priceServices = 0;
  //   this.countService = 0;
  //   this.chooseServices.forEach(item => {
  //     this.priceServices += item.price;
  //     this.countService += 1;
  //     this.duration += item.duration!;
  //   });
  // }

  ngOnInit(): void {
    this._profileData.sendProfileBA.subscribe(result => this.businessProfile = result);
    // this._profileData.sendChooseServices.subscribe(
    //     result => this.chooseServices = result
    // );
    this.services$.subscribe(result => {
      [this.priceServices, this.countService, this.duration] = getPrice(this.chooseServices);

      if (this.chooseServices.length === 0){
        this.textChooseService = 'Услуги не выбрано';
      } else {
        this.textChooseService = 'услуги выбрано:';
      }
    });
  }

  checkedService(subGroup: subGroup){
      if (subGroup.paymentForType === PaymentForType.ForHour) {
        const modalRef = this.modalService.open(ChooseTimeModalComponent);
        modalRef.result.then((result: number) => {
          subGroup.price.price = result/60 * subGroup.price.price!;
          subGroup.duration = result;
          this.chooseServices.push(subGroup);
          this.services$.next(subGroup);
          // this.getPrice();
        });
      }else {
        this.chooseServices.push(subGroup);
        this.services$.next(subGroup);
        // this.getPrice();
      }

  }

  getCountService(){
    let count = 0;
    this.groupShow.forEach(item => {
      item.subGroups.forEach(subItem => {
        if (subItem.isChecked){
          count += 1;
        }
      });
    });
    return count;
  }
  protected readonly PaymentForType = PaymentForType;
  protected readonly getPriceString = getPriceString;
  countService: number = 0;

  getTextBtn(){
    if (this.chooseServices.length === 0){
      return 'Выберите услуги';
    }
    if (this.chooseServices.filter(_ => !_.isTimeUnlimited).length === 0){
      return 'Перейти к оформлению';
    } else {
      return 'Выбрать дату';
    }
  }

  setService($event: subGroup[]) {
      $event.forEach(_ => {
        if (!this.chooseServices.includes(_)){
          this.checkedService(_);
        }
      });
      this.chooseServices.forEach(_ => {
        if (_) {
          if (!$event.includes(_)) {
            this.chooseServices = this.chooseServices.filter(item => item !== _);
            [this.priceServices, this.countService, this.duration] = getPrice(this.chooseServices);

          }
        }
      });
  }


}
