import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SeoService } from 'src/services/seo.service';
import { PromoSeatsService } from 'src/services/promo-seats.service';
import { formatRub } from 'src/helpers/common/welcome-coupon';
import { promoPeriodText, promoStatusNotice } from '../../helpers/promo-seat-terms-text';
import { PromoSeatTerms } from '../../../DTO/views/promo/promo-seats';
import { organizerLine } from '../../helpers/promo-seats';

/** Условия акции с местами: отдельная страница по прямой ссылке, без входа. Все цифры — с сервера. */
@Component({
  selector: 'app-promo-seats-terms',
  templateUrl: './promo-seats-terms.component.html',
  styleUrls: ['../promo-terms/promo-terms.component.scss', './promo-seats-terms.component.scss'],
})
export class PromoSeatsTermsComponent implements OnInit, OnDestroy {
  readonly formatRub = formatRub;
  readonly promoPeriodText = promoPeriodText;
  readonly promoStatusNotice = promoStatusNotice;
  readonly contactEmail = 'askme@onwaves.online';

  slug = '';
  terms: PromoSeatTerms | null = null;
  loading = true;
  private sub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private seats: PromoSeatsService,
    private seo: SeoService,
  ) {}

  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe(params => {
      this.slug = (params.get('id') ?? '').trim();
      this.loading = true;
      this.terms = null;
      this.applySeo();
      this.seats.getTerms(this.slug).subscribe(terms => {
        this.terms = terms;
        this.loading = false;
        this.applySeo();
      });
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  get organizer(): string | null {
    return organizerLine(this.terms?.state.organizer);
  }

  get organizerDetails(): string | null {
    return this.terms?.state.organizer?.details?.trim() || null;
  }

  get open(): boolean {
    const state = this.terms?.state;
    return !!state && state.status === 'open' && state.seatsLeft > 0;
  }

  /** Кампания заведена, но не включена: это не «места закончились». */
  get pending(): boolean {
    return this.terms?.state.closedReason === 'disabled' || this.terms?.state.closedReason === 'not_started';
  }

  get bookingUrl(): string {
    return `onwaves.online/${this.terms?.masterSlug || this.slug}`;
  }

  private applySeo(): void {
    const performer = this.terms?.performerName?.trim();
    this.seo.update(`/${this.slug}/usloviya`, {
      title: `Условия акции${performer ? ' — ' + performer : ''} | OnWaves`,
      description: 'Срок, число мест, цены по акции и организатор.',
      noindex: !this.organizer,
    });
  }
}
