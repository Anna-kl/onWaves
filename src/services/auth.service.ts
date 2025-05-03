import {Injectable} from "@angular/core";
import {environment} from "../enviroments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BusService} from "./busService";
import {ISendAuth} from "../app/DTO/views/profile/ISendAuth";
import {Observable} from "rxjs";
import {IResponse} from "../app/DTO/classes/IResponse";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private url = environment.Uri + 'auths/';

  constructor(private http: HttpClient,
              private busService: BusService) {
  }

  getProfiles(send: ISendAuth): Observable<IResponse>{
    let  headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + send.token);
   return this.http.post<IResponse>(`${this.url}uuid`, send, {headers})
  }

  sendTokenFCM(token: string, sessionId: string){
    let  headers: HttpHeaders = new HttpHeaders();
    return this.http.post<IResponse>(`${this.url}fcm-token/${sessionId}`, {token}, {headers})
  }
}
