import { Component, DestroyRef, Inject, Input, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalRegisterComponent } from '../modal-register/modal-register.component';

import { ModalRegisterNextComponent } from '../modal-register-next/modal-register-next.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServices } from '../../services/auth.service';
import { ISendCode } from '../../../../DTO/ISendCode';
import { BusService } from '../../../../../services/busService';

import { CookieService } from 'ngx-cookie-service';
import { IViewAuthProfile } from '../../../../DTO/views/profile/IViewAuthProfile';

import { LoginService } from '../../../../auth/login.service';

import { catchError, exhaustMap, interval, of, startWith, Subscription, takeWhile, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RegisterEmailCodeComponent } from '../register-email-code/register-email-code.component';
import { MaxLoginState } from '../../../../DTO/views/auth/IMaxLogin';
import {
  authBodyCode,
  ensureDeviceUuid,
  openMaxBotWindow,
  parseIsMaxLinked,
  parseMaxLoginStart,
  parseMaxLoginStatus,
  parseSessionId,
} from '../../../../../helpers/common/max-auth';


@Component({
  selector: 'app-modal-enter-data',
  templateUrl: './modal-enter-data.component.html',
  styleUrls: ['./modal-enter-data.component.css'],

  providers: [AuthServices, BusService]

})
export class ModalEnterDataComponent implements OnInit {

  enterEmail() {
      let modalRef = this.modalService.open(RegisterEmailCodeComponent);
      modalRef.componentInstance.phone = this.phone;
      this.activeModal.close();
  }


  public codeForm: FormGroup;
  public checkCode = false;
  @Input() public session = '';
  @Input() public phone = '';
  @Input() public email = '';
  @Input() public code = '';
  /** Ссылка на бота, если уже открыли вход через MAX с этого экрана. */
  @Input() maxBotLink = '';
  flagError: boolean = false;
  smsSent = false;
  textError: string = '';
  link: string|null = null;
  private destroyRef = inject(DestroyRef);
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private _authService: AuthServices,
    private _busService: BusService,
    private _cookieService: CookieService
  ) {

    this.codeForm = this.formBuilder.group ({
      a1: new FormControl(undefined, [Validators.max(1), Validators.required]),
      a2: new FormControl(undefined, [Validators.max(1), Validators.required]),
      a3: new FormControl(undefined, [Validators.max(1), Validators.required]),
      a4: new FormControl(undefined, [Validators.max(1), Validators.required])
    });
  }

  ngOnInit(): void {
    if (this.phone.length > 0) {
      this.startCountdown();
      this.checkMaxChannel();
    }
    if (this.maxBotLink) {
      this.lastChannel = 'max';
      this.maxLoginState = MaxLoginState.Waiting;
      this.startMaxStatusPoll();
    }
  }

  /**
   * Сколько ждём звонка, прежде чем открыть запасные каналы.
   * Flash-call от Plusofon доходит за считанные секунды или не доходит вовсе,
   * поэтому держать пользователя дольше 30 секунд бессмысленно.
   */
  static readonly CALL_WAIT_SECONDS = 30;

  secondsLeft = ModalEnterDataComponent.CALL_WAIT_SECONDS; // текущее значение (биндим в шаблон)
  private countdown?: Subscription;
  private maxPoll?: Subscription;

  startCountdown(from = ModalEnterDataComponent.CALL_WAIT_SECONDS) {
    // Пересчёт запускается повторно (после SMS/MAX) — старый интервал иначе
    // продолжит писать в secondsLeft и собьёт новый отсчёт.
    this.countdown?.unsubscribe();
    this.secondsLeft = from;

    this.countdown = interval(1000).pipe(
      startWith(0),                      // сразу показать стартовое значение
      tap(t => this.secondsLeft = Math.max(from - t, 0)),
      takeWhile(() => this.secondsLeft > 0),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }


  closeModal() {
    this.activeModal.close();
  }
  isUuid(): boolean {
    return this._cookieService.check('uuid-ocpio');
  }

  next() {
    const id = ensureDeviceUuid(this._cookieService, this.phone || 'max');
    const sendCode = this.codeForm.getRawValue();
    const send = {
      session: this.session,
      code: `${sendCode['a1']}${sendCode['a2']}${sendCode['a3']}${sendCode['a4']}`,
      uuid: id,
    } as ISendCode;

    this._authService.checkCode(send).subscribe(result => {
      if (result.code === 200) {
        let user = result.data as IViewAuthProfile;
        this._busService.transferToken(user);
        this.activeModal.close();
        this.modalService.dismissAll();

        const profileUserId = result.data?.profileUserId;
        if (profileUserId != null) {
          let expiry = new Date();
          expiry.setDate(expiry.getDate()+365);

          this._cookieService.set('auth-token-ocpio', user.token, expiry, '/');

          if(user.profileUserId) {
            this._cookieService.set('profileId-ocpio', user.profileUserId, expiry, '/');

          }
          this.activeModal.close();
          this.loginService.isAutentificate$.next(true);
          this.loginService.updateProfileUA();
          this.loginService.afterLoginNavigateAwayFromLanding();
        } else {
          this.activeModal.close();
          let modalRef = this.modalService.open(ModalRegisterNextComponent);
          modalRef.componentInstance.token = result.data;
          modalRef.componentInstance.email = this.email;
        }
      } else if (result.code === 500) {
        this.flagError = true;
        this.textError = `Неверный код, попробуйте еще раз`;
      }
    });
  }

  back() {
    this.activeModal.close();
    const modalRef = this.modalService.open(ModalRegisterComponent);
  }
  @Input() mask: string = '';
  onSubmitCode() {

  }

  setCell(number: number) {
      if (number === 0) {
        document?.getElementById("sms2")?.focus();
        const num = this.codeForm.get('a1')?.value;
        if (isNaN(Number(num)))
        this.codeForm.patchValue({'a1': ''});
    }
      if (number === 1){
        document?.getElementById("sms3")?.focus();
        const num = this.codeForm.get('a2')?.value;
        if (isNaN(Number(num)))
          this.codeForm.patchValue({'a2': ''});
      }
      if (number === 2) {
        document?.getElementById("sms4")?.focus();
        const num = this.codeForm.get('a3')?.value;
        if (isNaN(Number(num)))
          this.codeForm.patchValue({'a3': ''});
      }
    if (number === 3) {
        const num = this.codeForm.get('a4')?.value;
        if (isNaN(Number(num)))
          this.codeForm.patchValue({'a4': ''});
        this.checkCode = true;
      }
  }

  validateInput(event: any, cellIndex: number): void {
    const input = event.target.value;

    if (input.length > 1) {
      event.target.value = input.slice(0, 1);
    }

    if (!/^\d$/.test(input)) {
      event.target.value = '';
    } else {
      this.setCell(cellIndex);
    }
  }
  returnToPhone() {
    this.activeModal.close();
    this.modalService.open(ModalRegisterComponent);
  }

  sendSms() {
    if (this.secondsLeft > 0 || this.smsSending) {
      return;
    }
    this.smsSending = true;
    this._authService.sendSms(this.fullPhone).subscribe({
      next: result => {
        this.smsSending = false;
        if (result.code === 200) {
          this.stopMaxStatusPoll();
          this.session = result.data;
          this.smsSent = true;
          this.lastChannel = 'sms';
          this.channelNotice = 'Код отправлен в SMS';
          this.channelError = false;
          this.startCountdown();
        } else {
          this.setChannelError('Не удалось отправить SMS, попробуйте позже');
        }
      },
      error: () => {
        this.smsSending = false;
        this.setChannelError('Не удалось отправить SMS, попробуйте позже');
      }
    });
  }

  sendZvonok(): void {
    if (this.zvonokSending) {
      return;
    }
    this.zvonokSending = true;
    this._authService.sendZvonok(this.fullPhone).subscribe({
      next: result => {
        this.zvonokSending = false;
        if (result.code === 200) {
          this.stopMaxStatusPoll();
          this.session = result.data;
          this.zvonokSent = true;
          this.lastChannel = 'zvonok';
          this.channelNotice = 'Звоним через Zvonok — введите последние 4 цифры входящего номера';
          this.channelError = false;
          this.startCountdown();
        } else if (result.code === 204) {
          this.setChannelError('Подождите немного и запросите звонок ещё раз');
        } else {
          this.setChannelError('Не удалось заказать звонок через Zvonok, попробуйте SMS или MAX');
        }
      },
      error: () => {
        this.zvonokSending = false;
        this.setChannelError('Не удалось заказать звонок через Zvonok, попробуйте SMS или MAX');
      }
    });
  }

  /* ---------- Запасные каналы получения кода ---------- */

  /** Номер в том виде, в каком его ждёт бэкенд: код страны без «+» и номер. */
  get fullPhone(): string {
    return `${this.code.replace('+', '')}${this.phone}`;
  }

  /** null — ещё проверяем, false — аккаунт MAX не привязан к номеру. */
  maxLinked: boolean | null = null;
  maxSending = false;
  maxSent = false;
  maxLoginState: MaxLoginState | null = null;
  maxLinkCopied = false;
  smsSending = false;
  zvonokSending = false;
  zvonokSent = false;
  channelNotice = '';
  channelError = false;
  readonly MaxLoginState = MaxLoginState;

  /**
   * MAX не участвует в автоподборе канала на бэке: код туда уходит только
   * по явному действию. Проверка нужна, чтобы сразу слать код привязанным
   * и не гонять человека в бота зря.
   */
  private checkMaxChannel(): void {
    this._authService.isMaxAvailable(this.fullPhone).subscribe({
      next: result => {
        this.maxLinked = parseIsMaxLinked(result);
      },
      error: () => this.maxLinked = false
    });
  }

  sendToMax(): void {
    if (this.maxSending) {
      return;
    }
    if (this.maxLoginState === MaxLoginState.CodeSent || (this.maxBotLink && this.isMaxWaiting)) {
      this.openMaxBot();
      return;
    }
    if (this.maxLinked === true) {
      this.sendCodeToLinkedMax();
      return;
    }
    if (this.maxLinked === null && this.phone.length > 0) {
      this.sendCodeToLinkedMax();
      return;
    }
    const popup = this.isBrowser ? window.open('about:blank', '_blank') : null;
    this.startMaxLoginFlow(popup);
  }

  /** Привязанный MAX: тот же код, что на экране. 409/502 — человек ещё не открыл бота. */
  private sendCodeToLinkedMax(): void {
    this.maxSending = true;
    this._authService.sendCodeToMax(this.fullPhone, this.session).subscribe({
      next: result => {
        this.maxSending = false;
        const code = authBodyCode(result);
        if (code === 409 || code === 502) {
          this.maxLinked = code === 409 ? false : this.maxLinked;
          this.startMaxLoginFlow();
          return;
        }
        if (code && code !== 200) {
          this.setChannelError(result.message || 'MAX не принял сообщение, откройте диалог с ботом');
          return;
        }
        const sessionId = parseSessionId(result?.data);
        if (sessionId) {
          this.session = sessionId;
        }
        this.maxLinked = true;
        this.maxSent = true;
        this.lastChannel = 'max';
        this.channelError = false;
        this.channelNotice = 'Код отправлен в MAX';
      },
      error: (error) => {
        this.maxSending = false;
        const code = authBodyCode(error?.error, error?.status);
        if (code === 409 || code === 502) {
          this.maxLinked = code === 409 ? false : this.maxLinked;
          this.startMaxLoginFlow();
          return;
        }
        this.setChannelError('Не удалось отправить код в MAX');
      }
    });
  }

  /**
   * Нет привязки — ссылка на бота OnWaves. Пользователь жмёт «Начать»,
   * разрешает обмен (подтверждает номер), код приходит в этот чат.
   * Ссылку не собираем: TTL 15 минут, payload подписывает сервер.
   */
  startMaxLoginFlow(popup?: Window | null): void {
    if (this.maxSending || !this.phone) {
      popup?.close();
      return;
    }
    this.maxSending = true;
    this.channelError = false;
    this.channelNotice = '';
    const uuid = ensureDeviceUuid(this._cookieService, this.phone || 'max');
    this._authService.startMaxLogin(this.fullPhone, uuid).subscribe({
      next: result => {
        this.maxSending = false;
        if (authBodyCode(result) !== 200) {
          popup?.close();
          this.setChannelError(result.message || 'Не удалось открыть вход через MAX');
          return;
        }
        const start = parseMaxLoginStart(result);
        if (!start) {
          popup?.close();
          this.setChannelError('Не удалось получить ссылку на бота MAX');
          return;
        }
        this.session = start.sessionId;
        this.maxBotLink = start.link;
        this.maxLoginState = MaxLoginState.Waiting;
        this.maxSent = false;
        this.lastChannel = 'max';
        this.channelNotice = '';
        // Вкладку открываем только если её заложили по клику: иначе браузер режет popup.
        if (popup && !popup.closed) {
          openMaxBotWindow(start.link, popup);
        } else {
          popup?.close();
        }
        this.startMaxStatusPoll();
      },
      error: () => {
        this.maxSending = false;
        popup?.close();
        this.setChannelError('Не удалось открыть вход через MAX');
      }
    });
  }

  openMaxBot(): void {
    if (!this.isBrowser || !this.maxBotLink) {
      return;
    }
    openMaxBotWindow(this.maxBotLink);
  }

  copyMaxLink(): void {
    if (!this.isBrowser || !this.maxBotLink || !navigator.clipboard) {
      return;
    }
    navigator.clipboard.writeText(this.maxBotLink).then(() => {
      this.maxLinkCopied = true;
    }, () => {
      this.maxLinkCopied = false;
    });
  }

  restartMaxLogin(): void {
    this.maxBotLink = '';
    this.maxLoginState = null;
    this.maxLinkCopied = false;
    this.stopMaxStatusPoll();
    const popup = this.isBrowser ? window.open('about:blank', '_blank') : null;
    this.startMaxLoginFlow(popup);
  }

  private startMaxStatusPoll(): void {
    this.stopMaxStatusPoll();
    if (!this.session) {
      return;
    }
    this.maxPoll = interval(2500).pipe(
      startWith(0),
      exhaustMap(() => this._authService.getMaxLoginStatus(this.session).pipe(
        catchError(() => of(null))
      )),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(result => {
      if (!result) {
        return;
      }
      const status = parseMaxLoginStatus(result);
      if (!status) {
        return;
      }
      this.maxLoginState = status.state;
      if (status.sessionId) {
        this.session = status.sessionId;
      }
      if (status.state === MaxLoginState.CodeSent) {
        this.maxSent = true;
        this.lastChannel = 'max';
        this.channelError = false;
        this.channelNotice = 'Код отправлен в MAX — введите его ниже';
        this.stopMaxStatusPoll();
      }
      if (status.state === MaxLoginState.Expired) {
        this.stopMaxStatusPoll();
        this.setChannelError('Ссылка устарела. Откройте бота заново');
      }
    });
  }

  private stopMaxStatusPoll(): void {
    this.maxPoll?.unsubscribe();
    this.maxPoll = undefined;
  }

  get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  get isMaxWaiting(): boolean {
    return this.maxLoginState === MaxLoginState.Waiting
      || this.maxLoginState === MaxLoginState.ContactRequested;
  }

  get maxStepText(): string {
    switch (this.maxLoginState) {
      case MaxLoginState.ContactRequested:
        return 'В боте нажмите «Подтвердить номер» — так вы разрешите прислать код входа.';
      case MaxLoginState.Expired:
        return 'Ссылка жила 15 минут. Получите новую и откройте бота ещё раз.';
      default:
        return 'Откройте бота OnWaves, нажмите «Начать» и подтвердите номер. Код придёт в этот чат.';
    }
  }

  /** Куда последний раз ушёл код — от этого зависит подпись над полями ввода. */
  lastChannel: 'call' | 'sms' | 'max' | 'zvonok' = 'call';

  get codeTitle(): string {
    if (this.maxLoginState === MaxLoginState.Expired) {
      return 'Ссылка устарела';
    }
    if (this.isMaxWaiting) {
      return 'Код придёт в MAX';
    }
    return this.lastChannel === 'sms' || this.lastChannel === 'max'
      ? 'Введите 4 цифры'
      : 'Введите 4 последние цифры номера';
  }

  get codeSubtitle(): string {
    if (this.isMaxWaiting) {
      return this.maxStepText;
    }
    switch (this.lastChannel) {
      case 'max': return 'которые мы отправили вам в MAX';
      case 'sms': return 'которые мы отправили вам в SMS';
      case 'zvonok': return 'с которого сейчас поступит звонок через Zvonok';
      default:    return 'с которого сейчас поступил звонок';
    }
  }

  get maxHint(): string {
    if (this.maxSending) return 'Открываем…';
    if (this.maxSent) return 'Код отправлен';
    if (this.isMaxWaiting) return 'Ждём в MAX';
    if (this.maxLinked === false) return 'Открыть бота';
    return 'В мессенджер';
  }

  get smsHint(): string {
    if (this.smsSending) return 'Отправляем…';
    if (this.secondsLeft > 0) return `Через ${this.secondsLeft} с`;
    return this.smsSent ? 'Отправить ещё раз' : 'На ваш номер';
  }

  get zvonokHint(): string {
    if (this.zvonokSending) return 'Звоним…';
    if (this.zvonokSent) return 'Звонок заказан через Zvonok';
    return 'Авторизоваться через Zvonok';
  }

  private setChannelError(text: string): void {
    this.channelNotice = text;
    this.channelError = true;
  }


}
