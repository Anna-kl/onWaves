import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/enviroments/environment';

@Component({
  selector: 'app-record-success-telegram-modal',
  templateUrl: './record-success-telegram-modal.component.html',
  styleUrls: ['./record-success-telegram-modal.component.scss'],
})
/** Задаётся при открытии через modalRef.componentInstance (id клиента для ?start= в боте). */
export class RecordSuccessTelegramModalComponent {
  readonly telegramUrl = environment.telegramChannelUrl;
  /** Id аккаунта (клиента) для deep link подписки в боте. */
  accountId: string | null = null;

  private readonly telegramBotStartBase =
    'https://t.me/OnlineServicesOnWaves_bot?start=';

  constructor(private activeModal: NgbActiveModal) {}

  /** Ссылка на бота с payload или запасной канал из environment. */
  get telegramSubscribeHref(): string | null {
    if (this.accountId) {
      return this.telegramBotStartBase + encodeURIComponent(this.accountId);
    }
    return this.telegramUrl || null;
  }

  close(): void {
    this.activeModal.close();
  }
}
