import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

/**
 * Подтверждение отзыва согласия для каналов с ботом (Telegram, VK, MAX).
 *
 * Бэкенд при отзыве согласия удаляет саму подписку (ChannelSubscriptionCleaner),
 * поэтому обратно тумблер канал уже не оживит: нужно заново открыть бот и
 * нажать «Старт». Действие необратимо в один клик — предупреждаем об этом до,
 * а не после.
 */
@Component({
  selector: 'app-revoke-channel-modal',
  templateUrl: './revoke-channel-modal.component.html',
  styleUrls: ['./revoke-channel-modal.component.scss']
})
export class RevokeChannelModalComponent {
  @Input() channelName = 'канал';
  /** Отписка сразу от всех каналов — текст другой, последствия те же. */
  @Input() bulk = false;

  constructor(public activeModal: NgbActiveModal) {}
}
