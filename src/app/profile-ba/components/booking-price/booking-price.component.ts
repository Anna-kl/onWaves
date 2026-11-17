import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookingPrice } from '../../helpers/booking-price';
import { formatAmount, formatRub } from '../../../../helpers/common/welcome-coupon';

@Component({
  selector: 'app-booking-price',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './booking-price.component.html',
  styleUrls: ['./booking-price.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingPriceComponent {
  @Input() price: BookingPrice | null = null;
  @Input() confirmed = false;
  readonly money = formatRub;
  readonly amount = formatAmount;
}
