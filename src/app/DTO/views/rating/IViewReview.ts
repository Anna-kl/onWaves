import {ReviewType} from "../../enums/reviewType";

export interface IViewReview {
    id: string|null;
    text: string;
    dateCreated: Date;
    authorId: string;
    isAnswer?: boolean;
    childReviews: IViewReview[];
    reviewType: ReviewType;
    estimate: number|null;
    avatar: string|null;
    nameAuthor: string;
    name: string; // Добавлено поле для имени
    author: string; // Добавлено поле для фамилии
}