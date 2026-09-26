import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import { ToastService } from 'src/services/toast.service';
import {IGroupWithSubGroups} from "../../../DTO/views/services/IGroupWithSubGroup";
import {GroupService} from "../../../../services/groupservice";
import {PaymentForType} from "../../../DTO/enums/paymentForType";
import {subGroup} from "../../../DTO/views/services/IViewSubGroups";
import {ActivatedRoute, Router, Routes} from "@angular/router";
import {ProfileDataService} from "../../services/profile-data.service";
import {BehaviorSubject, catchError, forkJoin, of, switchMap, take} from "rxjs";
import {ChooseTimeModalComponent} from "../choose-time-modal/choose-time-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {IViewBusinessProfile} from "../../../DTO/views/business/IViewBussinessProfile";
import { getPrice, getPriceString } from 'src/helpers/common/price.helpers';
import { applyHourlyDuration } from 'src/helpers/common/hourly';
import { ProfileService } from 'src/services/profile.service';
import { IWorkLocation } from 'src/app/DTO/views/IWorkLocation';

@Component({
  selector: 'app-group-service',
  templateUrl: './group-service.component.html',
  styleUrls: ['./group-service.component.scss'],
  providers: []
})
export class GroupServiceComponent implements OnInit, AfterViewInit {
  groupShow: IGroupWithSubGroups[] = [];
  @ViewChild('pickBar') pickBar?: ElementRef<HTMLElement>;
  private pickBarHome: Node | null = null;
  private pickBarNext: Node | null = null;
  @Input() openGroupBlock: boolean = false;
  isEdit: boolean = false;
  textChooseService = 'Не выбрано';
  priceServices: number = 0;
  chooseServices : subGroup[] = [];
  duration = 0;
  services$ = new BehaviorSubject<subGroup|null>(null);
  address: string|null = null;
  services: subGroup[] = [];
  @Output() onChecked = new EventEmitter();
  businessProfile: IViewBusinessProfile | null = null;
  preSelectedServiceId: string | null = null;
  /** Не перескакивать автоматически на выбор даты (возврат с выбора дня по «Назад»). */
  suppressAutoDate = false;

  constructor(private _profileData: ProfileDataService,
              private _route: Router,
              private _activateRoute: ActivatedRoute,
              private messageService: ToastService,
              private modalService: NgbModal,
              private profileService: ProfileService,
              @Inject(PLATFORM_ID) private platformId: object,
              private destroyRef: DestroyRef) {

    this._profileData.servicesProfile
      .subscribe(result => this.groupShow = result);
  }

  showError() {
    this.messageService.add({severity:'error', summary: 'Ошибка',
      detail: 'Услуги не выбраны', life:5000});
  }
  chooseDate(carryServiceId = false){
    if (this.businessProfile?.isPromo) {
      return;
    }
    if (this.chooseServices.length > 0) {
      this._profileData.transferChooseService(this.chooseServices)
      if (this.chooseServices.filter(_ => !_.isTimeUnlimited).length === 0){
        const serviceId = this.chooseServices[0]?.id ?? this.preSelectedServiceId;
        this._route.navigate(['../confirm-record'], {
          relativeTo: this._activateRoute,
          queryParams: serviceId ? { serviceId } : undefined
        });
      } else {
        // serviceId обязателен на экране выбора даты: без него он сразу редиректит
        // обратно в профиль, и путь «услуга → дата» вообще непроходим. Плюс по нему
        // считается canAdd и длительность, а «Назад» возвращает на этот шаг.
        const serviceId = (carryServiceId ? this.preSelectedServiceId : null)
          ?? this.chooseServices[0]?.id
          ?? this.preSelectedServiceId;
        const extras: any = { relativeTo: this._activateRoute };
        if (serviceId) {
          extras.queryParams = { serviceId };
        }
        this._route.navigate(['../choose-date'], extras);
      }
    } else {
      this.showError();
    }
  }
  // addService($event: subGroup){
  //   if ($event.isChecked){
  //     this.countService += 1;
  //     if ($event.paymentForType === PaymentForType.ForHour){
  //       const modalRef = this.modalService.open(ChooseTimeModalComponent);
  //       modalRef.close((result: number) => {
  //         $event.price = result * $event.price;
  //         $event.duration = result;
  //       });
  //     }
  //     this.chooseServices.push($event);
  //     this.services$.next($event);
  //   }
  //   else {
  //     this.chooseServices = this.chooseServices.filter(_ => _.id !== $event.id);
  //   }
  // }
  // getPrice(){
  //   this.priceServices = 0;
  //   this.countService = 0;
  //   this.chooseServices.forEach(item => {
  //     this.priceServices += item.price;
  //     this.countService += 1;
  //     this.duration += item.duration!;
  //   });
  // }

  ngOnInit(): void {
    this.preSelectedServiceId = this._activateRoute.snapshot.queryParamMap.get('serviceId');
    this.suppressAutoDate = this._activateRoute.snapshot.queryParamMap.get('noAutoDate') === '1';
    this._profileData.sendProfileBA.pipe(take(1)).subscribe(result => {
      this.businessProfile = result;
      if (!result) {
        this.loadProfileForDirectOpen();
      }
    });
    // this._profileData.sendChooseServices.subscribe(
    //     result => this.chooseServices = result
    // );
    this.services$.subscribe(result => {
      [this.priceServices, this.countService, this.duration] = getPrice(this.chooseServices);

      if (this.chooseServices.length === 0){
        this.textChooseService = 'Услуги не выбрано';
      } else {
        this.textChooseService = 'услуги выбрано:';
      }
    });
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId) || !this.pickBar) {
      return;
    }
    const el = this.pickBar.nativeElement;
    this.pickBarHome = el.parentNode;
    this.pickBarNext = el.nextSibling;
    const media = window.matchMedia('(max-width: 640px)');
    const sync = () => this.syncPickBarDock(media.matches);
    sync();
    media.addEventListener('change', sync);
    this.destroyRef.onDestroy(() => {
      media.removeEventListener('change', sync);
      if (el.parentElement === document.body && this.pickBarHome) {
        this.pickBarHome.insertBefore(el, this.pickBarNext);
      }
    });
  }

  /** Только телефон: фиксируем снизу экрана через body, иначе overflow оболочки ломает fixed. */
  private syncPickBarDock(isMobile: boolean): void {
    const el = this.pickBar?.nativeElement;
    if (!el || !this.pickBarHome) {
      return;
    }
    if (isMobile) {
      if (el.parentElement !== document.body) {
        document.body.appendChild(el);
      }
      return;
    }
    if (el.parentElement === document.body) {
      this.pickBarHome.insertBefore(el, this.pickBarNext);
    }
  }

  /** Makes /:profileLink/choose-service independent from the previously opened profile page. */
  private loadProfileForDirectOpen(): void {
    const link = this._activateRoute.snapshot.paramMap.get('id');
    if (!link) return;

    this.profileService.translateLink(link).pipe(
      take(1),
      switchMap(result => {
        const profileId = `${result?.data ?? ''}`.trim();
        if (!profileId) return of(null);
        this._profileData.transferId(profileId);
        return forkJoin({
          profile: this.profileService.getBusinessProfileById(profileId),
          workLocations: this.profileService.getWorkLocation(profileId).pipe(
            catchError(() => of(null))
          )
        });
      })
    ).subscribe({
      next: result => {
        if (!result || result.profile.code !== 200) return;
        this.businessProfile = result.profile.data as IViewBusinessProfile;
        this._profileData.transferProfileBA(this.businessProfile);
        this._profileData.transferCanBook(!!this.businessProfile.isGetOrder && !this.businessProfile.isPromo);

        const locationData = result.workLocations?.code === 200
          ? result.workLocations.data
          : null;
        const workLocations = Array.isArray(locationData)
          ? locationData as IWorkLocation[]
          : (locationData ? [locationData as IWorkLocation] : []);
        this._profileData.transferWorkLocation(workLocations);
      },
      error: () => {
        this.businessProfile = null;
      }
    });
  }

  checkedService(subGroup: subGroup){
      if (subGroup.paymentForType === PaymentForType.ForHour) {
        const modalRef = this.modalService.open(ChooseTimeModalComponent);
        // Модал закрывается через close(null) при отмене — это resolve, а не reject.
        // Без проверки услуга попадала в заказ с duration = null и ценой 0,
        // а последующая отмена выбора делила на этот null и давала «NaN рублей».
        modalRef.result.then((result: number | null) => {
          if (!applyHourlyDuration(subGroup, result)) {
            subGroup.isChecked = false;
            this.chooseServices = this.chooseServices.filter(_ => _ !== subGroup);
            this.services$.next(null);
            return;
          }
          this.chooseServices.push(subGroup);
          this.services$.next(subGroup);
        }).catch(() => {
          // Закрытие по Esc/клику вне окна — тоже отмена выбора.
          subGroup.isChecked = false;
          this.chooseServices = this.chooseServices.filter(_ => _ !== subGroup);
          this.services$.next(null);
        });
      }else {
        this.chooseServices.push(subGroup);
        this.services$.next(subGroup);
        // this.getPrice();
      }

  }

  getCountService(){
    let count = 0;
    this.groupShow.forEach(item => {
      item.subGroups.forEach(subItem => {
        if (subItem.isChecked){
          count += 1;
        }
      });
    });
    return count;
  }
  protected readonly PaymentForType = PaymentForType;
  countService: number = 0;

  get servicesWord(): string {
    const n = this.countService;
    const n10 = n % 10;
    const n100 = n % 100;
    if (n10 === 1 && n100 !== 11) return 'услуга';
    if (n10 >= 2 && n10 <= 4 && (n100 < 12 || n100 > 14)) return 'услуги';
    return 'услуг';
  }

  get selectionPrice(): string {
    const raw = (getPriceString(this.chooseServices) || '').trim();
    return raw ? `${raw} ₽` : '';
  }

  get durationLabel(): string {
    if (!this.chooseServices.length) return '';
    const unlimited = this.chooseServices.filter(item => item.isTimeUnlimited);
    const timed = this.chooseServices.filter(item => !item.isTimeUnlimited);
    const minutes = timed.reduce((sum, item) => sum + (Number(item.duration) || 0), 0);
    const timeText = this.formatDuration(minutes);
    if (!timed.length) return 'без ограничения по времени';
    if (!unlimited.length) return timeText || 'без ограничения по времени';
    return timeText
      ? `${timeText} · без ограничения по времени`
      : 'без ограничения по времени';
  }

  private formatDuration(minutes: number): string {
    if (!minutes || minutes <= 0) return '';
    const hours = Math.floor(minutes / 60);
    const rest = minutes % 60;
    if (hours && rest) return `${hours} ч ${rest} мин`;
    if (hours) return `${hours} ч`;
    return `${rest} мин`;
  }

  getTextBtn(){
    if (this.chooseServices.length === 0){
      return 'Выберите услуги';
    }
    if (this.chooseServices.filter(_ => !_.isTimeUnlimited).length === 0){
      return 'Перейти к оформлению';
    } else {
      return 'Выбрать дату';
    }
  }

  setService($event: subGroup[]) {
      $event.forEach(_ => {
        if (!this.chooseServices.includes(_)){
          this.checkedService(_);
        }
      });
      this.chooseServices.forEach(_ => {
        if (_) {
          if (!$event.includes(_)) {
            this.chooseServices = this.chooseServices.filter(item => item !== _);
            [this.priceServices, this.countService, this.duration] = getPrice(this.chooseServices);
          }
        }
      });

      // Пришли из карточки акции — автоматически переходим на календарь,
      // если услуга не почасовая (ForHour требует выбора длительности через модал).
      // При возврате «Назад» с выбора дня (noAutoDate) авто-переход отключён,
      // чтобы пользователь остался на странице выбора услуги и не было петли.
      if (this.preSelectedServiceId && !this.suppressAutoDate) {
        const preSelected = this.chooseServices.find(s => s.id === this.preSelectedServiceId);
        if (preSelected && preSelected.paymentForType !== PaymentForType.ForHour) {
          this.chooseDate(true);
        }
      }
  }


}
