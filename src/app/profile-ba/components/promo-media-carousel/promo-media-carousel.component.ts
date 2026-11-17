import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, Input, NgZone, OnChanges, OnDestroy, Output, PLATFORM_ID, ViewChild } from '@angular/core';
import { PromoMediaKind } from '../../../DTO/enums/promoMediaKind';
import { IPromoMedia } from '../../../DTO/views/landing/IPromoMedia';

@Component({
  selector: 'app-promo-media-carousel',
  templateUrl: './promo-media-carousel.component.html',
  styleUrls: ['./promo-media-carousel.component.scss'],
})
export class PromoMediaCarouselComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input() media: IPromoMedia[] = [];
  @Input() title = 'Фото и видео акции';
  @Output() videoStart = new EventEmitter<string>();
  @Output() videoExpand = new EventEmitter<IPromoMedia>();
  @ViewChild('root', { static: true }) private root!: ElementRef<HTMLElement>;

  readonly mediaKind = PromoMediaKind;
  slides: IPromoMedia[] = [];
  activeIndex = 0;
  paused = false;
  reducedMotion = false;
  private signature = '';
  private initialized = false;
  private hovered = false;
  private focused = false;
  private visible = false;
  private playing = false;
  private pointer: { x: number; y: number } | null = null;
  private timer: ReturnType<typeof setInterval> | null = null;
  private observer?: IntersectionObserver;
  private motionQuery?: MediaQueryList;
  private readonly browser: boolean;

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    @Inject(DOCUMENT) private document: Document,
    private zone: NgZone,
  ) {
    this.browser = isPlatformBrowser(platformId);
  }

  get active(): IPromoMedia | undefined {
    return this.slides[this.activeIndex];
  }

  ngOnChanges(): void {
    const unique = this.media.filter((item, index, all) => item?.url &&
      (item.kind === PromoMediaKind.Image || item.kind === PromoMediaKind.Video) &&
      all.findIndex(other => other.url === item.url) === index);
    const signature = JSON.stringify(unique);
    if (signature === this.signature) return;
    this.signature = signature;
    this.slides = unique;
    this.activeIndex = 0;
    this.playing = false;
    this.syncTimer();
  }

  ngAfterViewInit(): void {
    if (!this.browser) return;
    this.initialized = true;
    this.motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    Promise.resolve().then(() => {
      if (!this.initialized) return;
      this.reducedMotion = this.motionQuery?.matches ?? false;
      this.syncTimer();
    });
    this.motionQuery.addEventListener('change', this.onMotionChange);
    this.document.addEventListener('visibilitychange', this.onVisibilityChange);
    const root = this.root.nativeElement;
    // События media не всплывают; capture видит play/pause штатного видеоплеера.
    root.addEventListener('playing', this.onPlaying, true);
    root.addEventListener('play', this.onPlaying, true);
    root.addEventListener('pause', this.onStopped, true);
    root.addEventListener('ended', this.onStopped, true);
    this.zone.runOutsideAngular(() => {
      if (typeof IntersectionObserver === 'undefined') {
        this.visible = true;
        this.syncTimer();
        return;
      }
      this.observer = new IntersectionObserver(entries => {
        this.visible = entries[0]?.isIntersecting ?? false;
        this.syncTimer();
      }, { threshold: 0.25 });
      this.observer.observe(root);
    });
  }

  ngOnDestroy(): void {
    this.clearTimer();
    this.observer?.disconnect();
    if (!this.initialized) return;
    this.motionQuery?.removeEventListener('change', this.onMotionChange);
    this.document.removeEventListener('visibilitychange', this.onVisibilityChange);
    const root = this.root.nativeElement;
    root.removeEventListener('playing', this.onPlaying, true);
    root.removeEventListener('play', this.onPlaying, true);
    root.removeEventListener('pause', this.onStopped, true);
    root.removeEventListener('ended', this.onStopped, true);
    this.initialized = false;
  }

  select(index: number): void {
    if (!this.slides.length) return;
    this.activeIndex = (index + this.slides.length) % this.slides.length;
    this.playing = false;
    this.syncTimer();
  }

  togglePause(): void {
    this.paused = !this.paused;
    this.syncTimer();
  }

  expandVideo(item: IPromoMedia): void {
    // После паузы встроенного ролика слайд должен дождаться возвращения из просмотра.
    this.paused = true;
    this.syncTimer();
    this.videoExpand.emit(item);
  }

  hover(value: boolean): void {
    this.hovered = value;
    this.syncTimer();
  }

  focusIn(): void {
    this.focused = true;
    this.syncTimer();
  }

  focusOut(event: FocusEvent): void {
    this.focused = event.relatedTarget instanceof Node && this.root.nativeElement.contains(event.relatedTarget);
    this.syncTimer();
  }

  onKey(event: KeyboardEvent): void {
    // Стрелки внутри видеоплеера остаются управлением самим видео.
    if ((event.target as HTMLElement).closest('app-video-player')) return;
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    this.select(this.activeIndex + (event.key === 'ArrowLeft' ? -1 : 1));
  }

  pointerDown(event: PointerEvent): void {
    if (!event.isPrimary || event.button !== 0 || this.active?.kind !== PromoMediaKind.Image) return;
    this.pointer = { x: event.clientX, y: event.clientY };
  }

  pointerUp(event: PointerEvent): void {
    const start = this.pointer;
    this.pointer = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      this.select(this.activeIndex + (dx < 0 ? 1 : -1));
    }
  }

  cancelPointer(): void {
    this.pointer = null;
  }

  removeUnavailable(): void {
    this.slides = this.slides.filter((_, index) => index !== this.activeIndex);
    this.activeIndex = Math.min(this.activeIndex, Math.max(0, this.slides.length - 1));
    this.playing = false;
    this.syncTimer();
  }

  private readonly onPlaying = () => {
    this.playing = true;
    this.syncTimer();
  };
  private readonly onStopped = () => {
    this.playing = false;
    this.syncTimer();
  };
  private readonly onVisibilityChange = () => this.syncTimer();
  private readonly onMotionChange = (event: MediaQueryListEvent) => {
    this.zone.run(() => {
      this.reducedMotion = event.matches;
      this.syncTimer();
    });
  };

  private syncTimer(): void {
    this.clearTimer();
    if (!this.initialized || this.slides.length < 2 || this.paused || this.reducedMotion ||
        this.hovered || this.focused || this.playing || !this.visible || this.document.hidden) return;
    // Таймер вне Angular не задерживает стабилизацию приложения и гидрацию.
    this.zone.runOutsideAngular(() => {
      this.timer = setInterval(() => this.zone.run(() => this.select(this.activeIndex + 1)), 6000);
    });
  }

  private clearTimer(): void {
    if (this.timer !== null) clearInterval(this.timer);
    this.timer = null;
  }
}
