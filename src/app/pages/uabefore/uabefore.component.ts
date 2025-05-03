import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../../../services/profile.service";

import {CardsProfileService} from "../../../services/client-cards.service";
import {BusService} from "../../../services/busService";
import {Router} from "@angular/router";

@Component({
  selector: 'app-uabefore',
  templateUrl: './uabefore.component.html',
  styleUrls: ['./uabefore.component.css'],
  providers: [CardsProfileService]
})
export class UABeforeComponent implements OnInit {

  constructor(private readonly _serviceClientCardList : ProfileService,
              private _events: BusService,
              private router: Router,
              private _apiCards: CardsProfileService,) {
  }
  public isListCardExpand$ = this._apiCards.isListCardExpand$;
  public readonly cards$ = this._apiCards.cards$;
  skip: number = 0;
  async ngOnInit(): Promise<void> {
    await this._apiCards.getAllClientCardList(this.skip, false);
  }
  async loadCards() {
    this.skip += 12;
    await this._apiCards.getAllClientCardList(this.skip, false);
  }

}
