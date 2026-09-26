import { AfterViewInit, ChangeDetectorRef, Component,  ElementRef,  HostListener,  NgZone,  OnInit, OnDestroy, ViewChild} from '@angular/core';
import { ToastService } from 'src/services/toast.service';

import {FormControl, FormGroup, Validators} from "@angular/forms";
import { customEmailValidator } from '../../../../helpers/validators/email.validator';
import {ServiceRegisterBusinessProfile} from "../../../../services/service-register-business";
import {DictionaryService} from "../../../../services/dictionary.service";
import {ICategory} from "../../../DTO/classes/ICategory";
import {IViewCategoryTree} from "../../../DTO/views/categories/IViewCategoryTree";
import {ProfileService} from "../../../../services/profile.service";
import {AuthStatus} from "../../../DTO/enums/authStatus";
import {IViewAddress} from "../../../DTO/views/IViewAddress";
import {WorkLocationType} from "../../../DTO/enums/workLocationType";
import {IWorkLocation} from "../../../DTO/views/IWorkLocation";
import {IWorkFormats, IWorkLocationChange} from "../../../DTO/views/IWorkFormats";

import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {IViewAuthProfile} from "../../../DTO/views/profile/IViewAuthProfile";
import {getCategoryForSend, prepareTreeList, setCategoryState} from "../../../../helpers/common/category";
import {UserType} from "../../../DTO/classes/profiles/profile-user.model";
import {createMap} from "../../../../helpers/common/maps";
import {IViewBusinessProfile} from "../../../DTO/views/business/IViewBussinessProfile";
import {StoreService} from "../../../ngrx-store/mainClient/store.service";
import {select, Store} from "@ngrx/store";
import {selectProfileMainClient, selectTokenMainClient} from "../../../ngrx-store/mainClient/store.select";
import {urlProfile} from "../../../../helpers/constant/commonConstant";
import {BehaviorSubject, catchError, EMPTY, filter, forkJoin, map, Observable, of, Subject, switchMap, takeUntil, tap, throwError, timeout} from "rxjs";
import {IViewCoordinates} from "../../../DTO/views/profile/IViewCoordinates";
import { LoginService } from 'src/app/auth/login.service';
import { environment } from 'src/enviroments/environment';
import { ViewportScroller } from '@angular/common';
import { HttpEventType } from '@angular/common/http';
declare const ymaps: any;
@Component({
  selector: 'app-register-business-profile',
  templateUrl: './register-business-profile.component.html',
  styleUrls: ['./register-business-profile.component.scss'],
  providers: [DictionaryService, ProfileService]
})
export class RegisterBusinessProfileComponent implements OnInit, AfterViewInit, OnDestroy {
  strAddress: string = '';
  TEXT_LENGTH: number = environment.TEXT_LENGTH;

  // ══════════════════════════════════════════════════════════════
  // КРИТИЧНО: Флаги загрузки и состояния
  // ══════════════════════════════════════════════════════════════
  isSubmitting$ = new BehaviorSubject<boolean>(false);
  /** Текст текущей фазы сохранения — показывается в анимированном оверлее. */
  submitStage$ = new BehaviorSubject<string>('');
  /** Флаг «всё готово» — включает финальную галочку в анимации перед закрытием. */
  submitDone$ = new BehaviorSubject<boolean>(false);
  private destroy$ = new Subject<void>();
  private readonly requestId = this.generateRequestId();

  changeAddress($event: IWorkLocationChange) {
      this.address = $event.viewAddress;
      this.strAddress = $event.strAddress;
      this.formats = $event.formats;
      this.cities = $event.cities ?? [];

      // Карта: точка для фиксированного места + маркеры районов для разъездной.
      this.geoPoint$ = this.formats.fixed
        ? this._dictionaries.getPoint(this.fixedAddressStr())
        : of(null);
      if (this.formats.mobile) {
        this.updateCityMarkers();
      } else {
        this.geoList = [];
      }
  }

  /** Строка полного адреса фиксированного места (для геокодирования точки). */
  private fixedAddressStr(): string {
    const a = this.address;
    if (!a) return '';
    return [a.country, a.region, a.city, a.street, a.home]
      .filter(v => !!v && `${v}`.trim().length > 0)
      .join(', ');
  }

  /** Геокодируем каждый выбранный район/город и показываем маркер на карте. */
  private updateCityMarkers(): void {
    const validCities = this.cities.filter(c => !!c && c.trim().length > 0);
    if (!validCities.length) {
      this.geoList = [];
      return;
    }
    const region = this.address?.region ?? '';
    const country = this.address?.country ?? '';
    const requests = validCities.map(city =>
      this._dictionaries.getPoint(`${country}, ${region}, ${city}`).pipe(
        catchError(() => of(null))
      )
    );
    forkJoin(requests).subscribe(results => {
      this.geoList = results.filter((r): r is IViewCoordinates => !!r);
    });
  }


  errors = {
    errorLink: '(Только латинские символы)',
    errorLinkStyle: ''
  };

  categories: ICategory[] = [];
  textBtn: string = 'Далее';
  lng = 37.00;
  lat = 53.00;



  public readonly mainProfile$ = this._storeService.profileStoreMainProfileClient$;
  //из store
  mainToken = '';
  urlProfileLocal = urlProfile;
  registrationForm!: FormGroup;
  numberStreetPage:number = 1;
  private formData: FormData | null = null;
  mainCategory: ICategory|null = null;
  treeCategory: IViewCategoryTree[] = [];
  user: IViewBusinessProfile | null = null;
  private allCategories: ICategory[] = [];



  mapType = 'satellite';
  mainProfile: any;
  remainingText:any = 0;
  exceptWords: string[] = [];
  address: IViewAddress|null = null;
  formats: IWorkFormats = { online: false, fixed: true, mobile: false };
  cities: string[] = [];
  geoList: IViewCoordinates[] = [];
  geoPoint$: Observable<IViewCoordinates|null> = new Observable<IViewCoordinates | null>();
  constructor( private _serviceRegisterBusinessProfile: ServiceRegisterBusinessProfile,
               public activeModal: NgbActiveModal,
               private _dictionaries: DictionaryService,
               private _api: ProfileService,
               private zone: NgZone,
                private messageService: ToastService,
               private _store: Store,
               private _login: LoginService,private cdr: ChangeDetectorRef,
               private _storeService: StoreService) {
    //store ngrx
    this._storeService.profileStoreMainProfileClient$.subscribe(
        data=>
        {
          this.mainProfile = data;

        });
    this._store.pipe(select(selectTokenMainClient)).subscribe(
      result => {
        this.mainToken = result;
      }
    )
    // this._store.pipe(select(selectProfileMainClient)).subscribe(
    //   result => {
    //     let test = result;
    //   }
    // );

  }

@ViewChild('modalBody',  { read: ElementRef }) modalBody!: ElementRef<HTMLElement>;
  @ViewChild('topAnchor',  { read: ElementRef }) topAnchor!: ElementRef<HTMLElement>;

  ngAfterViewInit() {
    // первый показ модалки — к началу
    requestAnimationFrame(() => this.scrollToTop());
     setTimeout(() =>this.zone.runOutsideAngular(() => {
        // ждём layout/paint
        requestAnimationFrame(() => {
            let element = document.getElementById('groupModal');
        element?.scrollIntoView(true);
        });
      }), 500);
  }

  private scrollToTop() {
    // Вариант А: просто в самый верх контейнера
    this.modalBody.nativeElement.scrollTo({ top: 0, behavior: 'smooth' });

    // Вариант Б: к якорю (если нужен именно anchor)
    // this.topAnchor.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  closeModal() {
    this.activeModal.close();
  }

  private scrollContainerTopAfterRender() {
      this.zone.runOutsideAngular(() => {
        // ждём layout/paint
        requestAnimationFrame(() => {
            let element = document.getElementById('groupModal');
        element?.scrollIntoView(true);
        });
      });
}

  increment () {
    let element = document.getElementById('groupModal');
    element?.scrollIntoView(true);
    if (this.numberStreetPage === 2){
      this.textBtn = 'Готово';
      this.numberStreetPage++;
    }
    if (this.numberStreetPage === 1){
      let link = this.registrationForm.controls['link'].value;
      if (link.length > 0){
        let word = this.exceptWords.find(_ => _ === link);
        if (word){
          this.errors.errorLink = 'Данное имя зарезервировано';
          this.errors.errorLinkStyle = 'border-color: red; color: red';
          return;
        }
          this._api.checkLink(link).subscribe(
              result => {
                if (result.code === 200){
                  this.numberStreetPage++;
                } else {
                  this.errors.errorLink = 'Данное имя уже занято';
                  this.errors.errorLinkStyle = 'border-color: red; color: red';
                  return;
                }
              }
          );
        }
        else {
          this.numberStreetPage++;
        }
      }

    if (this.numberStreetPage === 3){
      // ══════════════════════════════════════════════════════════════
      // КРИТИЧНО: Блокируем UI во время отправки
      // ══════════════════════════════════════════════════════════════
      this.isSubmitting$.next(true);
      this.submitDone$.next(false);
      this.submitStage$.next('Создаём ваш профиль…');

      const data = this.registrationForm.getRawValue();
      console.log(this.phone);
      let view = {
        id: null,
        status: AuthStatus.Active,
        about: data['about'],
        email: data['email'],
        userType: UserType.Business,
        address: this.address,
        name: data['name'],
        phone: data['phone'],
        telegram: data['telegram'],
        webSite: data['webSite'],
        link: data['link'].replace(urlProfile, ''),
        whatsApp: data['whatsApp'],
        socialLink: data['socialLink'],
        // parentId: this.auth?.profile?.id!,
        parentId: this.mainProfile.id, //из store
        timeZone: new Date().getTimezoneOffset()
      } as unknown as IViewBusinessProfile;

      // ══════════════════════════════════════════════════════════════
      // КРИТИЧНО: Отправляем с Request ID для идемпотентности
      // ══════════════════════════════════════════════════════════════
      this._api.createBAProfile(view, this.mainToken, this.requestId).pipe(
        // Таймаут 15 секунд
        timeout(15000),

        // Бэк отвечает 200 OK с кодом ошибки в теле. Раньше здесь стоял filter:
        // неуспешный ответ просто гасился — поток завершался без next и без error,
        // оверлей «Создаём ваш профиль…» висел вечно, а кнопка оставалась
        // заблокированной. Теперь любой не-201 превращаем в ошибку с текстом.
        switchMap(result => {
          if (result.code !== 201) {
            return throwError(() => ({
              status: result.code,
              message: result.message || 'Не удалось создать профиль'
            }));
          }
          return of(result.data as IViewAuthProfile);
        }),

        // увеличиваем страницу
        tap(() => this.numberStreetPage++),

        // если есть formData — качаем аватар, иначе сразу «резолвим» true
        switchMap(user => {
          if (this.formData) {
            this.submitStage$.next('Загружаем фото профиля…');
            return this._serviceRegisterBusinessProfile
              // токен обязателен: эндпоинт аватара закрыт авторизацией
              .save_avatar(user.profileUserId!, this.formData, this.mainToken)
              .pipe(
                // observe:'events' отдаёт Sent/UploadProgress/Response — ждём именно
                // финальный ответ, иначе switchMap ниже перезапускается на каждом
                // событии и отменяет уже начатые POST work-location.
                filter(res => res.type === HttpEventType.Response),
                map(() => user.profileUserId),
                // Профиль уже создан — упавший аватар не должен рушить регистрацию,
                // фото можно догрузить в редакторе профиля.
                catchError(err => {
                  console.error('Не удалось загрузить аватар:', err);
                  return of(user.profileUserId);
                })
              );
          } else {
            return of(user.profileUserId);
          }
        }),

        // Сохраняем выбранные форматы работы (по одному POST) и ждём завершения всех.
        switchMap(id => {
          if (!id) return of(id);
          this.submitStage$.next('Сохраняем форматы работы…');
          return this.saveWorkLocations$(id).pipe(map(() => id));
        }),

        // Обработка ошибок
        catchError(err => {
          this.isSubmitting$.next(false); // Разблокируем UI
          this.showErrorMessage(err);
          return throwError(() => err);
        }),

        // Забыть подписку при уничтожении компонента
        takeUntil(this.destroy$)
      )
        // единая подписка и единый dismiss
        .subscribe({
          next: (res) => {
            // Финальный аккорд: показываем галочку «Готово!» ~1с, затем закрываем.
            this.submitStage$.next('Готово!');
            this.submitDone$.next(true);
            setTimeout(() => {
              this.isSubmitting$.next(false);
              this.activeModal.dismiss();
              if (res)
                this._login.updateProfile(res);
            }, 1000);
          },
          error: err => {
            this.isSubmitting$.next(false);
            this.submitDone$.next(false);
            console.error('Ошибка при создании профиля:', err);
          }
        });

    }


  }


  /**
   * Формируем по одной записи WorkLocation на каждый выбранный формат.
   * Бэк различает их по locationType.
   */
  private buildWorkLocationBodies(): IWorkLocation[] {
    const bodies: IWorkLocation[] = [];
    const a = this.address;
    if (this.formats.online) {
      bodies.push({ locationType: WorkLocationType.Online });
    }
    if (this.formats.fixed) {
      bodies.push({
        locationType: WorkLocationType.Fixed,
        country: a?.country ?? null,
        region: a?.region ?? null,
        city: a?.city ?? null,
        street: a?.street ?? null,
        house: a?.home ?? null,
        apartment: a?.apartment ?? null,
        longitude: null,
        latitude: null
      });
    }
    if (this.formats.mobile) {
      bodies.push({
        locationType: WorkLocationType.Mobile,
        country: a?.country ?? null,
        region: a?.region ?? null,
        cities: this.cities.filter(c => !!c && c.trim().length > 0),
        longitude: null,
        latitude: null
      });
    }
    return bodies;
  }

  /**
   * Отправляем все выбранные форматы (POST по одному). Ждём завершения всех через forkJoin.
   * Ошибку отдельного POST глушим — профиль уже создан, форматы можно дозаполнить в редакторе.
   */
  private saveWorkLocations$(id: string): Observable<any> {
    const bodies = this.buildWorkLocationBodies();
    if (!bodies.length) {
      return of(null);
    }
    return forkJoin(
      bodies.map(body =>
        this._api.createWorkLocation(id, body, this.mainToken).pipe(
          catchError(err => {
            console.error('Failed to save work location:', err);
            return of(null);
          })
        )
      )
    );
  }

  /** Валиден ли выбор форматов и связанных данных (для кнопки «Далее» на шаге 2). */
  isWorkSelectionValid(): boolean {
    const f = this.formats;
    if (!f.online && !f.fixed && !f.mobile) {
      return false;
    }
    if (f.fixed && !(this.address?.city && this.address?.street && this.address?.home)) {
      return false;
    }
    if (f.mobile && this.cities.filter(c => !!c && c.trim().length > 0).length === 0) {
      return false;
    }
    return true;
  }

  decrement () {this.numberStreetPage--; }

  async ngOnInit(): Promise<void> {

    //методы для заполнения полей адреса шаг 2
    this._dictionaries.getExceptWords().subscribe(
        result => {
        this.exceptWords = result;}
    );

    this._dictionaries.getMainCategories().subscribe(
      response => {
        this.allCategories = response as ICategory[];
        this.categories = this.allCategories.filter(_ => _.parentId === null);
        if (this.categories.length > 0) {
          this.mainCategory = this.categories[0];
          this.setFalseChecked();
        }
      }
    );


    this.registrationForm = new FormGroup({
      //форма numberStreepPage=1  шаг 1
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      email: new FormControl(this.mainProfile?.email, customEmailValidator()),
      link: new FormControl('', [
        Validators.minLength(4)
      ]),
      phone: new FormControl(this.mainProfile ? this.mainProfile.phone : null, [
        Validators.required,
        Validators.minLength(10),
        // Validators.pattern('[0-9]{3}-[0-9]{2}-[0-9]{3}')
      ]),
      search: new FormControl(''),
      whatsApp: new FormControl(this.mainProfile ? this.mainProfile.phone : null, [
        Validators.minLength(4),
        // Validators.pattern('[0-9]{3}-[0-9]{2}-[0-9]{3}')
      ]),
      telegram: new FormControl('@', [
        Validators.minLength(4)
      ]),
      // webSite: new FormControl('https://', [
      //   Validators.minLength(4)
      // ]),
      webSite: new FormControl('', [
        Validators.minLength(4)
      ]),
      socialLink: new FormControl('https://', [
        Validators.minLength(4)
      ]),
      //шаг 2
      country: new FormControl('', [
        Validators.required
      ]),
      region: new FormControl('', [
        Validators.minLength(2)
      ]),
      city: new FormControl('', [
        Validators.minLength(2)
      ]),
      street: new FormControl('', [
        Validators.minLength(2)
      ]),
      home: new FormControl('', [
        Validators.required,
        Validators.minLength(1)
      ]),
      apartment: new FormControl('', [
        Validators.minLength(1)
      ]),

      //шаг 3
      avatar: new FormControl('', []),
      about: new FormControl('', [
        Validators.minLength(1), Validators.maxLength(this.TEXT_LENGTH)
      ]),
    });

    
    this.registrationForm.get('link')!.valueChanges.subscribe((value: string) => {
      this.registrationForm.get('link')!.setValue(value.replace(/[^A-Za-z0-9-_.]/, ""),
       { emitEvent: false });
    });

    this.registrationForm?.get('about')!.valueChanges.subscribe(
      res => {
        if (res.length >= 150){
          this.registrationForm?.patchValue({'about': res.substring(0, this.TEXT_LENGTH)});
        }
        this.remainingText = res.length;
      }
    );

    // this.registrationForm?.get('link')!.valueChanges.subscribe(
    //   res => {
    //     if (res.length <= 16){
    //       this.registrationForm?.patchValue({'webResource': 'https://ocpio.ru/'});
    //     }
    //   }
    // );


    // this.registrationForm?.get('phone')?.valueChanges.subscribe(
    //   res => {
    //     if (res.length <= 16) {
    //       this.registrationForm?.patchValue({ 'phone': '+7(000) 000-0000' });
    //     }
    //   }
    // );


  }
  //шаг 1
  get name() { return this.registrationForm.get('name')!  as FormControl;}//ВАЖНО эту палочку ! в конце
  get webResource() { return this.registrationForm.get('webResource')! as FormControl;}
  get phone() { return this.registrationForm.get('phone')! as FormControl;}
  get whatsApp() { return this.registrationForm.get('whatsApp')! as FormControl;}
  get telegram() { return this.registrationForm.get('telegram')! as FormControl;}
  get webSite() { return this.registrationForm.get('webSite')! as FormControl;}
  get socialLink() { return this.registrationForm.get('socialLink')! as FormControl;}
  get email() {return this.registrationForm.get('email') as FormControl;}

  //шаг 2
  get country() { return this.registrationForm.get('country')! as FormControl;}
  get search() { return this.registrationForm.get('search')! as FormControl;}
  get region() { return this.registrationForm.get('region')! as FormControl;}
  get city() { return this.registrationForm.get('city')! as FormControl;}
  get street() { return this.registrationForm.get('street')! as FormControl;}
  get home() { return this.registrationForm.get('home')! as FormControl;}
  get apartment() { return this.registrationForm.get('apartment')! as FormControl;}

  //шаг 3
  get avatar() { return this.registrationForm.get('avatar')! as FormControl;}
  get about() { return this.registrationForm.get('about')! as FormControl;}
  //получаем регионы по стране


  public chooseCategoryMain(category: ICategory){
    this.mainCategory = category;
    this.setFalseChecked();
  }


  setFalseChecked(){
    this.categories.filter(_ => _.id !== this.mainCategory!.id).forEach(item => {
      item.isChoose = false;
    });
    this.categories.sort((a, b) => a.name.localeCompare(b.name));
    this.mainCategory!.isChoose = true;
    this.treeCategory = prepareTreeList(this.allCategories, this.mainCategory?.id!,'',
      false);
    this.treeCategory = setCategoryState(this.treeCategory);
  }


  //загрузка файла
  // remainingText = 150;

  isFormValid(): boolean {
    switch (this.numberStreetPage){
      case 1: {
        return this.registrationForm?.get('name')!.value.length <= 0;
      }
      case 2: {
        return !this.isWorkSelectionValid();
      }

    }
    return false;
  }


  ////////////////////////
  imageChangedEvent: any = null;
  isShowCropped: boolean = false;

  getData($event: any) {
    this.formData = $event;
  }

  // ══════════════════════════════════════════════════════════════
  // КРИТИЧНО: Методы для управления состоянием загрузки
  // ══════════════════════════════════════════════════════════════

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
    let message = this.getErrorMessage(err);
    this.messageService.add({
      severity: 'error',
      summary: 'Ошибка регистрации',
      detail: message,
      life: 5000
    });
  }

  /**
   * Преобразует код ошибки в человекочитаемое сообщение
   */
  private getErrorMessage(err: any): string {
    // Сетевые ошибки
    if (err?.name === 'TimeoutError') {
      return 'Сеть медленная. Пожалуйста, проверьте соединение и попробуйте снова.';
    }

    // Ошибки от бэка
    if (err?.status === 409) {
      return 'Этот аккаунт уже существует. Попробуйте другой ник.';
    }
    if (err?.status === 400) {
      return 'Ошибка в данных формы. Проверьте все поля.';
    }
    if (err?.status === 500) {
      return 'Превышено число аккаунтов. Попробуйте позже.';
    }

    // Сетевые ошибки
    if (err?.status === 0 || !err?.status) {
      return 'Проблема с подключением. Проверьте интернет.';
    }

    return `Ошибка ${err?.status || ''}: ${err?.message || 'Неизвестная ошибка'}`;
  }

  /**
   * Жизненный цикл: очистка ресурсов при уничтожении компонента
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Запретить закрытие модала через ESC во время загрузки
   */
  @HostListener('keydown.escape', ['$event'])
  onEscapeKeydown(event: any): void {
    if (this.isSubmitting$.value) {
      event.preventDefault();
    }
  }
}
