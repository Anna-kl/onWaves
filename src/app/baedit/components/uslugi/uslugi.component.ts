import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AccordionComponent } from 'src/app/common/accordion/accordion.component';
import { ToastService } from 'src/services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalComponent } from './modal/modal.component';

import { IViewBusinessProfile } from "../../../DTO/views/business/IViewBussinessProfile";
import { BackendService } from "../../../../services/backend.service";
import { GroupService } from "../../../../services/groupservice";
import { CreateServiceModalComponent } from "../modals/create-service-modal/create-service-modal.component";
import { ProfileDataEditService } from "../../services/ba-edit-service";
import { FormatuslugiComponent } from 'src/app/components/modals/formatuslugi/formatuslugi.component';
import { Group } from "../../../DTO/views/services/IViewGroups";import { PaymentForType } from "../../../DTO/enums/paymentForType";
import { Service } from "../../../DTO/classes/services/Service";
import { select, Store } from '@ngrx/store';
import { selectProfileMainClient } from 'src/app/ngrx-store/mainClient/store.select';
import { Subscription, take } from 'rxjs';


@Component({
  selector: 'app-uslugi',
  templateUrl: './uslugi.component.html',
  styleUrls: ['./uslugi.component.scss'],
  providers: []
})
export class UslugiComponent implements OnInit, AfterViewInit, OnDestroy {

  // @Output() closeWindow = new EventEmitter();
  /** Список услуг на этом экране. Обновляем его напрямую: пришёл ответ — accordion.update(). */
  @ViewChild(AccordionComponent) accordion?: AccordionComponent;
  /** Сигнал об изменении услуг пришёл раньше, чем разрешился @ViewChild — доиграем в ngAfterViewInit. */
  private servicesRefreshPending = false;
  showDeletePanel = false;
  groups: Group[] = [];
  /**
   * Один контейнер на все подписки компонента. Раньше здесь было одно поле, в которое
   * подряд клали три разные подписки: каждое присваивание теряло предыдущую, и
   * ngOnDestroy отписывал только последнюю. Экран услуг пересоздаётся при каждом
   * возврате из формы услуги, поэтому мёртвые подписки на sendProfile копились и
   * дублировали запросы списка.
   */
  private readonly subscriptions = new Subscription();

  toggleDeletePanel() {
    this.showDeletePanel = !this.showDeletePanel;
  }
  id: string | null = null;
  profile!: IViewBusinessProfile | null;
  isUpdate = true;
  isActive: string = '';
  /** Услуги без указанного характера (workLocationType == null) — нужно дополнить. */
  servicesWithoutType: Service[] = [];

  constructor(
    private router: Router,
    private _dataService: ProfileDataEditService,
    private backendService: BackendService,
    private modalService: NgbModal,
    private messageService: ToastService,
    private _activateRoute: ActivatedRoute,
    private groupService: GroupService,
    private store$: Store
  ) {

   
  }


  setGroup($event: Group[]) {
    this.groups = [...$event];
  }
  ngOnInit(): void {
    this.subscriptions.add(this._activateRoute.params.subscribe(params => {
      this.isActive = params['isActive'];
    }));

    this.subscriptions.add(this._dataService.sendProfile.subscribe(
      result => {
        this.profile = result;
        // BehaviorSubject отдаёт null до того, как левая колонка положит профиль:
        // без проверки уходил запрос services/groups/undefined.
        if (!this.profile?.id) return;
        this.groupService.getGroupServices(this.profile.id)
          .subscribe(groups => {
            this.groups = groups;
          });
        this.loadServicesWithoutType(this.profile.id);
        this.openPendingModal();
      }));
    this.subscriptions.add(this.store$.pipe(select(selectProfileMainClient)).subscribe(result => {
      if (result) {
        this.profile = result;
        this.openPendingModal();
      }
    }));

    /**
     * Сигнал «услуга сохранена» из формы услуги (arenda/arenda2 → updateServices()).
     *
     * ВАЖНО ПРО ТАЙМИНГ. Формы `arenda-hour`/`arenda-service` — СОСЕДНИЕ роуты, а не
     * дочерние (см. ba-edit-routing.ts): при переходе в форму UslugiComponent
     * уничтожается, при возврате создаётся заново. Значит сигнал приходит не «живому»
     * экрану, а новому экземпляру — прямо здесь, в ngOnInit, потому что upServices это
     * BehaviorSubject и он отдаёт текущее значение сразу при подписке.
     *
     * А на момент ngOnInit `@ViewChild` ещё НЕ РАЗРЕШЁН — он готов только к
     * ngAfterViewInit. Поэтому стоявший тут `this.accordion?.update(true)` молча
     * ничего не делал, аккордеон грузился своим обычным `update(false)` и получал
     * список из кеша — без только что добавленной услуги.
     */
    this.subscriptions.add(this._dataService.upServices.subscribe(result => {
      if (!result) return;
      this._dataService.servicesUpdateHandled();
      if (this.accordion) this.refreshServices();
      else this.servicesRefreshPending = true;
    }));

    // Модалку по matrix-параметру isActive открываем не здесь, а из openPendingModal()
    // (см. комментарий там): на этот момент profile ещё null.
    this.openPendingModal();
  }

  ngAfterViewInit(): void {
    if (!this.servicesRefreshPending) return;
    this.servicesRefreshPending = false;
    // Менять состояние дочернего компонента синхронно в ngAfterViewInit нельзя:
    // его вью в этом проходе уже проверено → ExpressionChangedAfterItHasBeenChecked.
    // Микротаска гарантирует следующий тик.
    Promise.resolve().then(() => this.refreshServices());
  }

  /** Перечитать список услуг строго с сервера (после создания/изменения услуги). */
  private refreshServices(): void {
    this.accordion?.update(true);
    if (this.profile?.id) this.loadServicesWithoutType(this.profile.id, true);
  }

  /**
   * Открывает модалку «создать группу/услугу», запрошенную matrix-параметром
   * isActive (переход с карточки профиля).
   *
   * Раньше вызов стоял в конце ngOnInit. Но profile приходит из BehaviorSubject,
   * который до момента, когда левая колонка положит туда профиль, отдаёт null —
   * и в модалку уезжал profileUserId === undefined. Бэк отвечал успехом, но
   * создавал группу без привязки к профилю, поэтому в списке услуг она не
   * появлялась ни сразу, ни после перезагрузки.
   */
  private isPendingModalOpened = false;
  private openPendingModal(): void {
    if (this.isPendingModalOpened || !this.profile?.id || !this.isActive) return;
    const action = this.isActive;
    this.isPendingModalOpened = true;
    this.clearIsActiveParam();
    if (action === 'uslug') {
      this.createBAProfileFormatUslugi();
    } else if (action === 'group') {
      this.openPopUpM();
    }
  }

  /** Подтягиваем услуги без указанного характера (для баннера «дополните услуги»). */
  private loadServicesWithoutType(id: string, force = false): void {
    this.groupService.getServicesWithoutLocation(id, force).subscribe({
      next: list => this.servicesWithoutType = list ?? [],
      error: () => this.servicesWithoutType = []
    });
  }

  /** Переход к редактированию услуги, чтобы указать её характер (на месте/выезд/онлайн). */
  editServiceType(service: Service): void {
    const navigateTo = (svc: Service) => {
      const target = svc.paymentForType === PaymentForType.ForHour ? 'arenda-hour' : 'arenda-service';
      this.router.navigate([`../${target}`], {
        relativeTo: this._activateRoute,
        state: { subGroup: svc, groups: this.groups }
      });
    };
    // without-location отдаёт урезанный ShortServiceView — подгружаем полную услугу для формы.
    if (this.profile?.id && service.id) {
      this.groupService.getServiceById(this.profile.id, service.id).subscribe({
        next: full => navigateTo(full ?? service),
        error: () => navigateTo(service)
      });
    } else {
      navigateTo(service);
    }
  }

  /**
   * Убираем matrix-параметр isActive из URL, чтобы возврат назад (location.back после
   * сохранения услуги/группы) не открывал модалку заново.
   */
  private clearIsActiveParam(): void {
    if (!this.isActive) return;
    this.isActive = '';
    // Пустой объект matrix-параметров на текущем маршруте → URL без ;isActive=…
    this.router.navigate([{}], { relativeTo: this._activateRoute, replaceUrl: true });
  }
  saveChanges(): void {
    if (this.profile) {
      this.subscriptions.add(this.backendService.saveProfile(this.profile.id!, this.profile!).subscribe(
        () => {

          this.showSuccess();
        },
        (error: any) => {

        }
      ));
    }
  }
  // closeModal() {
  //   this.activeModal.close();
  // }
  backToProfile() {
    this.router.navigate(['profilebisacc', this.id]);
  }

  private modaltPopUpMRef: any;
  openPopUpM() {
    // Без id профиля группа создастся «ничьей» и в списке не появится.
    if (!this.profile?.id) return;
    this.modaltPopUpMRef = this.modalService.open(ModalComponent);
    this.modaltPopUpMRef.componentInstance.profileUserId = this.profile.id;
    this.modaltPopUpMRef.result.then(
      (result: any) => {
        // undefined — закрыли крестиком, ничего не создавали.
        if (!result) return;
        this.showSuccessGroup();
        // Пришёл ответ от бэка — перечитываем список. update() сам сбрасывает кеш
        // чтения, поэтому запрос реально уходит в сеть.
        this.accordion?.update(true);
      },
      // Закрытие по Esc/клику по фону — это dismiss, промис реджектится.
      // Без обработчика в консоли копились Unhandled Promise Rejection.
      () => { }
    );
  }

  openPopUpMS() {
    const modalRef = this.modalService.open(CreateServiceModalComponent);

  }

  // Удаление группы живёт в аккордеоне (deleteGroup(group) по group.id). Здесь был
  // дубль, передававший в DELETE group/{id} НАЗВАНИЕ группы, — из шаблона он не
  // вызывался, но при подключении молча удалял бы не то. Убран.

  goToArenda() {
    this.router.navigate(['profile-ba/arenda']);
  }
  goToUslugis() {
    this.router.navigate(['profile-ba/uslugis']);
  }
  goToMobMenu() {
    this.router.navigate(['profile-ba/mobmenu']);
  }
  goToDayRent() {
    this.router.navigate(['profile-ba/dayrent']);
  }

  private modaltUslugiRef: any;
  createBAProfileFormatUslugi() {
    // this.closeWindow.emit();
    // this.active = !this.active;
    this.modaltUslugiRef = this.modalService.open(FormatuslugiComponent);
    this.modaltUslugiRef.componentInstance.id = this.profile?.id;
    this.modaltUslugiRef.result.then((type: any) => {
      if (type === PaymentForType.ForHour) {
        this.router.navigate([`../arenda-hour`], { relativeTo: this._activateRoute,  state: { subGroup: null,  groups: this.groups } })
      } else {
        this.router.navigate([`../arenda-service`], { relativeTo: this._activateRoute,  state: { subGroup: null,  groups: this.groups } })
      }
    });

  }

  /*** выплываюзее уведомление p-toast    */
  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Создано', detail: 'Изменения сохранены', life: 5000 });
  }

  showSuccessGroup() {
    this.messageService.add({ severity: 'success', summary: 'Готово', detail: 'Группа услуг создана', life: 5000 });
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();

    if (this.modaltUslugiRef) {
      this.modaltUslugiRef.close();
    }
    if (this.modaltPopUpMRef) {
      this.modaltPopUpMRef.close();
    }


  }
}
