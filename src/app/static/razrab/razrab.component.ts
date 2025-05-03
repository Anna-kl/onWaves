// import {Component, Input, OnInit} from '@angular/core';
// import {RatingService} from "../../../services/rating.service";
// import {IViewReview} from "../../DTO/views/rating/IViewReview";
// import {DomSanitizer} from "@angular/platform-browser";

// @Component({
//   selector: 'app-reviews-carusel',
//   templateUrl: './razrab.component.html',
//   styleUrls: ['./razrab.component.css'],
//   providers: [RatingService ]
// })
// export class ReviewsCaruselComponent implements OnInit {
//   reviews: IViewReview[] = [];

//   constructor(private _apiRating: RatingService,
//               private sanitizer: DomSanitizer) {
//   }
//   ngOnInit(): void {
//     if (this.id) {
//       this._apiRating.getRatings(this.id!).subscribe(
//           result => {
//             this.reviews = result;
//           }
//       );
//     }
//     if (this.id) {
//       this._apiRating.getRatings(this.id!).subscribe(
//           result => {
//               this.reviews = result.map(review => {
//                   const nameAuthorObject = JSON.parse(review.nameAuthor.replace(/;/g, ','));
//                   return {
//                       ...review,
//                       name: nameAuthorObject.Name.trim(), // Получаем имя из JSON и убираем лишние пробелы
//                       author: nameAuthorObject.Family.trim() // Получаем фамилию из JSON и убираем лишние пробелы
//                   };
//               });
//           }
//       );
//   }
//   }

//   products = [1,2,3];
//   @Input() id: string|null = null;
//   responsiveOptions = [
//     {
//       breakpoint: '1600px',
//       numVisible: 2,
//       numScroll: 1
//     },
//     {
//       breakpoint: '2000px',
//       numVisible: 3,
//       numScroll: 1
//     },
//     {
//       breakpoint: '1199px',
//       numVisible: 2,
//       numScroll: 1
//     },
//     {
//       breakpoint: '768px',
//       numVisible: 2,
//       numScroll: 1
//     },
//     {
//       breakpoint: '460px',
//       numVisible: 1,
//       numScroll: 1
//     },
//     {
//       breakpoint: '346px',
//       numVisible: 1,
//       numScroll: 1
//     }
//   ];

//   getAvatar(avatar: string) {
//     if (avatar) {
//       return  this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64,
//        ${avatar}`);
//     } else {
//       return  '/assets/img/AvatarBig.png';
//     }
//   }
// }

import {Component, Input, OnChanges, OnInit} from '@angular/core';
import { RatingService } from "../../../services/rating.service";
import { IViewReview } from "../../DTO/views/rating/IViewReview";
import { DomSanitizer } from "@angular/platform-browser";
import {Observable} from "rxjs";

@Component({
  selector: 'app-reviews-carusel',
  templateUrl: './razrab.component.html',
  styleUrls: ['./razrab.component.css'],
  providers: [RatingService]
})
export class ReviewsCaruselComponent implements OnChanges {
  @Input() id: string | null = null;
  reviews$: Observable<IViewReview[]>|null = null;

  constructor(private _apiRating: RatingService, private sanitizer: DomSanitizer) { }

  ngOnChanges(): void {
    if (this.id) {
      this.reviews$ = this._apiRating.getRatings(this.id!);
    }
  }

  // getAvatar(avatar: string) {
  //   if (avatar) {
  //     // return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64,${avatar}`);
  //     return '/assets/img/AvatarBig.png';
  //   } else {
  //     return '/assets/img/AvatarBig.png';
  //   }
  // }
  getAvatar(avatar: string | null) {
    if (avatar) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64,${avatar}`);
    } else {
      return '/assets/img/AvatarBig.png';
    }
  }
  
}
