import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../enviroments/environment';
import { Observable } from 'rxjs';
import { IResponse } from '../../../DTO/classes/IResponse';
import { ISendCode } from '../../../DTO/ISendCode';


@Injectable()

export class AuthServices {
  private url = environment.Uri + 'auths/';

  constructor(private http: HttpClient) {

  }

  register(phone: string): Observable<IResponse> {
    return this.http.get<IResponse>(`${this.url}${phone}`);
  }

  checkCode(send: ISendCode): Observable<IResponse> {
    let headers: HttpHeaders = new HttpHeaders();
    return this.http.post<IResponse>(`${this.url}`, send, {headers});
  }
}
