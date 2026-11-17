import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import { ToastService } from 'src/services/toast.service';
import {environment} from '../../../enviroments/environment';
import {IViewBusinessProfile} from "../../DTO/views/business/IViewBussinessProfile";
import {Store} from "@ngrx/store";
import {LoginService} from "../../auth/login.service";
import {UserType} from "../../DTO/classes/profiles/profile-user.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {BackendService} from "../../../services/backend.service";
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/navigation-service.service';
import { auditTime, filter, fromEvent, merge, Subscription, timeout } from 'rxjs';
import { ConsentService } from 'src/services/consent.service';
import { ConsentChannel } from '../../DTO/enums/consentChannel';
import { IViewConsent } from '../../DTO/views/consent/IViewConsent';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SubscribeChannelModalComponent } from './subscribe-channel-modal/subscribe-channel-modal.component';
import { RevokeChannelModalComponent } from './revoke-channel-modal/revoke-channel-modal.component';
import { PushDebugService, PushDeviceResult } from 'src/services/push-notification.service';

/**
 * Каналы с ботом (Telegram, VK, MAX): бэкенд при отзыве согласия удаляет
 * подписку, и обратно её вернёт только «Старт» в боте, а не переключатель.
 * Push сюда не входит — подписка устройства восстанавливается молча
 * при проверке именно текущего устройства.
 */
const CHANNELS_WITH_BOT: ConsentChannel[] = [
  ConsentChannel.Telegram,
  ConsentChannel.Vk,
  ConsentChannel.Max,
];

interface IConsentToggle {
  channel: ConsentChannel;
  name: string;
  hint: string;
  /** Согласие по 152-ФЗ — именно его отражает ползунок. */
  isGranted: boolean;
  /** Канал реально подключён (бот запущен, контакт указан, устройство подписано). */
  isSubscribed: boolean;
  telegramFromPersonal?: boolean;
  /** Запрос согласия в полёте: блокирует повторные клики, иначе ползунок «дёргается». */
  isPending: boolean;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers: [BackendService]
})
export class SettingsComponent implements OnInit, OnDestroy{

  
  private readonly subscriptions = new Subscription();
  private consentSub?: Subscription;
  private profileModal?: NgbModalRef;
  private destroyed = false;
  private profileRevision = 0;
  private pushRevision = 0;
  private consentReadRevision = 0;
  consentWritePending = false;
  consentReadFailed = false;
  consentLoaded = false;
  pushResult?: PushDeviceResult;
  readonly pushChannel = ConsentChannel.Push;
  readonly telegramChannel = ConsentChannel.Telegram;
  telegramHandoffPending = false;
  activeBusinessId: string | null = null;
  profile!: IViewBusinessProfile | undefined;
  settingsForm!: FormGroup;

  consentTextVersion: string = '';
  consentItems: IConsentToggle[] = [
    { channel: ConsentChannel.Sms, name: 'SMS', hint: 'Уведомления о записях и статусах на номер телефона', isGranted: false, isSubscribed: true, isPending: false },
    { channel: ConsentChannel.Email, name: 'Email', hint: 'Письма о записях, новостях и спецпредложениях сервиса', isGranted: false, isSubscribed: true, isPending: false },
    { channel: ConsentChannel.Telegram, name: 'Telegram', hint: 'Сообщения от Telegram-бота сервиса', isGranted: false, isSubscribed: false, isPending: false },
    { channel: ConsentChannel.Push, name: 'Push-уведомления', hint: 'Push-уведомления в браузере и мобильном приложении', isGranted: false, isSubscribed: false, isPending: false },
    { channel: ConsentChannel.Vk, name: 'VK', hint: 'Уведомления через мессенджер ВКонтакте', isGranted: false, isSubscribed: false, isPending: false },
    { channel: ConsentChannel.Max, name: 'Max', hint: 'Уведомления через мессенджер Max', isGranted: false, isSubscribed: false, isPending: false }];

  constructor(private _fb: FormBuilder,
              private _apiProfile: BackendService,
              private messageService: ToastService,
              private _apiAuth: LoginService,
              private _apiConsent: ConsentService,
              private _router: Router,
              private navigationService: NavigationService,
              private modalService: NgbModal,
              private pushService: PushDebugService,
              @Inject(PLATFORM_ID) private platformId: Object) {
    this.settingsForm = this._fb.nonNullable.group({
      phone: '',
      name: '',
      family: '',
      email: ''
    });
  }

  errors = {
    errorLink: '',
    errorLinkStyle: 'border-color: red; color: red',
  };

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Успешно', detail: 'Изменения сохранены', life:5000});
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    this.cancelConsentRead();
    this.profileModal?.dismiss();
    this.subscriptions.unsubscribe();
  }

  showError(text: string) {
    this.messageService.add({severity:'error', summary: 'Ошибка', detail: text, life:5000});
  }

  private showInfo(text: string) {
    this.messageService.add({severity:'info', summary: 'Почти готово', detail: text, life:7000});
  }

  private showDone(text: string) {
    this.messageService.add({severity:'success', summary: 'Готово', detail: text, life:5000});
  }

  saveChanges(): void {
    let data = this.settingsForm.getRawValue();
    if (this.profile) {
      this.profile.family = data['family'];
      this.profile.phone = data['phone'];
      this.profile.name = data['name'];
      this.profile.email = data['email'];
      this.subscriptions.add(this._apiProfile.saveProfile(this.profile?.id!, this.profile).subscribe(
          result => {
            if (result.code === 200){
                this.showSuccess();
                this._apiAuth.updateProfile(this.profile?.id!);
            } else {
              this.showError(result.message);
            }
          }
      ));
    }

    // this.http.put(`${this.url}/update-baprofile/${this.profile?.id}`, { viewbusinell: data })
    //   .subscribe(response => {
    //     console.log('Данные сохранены', response);
    //   }, error => {
    //     console.error('Ошибка', error);
    //   });
  }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.subscriptions.add(this._apiAuth.allProfiles$.subscribe(result => {
      const active = result.find(profile => profile.id === this._apiAuth.isProfileId());
      this.activeBusinessId = active?.userType === UserType.Business ? active.id ?? null : null;
      const next = result.find(profile => profile.userType === UserType.User)
        ?? result.find(profile => profile.id === this._apiAuth.isProfileId())
        ?? result[0];
      const id = next?.id;
      const previousId = this.profile?.id;
      if (previousId !== id) {
        ++this.profileRevision;
        this.cancelConsentRead();
        if (previousId) this.pushService.invalidateCheck(previousId);
        this.invalidatePush();
        this.profileModal?.dismiss();
        this.profileModal = undefined;
        this.consentWritePending = false;
        this.consentReadFailed = false;
        this.consentLoaded = false;
        this.telegramHandoffPending = false;
        this.consentItems = this.consentItems.map(item => ({
          ...item, isGranted: false, isSubscribed: false, isPending: false, telegramFromPersonal: false,
        }));
      }
      this.profile = next ? new IViewBusinessProfile() : undefined;
      if (next && this.profile) {
        this.profile.copyProfile(next);
        this.settingsForm.patchValue({
          phone: this.profile.phone,
          email: this.profile.email,
          name: this.profile.name,
          family: this.profile.family,
        }, { emitEvent: false });
        if (previousId !== id) this.loadConsents();
      }
    }));
    this.subscriptions.add(this._apiConsent.getTextVersions().subscribe({
      next: versions => { this.consentTextVersion = versions?.[0] ?? ''; },
      error: () => { this.consentTextVersion = ''; },
    }));
    this.subscriptions.add(merge(
      fromEvent(window, 'focus'), fromEvent(window, 'pageshow'), fromEvent(document, 'visibilitychange'),
    ).pipe(
      auditTime(150),
      filter(() => document.visibilityState === 'visible'),
    ).subscribe(() => {
      if (!this.profileModal && !this.consentWritePending) this.loadConsents();
    }));
    this.subscriptions.add(this.settingsForm.get('phone')?.valueChanges.subscribe(result => {
      const profileId = this.profile?.id;
      if (!profileId) return;
      if (result?.length !== 11) {
        this.errors.errorLink = 'Неправильно указан номер телефона';
      } else {
        this.subscriptions.add(this._apiProfile.checkUserPhone(profileId, result).subscribe(res => {
          if (this.isCurrent(profileId) && this.settingsForm.get('phone')?.value === result) {
            this.errors.errorLink = res.code === 404 ? '' : 'Этот номер уже используется в другом аккаунте';
          }
        }));
      }
    }));
  }
  goToMainPage() {
    this._router.navigate(['/']);
  }
  goToBack(): void {
    this.navigationService.goToBack();
  }

  private isCurrent(profileId: string): boolean {
    return !this.destroyed && this.profile?.id === profileId;
  }

  private cancelConsentRead(): void {
    ++this.consentReadRevision;
    this.consentSub?.unsubscribe();
  }

  retryPushCheck(): void {
    if (!this.consentWritePending) this.loadConsents();
  }

  private loadConsents(): void {
    const profileId = this.profile?.id;
    if (!profileId || this.consentWritePending) return;

    this.cancelConsentRead();
    const revision = this.consentReadRevision;
    const onError = () => {
      if (!this.isCurrent(profileId) || revision !== this.consentReadRevision) return;
      this.consentReadFailed = true;
      this.invalidatePush();
    };
    this.consentSub = this._apiConsent.getProfileConsents(profileId).pipe(timeout(15000)).subscribe({
      next: statuses => {
        if (!this.isCurrent(profileId) || revision !== this.consentReadRevision) return;
        if (!Array.isArray(statuses)) { onError(); return; }
        this.consentReadFailed = false;
        this.consentLoaded = true;
        this.applyConsentStatuses(statuses);
        if (this.pushItem.isGranted) this.checkPush(profileId);
        else this.invalidatePush();
      },
      error: onError,
    });
  }

  private applyConsentStatuses(statuses: IViewConsent[]): void {
    for (const item of this.consentItems) {
      const status = statuses.find(row => row.channel === item.channel);
      item.isGranted = status?.isGranted === true;
      // Consent status reports push for the whole account. The device has its own read-back.
      if (item.channel !== ConsentChannel.Push) item.isSubscribed = status?.isSubscribed ?? false;
      if (item.channel === ConsentChannel.Telegram) {
        item.telegramFromPersonal = status?.telegramFromPersonal === true;
        this.telegramHandoffPending = status?.telegramConnectionPending ??
          (this.telegramHandoffPending && item.isGranted && !item.isSubscribed);
      }
    }
  }

  private get pushItem(): IConsentToggle {
    return this.consentItems.find(item => item.channel === ConsentChannel.Push)!;
  }

  private invalidatePush(): void {
    ++this.pushRevision;
    this.pushResult = undefined;
    this.pushItem.isSubscribed = false;
  }

  private checkPush(profileId: string, restore = true): void {
    this.invalidatePush();
    const revision = this.pushRevision;
    void this.pushService.checkDevice(profileId, restore).then(result => {
      if (!this.isCurrent(profileId) || revision !== this.pushRevision || !this.pushItem.isGranted) return;
      if (result.isGranted === false) this.pushItem.isGranted = false;
      this.pushResult = result;
      this.pushItem.isSubscribed = result.state === 'connected';
    });
  }

  get pushStatusText(): string {
    if (this.consentReadFailed) return 'Не удалось проверить согласие на уведомления';
    if (!this.consentLoaded || !this.pushResult) return 'Проверяем подключение…';
    switch (this.pushResult.state) {
      case 'connected': return 'Подключено на этом устройстве';
      case 'permission': return 'Требуется разрешение устройства';
      case 'denied': return this.pushResult.diagnostics.isIOS
        ? 'Разрешите OnWaves в настройках уведомлений iPhone'
        : 'Разрешите уведомления в настройках сайта в браузере';
      case 'install': return 'Откройте OnWaves с иконки на экране «Домой»';
      case 'unavailable': return this.pushResult.diagnostics.errorCode === 'ios-too-old'
        ? 'Для уведомлений нужна iOS 16.4 или новее' : 'Это устройство не поддерживает push-уведомления';
      case 'setup': return 'Подписка на этом устройстве ещё не создана';
      case 'not-registered': return 'Подписка этого устройства не сохранена';
      case 'unverified': return 'Не удалось проверить подключение';
    }
  }

  get canSetUpPush(): boolean {
    if (!this.consentLoaded || this.consentReadFailed || this.consentWritePending) return false;
    const state = this.pushResult?.state;
    return state === 'permission' || state === 'setup' || state === 'install' || state === 'not-registered';
  }

  /**
   * Ползунок отражает согласие, а не факт подключения канала: иначе включение
   * Telegram/VK/Max/Push «не двигало» тумблер (isSubscribed приходит false до
   * старта бота), пользователь видел только тост, а DOM-состояние чекбокса
   * расходилось с моделью. Подключение канала — отдельный шаг, о нём говорит
   * строка-статус под названием.
   *
   * Каждая ветка обязана закончиться одним из двух: тост об ошибке + возврат
   * ползунка к подтверждённому состоянию, либо тост об успехе + ползунок в
   * новом состоянии. Молчаливых выходов здесь быть не должно.
   */
  onToggleConsent(item: IConsentToggle, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const isGranted = checkbox.checked;

    if (this.consentWritePending || !this.consentLoaded || this.consentReadFailed) {
      this.syncToggle(checkbox, item);
      return;
    }

    if (!this.profile?.id) {
      this.syncToggle(checkbox, item);
      this.showError('Профиль ещё загружается, повторите через пару секунд');
      return;
    }

    if (!this.consentTextVersion) {
      this.syncToggle(checkbox, item);
      this.showError('Не удалось загрузить текст согласия, попробуйте позже');
      return;
    }

    // Отзыв согласия по каналу с ботом бэкенд сопровождает удалением подписки,
    // и вернуть её тумблером уже нельзя — спрашиваем подтверждение заранее.
    if (!isGranted && item.isSubscribed && CHANNELS_WITH_BOT.includes(item.channel)) {
      this.syncToggle(checkbox, item);
      this.confirmRevoke(item, checkbox);
      return;
    }

    this.sendConsent(item, isGranted, checkbox);
  }

  private confirmRevoke(item: IConsentToggle, checkbox: HTMLInputElement): void {
    const revision = this.profileRevision;
    const modalRef = this.openProfileModal(RevokeChannelModalComponent);
    modalRef.componentInstance.channelName = item.name;
    modalRef.result.then(
      reason => {
        if (reason === 'revoke' && !this.destroyed && revision === this.profileRevision) {
          this.sendConsent(item, false, checkbox);
        }
      },
      // Отмена: ползунок уже возвращён в исходное состояние, сообщать не о чем.
      () => {}
    );
  }

  private sendConsent(item: IConsentToggle, isGranted: boolean, checkbox: HTMLInputElement): void {
    const profileId = this.profile?.id;
    if (!profileId || this.consentWritePending) return;
    const revision = this.profileRevision;
    this.startConsentWrite(profileId);
    item.isPending = true;
    this.subscriptions.add(this._apiConsent.sendConsent({
      profileUserId: profileId,
      channel: item.channel,
      isGranted,
      consentTextVersion: this.consentTextVersion,
      source: 'settings'
    }).pipe(timeout(15000)).subscribe({
      next: result => {
        if (!this.isCurrent(profileId) || revision !== this.profileRevision) return;
        this.consentWritePending = false;
        item.isPending = false;
        if (result.code === 200) {
          item.isGranted = isGranted;
          if (!isGranted) item.isSubscribed = false;
          if (!isGranted && item.channel === ConsentChannel.Telegram) this.telegramHandoffPending = false;
          this.syncToggle(checkbox, item);
          this.showDone(isGranted
            ? `${item.name}: согласие сохранено`
            : `${item.name}: вы отписаны от уведомлений`);
          if (this.pushItem.isGranted) this.checkPush(profileId);
          if (isGranted && item.channel !== ConsentChannel.Push && !item.isSubscribed) {
            this.openSubscribeModal(item);
          }
        } else {
          this.syncToggle(checkbox, item);
          this.showError(result.message || 'Не удалось сохранить согласие');
          this.loadConsents();
        }
      },
      error: () => {
        if (!this.isCurrent(profileId) || revision !== this.profileRevision) return;
        this.consentWritePending = false;
        item.isPending = false;
        this.syncToggle(checkbox, item);
        this.showError('Не удалось сохранить согласие, попробуйте позже');
        this.loadConsents();
      }
    }));
  }

  private startConsentWrite(profileId: string): void {
    this.consentWritePending = true;
    this.cancelConsentRead();
    this.pushService.invalidateCheck(profileId);
    this.invalidatePush();
  }

  isToggleOn(item: IConsentToggle): boolean {
    return item.isGranted;
  }

  /** Канал разрешён, но ещё не работает — нужен второй шаг (бот, контакт, подписка устройства). */
  needsSetup(item: IConsentToggle): boolean {
    return item.channel !== ConsentChannel.Push && item.isGranted && !item.isSubscribed;
  }

  /**
   * Чекбокс переключает сам браузер, поэтому после каждого ответа сервера
   * приводим DOM к подтверждённому состоянию: при отказе это откат, при успехе —
   * подтверждение (Angular не перепишет [checked] сам, если выражение не изменилось).
   */
  private syncToggle(checkbox: HTMLInputElement, item: IConsentToggle): void {
    checkbox.checked = this.isToggleOn(item);
  }

  private openProfileModal(component: typeof RevokeChannelModalComponent | typeof SubscribeChannelModalComponent): NgbModalRef {
    const modal = this.modalService.open(component, { centered: true, backdrop: 'static' });
    this.profileModal = modal;
    const clear = () => { if (this.profileModal === modal) this.profileModal = undefined; };
    void modal.result.then(clear, clear);
    return modal;
  }

  openSubscribeModal(item: IConsentToggle): void {
    const profile = this.profile;
    const profileId = profile?.id;
    if (!profileId || this.profileModal || this.consentWritePending || !item.isGranted) return;
    const revision = this.profileRevision;
    const modalRef = this.openProfileModal(SubscribeChannelModalComponent);
    modalRef.componentInstance.profileId = profileId;
    modalRef.componentInstance.channel = item.channel;
    modalRef.componentInstance.profile = profile;
    void modalRef.result.then(
      reason => {
        if (!this.isCurrent(profileId) || revision !== this.profileRevision || this.consentWritePending) return;
        if (reason === 'push-subscribed') {
          // Verify the POST against storage for this device before showing any success.
          this.cancelConsentRead();
          this.checkPush(profileId, false);
          return;
        }
        if (reason === 'contact-saved') {
          item.isSubscribed = true;
          this.showDone(`${item.name}: контакт сохранён`);
        } else if (reason === 'subscribed') {
          if (item.channel === ConsentChannel.Telegram) this.telegramHandoffPending = true;
          else this.showInfo(`Нажмите «Старт» в ${item.name} — статус обновится автоматически`);
        }
        this.loadConsents();
      },
      () => {
        if (this.isCurrent(profileId) && revision === this.profileRevision &&
            item.channel === ConsentChannel.Push && !this.consentWritePending) {
          this.checkPush(profileId, false);
        }
      }
    );
  }

  unsubscribeFromAll(): void {
    const profileId = this.profile?.id;
    if (!profileId || this.consentWritePending || this.profileModal) return;
    const revision = this.profileRevision;

    const modalRef = this.openProfileModal(RevokeChannelModalComponent);
    modalRef.componentInstance.bulk = true;
    void modalRef.result.then(
      reason => {
        if (reason === 'revoke' && this.isCurrent(profileId) && revision === this.profileRevision) {
          this.revokeAllConsents(profileId);
        }
      },
      () => {}
    );
  }

  private revokeAllConsents(profileId: string): void {
    const revision = this.profileRevision;
    this.startConsentWrite(profileId);
    this.subscriptions.add(this._apiConsent.revokeAllConsents(profileId).pipe(timeout(15000)).subscribe({
      next: result => {
        if (!this.isCurrent(profileId) || revision !== this.profileRevision) return;
        this.consentWritePending = false;
        if (result.code === 200) {
          this.applyConsentStatuses([]);
          this.consentLoaded = true;
          this.consentReadFailed = false;
          this.showDone(result.message || 'Вы отписаны от всех рассылок');
        } else {
          this.showError(result.message || 'Не удалось отписаться от рассылок');
          this.loadConsents();
        }
      },
      error: () => {
        if (!this.isCurrent(profileId) || revision !== this.profileRevision) return;
        this.consentWritePending = false;
        this.showError('Не удалось отписаться от рассылок, попробуйте позже');
        this.loadConsents();
      }
    }));
  }
}



