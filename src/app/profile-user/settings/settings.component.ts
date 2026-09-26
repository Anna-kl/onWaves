import {Component, OnDestroy, OnInit} from '@angular/core';
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
import { Subscription } from 'rxjs';
import { ConsentService } from 'src/services/consent.service';
import { ConsentChannel } from '../../DTO/enums/consentChannel';
import { IViewConsent } from '../../DTO/views/consent/IViewConsent';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubscribeChannelModalComponent } from './subscribe-channel-modal/subscribe-channel-modal.component';
import { RevokeChannelModalComponent } from './revoke-channel-modal/revoke-channel-modal.component';
import { PushDebugService } from 'src/services/push-notification.service';

/**
 * Каналы с ботом (Telegram, VK, MAX): бэкенд при отзыве согласия удаляет
 * подписку, и обратно её вернёт только «Старт» в боте, а не переключатель.
 * Push сюда не входит — подписка устройства восстанавливается молча
 * (см. restorePushSubscription).
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

  
  private unsubscribe$: Subscription|null = null;
  private consentSub$: Subscription|null = null;
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
              private pushService: PushDebugService) {
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
    this.unsubscribe$?.unsubscribe();
    this.consentSub$?.unsubscribe();
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
      this.unsubscribe$ = this._apiProfile.saveProfile(this.profile?.id!, this.profile).subscribe(
          result => {
            if (result.code === 200){
                this.showSuccess();
                this._apiAuth.updateProfile(this.profile?.id!);
            } else {
              this.showError(result.message);
            }
          }
      );
    }

    // this.http.put(`${this.url}/update-baprofile/${this.profile?.id}`, { viewbusinell: data })
    //   .subscribe(response => {
    //     console.log('Данные сохранены', response);
    //   }, error => {
    //     console.error('Ошибка', error);
    //   });
  }

  ngOnInit(): void {
    
    this.unsubscribe$ = this._apiAuth.allProfiles$.subscribe(result => {
      let profile = result.find(_ => _.userType === UserType.User);
      if (profile) {
        this.profile = new IViewBusinessProfile();
        this.profile.copyProfile(profile as IViewBusinessProfile);
        this.settingsForm = this._fb.group({
          phone: this.profile?.phone,
          email: this.profile?.email,
          name: this.profile?.name,
          family: this.profile?.family
        });
        this.loadConsents();
      }
    });
    this.settingsForm.get('phone')?.valueChanges.subscribe(result => {
      if (result.length != 11){
        this.errors.errorLink = 'Не правильно указан номер телефона';
      } else {
        this.unsubscribe$ = this._apiProfile.checkUserPhone(this.profile?.id!, result).subscribe(res => {
          if (res.code === 404){
            this.errors.errorLink = '';
          } else {
            this.errors.errorLink = 'Этот номер уже используется в дрцгом аккаунте';
          }
        });
      }
    });
  }
  goToMainPage() {
    this._router.navigate(['/']);
  }
  goToBack(): void {
    this.navigationService.goToBack();
  }

  private loadConsents(): void {
    if (!this.profile?.id) {
      return;
    }
    this.consentSub$?.unsubscribe();
    this.unsubscribe$ = this._apiConsent.getTextVersions().subscribe(versions => {
      this.consentTextVersion = versions?.[0] ?? '';
    });
    this.consentSub$ = this._apiConsent.getProfileConsents(this.profile.id).subscribe(result => {
      this.applyConsentStatuses(result);
    });
  }

  private applyConsentStatuses(statuses: IViewConsent[]): void {
    this.consentItems = this.consentItems.map(item => {
      const status = statuses.find(_ => _.channel === item.channel);
      return {
        ...item,
        isGranted: status ? status.isGranted : false,
        isSubscribed: status ? status.isSubscribed : item.isSubscribed
      };
    });
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

    if (item.isPending) {
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
    const modalRef = this.modalService.open(RevokeChannelModalComponent, { centered: true });
    modalRef.componentInstance.channelName = item.name;
    modalRef.result.then(
      reason => {
        if (reason === 'revoke') {
          this.sendConsent(item, false, checkbox);
        }
      },
      // Отмена: ползунок уже возвращён в исходное состояние, сообщать не о чем.
      () => {}
    );
  }

  private sendConsent(item: IConsentToggle, isGranted: boolean, checkbox: HTMLInputElement): void {
    item.isPending = true;
    this.unsubscribe$ = this._apiConsent.sendConsent({
      profileUserId: this.profile!.id!,
      channel: item.channel,
      isGranted: isGranted,
      consentTextVersion: this.consentTextVersion,
      source: 'settings'
    }).subscribe({
      next: result => {
        item.isPending = false;
        if (result.code === 200) {
          item.isGranted = isGranted;
          this.syncToggle(checkbox, item);
          this.showDone(isGranted
            ? `${item.name}: согласие сохранено`
            : `${item.name}: вы отписаны от уведомлений`);
          if (isGranted && !item.isSubscribed) {
            if (item.channel === ConsentChannel.Push) {
              this.restorePushSubscription(item);
            } else {
              this.openSubscribeModal(item);
            }
          }
        } else {
          this.syncToggle(checkbox, item);
          this.showError(result.message || 'Не удалось сохранить согласие');
        }
      },
      error: () => {
        item.isPending = false;
        this.syncToggle(checkbox, item);
        this.showError('Не удалось сохранить согласие, попробуйте позже');
      }
    });
  }

  isToggleOn(item: IConsentToggle): boolean {
    return item.isGranted;
  }

  /** Канал разрешён, но ещё не работает — нужен второй шаг (бот, контакт, подписка устройства). */
  needsSetup(item: IConsentToggle): boolean {
    return item.isGranted && !item.isSubscribed;
  }

  /**
   * Чекбокс переключает сам браузер, поэтому после каждого ответа сервера
   * приводим DOM к подтверждённому состоянию: при отказе это откат, при успехе —
   * подтверждение (Angular не перепишет [checked] сам, если выражение не изменилось).
   */
  private syncToggle(checkbox: HTMLInputElement, item: IConsentToggle): void {
    checkbox.checked = this.isToggleOn(item);
  }

  /**
   * При отзыве согласия бэкенд удаляет строки подписки, но разрешение браузера
   * и сама подписка на устройстве остаются. Поэтому после повторной выдачи
   * согласия канал чинится молча, без системных окон и без модалки — она
   * открывается, только если восстановить нечего (нет разрешения или подписки).
   */
  private restorePushSubscription(item: IConsentToggle): void {
    this.pushService.syncExistingSubscription(this.profile!.id!)
      .then(sub => {
        if (sub) {
          item.isSubscribed = true;
          this.showDone('Push-уведомления снова подключены на этом устройстве');
        } else {
          this.openSubscribeModal(item);
        }
      })
      .catch(() => this.openSubscribeModal(item));
  }

  openSubscribeModal(item: IConsentToggle): void {
    const modalRef = this.modalService.open(SubscribeChannelModalComponent, {
      centered: true,
      backdrop: 'static'
    });
    modalRef.componentInstance.profileId = this.profile!.id;
    modalRef.componentInstance.channel = item.channel;
    modalRef.componentInstance.profile = this.profile;
    modalRef.result.then(
      reason => {
        switch (reason) {
          case 'push-subscribed':
            // Подписка сохраняется отдельным эндпоинтом (notifications/subscribe),
            // и запись согласия для Push может ещё не существовать. Тогда
            // applyConsentStatuses оставит наш флаг, и подсказка «канал не
            // подключён» не вернётся, хотя устройство уже зарегистрировано.
            item.isSubscribed = true;
            this.showDone('Push-уведомления подключены на этом устройстве');
            break;
          case 'contact-saved':
            item.isSubscribed = true;
            this.showDone(`${item.name}: контакт сохранён`);
            break;
          case 'subscribed':
            // Уход в бота ещё не значит подписку: она появится после «Старт».
            this.showInfo(`Нажмите «Старт» в ${item.name} — статус обновится автоматически`);
            break;
        }
        this.loadConsents();
      },
      // Закрыли крестиком: согласие уже сохранено, ползунок ему соответствует,
      // подсказка «канал не подключён» останется под названием канала.
      () => {}
    );
  }

  unsubscribeFromAll(): void {
    if (!this.profile?.id) {
      this.showError('Профиль ещё загружается, повторите через пару секунд');
      return;
    }

    // Массовый отзыв тоже удаляет подписки ботов — предупреждение то же.
    const modalRef = this.modalService.open(RevokeChannelModalComponent, { centered: true });
    modalRef.componentInstance.bulk = true;
    modalRef.result.then(
      reason => {
        if (reason === 'revoke') {
          this.revokeAllConsents();
        }
      },
      () => {}
    );
  }

  private revokeAllConsents(): void {
    this.unsubscribe$ = this._apiConsent.revokeAllConsents(this.profile!.id!).subscribe({
      next: result => {
        // Ползунки гасим только по подтверждённому ответу: раньше тост об успехе
        // и сброс всех каналов выполнялись при любом коде в теле ответа.
        if (result.code === 200) {
          this.consentItems = this.consentItems.map(item => ({ ...item, isGranted: false }));
          this.showDone(result.message || 'Вы отписаны от всех рассылок');
        } else {
          this.showError(result.message || 'Не удалось отписаться от рассылок');
        }
      },
      error: () => this.showError('Не удалось отписаться от рассылок, попробуйте позже')
    });
  }
}



