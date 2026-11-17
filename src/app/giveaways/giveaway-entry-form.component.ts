import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { catchError, exhaustMap, firstValueFrom, fromEvent, interval, merge, of, startWith, Subscription, take, timeout } from 'rxjs';
import * as qrModule from 'qrcode-generator';
import { GiveawayCampaign } from '../DTO/views/giveaway/giveaway';
import { UserType } from '../DTO/classes/profiles/profile-user.model';
import { LoginService } from '../auth/login.service';
import { selectProfileMainClient } from '../ngrx-store/mainClient/store.select';
import { authBodyCode, ensureDeviceUuid, parseMaxLoginStart, parseMaxLoginStatus, parseSessionId, pickField } from '../../helpers/common/max-auth';
import { AuthServices } from '../components/modals/services/auth.service';
import { MaxLoginState } from '../DTO/views/auth/IMaxLogin';
import { IResponse } from '../DTO/classes/IResponse';
import { formatMsk } from '../../helpers/giveaway';
import { AnalyticsService } from '../../services/analytics.service';
import { GiveawayEntriesService, GiveawayEntry, GiveawayEntrySource, GiveawaySession } from '../../services/giveaway-entries.service';

const SESSION_ID = /^[\da-f]{8}(?:-[\da-f]{4}){3}-[\da-f]{12}$/i;

@Component({
  selector: 'app-giveaway-entry-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  providers: [AuthServices],
  templateUrl: './giveaway-entry-form.component.html',
  styleUrls: ['./giveaway-entry-form.component.scss'],
})
export class GiveawayEntryFormComponent implements OnInit {
  @Input({ required: true }) campaign!: GiveawayCampaign;
  @Input() open = false;
  busy = false;
  checking = false;
  phone = '';
  firstName = '';
  lastName = '';
  code = '';
  accepted = false;
  otpSession = '';
  otpChannel = 0;
  error = '';
  entry: GiveawayEntry | null = null;
  maxLink = '';
  maxQr = '';
  maxStatus = '';
  maxLinkOffer = false;
  private maxSession = '';
  private attemptExpiresAt = 0;
  private draftExpiresAt = 0;
  private poll?: Subscription;
  private attempt = 0;
  private attribution: GiveawayEntrySource = {};
  private seenForm = false;
  private alive = true;
  private readonly browser: boolean;
  readonly date = formatMsk;

  constructor(private api: GiveawayEntriesService, private auth: AuthServices, private login: LoginService, private cookies: CookieService,
    private route: ActivatedRoute, private router: Router, private store: Store, private analytics: AnalyticsService,
    private destroy: DestroyRef, @Inject(PLATFORM_ID) platform: object) {
    this.browser = isPlatformBrowser(platform);
    this.destroy.onDestroy(() => { this.alive = false; this.poll?.unsubscribe(); });
  }

  ngOnInit(): void {
    if (!this.browser) return;
    this.captureAttribution();
    this.restoreDraft();
    this.login.session.ended$.pipe(takeUntilDestroyed(this.destroy)).subscribe(() => {
      this.entry = null;
      this.resetAttempt();
      this.removeDraft();
      this.phone = this.code = this.otpSession = this.firstName = this.lastName = '';
      this.accepted = false;
    });
    if (this.open) this.showForm();
    if (this.api.token) void this.read();
  }

  showForm(): void {
    this.open = true;
    if (!this.seenForm && this.campaign.phase === 'active') {
      this.seenForm = true;
      this.track('giveaway_entry_open');
    }
  }

  async read(): Promise<void> {
    this.checking = true;
    const token = this.api.token;
    try {
      const own = await firstValueFrom(this.api.own(this.campaign.code).pipe(timeout(8000)));
      if (this.sameLogin(token)) this.showEntry(own);
    } catch (e) {
      if (e instanceof HttpErrorResponse && ![401, 403, 404].includes(e.status))
        this.error = 'Не удалось проверить сохранённую заявку. Попробуйте обновить страницу.';
    } finally { this.checking = false; }
  }

  private normalizedPhone(): string | null {
    const raw = this.phone.trim();
    const digits = raw.replace(/\D/g, '');
    const national = digits.length === 11 && /^[78]/.test(digits) ? digits.slice(1) : digits;
    if (!/^[+\d()\s-]+$/.test(raw) || (raw.includes('+') && (digits.length !== 11 || !raw.startsWith('+7') || raw.lastIndexOf('+') !== 0))
      || !/^[3-9]\d{9}$/.test(national)) {
      this.error = 'Укажите российский номер телефона.';
      return null;
    }
    return '7' + national;
  }

  private checkFields(): boolean {
    if (this.busy || !this.accepted || this.campaign.phase !== 'active') return false;
    if (this.firstName.trim()) return true;
    this.error = 'Укажите имя.';
    return false;
  }

  async sendCode(channel = 0): Promise<void> {
    if (!this.checkFields()) return;
    const phone = this.normalizedPhone();
    if (!phone) return;
    const attempt = ++this.attempt;
    this.poll?.unsubscribe();
    this.busy = true;
    this.error = '';
    try {
      const reply = await firstValueFrom(this.api.requestCode(phone, channel).pipe(timeout(15_000)));
      if (!this.current(attempt)) return;
      const previousMax = this.maxSession;
      if (!this.acceptCodeSession(reply, channel)) this.error = this.deliveryError(reply);
      else this.cancelMax(previousMax);
    } catch (e) { if (this.current(attempt)) this.error = this.deliveryError(e); }
    finally { this.finishRequest(attempt); }
  }

  async useMax(openBot = false): Promise<void> {
    if (!this.browser || !this.checkFields()) return;
    const phone = this.normalizedPhone();
    if (!phone) return;
    const attempt = ++this.attempt;
    this.poll?.unsubscribe();
    this.busy = true;
    this.error = '';
    this.maxLinkOffer = false;
    const uuid = ensureDeviceUuid(this.cookies);
    try {
      if (!openBot) {
        let reply: IResponse;
        try {
          reply = await firstValueFrom(this.auth.sendCodeToMax(phone, this.otpSession || undefined, uuid).pipe(timeout(15_000)));
        } catch (e) {
          if (!(e instanceof HttpErrorResponse) || ![409, 502].includes(authBodyCode(e.error, e.status))) throw e;
          reply = { ...e.error, code: authBodyCode(e.error, e.status) };
        }
        if (!this.current(attempt)) return;
        if (authBodyCode(reply) !== 409) {
          if (!this.acceptCodeSession(reply, 2)) {
            this.error = this.deliveryError(reply);
            this.maxLinkOffer = authBodyCode(reply) === 502;
          }
          return;
        }
      }
      const reply = await firstValueFrom(this.auth.startMaxLogin(phone, uuid).pipe(timeout(15_000)));
      if (!this.current(attempt)) return;
      const start = authBodyCode(reply) === 200 ? parseMaxLoginStart(reply) : null;
      const expires = this.deadline(start?.expiresAt);
      if (!start || !SESSION_ID.test(start.sessionId) || expires <= Date.now() || !this.setMaxLink(start.link)) {
        this.error = this.deliveryError(reply);
        return;
      }
      this.otpSession = this.code = '';
      this.maxSession = start.sessionId;
      this.attemptExpiresAt = expires;
      this.maxStatus = 'Подтвердите номер в MAX и вернитесь сюда.';
    } catch (e) { if (this.current(attempt)) this.error = this.deliveryError(e); }
    finally { this.finishRequest(attempt); }
  }

  async submit(): Promise<void> {
    if (!this.checkFields() || this.maxSession) return;
    const phone = this.normalizedPhone();
    if (!phone) return;
    const firstName = this.firstName.trim();
    const token = this.api.token;
    const verifyCode = !!this.otpSession;
    if (!verifyCode && !token) return this.sendCode();
    if (verifyCode && this.attemptExpiresAt && Date.now() >= this.attemptExpiresAt) {
      this.expireAttempt();
      return;
    }
    const attempt = ++this.attempt;
    this.busy = true;
    this.error = '';
    let requestCode = false;
    try {
      if (verifyCode) {
        const uuid = ensureDeviceUuid(this.cookies);
        const checked = await firstValueFrom(this.api.verify(this.otpSession, this.code, uuid, this.login.isProfileId() || null)
          .pipe(timeout(12_000)));
        if (!this.current(attempt)) return;
        if (checked.code === 204) { this.expireAttempt(); return; }
        if (checked.code !== 200 || !checked.data?.token) {
          this.error = checked.code === 409 ? 'Не удалось однозначно определить аккаунт. Обратитесь в поддержку.'
            : 'Код не подошёл или истёк. Проверьте его или запросите новый.';
          return;
        }
        let session = checked.data as GiveawaySession;
        if (!session.profileUserId)
          session = await firstValueFrom(this.api.openCabinet(this.campaign.code, session.token).pipe(timeout(12_000)));
        if (!this.current(attempt)) return;
        this.login.session.remember(session.token, session.profileUserId);
        this.login.isAutentificate$.next(true);
        const refresh = this.login.checkCookie(true);
        if (refresh) void firstValueFrom(refresh, { defaultValue: null });
        this.code = this.otpSession = '';
        this.attemptExpiresAt = 0;
        this.persistDraft();
        this.track('giveaway_entry_phone_verified');
      }
      await this.save(firstName, phone, attempt);
    } catch (e) {
      if (!this.current(attempt)) return;
      if (!verifyCode && e instanceof HttpErrorResponse &&
          ([401, 403].includes(e.status) || (e.status === 409 && e.error?.data?.reason === 'phone_mismatch'))) {
        requestCode = this.sameLogin(token);
      } else {
        this.error = this.message(e);
      }
    }
    finally { if (this.current(attempt)) this.busy = false; }
    if (requestCode) await this.sendCode();
  }

  changePhone(): void {
    this.cancelMax(this.maxSession);
    this.resetAttempt();
    this.phone = '';
    this.error = '';
    this.persistDraft();
  }

  cancel(): void {
    this.changePhone();
    this.firstName = this.lastName = '';
    this.accepted = this.open = false;
    this.removeDraft();
  }

  private current(attempt: number): boolean { return this.alive && this.attempt === attempt; }

  private cancelMax(session: string): void {
    if (this.browser && session) this.auth.cancelMaxLogin(session, ensureDeviceUuid(this.cookies))
      .pipe(take(1)).subscribe({ error: () => {} });
  }

  private finishRequest(attempt: number): void {
    if (!this.current(attempt)) return;
    this.busy = false;
    this.persistDraft();
    if (this.maxSession) this.pollMax();
  }

  private deadline(value: unknown): number {
    if (typeof value !== 'string' || !value) return 0;
    const parsed = Date.parse(/(?:Z|[+-]\d\d:\d\d)$/i.test(value) ? value : value + 'Z');
    return Number.isFinite(parsed) ? parsed : 0;
  }

  private acceptCodeSession(reply: IResponse, fallbackChannel: number): boolean {
    const payload = pickField(reply, 'data', 'Data');
    const id = parseSessionId(payload);
    if (authBodyCode(reply) !== 200 || !SESSION_ID.test(id)) return false;
    const channel = pickField<number>(payload, 'channel', 'Channel') ?? fallbackChannel;
    const expires = this.deadline(pickField(payload, 'expiresAt', 'ExpiresAt'));
    if (fallbackChannel === 2 && (channel !== 2 || expires <= Date.now())) return false;
    this.otpSession = id;
    this.otpChannel = channel;
    this.attemptExpiresAt = expires;
    this.code = this.maxSession = this.maxLink = this.maxQr = this.maxStatus = '';
    return true;
  }

  private setMaxLink(value: string): boolean {
    try {
      const url = new URL(value);
      if (url.protocol !== 'https:' || url.hostname !== 'max.ru' || url.username || url.password || url.port
          || !url.searchParams.get('start')) return false;
      if (this.maxLink === url.href) return true;
      const factory = (qrModule as typeof qrModule & { default?: typeof qrModule }).default ?? qrModule;
      const qr = factory(0, 'M');
      qr.addData(url.href);
      qr.make();
      this.maxLink = url.href;
      this.maxQr = qr.createDataURL(4, 12);
      return true;
    } catch { return false; }
  }

  async copyMaxLink(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.maxLink);
      this.maxStatus = 'Ссылка скопирована.';
    } catch { this.error = 'Не удалось скопировать ссылку. Откройте MAX кнопкой выше.'; }
  }

  private pollMax(): void {
    if (!this.browser || !this.maxSession) return;
    this.poll?.unsubscribe();
    const session = this.maxSession;
    const attempt = this.attempt;
    const uuid = ensureDeviceUuid(this.cookies);
    let lastCheck = 0;
    this.poll = merge(interval(2500), fromEvent(document, 'visibilitychange')).pipe(
      startWith(0),
      exhaustMap(() => {
        if (document.hidden || Date.now() - lastCheck < 2450) return of(undefined);
        lastCheck = Date.now();
        return this.auth.getMaxLoginStatus(session, uuid).pipe(timeout(8000), catchError(e =>
          of(e instanceof HttpErrorResponse && e.status === 404 ? { code: 404 } as IResponse : null)));
      }),
      takeUntilDestroyed(this.destroy),
    ).subscribe(reply => {
      if (!this.current(attempt) || reply === undefined) return;
      const status = parseMaxLoginStatus(reply);
      if (!status || (status.sessionId && status.sessionId !== session)) {
        if (Date.now() >= this.attemptExpiresAt) this.expireAttempt();
        else this.maxStatus = 'Не удалось проверить MAX. Продолжаем ждать ответа.';
        return;
      }
      if (status.state === MaxLoginState.CodeSent) {
        const expires = this.deadline(status.expiresAt);
        if (expires <= Date.now()) { this.expireAttempt(); return; }
        this.poll?.unsubscribe();
        this.otpSession = session;
        this.otpChannel = 2;
        this.attemptExpiresAt = expires;
        this.maxSession = this.maxLink = this.maxQr = this.maxStatus = '';
        this.persistDraft();
      } else if (status.state === MaxLoginState.Expired || status.state === MaxLoginState.Authorized) {
        this.expireAttempt();
        if (status.state === MaxLoginState.Authorized && this.api.token) void this.read();
      } else if (status.state === MaxLoginState.DeliveryFailed) {
        this.resetAttempt();
        this.error = 'MAX не подтвердил отправку кода. Выберите MAX ещё раз или запросите СМС.';
        this.persistDraft();
      } else {
        if (Date.now() >= this.attemptExpiresAt) { this.expireAttempt(); return; }
        if (status.link && !this.maxLink) this.setMaxLink(status.link);
        this.maxStatus = status.state === MaxLoginState.ContactRequested
          ? 'Ждём подтверждения номера в MAX.' : 'Откройте бота MAX, чтобы подтвердить номер.';
      }
    });
  }

  private expireAttempt(): void {
    this.resetAttempt();
    this.error = 'Время истекло. Получите новый код.';
    this.persistDraft();
  }

  private resetAttempt(): void {
    ++this.attempt;
    this.poll?.unsubscribe();
    this.busy = this.maxLinkOffer = false;
    this.code = this.otpSession = this.maxSession = this.maxLink = this.maxQr = this.maxStatus = '';
    this.attemptExpiresAt = 0;
  }

  private get draftKey(): string { return 'ow-giveaway-draft:' + this.campaign.code; }

  persistDraft(): void {
    if (!this.browser || !this.open || this.entry) return;
    if (this.draftExpiresAt <= Date.now()) this.draftExpiresAt = Date.now() + 15 * 60_000;
    try {
      sessionStorage.setItem(this.draftKey, JSON.stringify({
        expiresAt: this.draftExpiresAt, owner: this.login.isProfileId() || null,
        phone: this.phone, firstName: this.firstName, lastName: this.lastName, accepted: this.accepted,
        rulesVersion: this.campaign.rulesVersion, privacyVersion: this.campaign.privacyVersion,
        otpSession: this.otpSession, otpChannel: this.otpChannel, maxSession: this.maxSession,
        attemptExpiresAt: this.attemptExpiresAt,
      }));
    } catch { /* Storage can be disabled in embedded browsers. */ }
  }

  private restoreDraft(): void {
    try {
      const draft = JSON.parse(sessionStorage.getItem(this.draftKey) ?? 'null');
      if (!draft || draft.expiresAt <= Date.now() || draft.owner !== (this.login.isProfileId() || null)
          || this.campaign.phase !== 'active') { this.removeDraft(); return; }
      this.draftExpiresAt = draft.expiresAt;
      this.open = true;
      this.phone = draft.phone || '';
      this.firstName = draft.firstName || '';
      this.lastName = draft.lastName || '';
      this.accepted = draft.accepted === true && draft.rulesVersion === this.campaign.rulesVersion
        && draft.privacyVersion === this.campaign.privacyVersion;
      this.attemptExpiresAt = draft.attemptExpiresAt || 0;
      this.maxSession = SESSION_ID.test(draft.maxSession) ? draft.maxSession : '';
      if (this.maxSession) this.pollMax();
      else if (this.attemptExpiresAt > Date.now()) {
        this.otpSession = SESSION_ID.test(draft.otpSession) ? draft.otpSession : '';
        this.otpChannel = draft.otpChannel ?? 0;
      }
    } catch { this.removeDraft(); }
  }

  private removeDraft(): void {
    this.draftExpiresAt = 0;
    if (!this.browser) return;
    try { sessionStorage.removeItem(this.draftKey); } catch { /* Storage unavailable. */ }
  }

  private deliveryError(error: unknown): string {
    const response = error instanceof HttpErrorResponse ? error.error as IResponse : error as IResponse;
    const code = authBodyCode(response, error instanceof HttpErrorResponse ? error.status : undefined);
    if (code === 429 || code === 204) {
      const seconds = pickField<number>(pickField(response, 'data', 'Data'), 'retryAfterSeconds', 'RetryAfterSeconds')
        ?? (error instanceof HttpErrorResponse ? Number(error.headers.get('Retry-After')) : 0);
      return seconds > 0 ? `Повторите запрос через ${seconds} сек.` : 'Подождите перед повторным запросом кода.';
    }
    if (code === 502) return 'MAX не подтвердил отправку. Можно открыть бота или выбрать СМС.';
    return 'Не удалось получить код. Повторите попытку или выберите другой способ.';
  }

  cabinet(): void {
    this.store.select(selectProfileMainClient).pipe(take(1)).subscribe(profile => {
      const id = profile?.id || this.login.isProfileId();
      if (!id) return;
      void this.router.navigate(profile?.userType === UserType.Business ? ['/cabinet-ba'] : ['/page-user', id], { fragment: 'entries' });
    });
  }

  private async save(firstName: string, phone: string, attempt: number): Promise<void> {
    const token = this.api.token;
    try {
      const entry = await firstValueFrom(this.api.enter(this.campaign.code, {
        phone, firstName, lastName: this.lastName || undefined,
        rulesVersion: this.campaign.rulesVersion ?? 0, privacyVersion: this.campaign.privacyVersion ?? '',
        attribution: this.attribution,
      }).pipe(timeout(12_000)));
      if (this.current(attempt) && this.sameLogin(token)) {
        if (!entry.alreadyRegistered) this.track('giveaway_entry_saved');
        this.showEntry(entry);
      }
    } catch (e) {
      if (!this.current(attempt)) return;
      if (e instanceof HttpErrorResponse && e.status > 0 && e.status < 500) throw e;
      try {
        const entry = await firstValueFrom(this.api.own(this.campaign.code).pipe(timeout(8000)));
        if (this.current(attempt) && this.sameLogin(token)) this.showEntry(entry);
      } catch { throw new Error('Не удалось проверить результат. Повторите отправку, чтобы восстановить номер.'); }
    }
  }

  private showEntry(entry: GiveawayEntry): void {
    this.resetAttempt();
    this.removeDraft();
    this.firstName = this.lastName = this.phone = this.code = this.otpSession = '';
    this.entry = entry;
    this.track('giveaway_entry_view');
  }

  private captureAttribution(): void {
    const params = this.route.snapshot.queryParamMap;
    const clean = (name: string): string | undefined => {
      const value = params.get(name);
      return value && /^[a-z][a-z0-9_-]{0,63}$/i.test(value) && !/\d{10}/.test(value) ? value.toLowerCase() : undefined;
    };
    const point = params.get('entryPoint');
    const initial: GiveawayEntrySource = {
      source: clean('utm_source'), medium: clean('utm_medium'), campaign: clean('utm_campaign'), content: clean('utm_content'),
      entryPoint: point === 'home' || point === 'master' ? point : 'direct',
    };
    this.attribution = initial;
    try {
      const key = 'ow-giveaway-source:' + this.campaign.code;
      const previous = JSON.parse(sessionStorage.getItem(key) ?? 'null') as GiveawayEntrySource | null;
      // An untagged visit before submission does not erase the first known channel.
      if (previous && (previous.source || !initial.source)) this.attribution = previous;
      sessionStorage.setItem(key, JSON.stringify(this.attribution));
    } catch { /* Browser storage is optional. */ }
  }

  private sameLogin(token: string): boolean {
    return this.alive && this.login.session.sameSession(token, this.api.token);
  }

  private track(action: string): void {
    this.analytics.trackGiveaway(action, { campaignCode: this.campaign.code, placement: this.attribution.entryPoint, phase: this.campaign.phase });
  }

  private message(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 429) return 'Слишком много попыток. Подождите минуту.';
      if (error.status === 403) {
        this.changePhone();
        return 'Подтвердите номер телефона, чтобы участвовать.';
      }
      if (error.status >= 400 && error.status < 500 && typeof error.error?.message === 'string') return error.error.message;
    } else if (error instanceof Error && error.message.startsWith('Не удалось')) return error.message;
    return 'Не удалось завершить участие. Попробуйте ещё раз.';
  }
}
