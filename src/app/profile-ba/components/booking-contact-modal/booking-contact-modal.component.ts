import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize, Observable, switchMap, throwError } from 'rxjs';
import { Record } from '../../../DTO/classes/records/record';
import { IResponse } from '../../../DTO/classes/IResponse';
import { IViewAuthProfile } from '../../../DTO/views/profile/IViewAuthProfile';
import { AuthServices } from '../../../components/modals/services/auth.service';
import { RecordService } from '../../../../services/record.service';
import { QuickSessionService } from '../../../../services/quick-session.service';
import { AnalyticsService } from '../../../../services/analytics.service';
import { WelcomeCouponService } from '../../../../services/welcome-coupon.service';
import { formatAmount, formatRub, welcomeReasonText } from '../../../../helpers/common/welcome-coupon';
import { WelcomeQuote } from '../../../DTO/views/promo/welcome-coupon';
import { quoteDraftComment, readCellingsQuoteDraft } from '../../helpers/cellings-offer';

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
export class BookingContactModalComponent implements OnInit {
  /** Id профиля мастера (БА) для POST records/add-user/{id}. */
  @Input() masterId!: string;
  /** Запись без clientId — проставляется после лёгкой регистрации. */
  @Input() record!: Record;
  /** Текст блока «Ваш выбор»: перечень услуг. */
  @Input() summaryTitle = '';
  /** Текст блока «Ваш выбор»: дата и время записи. */
  @Input() summaryWhen = '';
  /** Расчёт купона с экрана подтверждения; null — купон не применяется. */
  @Input() couponQuote: WelcomeQuote | null = null;

  /** Строка про купон в сводке. Суммы пришли с сервера, здесь только показ. */
  get couponLine(): string | null {
    const quote = this.couponQuote;
    if (!quote) {
      return null;
    }
    const discount = quote.couponStatus === 'available' ? quote.discountAmount : quote.potentialDiscount;
    if (discount <= 0) {
      return null;
    }
    return `Купон будет применён: −${formatRub(discount)} · к оплате `
      + formatAmount(quote.payableAmount, quote.amountIsFrom);
  }

  step: 'form' | 'done' = 'form';
  submitting = false;
  errorMessage: string | null = null;
  private registered = false;

  name = '';
  phone = '';
  nameTouched = false;
  phoneTouched = false;
  submitAttempted = false;
  agree = true;
  notifyConsent = true;

  constructor(
    public activeModal: NgbActiveModal,
    private _auth: AuthServices,
    private _records: RecordService,
    private _session: QuickSessionService,
    private _analytics: AnalyticsService,
    private _welcome: WelcomeCouponService,
  ) {}

  ngOnInit(): void {
    const draft = readCellingsQuoteDraft();
    if (!draft) {
      return;
    }
    if (draft.name) {
      this.name = draft.name;
    }
    if (draft.phone) {
      this.phone = draft.phone;
    }
    const extra = quoteDraftComment(draft);
    if (extra && this.record) {
      this.record.comment = [this.record.comment, extra].filter(Boolean).join('\n');
    }
  }

  get isFormValid(): boolean {
    return !this.nameError && !this.phoneError && this.agree;
  }

  get nameError(): string | null {
    const value = this.name.trim();
    const letters = value.match(/[A-Za-zА-Яа-яЁё]/g)?.length ?? 0;
    const validCharactersAndSeparators = /^[A-Za-zА-Яа-яЁё]+(?:[ -][A-Za-zА-Яа-яЁё]+)*$/.test(value);
    return letters >= 2 && validCharactersAndSeparators
      ? null
      : 'Введите минимум две буквы. Допустимы пробел и дефис.';
  }

  get phoneError(): string | null {
    return QuickSessionService.normalizePhone(this.phone)
      ? null
      : 'Введите корректный российский номер телефона.';
  }

  submit(): void {
    this.submitAttempted = true;
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
          // Конверсия: услуга заказана (гость). Цель Метрики add_record.
          this._analytics.trackEvent('booking', 'add_record', this.masterId);
          const applied = result.data?.coupon as WelcomeQuote | null | undefined;
          if (applied) {
            this._welcome.track('booked', applied.campaignCode, applied.discountAmount);
          }
        } else if (result.code === 409 && result.data?.couponReason) {
          this.onCouponRefused(result);
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

  /**
   * «Изменить»: закрываем форму и просим opener вернуть гостя к календарю,
   * сохранив текущий выбор (услуга + дата/время). Отличаем от простого закрытия
   * причиной 'edit' в reject-хендлере modalRef.result.
   */
  edit(): void {
    this.activeModal.dismiss('edit');
  }

  finish(): void {
    this.activeModal.close();
  }

  private registerAndSaveRecord(): Observable<IResponse> {
    const phone = QuickSessionService.normalizePhone(this.phone)!;
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

  /** Сессия гостя — как при входе через ModalEnterDataComponent; запись получает clientId. */
  private applyAuth(auth: IViewAuthProfile, phone: string): void {
    this._session.apply(auth.token, auth.profileUserId, phone, this.notifyConsent);
    if (auth.profileUserId) {
      this.record.clientId = auth.profileUserId;
    }
  }

  /**
   * Сервер не применил купон и запись не создал. Ничего не гадаем: показываем причину сервера
   * и по «Повторить» отправляем запись без скидки (или с новой суммой, если она изменилась).
   */
  private onCouponRefused(result: IResponse): void {
    const reason = result.data?.couponReason as string;
    const quote = result.data?.quote as WelcomeQuote | null | undefined;
    this._welcome.track('refused', quote?.campaignCode);
    if (reason === 'amount_changed' && quote) {
      this.record.expectedCouponDiscount = quote.discountAmount;
      // Сводка должна показать новую сумму, а не ту, что клиент видел до отказа.
      this.couponQuote = quote;
      this.errorMessage = `Сумма скидки изменилась: теперь ${formatRub(quote.discountAmount)}. Нажмите «Повторить», чтобы подтвердить запись.`;
      return;
    }
    this.record.useWelcomeCoupon = false;
    this.record.expectedCouponDiscount = null;
    // Купон не применится — убираем обещание из сводки, иначе оно спорит с текстом ошибки.
    this.couponQuote = null;
    this.errorMessage = `${welcomeReasonText(reason)} Нажмите «Повторить», чтобы записаться без скидки.`;
  }

  private setError(): void {
    this.errorMessage = this.registered
      ? 'Запись не сохранилась. Попробуйте ещё раз.'
      : 'Не удалось оформить запись. Попробуйте ещё раз.';
  }
}
