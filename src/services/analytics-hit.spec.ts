import { UserType } from 'src/app/DTO/classes/profiles/profile-user.model';
import {
  absoluteHitUrl,
  clientGoalParams,
  isAnalyticsHost,
  isTestVisit,
  masterSlug,
  nextPageHit,
  queryHasTestFlag,
} from './analytics-hit';

describe('хиты Метрики', () => {
  const origin = 'https://onwaves.online';

  it('счётчик только на боевом домене', () => {
    expect(isAnalyticsHost('onwaves.online')).toBeTrue();
    expect(isAnalyticsHost('127.0.0.1')).toBeFalse();
    expect(isAnalyticsHost('localhost')).toBeFalse();
    expect(isAnalyticsHost('onwaves-server.online')).toBeFalse();
    expect(isAnalyticsHost('ocpio.ru')).toBeFalse();
    expect(isAnalyticsHost('ssr.onwaves.online')).toBeFalse();
  });

  it('холодный заход сохраняет путь, query и внешний реферер', () => {
    const state = { lastUrl: '' };
    const hit = nextPageHit(
      state,
      '/mary?utm_source=test&utm_campaign=check',
      origin,
      'https://yandex.ru/search',
    );
    expect(hit).toEqual({
      url: 'https://onwaves.online/mary?utm_source=test&utm_campaign=check',
      referrer: 'https://yandex.ru/search',
    });
  });

  it('повтор того же адреса со новым title не даёт второй хит', () => {
    const state = { lastUrl: '' };
    nextPageHit(state, '/masters?utm_source=test', origin, 'https://vk.com/');
    expect(nextPageHit(state, '/masters?utm_source=test', origin, 'https://vk.com/')).toBeNull();
  });

  it('следующая страница ссылается на предыдущий полный адрес', () => {
    const state = { lastUrl: '' };
    nextPageHit(state, '/mary?utm_source=yandex&utm_medium=cpc', origin, 'https://yandex.ru/');
    const next = nextPageHit(state, '/mary/choose-service', origin, 'https://yandex.ru/');
    expect(next).toEqual({
      url: 'https://onwaves.online/mary/choose-service',
      referrer: 'https://onwaves.online/mary?utm_source=yandex&utm_medium=cpc',
    });
  });

  it('главная — это адрес «/», а не пустая строка', () => {
    expect(absoluteHitUrl(origin, '/')).toBe('https://onwaves.online/');
    expect(absoluteHitUrl(origin, '')).toBe('https://onwaves.online/');
  });

  it('?test=1 и аккаунт мастера или администратора помечают визит', () => {
    expect(queryHasTestFlag('utm_source=test&test=1')).toBeTrue();
    expect(queryHasTestFlag('test=0')).toBeFalse();
    expect(isTestVisit(true, UserType.User)).toBeTrue();
    expect(isTestVisit(false, UserType.Business)).toBeTrue();
    expect(isTestVisit(false, UserType.Admin)).toBeTrue();
    expect(isTestVisit(false, UserType.User)).toBeFalse();
    expect(isTestVisit(false, null)).toBeFalse();
  });

  it('в параметры цели попадают слаг и услуга, но не телефон', () => {
    expect(clientGoalParams('mary', 'svc-1', false)).toEqual({
      test: false,
      master: 'mary',
      service: 'svc-1',
    });
    expect(masterSlug('https://onwaves.online/cellings')).toBe('cellings');
    expect(clientGoalParams('+79001234567', 'Анна', true)['master']).toBeUndefined();
    expect(clientGoalParams('mary', '+79001234567', true)['service']).toBeUndefined();
  });
});
