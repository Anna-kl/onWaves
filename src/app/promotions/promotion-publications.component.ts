import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonComponentsModule } from '../common/common.module';
import { GiveawayFeaturedPostComponent } from '../giveaways/giveaway-featured-post.component';
import { PromotionPublication, PromotionPublicationsService, PublicationBatch } from '../../services/promotion-publications.service';
import { formatRub } from '../../helpers/common/welcome-coupon';
import { PromoActionKind } from '../DTO/enums/promoActionKind';
import { IPromoAction } from '../DTO/views/landing/IPromoAction';
import { ILandingOffer } from '../DTO/views/landing/ILandingOffer';

@Component({selector:'app-promotion-publications',standalone:true,
  imports:[CommonModule,RouterModule,CommonComponentsModule,GiveawayFeaturedPostComponent],
  templateUrl:'./promotion-publications.component.html',styleUrls:['./promotion-publications.component.scss']})
export class PromotionPublicationsComponent {
  @Input() placement='profile';
  @Input() masterId:string|null|undefined=null;
  @Input() popupAllowed=false;
  @Input() handleActions=false;
  @Input() publicationId:string|null=null;
  @Output() choose=new EventEmitter<void>();
  @Output() closed=new EventEmitter<void>();
  @Output() actionClick=new EventEmitter<{offer:ILandingOffer;action:IPromoAction}>();
  readonly state$=this.publications.state$;
  readonly rub=formatRub;
  imageErrors=new Set<string>();
  videoErrors=new Set<string>();
  constructor(private publications:PromotionPublicationsService){}
  get compact():boolean{return this.placement==='home_master_card'||this.placement==='catalog_master_card';}
  items(state:PublicationBatch):PromotionPublication[] {
    if(this.placement==='terms'?!this.publicationId:this.placement!=='home_featured'&&this.placement!=='home'&&!this.masterId)return [];
    return state.items.filter(p=>p.content?.schemaVersion===1&&(this.placement==='terms'||p.content.placements.includes(this.placement))
      &&(!this.masterId||p.masterId===this.masterId)&&(!this.publicationId||p.id===this.publicationId)
      && (this.placement!=='coupon_popup'||this.popupAllowed&&p.canBook)).slice(0,this.placement==='home_featured'?1:20);
  }
  chooseDefault(event:Event):void {
    if(this.placement==='coupon_popup'){event.preventDefault();this.choose.emit();this.closed.emit();}
  }
  image(p:PromotionPublication):string|null{return p.content.offer.media?.find(m=>m.kind===0)?.url||p.content.offer.imageUrl||null;}
  gallery(p:PromotionPublication):string[]{
    return [...(p.content.offer.media??[]).filter(m=>m.kind===0).map(m=>m.url),...(p.content.offer.galleryUrls??[])].filter((url,index,all)=>all.indexOf(url)===index&&url!==this.image(p));
  }
  video(p:PromotionPublication){return p.content.offer.media?.find(m=>m.kind===1);}
  badge(p:PromotionPublication):string {
    return p.badgeText;
  }
  status(p:PromotionPublication):string {
    const seats=p.facts.seats;
    if(seats?.closedReason==='not_started')return 'Скоро начнётся';
    if(seats&&p.status==='open')return `Осталось ${seats.seatsLeft} из ${seats.seatsLimit} мест`;
    if(p.status==='open')return 'Доступно';
    return p.status==='results_published'?'Итоги опубликованы':p.status==='awaiting_results'?'Приём заявок завершён':'Предложение сейчас недоступно';
  }
  bookQuery(p:PromotionPublication,action?:IPromoAction):Record<string,string> {
    const query:Record<string,string>={};const id=action?.serviceId||p.content.offer.serviceId;
    if(id)query['serviceId']=id;
    if(p.facts.seats)query['promoCampaign']=p.facts.seats.code;
    return query;
  }
  act(p:PromotionPublication,action:IPromoAction,event:Event):void {
    if(this.placement==='coupon_popup'){event.preventDefault();this.choose.emit();this.closed.emit();}
    else if(this.handleActions&&action.kind===PromoActionKind.Calculator){event.preventDefault();this.actionClick.emit({offer:p.content.offer,action});}
  }
  actionPath(p:PromotionPublication,action:IPromoAction):string[] {
    return action.kind===PromoActionKind.Calculator?['/',p.masterSlug]:['/',p.masterSlug,'choose-service'];
  }
}
