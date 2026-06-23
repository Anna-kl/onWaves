import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { finalize, Observable, switchMap, throwError } from 'rxjs';
import { Record } from '../../../DTO/classes/records/record';
import { IResponse } from '../../../DTO/classes/IResponse';
import { IViewAuthProfile } from '../../../DTO/views/profile/IViewAuthProfile';
import { AuthServices } from '../../../components/modals/services/auth.service';
import { RecordService } from '../../../../services/record.service';
import { ConsentService } from '../../../../services/consent.service';
import { LoginService } from '../../../auth/login.service';

/**
 * Финальный шаг записи для неавторизованного гостя: имя + телефон, лёгкая
 * регистрация без SMS-кода и сохранение записи, оформленные одной модалкой.
 */
@Component({
  selector: 'app-booking-contact-modal',
  templateUrl: './booking-contact-modal.component.html',
  styleUrls: ['./booking-contact-modal.component.scss'],
  providers: [AuthServices, RecordService],
})
export class BookingContactModalComponent {
  /** Id профиля мастера (БА) для POST records/add-user/{id}. */
  @Input() masterId!: string;
  /** Запись без clientId — проставляется после лёгкой регистрации. */
  @Input() record!: Record;
  /** Текст блока «Ваш выбор»: перечень услуг. */
  @Input() summaryTitle = '';
  /** Текст блока «Ваш выбор»: дата и время записи. */
  @Input() summaryWhen = '';

  step: 'form' | 'done' = 'form';
  submitting = false;
  errorMessage: string | null = null;
  private registered = false;

  name = '';
  phone = '';
  agree = true;
  notifyConsent = true;

  private consentTextVersion = '';

  constructor(
    public activeModal: NgbActiveModal,
    private _auth: AuthServices,
    private _records: RecordService,
    private _consent: ConsentService,
    private _cookie: CookieService,
    private _login: LoginService,
  ) {
    this._consent.getTextVersions().subscribe(versions => {
      this.consentTextVersion = versions?.[0] ?? '';
    });
  }

  get isFormValid(): boolean {
    const digits = this.phone.replace(/\D/g, '');
    return this.name.trim().length >= 2 && digits.length === 10 && this.agree;
  }

  submit(): void {
    if (!this.isFormValid || this.submitting) {
      return;
    }
    this.errorMessage = null;
    this.submitting = true;

    const request$ = this.registered
      ? this._records.saveRecord(this.masterId, this.record)
      : this.registerAndSaveRecord();

    request$.pipe(finalize(() => (this.submitting = false))).subscribe({
      next: result => {
        if (result.code === 201 || result.code === 202) {
          this.step = 'done';
        } else {
          this.setError();
        }
      },
      error: () => this.setError(),
    });
  }

  retry(): void {
    this.submit();
  }

  close(): void {
    this.activeModal.dismiss();
  }

  finish(): void {
    this.activeModal.close();
  }

  private registerAndSaveRecord(): Observable<IResponse> {
    let digits = this.phone.replace(/\D/g, '');
    if (digits.length === 11 && (digits[0] === '7' || digits[0] === '8')) {
      digits = digits.substring(1);
    }
    const phone = `7${digits}`;
    return this._auth.quickRegister({ phone, name: this.name.trim() }).pipe(
      switchMap(result => {
        if (result.code !== 200 && result.code !== 201) {
          return throwError(() => new Error('quick-register failed'));
        }
        this.applyAuth(result.data as IViewAuthProfile, phone);
        this.registered = true;
        return this._records.saveRecord(this.masterId, this.record);
      })
    );
  }

  /** Кладём куки сессии и подтягиваем профиль/стор — как при входе через ModalEnterDataComponent. */
  private applyAuth(auth: IViewAuthProfile, phone: string): void {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 365);
    this._cookie.set('auth-token-ocpio', auth.token, expiry, '/');
    if (auth.profileUserId) {
      this._cookie.set('profileId-ocpio', auth.profileUserId, expiry, '/');
      this.record.clientId = auth.profileUserId;
    }

    if (this.notifyConsent && this.consentTextVersion) {
      this._consent.sendConsentBulk({
        profileUserId: auth.profileUserId ?? null,
        phone,
        channels: null,
        isGranted: true,
        consentTextVersion: this.consentTextVersion,
        source: 'registration',
      }).subscribe();
    }

    this._login.isAutentificate$.next(true);
    this._login.updateProfileUA();
  }

  private setError(): void {
    this.errorMessage = this.registered
      ? 'Запись не сохранилась. Попробуйте ещё раз.'
      : 'Не удалось оформить запись. Попробуйте ещё раз.';
  }
}
