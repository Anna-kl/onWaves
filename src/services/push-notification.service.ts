import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/enviroments/environment';
import { IResponse } from 'src/app/DTO/classes/IResponse';

// ключ должен совпадать с тем, что используется на сервере (.NET Core)
const VAPID_PUBLIC = environment.publicKey;

function base64UrlToUint8Array(base64url: string): Uint8Array {
  const s = base64url.trim().replace(/[\r\n\s]+/g, '');     // убрать мусор
  if (!/^[A-Za-z0-9_-]+$/.test(s)) {
    throw new Error('VAPID public key must be base64url (A–Z a–z 0–9 _ -)');
  }
  const padded = s + '='.repeat((4 - (s.length % 4)) % 4);  // паддинг
  const base64 = padded.replace(/-/g, '+').replace(/_/g, '/');
  const raw = atob(base64);
  const buf = new ArrayBuffer(raw.length);
  const out = new Uint8Array(buf);
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return out;
}

@Injectable({ providedIn: 'root' })
export class PushDebugService {
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  url = environment.Uri;

  async subscribe(idUser: string): Promise<void> {
    // fix: не запускать на сервере (SSR) — window/navigator недоступны
    if (!isPlatformBrowser(this.platformId)) return;

    const isPwa = window.matchMedia('(display-mode: standalone)').matches ||
                  (navigator as any).standalone === true;
    if (isPwa) {
      await this.ensurePwaSubscription(idUser);
    } else {
      await this.enable(idUser);
    }
  }

  async ensurePwaSubscription(idUser: string): Promise<void> {
    const reg = await navigator.serviceWorker.ready;
    let sub = await reg.pushManager.getSubscription();
    if (!sub) {
      const perm = await Notification.requestPermission();
      if (perm !== 'granted') return;
      const appKey = base64UrlToUint8Array(VAPID_PUBLIC);
      sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: appKey.buffer as ArrayBuffer });
    }
    this.sendSubscriptionToServer(idUser, sub);
  }

  async enable(id: string): Promise<void> {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      console.warn('Push not supported'); return;
    }

    const reg = await navigator.serviceWorker.register('/sw.js');

    const perm = await Notification.requestPermission();
    if (perm !== 'granted') { console.warn('Permission denied:', perm); return; }

    // fix: не трогаем существующую подписку — endpoint не меняется зря
    let sub = await reg.pushManager.getSubscription();
    if (!sub) {
      const appKey = base64UrlToUint8Array(VAPID_PUBLIC);
      if (appKey.length !== 65) { throw new Error('Bad VAPID public key (must decode to 65 bytes)'); }
      sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: appKey.buffer as ArrayBuffer });
    }

    this.sendSubscriptionToServer(id, sub);
  }

  private sendSubscriptionToServer(userId: string, sub: PushSubscription): void {
    this.http.post<IResponse>(
      `${this.url}notifications/subscribe/${userId}`,
      { userId, subscription: sub.toJSON() }
    ).subscribe(result => {
      if (result.code === 200) {
        console.log('Push subscription saved:', result.data);
      }
    });
  }

  sendTest() {
    return firstValueFrom(this.http.post(`${this.url}/api/push/send`, { userId: 'demo', title: 'Hello', body: 'from .NET', url: '/' }));
  }
}