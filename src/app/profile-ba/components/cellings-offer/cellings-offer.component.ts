import { AfterViewInit, Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, forkJoin, of } from 'rxjs';
import { catchError, map, switchMap, takeUntil } from 'rxjs/operators';
import { Service } from '../../../DTO/classes/services/Service';
import { Group } from '../../../DTO/views/services/IViewGroups';
import { IViewBusinessProfile } from '../../../DTO/views/business/IViewBussinessProfile';
import { IViewLanding } from '../../../DTO/views/landing/IViewLanding';
import { ILandingOffer } from '../../../DTO/views/landing/ILandingOffer';
import { IAlbumWithFoto } from '../../../DTO/views/images/IAlbumWithFoto';
import { IViewImage } from '../../../DTO/views/images/IViewImage';
import { TypeImage } from '../../../DTO/enums/typeImage';
import { PLACEHOLDER_AVATAR, resolveAvatarUrl } from '../../../../helpers/common/avatar1';
import { AnalyticsService } from 'src/services/analytics.service';
import { GroupService } from '../../../../services/groupservice';
import { LandingService } from '../../../../services/landing.service';
import { AlbumsService } from '../../../../services/albums.service';
import { ProfileDataService } from '../../services/profile-data.service';
import {
  bookingStepForService,
  displayOfferCities,
  formatCitiesLine,
  formatOfferPrice,
  pickCeilingsPriceFrom,
  pickMeasurementService,
  pickQuoteService,
  writeCellingsQuoteDraft,
} from '../../helpers/cellings-offer';

@Component({
  selector: 'app-cellings-offer',
  templateUrl: './cellings-offer.component.html',
  styleUrls: ['./cellings-offer.component.scss'],
  providers: [AlbumsService],
})
export class CellingsOfferComponent implements OnInit, AfterViewInit, OnDestroy {
  profile: IViewBusinessProfile | null = null;
  cities: string[] = [];
  coverUrl: string | null = null;
  priceText: string | null = null;
  quoteService: Service | null = null;
  measurementService: Service | null = null;
  slug = '';
  quoteInView = false;
  heroActionsInView = true;

  name = '';
  phone = '';
  city = '';
  area = '';
  nameTouched = false;
  phoneTouched = false;
  cityTouched = false;
  submitAttempted = false;

  private readonly destroy$ = new Subject<void>();
  private profileId: string | null = null;
  private extrasLoadedFor: string | null = null;
  private quoteObserver: IntersectionObserver | null = null;

  constructor(
    private readonly profileData: ProfileDataService,
    private readonly groupService: GroupService,
    private readonly landingService: LandingService,
    private readonly albums: AlbumsService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly analytics: AnalyticsService,
    @Inject(PLATFORM_ID) private readonly platformId: object,
  ) {}

  ngOnInit(): void {
    this.slug = (this.route.snapshot.paramMap.get('id') ?? '').trim();
    this.profileData.sendId.pipe(takeUntil(this.destroy$)).subscribe(id => {
      this.profileId = id;
      this.tryLoadExtras();
    });
    this.profileData.sendProfileBA.pipe(takeUntil(this.destroy$)).subscribe(profile => {
      this.profile = profile;
      if (profile?.link) {
        this.slug = profile.link.trim() || this.slug;
      }
      this.tryLoadExtras();
    });
    this.profileData.sendWorkLocation.pipe(takeUntil(this.destroy$)).subscribe(locations => {
      this.cities = displayOfferCities(locations ?? []);
      if (!this.city && this.cities.length) {
        this.city = this.cities[0];
      }
    });
  }

  ngAfterViewInit(): void {
    this.observeStickyAnchors();
  }

  ngOnDestroy(): void {
    this.quoteObserver?.disconnect();
    this.destroy$.next();
    this.destroy$.complete();
  }

  get avatarUrl(): string {
    return resolveAvatarUrl(this.profile?.avatarUrl);
  }

  get masterName(): string {
    return (this.profile?.name ?? '').trim();
  }

  get citiesLine(): string {
    return formatCitiesLine(this.cities);
  }

  get rating(): number | null {
    const value = this.profile?.rating;
    return typeof value === 'number' && value > 0 ? value : null;
  }

  get reviewsCount(): number | null {
    const value = this.profile?.countReviews;
    return typeof value === 'number' && value > 0 ? value : null;
  }

  get experienceText(): string {
    return (this.profile?.experienceText ?? '').trim();
  }

  get nameError(): string | null {
    const value = this.name.trim();
    const letters = value.match(/[A-Za-zА-Яа-яЁё]/g)?.length ?? 0;
    const ok = letters >= 2 && /^[A-Za-zА-Яа-яЁё]+(?:[ -][A-Za-zА-Яа-яЁё]+)*$/.test(value);
    return ok ? null : 'Введите имя — минимум две буквы';
  }

  get phoneError(): string | null {
    const digits = this.phone.replace(/\D/g, '');
    const ok = /^9\d{9}$/.test(digits) && !/^(\d)\1+$/.test(digits);
    return ok ? null : 'Введите российский мобильный номер';
  }

  get cityError(): string | null {
    return this.city.trim() ? null : 'Выберите город';
  }

  get formValid(): boolean {
    return !this.nameError && !this.phoneError && !this.cityError;
  }

  get showSticky(): boolean {
    return !this.heroActionsInView && !this.quoteInView;
  }

  onQuoteStart(event?: Event): void {
    event?.preventDefault();
    this.analytics.trackEvent('cellings', 'quote_start', this.profileId ?? undefined);
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const node = document.getElementById('quote');
    node?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  onMeasurementStart(event?: Event): void {
    event?.preventDefault();
    this.analytics.trackEvent('cellings', 'measurement_start', this.profileId ?? undefined);
    this.goToService(this.measurementService);
  }

  submitQuote(): void {
    this.submitAttempted = true;
    if (!this.formValid) {
      return;
    }
    const draft = {
      name: this.name.trim(),
      phone: this.phone.trim(),
      city: this.city.trim(),
      area: this.area.trim(),
    };
    if (isPlatformBrowser(this.platformId)) {
      writeCellingsQuoteDraft(draft);
    }
    this.analytics.trackEvent('cellings', 'quote_submit', this.profileId ?? undefined);
    this.goToService(this.quoteService);
  }

  selectCity(city: string): void {
    this.city = city;
    this.cityTouched = true;
  }

  onAvatarError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img.src.includes(PLACEHOLDER_AVATAR)) {
      return;
    }
    img.src = PLACEHOLDER_AVATAR;
  }

  onCoverError(): void {
    this.coverUrl = null;
  }

  private goToService(service: Service | null): void {
    const slug = this.slug || 'cellings';
    if (service) {
      this.profileData.transferChooseService([service]);
      this.profileData.transferDate(null);
    }
    const step = bookingStepForService(service);
    const extras = service?.id ? { queryParams: { serviceId: service.id } } : {};
    void this.router.navigate(['/', slug, step], extras);
  }

  /**
   * Лендинг API на этом профиле отвечает десятки секунд — не держим им цену
   * и обложку. Accordion тоже не ходит в getAllServices: without-group падает
   * отдельно и не должен обнулять прайс.
   */
  private tryLoadExtras(): void {
    if (!this.profileId || this.profileId === this.extrasLoadedFor) {
      return;
    }
    this.extrasLoadedFor = this.profileId;
    const id = this.profileId;

    this.loadServices(id).pipe(takeUntil(this.destroy$)).subscribe(services => {
      this.applyServices(services);
    });

    this.albums.getAlbums(id).pipe(
      catchError(() => of([] as IAlbumWithFoto[])),
      switchMap(albums => this.resolveAlbumCover(albums)),
      takeUntil(this.destroy$),
    ).subscribe(url => {
      if (url && !this.coverUrl) {
        this.coverUrl = url;
      }
    });

    this.landingService.getLanding(id).pipe(
      takeUntil(this.destroy$),
    ).subscribe(result => {
      const fromLanding = this.pickLandingCover(result.ok ? result.landing : null);
      if (fromLanding) {
        this.coverUrl = fromLanding;
      }
    });
  }

  private loadServices(id: string): Observable<Service[]> {
    return this.groupService.getGroupServices(id).pipe(
      catchError(() => of([] as Group[])),
      switchMap(groups => {
        const list = Array.isArray(groups) ? groups : [];
        const groupedReqs = list
          .filter(group => !!group.id)
          .map(group => this.groupService.getService(group.id!).pipe(
            catchError(() => of([] as Service[])),
          ));
        const without = this.groupService.getServiceWithout(id).pipe(
          catchError(() => of([] as Service[])),
        );
        return forkJoin({
          grouped: groupedReqs.length
            ? forkJoin(groupedReqs).pipe(map(parts => parts.flat()))
            : of([] as Service[]),
          without,
        }).pipe(map(({ grouped, without: rest }) => [...rest, ...grouped]));
      }),
    );
  }

  private resolveAlbumCover(albums: IAlbumWithFoto[]): Observable<string | null> {
    const direct = albums.find(item => typeof item.image === 'string' && item.image.trim())?.image;
    if (typeof direct === 'string' && direct.trim()) {
      return of(direct);
    }
    const firstId = albums[0]?.id;
    if (!firstId) {
      return of(null);
    }
    return this.albums.getImages(firstId).pipe(
      catchError(() => of([] as IViewImage[])),
      map(images => this.firstPhotoUrl(images)),
    );
  }

  private firstPhotoUrl(images: IViewImage[]): string | null {
    const photo = (images ?? []).find(item =>
      !!item?.url
      && item.typeImage !== TypeImage.MP4
    );
    return photo?.url ?? null;
  }

  private applyServices(services: Service[]): void {
    this.quoteService = pickQuoteService(services);
    this.measurementService = pickMeasurementService(services);
    this.priceText = formatOfferPrice(pickCeilingsPriceFrom(services));
  }

  private pickLandingCover(landing: IViewLanding | null): string | null {
    const offers = (landing?.offers ?? [])
      .filter((item: ILandingOffer) => item.isActive)
      .sort((a, b) => a.sortOrder - b.sortOrder);
    for (const offer of offers) {
      if (offer.imageUrl) {
        return offer.imageUrl;
      }
      const extra = (offer.galleryUrls ?? []).find(url => !!url);
      if (extra) {
        return extra;
      }
    }
    return null;
  }

  private observeStickyAnchors(): void {
    if (!isPlatformBrowser(this.platformId) || typeof IntersectionObserver === 'undefined') {
      return;
    }
    const host = document.querySelector('app-cellings-offer') as HTMLElement | null;
    const quote = host?.querySelector('#quote') as HTMLElement | null;
    const actions = host?.querySelector('.co-actions') as HTMLElement | null;
    if (!quote && !actions) {
      return;
    }
    const visible = (node: HTMLElement | null) => {
      if (!node) {
        return false;
      }
      const rect = node.getBoundingClientRect();
      return rect.top < window.innerHeight - 24 && rect.bottom > 24;
    };
    const sync = () => {
      this.quoteInView = visible(quote);
      this.heroActionsInView = visible(actions);
    };
    sync();
    this.quoteObserver = new IntersectionObserver(() => sync(), {
      threshold: [0, 0.15, 0.4],
    });
    if (quote) {
      this.quoteObserver.observe(quote);
    }
    if (actions) {
      this.quoteObserver.observe(actions);
    }
  }
}
