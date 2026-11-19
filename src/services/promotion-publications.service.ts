import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Inject, Injectable, NgZone, Optional, PLATFORM_ID } from '@angular/core';
import { EMPTY, Observable, catchError, exhaustMap, expand, filter, fromEvent, map, merge, of, reduce, shareReplay, startWith, timer } from 'rxjs';
import { environment } from '../enviroments/environment';
import { ILandingOffer } from '../app/DTO/views/landing/ILandingOffer';
import { PromoSeatState } from '../app/DTO/views/promo/promo-seats';
import { WelcomeOffer } from '../app/DTO/views/promo/welcome-coupon';
import { GiveawayCampaign } from '../app/DTO/views/giveaway/giveaway';

export interface PromotionPublication {
  id:string; masterId:string; masterSlug:string; sourceType:string; sourceId:string;
  version:number; analyticsKey:string; status:string; canBook:boolean; termsUrl:string; badgeText:string; mandatoryTerms:string[];
  content:{schemaVersion:number; offer:ILandingOffer; shortTitle:string|null; imageAlt:string|null; placements:string[]; priority:number};
  facts:{seats?:PromoSeatState; welcome?:WelcomeOffer; giveaway?:GiveawayCampaign; landing?:ILandingOffer};
}
export interface PublicationBatch {
  items:PromotionPublication[];
  managedSources:{masterId:string;sourceType:string;sourceId:string}[];
  failed?:boolean;
  nextCursor?:string|null;
}

@Injectable({providedIn:'root'})
export class PromotionPublicationsService {
  readonly state$:Observable<PublicationBatch>;
  private latest:PublicationBatch={items:[],managedSources:[]};
  constructor(http:HttpClient,backend:HttpBackend,@Inject(PLATFORM_ID) platform:object,@Inject(DOCUMENT) doc:Document,@Optional() zone:NgZone|null=null) {
    const browser=isPlatformBrowser(platform);
    const client=browser?new HttpClient(backend):http;
    const view=doc.defaultView;
    const refresh=browser&&view?merge(timer(0,30_000).pipe(filter(()=>!doc.hidden)),
      fromEvent(view,'focus'),fromEvent(view,'online'),fromEvent(doc,'visibilitychange').pipe(filter(()=>!doc.hidden))):of(0);
    const url=`${environment.Uri}promotions/publications`;
    const source=refresh.pipe(exhaustMap(()=>client.get<PublicationBatch>(url).pipe(
      expand(page=>page.nextCursor?client.get<PublicationBatch>(url+'?afterId='+encodeURIComponent(page.nextCursor)):EMPTY),
      reduce((all,page)=>({items:[...all.items,...page.items],managedSources:[...all.managedSources,...page.managedSources]}),{items:[],managedSources:[]} as PublicationBatch),
      map(batch=>{this.latest={...batch,items:batch.items.sort((a,b)=>b.content.priority-a.content.priority||a.id.localeCompare(b.id)),failed:false};return this.latest;}),
      // Failed reads clear advertised facts while preserving managed IDs: never revive withdrawn legacy adverts.
      catchError(()=>of({items:[],managedSources:this.latest.managedSources,failed:true})),
    )),startWith(this.latest));
    // An interval inside Angular prevents stability/hydration cleanup. Only rendering re-enters the zone.
    this.state$=new Observable<PublicationBatch>(observer=>{
      const subscribe=()=>source.subscribe({next:batch=>zone?zone.run(()=>observer.next(batch)):observer.next(batch),error:error=>observer.error(error),complete:()=>observer.complete()});
      const subscription=browser&&zone?zone.runOutsideAngular(subscribe):subscribe();
      return ()=>subscription.unsubscribe();
    }).pipe(shareReplay({bufferSize:1,refCount:true}));
  }
  managed(master:string|null|undefined,type:string,sourceId?:string):boolean {
    return this.latest.managedSources.some(s=>s.masterId===master&&(type==='welcome'?s.sourceType.startsWith('welcome_'):s.sourceType===type)&&(!sourceId||s.sourceId===sourceId));
  }
}
