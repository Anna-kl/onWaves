import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICountry } from '../app/DTO/classes/ICountry';
import { environment } from '../enviroments/environment';
import {ICategory} from "../app/DTO/classes/ICategory";
import {IViewCategoryTree} from "../app/DTO/views/categories/IViewCategoryTree";
import {IViewCoordinates} from "../app/DTO/views/profile/IViewCoordinates";

@Injectable()

export class DictionaryService {
  private url = environment.Uri + 'dictionaries/';

  constructor(private http: HttpClient) {

  }
  getCounties():Observable<ICountry[]> {
    return this.http.get<ICountry[]>(`${this.url}country`);
  }

  getPoint(address: string):Observable<IViewCoordinates> {
    return this.http.get<IViewCoordinates>(`${this.url}geo?address=${address}`);
  }
  getMainCategories(): Observable<ICategory[]>{
    return this.http.get<ICategory[]>(`/assets/category/category.json`);
  }

  getExceptWords(): Observable<string[]>{
    return this.http.get<string[]>(`/assets/words/except.json`);
  }

  getAddress(address: string){
    const url = 'https://geocode-maps.yandex.ru/1.x/?apikey=a2c8035f-05f9-4489-aea1-ad9b2a841572&geocode='+
        address+'&format=json'

    return this.http.get(url);
  }
  getTreeCategories(id: number): Observable<IViewCategoryTree[]>{
    return this.http.get<IViewCategoryTree[]>(`${this.url}tree-categories/${id}`);
  }
}
