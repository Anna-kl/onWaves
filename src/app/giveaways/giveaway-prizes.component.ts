import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component, DestroyRef, EventEmitter, Inject, Input, OnChanges, OnDestroy, Output, PLATFORM_ID, SimpleChanges,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterModule } from '@angular/router';
import { Subject, interval, filter, of, startWith, switchMap } from 'rxjs';
import { GiveawayAward, GiveawayLoad, GiveawayMine, GiveawayPrizeQuote } from '../DTO/views/giveaway/giveaway';
import { prizeDeadline, savePrizeDraft } from '../../helpers/giveaway';
import { formatRub } from '../../helpers/common/welcome-coupon';
import { AnalyticsService } from '../../services/analytics.service';
import { GiveawaysService } from '../../services/giveaways.service';

@Component({
  selector: 'app-giveaway-prizes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './giveaway-prizes.component.html',
  styleUrls: ['./giveaway-prizes.component.scss'],
})
export class GiveawayPrizesComponent implements OnChanges, OnDestroy {
  @Input() proofTick = 0;
  @Input() clientId?: string | null;
  @Output() needPhoneProof = new EventEmitter<void>();

  load: GiveawayLoad<GiveawayMine> = { kind: 'loading', value: null };
  readonly money = formatRub;
  choosingAwardId: string | null = null;
  selectedIds: string[] = [];
  selection: GiveawayLoad<GiveawayPrizeQuote> = { kind: 'empty', value: null };
  private readonly quoteRequests = new Subject<{ item: GiveawayAward; ids: string[] }>();
  private seen = new Set<string>();
  private pollStop?: { unsubscribe(): void };

  constructor(
    private giveaways: GiveawaysService,
    private analytics: AnalyticsService,
    private router: Router,
    private destroyRef: DestroyRef,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {
    this.quoteRequests.pipe(
      switchMap(({ item, ids }) => this.giveaways.prizeQuote(item.awardId, ids)),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(load => this.selection = load);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['proofTick'] && this.proofTick > 0) {
      this.claim();
      return;
    }
    if (!this.pollStop) {
      this.start();
    }
  }

  ngOnDestroy(): void {
    this.pollStop?.unsubscribe();
  }

  get items(): GiveawayAward[] {
    return this.load.value?.items ?? [];
  }

  when(iso?: string | null): string | null {
    return prizeDeadline(iso);
  }

  statusText(item: GiveawayAward): string {
    switch (item.status) {
      case 'reserved': return 'Есть запись на приз';
      case 'partially_redeemed': return 'Приз частично использован';
      case 'redeemed': return 'Услуга получена';
      case 'expired': return 'Срок использования истёк';
      case 'review_required': return 'Нужно решение организатора';
      case 'revoked': return 'Назначение отозвано';
      default: return '';
    }
  }

  choose(item: GiveawayAward): void {
    this.choosingAwardId = item.awardId;
    this.selectedIds = [];
    this.selection = { kind: 'empty', value: null };
  }

  toggle(item: GiveawayAward, id: string): void {
    if (item.policy?.maxVisits !== 1 && this.serviceLimitReached(item, id)) return;
    if (item.policy?.maxVisits === 1) {
      this.selectedIds = [id];
    } else {
      this.selectedIds = this.selectedIds.includes(id) ? this.selectedIds.filter(value => value !== id) : [...this.selectedIds, id];
    }
    this.selection = { kind: 'loading', value: null };
    this.quoteRequests.next({ item, ids: [...this.selectedIds] });
  }

  serviceLimitReached(item: GiveawayAward, id: string): boolean {
    const limit = item.policy?.maxServices;
    return !!limit && !this.selectedIds.includes(id)
      && this.selectedIds.length + (item.completedServices ?? 0) + (item.reservedServices ?? 0) >= limit;
  }

  book(item: GiveawayAward): void {
    const quote = item.policy ? this.selection.value : null;
    if (!item.canBook || !item.master.slug || (item.policy ? this.choosingAwardId !== item.awardId
        || this.selection.kind !== 'ready' || quote?.status !== 'available' : !item.service?.id)) return;
    const ids = item.policy ? quote!.lines!.map(line => line.serviceId) : [item.service!.id];
    savePrizeDraft({ awardId: item.awardId, serviceId: ids.join(','), masterSlug: item.master.slug,
      version: quote?.awardVersion ?? item.version });
    this.analytics.trackGiveaway('giveaway_prize_booking_start', {
      campaignCode: item.campaignCode, placement: 'cabinet', phase: item.status,
    });
    void this.router.navigate(['/', item.master.slug, 'choose-date'], {
      queryParams: { award: item.awardId, serviceId: ids[0], ...(ids.length > 1 ? { services: ids.join(',') } : {}) },
    });
  }

  reload(): void {
    this.fetch(false);
  }

  private start(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.load = { kind: 'loading', value: null };
      return;
    }
    const poll = interval(30_000).pipe(
      startWith(0),
      filter(() => document.visibilityState === 'visible'),
      switchMap(() => this.read()),
      takeUntilDestroyed(this.destroyRef),
    );
    this.pollStop = poll.subscribe(load => {
      if (document.visibilityState === 'hidden' && this.load.kind !== 'loading') {
        return;
      }
      this.load = load;
      this.trackCards(load.value?.items ?? []);
    });
    document.addEventListener('visibilitychange', this.onVisible);
    this.destroyRef.onDestroy(() => document.removeEventListener('visibilitychange', this.onVisible));
  }

  private readonly onVisible = (): void => {
    if (document.visibilityState === 'visible') {
      this.fetch(false);
    }
  };

  private claim(): void {
    this.giveaways.claim().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.fetch(true));
  }

  private fetch(force: boolean): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    if (!force && document.visibilityState === 'hidden') {
      return;
    }
    this.read().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(load => {
      this.load = load;
      this.trackCards(load.value?.items ?? []);
    });
  }

  private read() {
    return this.giveaways.mine().pipe(switchMap(load =>
      load.kind === 'ready' && load.value?.items.some(item => item.status === 'assigned')
        ? this.giveaways.claim() : of(load),
    ));
  }

  private trackCards(items: GiveawayAward[]): void {
    for (const item of items) {
      if (this.seen.has(item.awardId)) {
        continue;
      }
      this.seen.add(item.awardId);
      this.analytics.trackGiveaway('giveaway_prize_card_view', {
        campaignCode: item.campaignCode,
        placement: 'cabinet',
        phase: item.status,
      });
    }
  }
}
