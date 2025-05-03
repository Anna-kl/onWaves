import { Injectable } from '@angular/core';
// import * as signalR from '@microsoft/signalr';
import { BehaviorSubject, Observable } from 'rxjs';
import { IMessage } from '../views/IMessage';
import { ISendMessage } from '../views/ISendMessage';

@Injectable({
  providedIn: 'root',
})
export class AppSignalRService {
  // private hubConnection: signalR.HubConnection;
  public message$ = new BehaviorSubject<IMessage|null>(null);


  constructor() {
    // this.hubConnection = new signalR.HubConnectionBuilder()
    //   .withUrl('/chat') // SignalR hub URL
    //   .build();
    // this.hubConnection = new signalR.HubConnectionBuilder()
    // .configureLogging(signalR.LogLevel.Debug)
    // .withUrl("https://ocpio-client.ru/chat", {
    //   skipNegotiation: true,
    //   transport: signalR.HttpTransportType.WebSockets
    // })
    // .build();

  }

  startConnection(): Observable<void> {
    return new Observable<void>((observer) => {
      // this.hubConnection
      //   .start()
      //   .then(() => {
      //     console.log('Connection established with SignalR hub');
      //     observer.next();
      //     observer.complete();
      //   })
      //   .catch((error: any) => {
      //     console.error('Error connecting to SignalR hub:', error);
      //     observer.error(error);
      //   });
    });
  }

  receiveMessage() {
    // return new Observable<ISendMessage>((observer) => {
    //   this.hubConnection.on('ReceiveMessage', (message: string) => {
    //     let mes = JSON.parse(message) as ISendMessage;
    //     observer.next(mes);
    //     // this.message$.next(mes);
    //   });
    // });
  }

  sendMessage(message: string): void {
    // this.hubConnection.invoke('SendMessage', message);
  }
}