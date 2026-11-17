import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, fakeAsync, flushMicrotasks } from '@angular/core/testing';
import { VideoPlayerComponent } from './video-player.component';
import { VideoPlaybackCoordinatorService } from './video-playback-coordinator.service';

describe('Viewport video player', () => {
  let fixture: ComponentFixture<VideoPlayerComponent>;
  let coordinator: jasmine.SpyObj<VideoPlaybackCoordinatorService>;
  let unregister: jasmine.Spy;
  let paused: boolean;
  let video: HTMLVideoElement;
  let play: jasmine.Spy;

  beforeEach(async () => {
    unregister = jasmine.createSpy();
    coordinator = jasmine.createSpyObj('playback', ['register', 'claim', 'block']);
    coordinator.register.and.returnValue(unregister);
    await TestBed.configureTestingModule({ imports: [CommonModule], declarations: [VideoPlayerComponent], providers: [{ provide: VideoPlaybackCoordinatorService, useValue: coordinator }] }).compileComponents();
    fixture = TestBed.createComponent(VideoPlayerComponent);
    fixture.componentRef.setInput('url', '/example.mp4');
    fixture.componentRef.setInput('warmup', false);
    video = fixture.nativeElement.querySelector('video');
    paused = true;
    spyOnProperty(video, 'paused', 'get').and.callFake(() => paused);
    spyOn(video, 'load');
    spyOn(video, 'pause').and.callFake(() => { paused = true; video.dispatchEvent(new Event('pause')); });
    play = spyOn(video, 'play').and.callFake(() => { paused = false; return Promise.resolve(); });
  });
  afterEach(() => fixture.destroy());

  it('autoplays muted even when metadata warmup is disabled, and reports the source once', fakeAsync(() => {
    const started = spyOn(fixture.componentInstance.started, 'emit');
    fixture.detectChanges();
    const start = coordinator.register.calls.mostRecent().args[2];
    start(); flushMicrotasks(); fixture.detectChanges();
    expect(video.muted).toBeTrue(); expect(play).toHaveBeenCalledTimes(1);
    expect(started).toHaveBeenCalledTimes(1);
    expect(fixture.nativeElement.querySelector('[aria-label="Приостановить видео"]')).not.toBeNull();
    const stop = coordinator.register.calls.mostRecent().args[3];
    stop(); start(); flushMicrotasks(); expect(started).toHaveBeenCalledTimes(1);
  }));

  it('offers manual play after browser rejection without removing the media', fakeAsync(() => {
    play.and.returnValue(Promise.reject(new DOMException('blocked', 'NotAllowedError')));
    const unavailable = spyOn(fixture.componentInstance.unavailable, 'emit');
    fixture.detectChanges(); coordinator.register.calls.mostRecent().args[2](); flushMicrotasks();
    expect(fixture.componentInstance.state).toBe('ready');
    expect(coordinator.block).toHaveBeenCalledWith(video); expect(unavailable).not.toHaveBeenCalled();
  }));

  it('cancels a pending start when scrolling away', fakeAsync(() => {
    let finish!: () => void;
    play.and.returnValue(new Promise<void>(resolve => finish = resolve));
    fixture.detectChanges();
    const args = coordinator.register.calls.mostRecent().args;
    args[2](); args[3](); finish(); flushMicrotasks();
    expect(fixture.componentInstance.state).toBe('ready'); expect(video.paused).toBeTrue();
  }));

  it('never registers noninteractive gallery tiles', () => {
    fixture.componentRef.setInput('interactive', false); fixture.detectChanges();
    expect(coordinator.register).not.toHaveBeenCalled(); expect(play).not.toHaveBeenCalled();
  });

  it('opens an offer from its first tap without starting playback in the card', () => {
    fixture.componentRef.setInput('immersive', true);
    fixture.componentRef.setInput('expandable', true);
    fixture.componentRef.setInput('expandOnPlay', true);
    fixture.componentRef.setInput('viewportAutoplay', false);
    const expand = spyOn(fixture.componentInstance.expand, 'emit');
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.ow-cover').click();
    expect(expand).toHaveBeenCalledTimes(1);
    expect(play).not.toHaveBeenCalled();
    expect(coordinator.block).toHaveBeenCalledWith(video);
  });

  it('offers an explicit expansion button while stopped and preserves inline play controls', fakeAsync(() => {
    fixture.componentRef.setInput('immersive', true);
    fixture.componentRef.setInput('expandable', true);
    fixture.componentRef.setInput('expandOnPlay', true);
    fixture.componentRef.setInput('viewportAutoplay', false);
    fixture.detectChanges();
    const expand = spyOn(fixture.componentInstance.expand, 'emit');
    fixture.nativeElement.querySelector('[aria-label="Развернуть видео на весь экран"]').click();
    expect(expand).toHaveBeenCalledTimes(1);
    fixture.componentInstance.onPlayClick(new Event('click'), false); flushMicrotasks();
    video.dispatchEvent(new Event('loadeddata')); fixture.detectChanges();
    fixture.nativeElement.querySelector('[aria-label="Приостановить видео"]').click(); fixture.detectChanges();
    fixture.nativeElement.querySelector('[aria-label="Продолжить видео"]').click(); flushMicrotasks();
    expect(expand).toHaveBeenCalledTimes(1);
    expect(play).toHaveBeenCalledTimes(2);
  }));

  it('unregisters the old source and releases it on destruction', () => {
    fixture.detectChanges(); fixture.componentRef.setInput('url', '/second.mp4'); fixture.detectChanges();
    expect(unregister).toHaveBeenCalledTimes(1); expect(coordinator.register).toHaveBeenCalledTimes(2);
    fixture.destroy(); expect(unregister).toHaveBeenCalledTimes(2); expect(video.hasAttribute('src')).toBeFalse();
  });
  it('keeps native overlays off in full-frame viewing and preserves pause, seeking and replay', fakeAsync(() => {
    fixture.componentRef.setInput('fullFrame', true);
    fixture.componentRef.setInput('viewportAutoplay', false);
    spyOnProperty(video, 'duration', 'get').and.returnValue(10.042);
    fixture.detectChanges();
    fixture.componentInstance.onPlayClick(new Event('click')); flushMicrotasks();
    expect(coordinator.register).not.toHaveBeenCalled();
    video.dispatchEvent(new Event('loadeddata')); fixture.detectChanges();
    expect(video.controls).toBeFalse();
    expect(getComputedStyle(video).objectFit).toBe('contain');
    const range: HTMLInputElement = fixture.nativeElement.querySelector('[aria-label="Позиция видео"]');
    range.value = '5'; range.dispatchEvent(new Event('input')); fixture.detectChanges();
    expect(video.currentTime).toBe(5);
    fixture.nativeElement.querySelector('[aria-label="Приостановить видео"]').click(); fixture.detectChanges();
    expect(video.paused).toBeTrue();
    fixture.nativeElement.querySelector('[aria-label="Продолжить видео"]').click(); flushMicrotasks(); fixture.detectChanges();
    expect(play).toHaveBeenCalledTimes(2);
  }));

  it('pauses an immersive video on the frame and keeps it paused when seeking triggers canplay', fakeAsync(() => {
    fixture.componentRef.setInput('immersive', true);
    fixture.componentRef.setInput('fullFrame', true);
    fixture.componentRef.setInput('autoplay', true);
    fixture.componentRef.setInput('eager', true);
    fixture.componentRef.setInput('warmup', true);
    fixture.componentRef.setInput('viewportAutoplay', false);
    fixture.detectChanges();
    video.dispatchEvent(new Event('canplay')); flushMicrotasks(); fixture.detectChanges();
    expect(play).toHaveBeenCalledTimes(1);
    expect(video.controls).toBeFalse();
    fixture.nativeElement.querySelector('.ow-cover').click(); fixture.detectChanges();
    expect(video.paused).toBeTrue();
    video.dispatchEvent(new Event('canplay')); flushMicrotasks();
    expect(play).toHaveBeenCalledTimes(1);
    fixture.nativeElement.querySelector('.ow-cover').click(); flushMicrotasks(); fixture.detectChanges();
    expect(play).toHaveBeenCalledTimes(2);
  }));

});
