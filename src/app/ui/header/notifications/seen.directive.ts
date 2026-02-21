import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";

@Directive({ selector: '[seen]' })
export class SeenDirective implements OnInit, OnDestroy {
  @Input() seenId!: string;            // id уведомления
  @Input() seenThreshold = 0.5;        // доля площади
  @Input() seenDelayMs = 800;          // задержка
  @Output() seenOnce = new EventEmitter<string>();

  private io?: IntersectionObserver;
  private t?: number;
  private fired = false;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit() {
    this.io = new IntersectionObserver(([entry]) => {
      if (this.fired) return;
      if (entry.isIntersecting && entry.intersectionRatio >= this.seenThreshold) {
        this.t = window.setTimeout(() => {
          if (!this.fired) {
            this.fired = true;
            this.seenOnce.emit(this.seenId);
          }
        }, this.seenDelayMs);
      } else if (this.t) {
        clearTimeout(this.t); this.t = undefined;
      }
    }, { threshold: [this.seenThreshold] });

    this.io.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    this.io?.disconnect();
    if (this.t) clearTimeout(this.t);
  }
}
