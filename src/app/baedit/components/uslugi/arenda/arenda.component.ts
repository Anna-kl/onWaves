import {select, Store} from "@ngrx/store";
import { ToastService } from 'src/services/toast.service';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { Location } from '@angular/common'
import {ICategory} from "../../../../DTO/classes/ICategory";
import {Gender} from "../../../../DTO/enums/gender";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProfileDataEditService} from "../../../services/ba-edit-service";
import {Group} from "../../../../DTO/views/services/IViewGroups";
import {CurrencyType} from "../../../../DTO/enums/currencyType";
import {currencyName} from "../../../../../helpers/constant/currencyConstant";
import {selectProfileMainClient} from "../../../../ngrx-store/mainClient/store.select";
import {IViewBusinessProfile} from "../../../../DTO/views/business/IViewBussinessProfile";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ChooseAlbumComponent} from "../../modals/choose-album/choose-album.component";
import {AlbumsService} from "../../../../../services/albums.service";
import {IViewImage} from "../../../../DTO/views/images/IViewImage";
import {DomSanitizer} from "@angular/platform-browser";
import {PaymentForType} from "../../../../DTO/enums/paymentForType";
import {Service} from "../../../../DTO/classes/services/Service";
import {ServiceStatus} from "../../../../DTO/enums/serviceStatus";
import {GroupService} from "../../../../../services/groupservice";
import { getNameCurrency, priceUnitOf } from "src/helpers/common/price.helpers";
import { BehaviorSubject, Subject, takeUntil, tap, catchError, timeout, switchMap, of, forkJoin } from "rxjs";
import { environment } from "src/enviroments/environment";
import { WorkLocationType } from "../../../../DTO/enums/workLocationType";
import { serviceWorkLocationType } from "src/helpers/common/address";
import { ServicePriceUnit } from "../../../../DTO/enums/servicePriceUnit";

@Component({
  selector: 'app-arenda',
  templateUrl: './arenda.component.html',
  styleUrls: ['./arenda.component.scss'],
  // GroupService — только корневой (`providedIn: 'root'`), см. комментарий в Arenda2Component.
  providers: [AlbumsService, NgbActiveModal ]
})

export class ArendaComponent implements OnInit, OnDestroy {
  isRubric = true;
  category: ICategory|null = null;
  allGenders: Gender[] = [
    Gender.Woman,
    Gender.Men,
    Gender.Children,
    Gender.Pet];
  images: IViewImage[] = [];
  currencies: CurrencyType[] = [CurrencyType.RUB];
  genders: Gender[] = [];
  maxChars: number = environment.TEXT_LENGTH;
  remainingText = environment.TEXT_LENGTH;
  remainingChars: number = this.maxChars;
  text: string = '';
  serviceGroup!: FormGroup;
  groups: Group[] = [];
  service: Service|null = null;
  profile: IViewBusinessProfile|null = null;
  imagesId: string[] = [];
  private mediaReady = false;

  onMediaIds(ids: string[]): void {
    this.imagesId = ids ?? [];
    this.mediaReady = true;
  }
  choosedGroup: Group = {name: 'Выберите группу', id: '', profileUserId: ''};
  characterCount: number = 0;
  private destroy$ = new Subject<void>();

  isErrorPrice = false;
  isErrorName = false;
  isErrorGender = false;
  isErrorFormat = false;
  /** Формат оказания услуги (radio). */
  locationType: WorkLocationType | null = null;

  // ══════════════════════════════════════════════════════════════
  // КРИТИЧНО: Флаги состояния загрузки и идемпотентность
  // ══════════════════════════════════════════════════════════════
  isSaving$ = new BehaviorSubject<boolean>(false);
  isLoadingImages$ = new BehaviorSubject<boolean>(false);
  private readonly requestId = this.generateRequestId();

  errors = {
    errorLink: 'Заполните поле',
    errorLinkStyle: 'border-color: red; color: red'
  };
  changeService: Service|null = null;
  limitServiceName(event: any) {
    const inputText = event.target.value;
    if (inputText.length > 50) {
      event.target.value = inputText.substring(0, 50); // Truncate to 70 characters
    }
    this.characterCount = event.target.value.length;
  }
  setGender(gender: Gender) {
    if (gender === Gender.All) {
      if (this.genders.length === this.allGenders.length) {
        this.genders = [];
      } else {
        this.genders = [...this.allGenders];
      }
    } else {
      if (this.genders.includes(gender)) {
        this.genders = this.genders.filter((_gender) => _gender !== gender);
      } else {
        this.genders.push(gender);
      }
    }
  }
  constructor(private router: Router,
              private builder: FormBuilder,
              private store: Store,
              private activeModal: NgbActiveModal,
              private modalService: NgbModal,
              private sanitizer: DomSanitizer,
              private _apiImage: AlbumsService,
              private _apiService: GroupService,
              private messageService: ToastService,
              private location: Location,
              private _dataService: ProfileDataEditService) {
    const temp = this.router.getCurrentNavigation()?.extras.state;
    if (temp) {
      this.service = temp['subGroup'];
      this.groups = temp['groups'];
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  customValidator(control: { value: string; }) {
    const validInput = /^[0-9:]*$/; // Регулярное выражение, разрешающее только цифры и двоеточия
    return validInput.test(control.value) ? null : { invalidInput: true };
  }

  goToRubric() {
    this.router.navigate(['profile-ba/rubric']);
  }
  goToBackInUslugi() {
    this.router.navigate([ `ba-edit/${this.profile?.id}/uslugi`]);
  }

  ngOnInit(): void {
    this.loadProfile();

    // Инициализировать форму после загрузки данных
    this.initializeForm();

    // Следить за изменениями в текстовом поле
    this.serviceGroup?.get('about')?.valueChanges
      .pipe(
        tap(res => {
          if (res.length >= environment.TEXT_LENGTH) {
            this.serviceGroup?.patchValue({'about': res.substring(0, 149)});
          }
          this.remainingText = environment.TEXT_LENGTH - res.length;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  /**
   * Загружает профиль из store с управлением подписками
   */
  private loadProfile(): void {
    this.store.pipe(
      select(selectProfileMainClient),
      takeUntil(this.destroy$)
    ).subscribe(result => {
      this.profile = result;
    });
  }

  /**
   * Инициализирует форму в зависимости от того редактируется ли услуга или создается новая
   */
  private initializeForm(): void {
    if (this.service) {
      const selectedGroup =
              this.service?.groupServiceId != null
                ? (this.groups?.find(g => g.id === this.service!.groupServiceId) ?? null)
                : (this.choosedGroup ?? null);
      this.isRubric = false;

      this.serviceGroup = this.builder.group({
              id: [this.service.id],
              name: [this.service.name, Validators.required],
              about: [this.service.about],
              group: [selectedGroup],   // <-- контроль с value
              isAll: [this.service.gender.includes(Gender.All)],
              isWoman: [this.service.gender.includes(Gender.Woman)],
              isMen: [this.service.gender.includes(Gender.Men)],
              isChildren: [this.service.gender.includes(Gender.Children)],
              isPet: [this.service.gender.includes(Gender.Pet)],
              price: this.builder.group({
                price: [this.service.price.price],
                isRange: [this.service.price.isRange],
                startRange: [this.service.price.startRange],
                endRange: [this.service.price.endRange],
                currencyType: [CurrencyType.RUB],
                priceUnit: [priceUnitOf(this.service.price) ?? ServicePriceUnit.Hour],
              })
            });

      // Характер услуги — для редактирования (устойчиво к регистру ключа).
      this.locationType = serviceWorkLocationType(this.service) ?? null;
    } else {
      this.serviceGroup = this.builder.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        about: ['', [Validators.maxLength(environment.TEXT_LENGTH)]],
        group: this.choosedGroup,
        isAll: false,
        isWoman: false,
        isMen: false,
        isChildren: false,
        isPet: false,
        price: this.builder.group({
          price: new FormControl(null),
          isRange: false,
          startRange: null,
          endRange: null,
          currencyType: CurrencyType.RUB,
          priceUnit: ServicePriceUnit.Hour,
        }),
      });
    }
  }

  protected readonly getNameCurrency = getNameCurrency;

  readonly implicitPriceUnit = ServicePriceUnit.Hour;

  setPriceUnit(unit: ServicePriceUnit): void {
    this.serviceGroup?.get('price')?.get('priceUnit')?.setValue(unit);
  }

  isFormValid(): boolean {
     const priceControl = this.serviceGroup.get('price');
     let price = priceControl!.get('price');
    let b = this.serviceGroup.get('isWoman')?.value || this.serviceGroup.get('isMen')?.value
    || this.serviceGroup.get('isPet')?.value || this.serviceGroup.get('isChildren')?.value;
     // Цена должна быть >= 0 (допускаем 0)
     let a = (this.serviceGroup.valid && price?.value >= 0
     && (this.serviceGroup.get('isWoman')?.value || this.serviceGroup.get('isMen')?.value
    || this.serviceGroup.get('isPet')?.value || this.serviceGroup.get('isChildren')?.value));
     // Формат оказания услуги обязателен.
     return !!a && this.locationType != null;
  }

  getGender(gender: Gender){
    return this.genders.includes(gender);
  }
  setCategory($event: ICategory) {
    this.isRubric = false;
    this.category = $event;
  }

  updateCounter() {
    this.remainingChars = this.maxChars - this.text.length;
    if (this.remainingChars < 0) {
      this.text = this.text.slice(0, this.maxChars); // ограничиваем количество символов
      this.remainingChars = 0;
    }
  }

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Создано', detail: 'Услуга добавлена',
      life:5000});
  }
  showSuccess2() {
    this.messageService.add({severity:'success', summary: 'Успешно', detail: 'Услуга изменена',
      life:5000});
  }
  /** Успех сохранения: «изменена» при редактировании, «добавлена» при создании. */
  private notifySaved() {
    this.service ? this.showSuccess2() : this.showSuccess();
    // Сообщаем экрану услуг, что список устарел (см. комментарий в Arenda2Component).
    this._dataService.updateServices();
  }

  /**
   * Генерирует уникальный ID запроса для идемпотентности
   * UUID v4 - гарантирует уникальность в рамках сессии
   */
  private generateRequestId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  /**
   * Показывает сообщение об ошибке пользователю
   */
  private showErrorMessage(err: any): void {
    const message = this.getErrorMessage(err);
    this.messageService.add({
      severity: 'error',
      summary: 'Ошибка создания услуги',
      detail: message,
      life: 5000
    });
  }

  /**
   * Преобразует код ошибки в человекочитаемое сообщение
   */
  private getErrorMessage(err: any): string {
    if (err?.name === 'TimeoutError') {
      return 'Сеть медленная. Пожалуйста, проверьте соединение и попробуйте снова.';
    }
    // Текст ошибки с бэка (напр. «Укажите характер услуги…», «У вас не настроен формат работы…»).
    const backend = this.extractBackendMessage(err);

    if (err?.status === 409) {
      return backend ?? 'Услуга с таким названием уже существует.';
    }
    if (err?.status === 400) {
      return backend ?? 'Ошибка в данных формы. Проверьте все поля.';
    }
    if (err?.status === 500) {
      return backend ?? 'Ошибка сервера. Попробуйте позже.';
    }
    if (err?.status === 0 || !err?.status) {
      return backend ?? 'Проблема с подключением. Проверьте интернет.';
    }
    return backend ?? `Ошибка ${err?.status || ''}: ${err?.message || 'Неизвестная ошибка'}`;
  }

  /** Достаёт человекочитаемый текст ошибки из ответа бэка (строка/{message}/IResponse). */
  private extractBackendMessage(err: any): string | null {
    if (typeof err?.backendMessage === 'string' && err.backendMessage.trim()) {
      return err.backendMessage.trim();
    }
    const body = err?.error;
    if (typeof body === 'string' && body.trim()) {
      return body.trim();
    }
    if (body && typeof body.message === 'string' && body.message.trim()) {
      return body.message.trim();
    }
    return null;
  }

  save(): void {
    let flagValidation = true;
    this.isErrorGender = false;
    this.isErrorName = false;
    this.isErrorPrice = false;
    this.isErrorFormat = false;
    let data = this.serviceGroup.getRawValue();
    let gender: Gender[] = [];

    if (data['isWoman']) gender.push(Gender.Woman);
    if (data['isMen']) gender.push(Gender.Men);
    if (data['isChildren']) gender.push(Gender.Children);
    if (data['isPet']) gender.push(Gender.Pet);
    if (data['isAll']) gender.push(Gender.All);

    // Цена может быть 0 (допускаем бесплатные услуги)
    if (data['price']['price'] === null || data['price']['price'] === undefined) {
      this.isErrorPrice = true;
      flagValidation = false;
    }
    if (gender.length === 0) {
      this.isErrorGender = true;
      flagValidation = false;
    }
    if (data['name'].length === 0) {
      this.isErrorName = true;
      flagValidation = false;
    }
    if (this.locationType == null) {
      this.isErrorFormat = true;
      flagValidation = false;
    }

    if (!flagValidation) return;

    // ══════════════════════════════════════════════════════════════
    // КРИТИЧНО: Блокируем UI во время отправки
    // ══════════════════════════════════════════════════════════════
    this.isSaving$.next(true);

    const service = new Service(
      this.service ? this.service.id : null,
      data['name'].replace('\n', ''),
      gender,
      this.profile?.id!,
      data['price'],
      PaymentForType.ForHour,
      data['group'].id !== '' ? data['group']['id'] : null,
      data['about'],
      data['duration'],
      false,
      // При редактировании рубрику заново не выбирают — сохраняем существующую категорию услуги.
      this.category?.id ?? this.service?.categoryId
    );
    // Характер услуги (backend 2026-07-19).
    service.workLocationType = this.locationType;

    // ══════════════════════════════════════════════════════════════
    // КРИТИЧНО: Передаем requestId для идемпотентности
    // ══════════════════════════════════════════════════════════════
    this._apiService.saveService(service, this.requestId).pipe(
      timeout(15000),  // таймаут 15 сек
      tap(result => {
        // 201 — создание новой услуги, 200 — обновление существующей.
        if (result.code === 201 || result.code === 200) {
          const serv = result.data as Service;
          const shouldSyncMedia = !!serv.id && (this.imagesId.length > 0 || (!!this.service && this.mediaReady));
          if (shouldSyncMedia) {
            this.saveImages(this.imagesId, serv.id!);
          } else {
            this.notifySaved();
            this.isSaving$.next(false);
            this.location.back();
          }
        } else {
          this.isSaving$.next(false);
          this.showErrorMessage({ status: result.code, backendMessage: result.message });
        }
      }),
      catchError(err => {
        this.isSaving$.next(false);
        this.showErrorMessage(err);
        console.error('Ошибка при создании услуги:', err);
        return of(null);
      }),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  /**
   * Загружает изображения для услуги
   */
  private saveImages(imageIds: string[], serviceId: string): void {
    this._apiImage.saveImageService(imageIds, serviceId)
      .pipe(
        timeout(15000),
        tap(() => {
          this.notifySaved();
          this.isSaving$.next(false);
          this.location.back();
        }),
        catchError(err => {
          this.isSaving$.next(false);
          this.notifySaved(); // Услуга сохранена, только изображения не загружены
          console.error('Ошибка при загрузке изображений:', err);
          this.location.back();
          return of(null);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  changeCurrency($event: Event) {
  }

  /**
   * Загружает изображения из альбома
   * Использует RxJS composition вместо вложенных подписок
   */
  addFoto(): void {
    const modalRef = this.modalService.open(ChooseAlbumComponent);
    modalRef.componentInstance.profileId = this.profile?.id;

    modalRef.result
      .then((result: string[]) => {
        this.imagesId = result;
        this.isLoadingImages$.next(true);

        // Загружаем все изображения параллельно с forkJoin
        forkJoin(
          result.map(item =>
            this._apiImage.getImage(item).pipe(
              timeout(10000),
              catchError(err => {
                console.error(`Ошибка загрузки изображения ${item}:`, err);
                return of(null);
              })
            )
          )
        )
          .pipe(
            tap(images => {
              this.images = images.filter((img): img is IViewImage => img !== null);
              this.isLoadingImages$.next(false);
            }),
            catchError(err => {
              console.error('Ошибка при загрузке изображений:', err);
              this.isLoadingImages$.next(false);
              this.showErrorMessage({ message: 'Ошибка загрузки изображений' });
              return of([]);
            }),
            takeUntil(this.destroy$)
          )
          .subscribe();
      })
      .catch(err => {
        // Пользователь отменил выбор
        console.log('Выбор альбома отменен', err);
      });
  }

  back(){
    if (!this.isRubric){
      this.isRubric = true;
    }
    let element = document.getElementById('groupModal');
    element?.scrollIntoView(true);
  }

  getImage(image: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64, ${image}`);
  }

}
