import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from 'src/services/toast.service';

/**
 * Глобальный контейнер тостов (замена p-toast). Standalone — подключается один раз
 * в app.component. Слушает единый поток ToastService и рендерит уведомления.
 */
@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="app-toast-host" aria-live="polite" aria-atomic="true">
      <div *ngFor="let m of toast.messages$ | async"
           class="app-toast"
           [class.app-toast--success]="m.severity === 'success'"
           [class.app-toast--error]="m.severity === 'error'"
           [class.app-toast--warn]="m.severity === 'warn'"
           [class.app-toast--info]="m.severity === 'info'"
           (click)="toast.remove(m.id)">
        <div class="app-toast__summary" *ngIf="m.summary">{{ m.summary }}</div>
        <div class="app-toast__detail" *ngIf="m.detail">{{ m.detail }}</div>
      </div>
    </div>
  `,
  styleUrls: ['./app-toast.component.scss'],
})
export class AppToastComponent {
  constructor(public toast: ToastService) {}
}
