import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CookieService } from 'ngx-cookie-service';
import { HTTP_INTERCEPTORS, HttpClient, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { HomeMaster, HomePerks, HomeShowcaseService } from './home-showcase.service';
import { PromoSeatState } from 'src/app/DTO/views/promo/promo-seats';

describe('Главная: серверные акции вне ручной подборки', () => {
  let service: HomeShowcaseService;
  let http: HttpTestingController;
  let result: HomePerks;
  let staleCache = false;
  const master: HomeMaster = { id: 'outside-list', link: 'soblazn_ozery', group: 'beauty',
    title: 'Соблазн', name: 'Соблазн', subtitle: '', place: 'Озёры', tags: [], avatar: null,
    initial: 'С', showPromo: true, hasCardDetails: false, bookingEnabled: true };
  const state = (extra = {}): PromoSeatState => ({ code: 'soblazn-nails-60-2026-11', title: 'Маникюр и педикюр с покрытием',
    status: 'open', closedReason: null, startsAt: new Date(Date.now()-86400000).toISOString(),
    endsAt: new Date(Date.now()+7*86400000).toISOString(), visitDeadline: new Date(Date.now()+30*86400000).toISOString(),
    seatsLimit: 2, seatsLeft: 2, discountPercent: 60, showOnProfile: true, excludeWelcomeCoupon: true,
    services: [{ serviceId: 'nails', name: 'Маникюр', listAmount: 2200, promoDiscount: 1320, couponDiscount: 0, clientPays: 880 }], ...extra });
  const offer = (extra = {}) => ({ active: true, masterParticipates: true, campaign: {
    code: 'welcome', title: 'Приветственный купон', endsAt: new Date(Date.now()+86400000).toISOString(),
    amountMode: 'tiers', tiers: [{ threshold: 2500, discount: 500, text: '500 ₽ строго свыше 2500' }],
  }, ...extra });
  const coupon = () => http.expectOne(req => req.url.endsWith('/coupons/welcome/offer') && req.params.get('masterId')===master.id);
  const seats = () => http.expectOne(req => req.url.endsWith('/promos/seats/'+master.id));

  beforeEach(() => {
    staleCache = false;
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule], providers: [CookieService, {
      provide: HTTP_INTERCEPTORS, multi: true, useValue: {
        intercept: (request: HttpRequest<unknown>, next: HttpHandler) => staleCache
          ? of(new HttpResponse({body:{cached:true}})) : next.handle(request),
      },
    }] });
    service = TestBed.inject(HomeShowcaseService); http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());

  it('перечитывает финансовые условия даже при активном кеше обычного HttpClient', () => {
    staleCache = true;
    TestBed.inject(HttpClient).get('/cache-proof').subscribe(value => expect(value).toEqual({cached:true}));
    http.expectNone('/cache-proof');
    service.getPerks(master).subscribe(value => result=value);
    coupon().flush(offer({active:false}));seats().flush(state({status:'closed',closedReason:'seats_exhausted',seatsLeft:0}));
    http.expectOne(req=>req.url.endsWith('/landing/'+master.id)).flush({code:200,data:{isActive:true,offers:[]}});
    expect(result).toEqual({coupon:null,promo:null});
  });

  it('анонсирует будущую кампанию при seatsLeft=0 и не читает дублирующий landing', () => {
    service.getPerks(master).subscribe(value => result=value);
    const request = coupon();expect(request.request.headers.get('Cache-Control')).toBe('no-store');
    request.flush(offer({active:false}));
    seats().flush(state({status:'closed',closedReason:'not_started',seatsLeft:0,startsAt:new Date(Date.now()+86400000).toISOString()}));
    http.expectNone(req => req.url.includes('/landing/'));
    expect(result.promo?.badge).toBe('−60%');expect(result.promo?.statusText).toMatch(/^С /);
    expect(result.promo?.statusText).toContain('2 места на все услуги');expect(result.coupon).toBeNull();
  });

  it('показывает открытую кампанию и независимый купон, исключая сложение', () => {
    service.getPerks(master).subscribe(value => result=value);
    coupon().flush(offer());seats().flush(state({seatsLeft:1}));
    expect(result.coupon?.text).toContain('500');
    expect(result.promo).toEqual(jasmine.objectContaining({badge:'−60%',title:'Маникюр или педикюр',fragment:'promo-seats',excludesCoupon:true}));
    expect(result.promo?.statusText).toBe('Осталось одно место');
    service.getPerks(master).subscribe();http.expectNone(req => req.url.includes('/welcome/offer') || req.url.includes('/promos/seats/'));
  });

  for (const closedReason of ['seats_exhausted','ended','disabled'] as const) {
    it(`исключает связанную ${closedReason} акцию, сохраняя независимое предложение`, () => {
      service.getPerks(master).subscribe(value => result=value);
      coupon().flush(offer());seats().flush(state({status:'closed',closedReason,seatsLeft:0,heroOfferId:'related'}));
      http.expectOne(req => req.url.endsWith('/landing/'+master.id)).flush({code:200,data:{isActive:true,offers:[
        {id:'related',isActive:true,title:'Старая акция −60%',sortOrder:0},
        {id:'consultation',isActive:true,title:'Бесплатная консультация',sortOrder:1},
      ]}});
      expect(result.promo?.title).toBe('Бесплатная консультация');expect(result.coupon).not.toBeNull();
    });
  }

  it('при отказе API мест скрывает акцию, но сохраняет подтверждённый купон', () => {
    service.getPerks(master).subscribe(value => result=value);
    coupon().flush(offer());seats().flush(null,{status:503,statusText:'Unavailable'});
    expect(result.promo).toBeNull();expect(result.coupon).not.toBeNull();
    http.expectNone(req => req.url.includes('/landing/'));
  });

  it('обновляет исчерпание после истечения минутного кеша', () => {
    const originalNow=Date.now();const clock=spyOn(Date,'now').and.returnValue(originalNow);
    service.getPerks(master).subscribe(value => result=value);coupon().flush(offer());seats().flush(state());
    expect(result.promo?.badge).toBe('−60%');
    clock.and.returnValue(originalNow+60_001);
    service.getPerks(master).subscribe(value => result=value);coupon().flush(offer({active:false}));
    seats().flush(state({status:'closed',closedReason:'seats_exhausted',seatsLeft:0}));
    http.expectOne(req => req.url.endsWith('/landing/'+master.id)).flush({code:200,data:{isActive:true,offers:[]}});
    expect(result).toEqual({coupon:null,promo:null});
  });

  it('сброс при обновлении главной не сохраняет старый анонс после старта', () => {
    service.getPerks(master).subscribe(value => result=value);coupon().flush(offer({active:false}));
    seats().flush(state({status:'closed',closedReason:'not_started',seatsLeft:0,startsAt:new Date(Date.now()+86400000).toISOString()}));
    expect(result.promo?.statusText).toMatch(/^С /);service.invalidatePerks();
    service.getPerks(master).subscribe(value => result=value);coupon().flush(offer({active:false}));seats().flush(state());
    expect(result.promo?.statusText).not.toMatch(/^С /);
  });

  for (const status of [204,404]) {
    it(`при ${status} сохраняет прежний landing мастера вне списка`, () => {
      service.getPerks({...master,link:'another-new-master'}).subscribe(value => result=value);
      coupon().flush(offer({masterParticipates:false}));
      seats().flush(null,{status,statusText:status===204?'No Content':'Not Found'});
      http.expectOne(req => req.url.endsWith('/landing/'+master.id)).flush({code:200,data:{isActive:true,offers:[{isActive:true,title:'Ручной массаж',badge:'Акция',sortOrder:0}]}});
      expect(result.promo?.title).toBe('Ручной массаж');expect(result.coupon).toBeNull();
    });
  }

  it('сохраняет исключение Mary для всех промо и не блокирует её отдельный купон', () => {
    service.getPerks({...master,link:'mary',showPromo:false,hasCardDetails:true}).subscribe(value => result=value);
    coupon().flush(offer());expect(result.coupon).not.toBeNull();expect(result.promo).toBeNull();
    http.expectNone(req => req.url.includes('/promos/seats/') || req.url.includes('/landing/'));
  });

  for (const extra of [{active:false},{masterParticipates:false},{campaign:null}]) {
    it(`не обещает купон без подтверждения ${JSON.stringify(extra)}`, () => {
      service.getPerks(master).subscribe(value => result=value);
      coupon().flush(offer(extra));seats().flush(state());
      expect(result.coupon).toBeNull();expect(result.promo?.badge).toBe('−60%');
    });
  }

  it('не загружает льготы мастера с выключенной записью', () => {
    service.getPerks({...master,bookingEnabled:false}).subscribe(value => result=value);
    expect(result).toEqual({coupon:null,promo:null});http.expectNone(() => true);
  });
});
