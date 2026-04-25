import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/enviroments/environment';

@Component({
  selector: 'app-record-success-telegram-modal',
  templateUrl: './record-success-telegram-modal.component.html',
  styleUrls: ['./record-success-telegram-modal.component.scss'],
})
export class RecordSuccessTelegramModalComponent {
  readonly telegramUrl = environment.telegramChannelUrl;

  constructor(private activeModal: NgbActiveModal) {}

  close(): void {
    this.activeModal.close();
  }
}
