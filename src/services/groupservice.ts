// не доделал. По хорошему нужно сделать сервис, для получения группы услуги и услуг. Муконин.

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BehaviorSubject, catchError, forkJoin, map, Observable, of, shareReplay, switchMap, tap, throwError} from 'rxjs';

import { environment } from '../enviroments/environment';
import {Group} from "../app/DTO/views/services/IViewGroups";
import {subGroup} from "../app/DTO/views/services/IViewSubGroups";
import {IResponse} from "../app/DTO/classes/IResponse";
import {Service} from "../app/DTO/classes/services/Service";
import {IFreeSlotSchedule} from "../app/DTO/views/schedule/IFreeSlotSchedule";
import {PaymentMethodType} from "../app/DTO/enums/paymentMethodType";
import {IViewSchedule} from "../app/DTO/views/schedule/IViewSchedule";
import {IViewImage} from "../app/DTO/views/images/IViewImage";

interface ReadCacheEntry<T> {
  expiresAt: number;
  value$: Observable<T>;
}
@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private static readonly READ_CACHE_TTL = 30_000;
  private baseUrl = environment.Uri + 'services/';
  /**
   * Кеши статические, а не пообъектные. Сервис объявлен `providedIn: 'root'`, но
   * часть компонентов (формы услуги, график, публичный профиль) держит его ещё и в
   * своих `providers` — то есть работает на отдельном экземпляре. С пообъектными
   * картами `clearReadCache()` после сохранения услуги чистил кеш ТОЙ формы, а
   * экран услуг читал корневой экземпляр и ещё 30 секунд отдавал старый список —
   * только что созданной услуги в нём не было.
   */
  private static readonly groupsCache = new Map<string, ReadCacheEntry<Group[]>>();
  private static readonly withoutGroupCache = new Map<string, ReadCacheEntry<Service[]>>();
  private static readonly groupServicesCache = new Map<string, ReadCacheEntry<Service[]>>();
  private static readonly allServicesCache = new Map<string, ReadCacheEntry<Service[]>>();
  public payMethods$ = new BehaviorSubject<PaymentMethodType[]>([]);
  public checkStatusServices$ = new BehaviorSubject<IResponse|null>(null);
  constructor(private http: HttpClient) { }

  getGroupById(id: string): Observable<Group> {
    const url = `https://83.222.9.120/v1/api/services/groups/${id}`;
    return this.http.get<Group>(url);

  }

  getImages(id: string){
    return this.http
      .get<IViewImage[]>(`${this.baseUrl}get-images/${id}`);
  }

  getServiceWithout(profileId: string, force = false): Observable<Service[]> {
    return this.cached(GroupService.withoutGroupCache, profileId, () =>
      this.http.get<Service[]>(`${this.baseUrl}without-group/${profileId}`, this.freshOptions(force))
    , force);
  }

  /** Услуги без указанного характера (workLocationType == null) — для баннера «дополните услуги». */
  getServicesWithoutLocation(profileId: string, force = false): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.baseUrl}without-location/${profileId}`, this.freshOptions(force));
  }

  /**
   * Создаёт (HTTP 201) или переименовывает (HTTP 200) группу.
   * Отказ приходит настоящим статусом — 400/404/409 — и попадает в ветку error.
   */
  saveGroup(group: Group): Observable<IResponse> {
    const url = `${this.baseUrl}group`;
    let  headers: HttpHeaders = new HttpHeaders();

    return this.http.post<IResponse>(url, group ,{headers}).pipe(tap(() => this.clearReadCache()));
  }

  /**
   * Список групп профиля. `force = true` — принудительно с сервера, мимо всех кешей.
   */
  getGroupServices(id: string, force = false): Observable<Group[]> {
    return this.cached(GroupService.groupsCache, id, () =>
      this.http.get<Group[]>(`${this.baseUrl}groups/${id}`, this.freshOptions(force))
    , force);
  }

  getService(groupId: string, force = false): Observable<Service[]> {
    return this.cached(GroupService.groupServicesCache, groupId, () =>
      this.http.get<Service[]>(`${this.baseUrl}get-by-group/${groupId}`, this.freshOptions(force))
    , force);
  }

  /** Один разделяемый поток всех услуг профиля для профиля, портфолио и записи. */
  getAllServices(profileId: string): Observable<Service[]> {
    return this.cached(GroupService.allServicesCache, profileId, () =>
      forkJoin({
        groups: this.getGroupServices(profileId),
        withoutGroup: this.getServiceWithout(profileId)
      }).pipe(
        switchMap(({groups, withoutGroup}) => {
          const requests = groups.filter(group => !!group.id).map(group => this.getService(group.id!));
          return requests.length
            ? forkJoin(requests).pipe(map(grouped => [...withoutGroup, ...grouped.flat()]))
            : of(withoutGroup);
        })
      )
    );
  }

  getServiceById(profileId: string, serviceId: string): Observable<Service> {
    return this.getAllServices(profileId).pipe(
      map(services => {
        const service = services.find(item => item.id === serviceId);
        if (!service) throw new Error('Service was not found');
        return service;
      })
    );

  }

  /**
   * Бэк отвечает 200 с конвертом {code, message, data} и на отказ тоже (например,
   * когда в группе остались услуги). Тип IResponse — чтобы вызывающий код не забывал
   * проверить code, а не считал любой 200 удалением.
   */
  deleteGroup(groupId: string): Observable<IResponse> {
      const deleteUrl = `${this.baseUrl}group/${groupId}`;
      return this.http.delete<IResponse>(deleteUrl).pipe(tap(() => this.clearReadCache()));
    }

  deleteService(id: string): Observable<IResponse> {
    const deleteUrl = `${this.baseUrl}service/${id}`;
    return this.http.delete<IResponse>(deleteUrl).pipe(tap(() => this.clearReadCache()));
  }

  changeGroup(serviceId: string, groupId: string){
    return this.http.get(`${this.baseUrl}change-group/${serviceId}?groupId=${groupId}`).pipe(
      tap(() => this.clearReadCache())
    );
  }
  /**
   * Сохраняет услугу с поддержкой идемпотентности
   * @param service - данные услуги
   * @param requestId - UUID для идемпотентности (опционально)
   */
  saveService(service: Service, requestId?: string){
    let headers: HttpHeaders = new HttpHeaders();

    // ══════════════════════════════════════════════════════════════
    // КРИТИЧНО: Добавить Idempotency-Key header для предотвращения дублей
    // ══════════════════════════════════════════════════════════════
    if (requestId) {
      headers = headers.append('Idempotency-Key', requestId);
    }

    return this.http.post<IResponse>(`${this.baseUrl}`, service, {headers}).pipe(
      tap(() => this.clearReadCache())
    );
  }


  public async getMethodsPayment(id: string){
    return this.http.get<PaymentMethodType[]>(`${this.baseUrl}get-payMethods/${id}`).pipe(
      tap(data => this.payMethods$.next(data)));
  }

  public async checkStatus(id: string){
    return this.http.get<IResponse>(`${this.baseUrl}check-service/${id}`).pipe(
      tap(data => this.checkStatusServices$.next(data)));
  }

  /**
   * Сбрасывает кеш чтения. Побочных эффектов нет — метод зовётся и из мутаций,
   * и перед принудительной перечиткой списка в AccordionComponent.update().
   */
  clearReadCache(): void {
    GroupService.groupsCache.clear();
    GroupService.withoutGroupCache.clear();
    GroupService.groupServicesCache.clear();
    GroupService.allServicesCache.clear();
  }

  /**
   * Опции запроса для принудительного чтения с сервера.
   *
   * ЗАЧЕМ УНИКАЛЬНЫЙ ПАРАМЕТР. Между компонентом и сервером стоит не один кеш, а
   * четыре, и сброс `groupsCache` разбирается только с первым:
   *   1) `cached()` — shareReplay на 30 секунд (наш);
   *   2) HTTP transfer cache Angular SSR — `provideClientHydration()` в app.module
   *      включает его по умолчанию, и он отвечает на GET из TransferState БЕЗ похода
   *      в сеть до тех пор, пока приложение не станет stable. Если в зоне живёт хоть
   *      один setInterval (слайдеры, SignalR-реконнект, тосты), `isStable` не
   *      наступает никогда — и кеш работает всю сессию;
   *   3) HTTP-кеш браузера;
   *   4) прокси/CDN перед API.
   * Все четыре ключуются по URL. Уникальный `_` в query делает ключ новым, поэтому
   * ответить на такой запрос из кеша не может ни один из них.
   *
   * Заголовок Cache-Control сюда намеренно НЕ добавлен: он превратил бы простой GET
   * в preflight-запрос и завязал бы работу списка на корректность CORS.
   */
  private freshOptions(force: boolean): { headers?: HttpHeaders; params?: HttpParams } {
    if (!force) return {};
    return { params: new HttpParams().set('_', Date.now().toString()) };
  }

  private cached<T>(
    cache: Map<string, ReadCacheEntry<T>>,
    key: string,
    factory: () => Observable<T>,
    force = false
  ): Observable<T> {
    const now = Date.now();
    if (force) {
      // Принудительное чтение: старую запись выбрасываем, чтобы никто из уже
      // подписанных не получил её повторно, и идём в сеть.
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
    cache.set(key, {expiresAt: now + GroupService.READ_CACHE_TTL, value$});
    return value$;
  }

}
