import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { Subscription } from 'rxjs';
import { FALLBACK_VIDEO_POSTER } from '../../../helpers/common/media.helpers';
import { VideoPreloadService, VideoPreloadState, VideoPreloadStatus } from './video-preload.service';

type PlayerState = VideoPreloadStatus | 'loading';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() url!: string;
  @Input() poster: string | null = null;
  @Input() compact = false;
  @Input() warmup = true;
  @Input() autoplay = false;
  @Input() eager = false;

  @ViewChild('hostEl') private hostElRef!: ElementRef<HTMLElement>;
  @ViewChild('videoEl') private videoRef!: ElementRef<HTMLVideoElement>;

  state: PlayerState = 'idle';
  hasFirstFrame = false;

  private hasSource = false;
  private viewReady = false;
  private pendingPlay = false;
  private playAttempt?: Promise<void>;
  private warmupObserver?: IntersectionObserver;
  private preloadSubscription?: Subscription;

  private get v(): HTMLVideoElement {
    return this.videoRef.nativeElement;
  }

  get visiblePoster(): string | null {
    if (this.poster?.trim()) return this.poster.trim();
    return this.hasFirstFrame ? null : FALLBACK_VIDEO_POSTER;
  }

  constructor(
    private ngZone: NgZone,
    private videoPreload: VideoPreloadService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('url' in changes) {
      if (this.viewReady) {
        this.resetElementForNewUrl();
      }

      this.bindPreloadState();

      if (this.viewReady) {
        this.observeForWarmup();
      }
    }

    if (this.viewReady && ('eager' in changes || 'warmup' in changes || 'autoplay' in changes)) {
      this.observeForWarmup();
    }
  }

  ngAfterViewInit(): void {
    this.viewReady = true;
    this.v.addEventListener('loadedmetadata', this.onLoadedMetadata);
    this.v.addEventListener('loadeddata', this.onFrameAvailable);
    this.v.addEventListener('canplay', this.onCanPlay);
    this.v.addEventListener('error', this.onError);

    this.bindPreloadState();
    this.observeForWarmup();
  }

  ngOnDestroy(): void {
    this.pendingPlay = false;
    this.preloadSubscription?.unsubscribe();
    this.warmupObserver?.disconnect();
    if (!this.videoRef) return;

    this.v.removeEventListener('loadedmetadata', this.onLoadedMetadata);
    this.v.removeEventListener('loadeddata', this.onFrameAvailable);
    this.v.removeEventListener('canplay', this.onCanPlay);
    this.v.removeEventListener('error', this.onError);

    this.v.pause();
    this.v.removeAttribute('src');
    this.v.load();
  }

  onPlayClick(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.state === 'loading' || this.state === 'playing') return;
    if (!this.url?.trim()) return;

    if (this.state === 'error') {
      this.prepareRetry();
    }

    if (!this.startWarmup()) {
      this.state = 'error';
      return;
    }

    this.pendingPlay = true;
    this.state = 'loading';
    this.tryPlay();
  }

  private bindPreloadState(): void {
    this.preloadSubscription?.unsubscribe();
    if (!this.url?.trim()) return;

    this.preloadSubscription = this.videoPreload.getState(this.url).subscribe(state => {
      this.ngZone.run(() => this.applyPreloadState(state));
    });
  }

  private applyPreloadState(state: VideoPreloadState): void {
    if (state.status === 'error') return;

    if (this.state !== 'loading' && this.state !== 'playing') {
      this.state = state.status === 'playing' ? 'ready' : state.status;
    }
  }

  private observeForWarmup(): void {
    this.warmupObserver?.disconnect();
    if (!this.viewReady || !this.url?.trim() || !this.warmup) return;

    if (this.autoplay || this.eager) {
      this.startWarmup();
      return;
    }

    if (!('IntersectionObserver' in window)) {
      this.startWarmup();
      return;
    }

    this.warmupObserver = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;

      this.ngZone.run(() => this.startWarmup());
      this.warmupObserver?.disconnect();
    }, {
      root: null,
      rootMargin: '360px 0px',
      threshold: 0.01
    });

    this.warmupObserver.observe(this.hostElRef.nativeElement);
  }

  private startWarmup(): boolean {
    if (!this.url?.trim()) return false;
    if (this.hasSource) return true;

    this.hasSource = true;
    this.v.preload = 'auto';

    if (this.v.getAttribute('src') !== this.url) {
      this.v.src = this.url;
    }

    this.videoPreload.markWarming(this.url);

    try {
      this.v.load();
      return true;
    } catch {
      this.hasSource = false;
      this.videoPreload.markError(this.url, 'video-load-failed');
      return false;
    }
  }

  private prepareRetry(): void {
    this.warmupObserver?.disconnect();
    this.hasSource = false;
    this.pendingPlay = false;
    this.playAttempt = undefined;
    this.state = 'idle';
    this.v.controls = false;
    this.v.pause();
    this.v.removeAttribute('src');
    this.v.load();
  }

  private resetElementForNewUrl(): void {
    this.warmupObserver?.disconnect();
    this.hasSource = false;
    this.hasFirstFrame = false;
    this.pendingPlay = false;
    this.playAttempt = undefined;
    this.state = 'idle';
    this.v.controls = false;
    this.v.pause();
    this.v.removeAttribute('src');
    this.v.load();
  }

  private onLoadedMetadata = (): void => {
    if (!this.url?.trim()) return;
    this.videoPreload.markMetadata(this.url);
    this.playPendingIfNeeded();

    if (this.poster?.trim()) return;
    if (this.pendingPlay) return;

    const video = this.v;
    if (video.readyState >= video.HAVE_CURRENT_DATA) {
      this.onFrameAvailable();
      return;
    }

    if (Number.isFinite(video.duration) && video.duration > 0 && video.currentTime === 0) {
      try {
        video.currentTime = Math.min(0.001, video.duration / 2);
      } catch {
      }
    }
  };

  private onFrameAvailable = (): void => {
    if (!this.url?.trim()) return;
    this.hasFirstFrame = true;
    this.videoPreload.markFirstFrame(this.url);
    this.playPendingIfNeeded();
  };

  private onCanPlay = (): void => {
    if (!this.url?.trim()) return;
    this.hasFirstFrame = true;
    this.videoPreload.markReady(this.url);
    this.playPendingIfNeeded();

    if (this.autoplay && this.state !== 'playing') {
      this.v.play().catch(() => {});
    }
  };

  private onError = (): void => {
    if (!this.url?.trim()) return;

    this.ngZone.run(() => {
      this.state = 'error';
      this.hasSource = false;
      this.pendingPlay = false;
      this.playAttempt = undefined;
      this.videoPreload.markError(this.url, this.describeMediaError());
    });
  };

  private playPendingIfNeeded(): void {
    if (!this.pendingPlay || this.state === 'playing') return;
    this.tryPlay();
  }

  private tryPlay(): void {
    if (!this.pendingPlay || this.playAttempt || !this.url?.trim()) return;

    this.playAttempt = this.v.play();

    this.playAttempt
      .then(() => {
        this.ngZone.run(() => {
          this.pendingPlay = false;
          this.playAttempt = undefined;
          this.state = 'playing';
          this.v.controls = true;
          this.videoPreload.markPlaying(this.url);
        });
      })
      .catch(error => {
        this.ngZone.run(() => {
          this.playAttempt = undefined;

          if (!this.pendingPlay) return;

          if (this.v.error) {
            this.pendingPlay = false;
            this.state = 'error';
            this.hasSource = false;
            this.videoPreload.markError(this.url, this.describeMediaError());
            return;
          }

          if (this.shouldWaitForPlayableData(error)) {
            this.state = 'loading';
            return;
          }

          this.pendingPlay = false;
          this.state = this.hasSource ? 'ready' : 'idle';
        });
      });
  }

  private shouldWaitForPlayableData(error: unknown): boolean {
    const name = error instanceof DOMException ? error.name : '';
    if (name === 'NotAllowedError' || name === 'NotSupportedError') return false;
    if (this.v.readyState < this.v.HAVE_FUTURE_DATA) return true;

    return name === 'AbortError';
  }

  private describeMediaError(): string {
    const code = this.v.error?.code;

    switch (code) {
      case MediaError.MEDIA_ERR_ABORTED:
        return 'video-load-aborted';
      case MediaError.MEDIA_ERR_NETWORK:
        return 'video-network-error';
      case MediaError.MEDIA_ERR_DECODE:
        return 'video-decode-error';
      case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
        return 'video-source-not-supported';
      default:
        return 'video-load-error';
    }
  }
}
