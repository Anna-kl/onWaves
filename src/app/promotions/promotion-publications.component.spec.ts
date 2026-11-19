import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { PromotionPublicationsComponent } from './promotion-publications.component';
import { PromotionPublication, PromotionPublicationsService, PublicationBatch } from '../../services/promotion-publications.service';

describe('Шаблон публикации без веток по мастеру',()=>{
  let state:BehaviorSubject<PublicationBatch>;
  const create=()=>{const fixture=TestBed.createComponent(PromotionPublicationsComponent);fixture.componentInstance.masterId='master';return fixture;};
  const publication=():PromotionPublication=>({id:'p',masterId:'master',masterSlug:'arbitrary-master',sourceType:'welcome_policy',sourceId:'rule',version:1,
    analyticsKey:'publication-p',status:'open',canBook:true,termsUrl:'/promotions/p',badgeText:'Купон до 500 ₽',mandatoryTerms:['500 ₽ строго больше 2500 ₽','Для новых клиентов OnWaves.'],
    content:{schemaVersion:1,offer:{offerType:0,title:'Новая программа',description:'Описание из API',isActive:true,sortOrder:0,buttonText:'',benefits:[],actions:[],media:[{kind:0,url:'https://s3.twcstorage.ru/qa/new.png'}]},
      shortTitle:'Новая программа',imageAlt:'Тестовая картинка',priority:1,placements:['profile','services','home_master_card','coupon_popup']},facts:{}});
  beforeEach(async()=>{
    state=new BehaviorSubject<PublicationBatch>({items:[publication()],managedSources:[]});
    await TestBed.configureTestingModule({imports:[PromotionPublicationsComponent,RouterTestingModule],providers:[{provide:PromotionPublicationsService,useValue:{state$:state}}]}).compileComponents();
  });
  it('показывает новый код, медиа, серверный бейдж и обязательные условия',()=>{
    const f=create();f.detectChanges();const el:HTMLElement=f.nativeElement;
    expect(el.textContent).toContain('Новая программа');expect(el.textContent).toContain('Купон до 500 ₽');expect(el.textContent).toContain('строго больше');
    expect(el.querySelector('img')?.getAttribute('src')).toContain('/qa/new.png');
    const changed=publication();changed.content.offer.title='Изменено через API';changed.version=2;state.next({items:[changed],managedSources:[]});f.detectChanges();
    expect(el.textContent).toContain('Изменено через API');expect(el.querySelector('[data-revision]')?.getAttribute('data-revision')).toBe('2');
    state.next({items:[],managedSources:[{masterId:'master',sourceType:'welcome_policy',sourceId:'rule'}]});f.detectChanges();expect(el.querySelector('article')).toBeNull();
  });
  it('ошибка медиа оставляет текст, а пауза убирает запись',()=>{
    const p=publication();p.canBook=false;p.status='policy_paused';state.next({items:[p],managedSources:[]});
    const f=create();f.detectChanges();f.nativeElement.querySelector('img').dispatchEvent(new Event('error'));f.detectChanges();
    expect(f.nativeElement.querySelector('img')).toBeNull();expect(f.nativeElement.textContent).toContain('Новая программа');
    expect(f.nativeElement.querySelector('.publication__button')).toBeNull();
  });
  it('компактная карточка не вкладывает ссылку в ссылку мастера',()=>{
    const f=create();f.componentInstance.placement='home_master_card';f.detectChanges();
    expect(f.nativeElement.querySelector('article')).not.toBeNull();expect(f.nativeElement.querySelector('a')).toBeNull();
  });
  it('неподдерживаемая схема и запрещённое окно не показываются',()=>{
    const f=create();f.componentInstance.placement='coupon_popup';f.detectChanges();expect(f.nativeElement.querySelector('article')).toBeNull();
    const p=publication();p.content.schemaVersion=99;state.next({items:[p],managedSources:[]});f.componentInstance.popupAllowed=true;f.detectChanges();expect(f.nativeElement.querySelector('article')).toBeNull();
  });
});
