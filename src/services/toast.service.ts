import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastMessage {
  id: number;
  severity: string;      // 'success' | 'error' | 'warn' | 'info'
  summary?: string;
  detail?: string;
  life?: number;
  key?: string;
}

/**
 * Лёгкая замена primeng MessageService/p-toast. Метод add() совместим по сигнатуре
 * с MessageService, поэтому в местах вызова меняются только импорт и тип инъекции —
 * сами вызовы `.add({severity, summary, detail, life})` остаются как есть.
 * Единый глобальный поток тостов рендерит <app-toast> в app.component.
 */
@Injectable({ providedIn: 'root' })
export class ToastService {
  private seq = 0;
  private readonly _messages = new BehaviorSubject<ToastMessage[]>([]);
  readonly messages$ = this._messages.asObservable();

  add(msg: { severity?: string; summary?: string; detail?: string; life?: number; key?: string }): void {
    const toast: ToastMessage = {
      id: ++this.seq,
      severity: msg.severity ?? 'info',
      summary: msg.summary,
      detail: msg.detail,
      life: msg.life ?? 5000,
      key: msg.key,
    };
    this._messages.next([...this._messages.value, toast]);
    if (toast.life && toast.life > 0) {
      // Тосты возникают только по действию пользователя (в браузере); на SSR add() не вызывается.
      setTimeout(() => this.remove(toast.id), toast.life);
    }
  }

  remove(id: number): void {
    this._messages.next(this._messages.value.filter(m => m.id !== id));
  }

  clear(): void {
    this._messages.next([]);
  }
}
