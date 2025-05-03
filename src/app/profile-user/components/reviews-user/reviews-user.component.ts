import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {IShowRating} from "../../../DTO/views/rating/IShowRating";
import {RatingService} from "../../../../services/rating.service";

import {ActivatedRoute} from "@angular/router";

import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ReviewType} from "../../../DTO/enums/reviewType";


@Component({
  selector: 'app-reviews-user',
  templateUrl: './reviews-user.component.html',
  styleUrls: ['./reviews-user.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [RatingService]
})

export class ReviewsUserComponent
    implements OnInit {


  ratings: IShowRating[] = [];
  rating: number = 0;
  text = '';
  @Input() profileId: string|null = null;
  @Input() recordId: string|null = null;
  @Input() avatar: string|null = null;
  @Input() name: string|null = null;
  constructor(private _apiRating: RatingService,
              private _modal: NgbActiveModal) {
    for(let i of [1,2,3,4,5]){
      this.ratings.push({
       class: 'ico_rating_default',
       isChoose: false,
       step: i
      });
    }
  }
  ngOnInit(): void {
  }

  setRating(rat: IShowRating) {
    this.rating = rat.step;
    this.ratings.forEach(item => {
      if (item.step <= rat.step){
        item.class = 'ico_rating_color';
        item.isChoose = true;
      } else {
        item.class = 'ico_rating_default';
        item.isChoose = false;
      }
    });

  }

  getColor() {
    if (this.rating > 0 && this.text.length > 0){
      return 'btn-green';
    } else {
      return 'btn-gray';
    }
  }

  saveRating() {
    if (this.profileId && this.recordId) {
      this._apiRating.saveRating(this.profileId,
          {
            rating: this.rating,
            recordId: this.recordId,

            text: this.text,
            ratingParentId: null,
            reviewType: ReviewType.REVIEW

          }).subscribe(result => {
            if (result.code === 201){
              this._modal.close(true);
            } else {
              this._modal.close(false);
            }
      });
    }
  }
}
