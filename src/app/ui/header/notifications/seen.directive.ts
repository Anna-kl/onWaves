import {
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
  SimpleChanges,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({ selector: '[seen]' })
export class SeenDirective implements OnInit, OnChanges, OnDestroy {
  @Input() seenId!: string;
  @Input() seenThreshold = 0.5;
  @Input() seenDelayMs = 800;
  @Input() seenEnabled = true;
  @Output() seenOnce = new EventEmitter<string>();

  private io?: IntersectionObserver;
  private t?: number;
  private fired = false;

  constructor(
    private el: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit(): void {
    this.tryStart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['seenEnabled']?.currentValue === false) {
      this.disconnect();
    }
  }

  private tryStart(): void {
    if (!isPlatformBrowser(this.platformId) || !this.seenEnabled || !this.seenId || this.fired) {
      return;
    }
    this.io = new IntersectionObserver(([entry]) => {
      if (this.fired) {
        return;
      }
      if (entry.isIntersecting && entry.intersectionRatio >= this.seenThreshold) {
        this.t = window.setTimeout(() => {
          if (!this.fired) {
            this.fired = true;
            this.seenOnce.emit(this.seenId);
            this.disconnect();
          }
        }, this.seenDelayMs);
      } else if (this.t) {
        clearTimeout(this.t);
        this.t = undefined;
      }
    }, { threshold: [this.seenThreshold] });

    this.io.observe(this.el.nativeElement);
  }

  private disconnect(): void {
    this.io?.disconnect();
    this.io = undefined;
    if (this.t) {
      clearTimeout(this.t);
      this.t = undefined;
    }
  }

  ngOnDestroy(): void {
    this.disconnect();
  }
}
