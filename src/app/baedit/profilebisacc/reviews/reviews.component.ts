import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, map } from 'rxjs';
import { selectProfileMainClient } from '../../../ngrx-store/mainClient/store.select';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent {
  readonly masterId$ = this.store.select(selectProfileMainClient).pipe(
    map(profile => profile?.id ?? null),
    distinctUntilChanged(),
  );

  constructor(private store: Store) {}
}
