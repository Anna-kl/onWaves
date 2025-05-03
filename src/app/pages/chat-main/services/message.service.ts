import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { IResponse } from "src/app/DTO/classes/IResponse";
import { environment } from "src/enviroments/environment";
import { IChat } from "../views/IChat";
import { ISendMainImage } from "src/app/DTO/views/images/ISendMainImage";
import { ISendMessage } from "../views/ISendMessage";

@Injectable()

export class ChatService  {
  private url = environment.Uri + 'chats/';

  constructor(private http: HttpClient) {
}

  sendMessage(id: string, message: string, receiverId: string){
    let  headers: HttpHeaders = new HttpHeaders();
    return this.http.post<IResponse>(`${this.url}send-message/${id}`, {
      text: message,
      receiverId: receiverId
    }, {headers});
  }

  getChats(id: string){
    return this.http.get<IChat[]>(`${this.url}get-chats/${id}`);
  }

  getMessages(id: string, receiverId: string){
    return this.http.get<ISendMessage[]>(`${this.url}load-message/${id}?receiverId=${receiverId}`);
  }
   
}