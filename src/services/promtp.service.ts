// pwa-install.service.ts
import { Injectable, signal } from '@angular/core';

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted'|'dismissed'; platform: string }>;
}

@Injectable({ providedIn: 'root' })
export class PwaInstallService {
  private deferred?: BeforeInstallPromptEvent;

  // можно показывать баннер
  readonly canPrompt = signal(false);

  constructor() {
    // скрываем системный баннер и запоминаем событие
    window.addEventListener('beforeinstallprompt', (e: Event) => {
      e.preventDefault();
      this.deferred = e as BeforeInstallPromptEvent;
      this.canPrompt.set(true);
    });

    // уже установили — прячем баннер
    window.addEventListener('appinstalled', () => {
      this.deferred = undefined;
      this.canPrompt.set(false);
      localStorage.removeItem('pwa-install-dismissed');
    });

    // если уже запущено как установленное — баннер не нужен
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
