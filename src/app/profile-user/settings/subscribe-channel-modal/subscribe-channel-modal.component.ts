import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ConsentChannel } from 'src/app/DTO/enums/consentChannel';
import { ConsentService } from 'src/services/consent.service';
import { BackendService } from 'src/services/backend.service';
import { IViewBusinessProfile } from 'src/app/DTO/views/business/IViewBussinessProfile';
import { isPushError, PushDebugService, PushDiagnostics, PushErrorCode } from 'src/services/push-notification.service';
import { getDeviceCompat } from 'src/utils/device-compat';

interface ChannelInfo {
  name: string;
  icon: string;
  color: string;
  description: string;
}

const CHANNEL_MAP: Record<number, ChannelInfo> = {
  [ConsentChannel.Sms]: {
    name: 'SMS',
    icon: 'sms',
    color: '#006174',
    description: 'Укажите номер телефона, на который будут приходить SMS-уведомления о записях и статусах.'
  },
  [ConsentChannel.Email]: {
    name: 'Email',
    icon: 'email',
    color: '#0A6ED8',
    description: 'Укажите адрес электронной почты для получения уведомлений о записях и новостях сервиса.'
  },
  [ConsentChannel.Telegram]: {
    name: 'Telegram',
    icon: 'telegram',
    color: '#2AABEE',
    description: 'Перейдите в Telegram-бот и нажмите «Старт», чтобы получать уведомления о записях и статусах.'
  },
  [ConsentChannel.Vk]: {
    name: 'ВКонтакте',
    icon: 'vk',
    color: '#0077FF',
    description: 'Перейдите в сообщество ВКонтакте и разрешите получение сообщений для уведомлений.'
  },
  [ConsentChannel.Push]: {
    name: 'Push-уведомления',
    icon: 'push',
    color: '#006174',
    description: 'Разрешите push-уведомления в настройках браузера, чтобы получать мгновенные оповещения.'
  },
  [ConsentChannel.Max]: {
    name: 'Max',
    icon: 'max',
    color: '#7B61FF',
    description: 'Перейдите в бот Max и нажмите «Старт», чтобы подключить уведомления.'
  },
};

@Component({
  selector: 'app-subscribe-channel-modal',
  templateUrl: './subscribe-channel-modal.component.html',
  styleUrls: ['./subscribe-channel-modal.component.scss']
})
export class SubscribeChannelModalComponent implements OnInit, OnDestroy {
  @Input() profileId!: string;
  @Input() channel!: ConsentChannel;
  @Input() profile!: IViewBusinessProfile;

  info!: ChannelInfo;
  /** Отдельно от info.description: для iOS-вкладки текст под заголовком другой. */
  description = '';
  isContactChannel = false;
  isPushChannel = false;
  contactValue = '';
  contactMask = '';
  contactPlaceholder = '';

  subscribeLink: string | null = null;
  isLoading = false;
  isSaving = false;
  errorMessage: string | null = null;

  pushSteps: string[] = [];
  /** iOS в обычной вкладке: push невозможен, нужна установка на экран «Домой». */
  pushNeedsInstall = false;
  /** Диагностика показывается только после ошибки — отлаживать iPhone иначе нечем. */
  diagnostics: PushDiagnostics | null = null;
  showDiagnostics = false;

  private sub?: Subscription;

  private static readonly PUSH_ERROR_TEXTS: Record<PushErrorCode, string> = {
    'ios-needs-install':
      'На iPhone push-уведомления работают только в приложении с экрана «Домой». ' +
      'Откройте сайт в Safari, нажмите «Поделиться» → «На экран „Домой“», запустите OnWaves с иконки и повторите.',
    'ios-too-old':
      'Нужна iOS 16.4 или новее: на этой версии Safari push-уведомления недоступны. Обновите систему и попробуйте снова.',
    'unsupported':
      'Этот браузер не поддерживает push-уведомления. На iPhone используйте Safari и приложение с экрана «Домой».',
    'permission-denied':
      'Уведомления запрещены на уровне системы. На iPhone удалите иконку OnWaves с экрана «Домой» и добавьте её заново, ' +
      'затем разрешите уведомления. В браузере — включите их в настройках сайта.',
    'permission-dismissed':
      'Системный запрос не был подтверждён. Нажмите кнопку ещё раз и выберите «Разрешить» в окне устройства.',
    'sw-timeout':
      'Не удалось запустить фоновый сервис уведомлений. Полностью закройте приложение, откройте заново и повторите.',
    'vapid':
      'Ошибка настройки push на стороне сайта (ключ VAPID). Сообщите, пожалуйста, в поддержку.',
    'subscribe-failed':
      'Браузер не смог создать подписку на уведомления. Перезапустите приложение и попробуйте снова.',
    'server':
      'Разрешение получено, но сервер не сохранил подписку. Проверьте соединение и попробуйте снова.',
    'ssr':
      'Не удалось подключить push-уведомления. Обновите страницу и попробуйте снова.',
  };

  constructor(
    public activeModal: NgbActiveModal,
    private consentService: ConsentService,
    private backendService: BackendService,
    private pushService: PushDebugService
  ) {}

  ngOnInit(): void {
    this.info = CHANNEL_MAP[this.channel] ?? {
      name: 'Канал',
      icon: 'push',
      color: '#006174',
      description: 'Перейдите по ссылке, чтобы подключить уведомления.'
    };

    this.description = this.info.description;
    this.isContactChannel = this.channel === ConsentChannel.Sms || this.channel === ConsentChannel.Email;
    this.isPushChannel = this.channel === ConsentChannel.Push;

    if (this.isContactChannel) {
      if (this.channel === ConsentChannel.Sms) {
        this.contactMask = '+0(000)000-00-00';
        this.contactPlaceholder = '+7(123) 456-78-90';
        this.contactValue = this.profile?.phone ?? '';
      } else {
        this.contactPlaceholder = 'example@mail.ru';
        this.contactValue = this.profile?.email ?? '';
      }
    } else if (this.isPushChannel) {
      // Единственный сценарий с отдельным экраном: iPhone/iPad, открытый как
      // обычная вкладка. Web Push в WebKit существует только для приложения с
      // экрана «Домой», поэтому кнопка «Разрешить» здесь бесполезна — вместо
      // неё показываем инструкцию по установке.
      this.pushNeedsInstall = this.isIOSTab();
      this.pushSteps = this.buildPushSteps();
      if (this.pushNeedsInstall) {
        this.description = 'Осталось добавить OnWaves на экран «Домой» — это займёт несколько секунд.';
      }
    } else {
      this.loadLink();
    }
  }

  /**
   * ВАЖНО: до вызова pushService.subscribe() не должно быть ни одного `await`.
   * WebKit показывает системный запрос на уведомления только пока жива
   * transient activation от клика: после любого await iOS молча пропускает
   * запрос — ни диалога, ни отказа. Диагностику собираем уже после ошибки.
   */
  async enablePush(): Promise<void> {
    this.isSaving = true;
    this.errorMessage = null;

    try {
      await this.pushService.subscribe(this.profileId);
      this.activeModal.close('push-subscribed');
    } catch (error) {
      console.error('Push subscription failed', error);
      this.errorMessage = this.describePushError(error);
      this.diagnostics = await this.pushService.collectDiagnostics();
    } finally {
      this.isSaving = false;
    }
  }

  toggleDiagnostics(): void {
    this.showDiagnostics = !this.showDiagnostics;
  }

  private describePushError(error: unknown): string {
    if (isPushError(error)) {
      return SubscribeChannelModalComponent.PUSH_ERROR_TEXTS[error.code]
        ?? 'Не удалось подключить push-уведомления. Попробуйте позже.';
    }
    return 'Не удалось подключить push-уведомления. Проверьте соединение и попробуйте снова.';
  }

  private isIOSTab(): boolean {
    const isBrowser = typeof window !== 'undefined' && typeof navigator !== 'undefined';
    return isBrowser && getDeviceCompat().isIOS && !this.pushService.isStandalone();
  }

  private buildPushSteps(): string[] {
    if (this.pushNeedsInstall) {
      return [
        'Нажмите «Поделиться» — квадрат со стрелкой вверх в нижней панели Safari',
        'Выберите «На экран „Домой“» и подтвердите «Добавить»',
        'Откройте OnWaves с новой иконки и вернитесь в этот раздел',
      ];
    }

    return [
      'Нажмите кнопку ниже',
      'Разрешите уведомления в системном окне устройства',
      'Устройство будет зарегистрировано для получения уведомлений',
    ];
  }

  private loadLink(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.sub = this.consentService.getSubscribeLink(this.profileId, this.channel).subscribe({
      next: result => {
        this.isLoading = false;
        this.subscribeLink = result?.link ?? null;
        if (!this.subscribeLink) {
          this.errorMessage = 'Ссылка для подключения пока недоступна';
        }
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Не удалось загрузить ссылку, попробуйте позже';
      }
    });
  }

  openLink(): void {
    if (this.subscribeLink) {
      window.open(this.subscribeLink, '_blank', 'noopener,noreferrer');
      this.activeModal.close('subscribed');
    }
  }

  saveContact(): void {
    if (!this.contactValue.trim()) {
      this.errorMessage = this.channel === ConsentChannel.Sms
        ? 'Введите номер телефона'
        : 'Введите адрес электронной почты';
      return;
    }

    if (this.channel === ConsentChannel.Email && !this.isValidEmail(this.contactValue)) {
      this.errorMessage = 'Введите корректный адрес электронной почты';
      return;
    }

    this.isSaving = true;
    this.errorMessage = null;

    if (this.channel === ConsentChannel.Sms) {
      this.profile.phone = this.contactValue;
    } else {
      this.profile.email = this.contactValue;
    }

    this.sub = this.backendService.saveProfile(this.profile.id!, this.profile).subscribe({
      next: result => {
        this.isSaving = false;
        if (result.code === 200) {
          this.activeModal.close('contact-saved');
        } else {
          this.errorMessage = result.message ?? 'Не удалось сохранить данные';
        }
      },
      error: () => {
        this.isSaving = false;
        this.errorMessage = 'Не удалось сохранить, попробуйте позже';
      }
    });
  }

  private isValidEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
