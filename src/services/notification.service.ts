import {Injectable} from "@angular/core";
import {environment} from "../enviroments/environment";
import {HttpClient} from "@angular/common/http";
import {IViewNotification} from "../app/DTO/views/notifications/IViewNotification";
import {IChangeNotification} from "../app/DTO/views/notifications/IChangeNotification";
import {IResponse} from "../app/DTO/classes/IResponse";

@Injectable({
  providedIn: 'root',
})
export class MessageNotificationService {
  private url = environment.Uri + 'notifications/';
  constructor(private http: HttpClient) {

  }

  readNotifications(id: string){
      return this.http.get(`${this.url}update-status/${id}`);
  }

  getNotifications(profileId: string){
    return this.http.get<IViewNotification[]>(`${this.url}${profileId}`);
  }

  changeStatus(id: string, state: IChangeNotification){
    return this.http.put<IResponse>(`${this.url}change-status/${id}`, state);
  }

  getCountNotifications(id: string){
    return this.http.get<number>(`${this.url}get-count-notifications/${id}`);
  }

  // putReadNotifications(profileId: string, type:any){
  //   return this.http.get<any>(`${this.url}${profileId}?type=${type}`);
  // }
 // https://83.222.9.120/v1/api/notifications/9dfead39-ece7-4645-ae1f-2461adf808ef?type=0&status=1
    // https://83.222.9.120/v1/api/notifications/{id} - id номер самого запроса
  // return this.http.get<IViewProfit>(`${this.baseUrl}profit/${id}?month=${month}`, ).pipe(
  // return this.http.get<number>(`${this.url}get-count-record-today/${id}?date=${date}`);


}
