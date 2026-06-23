import { Component, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ConsentChannel } from 'src/app/DTO/enums/consentChannel';
import { ConsentService, INotificationChannelsStatus } from 'src/services/consent.service';

export interface ChannelOption {
  channel: ConsentChannel;
  name: string;
  icon: string;
  connected: boolean;
}

@Component({
  selector: 'app-notification-channel-select-modal',
  templateUrl: './notification-channel-select-modal.component.html',
  styleUrls: ['./notification-channel-select-modal.component.scss']
})
export class NotificationChannelSelectModalComponent implements OnDestroy {
  @Input() profileId!: string;
  @Input() status!: INotificationChannelsStatus;

  isLoading = false;
  errorMessage: string | null = null;
  private sub?: Subscription;

  channels: ChannelOption[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private consentService: ConsentService
  ) {}

  ngOnInit(): void {
    this.channels = [
      {
        channel: ConsentChannel.Telegram,
        name: 'Telegram',
        icon: 'telegram',
        connected: this.status.telegram
      },
      {
        channel: ConsentChannel.Vk,
        name: 'ВКонтакте',
        icon: 'vk',
        connected: this.status.vk
      },
      {
        channel: ConsentChannel.Max,
        name: 'Max',
        icon: 'max',
        connected: this.status.max
      }
    ].filter(ch => !ch.connected);
  }

  selectChannel(option: ChannelOption): void {
    this.isLoading = true;
    this.errorMessage = null;
    const newWindow = window.open('about:blank', '_blank');
    this.sub = this.consentService.getSubscribeLink(this.profileId, option.channel).subscribe({
      next: result => {
        this.isLoading = false;
        if (!result?.link) {
          newWindow?.close();
          this.errorMessage = `Ссылка для ${option.name} пока недоступна`;
          return;
        }
        if (newWindow) {
          newWindow.opener = null;
          newWindow.location.href = result.link;
        } else {
          window.location.href = result.link;
        }
        this.activeModal.close(option.channel);
      },
      error: (err) => {
        this.isLoading = false;
        newWindow?.close();
        this.errorMessage = `Не удалось получить ссылку для ${option.name}`;
        console.error('subscribe-link error:', option.channel, err);
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
