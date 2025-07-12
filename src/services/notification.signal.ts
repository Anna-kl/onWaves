// signalr.service.ts
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { environment } from 'src/enviroments/environment';

@Injectable({ providedIn: 'root' })
export class OrderSignalrService {
  private hubConnection!: signalR.HubConnection;
  public newOrder$ = new Subject<{ userId: string; recordId: string }>();
  public hubUri = environment.hubUri;

  public startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(`${this.hubUri}hubs/orders`,{
        skipNegotiation: true,
        withCredentials: true,  // skipNegotiation as we specify WebSockets
        transport: signalR.HttpTransportType.WebSockets  // force WebSocket transport
      })
      .build();

    this.hubConnection
      .start()
      .catch(err => console.error('SignalR Connection Error: ', err));

    this.hubConnection.on('NewOrder', (data: any) => {
      this.newOrder$.next(data);
    });
  }
}