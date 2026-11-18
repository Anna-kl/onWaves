import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HomeMastersLoad, HomeShowcaseService } from './home-showcase.service';

describe('Главная: список мастеров', () => {
  let service: HomeShowcaseService;
  let http: HttpTestingController;
  let load: HomeMastersLoad;
  const row = (n: number, extras = {}) => ({
    id: String(n).padStart(3, '0'), link: 'master-' + n, name: 'Мастер ' + n,
    city: null, address: null, group: 'other', category: null, avatarUrl: null,
    bookingEnabled: false, ...extras,
  });
  const batch = Array.from({ length: 12 }, (_, i) => row(i + 1));
  const page = (after: string | null = null) => http.expectOne(
    req => req.url.endsWith('/profiles/home-masters') && req.params.get('after') === after);

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(HomeShowcaseService);
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());

  it('читает все страницы и показывает новые карточки без дублирования и чужих данных', () => {
    const sub = service.getMastersLoad().subscribe(value => load = value);
    page().flush({ items: batch, nextCursor: '012' });
    page('012').flush({ items: [batch[11], row(13, { link: 'soblazn_ozery', name: 'Соблазн', city: 'Озёры', group: 'beauty', bookingEnabled: true }),
      row(14, { link: null, name: null })], nextCursor: null });
    expect(load.kind).toBe('loaded');
    expect(load.masters.length).toBe(14);
    expect(load.masters[12]).toEqual(jasmine.objectContaining({
      title: 'Соблазн', place: 'Озёры', link: 'soblazn_ozery', group: 'beauty', bookingEnabled: true, showPromo: true,
    }));
    expect(load.masters[13]).toEqual(jasmine.objectContaining({
      link: '014', group: 'other', title: 'Мастер OnWaves', place: '', bookingEnabled: false,
      tags: [], avatar: null, priceText: undefined,
    }));
    sub.unsubscribe();
  });

  it('сохраняет первую страницу и повторяет запрос с курсора отказавшей страницы', () => {
    const sub = service.getMastersLoad().subscribe(value => load = value);
    page().flush({ items: batch, nextCursor: '012' });
    page('012').flush(null, { status: 503, statusText: 'Unavailable' });
    expect(load.kind).toBe('error');
    expect(load.masters.length).toBe(12);
    service.retryMasters();
    expect(load.kind).toBe('loading');
    expect(load.masters.length).toBe(12);
    page('012').flush({ items: [row(13)], nextCursor: null });
    expect(load.kind).toBe('loaded');
    expect(load.masters.length).toBe(13);
    sub.unsubscribe();
  });

  it('обновляет состав при повторном входе и разделяет пустую выдачу и отказ API', () => {
    const first = service.getMastersLoad().subscribe(value => load = value);
    page().flush({ items: [row(1)], nextCursor: null });
    expect(load.masters.length).toBe(1);
    first.unsubscribe();
    const second = service.getMastersLoad().subscribe(value => load = value);
    page().flush({ items: [], nextCursor: null });
    expect(load).toEqual({ kind: 'loaded', masters: [] });
    second.unsubscribe();
    const third = service.getMastersLoad().subscribe(value => load = value);
    page().flush(null, { status: 404, statusText: 'Not Found' });
    expect(load).toEqual({ kind: 'error', masters: [] });
    third.unsubscribe();
  });

  it('оставляет личные ограничения Mary и не запрашивает работы новых мастеров', () => {
    const sub = service.getMastersLoad().subscribe(value => load = value);
    page().flush({ items: [row(1, { link: 'mary' }), row(2)], nextCursor: null });
    const mary = load.masters[0];
    expect(mary.showPromo).toBeFalse();
    expect(mary.feedAlbums).toEqual(['Депиляция']);
    service.getFeed(load.masters).subscribe();
    http.expectOne(req => req.url.includes('posts-profile/001')).flush([]);
    http.expectOne(req => req.url.endsWith('/albums/001')).flush([
      { id: 'approved', name: 'Депиляция', countImages: 1 },
      { id: 'private', name: 'Другой альбом', countImages: 1 },
    ]);
    http.expectOne(req => req.url.endsWith('/albums/image/approved')).flush([]);
    sub.unsubscribe();
  });
});
