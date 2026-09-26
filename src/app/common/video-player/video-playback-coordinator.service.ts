import { Inject, Injectable, NgZone, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

/**
 * Enforces a single active <video> across the whole app, Instagram-style:
 * the moment one video starts, every other one on the page is paused.
 *
 * It relies on a single capture-phase 'play' listener at the document level.
 * Media events (`play`) don't bubble, but they can be observed during the
 * capture phase, so ONE listener sees every <video> that starts — including
 * elements added later (feed items, gallery tiles, modal players) and raw
 * <video> tags that don't go through <app-video-player>. No per-component
 * wiring required.
 */
@Injectable({ providedIn: 'root' })
export class VideoPlaybackCoordinatorService {
  private readonly isBrowser: boolean;
  private installed = false;

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    @Inject(DOCUMENT) private document: Document,
    private ngZone: NgZone
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  /** Idempotent; safe to call from several places. No-op during SSR. */
  install(): void {
    if (this.installed || !this.isBrowser || !this.document) return;
    this.installed = true;

    // Pausing peers is pure DOM work with no view state to sync, so keep it
    // out of Angular's zone to avoid needless change-detection churn while a
    // long feed scrolls and videos warm up.
    this.ngZone.runOutsideAngular(() => {
      this.document.addEventListener('play', this.onAnyPlay, true);
    });
  }

  /** Останавливает все ролики на странице — перед модалкой, чтобы карточка не играла под окном. */
  pauseAll(): void {
    if (!this.isBrowser || !this.document) return;
    this.document.querySelectorAll('video').forEach(el => {
      if (!el.paused && !el.ended) {
        try {
          el.pause();
        } catch {
        }
      }
    });
  }

  private onAnyPlay = (event: Event): void => {
    const started = event.target;
    if (!(started instanceof HTMLVideoElement)) return;

    const videos = this.document.querySelectorAll<HTMLVideoElement>('video');
    videos.forEach(el => {
      if (el !== started && !el.paused && !el.ended) {
        try {
          el.pause();
        } catch {
        }
      }
    });
  };
}
