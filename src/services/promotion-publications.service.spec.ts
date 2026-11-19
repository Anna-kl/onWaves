import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PromotionPublicationsService } from './promotion-publications.service';

describe('Обновление публикаций API',()=>{
  beforeEach(()=>TestBed.configureTestingModule({imports:[HttpClientTestingModule]}));
  afterEach(()=>TestBed.inject(HttpTestingController).verify());
  const create=(platform='browser')=>new PromotionPublicationsService(TestBed.inject(HttpClient),TestBed.inject(HttpBackend),platform as unknown as object,document);
  const batch={items:[],managedSources:[{masterId:'master',sourceType:'welcome_policy',sourceId:'policy'}]};
  it('делит один запрос и один цикл между всеми карточками, обновляет по фокусу',fakeAsync(()=>{
    const service=create(),http=TestBed.inject(HttpTestingController);const a=service.state$.subscribe(),b=service.state$.subscribe();
    tick(0);http.expectOne(r=>r.url.endsWith('promotions/publications')).flush(batch);
    expect(service.managed('master','welcome')).toBeTrue();
    tick(30_000);http.expectOne(r=>r.url.endsWith('promotions/publications')).flush(batch);
    window.dispatchEvent(new Event('focus'));http.expectOne(r=>r.url.endsWith('promotions/publications')).flush(batch);
    a.unsubscribe();b.unsubscribe();tick(60_000);http.expectNone(r=>r.url.endsWith('promotions/publications'));
  }));
  it('при ошибке не возвращает старую рекламу из legacy',fakeAsync(()=>{
    const service=create(),http=TestBed.inject(HttpTestingController);let state:any;const sub=service.state$.subscribe(value=>state=value);
    tick(0);http.expectOne(r=>r.url.endsWith('promotions/publications')).flush(batch);
    tick(30_000);http.expectOne(r=>r.url.endsWith('promotions/publications')).flush('Unavailable',{status:503,statusText:'Unavailable'});
    expect(state.failed).toBeTrue();expect(state.items).toEqual([]);expect(service.managed('master','welcome')).toBeTrue();sub.unsubscribe();
  }));
  it('SSR делает один публичный запрос без личной авторизации и таймера',()=>{
    const service=create('server');const sub=service.state$.subscribe();const request=TestBed.inject(HttpTestingController).expectOne(r=>r.url.endsWith('promotions/publications'));
    expect(request.request.headers.has('Authorization')).toBeFalse();request.flush(batch);sub.unsubscribe();
  });
});
