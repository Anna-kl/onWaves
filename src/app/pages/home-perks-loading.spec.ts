import { BehaviorSubject, ReplaySubject, of } from 'rxjs';
import { HomeMaster, HomePerks } from 'src/services/home-showcase.service';
import { PublicationBatch } from 'src/services/promotion-publications.service';
import { MainPageComponent } from './main-page.component';

describe('Публикации на карточках главной',()=>{
  function setup(browser:boolean){
    const masters=Array.from({length:8},(_,i)=>({id:String(i),bookingEnabled:true,hasCardDetails:false})) as HomeMaster[];
    const state=new BehaviorSubject<PublicationBatch>({items:[],managedSources:[]});
    const getPerks=jasmine.createSpy('legacy per-card request');
    const page=Object.assign(Object.create(MainPageComponent.prototype),{
      isBrowser:browser,filter$:new BehaviorSubject('all'),feedRequested$:new ReplaySubject<void>(1),publications:{state$:state},
      showcase:{getMastersLoad:()=>of({kind:'loaded',masters}),getMasters:()=>of(masters),getPerks},
    }) as MainPageComponent;
    (page as any).initShowcase();return {page,state,getPerks};
  }
  it('читает опубликованную редакцию из общего пакета и убирает её после снятия',()=>{
    const {page,state,getPerks}=setup(true);let result:Record<string,HomePerks>={};const sub=page.perks$.subscribe(value=>result=value);
    expect(result).toEqual({});
    state.next({items:[{id:'new',masterId:'7',sourceType:'promo_seats',badgeText:'−40%',mandatoryTerms:[],
      content:{placements:['home_master_card','profile'],shortTitle:'Новый мастер',offer:{title:'Новое предложение'}},facts:{seats:{excludeWelcomeCoupon:true}}} as any],managedSources:[]});
    expect(result['7'].promo?.title).toBe('Новый мастер');expect(result['7'].promo?.fragment).toBe('publication-new');
    state.next({items:[],managedSources:[{masterId:'7',sourceType:'promo_seats',sourceId:'source'}]});expect(result).toEqual({});
    expect(getPerks).not.toHaveBeenCalled();sub.unsubscribe();
  });
  it('SSR использует только тот же публичный пакет без запросов на каждого мастера',()=>{
    const {page,getPerks}=setup(false);page.perks$.subscribe();expect(getPerks).not.toHaveBeenCalled();
  });
});
