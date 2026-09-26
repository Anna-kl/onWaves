import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { IResponse } from '../DTO/classes/IResponse';
import { IViewBusinessProfile } from '../DTO/views/business/IViewBussinessProfile';
import { IViewLanding } from '../DTO/views/landing/IViewLanding';
import { IWorkLocation } from '../DTO/views/IWorkLocation';
import { ProfileService } from 'src/services/profile.service';
import { LandingService } from 'src/services/landing.service';
import { SeoService } from 'src/services/seo.service';
import { resolveAvatarUrl } from '../../helpers/common/avatar1';
import { publicProfileSeoFrom } from './helpers/public-profile-seo';
import { LandingLoadResult } from './helpers/landing-state';

export interface PublicProfileResolved {
  id?: string;
  profile?: IViewBusinessProfile | null;
  workLocations?: IWorkLocation[];
  landing?: IViewLanding | null;
  /** Транспорт/5xx акции: не путать с «акции нет». */
  landingFailed?: boolean;
  /** Карточки нет — честный 404 + noindex. */
  notFound?: boolean;
  /** Апстрим не ответил: не помечаем 404, чтобы не выкинуть живые URL из индекса. */
  unavailable?: boolean;
}

/**
 * Критический путь публичной карточки до активации роута.
 *
 * Без резолвера SSR успевал отдать оболочку после translate-link: id попадал
 * в дочерний column только на следующем CD, а к тому моменту zone уже
 * «стабильна» и Universal сериализует HTML без имени, title и JSON-LD.
 * Резолвер держит навигацию, пока нет профиля и акции — в HTML для робота
 * сразу title, h1 и кнопка расчёта.
 */
@Injectable({ providedIn: 'root' })
export class PublicProfileResolver implements Resolve<PublicProfileResolved> {
  constructor(
    private api: ProfileService,
    private landingApi: LandingService,
    private seo: SeoService,
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<PublicProfileResolved> {
    const link = (route.paramMap.get('id') ?? '').trim();
    if (!link) {
      return of({ notFound: true });
    }

    return this.api.translateLink(link).pipe(
      switchMap(res => {
        if (res?.code === 404) {
          return of({ notFound: true });
        }
        const id = typeof res?.data === 'string' ? res.data.trim() : '';
        if (!id) {
          return of({ notFound: true });
        }
        return forkJoin({
          profile: this.api.getBusinessProfileById(id).pipe(
            catchError(err => of(this.httpFail(err))),
          ),
          work: this.api.getWorkLocation(id).pipe(
            catchError(() => of(null)),
          ),
          landing: this.landingApi.getLanding(id),
        }).pipe(
          map(({ profile, work, landing }) => {
            const resolved = this.pack(id, profile, work, landing);
            this.applySeo(resolved, link);
            return resolved;
          }),
        );
      }),
      catchError(err => {
        const status = (err as { status?: number } | null)?.status;
        if (status === 404) {
          return of({ notFound: true });
        }
        return of({ unavailable: true });
      }),
    );
  }

  /** HTTP-ошибка профиля: 404 — карточки нет, остальное — временный сбой. */
  private httpFail(err: unknown): IResponse {
    const status = (err as { status?: number } | null)?.status;
    return { code: status === 404 ? 404 : 500, message: '', data: null };
  }

  private pack(
    id: string,
    profileRes: IResponse | null,
    workRes: IResponse | null,
    landingRes: LandingLoadResult,
  ): PublicProfileResolved {
    if (profileRes?.code === 404) {
      return { notFound: true };
    }
    if (profileRes?.code !== 200 || !profileRes.data) {
      return { id, unavailable: true };
    }
    const data = workRes?.code === 200 ? workRes.data : null;
    const workLocations = Array.isArray(data)
      ? data as IWorkLocation[]
      : (data ? [data as IWorkLocation] : []);
    return {
      id,
      profile: profileRes.data as IViewBusinessProfile,
      workLocations,
      landing: landingRes.ok ? landingRes.landing : null,
      landingFailed: !landingRes.ok,
    };
  }

  /**
   * Title/OG до создания outlet: иначе SeoService.update в ngOnInit родителя
   * успевает после того, как зона уже «стабильна», и в HTML остаётся
   * <title> из index.html. Родитель может повторить update — идемпотентно.
   *
   * Если профиля нет (unavailable), сюда не заходим: пустую оболочку
   * server.ts не кладёт в минутный кеш — иначе робот минуту видит каталог.
   */
  private applySeo(resolved: PublicProfileResolved, link: string): void {
    if (!resolved.profile) {
      return;
    }
    const seo = publicProfileSeoFrom(resolved.profile, resolved.workLocations ?? [], `/${link}`);
    this.seo.update(seo.path, {
      title: seo.title,
      description: seo.description,
      ogType: 'profile',
      image: resolved.profile.avatarUrl && resolved.profile.id
        ? resolveAvatarUrl(resolved.profile.avatarUrl)
        : undefined,
    });
  }
}
