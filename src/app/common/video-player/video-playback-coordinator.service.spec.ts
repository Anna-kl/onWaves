import { NgZone } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
import { VideoPlaybackCoordinatorService } from './video-playback-coordinator.service';

describe('Viewport video coordination', () => {
  let service: VideoPlaybackCoordinatorService;
  let originalObserver: typeof IntersectionObserver;
  let observerCallback: IntersectionObserverCallback;
  let hidden: jasmine.Spy;
  let motion: MediaQueryList;
  const hosts: HTMLElement[] = [];

  beforeEach(() => {
    motion = { matches: false, addEventListener: jasmine.createSpy(), removeEventListener: jasmine.createSpy() } as unknown as MediaQueryList;
    spyOn(window, 'matchMedia').and.returnValue(motion);
    hidden = spyOnProperty(document, 'hidden', 'get').and.returnValue(false);
    spyOn(window, 'requestAnimationFrame').and.callFake(callback => window.setTimeout(() => callback(0), 16));
    spyOn(window, 'cancelAnimationFrame').and.callFake(id => window.clearTimeout(id));
    originalObserver = window.IntersectionObserver;
    window.IntersectionObserver = class {
      constructor(callback: IntersectionObserverCallback) { observerCallback = callback; }
      observe = (host: Element) => observerCallback([{ target: host, isIntersecting: true } as IntersectionObserverEntry], this as unknown as IntersectionObserver);
      unobserve = () => {};
      disconnect = () => {};
    } as unknown as typeof IntersectionObserver;
    service = new VideoPlaybackCoordinatorService('browser' as unknown as object, document, new NgZone({ enableLongStackTrace: false }));
  });

  afterEach(() => {
    service.ngOnDestroy();
    hosts.splice(0).forEach(host => host.remove());
    window.IntersectionObserver = originalObserver;
  });

  function scenario(body: () => void): () => void {
    return fakeAsync(() => { try { body(); } finally { service.ngOnDestroy(); tick(20); } });
  }

  function player(delta = 0) {
    const host = document.createElement('div');
    const video = document.createElement('video');
    host.append(video); document.body.append(host); hosts.push(host);
    let offset = delta;
    let paused = true;
    spyOn(host, 'getBoundingClientRect').and.callFake(() => DOMRect.fromRect({ x: 0, y: window.innerHeight / 2 - 100 + offset, width: Math.min(300, window.innerWidth), height: 200 }));
    spyOnProperty(video, 'paused', 'get').and.callFake(() => paused);
    spyOn(video, 'pause').and.callFake(() => {
      if (paused) return;
      paused = true;
      video.dispatchEvent(new Event('pause'));
    });
    const play = jasmine.createSpy('play').and.callFake(() => {
      paused = false;
      video.dispatchEvent(new Event('play'));
    });
    const pause = jasmine.createSpy('pause').and.callFake(() => video.pause());
    const unregister = service.register(video, host, play, pause);
    return { video, play, pause, unregister,
      deferPause: () => (video.pause as jasmine.Spy).and.callFake(() => paused = true),
      move: (next: number) => { offset = next; window.dispatchEvent(new Event('scroll')); } };
  }

  it('waits 300ms and chooses the nearest center, cancelling a quick pass', scenario(() => {
    const first = player(80); const second = player(0);
    tick(16); tick(299); expect(second.play).not.toHaveBeenCalled();
    tick(1); expect(second.play).toHaveBeenCalledTimes(1); expect(first.play).not.toHaveBeenCalled();
    second.move(1500); first.move(0); tick(16);
    expect(second.video.paused).toBeTrue();
    first.move(1500); tick(316); expect(first.play).not.toHaveBeenCalled();
  }));

  it('pauses the previous player before starting the next one', scenario(() => {
    const first = player(); const second = player(1500);
    tick(316); expect(first.video.paused).toBeFalse();
    first.move(1500); second.move(0); tick(16);
    expect(first.video.paused).toBeTrue(); expect(second.play).not.toHaveBeenCalled();
    tick(300); expect(second.video.paused).toBeFalse();
    expect(first.video.paused).toBeTrue();
  }));

  it('holds manual pause through focus scroll, until the card leaves the viewport', scenario(() => {
    const item = player(); tick(316);
    item.video.pause(); item.move(10); tick(1000);
    expect(item.play).toHaveBeenCalledTimes(1);
    item.move(window.innerHeight * 0.21); tick(316); item.move(0); tick(316);
    expect(item.play).toHaveBeenCalledTimes(1);
    item.move(1500); tick(16); item.move(0); tick(316);
    expect(item.play).toHaveBeenCalledTimes(2);
  }));

  it('suspends a hidden tab and restarts only after a fresh delay', scenario(() => {
    const item = player(); tick(316);
    hidden.and.returnValue(true); document.dispatchEvent(new Event('visibilitychange')); tick(16);
    expect(item.video.paused).toBeTrue(); tick(1000); expect(item.play).toHaveBeenCalledTimes(1);
    hidden.and.returnValue(false); document.dispatchEvent(new Event('visibilitychange')); tick(315);
    expect(item.play).toHaveBeenCalledTimes(1); tick(1); expect(item.play).toHaveBeenCalledTimes(2);
  }));

  it('disables automatic playback for reduced motion, while allowing a click', scenario(() => {
    Object.defineProperty(motion, 'matches', { value: true });
    const item = player(); tick(1000); expect(item.play).not.toHaveBeenCalled();
    service.claim(item.video); item.play(); item.move(0); tick(1000);
    expect(item.video.paused).toBeFalse();
  }));

  it('blocks restart under a modal, and cancels pending players on destruction', scenario(() => {
    const item = player(); tick(316); service.pauseAll(); item.move(0); tick(1000);
    expect(item.video.paused).toBeTrue(); expect(item.play).toHaveBeenCalledTimes(1);
    item.move(1500); tick(16); item.move(0); tick(16); item.unregister(); tick(1000);
    expect(item.play).toHaveBeenCalledTimes(1);
  }));

  it('lets a raw video preempt the common player', scenario(() => {
    const item = player(); tick(316);
    const raw = document.createElement('video'); document.body.append(raw); hosts.push(raw);
    spyOnProperty(raw, 'paused', 'get').and.returnValue(false);
    raw.dispatchEvent(new Event('play'));
    expect(item.video.paused).toBeTrue();
  }));

  it('does not retry rejected autoplay while the card stays central', scenario(() => {
    const item = player(); tick(316); service.block(item.video); item.video.pause(); item.move(5); tick(1000);
    expect(item.play).toHaveBeenCalledTimes(1);
  }));

  it('never installs browser observers on SSR', () => {
    const server = new VideoPlaybackCoordinatorService('server' as unknown as object, {} as Document, new NgZone({ enableLongStackTrace: false }));
    expect(() => { server.install(); server.pauseAll(); server.ngOnDestroy(); }).not.toThrow();
  });

  it('cancels a buffering player when manual playback takes over', scenario(() => {
    const first = player(); const second = player(1500);
    first.play.and.stub(); tick(316);
    service.claim(second.video); second.play();
    expect(first.pause).toHaveBeenCalledTimes(1);
    expect(second.video.paused).toBeFalse();
  }));

  it('honors data saving and does not restart ended media', scenario(() => {
    const connection = Object.getOwnPropertyDescriptor(window.navigator, 'connection');
    Object.defineProperty(window.navigator, 'connection', { configurable: true, value: { saveData: true } });
    try {
      const item = player(); tick(1000); expect(item.play).not.toHaveBeenCalled();
      Object.defineProperty(window.navigator, 'connection', { configurable: true, value: { saveData: false } });
      item.move(0); tick(316); expect(item.play).toHaveBeenCalledTimes(1);
      spyOnProperty(item.video, 'ended', 'get').and.returnValue(true);
      item.video.dispatchEvent(new Event('ended')); item.video.pause(); item.move(0); tick(1000);
      expect(item.play).toHaveBeenCalledTimes(1);
      item.move(1500); tick(16); item.move(0); tick(316);
      expect(item.play).toHaveBeenCalledTimes(2);
    } finally {
      if (connection) Object.defineProperty(window.navigator, 'connection', connection);
      else delete (window.navigator as Navigator & { connection?: unknown }).connection;
    }
  }));

  it('does not mistake the old source pause event for manual pause of the new source', scenario(() => {
    const item = player(); tick(316); item.deferPause(); item.unregister();
    service.register(item.video, item.video.parentElement!, item.play, item.pause);
    item.video.dispatchEvent(new Event('pause')); tick(316);
    expect(item.play).toHaveBeenCalledTimes(2);
  }));
});
