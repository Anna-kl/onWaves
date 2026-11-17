import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { take } from 'rxjs';

import { IViewAddress } from 'src/app/DTO/views/IViewAddress';
import { IViewBusinessProfile } from 'src/app/DTO/views/business/IViewBussinessProfile';
import { WorkLocationType } from 'src/app/DTO/enums/workLocationType';
import { IFixedPointDraft, IWorkLocationChange } from 'src/app/DTO/views/IWorkFormats';
import { fixedPointsOf, parseWorkLocationType, workLocationTypesOf } from 'src/helpers/common/address';

import { DictionaryService } from 'src/services/dictionary.service';
import { ServiceRegisterBusinessProfile } from 'src/services/service-register-business';
import { ProfileService } from 'src/services/profile.service';
import { ScheduleService } from 'src/services/schedule.service';

interface PointForm extends IFixedPointDraft {
  anotherCity: boolean;
}

@Component({
  selector: 'app-select-address',
  templateUrl: './select-address.component.html',
  styleUrls: ['./select-address.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DictionaryService, ServiceRegisterBusinessProfile, ScheduleService]
})
export class SelectAddressComponent implements OnInit {

  constructor( private _dictionaries: DictionaryService,
    private _serviceRegisterBusinessProfile: ServiceRegisterBusinessProfile,
    private _profileService: ProfileService,
    private _schedules: ScheduleService,
    private _cdr: ChangeDetectorRef)
    {
    }

  @Output() changeAddress = new EventEmitter<IWorkLocationChange>();
  @Input() profile: IViewBusinessProfile | null = null;
  /** В кабинете точек несколько. Регистрация остаётся с одним адресом. */
  @Input() multiplePoints = false;

  // Мультивыбор форматов работы: Онлайн / Фиксированное место / Разъездная.
  // Можно выбрать несколько сразу — каждый формат уйдёт на бэк отдельной записью WorkLocation.
  protected readonly WorkLocationType = WorkLocationType;
  isOnline: boolean = false;
  isFixed: boolean = true;   // по умолчанию — старое поведение (стационарная)
  isMobile: boolean = false;
  // Список районов/городов для разъездной работы
  cities: string[] = [];
  points: PointForm[] = [];
  /** Вторую точку пускаем только когда новая неделя графика отвечает. */
  weekReady = false;
  private loadedFixedIds: string[] = [];
  private pointsTouched = false;
  /** Ответ `work-location` получен (успешно или с ошибкой) — до этого состояние переключателей неизвестно. */
  formatsResolved = false;
  /** У профиля есть хотя бы один сохранённый формат. false → то, что видно на экране, лишь предвыбор. */
  hasSavedFormats = false;

  /** Нужна ли колонка с адресом/районами (для Online она не показывается). */
  get needsGeo(): boolean {
    return this.isFixed || this.isMobile;
  }

  /** Сколько форматов выбрано (для подсказки о мультивыборе). */
  get selectedCount(): number {
    return (this.isOnline ? 1 : 0) + (this.isFixed ? 1 : 0) + (this.isMobile ? 1 : 0);
  }

  /** Переключить формат работы (карточка). */
  toggleFormat(kind: 'online' | 'fixed' | 'mobile'): void {
    if (kind === 'online') {
      this.isOnline = !this.isOnline;
    } else if (kind === 'fixed') {
      this.isFixed = !this.isFixed;
      if (this.isFixed && this.multiplePoints && !this.points.length) {
        this.points = [this.emptyPoint()];
      }
    } else {
      this.isMobile = !this.isMobile;
      if (this.isMobile && this.cities.length === 0) {
        this.cities = [this.myCity ?? ''];
      }
      if (this.isMobile && this.myRegion) {
        this.getListCity(this.myRegion);
      }
    }
    this.checkAddress(true);
  }

  async ngOnInit(): Promise<void> {
    if (this.profile && this.profile.address) {
      this.address = this.profile.address as IViewAddress;
      this.myCountry = this.address.country;
      this.myRegion = this.address.region;
      if (this.address.city)
        this.myCity = this.address.city.trim();

      this.getListRegions(this.myCountry);
      if (this.myRegion) {
          this.getListCity(this.myRegion);
      }
    } else {
      // Профиля нет или адрес не заполнен — пустая форма
      this.address = this.emptyAddress();
    }
    if (this.multiplePoints && !this.points.length) {
      this.points = [this.emptyPoint()];
    }
    // Подгружаем сохранённую локацию работы, чтобы переключатель отражал реальное состояние
    if (this.profile?.id) {
      this.loadWorkLocation();
      if (this.multiplePoints) {
        this._schedules.getWeek(this.profile.id).pipe(take(1)).subscribe({
          next: result => {
            this.weekReady = result?.code === 200 && !!result.data;
            this._cdr.markForCheck();
          },
          error: () => {
            this.weekReady = false;
            this._cdr.markForCheck();
          }
        });
      }
    }
  await this.getListCountry();
  }

  private emptyAddress(): IViewAddress {
    return {
      street: null,
      city: null,
      country: null,
      home: null,
      region: null,
      apartment: null
    } as unknown as IViewAddress;
  }

  /**
   * Подтягивает сохранённые форматы работы профиля.
   *
   * ВАЖНО: результат обязательно эмитится наверх (`checkAddress`). Родитель
   * (contacts) хранит собственную копию `formats` и без эмита сохранял бы свой
   * дефолт `{fixed:true}` вместо реальных данных профиля.
   *
   * Нераспознанные записи больше НЕ трактуются как Fixed: раньше `default:` в
   * switch включал «Фиксированное место» на любой мусор (например, при строковой
   * сериализации enum), из-за чего редактор показывал настроенный формат там,
   * где у профиля не было ни одной валидной записи.
   */
  private loadWorkLocation(): void {
    if (!this.profile?.id) return;
    this._profileService.getWorkLocation(this.profile.id).subscribe({
      next: (res) => {
        const types = res?.code === 200 ? workLocationTypesOf(res.data) : [];
        this.formatsResolved = true;

        if (!types.length) {
          // У профиля форматов нет — Fixed остаётся лишь предвыбором для новичка,
          // но родитель должен узнать, что это предложение, а не сохранённые данные.
          this.hasSavedFormats = false;
          this.checkAddress(false);
          this._cdr.markForCheck();
          return;
        }

        this.hasSavedFormats = true;
        this.isOnline = types.includes(WorkLocationType.Online);
        this.isFixed = types.includes(WorkLocationType.Fixed);
        this.isMobile = types.includes(WorkLocationType.Mobile);

        const records: any[] = Array.isArray(res.data) ? res.data : (res.data ? [res.data] : []);
        if (this.multiplePoints && !this.pointsTouched) {
          const fixed = fixedPointsOf(records);
          this.loadedFixedIds = fixed.map(point => point.id).filter((id): id is string => !!id);
          this.points = fixed.length ? fixed.map(point => this.pointFrom(point)) : [this.emptyPoint()];
          const first = fixed[0];
          if (first) {
            this.myCountry = first.country ?? this.myCountry;
            this.myRegion = first.region ?? this.myRegion;
            if (this.myCountry) this.getListRegions(this.myCountry);
            if (this.myRegion) this.getListCity(this.myRegion);
          }
        }

        if (this.isMobile) {
          const mobile = records.find(r => parseWorkLocationType(r) === WorkLocationType.Mobile);
          this.myRegion = mobile?.region ?? this.myRegion;
          this.cities = Array.isArray(mobile?.cities) && mobile.cities.length ? [...mobile.cities] : [''];
          if (this.myRegion) {
            this.getListCity(this.myRegion);
          }
        }

        this.checkAddress(false);
        this._cdr.markForCheck();
      },
      error: () => {
        this.formatsResolved = true;
        this.hasSavedFormats = false;
        this._cdr.markForCheck();
      }
    });
  }

  addPoint(): void {
    if (!this.weekReady) return;
    this.pointsTouched = true;
    this.points = [...this.points, this.emptyPoint()];
    this.checkAddress(true);
  }

  removePoint(index: number): void {
    if (this.points.length < 2) return;
    this.pointsTouched = true;
    this.points = this.points.filter((_, item) => item !== index);
    this.checkAddress(true);
  }

  setPoint(index: number, field: 'title' | 'city' | 'street' | 'house' | 'apartment', value: string): void {
    const point = this.points[index];
    if (!point) return;
    this.pointsTouched = true;
    point[field] = value ?? '';
    this.checkAddress(true);
  }

  setPointCity(index: number, value: string): void {
    this.setPoint(index, 'city', value);
  }

  setPointAnother(index: number, on: boolean): void {
    const point = this.points[index];
    if (!point) return;
    this.pointsTouched = true;
    point.anotherCity = on;
    point.city = '';
    this.checkAddress(true);
  }

  private emptyPoint(): PointForm {
    return {
      id: null,
      title: '',
      country: this.myCountry,
      region: this.myRegion,
      city: '',
      street: '',
      house: '',
      apartment: '',
      anotherCity: false,
    };
  }

  private pointFrom(point: { id?: string | null; title?: string | null; city?: string | null; street?: string | null; house?: string | null; apartment?: string | null }): PointForm {
    return {
      id: point.id ?? null,
      title: `${point.title ?? ''}`.trim(),
      country: this.myCountry,
      region: this.myRegion,
      city: point.city ?? '',
      street: point.street ?? '',
      house: point.house ?? '',
      apartment: point.apartment ?? '',
      anotherCity: false,
    };
  }

  private draftPoints(): IFixedPointDraft[] {
    if (!this.isFixed) return [];
    if (!this.multiplePoints) return [];
    return this.points.map(point => ({
      id: point.id,
      title: point.title.trim(),
      country: this.myCountry,
      region: this.myRegion,
      city: point.city,
      street: point.street,
      house: point.house,
      apartment: point.apartment,
    }));
  }

  addCity(): void {
    this.cities.push('');
    this._cdr.markForCheck();
  }

  removeCity(index: number): void {
    this.cities.splice(index, 1);
    if (this.cities.length === 0) {
      this.cities = [''];
    }
    this.checkAddress(true);
  }

  onCityChange(index: number, value: string): void {
    this.cities[index] = value;
    this.checkAddress(true);
  }

  setAnotherCity() {
    if (this.address){
      this.myCity = null;
      this.address = {
        city: '',
          street: this.address.street,
          region: this.address.region,
          home: this.address.home,
          apartment: this.address.apartment,
          country: this.myCountry
      } as IViewAddress;
    }
    this.checkAddress(true);
  }

  checkAddress(fromUser = false){
    const validCities = this.isMobile
      ? this.cities.filter(c => !!c && c.trim().length > 0)
      : [];
    // Разъездная без фиксированного места: синтезируем представительный address
    // (регион + первый район) — нужен для карты и строки адреса.
    if (this.isMobile && !this.isFixed && this.myRegion && validCities.length > 0) {
      this.address = {
        country: this.myCountry,
        region: this.myRegion,
        city: validCities[0],
        street: null,
        home: null,
        apartment: null
      } as IViewAddress;
    }
    // Эмитим всегда — родитель сам решает про валидность (для Online данных нет).
    this.emitAddress(validCities, fromUser);
  }

  private emitAddress(cities: string[], fromUser = false): void {
    const drafts = this.draftPoints();
    const first = drafts[0];
    const viewAddress = this.multiplePoints && this.isFixed && first
      ? {
          country: first.country,
          region: first.region,
          city: first.city,
          street: first.street,
          home: first.house,
          apartment: first.apartment,
        } as IViewAddress
      : this.address;
    if (this.multiplePoints && this.isFixed && first) {
      this.address = viewAddress;
    }
    const kept = new Set(drafts.map(point => point.id).filter((id): id is string => !!id));
    const pointText = drafts
      .map(point => [point.title, point.city, point.street, point.house].filter(part => !!part && `${part}`.trim()).join(', '))
      .filter(Boolean)
      .join('  •  ');
    const mobileText = this.isMobile && cities.length ? cities.join(', ') : '';
    const payload: IWorkLocationChange = {
      strAddress: this.multiplePoints && this.isFixed
        ? [pointText, mobileText].filter(Boolean).join('  •  ')
        : this.getStringAddress(),
      viewAddress,
      formats: { online: this.isOnline, fixed: this.isFixed, mobile: this.isMobile },
      cities,
      fixedPoints: this.multiplePoints ? drafts : undefined,
      removedFixedPointIds: this.multiplePoints ? this.loadedFixedIds.filter(id => !kept.has(id)) : undefined,
      userChanged: fromUser
    };
    this.changeAddress.emit(payload);
  }

  public async getListCountry(){
    (await this._serviceRegisterBusinessProfile.getAllCountry())
      .subscribe(_=> {
      });
  }
  change(value: string | null, type: string, fromUser = false) {
   if (value)
    switch (type){
      case 'country': {
        this.getListRegions(this.myCountry!);
          if ( this.address) {
            this.myRegion = '';
              this.address = {
                city: '',
                  street: '',
                  region: '',
                  home: '',
                  apartment: '',
                  country: this.myCountry
              } as IViewAddress;
          }
        break;
      }
        case 'region': {
          if (this.multiplePoints && fromUser) {
            this.pointsTouched = true;
            this.points = this.points.map(point => ({
              ...point,
              city: '',
              street: '',
              house: '',
              apartment: '',
              anotherCity: false,
            }));
          }
          this.getListCity(this.myRegion!);
            if (this.isMobile) {
              // Разъездная: сбрасываем список городов под новый регион
              this.myCity = null;
              this.cities = [''];
              this.address = {
                city: '',
                  street: null,
                  region: this.myRegion,
                  home: null,
                  apartment: null,
                  country: this.myCountry
              } as IViewAddress;
              break;
            }
            if ( this.address) {
              this.myCity = null;
                this.address = {
                  city: '',
                    street: '',
                    region: this.myRegion,
                    home: '',
                    apartment: '',
                    country: this.myCountry
                } as IViewAddress;
            }
          break;
        }
        case 'city': {
          this.getListStreet(this.myCity);
          if (value)
            this.address = {
                city: this.myCity ?? value,
                street: '',
                region: this.myRegion,
                home: '',
                apartment: '',
                country: this.myCountry
            } as IViewAddress;
            break;
        }
        case 'street': {
          if (value)
            this.address = {
                city: this.myCity ?? this.address?.city,
                street: value,
                region: this.myRegion,
                home: '',
                apartment: '',
                country: this.myCountry
            } as IViewAddress;
            break;
        }
        case 'home': {
           if (value)
            this.address = {
                city: this.myCity ?? this.address?.city,
                street: this.address?.street,
                region: this.myRegion,
                home: value,
                apartment: '',
                country: this.myCountry
            } as IViewAddress;
             break;
        }
        case 'apartment': {
           if (value)
            this.address = {
                city: this.myCity ?? this.address?.city,
                street: this.address?.street,
                region: this.myRegion,
                home: this.address?.home,
                apartment: value,
                country: this.myCountry
            } as IViewAddress;
            break;
        }
        default: {
          return;
        }
    }
    this.checkAddress(fromUser);
  }
  public countryList$ = this._serviceRegisterBusinessProfile.countryList$;
  public readonly allRegions$ = this._serviceRegisterBusinessProfile.allRegions$;
  // public readonly allCity$ = this._serviceRegisterBusinessProfile.allCity$;
  allCity: string[] = [];
  myRegion: string|null = null;
  myCountry: string|null = null;
  myCity: string|null = null;

  address: IViewAddress|null = null;
 isAnotherCity: boolean = false;

public async getListRegions(myCountry: string|null){
  if (myCountry) {
    (await this._serviceRegisterBusinessProfile.getAllRegions(myCountry))
      .subscribe(regions => {
          const current = `${this.myRegion ?? ''}`.trim();
          const match = current
            ? regions.find(region => region === current || region.includes(current))
            : undefined;
          if (match) this.myRegion = match;
          this._cdr.markForCheck();
          });
  }
}

  /** Регион выбран вручную. Пустой регион не сбрасывает уже введённый адрес точки. */
  onRegion(value: string | null): void {
    const previous = `${this.myRegion ?? ''}`.trim();
    this.myRegion = value;
    const next = `${value ?? ''}`.trim();
    if (this.multiplePoints && previous && previous !== next) {
      this.pointsTouched = true;
      this.points = this.points.map(point => ({
        ...point,
        city: '',
        street: '',
        house: '',
        apartment: '',
        anotherCity: false,
      }));
    }
    if (next) this.getListCity(next);
    this.checkAddress(true);
  }

public async getListCity(myRegion: string){
  if (myRegion) {
    (await this._serviceRegisterBusinessProfile.getAllCity(myRegion))
      .subscribe(_ => {
        this.allCity = _;
          if (this.multiplePoints) {
            this.points.forEach(point => {
              if (point.city && !_.includes(point.city)) point.anotherCity = true;
            });
          }
          if (_.length === 1){
              this.myCity = _[0];
          }
          if (this.address?.city){
          if(!_.includes(this.address?.city)){
              this.isAnotherCity = true;

          }
        }
        this._cdr.markForCheck();
      });
  }
}

getListStreet(myCity: string|null) {
}

getStringAddress(): string {
  const parts: string[] = [];
  if (this.isFixed) {
    const fixed = this.getFixedAddressString();
    if (fixed) parts.push(fixed);
  }
  if (this.isMobile) {
    const base: string[] = [];
    if (this.myCountry) base.push(this.myCountry);
    if (this.myRegion) base.push(this.myRegion);
    const validCities = this.cities.filter(c => !!c && c.trim().length > 0);
    if (validCities.length) base.push(validCities.join(', '));
    if (base.length) parts.push(base.join(', '));
  }
  return parts.join('  •  ');
}

/** Строка полного адреса фиксированного места — для геокодирования точки на карте. */
getFixedAddressString(): string {
  let str = '';
  if (this.myCountry){
    str = `${this.myCountry}`;
  }
  if (this.myRegion){
    str = `${str}, ${this.myRegion}`;
  }
  if (this.myCity !== this.myRegion && this.myCity){
    str = `${str}, ${this.myCity}`;
  }
  if (this.myCity === null && this.address?.city){
    str = `${str}, ${this.address?.city}`;
  }
  if (this.address?.street){
    str = `${str}, ${this.address?.street}`;
  }
  if (this.address?.home){
    str = `${str}, ${this.address?.home}`;
  }
  if (this.address?.apartment){
    str = `${str}, ${this.address?.apartment}`;
  }
  return str;
}
}
