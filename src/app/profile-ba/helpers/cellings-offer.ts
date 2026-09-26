import { Service } from '../../DTO/classes/services/Service';
import { IWorkLocation } from '../../DTO/views/IWorkLocation';
import { isPriceBoundSet } from '../../../helpers/common/price.helpers';

/** Публичный slug пилота потолков. Не переименовывать — это URL в Директе. */
export const CELLINGS_OFFER_SLUG = 'cellings';

export const CELLINGS_QUOTE_STORAGE_KEY = 'cellings-quote';

/** Города из объявления: фолбэк, если в кабинете зона ещё не заполнена. */
export const CELLINGS_FALLBACK_CITIES = [
  'Кашира', 'Ступино', 'Озёры', 'Коломна', 'Домодедово',
];

/** Первый экран /cellings: текст для бота и человека, не title акции. */
export const CELLINGS_HERO_H1 = 'Сколько будет стоить ваш натяжной потолок?';
export const CELLINGS_HERO_LEAD =
  'Укажите параметры помещений, выберите полотно и свет. Получите предварительную смету по прайсу мастера.';
export const CELLINGS_CALC_BUTTON = 'Рассчитать стоимость';
export const CELLINGS_MEASURE_BUTTON = 'Бесплатный замер';

/** Видимый блок под героем: запрос «калькулятор натяжного потолка» без второго URL. */
export const CELLINGS_CALC_SEO_H2 = 'Калькулятор натяжного потолка';
export const CELLINGS_CALC_SEO_LEAD =
  'Смета считается по прайсу этого мастера: площадь, полотно, свет и особенности помещения. Это не запись — после расчёта можно выбрать день бесплатного замера.';

export interface CellingsCalculatorFaqItem {
  q: string;
  a: string;
}

/** Вопросы, которые реально отвечают продукт. Не обещать «смету за 2 минуты». */
export function cellingsCalculatorFaq(cities: string[]): CellingsCalculatorFaqItem[] {
  const geo = formatCitiesTitle(cities.length ? cities : CELLINGS_FALLBACK_CITIES);
  return [
    {
      q: 'Как калькулятор считает стоимость?',
      a: 'Калькулятор идёт по прайсу этого мастера. Смету считает сервер: площадь, полотно, свет и особенности помещения. На сайте нет своей арифметики.',
    },
    {
      q: 'Расчёт — это уже запись?',
      a: 'Нет. После сметы можно выбрать день бесплатного замера. Мастер подтвердит время и назовёт точную сумму на объекте.',
    },
    {
      q: 'В каких городах считается потолок?',
      a: `${geo}. Выезд на замер — в зоне мастера.`,
    },
  ];
}

export interface CellingsQuoteDraft {
  name: string;
  phone: string;
  city: string;
  area: string;
}

export function isCellingsOfferSlug(link: string | null | undefined): boolean {
  const value = (link ?? '').trim().toLowerCase();
  if (!value) {
    return false;
  }
  const segment = value.replace(/^https?:\/\//, '').split('/')[0];
  return segment === CELLINGS_OFFER_SLUG;
}

export function normalizeServiceName(name: string | null | undefined): string {
  return (name ?? '').toLowerCase().replace(/ё/g, 'е');
}

function isMeasurementName(name: string): boolean {
  return /замер/.test(name);
}

function isQuoteName(name: string): boolean {
  return /расчет|консультац/.test(name);
}

export function pickMeasurementService(services: Service[]): Service | null {
  return services.find(item => isMeasurementName(normalizeServiceName(item.name))) ?? null;
}

/** Расчёт, иначе замер — чтобы primary не вёл в пустоту. */
export function pickQuoteService(services: Service[]): Service | null {
  return services.find(item => isQuoteName(normalizeServiceName(item.name)))
    ?? pickMeasurementService(services);
}

export function bookingStepForService(service: Service | null): 'confirm-record' | 'choose-date' | 'choose-service' {
  if (!service?.id) {
    return 'choose-service';
  }
  return service.isTimeUnlimited ? 'confirm-record' : 'choose-date';
}

/**
 * «От» по прайсу потолков. Замер и консультацию не берём — там часто 0 ₽.
 */
export function pickCeilingsPriceFrom(services: Service[]): { amount: number; perSquare: boolean } | null {
  let min: number | null = null;
  let perSquare = false;
  for (const item of services) {
    const name = normalizeServiceName(item.name);
    if (isMeasurementName(name) || isQuoteName(name)) {
      continue;
    }
    if (/светильник|подсветк|спот|люстр|карниз/.test(name)) {
      continue;
    }
    const price = item.price;
    if (!price) {
      continue;
    }
    const raw = price.isRange ? price.startRange : price.price;
    if (!isPriceBoundSet(raw)) {
      continue;
    }
    const amount = Number(raw);
    const bySquare = /м2|м²|кв/.test(name);
    if (amount < (bySquare ? 200 : 300)) {
      continue;
    }
    if (min == null || amount < min) {
      min = amount;
      perSquare = bySquare;
    }
  }
  return min == null ? null : { amount: min, perSquare };
}

export function formatOfferPrice(price: { amount: number; perSquare: boolean } | null): string | null {
  if (!price) {
    return null;
  }
  const amount = price.amount.toLocaleString('ru-RU');
  return price.perSquare ? `от ${amount} ₽/м²` : `от ${amount} ₽`;
}

export function citiesFromWorkLocations(locations: IWorkLocation[]): string[] {
  const seen = new Set<string>();
  const cities: string[] = [];
  for (const location of locations ?? []) {
    for (const city of location.cities ?? []) {
      const name = (city ?? '').trim();
      if (!name) {
        continue;
      }
      const key = name.toLowerCase();
      if (seen.has(key)) {
        continue;
      }
      seen.add(key);
      cities.push(name);
    }
    const single = (location.city ?? '').trim();
    if (single) {
      const key = single.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        cities.push(single);
      }
    }
  }
  return cities;
}

export function displayOfferCities(locations: IWorkLocation[]): string[] {
  const cities = citiesFromWorkLocations(locations);
  return cities.length ? cities : CELLINGS_FALLBACK_CITIES;
}

export function formatCitiesLine(cities: string[]): string {
  return cities.join(' · ');
}

export function formatCitiesTitle(cities: string[]): string {
  if (cities.length <= 1) {
    return cities[0] ?? '';
  }
  const head = cities.slice(0, -1).join(', ');
  return `${head} и ${cities[cities.length - 1]}`;
}

/** Имя карточки, если это не дубль H1 «Натяжные потолки». */
export function cellingsMasterLabel(name: string | null | undefined): string {
  const value = (name ?? '').trim();
  if (!value || /натяжн/i.test(value)) {
    return '';
  }
  return value;
}

export function readCellingsQuoteDraft(): CellingsQuoteDraft | null {
  try {
    if (typeof sessionStorage === 'undefined') {
      return null;
    }
    const raw = sessionStorage.getItem(CELLINGS_QUOTE_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as Partial<CellingsQuoteDraft>;
    return {
      name: (parsed.name ?? '').trim(),
      phone: (parsed.phone ?? '').trim(),
      city: (parsed.city ?? '').trim(),
      area: (parsed.area ?? '').trim(),
    };
  } catch {
    return null;
  }
}

export function writeCellingsQuoteDraft(draft: CellingsQuoteDraft): void {
  if (typeof sessionStorage === 'undefined') {
    return;
  }
  sessionStorage.setItem(CELLINGS_QUOTE_STORAGE_KEY, JSON.stringify(draft));
}

export function quoteDraftComment(draft: CellingsQuoteDraft | null): string {
  if (!draft) {
    return '';
  }
  return [
    draft.city ? `Город: ${draft.city}` : '',
    draft.area ? `Площадь: ${draft.area} м²` : '',
    'Заявка с расчёта на странице потолков',
  ].filter(Boolean).join('. ');
}
