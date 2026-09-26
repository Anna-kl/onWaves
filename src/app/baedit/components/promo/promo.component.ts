import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { IViewBusinessProfile } from '../../../DTO/views/business/IViewBussinessProfile';
import { IViewLanding } from '../../../DTO/views/landing/IViewLanding';
import { ILandingOffer } from '../../../DTO/views/landing/ILandingOffer';
import { selectProfileMainClient } from '../../../ngrx-store/mainClient/store.select';
import { LandingService } from '../../../../services/landing.service';
import { ToastService } from '../../../../services/toast.service';
import { PromoDraftService } from '../../services/promo-draft.service';
import { coverMedia } from '../../../profile-ba/helpers/promo-offer';
import { PromoMediaKind } from '../../../DTO/enums/promoMediaKind';
import { getPromoTemplate, templateFromOfferType } from './promo-templates';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.scss'],
})
export class PromoComponent implements OnInit, OnDestroy {
  profile: IViewBusinessProfile | null = null;
  landing: IViewLanding | null = null;
  isLoading = true;
  isSaving = false;

  private loadedProfileId: string | null = null;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly store$: Store,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly landingService: LandingService,
    private readonly draft: PromoDraftService,
    private readonly toast: ToastService
  ) {}

  ngOnInit(): void {
    this.store$.pipe(select(selectProfileMainClient), takeUntil(this.destroy$)).subscribe(profile => {
      if (!profile?.id) {
        return;
      }
      this.profile = profile;
      if (this.loadedProfileId !== profile.id) {
        this.loadedProfileId = profile.id;
        this.loadLanding(profile.id);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get offers(): ILandingOffer[] {
    return [...(this.landing?.offers ?? [])].sort((a, b) => a.sortOrder - b.sortOrder);
  }

  coverThumb(offer: ILandingOffer): { url: string | null; label: string } | null {
    const cover = coverMedia(offer);
    if (!cover) {
      return null;
    }
    if (cover.kind === PromoMediaKind.Video) {
      return { url: cover.posterUrl || null, label: 'Ролик' };
    }
    return { url: cover.url, label: 'Фото' };
  }

  templateName(offer: ILandingOffer): string {
    const type = offer.templateType ?? this.landing?.templateType ?? templateFromOfferType(offer.offerType);
    return getPromoTemplate(type).name;
  }

  isExpired(offer: ILandingOffer): boolean {
    if (!offer.validTo) {
      return false;
    }
    const date = new Date(offer.validTo);
    return !Number.isNaN(date.getTime()) && date.getTime() < Date.now();
  }

  createPromo(): void {
    this.draft.clear(this.profile?.id);
    this.router.navigate(['template'], { relativeTo: this.route });
  }

  editOffer(offer: ILandingOffer): void {
    if (!offer.id) {
      return;
    }
    const type = offer.templateType ?? this.landing?.templateType ?? templateFromOfferType(offer.offerType);
    this.draft.startEdit(offer.id, type);
    this.router.navigate(['edit', offer.id], { relativeTo: this.route });
  }

  toggleLanding(): void {
    if (!this.profile?.id || !this.landing || this.isSaving) {
      return;
    }
    const next = !this.landing.isActive;
    this.isSaving = true;
    this.landingService.toggleLanding(this.profile.id, next).subscribe({
      next: res => {
        this.isSaving = false;
        if (res.code === 200) {
          this.landing = { ...this.landing!, isActive: next };
        } else {
          this.toast.add({ severity: 'error', summary: 'Не удалось', detail: res.message || 'Не выключили акцию' });
        }
      },
      error: () => {
        this.isSaving = false;
        this.toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Не удалось переключить показ' });
      },
    });
  }

  toggleOffer(offer: ILandingOffer): void {
    if (!this.profile?.id || !this.landing || !offer.id) {
      return;
    }
    const offers = this.landing.offers.map(item =>
      item.id === offer.id ? { ...item, isActive: !item.isActive } : item
    );
    this.persist(this.toPayload({ ...this.landing, offers }), 'Видимость карточки обновлена');
  }

  deleteOffer(offer: ILandingOffer): void {
    if (!this.profile?.id || !this.landing || !offer.id) {
      return;
    }
    const offers = this.landing.offers.filter(item => item.id !== offer.id);
    this.persist(this.toPayload({ ...this.landing, offers }), 'Акция удалена');
  }

  private toPayload(landing: IViewLanding): IViewLanding {
    const { avatar, masterName, ...payload } = landing as IViewLanding & { avatar?: string; masterName?: string };
    return payload;
  }

  private persist(landing: IViewLanding, success: string): void {
    if (!this.profile?.id || this.isSaving) {
      return;
    }
    this.isSaving = true;
    this.landingService.updateLanding(this.profile.id, landing).subscribe({
      next: res => {
        this.isSaving = false;
        if (res.code === 200) {
          this.landing = (res.data as IViewLanding) ?? landing;
          this.toast.add({ severity: 'success', summary: 'Готово', detail: success });
        } else {
          this.toast.add({ severity: 'error', summary: 'Не удалось', detail: res.message || success });
        }
      },
      error: () => {
        this.isSaving = false;
        this.toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Изменения не сохранились' });
      },
    });
  }

  private loadLanding(profileId: string): void {
    this.isLoading = true;
    this.landingService.getLanding(profileId).pipe(takeUntil(this.destroy$)).subscribe({
      next: result => {
        this.landing = result.ok ? result.landing : null;
        this.isLoading = false;
      },
      error: () => {
        this.landing = null;
        this.isLoading = false;
      },
    });
  }
}
