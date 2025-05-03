import {Component, ElementRef, Input, OnChanges, ViewChild} from '@angular/core';


import {IViewBusinessProfile} from "../../DTO/views/business/IViewBussinessProfile";

import { Router } from '@angular/router';
import {ProfileService} from "../../../services/profile.service";
import {getAddressProfile, getAddressProfileStreet, prepareAddressProfile} from "../../../helpers/common/address";
import {IViewAddress} from "../../DTO/views/IViewAddress";
import {HistoryService} from "../../../services/history.service";
import {BusService} from "../../../services/busService";

import {DomSanitizer} from "@angular/platform-browser";
import {select, Store} from "@ngrx/store";
import {selectProfileMainClient} from "../../ngrx-store/mainClient/store.select";
import { FormControl } from '@angular/forms';
import { ConfirmPopup } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BestProductType } from 'src/app/DTO/enums/bestProductType';


@Component({
  selector: 'app-clients-card-list',
  templateUrl: './clients-card-list.component.html',
  styleUrls: ['./clients-card-list.component.css'],
  providers:[ProfileService, HistoryService, ConfirmationService, MessageService]
})
export class ClientsCardListComponent implements OnChanges {

  prepareAbout(arg0: string|undefined) {
    if (arg0){
      if (arg0.length > 55){
        let index = 55;
        while (index > 0){
          if ([' ',',','.','!',';'].includes(arg0[index])){
            break;
          } else {
            index -= 1;
          }
        }
        return `${arg0.substring(0,index)}...`;
      }
        
    }
    return arg0;
  }

  @Input('card-business') cards: IViewBusinessProfile[]|null = null;
  @ViewChild(ConfirmPopup) confirmPopup!: ConfirmPopup;

  auth: IViewBusinessProfile | null = null;
  positionPopup: string[] = ['100px','100px'];
  constructor(private _history: HistoryService,
              private sanitizer: DomSanitizer,
              private store$: Store,
              private elRef:ElementRef,
              private confirmationService: ConfirmationService,
              private router: Router) {
    this.store$.pipe(select(selectProfileMainClient)).subscribe(
        result => {
          this.auth = result;
        }
    );
  }

  async ngOnChanges() {
    if (this.cards && this.cards.length > 0) {
      this.cards = this.removeDuplicates(this.cards);
    }
  }

  removeDuplicates(cards: IViewBusinessProfile[] | null): IViewBusinessProfile[] {
    if (!cards) {
      return [];
    }
    return cards.filter((card, index, self) => 
      index === self.findIndex((t) => 
        JSON.stringify({ ...t, id: undefined }) === JSON.stringify({ ...card, id: undefined })
      )
    );
  }

  getNameofBest(type: BestProductType){
    switch(type){
      case BestProductType.BEST_PRICE:{
        return 'Лучшая цена в своей категории';
      }
      default:{
        return 'Лучший';
      }
    }
  }

  confirm(event: any, type: BestProductType|undefined) {
    let message = type == null ? 'Лучший' : this.getNameofBest(type);
    
    this.positionPopup[0] = `${event.pageY}px`;
    this.positionPopup[1] = `${event.pageX}px`;
    this.confirmationService.confirm({
      acceptVisible: false,
      rejectVisible: false,
        target: event.target as EventTarget,
        message: message,

    });
  }


  /** Функция получает список левого меню. */


    goToProfile(business: IViewBusinessProfile) {
    if (this.auth) {
      this._history.saveViewCard(this.auth?.id!, business.id!).subscribe(
          res => {
          }
      );
    }
      this.router.navigate(['/', business.link ? business.link : business.id]);
     //this.router.navigate(['profileba']);
   }
      goToProfileBA(business: IViewBusinessProfile) {
        this.router.navigate(['/profilebisacc', business.id]);
      //this.router.navigate(['profileba']);
    }

    goToProfileBAEDIT(business: IViewBusinessProfile) {
      this.router.navigate(['/baedit', business.id]);
    //this.router.navigate(['profileba']);
  }

  getCity(address: IViewAddress) {
    return address.city;
  }

  getAddress(address: IViewAddress) {
    return `${address.street}, ${address.home}`;
  }

  // returnCategory(mainCategory: string[] | undefined) {
  //   if (mainCategory === undefined || mainCategory.length === 0){
  //     return '';
  //   }
  //   return mainCategory[0];
  // }

  getAvatar(avatar: any) {
      if (avatar) {
        return  this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64, ${avatar}`);
      } else {
        return  '/assets/img/AvatarBig.png';
      }
  }

    protected readonly getAddressProfileStreet = getAddressProfileStreet;
    protected readonly BestProductType = BestProductType;
}
