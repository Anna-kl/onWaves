import { Component, Input, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
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
import { getPrice } from '../../../../helpers/common/price.helpers';
import { PromoSeatQuote } from 'src/app/DTO/views/promo/promo-seats';
import { WelcomeQuote } from '../../../DTO/views/promo/welcome-coupon';
import { quoteDraftComment, readCellingsQuoteDraft } from '../../helpers/cellings-offer';
import { BookingPrice, bookingPrice, couponDiscount } from '../../helpers/booking-price';
import { BookingSuccessDetails, bookingSuccessDetails } from '../../helpers/booking-success';

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
  @Input() priceSummary: BookingPrice | null = null;
  @Input() successDetails: BookingSuccessDetails | null = null;
  get savedDetails(): BookingSuccessDetails {
    return this.successDetails ?? bookingSuccessDetails(this.summaryTitle, '', this.summaryWhen, this.record?.location);
  }
  @Input() promoQuote: PromoSeatQuote | null = null;
  @Input() onCouponChanged?: (quote: WelcomeQuote) => void;

  get displayedPrice(): BookingPrice {
    const price = this.priceSummary ?? bookingPrice(this.record?.services ?? [], this.couponQuote, this.promoQuote, !this.couponDropped, this.masterLink);
    return this.couponNotice ? { ...price, notice: null } : price;
  }
  /** Id профиля мастера (БА) для POST records/add-user/{id}. */
  @Input() masterId!: string;
  /** Слаг публичной страницы — в цель Метрики, не GUID и не телефон. */
  @Input() masterLink?: string | null;
  /** Услуга записи для параметра цели. */
  @Input() serviceId?: string | null;
  /** Запись без clientId — проставляется после лёгкой регистрации. */
  @Input() record!: Record;
  /** Текст блока «Ваш выбор»: перечень услуг. */
  @Input() summaryTitle = '';
  /** Текст блока «Ваш выбор»: дата и время записи. */
  @Input() summaryWhen = '';
  /** Расчёт купона с экрана подтверждения; null — купон не применяется. */
  private quoteValue: WelcomeQuote | null = null;
  /** Цена без скидки: её показываем, если сервер купон не применил. */
  private plainAmount: number | null = null;
  private plainIsFrom = false;
  /** Сервер отказал в купоне — следующая отправка идёт по полной цене. */
  couponDropped = false;
  /** Почему купона нет. Отдельно от ошибки сети: запись при этом можно подтвердить. */
  couponNotice: string | null = null;
  /**
   * Экран подтверждения за модалкой держит свою цену. Сообщаем ему, что купон снят,
   * иначе после закрытия окна гость снова увидит скидку.
   */
  @Input() onCouponDropped?: (reason: string, quote?: WelcomeQuote | null) => void;

  @Input()
  set couponQuote(value: WelcomeQuote | null) {
    this.quoteValue = value;
    this.rememberPlainPrice(value);
  }
  get couponQuote(): WelcomeQuote | null {
    return this.quoteValue;
  }

  /** Итог по акции с местами с экрана подтверждения; null — запись без акции. */
  @Input() promoTotal: { list: number; pay: number } | null = null;
  /** Сервер не дал место по акции: экран подтверждения пересчитывает цену и обновляет promoTotal. */
  @Input() onPromoDropped?: (result: IResponse) => void;

  get promoLine(): string | null {
    const promo = this.promoTotal;
    return promo ? `Акция OnWaves: к оплате ${formatRub(promo.pay)} вместо ${formatRub(promo.list)}` : null;
  }

  /** Строка про купон в сводке. Суммы пришли с сервера, здесь только показ. */
  get couponLine(): string | null {
    const quote = this.couponQuote;
    if (!quote || this.couponDropped || this.promoTotal) {
      return null;
    }
    const discount = couponDiscount(quote);
    if (discount <= 0) {
      return null;
    }
    return `${quote.couponStatus === 'login_required' ? 'Купон после проверки телефона' : 'Применён купон'}: −${formatRub(discount)} · к оплате `
      + formatAmount(quote.payableAmount, quote.amountIsFrom);
  }

  /** Цена, по которой гость запишется после отказа в купоне. */
  get priceLine(): string | null {
    if (!this.couponDropped || this.plainAmount == null || this.promoTotal) {
      return null;
    }
    return `К оплате ${formatAmount(this.plainAmount, this.plainIsFrom)}`;
  }

  get submitLabel(): string {
    if (this.errorMessage) {
      return 'Повторить';
    }
    if (this.couponDropped) {
      return 'Подтвердить без купона';
    }
    return 'Подтвердить запись';
  }

  step: 'form' | 'done' = 'form';
  submitting = false;
  errorMessage: string | null = null;
  registered = false;

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
          this._welcome.invalidateMine();
          this.priceSummary = { ...this.displayedPrice, pending: false, notice: null };
          this.step = 'done';
          this._analytics.trackBooking(this.masterLink, this.serviceId);
          const applied = result.data?.coupon as WelcomeQuote | null | undefined;
          if (applied) {
            this._welcome.track('booked', applied.campaignCode, applied.discountAmount);
          }
        } else if (result.data?.couponReason) {
          this.onCouponRefused(result);
        } else if (result.data?.promoReason) {
          this.onPromoRefused(result);
        } else {
          this.setError();
        }
      },
      error: (err: unknown) => {
        const refused = this.refusalFromHttp(err);
        if (refused?.data?.couponReason) {
          this.onCouponRefused(refused);
          return;
        }
        if (refused?.data?.promoReason) {
          this.onPromoRefused(refused);
          return;
        }
        this.setError();
      },
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
   * Сервер не применил купон и запись не создал.
   * Смена суммы — гость подтверждает новую скидку.
   * Купон уже использован и прочие отказы — сообщение и цена без купона, запись можно отправить сразу.
   */
  private onCouponRefused(result: IResponse): void {
    const reason = result.data?.couponReason as string;
    const quote = result.data?.quote as WelcomeQuote | null | undefined;
    this._welcome.track('refused', quote?.campaignCode);
    if (reason === 'amount_changed' && quote) {
      this.record.expectedCouponDiscount = quote.discountAmount;
      // Сводка должна показать новую сумму, а не ту, что клиент видел до отказа.
      this.couponQuote = quote;
      if (this.promoQuote) {
        this.promoQuote = { ...this.promoQuote, coupon: quote, couponDiscount: quote.discountAmount,
          payableAmount: quote.payableAmount - this.promoQuote.promoDiscount };
      }
      this.priceSummary = bookingPrice(this.record.services, quote, this.promoQuote, true, this.masterLink);
      this.onCouponChanged?.(quote);
      this.couponDropped = false;
      this.couponNotice = null;
      this.errorMessage = `Сумма скидки изменилась: теперь ${formatRub(quote.discountAmount)}. Нажмите «Повторить», чтобы подтвердить запись.`;
      return;
    }
    this.rememberPlainPrice(quote);
    this.record.useWelcomeCoupon = false;
    this.record.expectedCouponDiscount = null;
    this.couponQuote = null;
    this.couponDropped = true;
    this.errorMessage = null;
    this.couponNotice = welcomeReasonText(reason);
    if (this.priceSummary) {
      this.priceSummary = { ...this.priceSummary, payable: this.priceSummary.payable + this.priceSummary.coupon,
        coupon: 0, pending: false, notice: null };
    }
    this.onCouponDropped?.(reason, quote ?? null);
  }

  /**
   * Место по акции не досталось, запись не создана. Гость видит причину и новую цену
   * и подтверждает запись ещё раз — без акции или с новой суммой акции.
   */
  private onPromoRefused(result: IResponse): void {
    const quote = result.data?.promoQuote as PromoSeatQuote | null | undefined;
    const amountChanged = result.data?.promoReason === 'promo_amount_changed' && !!quote;
    this.record.usePromoSeat = amountChanged ? true : false;
    this.record.expectedPromoDiscount = amountChanged ? quote!.promoDiscount : null;
    this.promoTotal = null;
    this.promoQuote = amountChanged ? quote! : null;
    this.priceSummary = bookingPrice(this.record.services, quote?.coupon ?? this.couponQuote,
      amountChanged ? quote! : null, !!this.record.useWelcomeCoupon, this.masterLink);
    this.onPromoDropped?.(result);
    this.errorMessage = `${result.message || 'Места по акции закончились.'} Нажмите «Повторить», чтобы записаться по этой цене.`;
  }

  /** HTTP 409 с телом купона или акции — тот же отказ, что и code 409 внутри успешного конверта. */
  private refusalFromHttp(err: unknown): IResponse | null {
    if (!(err instanceof HttpErrorResponse)) {
      return null;
    }
    const body = err.error as IResponse | undefined;
    if (!body?.data?.couponReason && !body?.data?.promoReason) {
      return null;
    }
    if (err.status === 409 || body.code === 409) {
      return body;
    }
    return null;
  }

  /** Полная цена услуги. Берём её из расчёта сервера, иначе из выбранных услуг. */
  private rememberPlainPrice(quote?: WelcomeQuote | null): void {
    if (quote?.originalAmount != null && Number.isFinite(Number(quote.originalAmount))) {
      this.plainAmount = Number(quote.originalAmount);
      this.plainIsFrom = !!quote.amountIsFrom;
      return;
    }
    if (this.plainAmount != null || !this.record?.services?.length) {
      return;
    }
    const [sum] = getPrice(this.record.services);
    this.plainAmount = sum;
    this.plainIsFrom = this.record.services.some(service => service.price?.isRange);
  }

  private setError(): void {
    this.errorMessage = this.registered
      ? 'Запись не сохранилась. Попробуйте ещё раз.'
      : 'Не удалось оформить запись. Попробуйте ещё раз.';
  }
}
