import { Inject, Injectable, OnDestroy, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MediaCard } from '../../../helpers/common/media.helpers';

@Injectable()
export class PageMediaCacheService implements OnDestroy {
  private readonly images = new Map<string, HTMLImageElement>();
  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  warmCards(cards: MediaCard[]): void {
    if (!this.isBrowser) return;

    const imageUrls: string[] = [];
    for (const card of cards) {
      // Video files are intentionally not preloaded here. The visible player
      // is the single owner of video loading; this cache only warms posters.
      if (card.previewUrl) imageUrls.push(card.previewUrl);
      if (!card.isVideo && card.imageUrl) imageUrls.push(card.imageUrl);
    }

    this.warmImages(imageUrls);
  }

  clear(): void {
    this.images.forEach(image => {
      image.onload = null;
      image.onerror = null;
      image.removeAttribute('src');
    });
    this.images.clear();
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

  private uniqueUrls(urls: string[]): string[] {
    const unique = new Set<string>();
    for (const url of urls) {
      const normalizedUrl = url.trim();
      if (normalizedUrl) unique.add(normalizedUrl);
    }
    return [...unique];
  }
}
