import {Injectable} from "@angular/core";
import {environment} from "../enviroments/environment";
import {BehaviorSubject, tap} from "rxjs";
import {IResponse} from "../app/DTO/classes/IResponse";

import {HttpClient} from "@angular/common/http";
import {ISearchRequest} from "../app/DTO/views/search/ISearchRequest";

import {IResultSearch} from "../app/DTO/views/search/IResultSearch";

@Injectable()
export class SearchService {
    private baseUrl = `${environment.Uri}search/`;
    public getSearchBA$ =  new BehaviorSubject<IResultSearch[]|null>(null);
    public isResultSearch =  new BehaviorSubject<boolean>(false);
    constructor(private http: HttpClient) {
    }

    search(send: ISearchRequest){
        const request = JSON.stringify(send);
        return this.http.get<IResponse>(`${this.baseUrl}?request=${request}`).pipe(
            tap(data => {
                this.getSearchBA$.next(data.data);
                this.isResultSearch.next(data.code === 404);
            }));
    }

    search2(send: ISearchRequest|null){
        const request = JSON.stringify(send) ?? null;
        return this.http.get<IResponse>(`${this.baseUrl}?request=${request}`);
    }
}