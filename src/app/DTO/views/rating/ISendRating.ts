
import {ReviewType} from "../../enums/reviewType";

export interface ISendRating {
    recordId: string|null;
    rating: number|null;
    text: string;
    ratingParentId: string|null;
    reviewType: ReviewType;
}