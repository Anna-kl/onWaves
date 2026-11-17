import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { WorkLocationType } from '../../../DTO/enums/workLocationType';
import { BookingPrice } from '../../helpers/booking-price';
import { BookingSuccessDetails } from '../../helpers/booking-success';
import { BookingPriceComponent } from '../booking-price/booking-price.component';

@Component({
  selector: 'app-booking-success', standalone: true, imports: [CommonModule, BookingPriceComponent],
  templateUrl: './booking-success.component.html', styleUrls: ['./booking-success.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingSuccessComponent {
  @Input() details: BookingSuccessDetails | null = null;
  @Input() price: BookingPrice | null = null;
  @Output() done = new EventEmitter<void>();
  readonly locationTypes = WorkLocationType;
}
