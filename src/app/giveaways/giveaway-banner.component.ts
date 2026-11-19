import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit, Component, ElementRef, Inject, Input, OnChanges, OnDestroy, PLATFORM_ID, SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { GiveawayCampaign, GiveawayLoad, GiveawayPrizePublic } from '../DTO/views/giveaway/giveaway';
import { bannerVisible, formatMsk, giveawayHasVk, giveawayHasWebsite, phaseHeadline, prizeDeadline } from '../../helpers/giveaway';
import { AnalyticsService } from '../../services/analytics.service';
import { GiveawayFeaturedPostComponent } from './giveaway-featured-post.component';

@Component({
  selector: 'app-giveaway-banner',
  standalone: true,
  imports: [CommonModule, RouterModule, GiveawayFeaturedPostComponent],
  templateUrl: './giveaway-banner.component.html',
  styleUrls: ['./giveaway-banner.component.scss'],
})
export class GiveawayBannerComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input() load: GiveawayLoad<GiveawayCampaign> | null = null;
  @Input() variant: 'home' | 'master' = 'home';

  private viewed = false;
  private viewedCode: string | null = null;
  private observer?: IntersectionObserver;

  constructor(
    private host: ElementRef<HTMLElement>,
    private analytics: AnalyticsService,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  get campaign(): GiveawayCampaign | null {
    return this.load?.kind === 'ready' ? this.load.value : null;
  }
  get isFeatured(): boolean {return this.variant==='home'&&this.campaign?.featuredPost?.pinned===true;}

  get shown(): boolean {
    if (this.load?.kind === 'failed') {
      return true;
    }
    return bannerVisible(this.campaign, this.variant);
  }

  get rulesParagraphs(): string[] {
    return (this.campaign?.rulesText ?? '').split(/\n\s*\n/).filter(paragraph => paragraph.trim());
  }

  get title(): string {
    if (!this.isSvetlana) {
      if (this.showPrizes) return this.campaign?.title ?? '';
      if (this.campaign?.phase === 'results_published') return 'Итоги розыгрыша';
    }
    if (this.campaign?.phase === 'active') return 'Два приза на красоту';
    if (this.campaign?.phase === 'scheduled') return 'Скоро — два приза на красоту';
    return this.campaign ? phaseHeadline(this.campaign.phase) : '';
  }

  get showPrizes(): boolean {
    return this.campaign?.phase === 'active' || this.campaign?.phase === 'scheduled';
  }

  get canJoinVk(): boolean {
    return this.vkEntry && this.campaign?.phase === 'active' && !!this.campaign.vkPostUrl && !this.linkToMaster;
  }

  get isSvetlana(): boolean { return this.campaign?.code === 'svetlana-vk-2026-11'; }
  get websiteEntry(): boolean { return giveawayHasWebsite(this.campaign?.entryMode); }
  get vkEntry(): boolean { return giveawayHasVk(this.campaign?.entryMode); }

  get linkToMaster(): boolean { return !this.campaign?.configured && !this.websiteEntry && this.variant === 'home' && !this.isSvetlana && this.showPrizes; }

  get entryParams(): Record<string, string> {
    if (!this.websiteEntry || this.campaign?.phase !== 'active') return {};
    const params: Record<string, string> = { participate: '1', entryPoint: this.variant };
    for (const name of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content']) {
      const value = this.route.snapshot.queryParamMap.get(name);
      if (value && /^[a-z][a-z0-9_-]{0,63}$/i.test(value) && !/\d{10}/.test(value)) params[name] = value;
    }
    return params;
  }

  get hasWorkPhotos(): boolean {
    return this.campaign?.code === 'svetlana-vk-2026-11' && !this.campaign.banner?.imageUrl;
  }

  prizeCaption(prize: GiveawayPrizePublic): string {
    if (!this.isSvetlana) return prize.title;
    if (prize.policy?.maxServices === 2 && prize.policy.maxVisits === 2) return 'До двух услуг и двух визитов';
    if (prize.policy?.maxServices === 1) return 'Купон на одну услугу';
    return prize.title;
  }

  get deadline(): string | null {
    const campaign = this.campaign;
    if (!campaign) {
      return null;
    }
    if (campaign.phase === 'scheduled') {
      return formatMsk(campaign.startsAt);
    }
    if (campaign.phase === 'active') {
      return this.isSvetlana || campaign.configured ? formatMsk(campaign.entriesCloseAt) : prizeDeadline(campaign.entriesCloseAt);
    }
    return null;
  }

  get resultsDate(): string | null {
    return formatMsk(this.campaign?.resultsPlannedAt, false);
  }

  get cta(): string {
    const phase = this.campaign?.phase;
    if (this.websiteEntry && phase === 'active') return 'Участвовать';
    if (this.websiteEntry && phase === 'scheduled') return 'Условия розыгрыша';
    if (phase === 'results_published') {
      return 'Смотреть итоги';
    }
    if (phase === 'scheduled' || phase === 'awaiting_results') {
      return 'Посмотреть условия';
    }
    return this.variant === 'home' ? 'Условия и участие' : 'Посмотреть условия';
  }

  get detailsLink(): string {
    return '/giveaways/' + this.campaign?.code;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['load']) {
      if (this.viewedCode !== this.campaign?.code) this.viewed = false;
      this.watchView();
    }
  }

  ngOnDestroy(): void { this.observer?.disconnect(); }

  ngAfterViewInit(): void {
    this.watchView();
  }

  openDetails(): void {
    const campaign = this.campaign;
    if (!campaign) {
      return;
    }
    this.analytics.trackGiveaway('giveaway_details_open', {
      campaignCode: campaign.code,
      placement: this.variant,
      phase: campaign.phase,
    });
  }

  openVk(): void {
    const campaign = this.campaign;
    if (!campaign) return;
    this.analytics.trackGiveaway('giveaway_vk_click', {
      campaignCode: campaign.code,
      placement: this.variant,
      phase: campaign.phase,
    });
  }

  private watchView(): void {
    if (!isPlatformBrowser(this.platformId) || !this.shown || !this.campaign || this.viewed) {
      return;
    }
    const node = this.host.nativeElement;
    if (typeof IntersectionObserver === 'undefined') {
      this.markViewed();
      return;
    }
    this.observer?.disconnect();
    this.observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        this.markViewed();
        this.observer?.disconnect();
      }
    }, { threshold: 0.4 });
    this.observer.observe(node);
  }

  private markViewed(): void {
    if (this.viewed || !this.campaign) {
      return;
    }
    this.viewed = true;
    this.viewedCode = this.campaign.code;
    this.analytics.trackGiveaway('giveaway_banner_view', {
      campaignCode: this.campaign.code,
      placement: this.variant,
      phase: this.campaign.phase,
    });
  }
}
