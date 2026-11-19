import { WorkLocationType } from '../../DTO/enums/workLocationType';
import { IWorkLocation } from '../../DTO/views/IWorkLocation';
import { IViewBusinessProfile } from '../../DTO/views/business/IViewBussinessProfile';
import { CELLINGS_FALLBACK_CITIES, displayOfferCities } from './cellings-offer';
import {
  buildPublicProfileDescription,
  buildPublicProfileTitle,
  postalLocality,
  publicProfileSeoFrom,
} from './public-profile-seo';

function location(cities: string[]): IWorkLocation {
  return { locationType: WorkLocationType.Mobile, cities };
}

describe('displayOfferCities', () => {
  it('falls back to all five advertised cities when work locations are unavailable', () => {
    expect(displayOfferCities([])).toEqual([
      'Кашира', 'Ступино', 'Озёры', 'Коломна', 'Домодедово',
    ]);
    expect(CELLINGS_FALLBACK_CITIES).toContain('Домодедово');
  });

  it('uses workLocations from API and does not append hardcoded cities', () => {
    expect(displayOfferCities([location(['Кашира', 'Ступино'])])).toEqual(['Кашира', 'Ступино']);
  });
});

describe('buildPublicProfileTitle', () => {
  it('does not promise booking for a promo profile without a rubric', () => {
    expect(buildPublicProfileTitle({
      name: 'Катерина Агапова',
      city: 'Озёры',
      isPromo: true,
    })).toBe('Катерина Агапова, Озёры — услуги и цены | OnWaves');
  });

  it('keeps the supplied rubric for a promo profile', () => {
    expect(buildPublicProfileTitle({
      name: 'Катерина Агапова',
      city: 'Озёры',
      category: 'Депиляция и шугаринг',
      isPromo: true,
    })).toBe('Депиляция и шугаринг — Катерина Агапова, Озёры | OnWaves');
  });

  it('uses five cities and omits empty master name on /cellings', () => {
    expect(buildPublicProfileTitle({
      name: '   ',
      link: 'cellings',
      workLocations: [],
    })).toBe('Натяжные потолки — Кашира, Ступино, Озёры, Коломна и Домодедово — OnWaves');
  });

  it('does not put a duplicate «натяжной» name into the title', () => {
    expect(buildPublicProfileTitle({
      name: 'Натяжные потолки Кашира',
      link: 'cellings',
      workLocations: [],
    })).toBe('Натяжные потолки — Кашира, Ступино, Озёры, Коломна и Домодедово — OnWaves');
  });

  it('puts this master rubric first and leaves a card without a rubric on name and city', () => {
    expect(buildPublicProfileTitle({
      name: 'Mary',
      city: 'Кашира',
      category: 'Косметолог',
      link: 'mary',
    })).toBe('Косметолог — Mary, Кашира | OnWaves');

    expect(buildPublicProfileTitle({
      name: 'Mary',
      city: 'Кашира',
      link: 'mary',
    })).toBe('Mary, Кашира — онлайн-запись | OnWaves');
  });

  it('does not copy a rubric onto a master who does not have one', () => {
    expect(buildPublicProfileTitle({
      name: 'Вика',
      city: 'Кашира',
      category: 'Маникюр',
      link: 'Victoria',
    })).toBe('Маникюр — Вика, Кашира | OnWaves');
    expect(buildPublicProfileTitle({
      name: 'Сантехник',
      city: 'Кашира',
      category: 'Сантехник',
      link: 'plumber',
    })).toBe('Сантехник, Кашира — онлайн-запись | OnWaves');
  });

  it('keeps a real master name when it is not the service H1', () => {
    expect(buildPublicProfileTitle({
      name: 'Алексей',
      link: 'cellings',
      workLocations: [location(['Ступино', 'Коломна'])],
    })).toBe('Натяжные потолки — мастер Алексей, Ступино и Коломна — OnWaves');
  });
});

describe('postalLocality', () => {
  it('keeps one city and a street address', () => {
    expect(postalLocality('Кашира', ['Кашира', 'Ступино'])).toBe('Кашира');
    expect(postalLocality('Кашира, Клубная, 15', ['Кашира'])).toBe('Кашира, Клубная, 15');
  });

  it('uses the first city when the address field is this master service area', () => {
    expect(postalLocality(
      'Кашира, Ступино, Озёры, Коломна, Домодедово',
      ['Кашира', 'Ступино', 'Озёры', 'Коломна', 'Домодедово'],
    )).toBe('Кашира');
  });
});

describe('buildPublicProfileDescription', () => {
  it('describes demo content without offering slots or booking', () => {
    const text = buildPublicProfileDescription({
      name: 'Катерина Агапова',
      city: 'Озёры',
      about: 'Я Екатерина, мастер депиляции и шугаринга в Озёрах.',
      isPromo: true,
    });
    expect(text).toContain('демо-страница: услуги, цены и работы мастера.');
    expect(text).not.toContain('запись');
    expect(text).not.toContain('свободное время');
    expect(text.length).toBeLessThanOrEqual(160);
  });

  it('does not offer measurement booking when the ceiling profile is a demo', () => {
    const text = buildPublicProfileDescription({ link: 'cellings', isPromo: true });
    expect(text).toContain('Онлайн-калькулятор сметы по прайсу мастера.');
    expect(text).not.toContain('запись');
  });

  it('preserves online booking for an active ordinary profile', () => {
    const text = buildPublicProfileDescription({ name: 'Mary', city: 'Кашира', isPromo: false });
    expect(text).toBe('Mary, Кашира — запись онлайн: свободное время, услуги и цены.');
  });

  it('sells calculation and free measurement, not the beauty catalog', () => {
    const text = buildPublicProfileDescription({
      name: '',
      link: 'cellings',
      workLocations: [],
    });
    expect(text).toContain('Кашира, Ступино, Озёры, Коломна и Домодедово');
    expect(text).toContain('калькулятор');
    expect(text).toContain('прайсу мастера');
    expect(text).toContain('бесплатный замер');
    expect(text).not.toContain('салоны');
    expect(text).not.toContain('в Кашира');
    expect(text.length).toBeGreaterThanOrEqual(120);
    expect(text.length).toBeLessThanOrEqual(160);
  });

  it('keeps the four-city live snippet inside description limits', () => {
    const text = buildPublicProfileDescription({
      name: '',
      link: 'cellings',
      city: 'Ступино',
      workLocations: [{
        locationType: WorkLocationType.Mobile,
        cities: ['Ступино', 'Кашира', 'Озёры', 'Коломна'],
      }],
    });
    expect(text).toContain('калькулятор');
    expect(text.length).toBeGreaterThanOrEqual(120);
    expect(text.length).toBeLessThanOrEqual(160);
  });
});

describe('publicProfileSeoFrom', () => {
  it('passes the promo flag to both tags and keeps the saved canonical slug', () => {
    const profile = Object.assign(new IViewBusinessProfile(), {
      name: 'Катерина Агапова',
      link: 'katerina_agapova',
      isPromo: true,
    });
    const seo = publicProfileSeoFrom(profile, [], '/Katerina_Agapova?utm_source=test');
    expect(seo.path).toBe('/katerina_agapova');
    expect(seo.title).toBe('Катерина Агапова — услуги и цены | OnWaves');
    expect(seo.description).toContain('демо-страница');
    expect(seo.description).not.toContain('запись');
  });
});
