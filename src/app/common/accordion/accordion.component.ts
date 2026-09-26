import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, signal } from '@angular/core';
import { ToastService } from 'src/services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../../../services/groupservice';
import { Group, GroupShow, GroupShowWithDate, GroupWithDate } from "../../DTO/views/services/IViewGroups";
import { subGroup } from "../../DTO/views/services/IViewSubGroups";
import { ProfileService } from "../../../services/profile.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalComponent } from "../../baedit/components/uslugi/modal/modal.component";
import {
  ChangeModalGroupComponent
} from "../../baedit/components/uslugi/change-modal-group/change-modal-group.component";
import { Service } from "../../DTO/classes/services/Service";
import { PaymentForType } from "../../DTO/enums/paymentForType";
import { WorkLocationType } from "../../DTO/enums/workLocationType";
import { IViewImage } from "../../DTO/views/images/IViewImage";
import { IAlbumWithFoto } from "../../DTO/views/images/IAlbumWithFoto";
import { DomSanitizer } from "@angular/platform-browser";
import { AlbumsService } from "../../../services/albums.service";
import { DataService } from 'src/app/profile-ba/components/group-service/dataservice.service';
import { getHours, getMinutes } from "../../../helpers/common/timeHelpers";
import { ConfirmWithoutTimeComponent } from "./modals/confirm-without-time/confirm-without-time.component";
import { IPrice } from 'src/app/DTO/views/services/IPrice';
import { BehaviorSubject, catchError, finalize, forkJoin, map, Observable, of, shareReplay, startWith, Subject, Subscription, switchMap, take, tap, timeout } from 'rxjs';
import { serviceWorkLocationType } from 'src/helpers/common/address';
import { resetHourly } from 'src/helpers/common/hourly';
import { normalizeImageMedia, toMediaCard } from '../../../helpers/common/media.helpers';
import { displayPriceUnit, formatPriceAmount, isPriceBoundSet } from '../../../helpers/common/price.helpers';
import { CardDetailModalComponent } from '../modals/card-detail-modal/card-detail-modal.component';
import { VideoPlaybackCoordinatorService } from '../video-player/video-playback-coordinator.service';


@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  providers: [ProfileService, AlbumsService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccordionComponent implements OnInit, OnChanges, OnDestroy {

  /** Один контейнер на все подписки компонента. */
  private readonly subscriptions = new Subscription();

  combinedData$: Observable<any[]>|null = null;
  serviceWithout$: Observable<Service[]>|null = null;
  ifExist: boolean = false;
  isServicesLoading = false;
  servicesLoaded = false;
  servicesLoadFailed = false;
  /**
   * Раньше здесь был общий счётчик незавершённых запросов. Он рассинхронизировался:
   * один и тот же стрим мог списать счётчик дважды (async-пайп отписывается при
   * замене Observable в clearAllServices, а finalize срабатывает и на отписку),
   * и наоборот — списание за «соседний» стрим гасило загрузку раньше времени.
   * Флаг на каждый стрим отдельно такой размен исключает.
   */
  private servicesPending: { groups: boolean; without: boolean } = { groups: false, without: false };
  /**
   * Номер поколения запросов услуг. Счётчик `pendingServiceRequests` общий, а
   * `update()` может быть вызван повторно, пока прошлые стримы ещё живы: тогда
   * их `finalize` списывал запросы у нового поколения, и флаг загрузки застревал.
   */
  private servicesRequestGeneration = 0;
  /** Браузерный предохранитель: зависший GET оставлял плашку «Ищем услуги» навсегда. */
  private static readonly SERVICES_TIMEOUT_MS = 20_000;
  /**
   * Фото из галереи, сгруппированные по serviceIds. Один запрос на всё дерево
   * услуг (группы + без группы), иначе каждая группа ходила бы в альбомы сама.
   */
  private galleryByService$: Observable<Map<string, IViewImage[]>> | null = null;
  visibleCards: boolean = false;
  combinedData: { isOpen: boolean; group: any; subGroups: Service[]; }[] = [];
  a: Group[] = [];
  mainGroups: Group[] = [];
  @Output() setGroup = new EventEmitter<Group[]>();
  @Input() serviceId?: string|null = null;

  expandedIds = signal<Set<string>>(new Set());
  galleryIndex = signal<Record<string, number>>({});

  isExpanded = (id: string) => this.expandedIds().has(id);

  toggle(id?: string | null) {
    if (!id) return;
    const next = new Set(this.expandedIds());
    next.has(id) ? next.delete(id) : next.add(id);
    this.expandedIds.set(next);
  }

  trackById = (_: number, s: Service | subGroup) => s.id;

  imagesOf(svc: Service | subGroup): IViewImage[] {
    return ((svc as Service).images ?? []).filter(img => {
      const media = normalizeImageMedia(img);
      return media.isVideo ? !!media.mediaUrl : !!media.previewUrl;
    });
  }

  previewOf(img: IViewImage): string | null {
    return normalizeImageMedia(img).previewUrl;
  }

  mediaUrlOf(img: IViewImage): string | null {
    return normalizeImageMedia(img).mediaUrl;
  }

  posterOf(img: IViewImage): string | null {
    return normalizeImageMedia(img).thumbUrl ?? null;
  }

  coverUrl(svc: Service | subGroup): string | null {
    const images = this.imagesOf(svc);
    if (!images.length) return null;
    const cover = images.find(img => img.isCover) || images[0];
    return this.previewOf(cover);
  }

  galleryAt(id?: string | null): number {
    if (!id) return 0;
    return this.galleryIndex()[id] ?? 0;
  }

  galleryImage(svc: Service | subGroup): IViewImage | null {
    const images = this.imagesOf(svc);
    if (!images.length) return null;
    const i = Math.min(this.galleryAt(svc.id), images.length - 1);
    return images[i];
  }

  isVideoImg(img: IViewImage): boolean {
    return normalizeImageMedia(img).isVideo;
  }

  thumbsOf(svc: Service | subGroup): IViewImage[] {
    return this.imagesOf(svc).slice(0, 4);
  }

  extraThumbCount(svc: Service | subGroup): number {
    return Math.max(0, this.imagesOf(svc).length - 4);
  }

  openGalleryMedia(svc: Service | subGroup, event?: Event): void {
    event?.stopPropagation();
    const img = this.galleryImage(svc);
    if (!img || !this.mediaUrlOf(img)) return;

    this.videoCoordinator.pauseAll();

    const card = toMediaCard(img, img.albumId ?? '');
    if (svc.id) {
      const ids = new Set((card.serviceIds ?? []).map(id => String(id)));
      ids.add(svc.id);
      card.serviceIds = [...ids];
    }

    const modalRef = this.modalService.open(CardDetailModalComponent, {
      centered: true,
      size: 'xl',
      windowClass: 'card-detail-modal'
    });
    modalRef.componentInstance.card = card;
    modalRef.componentInstance.profileId = this.profileId ?? '';
    modalRef.componentInstance.canBook = this.canSetService && !this.isUpdate;
    if (svc.id) {
      modalRef.componentInstance.linkedServices = [svc as Service];
    }
  }

  setGallery(id: string, index: number, event?: Event) {
    event?.stopPropagation();
    this.galleryIndex.update(map => ({ ...map, [id]: index }));
  }

  snippet(svc: Service | subGroup): string | null {
    const text = (svc.about || '').replace(/\s+/g, ' ').trim();
    if (!text || this.isExpanded(svc.id || '')) return null;
    return text.length > 90 ? `${text.slice(0, 90).trim()}…` : text;
  }

  formatPrice(price?: IPrice | null): string {
    return formatPriceAmount(price);
  }

  formatPriceUnit(svc: Service | subGroup): string {
    return displayPriceUnit(svc?.price, svc?.paymentForType);
  }

  workLocationLabel(svc: Service | subGroup): string | null {
    const type = serviceWorkLocationType(svc);
    switch (type) {
      case WorkLocationType.Fixed: return 'На месте';
      case WorkLocationType.Mobile: return 'Выезд по городу';
      case WorkLocationType.Online: return 'Онлайн';
      default: return null;
    }
  }

  chooseService(svc: Service | subGroup, event?: Event) {
    event?.stopPropagation();
    if (!this.canSetService) return;
    svc.isChecked = !svc.isChecked;
    this.setService(svc);
  }

  getPrice(price: IPrice): string | number {
    if (price.isRange) {
      const hasStart = isPriceBoundSet(price.startRange);
      const hasEnd = isPriceBoundSet(price.endRange);
      if (hasStart && hasEnd) return `от ${price.startRange} до ${price.endRange}`;
      if (hasStart) return `от ${price.startRange}`;
      if (hasEnd) return `до ${price.endRange}`;
      return '';
    } else {
      return price.price!;
    }
  }

  
  
  // protected readonly getPrice = getPrice;
  isCheckboxChecked: boolean = false;
  isAboutOpen = true;
  groups: GroupWithDate[] | Group[] = [];
  group: Group[] = [];
  @Input() canSetService: boolean = true;
  @Input() viewCreate: boolean = false;
  //companyId = '{2b48605e-cbf2-4505-bbed-4bea2bbf5d0a}';
  // @Input() reload убран: родитель обновляет список прямым вызовом update()
  // через @ViewChild(AccordionComponent), а не через toggle булева инпута.
  index: any;
  setIsTimeLimit: boolean = false;
  number: any;
  sendService: subGroup[] = [];
  // businessProfile!: ICardBusinessView;
  groupShow: GroupShowWithDate[] = [];
  @Input() isUpdate = false;
  @Input() profileId: string | null = null;
  @Input() chooseServices: subGroup[] = [];
  @Output() setServices = new EventEmitter<subGroup[]>();
  private reload$ = new BehaviorSubject<string|null>(null);
  showDeletePanel: any;
 // services: Service[] = [];
  constructor(private messageService: ToastService,
    private _groupService: GroupService,
    private modalService: NgbModal,
    private _route: Router,
    private _activateRoute: ActivatedRoute,
    private _apiImages: AlbumsService,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
    private dataService: DataService,
    private videoCoordinator: VideoPlaybackCoordinatorService) { }

  showCreateAlbumBlock: boolean = false;

  // ngOnInit(): void {
  //   this.checkIfProfilebisaccRoute();
  //   //    if (this.profileId)
  //   // this._groupService.getGroupServices(this.profileId).pipe(
  //   //         take(1),
  //   //         switchMap((users: any[]) => {
            
  //   //           // Используем forkJoin, чтобы выполнить второй запрос для каждого элемента массива
  //   //           const userDetailRequests = users.map(item => 
  //   //             this._groupService.getService(item.id!).pipe(
  //   //               map(details => ({
  //   //                     isOpen: true,
  //   //                     group: item,
  //   //                     subGroups: details })) // объединяем каждый user с его details
  //   //             )
  //   //           );
  //   //           // forkJoin ждет завершения всех запросов
  //   //           return forkJoin(userDetailRequests);
  //   //         })).subscribe(result => {
  //   //           this.combinedData = result;
  //   //             if ( this.combinedData.length > 0)
  //   //                 this.ifExist = true;
  //   //         })
  //   //       ;
  //   // this.combinedData$ = this.reload$.pipe(
  //   //         // при старте сразу выстрелить, можно убрать если не нужно

  //   //         // 1) на каждый «трях» reload$ дергаем getGroupServices
  //   //         switchMap(() => this._groupService.getGroupServices(this.profileId!)),

  //   //         // 2) побочный эффект: выставляем флаг ifExist
  //   //         tap((users: any[]) => {
  //   //           this.ifExist = users.length > 0;
  //   //         }),

  //   //         // 3) для каждого user запускаем getService и ждём всех завершений
  //   //         switchMap((users: any[]) => {
  //   //           const calls = users.map(item =>
  //   //             this._groupService.getService(item.id!).pipe(
  //   //               map(details => ({
  //   //                 isOpen:   true,
  //   //                 group:    item,
  //   //                 subGroups: details
  //   //               }))
  //   //             )
  //   //           );
  //   //           return forkJoin(calls);
  //   //         })
  //   //       );

  //     // this.reload$.complete();
  // }
  
  checkIfProfilebisaccRoute() {
    const currentUrl = this._route.url;
    const desiredRoute = '/profilebisacc/';

    this.showCreateAlbumBlock = currentUrl.includes(desiredRoute);
  }

  getImage(image: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64, ${image}`);
  }
  /**
   * Перечитывает список групп и услуг профиля.
   *
   * @param force `true` — после мутации (создали/удалили/переименовали). Читает
   * СТРОГО с сервера, мимо всех кешей. `false` — обычная загрузка экрана, можно
   * отдать из кеша.
   *
   * Почему флаг вообще понадобился. Раньше `update()` НЕ ДЕЛАЛ ТОГО, ЧТО ОБЕЩАЕТ
   * ИМЕНЕМ: `getGroupServices()`/`getServiceWithout()` идут через `cached()`, а тот
   * 30 секунд отдаёт один и тот же уже завершённый `shareReplay`. Метод честно
   * пересобирал `combinedData$`, async-пайп честно переподписывался — и получал
   * СИНХРОННЫЙ ПОВТОР СТАРОГО ЗНАЧЕНИЯ. Ни одного запроса в сеть, ни мигания
   * списка: удалённая группа просто оставалась на экране до F5.
   * Поверх этого лежат ещё три кеша по тому же URL (SSR transfer cache, браузер,
   * прокси) — см. комментарий к `GroupService.freshOptions()`.
   */
  update(force = false) {
    if (this.profileId) {
      const generation = ++this.servicesRequestGeneration;
      this.galleryByService$ = null;
      this.isServicesLoading = true;
      this.servicesLoaded = false;
      this.servicesLoadFailed = false;
      this.ifExist = false;
      this.servicesPending = { groups: true, without: true };
      let idsChoose = this.chooseServices.map(_ => _.id);
    
      this.serviceWithout$ = this._groupService.getServiceWithout(this.profileId, force)
        .pipe(map((items: Service[]) => {
          if (items.length > 0)
              this.ifExist = true;
            items = items.map(_ => {
              const service = new Service(_.id, _.name, _.gender, _.profileUserId, _.price,
              _.paymentForType, _.groupServiceId, _.about, _.duration, _.isTimeUnlimited, undefined, !!this.serviceId && this.serviceId === _.id);
              // Конструктор Service не копирует характер услуги — переносим вручную
              // (устойчиво к регистру ключа: workLocationType / WorkLocationType).
              service.workLocationType = serviceWorkLocationType(_);
              service.images = _.images;
              return service;
            });
            return items;
          //  return items.map(item =>
          //       item.setCheck( idsChoose.includes(item.id))
          //   );
            
          }),
          switchMap(items => this.attachServiceImages(items)),
                  tap(result => {
                                  result
                                    .filter(sg => sg.isChecked)
                                    .forEach(sg => {
                                      // здесь вызываешь тот же обработчик, что раньше по клику
                                      this.setService(sg);
                    // или dispatch в store:
                    // this.store.dispatch(selectService({ group: result.group, service: sg }));
                  });
              }),
          timeout(AccordionComponent.SERVICES_TIMEOUT_MS),
          catchError(() => {
            this.servicesLoadFailed = true;
            return of([] as Service[]);
          }),
          finalize(() => this.finishServicesRequest(generation, 'without'))
        );

         
          
      this.combinedData$ =
       this._groupService.getGroupServices(this.profileId, force).pipe(
        switchMap((users: any[]) => {
          this.mainGroups = users;
          this.setGroup.emit(this.mainGroups);
          if (users.length > 0)
            this.ifExist = true;
          // Используем forkJoin, чтобы выполнить второй запрос для каждого элемента массива
          const userDetailRequests = users.map(item =>
                this._groupService.getService(item.id!, force).pipe(
                  map(details => ({
                    isOpen: true,
                    group: item,
                    subGroups: details.map(x => ({
                      ...x,                                      // распаковываем сервис
                      isChecked: !!this.serviceId && this.serviceId === x.id,
                      workLocationType: serviceWorkLocationType(x),
                      images: x.images,
                    })),
                  })),
                   tap(result => {
                        result.subGroups
                          .filter(sg => sg.isChecked)
                          .forEach(sg => {
                            this.setService(sg);
        });
    }),
                  switchMap(result => this.attachServiceImages(result.subGroups).pipe(
                    map(subGroups => ({ ...result, subGroups }))
                  ))
                )
);
          // forkJoin ждет завершения всех запросов
          return userDetailRequests.length ? forkJoin(userDetailRequests) : of([]);
        }),
        tap(groups => {
          if (groups.some(group => group.subGroups.length > 0)) {
            this.ifExist = true;
          }
        }),
        timeout(AccordionComponent.SERVICES_TIMEOUT_MS),
        catchError(() => {
          this.servicesLoadFailed = true;
          return of([]);
        }),
        finalize(() => this.finishServicesRequest(generation, 'groups')))
      ;

      // Компонент OnPush, а update() зовётся и из async-колбэков (удаление группы/услуги).
      // Без markForCheck() вью не пересчитывается, async-пайпы не переподписываются на
      // новые стримы — их finalize не срабатывает, и плашка «Ищем услуги» висит вечно,
      // хотя отрисованный ранее список услуг остаётся на экране.
      this.cdr.markForCheck();
    }
  }

  /**
   * ShortServiceView с бэка не содержит images. Связка живёт в двух местах:
   * таблица ImageForServices (`GET albums/get-service/{id}`) и теги ServiceIds
   * на кадрах галереи. Карточка на витрине должна видеть оба — иначе фото,
   * привязанные из галереи, не попадают в превью.
   */
  private attachServiceImages<T extends { id?: string | null; images?: IViewImage[] }>(services: T[]): Observable<T[]> {
    const withId = services.filter(item => !!item.id);
    if (!withId.length) return of(services);
    const linked$ = forkJoin(withId.map(item =>
      this._apiImages.getImagesFromService(item.id!).pipe(
        timeout(8000),
        catchError(() => of([] as IViewImage[])),
        map(images => ({
          id: item.id as string,
          images: Array.isArray(images) ? images : [],
        }))
      )
    ));
    return forkJoin({ linked: linked$, tagged: this.galleryImagesByService() }).pipe(
      map(({ linked, tagged }) => {
        const byId = new Map(linked.map(pair => [pair.id, pair.images]));
        return services.map(item => {
          const fromJoin = (item.id && byId.get(item.id)) || [];
          const fromGallery = item.id ? (tagged.get(item.id.toLowerCase()) ?? []) : [];
          const images = this.uniqueImages([...fromJoin, ...fromGallery, ...(item.images ?? [])]);
          if (item instanceof Service) {
            item.images = images;
            return item;
          }
          return { ...item, images };
        });
      })
    );
  }

  /** Альбомы профиля один раз, кадры раскладываем по serviceIds. */
  private galleryImagesByService(): Observable<Map<string, IViewImage[]>> {
    if (!this.profileId) return of(new Map());
    if (!this.galleryByService$) {
      this.galleryByService$ = this._apiImages.getAlbums(this.profileId).pipe(
        catchError(() => of([] as IAlbumWithFoto[])),
        switchMap(albums => {
          const requests = albums
            .filter(album => !!album.id)
            .map(album => this._apiImages.getImages(album.id).pipe(
              catchError(() => of([] as IViewImage[])),
            ));
          if (!requests.length) return of([] as IViewImage[]);
          return forkJoin(requests).pipe(map(all => all.flat()));
        }),
        map(images => {
          const byService = new Map<string, IViewImage[]>();
          for (const image of images) {
            for (const serviceId of this.serviceIdsOf(image)) {
              const list = byService.get(serviceId) ?? [];
              list.push(image);
              byService.set(serviceId, list);
            }
          }
          return byService;
        }),
        catchError(() => of(new Map<string, IViewImage[]>())),
        shareReplay({ bufferSize: 1, refCount: false }),
      );
    }
    return this.galleryByService$;
  }

  private serviceIdsOf(image: IViewImage): string[] {
    const raw = (image.serviceIds ?? (image as IViewImage & { ServiceIds?: string[] }).ServiceIds ?? []) as unknown;
    if (!Array.isArray(raw)) return [];
    return raw.map(id => String(id).toLowerCase()).filter(Boolean);
  }

  private uniqueImages(list: IViewImage[]): IViewImage[] {
    const seen = new Set<string>();
    return list.filter(image => {
      if (!image?.id || seen.has(image.id)) return false;
      seen.add(image.id);
      return true;
    });
  }

  private finishServicesRequest(generation: number, key: 'groups' | 'without'): void {
    // Стрим прошлого поколения не должен списывать запросы у текущего.
    if (generation !== this.servicesRequestGeneration) return;
    this.servicesPending[key] = false;
    if (this.servicesPending.groups || this.servicesPending.without) {
      this.cdr.markForCheck();
      return;
    }

    /**
     * КРИТИЧНО: снимаем флаг только в микротаске.
     *
     * GroupService кеширует ответы на 30 секунд через shareReplay, поэтому
     * getGroupServices/getServiceWithout могут отдать значение и завершиться
     * СИНХРОННО — прямо в момент, когда async-пайп подписывается на них внутри
     * прохода change detection. А `*ngIf="isServicesLoading"` в этом проходе уже
     * отработал выше по шаблону и отрисовал плашку «Ищем услуги».
     *
     * При OnPush узел в том же проходе повторно не проверяется, а нового тика
     * может не быть вовсе: раз запрос не ушёл в сеть, некому его инициировать.
     * Плашка остаётся на экране навсегда, хотя данные давно загружены.
     *
     * Микротаска в зоне Angular гарантирует следующий тик, в котором вью
     * увидит уже согласованное состояние.
     */
    Promise.resolve().then(() => {
      if (generation !== this.servicesRequestGeneration) return;
      this.isServicesLoading = false;
      this.servicesLoaded = true;
      this.cdr.markForCheck();
    });
  }

  sortGroups() {
    this.groupShow.sort((a, b) => {
      const dateA = new Date(a.dateCreated);
      const dateB = new Date(b.dateCreated);
      return dateB.getTime() - dateA.getTime();
    });
    return this.groupShow
  }

  ngOnInit(): void {
    // Раньше подписка создавалась в ngOnChanges — то есть заново на каждое изменение
    // любого инпута, без отписки.
    this.subscriptions.add(this.dataService.getIsCheckboxChecked().subscribe((isChecked) => {
      this.isCheckboxChecked = isChecked;
      this.cdr.markForCheck();
    }));

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.profileId) {
      // Профиль пропал (родитель ещё не получил его или сбросил) — грузить нечего,
      // но и оставлять плашку «Ищем услуги» от прошлого профиля нельзя.
      this.servicesPending = { groups: false, without: false };
      this.isServicesLoading = false;
      return;
    }
    // update() перезапускает все запросы услуг. Раньше он срабатывал на изменение
    // любого инпута (reload/isUpdate/canSetService), заново роняя готовый список в
    // состояние загрузки. Перезапрашиваем только когда изменился источник данных.
    // `reload` из списка убран: после мутаций родитель зовёт update() напрямую.
    const reloadInputs = ['profileId', 'serviceId', 'isUpdate'];
    if (!changes || reloadInputs.some(key => changes[key])) {
      this.update();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  deleteGroup(group: Group) {
    if (!group.id) return;
    // Бэк теперь отвечает настоящим HTTP-статусом: 200 — удалено, 404/400/500 —
    // отказ, и он приходит в ветку error. Разбирать `code` из тела успешного
    // ответа больше не нужно.
    this._groupService.deleteGroup(group.id).subscribe({
      next: () => {
        this.showSuccessDelGr();
        this.update(true);
      },
      error: err => this.showErrorDelGr(err?.error?.message)
    });
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Создано', detail: 'Группа изменена', life: 5000 });
  }
  showSuccessDel() {
    this.messageService.add({ severity: 'success', summary: 'Успешно', detail: 'Услуга удалена', life: 5000 });
  }
  showErrorDelService(message?: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Не удалось удалить',
      detail: message || 'Услуга не удалена',
      life: 6000
    });
  }
  showSuccessDelGr() {
    this.messageService.add({ severity: 'success', summary: 'Успешно', detail: 'Группа удалена', life: 5000 });
  }
  showErrorDelGr(message?: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Не удалось удалить',
      detail: message || 'Группа услуг не удалена',
      life: 6000
    });
  }

  changeService(subGroup: subGroup) {
    if (subGroup.paymentForType === PaymentForType.ForService) {
      this._route.navigate(['../arenda-service'], {
        state: { subGroup, groups: this.mainGroups },
        relativeTo: this._activateRoute
      });
    } else {
      this._route.navigate([`../arenda-hour`], {
        state: { subGroup,  groups: this.mainGroups },
        relativeTo: this._activateRoute
      });
    }
  }

  changeGroupService(group: Group) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.group = group;
    modalRef.componentInstance.profileUserId = this.profileId;
    modalRef.componentInstance.isEdit = true;
    modalRef.result.then(
      res => {
        if (!res) return;
        this.showSuccess();
        this.update(true);
      },
      // dismiss (Esc/клик по фону) — не ошибка, гасим Unhandled Promise Rejection.
      () => { }
    );
  }

  changeGroup(subGroup: subGroup) {
    const modalRef = this.modalService.open(ChangeModalGroupComponent);
    modalRef.componentInstance.groups = this.mainGroups;
    modalRef.componentInstance.myGroupId = subGroup.groupServiceId;
    modalRef.result.then(
      (res: Group) => {
        if (res) {
          this._groupService.changeGroup(subGroup.id!, res.id!).subscribe(() => {
            this.showSuccess();
            this.update(true);
          });
        }
      },
      // dismiss (Esc/клик по фону) — гасим Unhandled Promise Rejection.
      () => { }
    );
  }

  deleteService(subGroup: subGroup) {
    if (!subGroup.id) return;
    this._groupService.deleteService(subGroup.id).subscribe({
      next: result => {
        // DELETE service/{id} пока отвечает 200 с конвертом даже на отказ —
        // проверку кода оставляем до приведения этого эндпоинта к HTTP-статусам.
        const code = result?.code;
        if (typeof code === 'number' && (code < 200 || code >= 300)) {
          this.showErrorDelService(result?.message);
          return;
        }
        this.showSuccessDel();
        this.update(true);
      },
      error: () => this.showErrorDelService()
    });
  }

  setService(service: Service | subGroup) {
    if (service.isChecked) {
      if ((this.sendService.find(_ => _.isChecked && !_.isTimeUnlimited && service.isTimeUnlimited))
      || this.sendService.find(_ => _.isChecked && _.isTimeUnlimited && !service.isTimeUnlimited)) {
        const modalRef = this.modalService.open(ConfirmWithoutTimeComponent);
        modalRef.result.then(result => {
          if (result) {
            // this.sendService.forEach(item => {
            //   this.delService(item);
            // });
            this.sendService.forEach(_ => {
              _.isChecked = false;
            })
            this.sendService = [];
           // this.setServices = new EventEmitter();
            this.addService(service);
          } else {
            service.isChecked = false;
          }

        });
       
      } else {
          this.addService(service);
    }
      
    } else {
      this.delService(service);
    }
  }
  isWriteTime(subGroup: Service) {
    return subGroup.paymentForType !== PaymentForType.ForHour && !subGroup.isTimeUnlimited;
  }

  private clearAllServices(ids: string[]) {
    this.sendService = [];
    // this.groupShow.forEach(item => {
    //   item.subGroups.forEach(_ => {
    //     _.isChecked = false;

    //   });
    // });
    if (this.combinedData$){
      this.combinedData$ = this.combinedData$.pipe(map(items => 
        items.map(_ => ({
           ..._,
           subGroups: _.subGroups.map((x: any) => ({
          ...x,
          isChecked: ids.includes(x.id) ? true :  false
        }))
      }
        )
      )));
  }
      
    
  if (this.serviceWithout$){
    this.serviceWithout$ = this.serviceWithout$?.pipe(map(items => {
      return items.map(_ => _.setCheck(ids.includes(_.id!) ? true : false))
    }));
  }
    // this.services.forEach(_ => {
    //   _.isChecked = false;

    // });
  }

  private addService(service: Service | subGroup) {
    service.isChecked = true;
    this.sendService.push(service);
    this.setServices.emit(this.sendService);
  }

  private delService(service: Service | subGroup) {
    // Возврат к каталожной цене за час — по сохранённой базе, а не обратным
    // делением на duration: при duration null/undefined оно давало Infinity/NaN.
    resetHourly(service);
    service.isChecked = false;
    if (service.isTimeUnlimited) {
      this.setIsTimeLimit = false;
    }
    this.sendService = this.sendService.filter(_ => _.id !== service.id);
    this.setServices.emit(this.sendService);
  }
  // else {
  //     let tempService = this.sendService.find(_ => _.id === service.id);
  //     if (tempService && tempService.paymentForType === PaymentForType.ForHour) {
  //       tempService.price = tempService.price / (tempService.duration! / 60);
  //     }
  //     this.sendService = this.sendService.filter(_ => _.id !== service.id);
  // }
  // this.setServices.emit(this.sendService);


  getDescribeTypePayment(subGroup: Service) {
    switch (subGroup.paymentForType) {
      case PaymentForType.ForHour: {
        return 'почасовая оплата';
      }
      case PaymentForType.ForService: {
        return 'оплата за услугу';
      }
      default: {
        return 'без ограничения';
      }
    }
  }

  protected readonly getHours = getHours;
  protected readonly getMinutes = getMinutes;



}
