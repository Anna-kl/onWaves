import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/environment';
import { IResponse } from 'src/app/DTO/classes/IResponse';

const VAPID_PUBLIC = 'BKS49z4Chf0aedptocj2RRd3eEtBM6_CX2d9f4fjYcnXTnkX3s0RkQKANz6aCIyS7AMmNJXAhCjmR8GajbMJFPA'; // <-- твой publicKey

function base64UrlToUint8Array(base64url: string): Uint8Array {
  const s = base64url.trim().replace(/[\r\n\s]+/g, '');     // убрать мусор
  if (!/^[A-Za-z0-9_-]+$/.test(s)) {
    throw new Error('VAPID public key must be base64url (A–Z a–z 0–9 _ -)');
  }
  const padded = s + '='.repeat((4 - (s.length % 4)) % 4);  // паддинг
  const base64 = padded.replace(/-/g, '+').replace(/_/g, '/');
  const raw = atob(base64);
  const out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return out;
}

@Injectable({ providedIn: 'root' })
export class PushDebugService {
  constructor(private http: HttpClient) {}

  url = environment.Uri;

    async ensurePwaSubscription(idUser: string) {
    // проверить, что мы в PWA
    const isPwa = window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone;
    console.log('isPWA:', isPwa);

    const reg = await navigator.serviceWorker.ready;        // важен SW со scope="/"
    let sub = await reg.pushManager.getSubscription();
    if (!sub) {
      // запросить разрешение строго по клику пользователя
      const perm = await Notification.requestPermission();
      if (perm !== 'granted') return;

      const appKey = base64UrlToUint8Array(VAPID_PUBLIC);    // см. функцию ниже
      console.log('VAPID pwa bytes:', appKey.length);           // должно быть 65
      sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: appKey });
    }
    // отправь на сервер и привяжи к userId + deviceId
    this.http.post<IResponse>(`${this.url}notifications/subscribe/${idUser}`, { userId: idUser, subscription: sub.toJSON() }).subscribe(result => {
      if (result.code === 200){ 
          console.log(`pwa подписался - ${result.data}`);
          // alert('Подписка сохранена на сервере. Теперь можно отправить тест.');
      }
    })
  }

  async enable(id: string) {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      console.warn('Push not supported'); return;
    }

    // 1) регистрируем наш sw.js (scope = '/')
    const reg = await navigator.serviceWorker.register('/sw.js');
    console.log('SW scope:', reg.scope);

    // 2) спрашиваем разрешение
    const perm = await Notification.requestPermission();
    if (perm !== 'granted') { console.warn('Permission:', perm); return; }

    // 3) подчистим старую подписку (на всякий случай)
    const old = await reg.pushManager.getSubscription();
    if (old) await old.unsubscribe();

    // 4) подписываемся
    const appKey = base64UrlToUint8Array(VAPID_PUBLIC);
    console.log('VAPID bytes:', appKey.length); // ДОЛЖНО быть 65
    if (appKey.length !== 65) { throw new Error('Bad VAPID public key (must decode to 65 bytes)'); }

    const sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: appKey
    });

    const json = sub.toJSON();
    console.log('SUBSCRIPTION JSON:', JSON.stringify(json, null, 2));

    // 5) отправляем подписку на сервер (здесь demo userId=demo)
    this.http.post<IResponse>(`${this.url}notifications/subscribe/${id}`, { userId: id, subscription: json }).subscribe(result => {
      if (result.code === 200){ 
          console.log(`браузер подписался - ${result.data}`);
          // alert('Подписка сохранена на сервере. Теперь можно отправить тест.');
      }
    });
   
  }

  sendTest() {
    return this.http.post(`${this.url}/api/push/send`, { userId: 'demo', title: 'Hello', body: 'from .NET', url: '/' }).toPromise();
  }
}