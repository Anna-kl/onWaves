import {
  Component,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  signal,
  SimpleChanges
} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {BehaviorSubject, filter, Subscription} from 'rxjs';
import {NavigationEnd, Router} from '@angular/router';

import {PwaInstallService} from 'src/services/promtp.service';

export type InstallState = 'installed' | 'canPrompt' | 'prompting' | 'declined' | 'unsupported';

type BIPEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{outcome: 'accepted' | 'dismissed'}>;
};

@Component({
  selector: 'app-install-banner',
  templateUrl: './install-banner.component.html',
  styleUrls: ['./install-banner.component.scss']
})
export class InstallBannerComponent implements OnInit, OnChanges, OnDestroy {
  private static readonly DISMISS_DAYS = 3;

  @Input() isRegistered = false;

  readonly show = signal(false);
  readonly state$ = new BehaviorSubject<InstallState>('unsupported');

  private deferred?: BIPEvent;
  private readonly subscriptions = new Subscription();
  private isBookingRoute = false;
  private displayModeQuery?: MediaQueryList;

  private readonly onBeforeInstallPrompt = (event: Event): void => {
    event.preventDefault();
    this.deferred = event as BIPEvent;
    this.pwa.canPrompt.set(true);
    this.state$.next('canPrompt');
  };

  private readonly onAppInstalled = (): void => {
    this.deferred = undefined;
    this.pwa.canPrompt.set(false);
    localStorage.setItem('appinstalled', 'yes');
    this.state$.next('installed');
  };

  private readonly onDisplayModeChange = (event: MediaQueryListEvent): void => {
    if (event.matches) this.onAppInstalled();
  };

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: object,
    private readonly router: Router,
    private readonly pwa: PwaInstallService
  ) {
    if (!isPlatformBrowser(this.platformId)) return;

    if (this.isStandalone()) this.state$.next('installed');

    window.addEventListener('beforeinstallprompt', this.onBeforeInstallPrompt);
    window.addEventListener('appinstalled', this.onAppInstalled);
    this.displayModeQuery = window.matchMedia?.('(display-mode: standalone)');
    this.displayModeQuery?.addEventListener?.('change', this.onDisplayModeChange);
  }

  ngOnInit(): void {
    this.updateRouteState(this.router.url);
    this.subscriptions.add(
      this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
        this.updateRouteState((event as NavigationEnd).urlAfterRedirects);
      })
    );
    this.subscriptions.add(this.state$.subscribe(() => this.refreshVisibility()));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isRegistered']) this.refreshVisibility();
  }

  checkTime(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    const dismissedAt = Number(localStorage.getItem('pwa-install-dismissed') ?? 0);
    const recentlyDismissed = dismissedAt > 0 &&
      Date.now() - dismissedAt < InstallBannerComponent.DISMISS_DAYS * 24 * 60 * 60 * 1000;
    return !recentlyDismissed && localStorage.getItem('appinstalled') !== 'yes';
  }

  isStandalone(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    return window.matchMedia?.('(display-mode: standalone)').matches === true ||
      (navigator as Navigator & {standalone?: boolean}).standalone === true;
  }

  isIOS(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
  }

  promptInstall(): Promise<'accepted' | 'dismissed' | 'unavailable' | 'no-gesture'> {
    const event = this.deferred;
    if (!event) return Promise.resolve('unavailable');

    const activation = (navigator as Navigator & {userActivation?: {isActive: boolean}}).userActivation;
    if (activation && !activation.isActive) return Promise.resolve('no-gesture');

    this.deferred = undefined;
    this.pwa.canPrompt.set(false);
    this.state$.next('prompting');

    return event.prompt()
      .then(() => event.userChoice)
      .then(({outcome}) => outcome);
  }

  async install(): Promise<void> {
    this.show.set(false);
    try {
      const outcome = await this.promptInstall();
      if (outcome === 'accepted') {
        localStorage.setItem('appinstalled', 'yes');
        this.state$.next('installed');
      } else if (outcome === 'dismissed') {
        localStorage.setItem('pwa-install-dismissed', String(Date.now()));
        this.state$.next('declined');
      } else {
        this.refreshVisibility();
      }
    } catch {
      this.pwa.canPrompt.set(false);
      this.state$.next('unsupported');
    }
  }

  dismiss(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('pwa-install-dismissed', String(Date.now()));
    }
    this.state$.next('declined');
    this.show.set(false);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('beforeinstallprompt', this.onBeforeInstallPrompt);
      window.removeEventListener('appinstalled', this.onAppInstalled);
      this.displayModeQuery?.removeEventListener?.('change', this.onDisplayModeChange);
    }
    this.state$.complete();
  }

  private updateRouteState(url: string): void {
    this.isBookingRoute = /\/(choose-service|choose-date|confirm-record2?)(?:[/?#]|$)/.test(url);
    this.refreshVisibility();
  }

  private refreshVisibility(): void {
    this.show.set(
      this.isRegistered &&
      !this.isBookingRoute &&
      this.pwa.canPrompt() &&
      this.checkTime()
    );
  }
}
