
import {Injectable} from "@angular/core";
import {environment} from "../enviroments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BusService} from "./busService";
import {ISendAuth} from "../app/DTO/views/profile/ISendAuth";
import {Observable} from "rxjs";
import {IResponse} from "../app/DTO/classes/IResponse";
import { IAIResponce } from "src/app/DTO/views/ai/IAIResponce";
import { IAIState } from "src/app/ngrx-store/aiStore/IAIState";

@Injectable({
  providedIn: 'root'
})

export class AIService {
  private url = environment.UriAI;

  constructor(private http: HttpClient) {
  }

  
  upload_mpeg(formData: FormData){
    let  headers: HttpHeaders = new HttpHeaders();
    return this.http.post<IAIState>(`${this.url}upload/mpeg`, formData, {headers})
  }
}
