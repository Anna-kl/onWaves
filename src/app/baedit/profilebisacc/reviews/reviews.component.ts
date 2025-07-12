import {Component, OnDestroy, OnInit} from '@angular/core';
import {RatingService} from "../../../../services/rating.service";
import {select, Store} from "@ngrx/store";
import {selectProfileMainClient} from "../../../ngrx-store/mainClient/store.select";
import {IViewReview} from "../../../DTO/views/rating/IViewReview";
import {Observable, Subscription} from "rxjs";
import {IViewBusinessProfile} from "../../../DTO/views/business/IViewBussinessProfile";
import {ISendRating} from "../../../DTO/views/rating/ISendRating";
import {ReviewType} from "../../../DTO/enums/reviewType";
import { environment } from 'src/enviroments/environment';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
  providers: [RatingService]
})
export class ReviewsComponent implements OnInit, OnDestroy{
  reviewText: string = '';
  reviews$: Observable<IViewReview[]>|null = new Observable<IViewReview[]>();
  profile: IViewBusinessProfile|null = null;
  private unsubscribe$: Subscription|null = null;
  TEXT_LENGTH: number = environment.TEXT_LENGTH;

  constructor(private _apiReviews: RatingService,
              private store$: Store) {
  }

  ngOnInit(): void {
    this.unsubscribe$ = this.store$.pipe(select(selectProfileMainClient)).subscribe(async (mainProfile: any) => {
      if (mainProfile) {
        this.profile = mainProfile;
        this.reviews$ = this._apiReviews.getRatings(mainProfile.id);
        this.reviews$.subscribe(res => {
          console.log(res);
        });
      }
    });

  }

  canLeftReview(review: IViewReview) {
    return review.childReviews.length === 0;

  }

  leftAnswer(review: IViewReview) {
    review.isAnswer = true;
  }

  ngOnDestroy(): void {
    this.unsubscribe$?.unsubscribe();
  }

  saveReview(review: IViewReview) {
    const send: ISendRating = {
      ratingParentId: review.id,
      text: this.reviewText,
      reviewType: ReviewType.ANSWER_REVIEW,
      rating: null,
      recordId: null
    };
    this._apiReviews.saveRating(this.profile?.id!, send).subscribe(
        result => {
          if (result.code === 201){
            this.reviews$ = this._apiReviews.getRatings(this.profile?.id!);
          }
        }
    );
  }

  deleteReview(ch: IViewReview) {
    if (ch.id){
    this.unsubscribe$ = this._apiReviews.deleteReview(ch.id).subscribe(
        result => {
          if (result.code === 200){
            this.reviews$ = this._apiReviews.getRatings(this.profile?.id!);
          }
        }
    );
  }}
}
