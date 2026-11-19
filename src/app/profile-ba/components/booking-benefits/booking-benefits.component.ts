import { isPlatformBrowser, NgIf } from '@angular/common';
import { Component, DestroyRef, EventEmitter, Inject, Input, OnChanges, Output, PLATFORM_ID } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { catchError, distinctUntilChanged, forkJoin, map, of, Subscription, switchMap, tap } from 'rxjs';
import { subGroup } from '../../../DTO/views/services/IViewSubGroups';
import { selectProfileMainClient } from '../../../ngrx-store/mainClient/store.select';
import { WelcomeCouponService } from '../../../../services/welcome-coupon.service';
import { PromoSeatsService } from '../../../../services/promo-seats.service';
import { GiveawaysService } from '../../../../services/giveaways.service';
import { BookingPrice, bookingPrice, bookingPrizeIssue, bookingPrizePrice } from '../../helpers/booking-price';
import { BookingPriceComponent } from '../booking-price/booking-price.component';

/** Предварительная стоимость на выборе услуг и даты; финальный шаг перепроверяет её. */
@Component({
  selector: 'app-booking-benefits', standalone: true, imports: [BookingPriceComponent, NgIf],
  template: `
    <app-booking-price [price]="price"></app-booking-price>
    <p *ngIf="notice" role="status">{{ notice }}</p>
    <button *ngIf="failed" type="button" class="btn-transparent" (click)="ngOnChanges()">Проверить стоимость ещё раз</button>
  `,
})
export class BookingBenefitsComponent implements OnChanges {
  @Input() masterId: string | null | undefined;
  @Input() slug: string | null | undefined;
  @Input() services: subGroup[] = [];
  @Input() dayId: string | null = null;
  @Input() awardId: string | null = null;
  @Output() priceChange = new EventEmitter<BookingPrice | null>();
  price: BookingPrice | null = null;
  notice: string | null = null;
  failed = false;
  private request?: Subscription;

  constructor(
    private welcome: WelcomeCouponService, private promos: PromoSeatsService, private giveaways: GiveawaysService, private store: Store,
    private destroyRef: DestroyRef, @Inject(PLATFORM_ID) private platform: object,
  ) { this.destroyRef.onDestroy(() => this.request?.unsubscribe()); }

  ngOnChanges(): void {
    this.request?.unsubscribe();
    this.price = null;
    this.notice = null;
    this.failed = false;
    this.priceChange.emit(null);
    const ids = this.services.map(s => s.id).filter((id): id is string => !!id);
    if (!isPlatformBrowser(this.platform) || !this.masterId || !ids.length) return;
    const masterId = this.masterId;
    const { awardId, dayId, services, slug } = this;
    this.request = this.store.select(selectProfileMainClient).pipe(
      map(profile => this.welcome.isLoggedIn ? profile?.id ?? null : null),
      distinctUntilChanged(),
      tap(() => {
        this.price = null;
        this.notice = null;
        this.failed = false;
        this.priceChange.emit(null);
      }),
      switchMap(clientId => (awardId ? of(awardId) : this.giveaways.findBookingPrize(masterId, ids, clientId)).pipe(
        switchMap(prize => prize
          ? this.giveaways.prizeQuote(prize, ids, clientId, dayId).pipe(map(load => {
            this.notice = bookingPrizeIssue(load);
            return !this.notice && load.value ? bookingPrizePrice(load.value) : null;
          }))
          : forkJoin({
            welcome: this.welcome.quote(masterId, ids, clientId),
            promo: this.promos.quoteForBooking(masterId, ids, clientId, dayId),
          }).pipe(map(({ welcome, promo }) => bookingPrice(services, welcome, promo, true, slug)))),
        catchError(() => {
          this.failed = true;
          this.notice = 'Не удалось проверить стоимость записи и скидки. Попробуйте ещё раз.';
          return of(null);
        }),
      )),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(price => {
      this.price = price;
      this.priceChange.emit(price);
    });
  }
}
