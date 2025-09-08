// app-update.service.ts  (или прямо в app.component.ts)
import { inject, Injectable } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, interval } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppUpdateService {
  private sw = inject(SwUpdate);

  constructor() {
    if (!this.sw.isEnabled) return;

    // 1) ловим событие "VERSION_READY"
    this.sw.versionUpdates
      .pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
      .subscribe(() => {
        // спросить пользователя; можно заменить на MatSnackBar, Toast и т.д.
        if (confirm('Доступна новая версия приложения. Обновить?')) {
          this.sw.activateUpdate().then(() => document.location.reload());
        }
      });

    // 2) раз в час проверяем наличие обновления
    interval(60 * 60 * 1000).subscribe(() => this.sw.checkForUpdate());
  }
}
