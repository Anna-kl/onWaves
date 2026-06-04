import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type VideoPreloadStatus = 'idle' | 'warming' | 'metadata' | 'firstFrame' | 'ready' | 'playing' | 'error';

export interface VideoPreloadState {
  url: string;
  status: VideoPreloadStatus;
  hasMetadata: boolean;
  hasFirstFrame: boolean;
  lastError?: string;
}

@Injectable({ providedIn: 'root' })
export class VideoPreloadService {
  private readonly states = new Map<string, BehaviorSubject<VideoPreloadState>>();

  getState(url: string): BehaviorSubject<VideoPreloadState> {
    const normalizedUrl = this.normalizeUrl(url);
    let state$ = this.states.get(normalizedUrl);

    if (!state$) {
      state$ = new BehaviorSubject<VideoPreloadState>({
        url: normalizedUrl,
        status: 'idle',
        hasMetadata: false,
        hasFirstFrame: false
      });
      this.states.set(normalizedUrl, state$);
    }

    return state$;
  }

  snapshot(url: string): VideoPreloadState {
    return this.getState(url).value;
  }

  markWarming(url: string): void {
    this.patchProgress(url, 'warming', { lastError: undefined });
  }

  markMetadata(url: string): void {
    this.patchProgress(url, 'metadata', { hasMetadata: true, lastError: undefined });
  }

  markFirstFrame(url: string): void {
    this.patchProgress(url, 'firstFrame', {
      hasMetadata: true,
      hasFirstFrame: true,
      lastError: undefined
    });
  }

  markReady(url: string): void {
    this.patchProgress(url, 'ready', {
      hasMetadata: true,
      hasFirstFrame: true,
      lastError: undefined
    });
  }

  markPlaying(url: string): void {
    this.patch(url, { status: 'playing', lastError: undefined });
  }

  markError(url: string, error = 'video-load-error'): void {
    this.patch(url, { status: 'error', lastError: error });
  }

  private patch(url: string, patch: Partial<VideoPreloadState>): void {
    const state$ = this.getState(url);
    state$.next({ ...state$.value, ...patch });
  }

  private patchProgress(
    url: string,
    status: VideoPreloadStatus,
    patch: Partial<VideoPreloadState> = {}
  ): void {
    const current = this.snapshot(url);
    if (this.rank(status) < this.rank(current.status)) {
      this.patch(url, patch);
      return;
    }

    this.patch(url, { ...patch, status });
  }

  private rank(status: VideoPreloadStatus): number {
    const ranks: Record<VideoPreloadStatus, number> = {
      idle: 0,
      warming: 1,
      metadata: 2,
      firstFrame: 3,
      ready: 4,
      playing: 5,
      error: 0
    };
    return ranks[status];
  }

  private normalizeUrl(url: string): string {
    return url.trim();
  }
}
