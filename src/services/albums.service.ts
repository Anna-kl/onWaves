import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, Observable, shareReplay, tap, throwError} from 'rxjs';

import {environment} from '../enviroments/environment';
import {Album} from '../app/DTO/classes/images/album';
import {IResponse} from '../app/DTO/classes/IResponse';
import {IAlbumWithFoto} from '../app/DTO/views/images/IAlbumWithFoto';
import {IViewImage} from '../app/DTO/views/images/IViewImage';

interface AlbumCacheEntry<T> {
  expiresAt: number;
  value$: Observable<T>;
}

@Injectable()
export class AlbumsService {
  private static readonly CACHE_TTL = 30_000;
  private readonly url = environment.Uri + 'albums/';
  /**
   * Кеши СТАТИЧЕСКИЕ, а не пообъектные.
   *
   * AlbumsService объявлен как `@Injectable()` без `providedIn: 'root'`, и почти
   * каждый компонент держит его в собственных `providers` — включая
   * CropImageModalComponent. То есть галерея и модалка загрузки работали на РАЗНЫХ
   * экземплярах сервиса.
   *
   * Из-за этого `clearCache()` в `saveImage()`/`videoComplete()` чистил кеш МОДАЛКИ,
   * а галерея после закрытия окна читала свой собственный кеш и ещё 30 секунд
   * отдавала прежний список — только что загруженного фото или видео в нём не было.
   * Ровно та же ошибка была в GroupService и там уже исправлена тем же способом.
   */
  private static readonly albumsCache = new Map<string, AlbumCacheEntry<IAlbumWithFoto[]>>();
  private static readonly imagesCache = new Map<string, AlbumCacheEntry<IViewImage[]>>();

  constructor(private readonly http: HttpClient) {}

  getImagesService(id: string): Observable<IViewImage[]> {
    return this.http.get<IViewImage[]>(`${this.url}get-service/${id}`);
  }

  saveAlbums(id: string, album: Album): Observable<IResponse> {
    const headers = new HttpHeaders();
    return this.http.post<IResponse>(`${this.url}${id}`, album, {headers}).pipe(
      tap(() => this.clearCache())
    );
  }

  getImagesFromService(serviceId: string): Observable<IViewImage[]> {
    return this.http.get<IViewImage[]>(`${this.url}get-service/${serviceId}`);
  }

  /** `force = true` — строго с сервера, мимо всех кешей (после загрузки/удаления медиа). */
  getAlbums(id: string, force = false): Observable<IAlbumWithFoto[]> {
    return this.cached(AlbumsService.albumsCache, id, () =>
      this.http.get<IAlbumWithFoto[]>(`${this.url}${id}`, this.freshOptions(force))
    , force);
  }

  saveImage(formData: unknown, idAlbum: string): Observable<IResponse> {
    const headers = new HttpHeaders();
    return this.http.post<IResponse>(`${this.url}image/${idAlbum}`, formData, {headers}).pipe(
      tap(() => this.clearCache())
    );
  }

  saveImageService(imageIds: string[], serviceId: string): Observable<IResponse> {
    const headers = new HttpHeaders();
    return this.http.post<IResponse>(`${this.url}save-image-service/${serviceId}`, {imageIds}, {headers}).pipe(
      tap(() => this.clearCache())
    );
  }

  /** `force = true` — строго с сервера, мимо всех кешей (после загрузки/удаления медиа). */
  getImages(albumId: string, force = false): Observable<IViewImage[]> {
    return this.cached(AlbumsService.imagesCache, albumId, () =>
      this.http.get<IViewImage[]>(`${this.url}image/${albumId}`, this.freshOptions(force))
    , force);
  }

  getImage(imageId: string): Observable<IViewImage> {
    return this.http.get<IViewImage>(`${this.url}get-image/${imageId}`);
  }

  setMainImage(albumId: string, imageId: string): Observable<IResponse> {
    return this.http.put<IResponse>(`${this.url}main-foto/${albumId}`, {imageId}).pipe(
      tap(() => this.clearCache())
    );
  }

  deleteImage(imageId: string): Observable<IResponse> {
    return this.http.delete<IResponse>(`${this.url}media/${imageId}`).pipe(tap(() => this.clearCache()));
  }

  deleteAlbum(id: string): Observable<IResponse> {
    return this.http.delete<IResponse>(`${this.url}album/${id}`).pipe(tap(() => this.clearCache()));
  }

  getVideoUploadUrl(albumId: string, fileName: string, contentType: string) {
    const params = `fileName=${encodeURIComponent(fileName)}&contentType=${encodeURIComponent(contentType)}`;
    return this.http.get<{key: string; uploadUrl: string; albumId: string}>(
      `${this.url}video-upload-url/${albumId}?${params}`
    );
  }

  videoComplete(
    albumId: string,
    key: string,
    description: string,
    serviceIds: string[],
    coverKey?: string | null
  ): Observable<IResponse> {
    return this.http.post<IResponse>(`${this.url}video-complete/${albumId}`, {
      key,
      description,
      serviceIds,
      ...(coverKey ? {coverKey} : {})
    }).pipe(tap(() => this.clearCache()));
  }

  getCoverUploadUrl(albumId: string, fileName: string, contentType: string) {
    const params = `fileName=${encodeURIComponent(fileName)}&contentType=${encodeURIComponent(contentType)}`;
    return this.http.get<{key: string; uploadUrl: string}>(
      `${this.url}cover-upload-url/${albumId}?${params}`
    );
  }

  clearCache(): void {
    AlbumsService.albumsCache.clear();
    AlbumsService.imagesCache.clear();
  }

  /**
   * Опции запроса для принудительного чтения с сервера.
   *
   * Кроме нашего shareReplay между компонентом и API лежат ещё три кеша по тому же
   * URL: HTTP transfer cache Angular SSR (`provideClientHydration()` в app.module
   * включает его по умолчанию и держит активным, пока приложение не станет stable),
   * кеш браузера и прокси. Уникальный `_` в query делает ключ новым — ответить из
   * кеша не может ни один из них. Заголовок Cache-Control намеренно не ставим:
   * он превратил бы простой GET в preflight.
   */
  private freshOptions(force: boolean): { headers?: HttpHeaders; params?: HttpParams } {
    if (!force) return {};
    return {params: new HttpParams().set('_', Date.now().toString())};
  }

  private cached<T>(
    cache: Map<string, AlbumCacheEntry<T>>,
    key: string,
    factory: () => Observable<T>,
    force = false
  ): Observable<T> {
    const now = Date.now();
    if (force) {
      cache.delete(key);
    } else {
      const current = cache.get(key);
      if (current && current.expiresAt > now) return current.value$;
    }

    const value$ = factory().pipe(
      catchError(error => {
        cache.delete(key);
        return throwError(() => error);
      }),
      shareReplay({bufferSize: 1, refCount: false})
    );
    cache.set(key, {expiresAt: now + AlbumsService.CACHE_TTL, value$});
    return value$;
  }
}
