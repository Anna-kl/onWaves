import { Injectable, OnDestroy } from '@angular/core';
import { MediaCard } from '../../../helpers/common/media.helpers';
import { VideoPreloadService } from '../video-player/video-preload.service';

interface CachedVideo {
  element: HTMLVideoElement;
  cleanup: () => void;
}

@Injectable()
export class PageMediaCacheService implements OnDestroy {
  private readonly images = new Map<string, HTMLImageElement>();
  private readonly videos = new Map<string, CachedVideo>();

  constructor(private videoPreload: VideoPreloadService) {}

  warmCards(cards: MediaCard[]): void {
    if (!this.canUseDom()) return;

    const imageUrls: string[] = [];
    const videoUrls: string[] = [];

    for (const card of cards) {
      if (card.previewUrl) imageUrls.push(card.previewUrl);

      if (card.isVideo) {
        if (card.imageUrl) videoUrls.push(card.imageUrl);
        continue;
      }

      if (card.imageUrl) imageUrls.push(card.imageUrl);
    }

    this.warmImages(imageUrls);
    this.warmVideos(videoUrls);
  }

  clear(): void {
    this.images.forEach(image => {
      image.onload = null;
      image.onerror = null;
      image.removeAttribute('src');
    });
    this.images.clear();

    this.videos.forEach(({ element, cleanup }) => {
      cleanup();
      element.pause();
      element.removeAttribute('src');
      element.load();
    });
    this.videos.clear();
  }

  ngOnDestroy(): void {
    this.clear();
  }

  private warmImages(urls: string[]): void {
    for (const url of this.uniqueUrls(urls)) {
      if (this.images.has(url)) continue;

      const image = new Image();
      image.decoding = 'async';
      image.loading = 'eager';
      image.src = url;
      this.images.set(url, image);
    }
  }

  private warmVideos(urls: string[]): void {
    for (const url of this.uniqueUrls(urls)) {
      if (this.videos.has(url)) continue;

      const video = document.createElement('video');
      video.muted = true;
      video.playsInline = true;
      video.preload = 'auto';

      const onLoadedMetadata = () => this.videoPreload.markMetadata(url);
      const onLoadedData = () => this.videoPreload.markFirstFrame(url);
      const onCanPlay = () => this.videoPreload.markReady(url);
      const onError = () => this.videoPreload.markError(url, 'page-cache-video-error');

      video.addEventListener('loadedmetadata', onLoadedMetadata);
      video.addEventListener('loadeddata', onLoadedData);
      video.addEventListener('canplay', onCanPlay);
      video.addEventListener('error', onError);

      const cleanup = () => {
        video.removeEventListener('loadedmetadata', onLoadedMetadata);
        video.removeEventListener('loadeddata', onLoadedData);
        video.removeEventListener('canplay', onCanPlay);
        video.removeEventListener('error', onError);
      };

      this.videos.set(url, { element: video, cleanup });
      this.videoPreload.markWarming(url);

      try {
        video.src = url;
        video.load();
      } catch {
        cleanup();
        this.videos.delete(url);
        this.videoPreload.markError(url, 'page-cache-video-load-failed');
      }
    }
  }

  private uniqueUrls(urls: string[]): string[] {
    const unique = new Set<string>();

    for (const url of urls) {
      const normalizedUrl = url.trim();
      if (normalizedUrl) unique.add(normalizedUrl);
    }

    return [...unique];
  }

  private canUseDom(): boolean {
    return typeof window !== 'undefined' && typeof document !== 'undefined';
  }
}
