import { Component, Inject, Input, OnChanges, OnDestroy, PLATFORM_ID, SimpleChanges, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConsentService, INotificationChannelsStatus } from 'src/services/consent.service';
import { NotificationChannelSelectModalComponent } from '../notification-channel-select-modal/notification-channel-select-modal.component';

const DISMISS_KEY_PREFIX = 'consent-banner-dismissed-';
const DISMISS_FOR_MS = 7 * 24 * 60 * 60 * 1000;

@Component({
  selector: 'app-notification-channels-banner',
  templateUrl: './notification-channels-banner.component.html',
  styleUrls: ['./notification-channels-banner.component.scss']
})
export class NotificationChannelsBannerComponent implements OnChanges, OnDestroy {
  @Input() profileId: string | null = null;

  show = signal(false);
  private channelsStatus: INotificationChannelsStatus | null = null;
  private unsubscribe$: Subscription | null = null;

  constructor(
    private _consentService: ConsentService,
    private _modalService: NgbModal,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['profileId'] && this.profileId) {
      this.checkChannels();
    }
  }

  private checkChannels(): void {
    if (!this.profileId || this.isRecentlyDismissed()) {
      return;
    }
    this.unsubscribe$?.unsubscribe();
    this.unsubscribe$ = this._consentService.getNotificationChannelsStatus(this.profileId).subscribe({
      next: status => {
        this.channelsStatus = status;
        const hasAny = status.telegram || status.vk || status.max;
        this.show.set(!hasAny);
      },
      error: () => this.show.set(false)
    });
  }

  private isRecentlyDismissed(): boolean {
    if (!isPlatformBrowser(this.platformId) || !this.profileId) {
      return false;
    }
    const dismissedAt = Number(localStorage.getItem(DISMISS_KEY_PREFIX + this.profileId) ?? 0);
    return Date.now() - dismissedAt < DISMISS_FOR_MS;
  }

  openChannelSelect(): void {
    if (!this.profileId || !this.channelsStatus) return;

    const modalRef = this._modalService.open(NotificationChannelSelectModalComponent, {
      centered: true,
      size: 'sm'
    });
    modalRef.componentInstance.profileId = this.profileId;
    modalRef.componentInstance.status = this.channelsStatus;

    modalRef.result.then(
      () => this.show.set(false),
      () => {}
    );
  }

  dismiss(): void {
    if (isPlatformBrowser(this.platformId) && this.profileId) {
      localStorage.setItem(DISMISS_KEY_PREFIX + this.profileId, String(Date.now()));
    }
    this.show.set(false);
  }

  ngOnDestroy(): void {
    this.unsubscribe$?.unsubscribe();
  }
}
