import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, catchError, distinctUntilChanged, exhaustMap, filter, forkJoin, map, of, shareReplay, startWith, switchMap } from 'rxjs';
import { environment } from 'src/enviroments/environment';
import { IViewImage } from 'src/app/DTO/views/images/IViewImage';
import { IViewPost } from 'src/app/DTO/views/posts/IViewPost';
import { IResponse } from 'src/app/DTO/classes/IResponse';
import { IViewLanding } from 'src/app/DTO/views/landing/IViewLanding';
import { WelcomeOffer } from 'src/app/DTO/views/promo/welcome-coupon';
import { Service } from 'src/app/DTO/classes/services/Service';
import { Group } from 'src/app/DTO/views/services/IViewGroups';
import { TypeImage } from 'src/app/DTO/enums/typeImage';
import { displayPriceUnit, isPriceBoundSet } from 'src/helpers/common/price.helpers';
import { resolveAvatarUrl } from 'src/helpers/common/avatar1';
import {
  HOME_CARD_DETAILS, HOME_FEED_STOP_WORDS, HomeGroup,
} from 'src/app/pages/home/home-showcase.config';

export interface HomeMaster {
  id: string;
  link: string;
  group: HomeGroup;
  title: string;
  /** Имя человека или название профиля — для подписи в примере записи. */
  name: string;
  /** «Лиана · Центральная, 5» или список городов выезда. */
  subtitle: string;
  /** Короткая метка города на плашке карточки. */
  place: string;
  tags: string[];
  avatar: string | null;
  initial: string;
  feedAlbums?: string[];
  priceText?: string;
  showPromo: boolean;
  hasCardDetails: boolean;
  bookingEnabled: boolean;
}

export interface HomePrice {
  /** «от 700 ₽», «2 500 ₽», «от 900 ₽/м²». */
  text: string;
  value: number;
}

export interface HomeMastersLoad {
  kind: 'loading' | 'loaded' | 'error';
  masters: HomeMaster[];
}

interface HomeProfile {
  id: string;
  link: string | null;
  name: string | null;
  city: string | null;
  address: string | null;
  avatarUrl: string | null;
  group: HomeGroup;
  category: string | null;
  bookingEnabled: boolean;
}

interface HomeProfilePage {
  items: HomeProfile[];
  nextCursor: string | null;
}

interface HomeProfilesLoad {
  profiles: HomeProfile[];
  failed: boolean;
  cursor: string | null;
}

/** Что сейчас действует у мастера: приветственный купон Onwaves и акция с его промо-страницы. */
export interface HomePerks {
  coupon: { text: string; hint: string; until: Date | null } | null;
  promo: { badge: string; title: string; until: Date | null } | null;
}

export type HomeFeedKind = 'video' | 'photo' | 'post';

export interface HomeFeedItem {
  id: string;
  kind: HomeFeedKind;
  date: Date;
  text: string;
  media: string | null;
  poster: string | null;
  master: HomeMaster;
}

interface AlbumView {
  id: string;
  name: string;
  dateCreated: string;
  countImages: number;
}

/**
 * Главная читает публичные карточки с сервера. Цены и медиа редакторской подборки
 * загружаются отдельно в браузере. Экземпляр сервиса живёт на странице главной.
 */
@Injectable({ providedIn: 'root' })
export class HomeShowcaseService {
  private readonly api = environment.Uri;
  private mastersLoad$?: Observable<HomeMastersLoad>;
  private readonly reloadMasters$ = new Subject<void>();
  private readonly prices = new Map<string, Observable<HomePrice | null>>();
  private feed$?: Observable<HomeFeedItem[]>;
  private feedMastersKey?: string;
  private readonly perks = new Map<string, Observable<HomePerks>>();

  constructor(private http: HttpClient) {}

  getMasters(): Observable<HomeMaster[]> {
    return this.getMastersLoad().pipe(
      filter(load => load.kind !== 'loading'),
      map(load => load.masters),
      distinctUntilChanged(),
    );
  }

  getMastersLoad(): Observable<HomeMastersLoad> {
    if (!this.mastersLoad$) {
      const loading: HomeMastersLoad = { kind: 'loading', masters: [] };
      let progress: HomeProfilesLoad = { profiles: [], failed: false, cursor: null };
      this.mastersLoad$ = this.reloadMasters$.pipe(
        startWith(undefined),
        exhaustMap(() => this.loadProfiles(progress.failed ? progress.cursor : null, progress.failed ? progress.profiles : []).pipe(
          map((result): HomeMastersLoad => {
            progress = result;
            return { kind: result.failed ? 'error' : 'loaded', masters: result.profiles.map(profile => this.toMaster(profile)) };
          }),
          startWith({ ...loading, masters: progress.profiles.map(profile => this.toMaster(profile)) }),
        )),
        shareReplay({ bufferSize: 1, refCount: true }),
      );
    }
    return this.mastersLoad$;
  }

  retryMasters(): void {
    this.reloadMasters$.next();
  }

  private loadProfiles(cursor: string | null, loaded: HomeProfile[]): Observable<HomeProfilesLoad> {
    return this.http.get<HomeProfilePage>(`${this.api}profiles/home-masters`, {
      params: cursor ? { after: cursor } : {},
    }).pipe(
      // Ошибка отличается от пустой страницы; предыдущие страницы сохраняем.
      catchError(() => of(null)),
      switchMap(page => {
        if (!page || !Array.isArray(page.items) || (page.nextCursor && (!page.items.length || (cursor && page.nextCursor <= cursor)))) {
          return of({ profiles: loaded, failed: true, cursor });
        }
        const byId = new Map(loaded.map(profile => [profile.id, profile]));
        for (const profile of page.items) {
          if (profile.id) byId.set(profile.id, profile);
        }
        const profiles = [...byId.values()];
        return page.nextCursor ? this.loadProfiles(page.nextCursor, profiles) : of({ profiles, failed: false, cursor: null });
      }),
    );
  }

  /** Минимальная цена по прайсу мастера. null — прайс пустой или не загрузился. */
  getMinPrice(profileId: string, fixed?: string): Observable<HomePrice | null> {
    if (fixed) {
      return of({ text: fixed, value: 0 });
    }
    let cached = this.prices.get(profileId);
    if (!cached) {
      cached = forkJoin({
        loose: this.http.get<Service[]>(`${this.api}services/without-group/${profileId}`)
          .pipe(catchError(() => of([] as Service[]))),
        groups: this.http.get<Group[]>(`${this.api}services/groups/${profileId}`)
          .pipe(catchError(() => of([] as Group[]))),
      }).pipe(
        switchMap(({ loose, groups }) => {
          const inGroups = (groups ?? []).filter(g => !!g.id).map(g =>
            this.http.get<Service[]>(`${this.api}services/get-by-group/${g.id}`)
              .pipe(catchError(() => of([] as Service[]))));
          return inGroups.length
            ? forkJoin(inGroups).pipe(map(parts => [...(loose ?? []), ...parts.flat()]))
            : of(loose ?? []);
        }),
        map(services => this.minPrice(services)),
        catchError(() => of(null)),
        shareReplay({ bufferSize: 1, refCount: false })
      );
      this.prices.set(profileId, cached);
    }
    return cached;
  }

  /**
   * Купон и акция для карточки. Купон показываем, только если мастер участвует
   * в кампании (`masterParticipates`): активная кампания сама по себе не значит,
   * что у этого мастера скидка применится. Ошибка сети — «ничего нет»: лучше
   * не показать бейдж, чем пообещать скидку, которой при записи не будет.
   */
  getPerks(master: HomeMaster): Observable<HomePerks> {
    let cached = this.perks.get(master.id);
    if (!cached) {
      const none: HomePerks = { coupon: null, promo: null };
      cached = forkJoin({
        offer: this.http.get<WelcomeOffer>(`${this.api}coupons/welcome/offer`, { params: { masterId: master.id } })
          .pipe(catchError(() => of(null))),
        landing: master.showPromo
          ? this.http.get<IResponse>(`${this.api}landing/${master.id}`).pipe(catchError(() => of(null)))
          : of(null),
      }).pipe(
        map(({ offer, landing }) => ({
          coupon: this.couponOf(offer),
          promo: landing?.code === 200 ? this.promoOf(landing.data as IViewLanding) : null,
        })),
        catchError(() => of(none)),
        shareReplay({ bufferSize: 1, refCount: false })
      );
      this.perks.set(master.id, cached);
    }
    return cached;
  }

  private couponOf(offer: WelcomeOffer | null): HomePerks['coupon'] {
    const c = offer?.campaign;
    if (!offer?.active || !offer.masterParticipates || !c) return null;
    const until = c.endsAt ? new Date(c.endsAt) : null;
    if (until && until.getTime() < Date.now()) return null;
    if (c.amountMode === 'fixed' && (c.fixedDiscountRub ?? 0) > 0) {
      const rub = Math.round(c.fixedDiscountRub!).toLocaleString('ru-RU').replace(/\u00a0/g, ' ');
      return {
        text: `Купон ${rub}\u00a0₽`,
        hint: c.offerText?.trim() || `${c.title}: ${rub} ₽ на первую запись`,
        until,
      };
    }
    if (!c.tiers?.length) return null;
    const max = Math.max(...c.tiers.map(t => Number(t.discount) || 0));
    if (!max) return null;
    return {
      text: `Купон до ${max.toLocaleString('ru-RU').replace(/\u00a0/g, ' ')}\u00a0₽`,
      hint: `${c.title}: ${c.tiers.map(t => t.text).join('; ')}`,
      until,
    };
  }

  private promoOf(landing: IViewLanding | null): HomePerks['promo'] {
    if (!landing?.isActive) return null;
    const now = Date.now();
    const offer = (landing.offers ?? [])
      .filter(o => o.isActive
        && (!o.validFrom || new Date(o.validFrom).getTime() <= now)
        && (!o.validTo || new Date(o.validTo).getTime() >= now)
        && !HOME_FEED_STOP_WORDS.test(`${o.title} ${o.description ?? ''}`))
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))[0];
    if (!offer?.title) return null;
    return {
      badge: (offer.badge || landing.promoBadgeText || 'Акция').trim(),
      title: offer.title.trim(),
      until: offer.validTo ? new Date(offer.validTo) : null,
    };
  }

  /** Лента: посты и работы из портфолио подборки, свежие сверху. */
  getFeed(masters: HomeMaster[]): Observable<HomeFeedItem[]> {
    masters = masters.filter(master => master.hasCardDetails);
    const mastersKey = masters.map(master => master.id).join(',');
    if (!this.feed$ || this.feedMastersKey !== mastersKey) {
      this.feedMastersKey = mastersKey;
      const perMaster = masters.map(m => forkJoin({
        posts: this.http.get<IViewPost[]>(`${this.api}posts/posts-profile/${m.id}?start=0&slice=20`)
          .pipe(catchError(() => of([] as IViewPost[]))),
        media: this.albumMedia(m),
      }).pipe(map(({ posts, media }) => [...this.postItems(posts ?? [], m), ...media])));

      this.feed$ = (perMaster.length ? forkJoin(perMaster) : of([] as HomeFeedItem[][])).pipe(
        map(parts => parts.flat()
          .filter(item => !HOME_FEED_STOP_WORDS.test(item.text))
          .sort((a, b) => b.date.getTime() - a.date.getTime())),
        catchError(() => of([] as HomeFeedItem[])),
        shareReplay({ bufferSize: 1, refCount: false })
      );
    }
    return this.feed$;
  }

  private toMaster(p: HomeProfile): HomeMaster {
    const slug = p.link?.trim();
    const link = slug && !/[\/:?#\s]/.test(slug) ? slug : p.id;
    const cfg = HOME_CARD_DETAILS.find(item => item.link.toLowerCase() === slug?.toLowerCase());
    const title = p.name?.trim() || 'Мастер OnWaves';

    return {
      id: p.id,
      link,
      group: p.group,
      title,
      name: title,
      subtitle: [p.category || cfg?.title, p.address].filter(Boolean).join(' · '),
      place: p.city || '',
      tags: cfg?.tags ?? [],
      avatar: p.avatarUrl ? resolveAvatarUrl(p.avatarUrl) : null,
      initial: title.charAt(0).toUpperCase(),
      feedAlbums: cfg?.feedAlbums,
      priceText: cfg?.priceText,
      showPromo: !!cfg && cfg.showPromo !== false,
      hasCardDetails: !!cfg,
      bookingEnabled: p.bookingEnabled === true,
    };
  }

  private minPrice(services: Service[]): HomePrice | null {
    let best: { value: number; unit: string } | null = null;
    let count = 0;
    let hasRange = false;
    for (const s of services) {
      const p = s?.price;
      if (!p) continue;
      // У диапазона цена — нижняя граница; поле price там бывает мусорным (встречается «1»).
      const value = p.isRange
        ? (isPriceBoundSet(p.startRange) ? Number(p.startRange) : 0)
        : (isPriceBoundSet(p.price) ? Number(p.price) : 0);
      if (!value) continue;
      count++;
      hasRange = hasRange || !!p.isRange;
      if (!best || value < best.value) {
        best = { value, unit: displayPriceUnit(p, s.paymentForType) };
      }
    }
    if (!best) return null;
    const amount = best.value.toLocaleString('ru-RU').replace(/ /g, ' ');
    const unit = best.unit ? `/${best.unit}` : '';
    const from = count > 1 || hasRange ? 'от ' : '';
    return { value: best.value, text: `${from}${amount} ₽${unit}` };
  }

  private albumMedia(m: HomeMaster): Observable<HomeFeedItem[]> {
    return this.http.get<AlbumView[]>(`${this.api}albums/${m.id}`).pipe(
      map(albums => (albums ?? []).filter(a => a.countImages > 0
        && (!m.feedAlbums || m.feedAlbums.includes(a.name)))),
      switchMap(albums => albums.length
        ? forkJoin(albums.map(a => this.http.get<IViewImage[]>(`${this.api}albums/image/${a.id}`)
          .pipe(catchError(() => of([] as IViewImage[])))))
        : of([] as IViewImage[][])),
      map(groups => groups.flat().map(img => this.imageItem(img, m)).filter((x): x is HomeFeedItem => !!x)),
      catchError(() => of([] as HomeFeedItem[]))
    );
  }

  private imageItem(img: IViewImage, m: HomeMaster): HomeFeedItem | null {
    if (!img?.url) return null;
    const isVideo = Number(img.typeImage) === TypeImage.MP4;
    return {
      id: img.id,
      kind: isVideo ? 'video' : 'photo',
      date: new Date(img.dateCreated),
      text: cleanText(img.description),
      media: isVideo ? img.url : (img.thumbUrl || img.url),
      poster: isVideo ? (img.thumbUrl || null) : null,
      master: m,
    };
  }

  private postItems(posts: IViewPost[], m: HomeMaster): HomeFeedItem[] {
    return posts
      .filter(p => !p.parentId && !!(p.text || p.title))
      .map(p => {
        const img = p.images;
        const isVideo = !!img && Number(img.typeImage) === TypeImage.MP4;
        return {
          id: String(p.id),
          kind: img ? (isVideo ? 'video' : 'photo') : 'post',
          date: new Date(p.dateCreated),
          text: cleanText([p.title, p.text].filter(Boolean).join('. ')),
          media: img ? (isVideo ? img.url : (img.thumbUrl || img.url)) : null,
          poster: isVideo ? (img?.thumbUrl || null) : null,
          master: m,
        } as HomeFeedItem;
      });
  }
}

/** Подписи мастера приходят с markdown-звёздочками и \r\n — в ленте нужен чистый текст. */
function cleanText(raw?: string | null): string {
  return (raw ?? '')
    .replace(/\*\*/g, '')
    .replace(/\r/g, '')
    .replace(/\n{2,}/g, '\n')
    .trim();
}
