import { Component } from '@angular/core';
import { PROMO_ORGANIZER } from '../../profile-ba/helpers/promo-terms';

@Component({
  selector: 'app-kupon',
  templateUrl: './kupon.component.html',
  styleUrls: ['./kupon.component.scss'],
})
export class KuponComponent {
  readonly email = PROMO_ORGANIZER.email;
}
