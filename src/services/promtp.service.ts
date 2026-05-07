// pwa-install.service.ts
import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted'|'dismissed'; platform: string }>;
}

@Injectable({ providedIn: 'root' })
export class PwaInstallService {
  private deferred?: BeforeInstallPromptEvent;

  readonly canPrompt = signal(false);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (!isPlatformBrowser(this.platformId)) return;

    window.addEventListener('beforeinstallprompt', (e: Event) => {
      e.preventDefault();
      this.deferred = e as BeforeInstallPromptEvent;
      this.canPrompt.set(true);
    });

    window.addEventListener('appinstalled', () => {
      this.deferred = undefined;
      this.canPrompt.set(false);
      localStorage.removeItem('pwa-install-dismissed');
    });

    const isStandalone =
      window.matchMedia?.('(display-mode: standalone)')?.matches ||
      (navigator as any).standalone === true;
    if (isStandalone)
         this.canPrompt.set(false);
  }

  async prompt(): Promise<'accepted'|'dismissed'|'unavailable'> {
    const evt = this.deferred;
    if (!evt) return 'unavailable';
    await evt.prompt();
    const { outcome } = await evt.userChoice;
    // после промпта событие больше не пригодится
    this.deferred = undefined;
    this.canPrompt.set(false);
    if (outcome === 'dismissed') {
      // запомним отказ на сутки (чтобы не надоедать)
      localStorage.setItem('pwa-install-dismissed', String(Date.now()));
    }
    return outcome;
  }
}
