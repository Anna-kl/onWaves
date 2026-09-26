import {select, Store} from "@ngrx/store";
import { ToastService } from 'src/services/toast.service';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {ICategory} from "../../../../DTO/classes/ICategory";
import {Gender} from "../../../../DTO/enums/gender";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProfileDataEditService} from "../../../services/ba-edit-service";
import {Group} from "../../../../DTO/views/services/IViewGroups";
import {CurrencyType} from "../../../../DTO/enums/currencyType";
import {currencyName} from "../../../../../helpers/constant/currencyConstant";
import {selectProfileMainClient} from "../../../../ngrx-store/mainClient/store.select";
import {IViewBusinessProfile} from "../../../../DTO/views/business/IViewBussinessProfile";
import {IViewImage} from "../../../../DTO/views/images/IViewImage";
import {DomSanitizer} from "@angular/platform-browser";
import {ChooseAlbumComponent} from "../../modals/choose-album/choose-album.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AlbumsService} from "../../../../../services/albums.service";
import {GroupService} from "../../../../../services/groupservice";
import {Service} from "../../../../DTO/classes/services/Service";
import { map, Subject, switchMap, takeUntil, tap, BehaviorSubject, catchError, timeout, of, forkJoin } from 'rxjs';
import {PaymentForType} from "../../../../DTO/enums/paymentForType";
import {DisallowSymbolsDirective} from "src/app/disallow-symbols.directive";
import {
  getHoursString,
  getMinutesStr,
  getTimeFromFields
} from "../../../../../helpers/common/timeHelpers";
import { getNameCurrency, priceUnitOf } from "src/helpers/common/price.helpers";
import { environment } from "src/enviroments/environment";
import { WorkLocationType } from "../../../../DTO/enums/workLocationType";
import { serviceWorkLocationType } from "src/helpers/common/address";
import { ServicePriceUnit } from "../../../../DTO/enums/servicePriceUnit";

@Component({
  selector: 'app-arenda2',
  templateUrl: './arenda2.component.html',
  styleUrls: ['./arenda2.component.scss'],
  // GroupService — только корневой (`providedIn: 'root'`). Со своим экземпляром форма
  // инвалидировала собственный кеш, а экран услуг читал чужой и не видел новую услугу.
  providers: [AlbumsService, DisallowSymbolsDirective],

})
export class Arenda2Component implements OnInit, OnDestroy {
  changeService: { [k: string]: any; } | undefined; 
  TEXT_LENGTH: number = environment.TEXT_LENGTH;


  changeDb($event: Event) {
   console.log($event);
  }

  private destroy$ = new Subject<void>();
  currencyType: CurrencyType = CurrencyType.RUB;

  // ══════════════════════════════════════════════════════════════
  // КРИТИЧНО: Флаги состояния загрузки и идемпотентность
  // ══════════════════════════════════════════════════════════════
  isSaving$ = new BehaviorSubject<boolean>(false);
  isLoadingImages$ = new BehaviorSubject<boolean>(false);
  private readonly requestId = this.generateRequestId();

  getIsRange(flag: boolean): boolean {
    let data = this.serviceGroup?.value;
    if ((data['price']['isRange'] && flag)){
      return true;
    }
    if ((data['price']['isRange'] || flag) === false){
      return true;
    }else{
      return false;
    }
  }

  myForm!: FormGroup;
  isRubric = true;
  category: ICategory|null = null;
  allGenders: Gender[] = [
    Gender.Woman,
    Gender.Men,
    Gender.Children,
    Gender.Pet];
  groupsHours: string[] = ['00','01', '02', '03', '04', '05', '06', '07' ,'08', '09', '10','11','12','13','14','15','16','17','18','19','20','21','22','23'];

  groupsMinutes: string[] = ['00', '15', '30', '45'];
  currencies: CurrencyType[] = [CurrencyType.RUB];
  genders: Gender[] = [];
  maxChars: number = environment.TEXT_LENGTH;
  remainingText = environment.TEXT_LENGTH;
  remainingChars: number = this.maxChars;
  text: string = '';
  serviceGroup!: FormGroup;

  groups: Group[] = [];
  service: Service|null = null;
  allSelected: boolean = true;
  profile: IViewBusinessProfile|null = null;
  images: IViewImage[] = [];
  imagesId: string[] = [];
  private mediaReady = false;

  onMediaIds(ids: string[]): void {
    this.imagesId = ids ?? [];
    this.mediaReady = true;
  }
  choosedGroup: Group = {name: 'Выберите группу', id: '', profileUserId: ''};
  characterCount: number = 0;
  errors = {
    errorLink: 'Заполните поле',
    errorLinkStyle: 'border-color: red; color: red'
  };
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
              private location: Location,
              private builder: FormBuilder,
              private store: Store,
              private modalService: NgbModal,
              private sanitizer: DomSanitizer,
              private _apiImage: AlbumsService,
              private _apiService: GroupService,
              private messageService: ToastService,
              private _dataService: ProfileDataEditService) {
  
    this.store.pipe(select(selectProfileMainClient)).pipe(takeUntil(this.destroy$)).subscribe(result => {
        this.profile = result;
        // this.profile?.currency?.forEach(item => {
        //   this.currencies?.push(currencyName[item]);
        // });
      }
    );
      let temp = this.router.getCurrentNavigation()?.extras.state;
      if (temp){
        this.changeService  = temp['subGroup'];
        this.groups = temp['groups'];
      }
  }
  get duration() {
    //return this.myForm.get('numericInput') || new FormControl('');
    return this.myForm.get('duration') || new FormControl('');
  }



  customValidator(control: { value: string; }) {
    const validInput = /^[0-9:]*$/; // Регулярное выражение, разрешающее только цифры и двоеточия
    return validInput.test(control.value) ? null : { invalidInput: true };
  }

  onKeyPress(event: any) {
    const allowedChars = /[0-9:]/; // Разрешенные символы: числа и двоеточие

    // Проверяем, является ли символ разрешенным, иначе отменяем ввод
    if (!allowedChars.test(event.key)) {
      event.preventDefault();
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
    // Сообщаем экрану услуг, что список устарел: он пересоберёт аккордеон, даже если
    // остался живым (возврат через location.back() не всегда пересоздаёт компонент).
    this._dataService.updateServices();
  }

  ngOnDestroy(){
        // Эмитируем значение, чтобы завершить все потоки, подписанные через takeUntil
        this.destroy$.next();
        this.destroy$.complete();
  }

  ngOnInit(): void {

    this.serviceGroup = this.builder.group({
      name: new FormControl(null, Validators.required),
      about: '',
      group: this.choosedGroup,
      isAll: false,
      isWoman: false,
      isMen: false,
      isChildren: false,
      isPet: false,
      //price: 0,
      price: this.builder.group({
        price: null,
        isRange: false,
        startRange: null,
        endRange: null,
        currencyType: new FormControl(this.currencies[0], Validators.required),
        priceUnit: ServicePriceUnit.Service,
      }),
      isTimeUnlimited: false,
      durationHours: this.groupsHours[0],
      durationMinutes: this.groupsMinutes[0]
    });
    
               
         if (this.changeService ){
            this.service = this.changeService as Service;
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
                priceUnit: [priceUnitOf(this.service.price) ?? ServicePriceUnit.Service],
              }),
              durationHours: [this.service.duration ? getHoursString(this.service.duration) : this.groupsHours[0]],
              isTimeUnlimited: [this.service.isTimeUnlimited],
              durationMinutes: [this.service.duration ? getMinutesStr(this.service.duration) : this.groupsMinutes[0]],
            });

            // Характер услуги — для редактирования (устойчиво к регистру ключа).
            this.locationType = serviceWorkLocationType(this.service) ?? null;
  }
          
    this.serviceGroup?.get('about')!.valueChanges.subscribe(
      res => {
        if (res.length >= environment.TEXT_LENGTH){
          this.serviceGroup?.patchValue({'about': res.substring(0, environment.TEXT_LENGTH)});
        }
        this.remainingText = environment.TEXT_LENGTH - res.length;
      }
    );
    this.serviceGroup?.get('isTimeUnlimited')!.valueChanges.subscribe(
        res => {
          if (res) {
            this.serviceGroup?.get('durationMinutes')!.disable();
            this.serviceGroup?.get('durationHours')!.disable();
          } else {
            this.serviceGroup?.get('durationMinutes')!.enable()
            this.serviceGroup?.get('durationHours')!.enable();
          }
        }
    );

    // Валюту нельзя менять при диапазонной цене — состоянием disabled управляет форма
    // (а не атрибут [disabled] в шаблоне, на который ругается Reactive Forms).
    const currencyCtrl = this.serviceGroup?.get('price')?.get('currencyType');
    const isRangeCtrl = this.serviceGroup?.get('price')?.get('isRange');
    const syncCurrencyDisabled = (isRange: boolean) =>
      isRange ? currencyCtrl?.disable({ emitEvent: false }) : currencyCtrl?.enable({ emitEvent: false });
    syncCurrencyDisabled(!!isRangeCtrl?.value);
    isRangeCtrl?.valueChanges.subscribe(res => syncCurrencyDisabled(!!res));
  }
  // isFormValid(): boolean {
  //   return this.serviceGroup.valid;
  // }
  isErrorTime = false;
  isErrorPrice = false;
  isErrorName = false;
  isErrorGender = false;
  isErrorFormat = false;
  /** Формат оказания услуги (radio). Значение выбирается в app-service-format-select. */
  locationType: WorkLocationType | null = null;

  isFormValid(): boolean {
    const priceControl = this.serviceGroup?.get('price');
    let flag = true;
    if (priceControl){
      if (priceControl.get('isRange')?.value){
       if (!priceControl.get('startRange')?.value)
        flag = false;
      }else
        // Цена может быть 0 (проверяем что не null/undefined)
        if (priceControl.get('price')?.value === null || priceControl.get('price')?.value === undefined){
          flag = false;
        }
    }

    if (!( this.serviceGroup?.get('isPet')?.value || this.serviceGroup?.get('isWoman')?.value
    || this.serviceGroup?.get('isMen')?.value || this.serviceGroup?.get('isAll')?.value
    ||this.serviceGroup?.get('isChildren')?.value)){
        flag = false;
    }
    if (!this.serviceGroup?.get('isTimeUnlimited')?.value){
          if (this.serviceGroup?.get('durationHours')?.value === '00' &&
          this.serviceGroup?.get('durationMinutes')?.value === '00' ){
            flag = false;
          }
    }
    // Формат оказания услуги обязателен.
    if (this.locationType == null) {
      flag = false;
    }
    if ( this.serviceGroup)
      return this.serviceGroup?.valid && flag;
    else{
      return false;
    }
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
      this.text = this.text.slice(0, this.maxChars);
      this.remainingChars = 0;
    }
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
    this.isErrorTime = false;
    this.isErrorPrice = false;
    this.isErrorFormat = false;
    let data = this.serviceGroup?.getRawValue();
    let gender: Gender[] = [];

    if (data['isWoman']) gender.push(Gender.Woman);
    if (data['isMen']) gender.push(Gender.Men);
    if (data['isChildren']) gender.push(Gender.Children);
    if (data['isPet']) gender.push(Gender.Pet);
    if (data['isAll']) gender.push(Gender.All);

    if ((data['durationHours'] === '00' && data['durationMinutes'] === '00') && !data['isTimeUnlimited']) {
      this.isErrorTime = true;
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
      PaymentForType.ForService,
      data['group'].id !== '' ? data['group']['id'] : null,
      data['about'],
      getTimeFromFields(data['durationHours'], data['durationMinutes']),
      data['isTimeUnlimited'],
      // При редактировании рубрику заново не выбирают — сохраняем существующую категорию услуги.
      this.category?.id ?? this.service?.categoryId
    );
    // Характер услуги (backend 2026-07-19).
    service.workLocationType = this.locationType;

    // ══════════════════════════════════════════════════════════════
    // КРИТИЧНО: Передаем requestId для идемпотентности
    // ══════════════════════════════════════════════════════════════
    this._apiService.saveService(service, this.requestId).pipe(
      timeout(15000),
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

  getImage(image: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64, ${image}`);
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
        this.images = [];
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

  goToBackInUslugi() {
    this.router.navigate([ `ba-edit/${this.profile?.id}/uslugi`]);
  }

  backToCategories() {
    this.isRubric = true;
    let element = document.getElementById('groupModal');
    element?.scrollIntoView(true);
  }

  readonly implicitPriceUnit = ServicePriceUnit.Service;

  setPriceUnit(unit: ServicePriceUnit): void {
    this.serviceGroup?.get('price')?.get('priceUnit')?.setValue(unit);
  }

  protected readonly getNameCurrency = getNameCurrency;

}
