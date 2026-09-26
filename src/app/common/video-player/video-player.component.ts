import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  Output,
  PLATFORM_ID,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FALLBACK_VIDEO_POSTER } from '../../../helpers/common/media.helpers';

type PlayerState = 'idle' | 'warming' | 'metadata' | 'ready' | 'loading' | 'playing' | 'error';

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
  /** Клик по играющему ролику (не по нативным контролам) — открыть крупнее. */
  @Input() expandable = false;
  /**
   * false — превью без воспроизведения: клик проходит насквозь, решение принимает карточка.
   * Нужно там, где ролик не смотрят, а выбирают — например в сетке галереи кабинета.
   */
  @Input() interactive = true;
  @Output() expand = new EventEmitter<void>();
  /** Первый успешный старт ролика. Один раз на источник — повтор и пауза не считаются. */
  @Output() started = new EventEmitter<void>();

  @ViewChild('hostEl') private hostElRef?: ElementRef<HTMLElement>;
  @ViewChild('videoEl') private videoRef?: ElementRef<HTMLVideoElement>;

  state: PlayerState = 'idle';
  hasFirstFrame = false;
  /** Доля загруженного ролика в процентах; null — пока длительность неизвестна. */
  loadedPercent: number | null = null;

  private readonly isBrowser: boolean;
  private browserInitialized = false;
  private destroyed = false;
  private hasSource = false;
  private pendingPlay = false;
  private startReported = false;
  private operationId = 0;
  private playAttempt?: Promise<void>;
  private warmupObserver?: IntersectionObserver;

  get visiblePoster(): string | null {
    if (this.poster?.trim()) return this.poster.trim();
    return this.hasFirstFrame ? null : FALLBACK_VIDEO_POSTER;
  }

  /** Текст под спиннером: с процентом, когда его можно посчитать. */
  get loadingLabel(): string {
    return this.loadedPercent === null
      ? 'Видео загружается…'
      : `Видео загружается… ${this.loadedPercent}%`;
  }

  get playLabel(): string {
    if (!this.interactive) return 'Открыть видео';
    if (this.state === 'error') return 'Повторить загрузку видео';
    if (this.state === 'playing' && this.expandable) return 'Открыть видео';
    return 'Воспроизвести видео';
  }

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    private ngZone: NgZone
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('url' in changes) {
      this.operationId++;
      this.pendingPlay = false;
      this.playAttempt = undefined;
      this.hasFirstFrame = false;
      this.loadedPercent = null;
      // Сброс только здесь: повтор после ошибки — тот же ролик, второе событие не нужно.
      this.startReported = false;
      this.state = 'idle';

      if (this.browserInitialized) {
        this.resetMediaElement();
        this.observeForWarmup();
      }
      return;
    }

    if (this.browserInitialized && ('eager' in changes || 'warmup' in changes || 'autoplay' in changes)) {
      this.observeForWarmup();
    }
  }

  ngAfterViewInit(): void {
    // Angular Universal creates a DOM-like video node, but it is not an
    // HTMLMediaElement. Media APIs must never be called during SSR.
    if (!this.isBrowser || this.destroyed || !this.videoRef) return;

    this.browserInitialized = true;
    const video = this.videoRef.nativeElement;
    video.addEventListener('loadedmetadata', this.onLoadedMetadata);
    video.addEventListener('loadeddata', this.onFrameAvailable);
    video.addEventListener('canplay', this.onCanPlay);
    video.addEventListener('playing', this.onPlaying);
    video.addEventListener('pause', this.onPause);
    video.addEventListener('error', this.onError);
    video.addEventListener('progress', this.onProgress);
    video.addEventListener('durationchange', this.onProgress);
    video.addEventListener('timeupdate', this.onProgress);

    this.observeForWarmup();
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    this.operationId++;
    this.pendingPlay = false;
    this.playAttempt = undefined;
    this.disconnectObserver();

    if (!this.browserInitialized || !this.videoRef) return;

    const video = this.videoRef.nativeElement;
    video.removeEventListener('loadedmetadata', this.onLoadedMetadata);
    video.removeEventListener('loadeddata', this.onFrameAvailable);
    video.removeEventListener('canplay', this.onCanPlay);
    video.removeEventListener('playing', this.onPlaying);
    video.removeEventListener('pause', this.onPause);
    video.removeEventListener('error', this.onError);
    video.removeEventListener('progress', this.onProgress);
    video.removeEventListener('durationchange', this.onProgress);
    video.removeEventListener('timeupdate', this.onProgress);
    this.releaseMediaElement(video);
    this.browserInitialized = false;
  }

  onPlayClick(event: Event): void {
    // Превью без воспроизведения: событие не гасим, пусть его обработает карточка снаружи.
    if (!this.interactive) return;

    event.preventDefault();
    event.stopPropagation();

    if (!this.browserInitialized || this.destroyed) return;

    if (this.state === 'playing' && this.expandable) {
      this.pausePlayback();
      this.expand.emit();
      return;
    }

    if (this.state === 'loading' || this.state === 'playing') return;
    if (!this.normalizedUrl) return;

    if (this.state === 'error') {
      this.resetMediaElement();
    }

    this.pendingPlay = true;
    this.state = 'loading';
    if (!this.ensureSource(true)) {
      this.fail('video-load-failed');
      return;
    }

    this.tryPlay();
  }

  pausePlayback(): void {
    this.pendingPlay = false;
    this.playAttempt = undefined;
    const video = this.video;
    if (video) {
      try {
        if (typeof video.pause === 'function') video.pause();
      } catch {
      }
      video.controls = false;
    }
    if (this.state === 'playing' || this.state === 'loading') {
      this.state = this.hasSource ? 'ready' : 'idle';
    }
  }

  private get normalizedUrl(): string {
    return this.url?.trim() ?? '';
  }

  private get video(): HTMLVideoElement | null {
    return this.browserInitialized && this.videoRef ? this.videoRef.nativeElement : null;
  }

  private observeForWarmup(): void {
    this.disconnectObserver();
    if (!this.browserInitialized || this.destroyed || !this.normalizedUrl || !this.warmup) return;

    if (this.autoplay || this.eager) {
      this.ensureSource(this.autoplay || this.eager);
      return;
    }

    if (typeof IntersectionObserver === 'undefined' || !this.hostElRef) {
      this.ensureSource(false);
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      this.warmupObserver = new IntersectionObserver(entries => {
        if (!entries.some(entry => entry.isIntersecting)) return;

        this.ngZone.run(() => this.ensureSource(false));
        this.disconnectObserver();
      }, {
        root: null,
        rootMargin: '240px 0px',
        threshold: 0.01
      });

      this.warmupObserver.observe(this.hostElRef!.nativeElement);
    });
  }

  private disconnectObserver(): void {
    this.warmupObserver?.disconnect();
    this.warmupObserver = undefined;
  }

  private ensureSource(forPlayback: boolean): boolean {
    const video = this.video;
    const url = this.normalizedUrl;
    if (!video || !url || this.destroyed) return false;

    if (this.hasSource && video.getAttribute('src') === url) {
      if (forPlayback) video.preload = 'auto';
      return true;
    }

    this.hasSource = true;
    this.state = this.pendingPlay ? 'loading' : 'warming';
    video.preload = forPlayback ? 'auto' : 'metadata';

    try {
      video.src = url;
      this.safeLoad(video);
      return true;
    } catch {
      this.hasSource = false;
      return false;
    }
  }

  private resetMediaElement(): void {
    this.operationId++;
    this.disconnectObserver();
    this.pendingPlay = false;
    this.playAttempt = undefined;
    this.hasSource = false;
    this.hasFirstFrame = false;
    this.loadedPercent = null;
    this.state = 'idle';

    const video = this.video;
    if (!video) return;

    video.controls = false;
    this.releaseMediaElement(video);
  }

  private releaseMediaElement(video: HTMLVideoElement): void {
    // Cleanup is deliberately tolerant: browsers and DOM emulators expose
    // different subsets of HTMLMediaElement methods.
    try {
      if (typeof video.pause === 'function') video.pause();
    } catch {
    }

    video.removeAttribute('src');
    this.safeLoad(video);
  }

  private safeLoad(video: HTMLVideoElement): void {
    try {
      if (typeof video.load === 'function') video.load();
    } catch {
    }
  }

  private onLoadedMetadata = (): void => {
    if (this.destroyed || !this.normalizedUrl) return;
    if (!this.pendingPlay && this.state !== 'playing') this.state = 'metadata';
    this.playPendingIfNeeded();
  };

  private onFrameAvailable = (): void => {
    if (this.destroyed || !this.normalizedUrl) return;
    this.hasFirstFrame = true;
    if (!this.pendingPlay && this.state !== 'playing') this.state = 'ready';
    this.playPendingIfNeeded();
  };

  private onCanPlay = (): void => {
    if (this.destroyed || !this.normalizedUrl) return;
    this.hasFirstFrame = true;
    if (!this.pendingPlay && this.state !== 'playing') this.state = 'ready';

    if (this.autoplay && this.state !== 'playing') {
      this.pendingPlay = true;
      this.state = 'loading';
    }
    this.playPendingIfNeeded();
  };

  private onPlaying = (): void => {
    if (this.destroyed) return;
    this.pendingPlay = false;
    this.state = 'playing';
    const video = this.video;
    if (video) video.controls = true;

    if (!this.startReported) {
      this.startReported = true;
      this.started.emit();
    }
  };

  private onPause = (): void => {
    if (this.destroyed || !this.hasSource || this.pendingPlay) return;
    if (this.state === 'playing') this.state = 'ready';
  };

  /**
   * Прогресс загрузки: сколько секунд ролика уже в буфере от текущей позиции.
   * Это единственный измеримый признак «грузится, а не сломалось» — без него
   * ожидание в 10+ секунд на медленной сети читается как отказ.
   */
  private onProgress = (): void => {
    if (this.destroyed) return;
    const percent = this.bufferedPercent();
    if (percent === this.loadedPercent) return;
    this.loadedPercent = percent;
  };

  private bufferedPercent(): number | null {
    const video = this.video;
    if (!video) return null;

    const duration = video.duration;
    if (!Number.isFinite(duration) || duration <= 0) return null;

    const buffered = video.buffered;
    if (!buffered || buffered.length === 0) return 0;

    const position = video.currentTime;
    let end = 0;
    for (let i = 0; i < buffered.length; i++) {
      if (buffered.start(i) <= position + 0.25) end = Math.max(end, buffered.end(i));
    }

    return Math.min(100, Math.max(0, Math.round((end / duration) * 100)));
  }

  private onError = (): void => {
    if (this.destroyed || !this.normalizedUrl) return;
    this.ngZone.run(() => this.fail(this.describeMediaError()));
  };

  private playPendingIfNeeded(): void {
    if (!this.pendingPlay || this.state === 'playing') return;
    this.tryPlay();
  }

  private tryPlay(): void {
    const video = this.video;
    if (!video || !this.pendingPlay || this.playAttempt || !this.normalizedUrl) return;

    const operationId = this.operationId;
    let playAttempt: Promise<void>;
    try {
      playAttempt = Promise.resolve(video.play());
      this.playAttempt = playAttempt;
    } catch {
      this.fail('video-play-failed');
      return;
    }

    playAttempt
      .then(() => {
        if (!this.isCurrentOperation(operationId)) return;
        this.ngZone.run(() => this.onPlaying());
      })
      .catch((error: unknown) => {
        if (!this.isCurrentOperation(operationId)) return;

        this.ngZone.run(() => {
          const currentVideo = this.video;
          if (!currentVideo || !this.pendingPlay) return;

          if (currentVideo.error) {
            this.fail(this.describeMediaError());
            return;
          }

          if (this.shouldWaitForPlayableData(error, currentVideo)) {
            this.state = 'loading';
            return;
          }

          this.pendingPlay = false;
          this.state = this.hasSource ? 'ready' : 'idle';
        });
      })
      .finally(() => {
        if (this.isCurrentOperation(operationId)) this.playAttempt = undefined;
      });
  }

  private isCurrentOperation(operationId: number): boolean {
    return !this.destroyed && operationId === this.operationId;
  }

  private fail(_reason: string): void {
    this.pendingPlay = false;
    this.playAttempt = undefined;
    this.hasSource = false;
    this.loadedPercent = null;
    this.state = 'error';
  }

  private shouldWaitForPlayableData(error: unknown, video: HTMLVideoElement): boolean {
    const name = error instanceof DOMException ? error.name : '';
    if (name === 'NotAllowedError' || name === 'NotSupportedError') return false;
    if (video.readyState < video.HAVE_FUTURE_DATA) return true;
    return name === 'AbortError';
  }

  private describeMediaError(): string {
    const code = this.video?.error?.code;
    switch (code) {
      case 1: return 'video-load-aborted';
      case 2: return 'video-network-error';
      case 3: return 'video-decode-error';
      case 4: return 'video-source-not-supported';
      default: return 'video-load-error';
    }
  }
}
