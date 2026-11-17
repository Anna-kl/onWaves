import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, flushMicrotasks, tick } from '@angular/core/testing';
import { PromoMediaKind } from '../../../DTO/enums/promoMediaKind';
import { IPromoMedia } from '../../../DTO/views/landing/IPromoMedia';
import { PromoMediaCarouselComponent } from './promo-media-carousel.component';
import { By } from '@angular/platform-browser';

@Component({ selector: 'app-video-player', template: '<video></video>' })
class VideoStubComponent {
  @Input() url = '';
  @Input() poster: string | null = null;
  @Input() compact = false;
  @Input() warmup = false;
  @Input() immersive = false;
  @Input() expandable = false;
  @Input() expandOnPlay = false;
  @Output() expand = new EventEmitter<void>();
  @Output() started = new EventEmitter<void>();
  @Output() unavailable = new EventEmitter<void>();
}

const image = (name: string): IPromoMedia => ({
  url: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/%3E#' + name,
  kind: PromoMediaKind.Image,
});

describe('Promo media carousel', () => {
  let fixture: ComponentFixture<PromoMediaCarouselComponent>;
  let component: PromoMediaCarouselComponent;
  let motion: MediaQueryList;
  let hidden: jasmine.Spy;
  let originalObserver: typeof IntersectionObserver;
  let disconnect: jasmine.Spy;

  beforeEach(async () => {
    motion = { matches: false, addEventListener: jasmine.createSpy(), removeEventListener: jasmine.createSpy() } as unknown as MediaQueryList;
    spyOn(window, 'matchMedia').and.returnValue(motion);
    hidden = spyOnProperty(document, 'hidden', 'get').and.returnValue(false);
    originalObserver = window.IntersectionObserver;
    disconnect = jasmine.createSpy('disconnect');
    window.IntersectionObserver = class {
      constructor(private callback: IntersectionObserverCallback) {}
      observe = () => this.callback([{ isIntersecting: true } as IntersectionObserverEntry], this as unknown as IntersectionObserver);
      disconnect = disconnect;
    } as unknown as typeof IntersectionObserver;
    await TestBed.configureTestingModule({
      imports: [CommonModule], declarations: [PromoMediaCarouselComponent, VideoStubComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(PromoMediaCarouselComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('media', [image('one'), image('two')]);
  });

  afterEach(() => {
    fixture.destroy();
    window.IntersectionObserver = originalObserver;
  });

  it('cycles while visible and pauses on hover and explicit pause', fakeAsync(() => {
    fixture.detectChanges(); flushMicrotasks();
    tick(6000); expect(component.activeIndex).toBe(1);
    component.hover(true); tick(12000); expect(component.activeIndex).toBe(1);
    component.hover(false); tick(6000); expect(component.activeIndex).toBe(0);
    component.togglePause(); tick(12000); expect(component.activeIndex).toBe(0);
    component.togglePause(); tick(6000); expect(component.activeIndex).toBe(1);
    fixture.destroy();
  }));

  it('keeps the chosen video slide while full-screen viewing is open', fakeAsync(() => {
    const video = { kind: PromoMediaKind.Video, url: '/video.mp4' };
    fixture.componentRef.setInput('media', [video, image('next')]);
    fixture.detectChanges(); flushMicrotasks();
    const expand = spyOn(component.videoExpand, 'emit');
    const player: VideoStubComponent = fixture.debugElement.query(By.directive(VideoStubComponent)).componentInstance;
    player.expand.emit();
    expect(expand).toHaveBeenCalledOnceWith(video);
    component.focusOut({ relatedTarget: null } as FocusEvent);
    tick(12000);
    expect(component.activeIndex).toBe(0);
    expect(component.paused).toBeTrue();
    fixture.destroy();
  }));

  it('does not advance while keyboard focus or a video is active', fakeAsync(() => {
    fixture.detectChanges(); flushMicrotasks();
    component.focusIn(); tick(6000); expect(component.activeIndex).toBe(0);
    component.focusOut({ relatedTarget: null } as FocusEvent);
    const root = fixture.nativeElement.querySelector('section');
    root.dispatchEvent(new Event('play')); tick(6000); expect(component.activeIndex).toBe(0);
    root.dispatchEvent(new Event('playing')); tick(6000); expect(component.activeIndex).toBe(0);
    root.dispatchEvent(new Event('ended')); tick(6000); expect(component.activeIndex).toBe(1);
    fixture.destroy();
  }));

  it('suspends in a hidden tab and starts a fresh interval on return', fakeAsync(() => {
    fixture.detectChanges(); flushMicrotasks();
    hidden.and.returnValue(true); document.dispatchEvent(new Event('visibilitychange'));
    tick(12000); expect(component.activeIndex).toBe(0);
    hidden.and.returnValue(false); document.dispatchEvent(new Event('visibilitychange'));
    tick(5999); expect(component.activeIndex).toBe(0);
    tick(1); expect(component.activeIndex).toBe(1);
    fixture.destroy();
  }));

  it('respects reduced motion and still allows manual navigation', fakeAsync(() => {
    Object.defineProperty(motion, 'matches', { value: true });
    fixture.detectChanges(); flushMicrotasks(); fixture.detectChanges();
    tick(18000); expect(component.activeIndex).toBe(0);
    fixture.nativeElement.querySelector('[aria-label="Следующий слайд"]').click();
    expect(component.activeIndex).toBe(1);
    expect(fixture.nativeElement.querySelector('.promo-carousel__pause')).toBeNull();
    fixture.destroy();
  }));

  it('keeps the current slide for unchanged input and resets for a new offer', fakeAsync(() => {
    fixture.detectChanges(); flushMicrotasks(); component.select(1);
    fixture.componentRef.setInput('media', [image('one'), image('two')]); fixture.detectChanges();
    expect(component.activeIndex).toBe(1);
    fixture.componentRef.setInput('media', [image('three')]); fixture.detectChanges();
    expect(component.activeIndex).toBe(0);
    expect(fixture.nativeElement.querySelector('.promo-carousel__controls')).toBeNull();
    tick(12000); expect(component.activeIndex).toBe(0);
    fixture.destroy();
  }));

  it('removes broken media without looping or leaving a broken frame', fakeAsync(() => {
    fixture.detectChanges(); flushMicrotasks();
    component.removeUnavailable(); fixture.detectChanges();
    expect(component.active?.url).toBe(image('two').url);
    component.removeUnavailable(); fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.promo-carousel__stage')).toBeNull();
    tick(12000); expect(component.slides.length).toBe(0);
    fixture.destroy();
  }));

  it('releases browser observers and timers on navigation away', fakeAsync(() => {
    fixture.detectChanges(); flushMicrotasks();
    fixture.destroy(); tick(12000);
    expect(component.activeIndex).toBe(0);
    expect(disconnect).toHaveBeenCalled();
    expect(motion.removeEventListener).toHaveBeenCalled();
  }));

  it('renders on the server without browser APIs or a timer', fakeAsync(() => {
    const server = new PromoMediaCarouselComponent('server' as unknown as object, {} as Document, {} as NgZone);
    server.media = [image('one'), image('two')];
    server.ngOnChanges(); server.ngAfterViewInit(); tick(12000);
    expect(server.activeIndex).toBe(0);
    expect(window.matchMedia).not.toHaveBeenCalled();
    server.ngOnDestroy();
  }));
});
