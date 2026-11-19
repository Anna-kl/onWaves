import { isPlatformBrowser, NgIf } from '@angular/common';
import { Component, DestroyRef, Inject, PLATFORM_ID } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, NavigationError, Router } from '@angular/router';

export function isChunkLoadError(error: unknown): boolean {
  const value = error as { name?: string; message?: string; rejection?: unknown } | null;
  return value?.name === 'ChunkLoadError'
    || /ChunkLoadError|Loading chunk [\w-]+ failed|Failed to fetch dynamically imported module|Importing a module script failed/i.test(value?.message ?? '')
    || (!!value?.rejection && value.rejection !== error && isChunkLoadError(value.rejection));
}

/** Открытая до выкладки вкладка может потерять lazy chunk. Восстановление — только по выбору пользователя. */
@Component({
  selector: 'app-navigation-failure', standalone: true, imports: [NgIf],
  template: `
    <section *ngIf="failedUrl" class="navigation-failure" role="alert" aria-label="Не удалось открыть страницу">
      <strong>Не удалось открыть страницу</strong>
      <p>Проверьте подключение и попробуйте ещё раз. Если не получится, откройте страницу заново.</p>
      <div class="navigation-failure__actions">
        <button type="button" (click)="retry()" [disabled]="retrying">{{ retrying ? 'Открываем…' : 'Попробовать ещё раз' }}</button>
        <a [href]="failedUrl">Открыть заново</a>
        <button type="button" (click)="dismiss()">Закрыть</button>
      </div>
    </section>
  `,
  styles: [`
    .navigation-failure { position: fixed; z-index: 10020; top: calc(100px + env(safe-area-inset-top));
      left: 50%; transform: translateX(-50%); box-sizing: border-box; width: min(640px, calc(100% - 32px));
      padding: 20px; border: 1px solid #d46c54; border-radius: 16px; background: #fff;
      color: #043c48; box-shadow: 0 8px 32px #043c4824; }
    p { margin: 10px 0 16px; line-height: 1.5; }
    .navigation-failure__actions { display: flex; flex-wrap: wrap; gap: 8px; }
    button, a { display: inline-flex; align-items: center; justify-content: center; min-height: 44px;
      padding: 8px 14px; border: 1px solid #006174; border-radius: 24px; color: #006174;
      background: #fff; font: inherit; cursor: pointer; text-decoration: none; }
    button:first-child { background: #006174; color: #fff; }
    button:disabled { opacity: .6; cursor: wait; }
    @media (max-width: 480px) { .navigation-failure__actions > * { width: 100%; } }
  `],
})
export class NavigationFailureComponent {
  failedUrl: string | null = null;
  retrying = false;

  constructor(private router: Router, destroyRef: DestroyRef, @Inject(PLATFORM_ID) platform: object) {
    if (!isPlatformBrowser(platform)) return;
    this.router.events.pipe(takeUntilDestroyed(destroyRef)).subscribe(event => {
      if (event instanceof NavigationEnd) this.dismiss();
      if (event instanceof NavigationError && isChunkLoadError(event.error)) {
        // Только внутренний адрес роутера; внешние URL и схемы в ссылку восстановления не попадают.
        this.failedUrl = event.url.startsWith('/') && !event.url.startsWith('//') && !event.url.includes('\\')
          ? event.url : '/';
      }
    });
  }

  async retry(): Promise<void> {
    if (!this.failedUrl || this.retrying) return;
    this.retrying = true;
    try {
      await this.router.navigateByUrl(this.failedUrl);
    } catch {
      // Сообщение остаётся на экране; автоматической перезагрузки и очистки сессии нет.
    } finally {
      this.retrying = false;
    }
  }

  dismiss(): void { this.failedUrl = null; }
}
