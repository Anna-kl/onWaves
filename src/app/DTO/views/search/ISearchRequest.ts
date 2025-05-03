import {Gender} from "../../enums/gender";

export interface ISearchRequest {
    address: string|null;
    distance: number|null;
    gender: Gender[];
    categoryId: number|null;
    search: string|null;
    geo: number[]|null
}