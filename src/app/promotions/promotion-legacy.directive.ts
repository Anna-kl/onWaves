import { Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { PromotionPublicationsService } from '../../services/promotion-publications.service';

/** Backfill transfers ownership of a surface; unpublish must not resurrect the legacy advert. */
@Directive({selector:'[promotionLegacy]',standalone:true})
export class PromotionLegacyDirective implements OnInit,OnChanges,OnDestroy {
  @Input() promotionLegacy:string|null|undefined;
  @Input() legacyType='promo_seats';
  @Input() legacySourceId?:string;
  private sub?:Subscription;
  constructor(private publications:PromotionPublicationsService,private el:ElementRef,private renderer:Renderer2){}
  ngOnInit():void {this.sub=this.publications.state$.subscribe(()=>this.apply());}
  ngOnChanges():void {this.apply();}
  private apply():void {
    if(this.publications.managed(this.promotionLegacy,this.legacyType,this.legacySourceId))this.renderer.setStyle(this.el.nativeElement,'display','none');
    else this.renderer.removeStyle(this.el.nativeElement,'display');
  }
  ngOnDestroy():void {this.sub?.unsubscribe();}
}
