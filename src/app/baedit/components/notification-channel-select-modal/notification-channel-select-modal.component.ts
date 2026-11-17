import { Component, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription, switchMap, timeout } from 'rxjs';
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
  telegramSelected = false;
  telegramLink: string | null = null;
  telegramConsentVersion: string | null = null;
  telegramConsentText = '';

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
    if (this.isLoading) return;
    if (option.channel === ConsentChannel.Telegram) {
      this.prepareTelegram();
      return;
    }
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
      error: () => {
        this.isLoading = false;
        newWindow?.close();
        this.errorMessage = `Не удалось получить ссылку для ${option.name}`;
      }
    });
  }

  prepareTelegram(): void {
    this.telegramSelected = true;
    this.telegramLink = null;
    this.isLoading = true;
    this.errorMessage = null;
    this.sub = this.consentService.getProfileConsents(this.profileId).pipe(
      switchMap(status => {
        if (status.some(item => item.channel === ConsentChannel.Telegram
          && (item.telegramOwnConsent ?? item.isGranted))) {
          return this.consentService.getSubscribeLink(this.profileId, ConsentChannel.Telegram);
        }
        return this.consentService.getTextVersions().pipe(switchMap(versions => {
          const version = versions[0];
          if (!version) throw new Error('Consent text not found');
          return this.consentService.getText(version).pipe(switchMap(text => {
            this.telegramConsentVersion = version;
            this.telegramConsentText = text;
            return of(null);
          }));
        }));
      }),
      timeout(15000),
    ).subscribe({
      next: result => { this.isLoading = false; this.telegramLink = result?.link ?? null; },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Не удалось подготовить подключение Telegram. Выберите Telegram ещё раз.';
      }
    });
  }

  grantTelegramConsent(): void {
    if (!this.telegramConsentVersion || this.isLoading) return;
    this.isLoading = true;
    this.errorMessage = null;
    this.sub = this.consentService.sendConsent({
      profileUserId: this.profileId,
      channel: ConsentChannel.Telegram,
      isGranted: true,
      consentTextVersion: this.telegramConsentVersion,
      source: 'settings',
    }).pipe(
      switchMap(result => {
        if (result.code !== 200) throw new Error('Consent was not saved');
        return this.consentService.getSubscribeLink(this.profileId, ConsentChannel.Telegram);
      }),
      timeout(15000),
    ).subscribe({
      next: result => {
        this.isLoading = false;
        this.telegramLink = result.link;
        this.telegramConsentVersion = null;
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Не удалось подготовить ссылку. Попробуйте снова.';
      }
    });
  }

  openTelegram(): void {
    if (!this.telegramLink) return;
    const link = this.telegramLink;
    const newWindow = window.open('about:blank', '_blank');
    if (newWindow) {
      newWindow.opener = null;
      newWindow.location.href = link;
    }
    this.activeModal.close(ConsentChannel.Telegram);
    if (!newWindow) window.location.assign(link);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
