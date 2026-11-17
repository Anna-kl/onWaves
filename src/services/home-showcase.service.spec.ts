import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { IViewBusinessProfile } from '../app/DTO/views/business/IViewBussinessProfile';
import { HOME_FEATURED } from '../app/pages/home/home-showcase.config';
import { HomeMaster, HomeMastersLoad, HomeShowcaseService } from './home-showcase.service';

describe('Подборка главной при пагинации каталога', () => {
  let service: HomeShowcaseService;
  let http: HttpTestingController;

  const svetlana: IViewBusinessProfile = {
    id: '8bb0b62b-2ada-441c-adfe-e6e07acf94f8', link: 'permanent_ozery', name: 'Светлана Бирюкова',
    address: { city: 'Озёры' },
  } as IViewBusinessProfile;
  const others = HOME_FEATURED.filter(cfg => cfg.link !== svetlana.link).map((cfg, i) => ({
    id: 'featured-' + i, link: cfg.link,
  } as IViewBusinessProfile));
  const firstPage = [...others, ...Array.from({ length: 12 - others.length }, (_, i) => ({
    id: 'other-' + i, link: 'other-' + i,
  } as IViewBusinessProfile))];

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(HomeShowcaseService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  const pageAt = (skip: number) => http.expectOne(request =>
    request.url.endsWith('/profiles/') && request.params.get('skip') === String(skip));

  it('показывает Светлану со второй страницы и сохраняет результат при возврате на главную', () => {
    let masters: HomeMaster[] = [];
    service.getMasters().subscribe(value => masters = value);
    pageAt(0).flush(firstPage);
    pageAt(12).flush([svetlana]);
    expect(masters.length).toBe(HOME_FEATURED.length);
    expect(masters.find(master => master.link === svetlana.link)?.place).toBe('Озёры');
    service.getMasters().subscribe(value => expect(value).toBe(masters));
    http.expectNone(request => request.url.endsWith('/profiles/'));
  });

  it('останавливается после сбора подборки, даже если последняя страница полная', () => {
    service.getMasters().subscribe();
    pageAt(0).flush([...others, svetlana, ...firstPage.slice(0, 12 - HOME_FEATURED.length)]);
    http.expectNone(request => request.params.get('skip') === '12');
  });

  it('сохраняет найденные карточки при ошибке следующей страницы', () => {
    let masters: HomeMaster[] = [];
    let load: HomeMastersLoad | undefined;
    service.getMastersLoad().subscribe(value => load = value);
    service.getMasters().subscribe(value => masters = value);
    pageAt(0).flush(firstPage);
    pageAt(12).flush({}, { status: 503, statusText: 'Unavailable' });
    expect(masters.length).toBe(others.length);
    expect(load?.kind).toBe('error');

    service.retryMasters();
    expect(load?.kind).toBe('loading');
    expect(load?.masters.length).toBe(others.length);
    pageAt(0).flush(firstPage);
    pageAt(12).flush([svetlana]);
    expect(load?.kind).toBe('loaded');
    expect(masters.length).toBe(HOME_FEATURED.length);
  });

  it('отличает 500 от пустого каталога и повторяет загрузку без F5', () => {
    let load: HomeMastersLoad | undefined;
    service.getMastersLoad().subscribe(value => load = value);
    expect(load?.kind).toBe('loading');
    pageAt(0).flush({}, { status: 500, statusText: 'Internal Server Error' });
    expect(load?.kind).toBe('error');
    expect(load?.masters).toEqual([]);

    service.retryMasters();
    expect(load?.kind).toBe('loading');
    pageAt(0).flush([svetlana]);
    expect(load?.kind).toBe('loaded');
    expect(load?.masters.map(master => master.link)).toEqual([svetlana.link!]);
  });

  it('пустой успешный ответ не показывает ошибку', () => {
    let load: HomeMastersLoad | undefined;
    service.getMastersLoad().subscribe(value => load = value);
    pageAt(0).flush([]);
    expect(load).toEqual({ kind: 'loaded', masters: [] });
  });

  it('не теряет старые карточки, если повтор загрузил меньше страниц и завершился ошибкой', () => {
    let load: HomeMastersLoad | undefined;
    service.getMastersLoad().subscribe(value => load = value);
    pageAt(0).flush([...others, svetlana]);
    expect(load?.masters.length).toBe(HOME_FEATURED.length);
    service.retryMasters();
    pageAt(0).flush([svetlana, ...Array.from({ length: 11 }, (_, i) => ({
      id: 'not-featured-' + i, link: 'not-featured-' + i,
    }))]);
    pageAt(12).flush({}, { status: 503, statusText: 'Unavailable' });
    expect(load?.kind).toBe('error');
    expect(load?.masters.length).toBe(HOME_FEATURED.length);
  });

  it('сетевой сбой можно повторить; несколько подписок и кликов не дублируют запрос', () => {
    let load: HomeMastersLoad | undefined;
    service.getMastersLoad().subscribe(value => load = value);
    service.getMasters().subscribe();
    pageAt(0).error(new ProgressEvent('error'));
    expect(load?.kind).toBe('error');
    service.retryMasters();
    service.retryMasters();
    pageAt(0).flush([svetlana]);
    expect(load?.kind).toBe('loaded');
  });

  it('после восстановления мастеров загружает ленту вместо сохранённой пустоты', () => {
    let masters: HomeMaster[] = [];
    service.getFeed([]).subscribe(feed => expect(feed).toEqual([]));
    service.getMasters().subscribe(value => masters = value);
    pageAt(0).flush([svetlana]);
    let feedCount = 0;
    service.getFeed(masters).subscribe(feed => feedCount = feed.length);
    http.expectOne(request => request.url.includes('/posts/posts-profile/')).flush([
      { id: 'post-1', text: 'Новая работа', dateCreated: '2026-11-16T08:00:00Z' },
    ]);
    http.expectOne(request => request.url.endsWith('/albums/' + svetlana.id)).flush([]);
    expect(feedCount).toBe(1);
    service.getFeed(masters).subscribe(feed => expect(feed.length).toBe(1));
  });

  it('не запрашивает каталог бесконечно, если API повторяет предыдущую страницу', () => {
    let masters: HomeMaster[] = [];
    service.getMasters().subscribe(value => masters = value);
    pageAt(0).flush(firstPage);
    pageAt(12).flush(firstPage);
    expect(masters.length).toBe(others.length);
    http.expectNone(request => request.params.get('skip') === '24');
  });
});
