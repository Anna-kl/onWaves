import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { GiveawayFeaturedPostComponent } from './giveaway-featured-post.component';
import { GiveawaysService } from '../../services/giveaways.service';
import { GiveawayCampaign } from '../DTO/views/giveaway/giveaway';

describe('Главный пост розыгрыша',()=>{
  const campaign=():GiveawayCampaign=>({code:'mary',version:2,title:'Mary',phase:'awaiting_results',master:{id:'master',slug:'mary',name:'Mary'},prizes:[
    {position:2,title:'Первый этап SKINHALE',maxAmountRub:3500,serviceNames:[]},
    {position:1,title:'Полный комплекс SKINHALE',maxAmountRub:7000,serviceNames:[]}],featuredPost:{template:'giveaway_results_v1',version:1,pinned:true,title:'Mary · SKINHALE',subtitle:null,imageUrl:'/assets/mary.png',imageAlt:'Участницы',videoUrl:null,videoType:null,videoPosterUrl:null,registryVisible:true,participants:{totalCount:3,items:[{number:1,phoneMask:'+7999*****38'}],nextAfter:null},winners:[{position:1,number:null,phoneMask:null},{position:2,number:null,phoneMask:null}]}});
  beforeEach(async()=>TestBed.configureTestingModule({imports:[GiveawayFeaturedPostComponent,RouterTestingModule],providers:[{provide:GiveawaysService,useValue:{featuredParticipants:()=>of({totalCount:3,items:[],nextAfter:null})}}]}).compileComponents());
  it('сохраняет два пустых места, маску и отсутствие пустого плеера',()=>{
    const fixture=TestBed.createComponent(GiveawayFeaturedPostComponent);fixture.componentInstance.campaign=campaign();fixture.componentInstance.ngOnChanges();fixture.detectChanges();
    const el:HTMLElement=fixture.nativeElement;
    expect(el.textContent).toContain('Приём заявок завершён');expect(el.textContent).toContain('+7999*****38');
    expect(el.querySelectorAll('.draw-post__awaiting').length).toBe(2);expect(el.querySelector('app-video-player')).toBeNull();
    expect(el.textContent).toContain('Видео розыгрыша появится здесь');
  });
  it('показывает номера по позициям призов, а не по порядку номеров',()=>{
    const fixture=TestBed.createComponent(GiveawayFeaturedPostComponent);const data=campaign();data.phase='results_published';data.featuredPost!.winners=[{position:1,number:9,phoneMask:null},{position:2,number:2,phoneMask:null}];
    fixture.componentInstance.campaign=data;fixture.componentInstance.ngOnChanges();fixture.detectChanges();
    const el:HTMLElement=fixture.nativeElement;
    expect(Array.from(el.querySelectorAll('.draw-post__winner')).map(n=>n.textContent?.trim())).toEqual(['№ 9','№ 2']);
    expect(el.textContent).not.toContain('Номер объявим');expect(el.textContent).toContain('Видео скоро добавим');
  });
  it('ошибка картинки оставляет результаты читаемыми',()=>{
    const fixture=TestBed.createComponent(GiveawayFeaturedPostComponent);fixture.componentInstance.campaign=campaign();fixture.componentInstance.ngOnChanges();fixture.detectChanges();
    fixture.nativeElement.querySelector('img').dispatchEvent(new Event('error'));fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('img')).toBeNull();expect(fixture.nativeElement.querySelectorAll('.draw-post__prize').length).toBe(2);
  });
});
