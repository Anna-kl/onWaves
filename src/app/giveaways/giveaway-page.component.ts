import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, DestroyRef, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { GiveawayCampaign, GiveawayLoad } from '../DTO/views/giveaway/giveaway';
import { UserType } from '../DTO/classes/profiles/profile-user.model';
import { selectProfileMainClient } from '../ngrx-store/mainClient/store.select';
import { formatMsk, giveawayIndexable, phaseHeadline, prizeDeadline, rememberPrizeCabinetReturn } from '../../helpers/giveaway';
import { seatsLeftText } from '../profile-ba/helpers/promo-seats';
import { AnalyticsService } from '../../services/analytics.service';
import { GiveawaysService } from '../../services/giveaways.service';
import { PromoSeatsService } from '../../services/promo-seats.service';
import { SeoService } from '../../services/seo.service';
import { PromoSeatState } from '../DTO/views/promo/promo-seats';
import { giveawayHasVk, giveawayHasWebsite } from '../../helpers/giveaway';
import { GiveawayEntryFormComponent } from './giveaway-entry-form.component';

@Component({
  selector: 'app-giveaway-page',
  standalone: true,
  imports: [CommonModule, RouterModule, GiveawayEntryFormComponent],
  templateUrl: './giveaway-page.component.html',
  styleUrls: ['./giveaway-page.component.scss'],
})
export class GiveawayPageComponent implements OnInit {
  load: GiveawayLoad<GiveawayCampaign> = { kind: 'loading', value: null };
  seats: PromoSeatState | null = null;
  seatsFailed = false;
  private pageTracked = false;
  private campaignRequest?: { unsubscribe(): void };
  readonly isBrowser: boolean;

  constructor(
    private giveaways: GiveawaysService,
    private seatsApi: PromoSeatsService,
    private seo: SeoService,
    private analytics: AnalyticsService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store,
    private destroyRef: DestroyRef,
    @Inject(PLATFORM_ID) platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  reload(): void {
    this.load = { kind: 'loading', value: null };
    this.campaignRequest?.unsubscribe();
    const code = this.route.snapshot.paramMap.get('code') ?? 'svetlana-vk-2026-11';
    this.campaignRequest = this.giveaways.getCampaign(code, this.isPreview).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(load => {
      this.applyCampaign(load);
    });
  }

  ngOnInit(): void {
    this.reload();
  }

  get isPreview(): boolean { return this.route.snapshot.data['giveawayPreview'] === true; }
  get websiteEntry(): boolean { return giveawayHasWebsite(this.campaign?.entryMode); }
  get vkEntry(): boolean { return giveawayHasVk(this.campaign?.entryMode); }
  get openEntry(): boolean { return this.route.snapshot.queryParamMap.get('participate') === '1'; }

  get rulesParagraphs(): string[] { return (this.campaign?.rulesText ?? '').split(/\n\s*\n/).filter(Boolean); }

  readonly prizeEnd = prizeDeadline;

  publicationGapText(gap: string): string {
    const labels: Record<string, string> = {
      rules: 'Утверждённая редакция полных правил и ссылка на неё.',
      draft_placeholders: 'Удаление служебных пометок из условий и описаний призов.',
      organizer: 'Имя организатора.',
      vk_post: 'Ссылка на исходный конкурсный пост VK, а не на страницу сообщества.',
      dates: 'Подтверждённый старт и согласованные сроки участия и использования призов.',
      services: 'Доступные услуги с актуальными ценами.',
      prize_policy: 'Согласованные лимиты и условия призов.',
      chance_rule: 'Правило учёта заявок из двух площадок.',
      prize_price_changed: 'Подтвердите новую цену услуги перед публикацией.',
      title: 'Название розыгрыша.',
    };
    return labels[gap] ?? 'Проверка обязательного поля: ' + gap;
  }

  get campaign(): GiveawayCampaign | null {
    return this.load.kind === 'ready' ? this.load.value : null;
  }

  get headline(): string {
    const campaign = this.campaign;
    if (!campaign) return 'Розыгрыш OnWaves';
    if (this.isSvetlana) return phaseHeadline(campaign.phase);
    if (campaign.phase === 'awaiting_results') return 'Приём заявок завершён';
    if (campaign.phase === 'results_published') return 'Итоги розыгрыша';
    return campaign.title;
  }

  get isSvetlana(): boolean { return this.campaign?.code === 'svetlana-vk-2026-11'; }

  get closeLabel(): string | null {
    return this.isSvetlana || this.campaign?.configured ? formatMsk(this.campaign?.entriesCloseAt) : prizeDeadline(this.campaign?.entriesCloseAt);
  }

  get startLabel(): string | null {
    return formatMsk(this.campaign?.startsAt);
  }

  get canJoinVk(): boolean {
    return this.vkEntry && this.campaign?.phase === 'active' && !!this.campaign.vkPostUrl;
  }

  get fixedCoupon(): boolean {
    return this.campaign?.bookingOffer?.couponMode === 'fixed' && (this.campaign.bookingOffer.fixedDiscountRub ?? 0) > 0;
  }

  get seatsOpen(): boolean {
    return !!this.seats && this.seats.status === 'open' && this.seats.seatsLeft > 0;
  }

  get seatsLine(): string | null {
    if (!this.isBrowser || this.seatsFailed || !this.seats || this.seats.status !== 'open') {
      return null;
    }
    return seatsLeftText(this.seats.seatsLeft, this.seats.seatsLimit);
  }

  resultsDate(iso?: string | null): string | null {
    return formatMsk(iso, this.isSvetlana);
  }

  onVk(): void {
    const campaign = this.campaign;
    if (!campaign) {
      return;
    }
    this.analytics.trackGiveaway('giveaway_vk_click', {
      campaignCode: campaign.code,
      placement: 'page',
      phase: campaign.phase,
    });
  }

  onBooking(): void {
    const campaign = this.campaign;
    if (!campaign) {
      return;
    }
    this.analytics.trackGiveaway('giveaway_booking_offer_click', {
      campaignCode: campaign.code,
      placement: 'page',
      phase: campaign.phase,
    });
  }

  enterCabinet(): void {
    rememberPrizeCabinetReturn();
    this.store.select(selectProfileMainClient).pipe(take(1)).subscribe(profile => {
      if (profile?.id && profile.userType === UserType.User) {
        void this.router.navigate(['/page-user', profile.id], { fragment: 'prizes' });
        return;
      }
      void this.router.navigate(['/'], { queryParams: { action: 'register' } });
    });
  }

  private applyCampaign(load: GiveawayLoad<GiveawayCampaign>): void {
    this.load = load;
    this.applySeo(load.value);
    const masterId = load.kind === 'ready' ? load.value?.master?.id : null;
    if (!masterId || !this.isBrowser || !this.isSvetlana) {
      this.seats = null;
      this.seatsFailed = false;
      return;
    }
    this.seatsApi.readState(masterId).pipe(take(1)).subscribe(state => {
      this.seats = state.kind === 'ready' ? state.value : null;
      this.seatsFailed = state.kind === 'failed';
    });
  }

  private applySeo(campaign: GiveawayCampaign | null): void {
    const indexable = giveawayIndexable(campaign);
    const title = `${campaign?.title || 'Розыгрыш'} | OnWaves`;
    const description = campaign?.summary
      || 'Призы и правила участия в розыгрыше OnWaves.';
    this.seo.update(this.router.url, {
      title,
      description,
      noindex: this.isPreview || !indexable,
      follow: indexable,
    });
    if (this.isBrowser && !this.pageTracked && !this.isPreview) {
      this.pageTracked = true;
      // The entry record keeps validated attribution. Don't forward arbitrary query fields from the join URL.
      this.analytics.trackPage(campaign && giveawayHasWebsite(campaign.entryMode) ? '/giveaways/' + campaign.code : this.router.url, title);
    }
  }
}
