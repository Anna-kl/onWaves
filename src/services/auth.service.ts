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

  confirmEmail(token:string){
     return this.http.post<IResponse>(`${this.url}confirm-email`, {token})
  }

  sendTokenFCM(token: string, sessionId: string){
    let  headers: HttpHeaders = new HttpHeaders();
    return this.http.post<IResponse>(`${this.url}fcm-token/${sessionId}`, {token}, {headers})
  }

  sendEmail(email: string, password: string, uuid: string){
    let  headers: HttpHeaders = new HttpHeaders();
    return this.http.post<IResponse>(`${this.url}email`, {"email": email, "password":password, uuid}, {headers})
  }

  registerEmail(email: string, password: string,  name: string, uuid:string, family?: string){
    let  headers: HttpHeaders = new HttpHeaders();
    return this.http.post<IResponse>(`${this.url}register-email`, {"email": email, "password":password,  name, family, uuid}, {headers})
  }

  confirmContacts(id: string, contact: string, uuid: string, type: number){
     return this.http.get<IResponse>(`${this.url}confirm/${id}?contact=${contact}&uuid=${uuid}&type=${type}`,)
  }

  confirmCode(uuid: string, session: string, code: string){
     return this.http.post<IResponse>(`${this.url}confirm-code`, {uuid, session, code} )
  }
}
