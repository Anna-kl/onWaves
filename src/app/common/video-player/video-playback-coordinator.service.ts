import { Inject, Injectable, NgZone, OnDestroy, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

interface ViewportPlayer {
  host: HTMLElement;
  play: () => void;
  pause: () => void;
  visible: boolean;
  central: boolean;
  blocked: boolean;
}

/** Один активный ролик; задержка не даёт запускать карточки при быстром скролле. */
@Injectable({ providedIn: 'root' })
export class VideoPlaybackCoordinatorService implements OnDestroy {
  private readonly isBrowser: boolean;
  private installed = false;
  private players = new Map<HTMLVideoElement, ViewportPlayer>();
  // pause приходит асинхронно: отметка должна пережить смену источника и перерегистрацию.
  private expectedPauses = new WeakSet<HTMLVideoElement>();
  private observer?: IntersectionObserver;
  private motion?: MediaQueryList;
  private frame?: number;
  private timer?: ReturnType<typeof setTimeout>;
  private candidate?: HTMLVideoElement;
  private active?: HTMLVideoElement;
  private automatic?: HTMLVideoElement;

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    @Inject(DOCUMENT) private document: Document,
    private ngZone: NgZone
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  install(): void {
    const win = this.document.defaultView;
    if (this.installed || !this.isBrowser || !win) return;
    this.installed = true;
    this.ngZone.runOutsideAngular(() => {
      this.document.addEventListener('play', this.onAnyPlay, true);
      this.document.addEventListener('pause', this.onPause, true);
      this.document.addEventListener('ended', this.onEnded, true);
      this.document.addEventListener('visibilitychange', this.schedule);
      win.addEventListener('scroll', this.schedule, { passive: true, capture: true });
      win.addEventListener('resize', this.schedule, { passive: true });
      this.motion = win.matchMedia('(prefers-reduced-motion: reduce)');
      this.motion.addEventListener('change', this.schedule);
      if (typeof IntersectionObserver !== 'undefined') {
        this.observer = new IntersectionObserver(entries => {
          for (const entry of entries) {
            for (const player of this.players.values()) {
              if (player.host === entry.target) player.visible = entry.isIntersecting;
            }
          }
          this.schedule();
        });
      }
    });
  }

  register(video: HTMLVideoElement, host: HTMLElement, play: () => void, pause: () => void): () => void {
    this.install();
    if (!this.installed) return () => {};
    const player: ViewportPlayer = { host, play, pause, visible: !this.observer, central: false, blocked: false };
    this.players.set(video, player);
    this.observer?.observe(host);
    this.schedule();
    return () => {
      if (this.players.get(video) !== player) return;
      this.stop(video, player);
      this.observer?.unobserve(host);
      this.players.delete(video);
      if (this.active === video) this.active = undefined;
      if (this.candidate === video) this.cancelCandidate();
      this.schedule();
    };
  }

  /** Клик отменяет и воспроизведение, и незавершённую загрузку соседнего ролика. */
  claim(video: HTMLVideoElement, automatic = false): void {
    this.cancelCandidate();
    this.pauseOthers(video);
    this.active = video;
    this.automatic = automatic ? video : undefined;
  }

  /** Пауза сохраняется до ухода из видимой области, включая небольшие сдвиги при фокусировке. */
  block(video: HTMLVideoElement): void {
    const player = this.players.get(video);
    if (player) player.blocked = true;
    if (this.candidate === video) this.cancelCandidate();
    if (this.active === video) this.active = undefined;
  }

  /** Не возобновлять фоновый ролик под открытой галереей/модалкой. */
  pauseAll(): void {
    if (!this.isBrowser) return;
    this.cancelCandidate();
    for (const [video, player] of this.players) {
      if (player.central || this.active === video) player.blocked = true;
      this.stop(video, player);
    }
    this.pauseOthers();
    this.active = undefined;
  }

  ngOnDestroy(): void {
    this.cancelCandidate();
    this.observer?.disconnect();
    const win = this.document.defaultView;
    if (!this.installed || !win) return;
    if (this.frame !== undefined) win.cancelAnimationFrame(this.frame);
    this.document.removeEventListener('play', this.onAnyPlay, true);
    this.document.removeEventListener('pause', this.onPause, true);
    this.document.removeEventListener('ended', this.onEnded, true);
    this.document.removeEventListener('visibilitychange', this.schedule);
    win.removeEventListener('scroll', this.schedule, true);
    win.removeEventListener('resize', this.schedule);
    this.motion?.removeEventListener('change', this.schedule);
    this.players.clear();
  }

  private schedule = (): void => {
    const win = this.document.defaultView;
    if (!this.installed || !win || this.frame !== undefined) return;
    this.ngZone.runOutsideAngular(() => {
      this.frame = win.requestAnimationFrame(() => {
        this.frame = undefined;
        this.select();
      });
    });
  };

  private select(): void {
    const win = this.document.defaultView;
    if (!win) return;
    const saveData = (win.navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    const allowAutoplay = !this.document.hidden && !this.motion?.matches && !saveData;
    let nearest: HTMLVideoElement | undefined;
    let distance = Infinity;
    for (const [video, player] of this.players) {
      const rect = player.visible ? player.host.getBoundingClientRect() : null;
      const visibleHeight = rect ? Math.max(0, Math.min(rect.bottom, win.innerHeight) - Math.max(rect.top, 0)) : 0;
      const visibleWidth = rect ? Math.max(0, Math.min(rect.right, win.innerWidth) - Math.max(rect.left, 0)) : 0;
      const ratio = rect && rect.height * rect.width > 0 ? visibleHeight * visibleWidth / (rect.height * rect.width) : 0;
      const delta = rect ? Math.abs((rect.top + rect.bottom) / 2 - win.innerHeight / 2) : Infinity;
      const central = ratio >= 0.6 && delta <= win.innerHeight * 0.2;
      if (ratio < 0.6) player.blocked = false;
      player.central = central;
      if (this.document.hidden || ratio < 0.6 || (this.active === video && !central) || (!allowAutoplay && this.automatic === video)) this.stop(video, player);
      if (central && !player.blocked && allowAutoplay && delta < distance) {
        nearest = video;
        distance = delta;
      }
    }
    if (!allowAutoplay) {
      this.cancelCandidate();
      return;
    }
    if (nearest === this.active && nearest) {
      this.cancelCandidate();
      return;
    }
    if (nearest === this.candidate) return;
    this.cancelCandidate();
    if (!nearest) return;
    this.candidate = nearest;
    this.ngZone.runOutsideAngular(() => {
      this.timer = setTimeout(() => {
        const video = this.candidate;
        this.timer = undefined;
        this.candidate = undefined;
        const player = video && this.players.get(video);
        if (!video || !player || !player.central || player.blocked || this.document.hidden) return;
        this.claim(video, true);
        player.play();
      }, 300);
    });
  }

  private cancelCandidate(): void {
    if (this.timer !== undefined) clearTimeout(this.timer);
    this.timer = undefined;
    this.candidate = undefined;
  }

  private stop(video: HTMLVideoElement, player: ViewportPlayer): void {
    if (video.paused && this.active !== video) return;
    if (!video.paused) this.expectedPauses.add(video);
    player.pause();
    if (this.active === video) this.active = undefined;
    if (this.automatic === video) this.automatic = undefined;
  }

  private pauseOthers(except?: HTMLVideoElement): void {
    for (const [video, player] of this.players) {
      if (video !== except) this.stop(video, player);
    }
    this.document.querySelectorAll('video').forEach(video => {
      if (video !== except && !video.paused) video.pause();
    });
  }

  private onAnyPlay = (event: Event): void => {
    const video = event.target as HTMLVideoElement | null;
    if (video?.tagName !== 'VIDEO' || video.paused) return;
    if (this.active !== video) this.claim(video);
    else this.pauseOthers(video);
  };

  private onPause = (event: Event): void => {
    const video = event.target as HTMLVideoElement;
    if (this.expectedPauses.delete(video)) return;
    if (this.players.has(video)) this.block(video);
  };

  private onEnded = (event: Event): void => this.block(event.target as HTMLVideoElement);
}
