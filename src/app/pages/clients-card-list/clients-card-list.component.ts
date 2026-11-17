import {Component, ElementRef, Input, OnChanges, ViewChild} from '@angular/core';
import { ToastService } from 'src/services/toast.service';


import {IViewBusinessProfile} from "../../DTO/views/business/IViewBussinessProfile";

import { Router } from '@angular/router';
import {ProfileService} from "../../../services/profile.service";
import {getAddressProfile, getAddressProfileStreet, prepareAddressProfile, formatWorkLocations} from "../../../helpers/common/address";
import { addBreakOpportunitiesAfterPunctuation } from "../../../helpers/common/text-break.helpers";
import {IViewAddress} from "../../DTO/views/IViewAddress";
import {HistoryService} from "../../../services/history.service";
import {BusService} from "../../../services/busService";

import {DomSanitizer} from "@angular/platform-browser";
import {select, Store} from "@ngrx/store";
import {selectProfileMainClient} from "../../ngrx-store/mainClient/store.select";
import { FormControl } from '@angular/forms';
import { ConfirmPopup } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { BestProductType } from 'src/app/DTO/enums/bestProductType';
import { ExternalReviewSource } from 'src/app/DTO/enums/externalReviewSource';
import { resolveAvatarUrl } from 'src/helpers/common/avatar1';


@Component({
  selector: 'app-clients-card-list',
  templateUrl: './clients-card-list.component.html',
  styleUrls: ['./clients-card-list.component.scss'],
  providers:[ProfileService, HistoryService, ConfirmationService]
})
export class ClientsCardListComponent implements OnChanges {

  /** Для шаблона: общая функция из helpers/common/text-break.helpers */
  readonly titleWithBreakOpportunities = addBreakOpportunitiesAfterPunctuation;

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
  /** Пустая карточка «ваша страница» — только витрина главной для гостя. */
  @Input() showInvite = false;
  @ViewChild(ConfirmPopup) confirmPopup!: ConfirmPopup;

  auth: IViewBusinessProfile | null = null;
  positionPopup: string[] = ['100px','100px'];
  constructor(private _history: HistoryService,
              private sanitizer: DomSanitizer,
              private store$: Store,
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

  confirm(event: MouseEvent, type: BestProductType|undefined) {
    event.preventDefault();
    event.stopPropagation();
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

    /**
     * Команды routerLink для карточки мастера.
     * В SSR это становится href="/slug" — то, что Google считает внутренней ссылкой.
     */
    profileCommands(business: IViewBusinessProfile): string[] | null {
      const stored = (business.link ?? '').trim();
      if (!stored || stored.length > 120 || /[\\/:?#\s]/.test(stored) || stored === '.' || stored === '..' ||
          /^[\da-f]{8}(?:-[\da-f]{4}){3}-[\da-f]{12}$/i.test(stored)) {
        return null;
      }
      return ['/', stored];
    }

    /** История просмотра — навигацию даёт href/routerLink, не этот обработчик. */
    onProfileNavigate(business: IViewBusinessProfile): void {
      if (this.auth?.id && business.id && this.profileCommands(business)) {
        this._history.saveViewCard(this.auth.id, business.id).subscribe();
      }
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

  getAvatar(avatarUrl: string | null | undefined) {
    return resolveAvatarUrl(avatarUrl);
  }

    protected readonly getAddressProfileStreet = getAddressProfileStreet;
    protected readonly BestProductType = BestProductType;
    protected readonly ExternalReviewSource = ExternalReviewSource;

    /** Есть ли у профиля собственные отзывы/рейтинг на платформе. */
    hasOwnReviews(business: IViewBusinessProfile): boolean {
      return !!business.rating || !!business.countReviews;
    }

    /** Показывать ли внешний рейтинг (свой отсутствует, но есть внешний). */
    hasExternalReviews(business: IViewBusinessProfile): boolean {
      return !this.hasOwnReviews(business) && business.externalRating != null;
    }

    /** Плоский адрес по форматам работы (через запятую); фолбэк — address.city от бэка. */
    addressText(business: IViewBusinessProfile): string {
      return formatWorkLocations(business.workLocations) || (business.address?.city ?? '');
    }

    hasPhoto(business: IViewBusinessProfile): boolean {
      return !!business.avatarUrl;
    }

    categoryOf(business: IViewBusinessProfile): string {
      return (business.mainCategory ?? []).find(item => !!item && item.trim())?.trim() ?? '';
    }

    cityOf(business: IViewBusinessProfile): string {
      const fromWork = business.workLocations?.find(item => !!item.city)?.city;
      const fromMobile = business.workLocations?.find(item => item.cities?.length)?.cities?.[0];
      return (fromWork || fromMobile || business.address?.city || '').trim();
    }

    letterOf(business: IViewBusinessProfile): string {
      const name = (business.name ?? '').trim();
      return name ? name.charAt(0).toUpperCase() : '•';
    }

    isSoftTone(business: IViewBusinessProfile): boolean {
      const text = `${this.categoryOf(business)} ${business.name ?? ''}`.toLowerCase();
      return /красот|маник|педик|бров|ресниц|волос|космет|визаж|макияж|ногт|spa|сп[аa]/.test(text);
    }
}
