import {Location} from '@angular/common';
import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject, combineLatest, forkJoin, map, switchMap, take, takeUntil} from 'rxjs';

import {PaymentForType} from '../../../DTO/enums/paymentForType';

import {IChooseDayOfCalendar} from '../../../DTO/views/calendar/IChooseDayOfCalendar';
import {subGroup} from '../../../DTO/views/services/IViewSubGroups';
import {GroupService} from '../../../../services/groupservice';
import {ProfileService} from '../../../../services/profile.service';
import {ScheduleService} from '../../../../services/schedule.service';
import {ProfileDataService} from '../../services/profile-data.service';
import {Schedule} from '../../../DTO/classes/schedules/schedule';
import {
  BOOKING_TIMEZONE,
  fromCalendarDateTime,
  toCalendarDate,
  toClockTime
} from '../../helpers/booking-date';

interface StoredBookingSelection {
  version: 3;
  profileId: string;
  serviceId: string;
  date: string;
  time: string;
  timezone: string;
  dayId: string;
  start: string;
}

@Component({
  selector: 'app-choose-date-time',
  templateUrl: './choose-date-time.component.html',
  styleUrls: ['./choose-date-time.component.css'],
  providers: [ScheduleService]
})
export class ChooseDateTimeComponent implements OnInit, OnDestroy {
  private readonly storagePrefix = 'choose-date-selection:';
  private readonly destroy$ = new Subject<void>();

  @Output() onChooseDate = new EventEmitter();

  today: Date = new Date();
  id: string | null = null;
  serviceId: string | null = null;
  services: subGroup[] = [];
  duration = 0;
  isChoosed = false;
  /** Подсказку подсвечиваем только после попытки нажать неактивную кнопку. */
  showChooseHint = false;
  isLoading = true;
  loadError = false;
  dayId: string | null = null;
  dateRecord: Date = new Date();
  daySetInterval: IChooseDayOfCalendar | null = null;
  restoredStart?: string;
  workDays: Schedule[] | null = null;
  restoreMessage = false;
  private storedSelection: StoredBookingSelection | null = null;

  constructor(
    private readonly scheduleService: ScheduleService,
    private readonly groupService: GroupService,
    private readonly profileService: ProfileService,
    private readonly router: Router,
    private readonly location: Location,
    private readonly route: ActivatedRoute,
    public readonly profileData: ProfileDataService
  ) {}

  ngOnInit(): void {
    combineLatest([this.route.paramMap, this.route.queryParamMap])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([params, query]) => {
        const profileLink = params.get('id');
        const serviceId = query.get('serviceId');
        this.restoreMessage = query.get('restoreError') === '1';

        if (!profileLink || !serviceId) {
          this.redirectToServiceChoice(profileLink);
          return;
        }

        this.serviceId = serviceId;
        this.loadPage(profileLink, serviceId);
      });
  }

  loadPage(profileLink?: string, serviceId?: string): void {
    const link = profileLink ?? this.route.snapshot.paramMap.get('id');
    const requestedServiceId = serviceId ?? this.route.snapshot.queryParamMap.get('serviceId');
    if (!link || !requestedServiceId) {
      this.redirectToServiceChoice(link);
      return;
    }

    this.isLoading = true;
    this.loadError = false;
    this.isChoosed = false;
    this.daySetInterval = null;
    this.workDays = null;

    this.profileService.translateLink(link).pipe(
      map(response => String(response.data ?? '')),
      switchMap(profileId => {
        if (!profileId) throw new Error('Profile was not found');
        this.id = profileId;
        this.profileData.transferId(profileId);
        this.storedSelection = this.readStoredSelection(requestedServiceId);
        if (this.storedSelection) {
          this.today = fromCalendarDateTime(this.storedSelection.date, this.storedSelection.time)!;
        }

        return this.loadService(profileId, requestedServiceId).pipe(
          switchMap(catalogService => {
            const chosen = this.findChosenService(requestedServiceId);
            const effective = chosen ?? catalogService;
            // Безлимит: слотов нет, duration=0. Не грузим календарь — сразу к оформлению.
            if (effective.isTimeUnlimited) {
              return this.profileService.getViewProfile(profileId).pipe(
                map(profile => ({profile, service: effective, schedule: null as Schedule[] | null, skipSlots: true}))
              );
            }
            return forkJoin({
              profile: this.profileService.getViewProfile(profileId),
              // serviceId обязателен: без него `canAdd` считается по самой короткой услуге мастера,
              // и день с окнами по 30 минут помечается «есть окна» для услуги на час.
              schedule: this.scheduleService.getWorkDaysInMonth(
                profileId,
                this.today.getFullYear(),
                this.today.getMonth() + 1,
                requestedServiceId
              )
            }).pipe(map(({profile, schedule}) => ({
              profile,
              service: effective,
              schedule,
              skipSlots: false
            })));
          })
        );
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: ({profile, service, schedule, skipSlots}) => {
        // Почасовую услугу клиент настроил на шаге выбора услуг (сколько часов).
        // API отдаёт каталожную запись — с часовой ценой и без выбранной длительности,
        // поэтому предпочитаем уже выбранный вариант. Иначе duration = 0 и экран
        // времени сообщал «не удалось определить длительность услуги».
        this.services = [service];
        this.workDays = schedule;
        this.duration = service.duration ?? 0;
        this.profileData.transferProfileBA(profile);
        this.profileData.transferChooseService(this.services);

        if (skipSlots) {
          this.router.navigate(['../confirm-record'], {
            relativeTo: this.route,
            queryParams: {serviceId: requestedServiceId},
            replaceUrl: true
          });
          return;
        }

        this.restoreSelection(requestedServiceId);
        this.isLoading = false;

        // Прямой заход по ссылке на почасовую услугу: часы не выбраны и выбрать их
        // здесь негде — возвращаем на шаг услуг вместо тупика с пустым списком слотов.
        if (this.duration <= 0 && service.paymentForType === PaymentForType.ForHour) {
          this.redirectToServiceChoice(link);
        }
      },
      error: () => {
        this.isLoading = false;
        this.loadError = true;
      }
    });
  }

  private loadService(profileId: string, serviceId: string) {
    return this.groupService.getServiceById(profileId, serviceId);
  }

  /**
   * Ранее выбранная услуга с уже проставленной длительностью (почасовая — с числом
   * часов из модала). BehaviorSubject отдаёт значение синхронно.
   */
  private findChosenService(serviceId: string): subGroup | null {
    let chosen: subGroup | null = null;
    this.profileData.sendChooseServices.pipe(take(1)).subscribe(list => {
      chosen = list?.find(s => s.id === serviceId && (s.duration ?? 0) > 0) ?? null;
    });
    return chosen;
  }

  onDate(day: IChooseDayOfCalendar): void {
    this.daySetInterval = day?.isLast ? null : day;
  }

  setInterval(day: IChooseDayOfCalendar | null): void {
    if (!day?.date || !day.dayId) {
      this.isChoosed = false;
      this.removeStoredSelection();
      return;
    }

    this.isChoosed = true;
    this.showChooseHint = false;
    this.dateRecord = day.date;
    this.dayId = day.dayId;
    this.persistSelection();
  }

  clearInterval(shouldClear: boolean): void {
    if (!shouldClear) return;
    this.daySetInterval = null;
    this.dayId = null;
    this.restoredStart = undefined;
    this.isChoosed = false;
    this.removeStoredSelection();
  }

  onRestoreFailed(): void {
    this.restoreMessage = true;
    this.restoredStart = undefined;
    this.daySetInterval = null;
    this.dayId = null;
    this.isChoosed = false;
    this.removeStoredSelection();
  }

  nextConfirm(): void {
    // Раньше отсюда молча выходили: человек жал серую кнопку и не понимал, что не так.
    if (!this.isChoosed || !this.dayId) {
      this.showChooseHint = true;
      return;
    }
    this.showChooseHint = false;

    this.profileData.transferDate(this.dateRecord);
    this.profileData.transferDayId(this.dayId);
    this.router.navigate(['../confirm-record'], {
      relativeTo: this.route,
      queryParams: {serviceId: this.serviceId}
    });
  }

  inBack(): void {
    if (this.serviceId) {
      this.router.navigate(['../choose-service'], {
        relativeTo: this.route,
        queryParams: {serviceId: this.serviceId, noAutoDate: 1}
      });
    } else {
      this.location.back();
    }
  }

  private redirectToServiceChoice(profileLink: string | null): void {
    if (profileLink) {
      this.router.navigate(['/', profileLink], {replaceUrl: true});
    } else {
      this.router.navigate(['/'], {replaceUrl: true});
    }
  }

  private storageKey(serviceId = this.serviceId): string | null {
    return this.id && serviceId ? `${this.storagePrefix}${this.id}:${serviceId}` : null;
  }

  private persistSelection(): void {
    const key = this.storageKey();
    if (!key || !this.serviceId || typeof sessionStorage === 'undefined') return;
    const value: StoredBookingSelection = {
      version: 3,
      profileId: this.id!,
      serviceId: this.serviceId,
      date: toCalendarDate(this.dateRecord),
      time: toClockTime(this.dateRecord),
      timezone: BOOKING_TIMEZONE,
      dayId: this.dayId!,
      start: toClockTime(this.dateRecord)
    };
    sessionStorage.setItem(key, JSON.stringify(value));
    sessionStorage.setItem('booking-draft', JSON.stringify(value));
  }

  private restoreSelection(serviceId: string): void {
    const stored = this.storedSelection ?? this.readStoredSelection(serviceId);
    if (!stored) return;
    const date = fromCalendarDateTime(stored.date, stored.time)!;
    this.today = date;
    this.dateRecord = date;
    this.dayId = stored.dayId;
    this.restoredStart = stored.start;
    this.profileData.transferDate(date);
    this.profileData.transferDayId(stored.dayId);
  }

  private readStoredSelection(serviceId: string): StoredBookingSelection | null {
    const key = this.storageKey(serviceId);
    if (!key || typeof sessionStorage === 'undefined') return null;
    try {
      const stored = JSON.parse(sessionStorage.getItem(key) ?? 'null') as StoredBookingSelection | null;
      const date = stored?.date && stored?.time
        ? fromCalendarDateTime(stored.date, stored.time)
        : null;
      const valid = stored?.version === 3 && stored.profileId === this.id &&
        stored.serviceId === serviceId && stored.time === stored.start &&
        stored.timezone === BOOKING_TIMEZONE && !!stored.dayId && /^\d{2}:\d{2}$/.test(stored.start) &&
        !!date && !isNaN(date.getTime()) && date.getTime() >= Date.now() - 60_000;
      if (valid) return stored;
    } catch {
    }
    sessionStorage.removeItem(key);
    sessionStorage.removeItem('booking-draft');
    return null;
  }

  private removeStoredSelection(): void {
    const key = this.storageKey();
    if (key && typeof sessionStorage !== 'undefined') sessionStorage.removeItem(key);
    if (typeof sessionStorage !== 'undefined') sessionStorage.removeItem('booking-draft');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
