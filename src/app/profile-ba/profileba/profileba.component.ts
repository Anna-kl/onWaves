import {Component, Inject, Optional, OnDestroy, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {RESPONSE} from '@nguniversal/express-engine/tokens';
import type {Response} from 'express';
import {SeoService} from 'src/services/seo.service';
import {isPlatformBrowser} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';

import { GroupService } from '../../../services/groupservice';
// import { Service } from '../../services/servicein';
import { Group } from '../../DTO/views/services/IViewGroups';
import { subGroup } from '../../DTO/views/services/IViewSubGroups';

import {ScheduleService} from "../../../services/schedule.service";
import {distinctUntilChanged, Subject, switchMap, take, takeUntil, tap} from "rxjs";
import {DictionaryService} from "../../../services/dictionary.service";

import {ProfileDataService} from "../services/profile-data.service";
import { PublicProfileResolved } from '../public-profile.resolver';
import { publicProfileSeoFrom } from '../helpers/public-profile-seo';
import { IViewLanding } from '../../DTO/views/landing/IViewLanding';
import { IWorkLocation } from '../../DTO/views/IWorkLocation';
import { LandingState, resolveLandingState } from '../helpers/landing-state';
import { resolveAvatarUrl } from '../../../helpers/common/avatar1';


import {ProfileService} from "../../../services/profile.service";


import { Meta, Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { getProfileMainClient, selectProfileMainClient } from 'src/app/ngrx-store/mainClient/store.select';
import { IViewBusinessProfile } from 'src/app/DTO/views/business/IViewBussinessProfile';
import { DeviceDetectorService } from 'ngx-device-detector';



interface GroupWithSubGroups {
  isOpen: boolean;
  group: Group;
  subGroups: subGroup[];
}

declare var DG: any;
declare var DGWidgetLoader: any;
declare const ymaps: any;
@Component({
  selector: 'app-profileba',
  templateUrl: './profileba.component.html',
  styleUrls: ['./profileba.component.css'],
  providers:[GroupService, ScheduleService, DictionaryService ]

})
export class ProfileBAComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  map: any;
  @ViewChild('yamaps')

  companyId: string | undefined;
  subGroups: subGroup[] = [];
  index: any;
  number: any;
 // businessProfile!: ICardBusinessView;
  scheduleToday: string | undefined = '';
  id: string | null = null;
  isLoad = false;
  isHandset = false;
  /** Ссылка не разрезолвилась: профиля нет или он заблокирован (бэк 2026-07-29). */
  notFound = false;
  /** Публичный slug из URL — для пилота потолков, не GUID. */
  offerSlug: string | null = null;
  private profileLink: string | null = null;
  landing: IViewLanding | null = null;
  landingState: LandingState = 'loading';
  workLocations: IWorkLocation[] = [];

  constructor(private route: ActivatedRoute,
              private _api: ProfileService,
              private _meta: Meta,
              private _store: Store,
              private _profileData: ProfileDataService,
              private _router: Router,
              private _deviceService: DeviceDetectorService,
              private _seo: SeoService,
              @Optional() @Inject(RESPONSE) private _response: Response | null,
              @Inject(PLATFORM_ID) private platformId: object)
  {
    this.isHandset = this._deviceService.isMobile() || this._deviceService.isTablet();
  }
  btnProfile: boolean = true;

  setLenta() {
    this.btnProfile = false;
    this._router.navigate([`id/${this.id}/lenta`]);
  }

  setProfile() {
    this.btnProfile = true;
    this._router.navigate([`id/${this.id}`]);
  }

  private createMap(lat: number, lng: number): void {
    if (this.map){
      this.map.panTo([lat, lng], {
        flying: true
      });
    } else {
      this.map = new ymaps.Map('map', {
        center: [lat, lng],
        zoom: 14
      });
    }
    const placeMark = new ymaps.Placemark([lat, lng]);
    this.map.geoObjects.add(placeMark);
  }

  // onAddress($event: IViewAddress){
  //   this._dictionaries.getPoint(getAddressProfile($event)).subscribe(
  //     response => {
  //       ymaps.ready().done(() => this.createMap(response[1], response[0]));
  //     }
  //   );
  // }
  ngOnInit() {
    // Профиль уже в data роута: резолвер дождался translate-link + get-full-baprofile.
    // Раньше id приходил асинхронно в ngOnInit, а колонка стартовала HTTP только
    // в следующем ngOnChanges — Universal к тому моменту уже сериализовал пустую оболочку.
    this.applyResolved(this.route.snapshot.data['publicProfile'] as PublicProfileResolved | undefined);
    this.route.data.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.applyResolved(data['publicProfile'] as PublicProfileResolved | undefined);
    });
  }

  private applyResolved(resolved: PublicProfileResolved | undefined): void {
    this.offerSlug = this.route.snapshot.paramMap.get('id');
    this.profileLink = null;
    this.notFound = false;
    if (!resolved) {
      return;
    }
    if (resolved.notFound) {
      this.handleProfileNotFound();
      return;
    }

    this.id = resolved.id ?? null;
    if (!this.id) {
      if (resolved.unavailable) {
        this.handleProfileError({ status: 500 });
      } else {
        this.handleProfileNotFound();
      }
      return;
    }

    this._profileData.transferId(this.id);
    // Сначала локации: JSON-LD в page-user-ba читает workLocations в том же тике,
    // что и sendProfileBA.
    this.workLocations = resolved.workLocations ?? [];
    this._profileData.transferWorkLocation(this.workLocations);
    this.applyLanding(resolved);
    if (resolved.profile) {
      this.profileLink = resolved.profile.link ?? null;
      this._profileData.transferProfileBA(resolved.profile);
      this.applyPublicSeo(resolved.profile, this.workLocations);
    } else if (resolved.unavailable) {
      this.handleProfileError({ status: 500 });
    }

    this.loadSeoKeywords(this.id);
    this.trackVisit(this.id);
  }

    /**
     * Разбирает отказ `translate-link`, различая «карточки нет» и «бэк не ответил».
     *
     * Разница принципиальная. 404 — страницы действительно нет, её надо убрать
     * из индекса. Таймаут или 500 — временная авария, и если на неё отвечать
     * тем же 404 с noindex, то при получасовой недоступности API поисковик
     * выкинет из индекса ВСЕ живые карточки разом. Восстанавливаться из этого
     * потом месяцами, поэтому по умолчанию считаем ошибку временной.
     */
    private handleProfileError(err: unknown): void {
      const status = (err as { status?: number } | null)?.status;
      if (status === 404) {
        this.handleProfileNotFound();
        return;
      }
      // Временная ошибка: ничего не трогаем — ни статус, ни robots. Страница
      // отдаётся как обычно, робот придёт снова.
      console.error('[profile] не удалось разрезолвить ссылку, статус:', status);
    }

    /**
     * Ссылка не разрезолвилась — карточки нет (удалена или заблокирована).
     *
     * До этой правки страница всё равно отдавалась с кодом 200 и рисовала
     * пустой каркас профиля. Для поисковика это soft 404: адрес продолжает
     * висеть в индексе как тонкий контент, потому что 200 означает «страница
     * есть». Отдаём честный 404 на сервере и noindex — тогда адрес из индекса
     * уходит. Бэк с 2026-07-29 отдаёт 404 на заблокированные профили, так что
     * этот путь стал рабочим, а не теоретическим.
     */
    private handleProfileNotFound(): void {
      this.notFound = true;
      this._seo.update(this._router.url, {
        title: 'Страница не найдена | OnWaves',
        description: 'Такой карточки нет — возможно, мастер удалил её или сменил адрес страницы.',
        noindex: true,
      });
      // RESPONSE есть только при серверном рендере; в браузере статус уже отдан.
      this._response?.status(404);
    }

    /**
     * Акция уже в резолвере: состояние синхронно, без второго GET и без
     * skeleton в первом HTML. Отказ транспорта — `failed`, не `absent`.
     */
    private applyLanding(resolved: PublicProfileResolved): void {
      if (resolved.landingFailed) {
        this.landing = null;
        this.landingState = 'failed';
        return;
      }
      this.landing = resolved.landing ?? null;
      this.landingState = resolveLandingState({ ok: true, landing: this.landing });
    }

    /**
     * Title/OG из родителя, не из дочернего outlet: иначе при сбое подписки
     * в page-user-ba в HTML остаётся каталожный title из index.html.
     */
    private applyPublicSeo(profile: IViewBusinessProfile, locations: IWorkLocation[]): void {
      const fallback = this.offerSlug ? `/${this.offerSlug}` : this._router.url;
      const seo = publicProfileSeoFrom(profile, locations, fallback);
      this._seo.update(seo.path, {
        title: seo.title,
        description: seo.description,
        ogType: 'profile',
        image: profile.avatarUrl && profile.id
          ? resolveAvatarUrl(profile.avatarUrl)
          : undefined,
      });
    }

    /** SEO-keywords в <meta>. На отрисовку не влияет — грузим отдельно. */
    private loadSeoKeywords(id: string): void {
      this._api.getMainTags(id).pipe(takeUntil(this.destroy$)).subscribe({
        next: tags => this._meta.updateTag({ name: 'keywords', content: tags.join('|') }),
        error: () => {},
      });
    }

    /**
     * Счётчик посещения профиля. Визит отправляет браузер: SSR-запросы поисковиков
     * не должны считаться посещениями и задерживать отдачу HTML.
     */
    private trackVisit(id: string): void {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }
      this._store.select(selectProfileMainClient).pipe(
        distinctUntilChanged((a, b) => (a?.id || null) === (b?.id || null)),
        take(1),
        tap(user => this.isLoad = user === null),
        switchMap(user => this._api.sendWhoisVisit(id, 'visit_profile', user?.id ?? null)),
        takeUntil(this.destroy$),
      ).subscribe({
        // Опциональная аналитика не должна ломать отрисовку профиля.
        error: () => {},
      });


    }
    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }

    onActivate($event: any) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }

}


