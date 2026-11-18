import { BehaviorSubject, ReplaySubject, Subject, of } from 'rxjs';
import { HomeMaster, HomePerks } from 'src/services/home-showcase.service';
import { MainPageComponent } from './main-page.component';

describe('Загрузка предложений главной', () => {
  function setup(browser: boolean) {
    const masters = Array.from({length:8},(_,i) => ({id:String(i),bookingEnabled:true,hasCardDetails:false})) as HomeMaster[];
    const requests: Subject<HomePerks>[] = [];
    const getPerks = jasmine.createSpy('getPerks').and.callFake(() => {
      const response = new Subject<HomePerks>();requests.push(response);return response;
    });
    // Initialize the stream wiring independently of login, router and unrelated feeds.
    const page = Object.assign(Object.create(MainPageComponent.prototype), {
      isBrowser:browser,filter$:new BehaviorSubject('all'),feedRequested$:new ReplaySubject<void>(1),refreshPerks$:new BehaviorSubject<void>(undefined),
      showcase:{getMastersLoad:()=>of({kind:'loaded',masters}),getMasters:()=>of(masters),getPerks},
    }) as MainPageComponent;
    (page as any).initShowcase();
    return {page,requests,getPerks};
  }
  it('запрашивает мастеров вне ручной подборки максимум по три одновременно', () => {
    const {page,requests,getPerks}=setup(true);let result:Record<string,HomePerks>={};
    const sub=page.perks$.subscribe(value=>result=value);
    expect(getPerks).toHaveBeenCalledTimes(3);
    for (let i=0;i<8;i++) {requests[i].next({coupon:null,promo:null});requests[i].complete();}
    expect(getPerks).toHaveBeenCalledTimes(8);expect(Object.keys(result).length).toBe(8);sub.unsubscribe();
  });
  it('не запрашивает условия купонов и акций во время SSR', () => {
    const {page,getPerks}=setup(false);let result:Record<string,HomePerks>|undefined;
    page.perks$.subscribe(value=>result=value);
    expect(result).toEqual({});expect(getPerks).not.toHaveBeenCalled();
  });
});
