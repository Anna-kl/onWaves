import {Injectable} from "@angular/core";
import {environment} from "../enviroments/environment";
import {HttpClient} from "@angular/common/http";
import {ISendRating} from "../app/DTO/views/rating/ISendRating";
import {IResponse} from "../app/DTO/classes/IResponse";
import {IViewReview} from "../app/DTO/views/rating/IViewReview";

@Injectable()

export class RatingService {
    constructor(private http: HttpClient) {
    }

    private url = environment.Uri + 'UserMetrics/';

    saveRating(idProfile: string, send: ISendRating){
        return this.http.post<IResponse>(`${this.url}save-rating/${idProfile}`, send);
    }

    // getRatings(id: string){
    //     return this.http.get<IViewReview[]>(`${this.url}get-reviews/${id}`);
    // }

    getRatings(id: string){
        return this.http.get<IViewReview[]>(`${this.url}reviews/${id}`);
    }

    deleteReview(id: string){
        return this.http.delete<IResponse>(`${this.url}${id}`);
    }
}