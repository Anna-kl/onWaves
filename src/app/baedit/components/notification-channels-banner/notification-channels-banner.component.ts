import { Component, HostListener, Inject, Input, OnChanges, OnDestroy, PLATFORM_ID, SimpleChanges, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Subscription, switchMap, timeout } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConsentService, INotificationChannelsStatus } from 'src/services/consent.service';
import { NotificationChannelSelectModalComponent } from '../notification-channel-select-modal/notification-channel-select-modal.component';
import { ConsentChannel } from 'src/app/DTO/enums/consentChannel';

const DISMISS_KEY_PREFIX = 'consent-banner-dismissed-';
const DISMISS_FOR_MS = 7 * 24 * 60 * 60 * 1000;

@Component({
  selector: 'app-notification-channels-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-channels-banner.component.html',
  styleUrls: ['./notification-channels-banner.component.scss']
})
export class NotificationChannelsBannerComponent implements OnChanges, OnDestroy {
  @Input() profileId: string | null = null;
  @Input() telegramOnly = false;

  show = signal(false);
  waitingForTelegram = false;
  statusFailed = false;
  telegramSaving = false;
  warning = '';
  channelsStatus: INotificationChannelsStatus | null = null;
  private unsubscribe$: Subscription | null = null;
  private writeSub?: Subscription;

  constructor(
    private _consentService: ConsentService,
    private _modalService: NgbModal,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['profileId']) {
      this.unsubscribe$?.unsubscribe();
      this.writeSub?.unsubscribe();
      this.show.set(false);
      this.telegramSaving = false;
      this.warning = '';
      this.waitingForTelegram = false;
      this.statusFailed = false;
      this.channelsStatus = null;
      this.checkChannels();
    }
  }

  @HostListener('window:focus')
  @HostListener('document:visibilitychange')
  onReturn(): void {
    if (!this.telegramSaving && isPlatformBrowser(this.platformId) && document.visibilityState === 'visible') {
      this.checkChannels();
    }
  }

  checkChannels(): void {
    if (!isPlatformBrowser(this.platformId) || !this.profileId) {
      return;
    }
    this.unsubscribe$?.unsubscribe();
    this.unsubscribe$ = this._consentService.getNotificationChannelsStatus(this.profileId).subscribe({
      next: status => {
        this.statusFailed = false;
        this.channelsStatus = status;
        this.waitingForTelegram = !!status.telegramConnectionPending;
        const hasAny = status.telegram || status.vk || status.max;
        const setupNeeded = !status.telegram && (this.waitingForTelegram || status.telegramOwnConsent);
        this.show.set(this.telegramOnly || !!status.telegramExplicitlyDisabled || status.telegram ||
          !!setupNeeded || (!hasAny && !this.isRecentlyDismissed()));
      },
      error: () => {
        this.statusFailed = true;
        this.show.set(true);
      }
    });
  }

  private isRecentlyDismissed(): boolean {
    if (!isPlatformBrowser(this.platformId) || !this.profileId) {
      return false;
    }
    const dismissedAt = Number(localStorage.getItem(DISMISS_KEY_PREFIX + this.profileId) ?? 0);
    return Date.now() - dismissedAt < DISMISS_FOR_MS;
  }

  openChannelSelect(telegram = this.telegramOnly): void {
    if (!this.profileId || !this.channelsStatus) return;

    const modalRef = this._modalService.open(NotificationChannelSelectModalComponent, {
      centered: true,
      size: 'sm'
    });
    modalRef.componentInstance.profileId = this.profileId;
    modalRef.componentInstance.status = this.channelsStatus;
    if (telegram) modalRef.componentInstance.prepareTelegram();

    const profileId = this.profileId;
    modalRef.result.then(
      channel => {
        if (profileId !== this.profileId) return;
        if (channel === ConsentChannel.Telegram) {
          this.waitingForTelegram = true;
          this.checkChannels();
        } else {
          this.show.set(false);
        }
      },
      () => {}
    );
  }

  changeTelegram(enabled: boolean): void {
    const profileUserId = this.profileId;
    if (!profileUserId || this.telegramSaving) return;
    this.telegramSaving = true;
    this.warning = '';
    this.unsubscribe$?.unsubscribe();
    this.writeSub = this._consentService.getTextVersions().pipe(
      switchMap(versions => {
        if (!versions[0]) throw new Error('Missing consent version');
        return this._consentService.sendConsent({
          profileUserId, channel: ConsentChannel.Telegram, isGranted: enabled,
          consentTextVersion: versions[0], source: 'settings',
        });
      }),
      timeout(15000),
    ).subscribe({
      next: result => {
        this.telegramSaving = false;
        if (result.code !== 200) this.warning = 'Не удалось изменить уведомления Telegram.';
        this.checkChannels();
      },
      error: () => {
        this.telegramSaving = false;
        this.warning = 'Не удалось изменить уведомления Telegram.';
        this.checkChannels();
      },
    });
  }

  dismiss(): void {
    if (isPlatformBrowser(this.platformId) && this.profileId) {
      localStorage.setItem(DISMISS_KEY_PREFIX + this.profileId, String(Date.now()));
    }
    this.show.set(false);
  }

  ngOnDestroy(): void {
    this.unsubscribe$?.unsubscribe();
    this.writeSub?.unsubscribe();
  }
}
