import {Gender} from "../../enums/gender";

export class ISearchRequest {
  address: string | null = null;
  distance: number | null = null;
  gender: Gender[] | null = null;
  categoryId: number | null = null;
  search: string | null = null;
  geo: number[] | null = null;
    constructor(address: string|null,
    distance: number|null,
    gender: Gender[]|null,
    categoryId: number|null,
    search: string|null,
    geo: number[]|null)
    {
            if (address != null)   this.address   = address;
            if (distance != null)  this.distance  = distance;
            if (gender != null)    this.gender    = gender;
            if (categoryId != null)this.categoryId= categoryId;
            if (search != null)    this.search    = search;
            if (geo != null)       this.geo       = geo;

    }
}