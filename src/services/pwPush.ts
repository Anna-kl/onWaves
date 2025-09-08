import { Injectable, inject } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PushService {
  private swPush = inject(SwPush);
  private http = inject(HttpClient);
  private VAPID_PUBLIC = 'BExxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; // из npx web-push

  async enable(): Promise<void> {
    if (!this.swPush.isEnabled) return; // prod + https

    const perm = await Notification.requestPermission();
    if (perm !== 'granted') return;

    const sub = await this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC
    });

    // отправляем подписку на сервер
    await this.http.post('/api/push/subscribe', sub).toPromise();

    // data-only сообщения (если отправляешь без поля notification)
    this.swPush.messages.subscribe(msg => console.log('Push data:', msg));

    // клики по уведомлению
    this.swPush.notificationClicks.subscribe(e => {
      const url = (e.notification as any)?.data?.url;
      if (url) window.open(url, '_self');
    });
  }

  // по желанию — отписка
  async disable(): Promise<void> {
    const reg = await navigator.serviceWorker.getRegistration();
    const sub = await reg?.pushManager.getSubscription();
    await sub?.unsubscribe();
    await this.http.post('/api/push/unsubscribe', sub).toPromise();
  }
}
