import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { PwaInstallService } from 'src/services/promtp.service';
import { BehaviorSubject, Subscription } from 'rxjs';

export type InstallState = 'installed' | 'canPrompt' | 'prompting' | 'declined' | 'unsupported';

type BIPEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};
@Component({
  selector: 'app-install-banner',
  templateUrl: './install-banner.component.html',
  styleUrls: ['./install-banner.component.scss']
})
export class InstallBannerComponent implements OnInit {
  private pwa = inject(PwaInstallService);
  show = signal(false);
  private deferred?: BIPEvent;
  private unsubscribe$: Subscription|null = null;

  readonly state$ = new BehaviorSubject<InstallState>('unsupported');



  checkTime(){
      const dismissedAt = Number(localStorage.getItem('pwa-install-dismissed') ?? 0);
      const recentlyDismissed = Date.now() - dismissedAt < 24 * 60 * 60 *1000 ;
      let isInstalled = localStorage.getItem('appinstalled');
      return !recentlyDismissed && isInstalled !== 'yes';
  }
    isStandalone(): boolean {
    return (window.matchMedia?.('(display-mode: standalone)').matches) ||
           // iOS PWA
           (typeof (navigator as any).standalone !== 'undefined' && (navigator as any).standalone === true);
  }
    isIOS() {
      return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
    }
  constructor() {

      // Если уже запущено как standalone — считаем установленным
    if (this.isStandalone()) {
      this.state$.next('installed');
    }
    // не показывать, если недавно отклонили (например, < 1 суток)
    window.addEventListener('beforeinstallprompt', (e: Event) => {
      e.preventDefault();
      
      this.deferred = e as BIPEvent;
      this.pwa.canPrompt.set(true);
      this.state$.next('canPrompt');
    });

    window.addEventListener('appinstalled', () => {
      this.deferred = undefined;
      this.pwa.canPrompt.set(false);
      this.state$.next('installed');
    });

    const mq = window.matchMedia?.('(display-mode: standalone)');
    mq?.addEventListener?.('change', ev => {
      if (ev.matches) this.state$.next('installed');
    });
  }
  ngOnInit(): void {
   this.unsubscribe$ = this.state$.subscribe(result => {
     if (this.pwa.canPrompt() && this.checkTime())
      this.show.set(true);
   });
   
  }

  promptInstall(): Promise<'accepted'|'dismissed'|'unavailable'|'no-gesture'> {
    const evt = this.deferred;
    if (!evt) return Promise.resolve('unavailable');

    // Если браузер экспонирует userActivation — проверим жест заранее
    const ua = (navigator as any).userActivation;
    if (ua && !ua.isActive)
       return Promise.resolve('no-gesture');

    // НЕЛЬЗЯ делать await до вызова prompt() — это убьёт жест.
    this.deferred = undefined;          // событие одноразовое
    this.pwa.canPrompt.set(false);

    // Вызвать системный диалог
    localStorage.setItem('appinstalled', 'yes');
    return evt.prompt().then(() => evt.userChoice).then(({ outcome }) => outcome);
  }


  async install() {
    this.show.set(false);
    this.promptInstall();
    // можно добавить аналитику по result
  }

  dismiss() {
    localStorage.setItem('pwa-install-dismissed', String(Date.now()));
    this.show.set(false);
  }

  // iOS нет beforeinstallprompt — покажите вместо этого подсказку в UI
  private isIOSStandalone() {
    const ua = navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator as any).standalone !== undefined;
    const isStandalone = (navigator as any).standalone === true;
    return isIOS && isStandalone;
  }
}
