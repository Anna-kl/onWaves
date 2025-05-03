


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfileUser, UserType } from './profile-user.model';
import { environment } from '../../../../enviroments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.Uri + 'profiles/';

  constructor(private http: HttpClient) { }

  registerUser(name: string, family: string): Observable<any> {
    const viewNameProfile = {
      Name: name,
      Family: family
    };
    const profileUser: ProfileUser = {
      Name: JSON.stringify(viewNameProfile),
      UserType: UserType.User
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.baseUrl, profileUser, { headers });
  }
}
