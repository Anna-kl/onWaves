import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IResponse } from '../../../DTO/classes/IResponse';
import { IViewBusinessProfile } from '../../../DTO/views/business/IViewBussinessProfile';
import { ProfileService } from 'src/services/profile.service';
import { SeoService } from 'src/services/seo.service';
import { formatRub } from 'src/helpers/common/welcome-coupon';
import { formatRuPhone, ruPhoneOrNull } from 'src/helpers/common/phone';
import {
  MasterPromos,
  PROMO_ORGANIZER,
  PromoOrganizer,
  masterPromos,
  onlinePayRub,
  organizerReady,
  promoEnded,
  promoPriceRub,
} from '../../helpers/promo-terms';

@Component({
  selector: 'app-promo-terms',
  templateUrl: './promo-terms.component.html',
  styleUrls: ['./promo-terms.component.scss'],
})
export class PromoTermsComponent implements OnInit, OnDestroy {
  readonly organizer: PromoOrganizer = PROMO_ORGANIZER;
  readonly organizerReady = organizerReady();
  readonly formatRub = formatRub;
  readonly promoPriceRub = promoPriceRub;
  readonly onlinePayRub = onlinePayRub;
  readonly formatRuPhone = formatRuPhone;

  slug = '';
  promos: MasterPromos | null = null;
  ended = false;
  profileName = '';
  profilePhone: string | null = null;
  missing = false;
  private sub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private profiles: ProfileService,
    private seo: SeoService,
  ) {}

  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe(params => {
      this.slug = (params.get('id') ?? '').trim();
      this.promos = masterPromos(this.slug);
      this.ended = this.promos ? promoEnded(this.promos) : false;
      this.profileName = this.promos?.masterName ?? '';
      this.profilePhone = null;
      this.missing = false;
      this.applySeo();
      this.loadProfile();
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private loadProfile(): void {
    const slug = this.slug;
    if (!slug) {
      this.missing = true;
      return;
    }
    this.profiles.translateLink(slug).subscribe({
      next: res => {
        if (this.slug !== slug) return;
        const id = typeof res?.data === 'string' ? res.data.trim() : '';
        if (res?.code === 404 || !id) {
          this.missing = !this.promos;
          this.applySeo();
          return;
        }
        this.profiles.getBusinessProfileById(id).subscribe({
          next: (profile: IResponse) => {
            if (this.slug !== slug) return;
            const view = profile?.data as IViewBusinessProfile | undefined;
            this.profilePhone = ruPhoneOrNull(view?.phone);
            const name = view?.name?.trim();
            if (name) {
              this.profileName = name;
            }
            this.applySeo();
          },
          error: () => this.applySeo(),
        });
      },
      error: () => {
        this.missing = !this.promos;
        this.applySeo();
      },
    });
  }

  private applySeo(): void {
    const name = this.profileName || this.promos?.masterName || 'мастера';
    const city = this.promos?.place.split(',')[0] || '';
    const title = this.promos
      ? `Условия акций — ${this.promos.masterName}${city ? ', ' + city : ''} | OnWaves`
      : `Условия акций — ${name} | OnWaves`;
    this.seo.update(`/${this.slug}/akcii`, {
      title,
      description: this.promos
        ? `Срок, цены без акции и с купоном, организатор акций ${this.promos.masterName}.`
        : 'Условия акций мастера на OnWaves.',
      noindex: !this.organizerReady || !this.promos,
    });
  }
}
