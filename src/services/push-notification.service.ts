import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs'
import {AuthService} from "./auth.service";
import {  provideMessaging,
  getMessaging, 
  onMessage, 
  getToken,
  Messaging } from "@angular/fire/messaging";


@Injectable({ providedIn: 'root' })
export class MessagingService {currentMessage = new BehaviorSubject(null);

  constructor (private messaging: Messaging) {
    // Подписка на входящие сообщения
    onMessage(this.messaging, (payload) => {
    //  this.currentMessage.next(payload);
      console.log('Message received: ', payload);
    });
  }

requestPermission() {
  // Получаем токен для браузера/устройства
  return getToken(this.messaging, { vapidKey: 'ВАШ_VAPID_KEY' })
    .then((token) => {
      console.log('FCM Token:', token);
    })
    .catch((err) => console.error('Не удалось получить токен', err));
}


// receiveMessage() {
//   this.angularFireMessaging.messages.subscribe(
//     (payload: any) => {
//       this.currentMessage.next(payload.notification.body);
//     });
// }
}
