import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {subGroup} from "../../../DTO/views/services/IViewSubGroups";
import {Record} from "../../../DTO/classes/records/record";
import {RecordService} from "../../../../services/record.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProfileDataService} from "../../services/profile-data.service";
import {IViewBusinessProfile} from "../../../DTO/views/business/IViewBussinessProfile";
import {fixedPointLine, fixedPointsOf, getAddressProfile, recordLocationText, serviceWorkLocationType} from "../../../../helpers/common/address";
import {NgbActiveModal, NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { RecordSuccessTelegramModalComponent } from '../record-success-telegram-modal/record-success-telegram-modal.component';
import {DatePipe, Location} from "@angular/common";
import {IViewRecordData} from "../../../DTO/views/records/IViewRecordData";
import {DomSanitizer} from "@angular/platform-browser";
import {IViewScheduleBA} from "../../../DTO/views/schedule/IViewScheduleBA";
import {RecordStatus} from "../../../DTO/enums/recordStatus";
import {ISendRecord} from "../../../DTO/requests/ISendRecord";
import {requestAction} from "../../../ngrx-store/notification/notification.action";
import {select, Store} from "@ngrx/store";

import {ScheduleService} from "../../../../services/schedule.service";
import {NotesService} from "src/app/profile-ba/notes/notes-events.service";
import {getTokenMainClient, selectProfileMainClient} from "../../../ngrx-store/mainClient/store.select";
import {getHours, getMinutes} from "../../../../helpers/common/timeHelpers";
import {PaymentMethodType} from "../../../DTO/enums/paymentMethodType";
import { finalize, map, Observable, Subscription, switchMap, tap } from 'rxjs';
import { getPrice as sumServicePrice, getPriceService, getPriceString } from 'src/helpers/common/price.helpers';
import { ErrorConfirmRecordComponent } from '../errorConfirmRecord/error-confirm-record.component';
import { BookingContactModalComponent } from '../booking-contact-modal/booking-contact-modal.component';
import { ProfileService } from 'src/services/profile.service';
import { WelcomeQuote } from 'src/app/DTO/views/promo/welcome-coupon';
import { WelcomeCouponService } from 'src/services/welcome-coupon.service';
import { PromoSeatsService } from 'src/services/promo-seats.service';
import { PromoSeatQuote } from 'src/app/DTO/views/promo/promo-seats';
import { GiveawaysService } from 'src/services/giveaways.service';
import { GiveawayLoad, GiveawayPrizeQuote } from 'src/app/DTO/views/giveaway/giveaway';
import { clearPrizeDraft, readPrizeDraft, savePrizeDraft } from 'src/helpers/giveaway';
import { promoTermsPath, seatsLeftText, ULTRASOUND_PROMO } from '../../helpers/promo-seats';
import { ModalRegisterComponent } from '../../../components/modals/register-profile/modal-register/modal-register.component';
import { formatAmount, formatRub, welcomeReasonText } from 'src/helpers/common/welcome-coupon';
import { MARY_LEGS_SERVICE_ID, maryLegsPayRub, maryLegsSaleRub } from '../../helpers/mary-legs-sale';
import { masterPromos, promoByLanding, PromoOffer, promoPriceRub, masterSaleRub } from '../../helpers/promo-terms';
import {
  MARY_SKIN_COUPON_RUB,
  MARY_SKIN_LIST_RUB,
  MARY_SKIN_SALE_RUB,
  MARY_SKIN_SERVICE_ID,
} from '../../helpers/mary-skinhale-sale';
import { v4 as uuidv4 } from 'uuid';
import { AnalyticsService } from 'src/services/analytics.service';
import { resolveAvatarUrl } from 'src/helpers/common/avatar1';
import { WorkLocationType } from '../../../DTO/enums/workLocationType';
import { UserType } from '../../../DTO/classes/profiles/profile-user.model';
import { IRecordLocation } from '../../../DTO/classes/records/recordLocation';
import { IWorkLocation } from '../../../DTO/views/IWorkLocation';
import { GroupService } from 'src/services/groupservice';
import { toHoursMinutesString } from 'src/helpers/dateUtils/dateUtils';
import { applyHourlyDuration, isHourly } from 'src/helpers/common/hourly';
import { catchError, forkJoin, of } from 'rxjs';
import { quoteDraftComment, readCellingsQuoteDraft } from '../../helpers/cellings-offer';
import {
  CalculatorHandoff,
  calculatorHandoffComment,
  clearCalculatorHandoff,
  readCalculatorHandoff,
} from '../../helpers/calculator-handoff';
import { clearVisitSource, readVisitSource, visitSourceComment } from '../../helpers/visit-source';
import {
  BOOKING_TIMEZONE,
  fromCalendarDateTime,
  toCalendarDate
} from '../../helpers/booking-date';
import { bookingSelectionKey } from '../../helpers/booking-storage';
import { BookingPrice, bookingPrice, bookingPrizeIssue, bookingPrizePrice, couponDiscount } from '../../helpers/booking-price';
import { BookingSuccessDetails, bookingSuccessDetails } from '../../helpers/booking-success';
import { ReviewRewardCoupon, ReviewRewardsQuote } from 'src/app/DTO/views/promo/review-rewards';
import { ReviewRewardsService } from 'src/services/review-rewards.service';

interface StoredBookingDraft {
  pointId?: string | null;
  version: 3;
  profileId: string;
  serviceId: string;
  date: string;
  time: string;
  timezone: string;
  dayId: string;
  start: string;
  duration?: number;
}



@Component({
  selector: 'app-confirm-record',
  templateUrl: './confirm-record.component.html',
  styleUrls: ['./confirm-record.component.scss'],
  providers: [RecordService,NgbActiveModal,ScheduleService]

})
export class ConfirmRecordComponent implements OnInit, OnDestroy {

  // ── Приветственный купон ────────────────────────────────────────────────
  // Суммы и право считает сервер (coupons/welcome/quote). Здесь только показ и флаг «применить».
  welcomeQuote: WelcomeQuote | null = null;
  /** Клиент может снять галочку и записаться без скидки. */
  applyWelcome = true;
  /** Причина, по которой сервер не применил скидку при отправке. */
  couponRefusal: string | null = null;
  private quoteKey = '';
  private quoteSub?: Subscription;
  quoteLoading = false;
  quoteError = '';
  private readonly sessionSubscriptions = new Subscription();
  rewardCoupons: ReviewRewardCoupon[] = [];
  selectedRewardIds: string[] = [];
  rewardQuote: ReviewRewardsQuote | null = null;
  rewardQuoteLoading = false;
  rewardQuoteError = '';
  private rewardProfileId: string | null = null;
  private rewardWalletSub?: Subscription;
  private rewardQuoteSub?: Subscription;

  get priceSummary(): BookingPrice {
    const price = this.prizeQuote?.status === 'available'
      ? bookingPrizePrice(this.prizeQuote, this.couponRefusal)
      : bookingPrice(this.chooseServices, this.welcomeQuote, this.promoQuote, this.applyWelcome, this.businessProfile?.link);
    price.notice = this.couponRefusal || this.promoRefusal || price.notice;
    if (this.rewardQuote) {
      price.payable = this.rewardQuote.clientPayableKopecks / 100;
      price.reviewRewardDiscount = this.rewardQuote.discountKopecks / 100;
      price.isFrom = false;
    }
    return price;
  }
  protected readonly formatRub = formatRub;
  protected readonly formatAmount = formatAmount;

  // ── Акция с местами ─────────────────────────────────────────────────────
  // Место, скидку и итог считает сервер (promos/seats/quote); null — к записи акция не относится.
  promoQuote: PromoSeatQuote | null = null;
  /** Сервер отказал в месте при отправке: показываем цену без акции, клиент подтверждает заново. */
  promoRefusal: string | null = null;
  private promoSub?: Subscription;
  private ordinaryUltrasound = false;
  private ordinaryProfilePromo = false;
  private get selectedPromoCampaign(): string | null {
    if (this.ordinaryUltrasound || this.ordinaryProfilePromo) return null;
    return this.activatedRoute.snapshot.queryParamMap.get('promoCampaign');
  }
  private get ultrasoundSelected(): boolean {
    return this.selectedPromoCampaign === ULTRASOUND_PROMO;
  }
  get ultrasoundFlow(): boolean {
    return !this.ordinaryUltrasound && !this.prizeAwardId && (this.ultrasoundSelected || !!this.promoQuote?.exclusive);
  }

  get ultrasoundUnavailable(): boolean {
    return this.ultrasoundFlow && !this.quoteLoading && !this.quoteError && !this.promoApplies;
  }

  get profilePromoUnavailable(): boolean {
    return !!this.selectedPromoCampaign && !this.ultrasoundSelected && !this.quoteLoading && !this.quoteError && !this.promoApplies;
  }

  get promoPhoneRequired(): boolean {
    return this.promoQuote?.status === 'login_required' && (this.ultrasoundFlow || !!this.promoQuote.requireVerifiedPhone);
  }

  chooseOrdinaryProfileBooking(): void {
    this.ordinaryProfilePromo = true;
    this.retryUltrasoundQuote();
  }

  get profilePromoRefusalText(): string {
    switch (this.promoQuote?.reason) {
      case 'promo_not_started': return 'Запись по акции ещё не открылась.';
      case 'promo_seats_exhausted': return 'Места по акции закончились.';
      case 'promo_already_used': return 'На этот номер телефона уже занято место.';
      case 'promo_ended': return 'Акция закончилась.';
      case 'promo_visit_too_early':
      case 'promo_visit_too_late': return 'Выберите дату визита в пределах срока акции.';
      case 'promo_single_service_required': return 'Выберите одну акционную услугу.';
      default: return this.promoRefusal ?? 'Запись по акции сейчас недоступна.';
    }
  }

  chooseOrdinaryUltrasound(): void {
    this.ordinaryUltrasound = true;
    this.retryUltrasoundQuote();
  }

  retryUltrasoundQuote(): void {
    this.quoteKey = '';
    this.refreshWelcomeQuote();
  }
  prizeAwardId: string | null = null;
  private prizeVersion = 0;
  private restoredPrizeServices: subGroup[] = [];
  private prizeRecordId: string | null = null;
  prizeQuote: GiveawayPrizeQuote | null = null;
  prizeBlocked = false;

  get promoApplies(): boolean {
    const q = this.promoQuote;
    return !!q && (q.status === 'available' || q.status === 'login_required') && q.promoDiscount > 0;
  }

  /** Итог с акцией. Снятый купон возвращается в цену: сервер считал её с купоном. */
  get promoTotal(): { list: number; pay: number } | null {
    const q = this.promoQuote;
    if (!q || !this.promoApplies) {
      return null;
    }
    const pay = q.payableAmount + (this.welcomeApplies ? 0 : q.couponDiscount);
    return { list: q.recordAmount, pay };
  }

  /** Расшифровка цены акции и ссылка на условия — на этом шаге обязательно. */
  get promoSeatsLine(): { path: string; text: string } | null {
    const q = this.promoQuote;
    const slug = (this.businessProfile?.link ?? '').trim();
    if (!q || !this.promoApplies || !slug || q.exclusive) {
      return null;
    }
    const coupon = this.welcomeApplies ? q.couponDiscount : 0;
    const parts = [`${formatRub(q.recordAmount)} − ${formatRub(q.promoDiscount)} (скидка OnWaves)`];
    if (coupon > 0) {
      parts.push(`− ${formatRub(coupon)} (купон)`);
    }
    return { path: promoTermsPath(slug), text: `${parts.join(' ')} = ${formatRub(this.promoTotal?.pay ?? 0)}` };
  }

  get promoSeatsText(): string | null {
    const q = this.promoQuote;
    return q && this.promoApplies ? seatsLeftText(q.seatsLeft, q.seatsLimit) : null;
  }

  /** Сервер сообщил, что скидка может быть применена (для гостя — после входа). */
  get welcomeOffered(): boolean {
    return couponDiscount(this.welcomeQuote) > 0;
  }
  get welcomeApplies(): boolean {
    return this.welcomeOffered && this.applyWelcome;
  }
  get welcomeDiscount(): number {
    return couponDiscount(this.welcomeQuote);
  }
  /** Подсказка, почему скидки нет (только понятные клиенту случаи). */
  get welcomeHint(): string | null {
    const q = this.welcomeQuote;
    if (!q || this.welcomeOffered) return null;
    return q.reason && q.couponStatus !== 'none' ? welcomeReasonText(q.reason) : null;
  }
  get isRecordView(): boolean {
    return !!this.recordId;
  }

  /**
   * Цену со скидкой показываем, только когда сервер подтвердил её именно для этой записи
   * и клиент не отказался от купона. Гостю (login_required) — нет: право ещё не закреплено,
   * и зачёркнутая цена обещала бы то, чего сервер пока не дал.
   */
  get showDiscountedTotal(): boolean {
    const quote = this.welcomeQuote;
    if (!this.welcomeApplies || !quote) {
      return false;
    }
    return quote.couponStatus === 'available' && quote.discountAmount > 0;
  }

  /**
   * Онлайн-запись шугаринга ног: 20% от прайса плюс купон, если сервер его дал.
   * Прайс в карточке услуги не меняется.
   */
  get legsOffer(): { list: number; pay: number; badge: string } | null {
    const chosen = this.chooseServices ?? [];
    const legs = chosen.filter(item => item.id === MARY_LEGS_SERVICE_ID && !item.price?.isRange);
    if (!legs.length) {
      return null;
    }
    const legsList = legs.reduce((sum, item) => sum + Number(item.price?.price || 0), 0);
    if (legsList <= 0) {
      return null;
    }
    const others = chosen.filter(item => item.id !== MARY_LEGS_SERVICE_ID);
    const [otherSum] = sumServicePrice(others);
    const list = legsList + otherSum;
    const coupon = this.welcomeApplies ? this.welcomeDiscount : 0;
    const pay = maryLegsPayRub(legsList, coupon) + otherSum;
    if (pay <= 0 || pay >= list) {
      return null;
    }
    return {
      list,
      pay,
      badge: coupon > 0 ? '−20% и купон' : '−20%',
    };
  }

  /** Первая SKINHALE в корзине по цене мастера 5 000. Повтор и курс эту ветку не открывают. */
  private get marySkinSaleInCart(): boolean {
    return (this.chooseServices ?? []).some(item =>
      item.id === MARY_SKIN_SERVICE_ID && !item.price?.isRange && Number(item.price?.price || 0) === MARY_SKIN_SALE_RUB);
  }

  /**
   * Скидка мастера уже в прайсе. Купон, если сервер его дал, снимается отдельно: 5 000 − 500 = 4 500.
   */
  get skinOffer(): { master: number; pay: number; coupon: number } | null {
    if (!this.marySkinSaleInCart) {
      return null;
    }
    const [sum] = sumServicePrice(this.chooseServices ?? []);
    if (sum <= 0) {
      return null;
    }
    const coupon = this.welcomeApplies ? MARY_SKIN_COUPON_RUB : 0;
    const pay = sum - coupon;
    if (pay <= 0) {
      return null;
    }
    return { master: sum, pay, coupon };
  }

  skinLine(service: { id?: string | null; price?: { price?: number | null; isRange?: boolean } | null }): string | null {
    if (service.id !== MARY_SKIN_SERVICE_ID || service.price?.isRange) {
      return null;
    }
    const price = Number(service.price?.price || 0);
    if (price !== MARY_SKIN_SALE_RUB) {
      return null;
    }
    return formatRub(MARY_SKIN_SALE_RUB);
  }

  readonly skinListText = formatRub(MARY_SKIN_LIST_RUB);

  /** Строка последнего шага: ссылка на условия и расшифровка той суммы, которую видит клиент. */
  get promoTermsLine(): { path: string; fragment: string; slug: string; text: string } | null {
    const slug = (this.businessProfile?.link ?? '').trim().toLowerCase();
    if (!masterPromos(slug)) {
      return null;
    }
    const chosen = this.chooseServices ?? [];
    const match = chosen
      .map(item => promoByLanding(slug, null, item.id))
      .find((offer): offer is PromoOffer => !!offer);
    if (!match) {
      return null;
    }
    const coupon = this.welcomeApplies ? match.couponRub : 0;
    const pay = promoPriceRub(match) - coupon;
    const parts = [`${formatRub(match.listRub)} − ${formatRub(masterSaleRub(match))}`];
    if (coupon > 0) {
      parts.push(`− ${formatRub(coupon)}`);
    }
    return {
      path: `/${slug}/akcii`,
      fragment: match.anchor,
      slug,
      text: `${parts.join(' ')} = ${formatRub(pay > 0 ? pay : 0)}`,
    };
  }

  trackPromoTerms(slug: string): void {
    this._analytics.trackPromoTerms(slug);
  }

  legsLine(service: { id?: string | null; price?: { price?: number | null; isRange?: boolean } | null }): string | null {
    if (service.id !== MARY_LEGS_SERVICE_ID || service.price?.isRange) {
      return null;
    }
    const list = Number(service.price?.price || 0);
    const sale = maryLegsSaleRub(list);
    if (sale <= 0) {
      return null;
    }
    return formatRub(list - sale);
  }

  /** Подпись у новой цены. Условие входа объясняет текст билета ниже, здесь — просто метка. */
  get totalBadgeText(): string {
    return this.welcomeQuote?.couponStatus === 'login_required' ? 'купон' : 'с купоном';
  }

  /** Заголовок купона: право клиента, без разговора о новой цене. */
  get welcomeTitle(): string | null {
    const amount = this.welcomeDiscount;
    return this.welcomeOffered && amount > 0
      ? `${this.welcomeQuote?.couponStatus === 'login_required' ? 'Возможен купон' : 'Вам доступен купон'} на ${formatRub(amount)}` : null;
  }

  /** Почему купон доступен: сумма записи и порог. Обе цифры — из расчёта сервера. */
  get welcomeNote(): string | null {
    const quote = this.welcomeQuote;
    if (!quote || !this.welcomeOffered) {
      return null;
    }
    // Отказался — не обещаем закрепление, но и не пугаем: право остаётся.
    if (!this.applyWelcome) {
      return 'Купон останется у вас — его можно применить к другой записи.';
    }
    // Порог называем, только когда он отличается от суммы записи: иначе строка
    // «запись на 7 000 ₽ подходит под условие — от 7 000 ₽» повторяет одно и то же.
    // У первой SKINHALE купон считается от 7 000, а в корзине уже цена мастера 5 000.
    if (this.marySkinSaleInCart) {
      const skinBase = `Купон считается от цены без акции — ${formatRub(MARY_SKIN_LIST_RUB)}.`;
      return quote.couponStatus === 'login_required'
        ? `${skinBase} После ввода телефона проверим право на купон. Он доступен для первой выполненной записи через OnWaves.`
        : `${skinBase} Купон закрепится за этой записью.`;
    }
    const amount = formatAmount(quote.originalAmount, quote.amountIsFrom);
    const showThreshold = !!quote.threshold && !quote.amountIsFrom && quote.originalAmount > quote.threshold;
    const base = showThreshold
      ? `Ваша запись на ${amount} подходит под условие — от ${formatRub(quote.threshold!)}.`
      : `Ваша запись ${quote.amountIsFrom ? '' : 'на '}${amount} подходит под условие купона.`;
    return quote.couponStatus === 'login_required'
      ? `${base} После ввода телефона проверим право на купон. Он доступен для первой выполненной записи через OnWaves.`
      : `${base} Купон закрепится за этой записью.`;
  }

  toggleWelcome(): void {
    this.applyWelcome = !this.applyWelcome;
    this.onToggleWelcome();
  }

  onToggleWelcome(): void {
    this._welcome.track(this.applyWelcome ? 'applied' : 'removed', this.welcomeQuote?.campaignCode);
    if (this.welcomeApplies && this.welcomeQuote?.policyId) this.selectedRewardIds = [];
    this.refreshRewardsQuote();
  }

  get rewardQuoteBlocksBooking(): boolean {
    return !!this.selectedRewardIds?.length && !this.rewardQuote;
  }

  toggleReward(couponId: string, selected: boolean): void {
    this.selectedRewardIds = selected
      ? [...new Set([...this.selectedRewardIds, couponId])]
      : this.selectedRewardIds.filter(id => id !== couponId);
    this.refreshRewardsQuote();
  }

  private loadRewardWallet(clientId: string | null): void {
    if (this.rewardProfileId === clientId) return;
    this.rewardProfileId = clientId;
    this.rewardWalletSub?.unsubscribe();
    this.selectedRewardIds = [];
    this.rewardCoupons = [];
    if (!clientId) return;
    this.rewardWalletSub = this._reviewRewards.mine().subscribe({
      next: wallet => this.rewardCoupons = wallet.items.filter(item => item.availableKopecks > 0),
      error: () => this.rewardCoupons = [],
    });
  }

  refreshRewardsQuote(): void {
    this.rewardQuoteSub?.unsubscribe();
    this.rewardQuote = null;
    this.rewardQuoteError = '';
    if (!this.selectedRewardIds?.length || this.prizeBlocked || this.quoteError) return;
    const masterId = this.getMasterId();
    const clientId = this.profile?.id;
    const serviceIds = this.chooseServices.map(service => service.id).filter((id): id is string => !!id);
    if (!masterId || !clientId || !serviceIds.length) return;
    this.rewardQuoteLoading = true;
    this.rewardQuoteSub = this._reviewRewards.quote(masterId, {
      clientId, serviceIds, daysOfScheduleId: this.dayId, rewardCouponIds: this.selectedRewardIds,
      usePromoSeat: !this.prizeAwardId && this.promoApplies,
      useWelcomeCoupon: !this.prizeAwardId && this.welcomeApplies,
      prizeAwardId: this.prizeAwardId,
    }).pipe(finalize(() => this.rewardQuoteLoading = false)).subscribe({
      next: result => this.rewardQuote = result.reviewRewards,
      error: error => {
        const reason = error?.error?.reason ?? error?.error?.data?.reason;
        this.rewardQuoteError = this.reviewRewardReason(reason);
      },
    });
  }

  clearRewards(): void {
    this.selectedRewardIds = [];
    this.refreshRewardsQuote();
  }

  private reviewRewardReason(reason?: string): string {
    if (reason === 'coupon_expired' || reason === 'coupon_already_reserved' || reason === 'coupon_used'
      || reason === 'coupon_unavailable') {
      return 'Один из купонов уже использован или его срок истёк. Снимите выбор и проверьте доступные купоны.';
    }
    if (reason === 'price_not_fixed') return 'Купоны за отзывы можно применить после расчёта точной стоимости.';
    return 'Не удалось подтвердить сумму с купонами. Пересчитайте её или снимите купоны.';
  }

  private onRewardQuoteChanged(reason?: string): void {
    if (reason === 'amount_changed') {
      this.retryBookingQuote();
      this.rewardQuoteError = 'Сумма изменилась. Проверьте новый расчёт перед подтверждением записи.';
      return;
    }
    this.rewardQuote = null;
    this.rewardQuoteError = this.reviewRewardReason(reason);
  }

  private isRewardConflict(reason?: string): boolean {
    return !!reason && ['amount_changed', 'price_not_fixed', 'coupon_expired', 'coupon_already_reserved',
      'coupon_used', 'coupon_unavailable', 'coupon_not_owned', 'invalid_review_coupons'].includes(reason);
  }

  /** Расчёт по выбранным услугам. Запрашиваем только при смене мастера/услуг/клиента. */
  private refreshWelcomeQuote(): void {
    if (this.recordId || typeof window === 'undefined') return;
    const masterId = this.getMasterId();
    const ids = this.chooseServices.map(s => s.id).filter((id): id is string => !!id);
    if (!masterId || !ids.length) return;
    const clientId = this._welcome.isLoggedIn ? (this.profile?.id ?? null) : null;
    const dayId = this.dayId;
    const explicitAward = this.activatedRoute.snapshot.queryParamMap.get('award');
    const key = `${masterId}|${ids.join(',')}|${this._welcome.isLoggedIn}|${clientId ?? ''}|${dayId ?? ''}|${explicitAward ?? ''}|${this.selectedPromoCampaign ?? ''}`;
    if (key === this.quoteKey) return;
    this.quoteKey = key;
    this.quoteSub?.unsubscribe();
    this.rewardQuoteSub?.unsubscribe();
    this.rewardQuote = null;
    this.rewardQuoteError = '';
    this.loadRewardWallet(this.profile?.userType === UserType.User ? clientId : null);
    this.quoteLoading = true;
    this.quoteError = '';
    this.welcomeQuote = null;
    this.promoQuote = null;
    this.prizeAwardId = null;
    this.prizeQuote = null;
    this.prizeRecordId = null;
    this.prizeBlocked = false;
    this.couponRefusal = null;
    const awardId$ = this.ultrasoundSelected || this.ordinaryUltrasound ? of(null)
      : explicitAward ? of(explicitAward) : this._giveaways.findBookingPrize(masterId, ids, clientId);
    this.quoteSub = awardId$.pipe(
      switchMap((awardId): Observable<unknown> => {
        if (!awardId) return this.loadOrdinaryQuote(masterId, ids, clientId, dayId);
        this.prizeAwardId = awardId;
        const draft = readPrizeDraft();
        this.prizeRecordId = draft?.awardId === awardId ? (draft.recordId ?? null) : null;
        return this._giveaways.prizeQuote(awardId, ids, clientId, dayId).pipe(tap(load => this.applyPrizeQuote(load)));
      }),
      catchError(() => {
        this.quoteError = 'Не удалось проверить стоимость записи и скидки. Попробуйте ещё раз.';
        return of(null);
      }),
      finalize(() => this.quoteLoading = false),
    ).subscribe({ complete: () => this.refreshRewardsQuote() });
  }

  private loadOrdinaryQuote(masterId: string, ids: string[], clientId: string | null, dayId: string | null | undefined): Observable<unknown> {
    const ultrasoundSelected = this.ultrasoundSelected;
    const campaign = this.selectedPromoCampaign;
    return forkJoin({
      welcome: campaign ? of(null) : this._welcome.quote(masterId, ids, clientId),
      promo: this.ordinaryProfilePromo ? of(null) : this._promoSeats.quoteForBooking(masterId, ids, clientId, dayId, campaign),
    }).pipe(tap(({ welcome, promo: response }) => {
      let promo = response;
      if (this.ordinaryUltrasound && response?.exclusive) promo = null;
      if (ultrasoundSelected && (!response?.exclusive || response.campaignCode !== ULTRASOUND_PROMO)) promo = null;
      if (campaign && response?.campaignCode !== campaign) promo = null;
      this.promoQuote = promo && promo.status !== 'none' ? promo : null;
      // Акция и входящий в неё купон должны относиться к одному ответу сервера.
      const q = promo && promo.status !== 'none' ? promo.coupon : welcome;
      this.welcomeQuote = q;
      if (this.welcomeApplies && q?.policyId) this.selectedRewardIds = [];
      this.couponRefusal = null;
      this.promoRefusal = null;
      if (q && (q.couponStatus === 'available' || q.couponStatus === 'login_required') && q.potentialDiscount > 0) {
        this._welcome.track('quote', q.campaignCode, q.discountAmount || q.potentialDiscount);
      }
    }));
  }

  getStatusConfirm(): any {
    if (this.record){
      if (this.record.status === RecordStatus.Created || this.record.status === RecordStatus.Pending){
        return true;
      }
    }
    return false;
  }

  getStrTime(): boolean {
    if (this.chooseServices.length > 0 && this.chooseServices.every(s => s.isTimeUnlimited)) {
      return false;
    }
    if (!this.record){
      return true;
    }
    return !!this.record.day;
  }

  today: Date = new Date();
  private unsubscribe$: Subscription|null = null;
  private restoreSubscription?: Subscription;
  schedules: IViewScheduleBA[] = [];
  isLoad = false;
  canceled: IViewScheduleBA[] = [];
  status: boolean = false;
  @Input() idBaPage: string | null = null;
  chooseServices: subGroup[] = [];
  dayChoose: Date|null = null;
  businessProfile: IViewBusinessProfile|null = null;
  dayId: string|null = null;
  message: string = '';
  IsRemandDay = false;
  IsRemandHours = false;
  profile: IViewBusinessProfile | null = null;
  record: IViewRecordData|null = null;
  recordId: string|null = null;
  remainingText = 150;
  /** Блокировка «Далее» (saveRecord) до ответа сервера */
  saveInProgress = false;
  protected readonly WorkLocationType = WorkLocationType;
  /** Адрес выезда (разъездная) по объекту записи — для режима редактирования. */
  protected readonly recordLocationText = recordLocationText;
  /** Адрес клиента для выездной услуги (поля RecordLocation). Обязателен, если бронь Mobile. */
  clientLocation = { city: '', street: '', house: '', apartment: '', comment: '' };
  isErrorClientAddress = false;
  isErrorMixedCharacter = false;
  /** Форматы работы мастера (грузит column-baprofile) — источник списка городов выезда. */
  masterWorkLocations: IWorkLocation[] = [];

  /** Города/районы, куда мастер выезжает (из его разъездной локации). */
  get mobileCities(): string[] {
    const mobile = this.masterWorkLocations.find(w => w.locationType === WorkLocationType.Mobile);
    return (mobile?.cities ?? []).filter(c => !!c && `${c}`.trim().length > 0);
  }

  /** Уникальные характеры выбранных услуг (без legacy null). */
  get bookingTypes(): WorkLocationType[] {
    return Array.from(new Set(
      this.chooseServices.map(s => serviceWorkLocationType(s)).filter((t): t is WorkLocationType => t != null)
    ));
  }
  /** Смешаны ли услуги разного характера (бэк такое отклоняет). */
  get isMixedCharacter(): boolean {
    return this.bookingTypes.length > 1;
  }
  /** Единый характер брони (null — legacy или смешанные). */
  get bookingCharacter(): WorkLocationType | null {
    return this.bookingTypes.length === 1 ? this.bookingTypes[0] : null;
  }
  get visitPlace(): string {
    const point = this.bookingPoint;
    if (point) return fixedPointLine(point);
    return this.businessProfile?.address ? getAddressProfile(this.businessProfile.address) : '';
  }

  private rememberPlaces(places: { code?: number; data?: unknown } | null): void {
    const data = places?.code === 200 ? places.data : null;
    const list = Array.isArray(data) ? data : (data ? [data] : []);
    this.masterWorkLocations = list as IWorkLocation[];
    this._profileData.transferWorkLocation(this.masterWorkLocations);
  }

  /** Точка «на месте»: из query, либо единственная точка профиля. */
  private get bookingPoint() {
    const points = fixedPointsOf(this.masterWorkLocations);
    const id = this.activatedRoute.snapshot.queryParamMap.get('point');
    if (id) return points.find(point => point.id === id) ?? null;
    return points.length === 1 ? points[0] : null;
  }

  /** Выездная бронь — нужен адрес клиента. Определяется характером услуги (workLocationType). */
  get isMobileBooking(): boolean {
    return this.bookingCharacter === WorkLocationType.Mobile;
  }
  /** Заполнены ли обязательные поля адреса выезда (город/улица/дом). */
  get isClientAddressValid(): boolean {
    const a = this.clientLocation;
    return !!(a.city.trim() && a.street.trim() && a.house.trim());
  }
  /** Блокировка «Подтвердить» / «Отменить» (confirmRecord) до ответа сервера */
  confirmInProgress = false;
  restoringDraft = false;
  constructor(private _api: RecordService,
              private _profileData: ProfileDataService,
              private _route: Router,
              private activatedRoute: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private location: Location,
              private store$: Store,
              private _profile: ProfileService,
              private _welcome: WelcomeCouponService,
              private _promoSeats: PromoSeatsService,
              private _giveaways: GiveawaysService,
              private modalService: NgbModal,
              private _events: NotesService,
              private _analytics: AnalyticsService,
              private groupService: GroupService,
              private scheduleService: ScheduleService,
              private _location: Location,
              private _reviewRewards: ReviewRewardsService) {

    let temp = this.location.getState();
    if ((temp as Object).hasOwnProperty('recordId')){
      this.recordId = (temp as any).recordId;
      this._api.getDataForRecord(this.recordId!).subscribe(result => {
        this.record = result;
        this.isLoad = true;
      
        if (this.record) {
          this.dayId = this.record.daysOfScheduleId;
          this.businessProfile = this.record.profile;
          this.dayChoose = this.record.day;
          this.chooseServices = this.record.services;
          this.profile = this.record.profile;
          if (this.record.comment) {
            this.message = this.record.comment;
          }
          let option = this.record.options;
          if (option){
            this.IsRemandDay = option.IsRemandDay;
            this.IsRemandHours = option.IsRemandHours
          }
        }
      });
    }else {
      this.sessionSubscriptions.add(this._profileData.sendDayId.subscribe(result => {
        this.dayId = result;
        this.refreshWelcomeQuote();
      }));
      this.unsubscribe$ = this._profileData.sendDate.subscribe(result =>
          this.dayChoose = result
      );
      this.unsubscribe$ = this._profileData.sendChooseServices.subscribe(result =>
      {
        this.setChooseServices(result);
      });
      this.unsubscribe$ = this._profileData.sendProfileBA.subscribe(result => {
          this.businessProfile = result;
          this.refreshWelcomeQuote();
      });
      // Форматы работы мастера — для списка городов выезда в форме адреса клиента.
      this._profileData.sendWorkLocation.subscribe(wl => this.masterWorkLocations = wl ?? []);
      this.sessionSubscriptions.add(this.store$.pipe(select(selectProfileMainClient)).subscribe(firstResult => {
        this.profile = firstResult;
        this.refreshWelcomeQuote();
         // Переходим к выполнению второго Observable
      }));
      // this.unsubscribe$ = this.store$.pipe(select(selectProfileMainClient))
      // .pipe((switchMap()=> {
      //     return  this.store$.pipe(select(getTokenMainClient))
      //   })).subscribe(
      //   result => {
      //     this.profile = result;
      //   }
      // );
    }

  }

  ngOnDestroy(): void {
    this.sessionSubscriptions.unsubscribe();
    this.unsubscribe$?.unsubscribe();
    this.restoreSubscription?.unsubscribe();
    this.quoteSub?.unsubscribe();
    this.promoSub?.unsubscribe();
    this.rewardWalletSub?.unsubscribe();
    this.rewardQuoteSub?.unsubscribe();
  }
  ngOnInit(): void {
    this._events.transferIsWorkDay(true);
    // Дата нужна только если есть хотя бы одна услуга с ограничением по времени.
    // Для онлайн/безлимитных услуг dayChoose/dayId легитимно отсутствуют — это НЕ повод
    // восстанавливать черновик и редиректить (иначе онлайн-запись выкидывает на страницу мастера).
    const needsDate = this.chooseServices.some(s => !s.isTimeUnlimited);
    const missingRequiredState = !this.chooseServices.length || (needsDate && (!this.dayChoose || !this.dayId));
    if (!this.recordId && missingRequiredState) {
      this.restoreBookingDraft();
    }
    this.refreshWelcomeQuote();
    this.prefillQuoteComment();
  }

  private prefillQuoteComment(): void {
    if (this.message) {
      return;
    }
    const extra = quoteDraftComment(readCellingsQuoteDraft());
    if (extra) {
      this.message = extra;
    }
  }

  private restoreServices(profileId: string, firstId: string): Observable<subGroup> {
    this.restoredPrizeServices = [];
    const raw = this.activatedRoute.snapshot.queryParamMap.get('services');
    const ids = this.activatedRoute.snapshot.queryParamMap.get('award') && raw ? [...new Set(raw.split(','))].slice(0, 20) : [];
    if (ids.length > 1 && ids.includes(firstId)) {
      return forkJoin(ids.map(id => this.groupService.getServiceById(profileId, id))).pipe(
        tap(services => this.restoredPrizeServices = services), map(services => services[0]),
      );
    }
    return this.groupService.getServiceById(profileId, firstId);
  }

  private restoreBookingDraft(): void {
    const serviceId = this.activatedRoute.snapshot.queryParamMap.get('serviceId');
    const profileLink = this.activatedRoute.snapshot.paramMap.get('id');
    if (!serviceId || !profileLink) {
      this.clearStoredDraft();
      this.redirectAfterRestoreFailure(serviceId);
      return;
    }

    const draft = this.readBookingDraft(serviceId);
    if (!draft) {
      // Безлимит приходит сюда без слота и без черновика календаря.
      this.hydrateUnlimitedService(profileLink, serviceId);
      return;
    }

    const date = fromCalendarDateTime(draft.date, draft.time)!;
    this.restoringDraft = true;
    this.restoreSubscription = this._profile.translateLink(profileLink).pipe(
      map(response => String(response.data ?? '')),
      switchMap(profileId => {
        if (!profileId || profileId !== draft.profileId) throw new Error('Booking profile mismatch');
        return forkJoin({
          profile: this._profile.getViewProfile(profileId),
          service: this.restoreServices(profileId, serviceId),
          places: this._profile.getWorkLocation(profileId).pipe(catchError(() => of(null))),
        });
      }),
      switchMap(({profile, service, places}) => {
        if (isHourly(service) && !applyHourlyDuration(service, draft.duration)) {
          throw new Error('Hourly duration is missing');
        }
        // Сверяем черновик той же ручкой, что рисует экран выбора времени: у старой не отсекался
        // лид-тайм, и черновик «через 10 минут» проходил проверку, хотя записаться на него уже нельзя.
        const requestDay = toCalendarDate(new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          0, 0, 0, 0
        ));
        return this.scheduleService.getFreeSlotDetailed(
          draft.profileId,
          this.restoredPrizeServices.length > 1 ? this.restoredPrizeServices.reduce((sum, item) => sum + (item.duration ?? 0), 0) : service.duration ?? 0,
          draft.dayId,
          requestDay,
          this.activatedRoute.snapshot.queryParamMap.get('point')
        ).pipe(map(response => {
          const isStillAvailable = response.slots.some(slot => toHoursMinutesString(String(slot.start)) === draft.start);
          if (!isStillAvailable) throw new Error('Stored booking slot is no longer available');
          return {profile, service, places};
        }));
      }),
      finalize(() => this.restoringDraft = false)
    ).subscribe({
      next: ({profile, service, places}) => {
        this.rememberPlaces(places);
        this.setChooseServices(this.restoredPrizeServices.length > 1 ? this.restoredPrizeServices : [service]);
        this.businessProfile = profile;
        this.dayChoose = date;
        this.dayId = draft.dayId;
        this._profileData.transferId(draft.profileId);
        this._profileData.transferProfileBA(profile);
        this._profileData.transferChooseService(this.chooseServices);
        this._profileData.transferDate(date);
        this._profileData.transferDayId(draft.dayId);
      },
      error: () => {
        this.clearStoredDraft(draft);
        this.redirectAfterRestoreFailure(serviceId);
      }
    });
  }

  private readBookingDraft(serviceId: string | null): StoredBookingDraft | null {
    if (!serviceId || typeof sessionStorage === 'undefined') return null;
    try {
      const draft = JSON.parse(sessionStorage.getItem('booking-draft') ?? 'null') as StoredBookingDraft | null;
      const date = draft?.date && draft?.time
        ? fromCalendarDateTime(draft.date, draft.time)
        : null;
      const valid = draft?.version === 3 && draft.serviceId === serviceId && !!draft.profileId &&
        (draft.pointId ?? null) === this.activatedRoute.snapshot.queryParamMap.get('point') &&
        draft.time === draft.start && draft.timezone === BOOKING_TIMEZONE &&
        !!draft.dayId && /^\d{2}:\d{2}$/.test(draft.start) && !!date &&
        date.getTime() >= Date.now() - 60_000;
      return valid ? draft : null;
    } catch {
      return null;
    }
  }

  private clearStoredDraft(draft?: StoredBookingDraft | null): void {
    if (typeof sessionStorage === 'undefined') return;
    sessionStorage.removeItem('booking-draft');
    if (draft) sessionStorage.removeItem(bookingSelectionKey(draft.profileId, draft.serviceId, draft.pointId));
  }

  private setChooseServices(services: subGroup[] | null | undefined): void {
    const unique = Array.from(
      new Map((services ?? []).map((service, index) => [service.id ?? `missing-id:${index}`, service])).values()
    );
    this.chooseServices = unique;
    this.duration = unique.reduce((sum, service) => sum + (service.duration ?? 0), 0);
    this.refreshWelcomeQuote();
  }

  /**
   * Услуга без ограничения по времени не оставляет booking-draft:
   * календарь пропускается. Поднимаем услугу по serviceId, иначе редирект
   * на choose-date снова покажет «недоступно».
   */
  private hydrateUnlimitedService(profileLink: string, serviceId: string): void {
    this.restoringDraft = true;
    this.restoreSubscription = this._profile.translateLink(profileLink).pipe(
      map(response => String(response.data ?? '')),
      switchMap(profileId => {
        if (!profileId) throw new Error('Profile was not found');
        return forkJoin({
          profile: this._profile.getViewProfile(profileId),
          service: this.restoreServices(profileId, serviceId),
          places: this._profile.getWorkLocation(profileId).pipe(catchError(() => of(null))),
        }).pipe(map(({profile, service, places}) => ({profile, service, profileId, places})));
      }),
      finalize(() => this.restoringDraft = false)
    ).subscribe({
      next: ({profile, service, profileId, places}) => {
        this.rememberPlaces(places);
        if (!service.isTimeUnlimited) {
          this.redirectAfterRestoreFailure(serviceId);
          return;
        }
        this.setChooseServices(this.restoredPrizeServices.length > 1 ? this.restoredPrizeServices : [service]);
        this.businessProfile = profile;
        this._profileData.transferId(profileId);
        this._profileData.transferProfileBA(profile);
        this._profileData.transferChooseService(this.chooseServices);
      },
      error: () => this.redirectAfterRestoreFailure(serviceId)
    });
  }

  private redirectAfterRestoreFailure(serviceId: string | null): void {
    if (serviceId) {
      this._route.navigate(['../choose-date'], {
        relativeTo: this.activatedRoute,
        queryParams: this.withPoint({ serviceId, restoreError: 1 }),
        replaceUrl: true
      });
      return;
    }
    this._route.navigate(['../'], {relativeTo: this.activatedRoute, replaceUrl: true});
  }

  protected readonly getPrice = getPriceString;
  protected readonly getPriceService = getPriceService;
  // async ngOnInit(): Promise<void> {
  //   this._events.transferIsWorkDay(true);
  // //   await this.getListSchedule();

  // }
  /** Id мастера (страница БА): из профиля или с инпута маршрута */
  private getMasterId(): string | null {
    return this.businessProfile?.id ?? this.idBaPage ?? null;
  }

  confirmRecord(status: RecordStatus) {
    if (this.confirmInProgress) {
      return;
    }
    const masterId = this.getMasterId();
    if (!masterId || !this.recordId) {
      return;
    }
    const send = { id: this.recordId, status } as ISendRecord;
    this.confirmInProgress = true;
    this.unsubscribe$ = this._api
      .confirmRecord(masterId, send)
      .pipe(finalize(() => (this.confirmInProgress = false)))
      .subscribe((res) => {
        if (res.code === 200) {
          this.store$.dispatch(requestAction({ request: masterId }));
          this._route.navigate(['/']);
        }
      });
  }

  /**
   * Возврат на публичную страницу мастера.
   * После clearBookingState() this.businessProfile может быть null — передавайте link/id из вызова.
   */
  /** Очистка локального состояния после успешного создания записи (201 / 202). */
  private resetStateAfterRecordCreated(): void {
    clearCalculatorHandoff();
    clearVisitSource();
    this.handoffCache = null;
    this._profileData.clearBookingState();
    this._events.clearRecordDraftState();
    this.dayId = null;
    this.dayChoose = null;
    this.chooseServices = [];
    this.message = '';
    this.duration = 0;
    this.price = 0;
    this.welcomeQuote = null;
    this.quoteKey = '';
    this.quoteError = '';
    this.couponRefusal = null;
    this.promoQuote = null;
    this.promoRefusal = null;
    this.prizeQuote = null;
    this.prizeAwardId = null;
    this.clearRewards();
    this.IsRemandDay = false;
    this.IsRemandHours = false;
    this.status = false;
    this.record = null;
    this.recordId = null;
    this.remainingText = 150;
  }

  goPage(masterLink?: string | null, masterId?: string | null): void {
    const link = masterLink ?? this.businessProfile?.link;
    const id = masterId ?? this.businessProfile?.id;
    if (link) {
      this._route.navigate(['/', link]);
    } else if (id) {
      this._route.navigate(['id/', id]);
    }
  }

  onConfirm() {
    if (this.saveInProgress || this.quoteLoading || this.quoteError || this.rewardQuoteBlocksBooking) {
      return;
    }
    if (this.ultrasoundUnavailable || this.profilePromoUnavailable) return;
    if (this.promoPhoneRequired) {
      const modal = this.modalService.open(ModalRegisterComponent, { centered: true });
      // Первое окно закрывается при переходе к PIN. Готовый вход меняет профиль в NgRx.
      void modal.result.then(() => { this.quoteKey = ''; }, () => {});
      return;
    }
    const masterId = this.getMasterId();
    if (!masterId) {
      return;
    }

    // Нельзя смешивать услуги разного характера в одной записи (бэк вернёт 400).
    this.isErrorMixedCharacter = false;
    if (this.isMixedCharacter) {
      this.isErrorMixedCharacter = true;
      return;
    }
    // Выездная услуга — адрес клиента обязателен (во всех сценариях записи).
    this.isErrorClientAddress = false;
    if (this.isMobileBooking && !this.isClientAddressValid) {
      this.isErrorClientAddress = true;
      return;
    }

    if (this.prizeBlocked) {
      return;
    }

    const record = {
      id: this.prizeRecordId ?? uuidv4(),
      daysOfScheduleId: this.dayId,
      isRemandDay: this.IsRemandDay,
      isRemandHours: this.IsRemandHours,
      start: this.dayChoose ? `${this.dayChoose.getHours()}:${this.dayChoose.getMinutes()}:00` : null,
      comment: this.recordComment(),
      services: this.chooseServices,
      clientId: this.profile?.id,
      serverTime: new Date().toLocaleString(),
      useWelcomeCoupon: this.prizeAwardId ? undefined : (this.welcomeApplies ? true : undefined),
      expectedCouponDiscount: this.prizeAwardId ? undefined : (this.welcomeApplies ? this.welcomeDiscount : undefined),
      expectedWelcomePolicyVersion: this.welcomeApplies ? this.welcomeQuote?.policyVersion : undefined,
      usePromoSeat: this.prizeAwardId ? undefined : (this.promoApplies ? true : undefined),
      promoCampaignCode: !this.prizeAwardId && this.promoApplies ? this.promoQuote?.campaignCode ?? undefined : undefined,
      expectedPromoDiscount: this.prizeAwardId ? undefined : (this.promoApplies ? this.promoQuote?.promoDiscount : undefined),
      prizeAwardId: this.prizeAwardId,
      expectedPrizeVersion: this.prizeAwardId ? this.prizeVersion : undefined,
      expectedPrizeQuoteVersion: this.prizeAwardId ? this.prizeQuote?.quoteVersion : undefined,
      expectedPayableAmount: this.prizeAwardId ? this.prizeQuote?.payableAmount
        : this.promoApplies && (this.promoQuote?.exclusive || this.promoQuote?.requireVerifiedPhone) ? this.promoQuote.payableAmount : undefined,
      reviewRewardCouponIds: this.rewardQuote?.discountKopecks ? this.selectedRewardIds : undefined,
      reviewRewardQuoteVersion: this.rewardQuote?.discountKopecks ? this.rewardQuote.version : undefined,
      location: this.buildLocation(),
    } as Record;
    if (this.prizeAwardId && record.id) {
      this.prizeRecordId = record.id;
      if (this.businessProfile?.link) {
        savePrizeDraft({ awardId: this.prizeAwardId, version: this.prizeVersion, recordId: record.id,
          masterSlug: this.businessProfile.link, serviceId: this.chooseServices.map(service => service.id).join(',') });
      }
    }

    if (!this.profile) {
      this.openBookingContactModal(masterId, record);
      return;
    }

    this.submitRecord(masterId, record);
  }

  /**
   * Локация брони: для выезда — адрес клиента; для «на месте»/«онлайн»/legacy — null
   * (бэк подставляет адрес мастера/ссылку сам).
   */
  private buildLocation(): IRecordLocation | null {
    if (this.isMobileBooking) {
      const a = this.clientLocation;
      return {
        locationType: WorkLocationType.Mobile,
        city: a.city.trim(),
        street: a.street.trim(),
        house: a.house.trim(),
        apartment: a.apartment.trim() || null,
        comment: a.comment.trim() || null,
      };
    }
    const point = this.bookingPoint;
    if (this.bookingCharacter === WorkLocationType.Fixed && point?.id) {
      return {
        locationType: WorkLocationType.Fixed,
        workLocationId: point.id,
        title: point.title ?? null,
        country: point.country ?? null,
        region: point.region ?? null,
        city: point.city ?? null,
        street: point.street ?? null,
        house: point.house ?? null,
        apartment: point.apartment ?? null,
      };
    }
    return null;
  }

  private withPoint(query: { [key: string]: string | number | undefined }): { [key: string]: string | number } {
    const next: { [key: string]: string | number } = {};
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && `${value}` !== '') next[key] = value;
    });
    const point = this.activatedRoute.snapshot.queryParamMap.get('point');
    if (point) next['point'] = point;
    const campaign = this.activatedRoute.snapshot.queryParamMap.get('promoCampaign');
    if (campaign) next['promoCampaign'] = campaign;
    const award = this.activatedRoute.snapshot.queryParamMap.get('award');
    if (award) {
      next['award'] = award;
      const services = this.activatedRoute.snapshot.queryParamMap.get('services');
      if (services) next['services'] = services;
    }
    return next;
  }

  /** Гость: контакты + лёгкая регистрация перед сохранением записи (BookingContactModalComponent). */
  private openBookingContactModal(masterId: string, record: Record): void {
    const masterLink = this.businessProfile?.link;
    const masterIdForNav = this.businessProfile?.id ?? masterId;
    const summaryTitle = this.chooseServices.map(service => service.name).join(', ');
    const summaryWhen = this.dayChoose
      ? new DatePipe('ru').transform(this.dayChoose, 'd MMMM yyyy, HH:mm') ?? ''
      : '';

    const modalRef = this.modalService.open(BookingContactModalComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
      windowClass: 'booking-success-dialog',
    });
    modalRef.componentInstance.masterId = masterId;
    modalRef.componentInstance.masterLink = this.businessProfile?.link;
    modalRef.componentInstance.serviceId = this.goalServiceId();
    modalRef.componentInstance.record = record;
    modalRef.componentInstance.summaryTitle = summaryTitle;
    modalRef.componentInstance.summaryWhen = summaryWhen;
    modalRef.componentInstance.successDetails = this.successDetailsFor(record);
    modalRef.componentInstance.priceSummary = this.priceSummary;
    modalRef.componentInstance.promoQuote = this.promoQuote;
    // Купон показываем и в последнем окне — но только если он действительно применится.
    modalRef.componentInstance.couponQuote = this.welcomeApplies ? this.welcomeQuote : null;
    modalRef.componentInstance.onCouponDropped = (reason: string, quote?: WelcomeQuote | null) => {
      this.applyGuestCouponDrop(reason, quote);
      modalRef.componentInstance.promoTotal = this.promoTotal;
      modalRef.componentInstance.priceSummary = this.priceSummary;
    };
    modalRef.componentInstance.onCouponChanged = (quote: WelcomeQuote) => {
      this.welcomeQuote = quote;
      // При изменении купона сохраняем скидку акции, обновляя только купонную часть.
      if (this.promoQuote) {
        this.promoQuote = { ...this.promoQuote, coupon: quote, couponDiscount: quote.discountAmount,
          payableAmount: quote.payableAmount - this.promoQuote.promoDiscount };
      }
      modalRef.componentInstance.priceSummary = this.priceSummary;
    };
    modalRef.componentInstance.promoTotal = this.promoTotal;
    modalRef.componentInstance.onPromoDropped = (result: { message?: string; data?: any }) => {
      this.onPromoRefused(result);
      modalRef.componentInstance.promoTotal = this.promoTotal;
      modalRef.componentInstance.priceSummary = this.priceSummary;
    };

    modalRef.result.then(
      () => {
        this.resetStateAfterRecordCreated();
        this.goPage(masterLink, masterIdForNav);
      },
      (reason) => {
        // «Изменить» — вернуть гостя к календарю с сохранённым выбором.
        // Крестик/бэкдроп (reason !== 'edit') — просто остаёмся на сводке.
        if (reason === 'edit') {
          this.goToCalendar();
        }
      }
    );
  }

  private goalServiceId(): string | undefined {
    return this.activatedRoute.snapshot.queryParamMap.get('serviceId')
      ?? this.chooseServices.find(service => !!service.id)?.id
      ?? undefined;
  }

  private successDetailsFor(record: Record): BookingSuccessDetails {
    const when = this.dayChoose ? new DatePipe('ru').transform(this.dayChoose, 'd MMMM yyyy, HH:mm') ?? '' : '';
    return bookingSuccessDetails(this.chooseServices.map(service => service.name).join(', '),
      this.businessProfile?.name ?? '', when, record.location, this.visitPlace, this.bookingCharacter);
  }

  /** Возврат к календарю (choose-date) с сохранением выбора: услуга — в query, дата/время — в sessionStorage. */
  private goToCalendar(): void {
    const serviceId = this.activatedRoute.snapshot.queryParamMap.get('serviceId')
      ?? this.chooseServices[0]?.id;
    const unlimited = this.chooseServices.length > 0
      && this.chooseServices.every(s => s.isTimeUnlimited);
    if (unlimited) {
      this._route.navigate(['../choose-service'], {
        relativeTo: this.activatedRoute,
        queryParams: serviceId ? this.withPoint({ serviceId, noAutoDate: 1 }) : undefined,
      });
      return;
    }
    if (serviceId) {
      this._route.navigate(['../choose-date'], {
        relativeTo: this.activatedRoute,
        queryParams: this.withPoint({ serviceId }),
      });
    } else {
      // Нет serviceId (например, вход по recordId) — безопасный откат назад.
      this.location.back();
    }
  }

  /** Авторизованный пользователь: сохранение записи и обработка 201/202/ошибки. */
  private submitRecord(masterId: string, record: Record): void {
    const option: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
    };
    const masterLink = this.businessProfile?.link;
    const masterIdForNav = this.businessProfile?.id ?? masterId;

    this.saveInProgress = true;
    this.unsubscribe$ = this._api
      .saveRecord(masterId, record)
      .pipe(finalize(() => (this.saveInProgress = false)))
      .subscribe({
        next: (result) => {
        if (record.reviewRewardCouponIds?.length && this.isRewardConflict(result.data?.reason)) {
          this.onRewardQuoteChanged(result.data.reason);
          return;
        }
        if (result.code === 409 && result.data?.reason && this.prizeAwardId) {
          this.onPrizeConflict(String(result.data.reason), result.message);
          return;
        }
        if (result.code === 409 && result.data?.couponReason) {
          this.onCouponRefused(result);
          return;
        }
        if (result.code === 409 && result.data?.promoReason) {
          this.onPromoRefused(result);
          return;
        }
        if (result.code === 201 || result.code === 202) {
          this._welcome.invalidateMine();
          clearPrizeDraft();
          const priceSummary = { ...this.priceSummary, pending: false, notice: null };
          const appliedRewards = result.data?.reviewRewards as ReviewRewardsQuote | undefined;
          if (appliedRewards) {
            priceSummary.payable = appliedRewards.clientPayableKopecks / 100;
            priceSummary.reviewRewardDiscount = appliedRewards.discountKopecks / 100;
          }
          const successDetails = this.successDetailsFor(record);
          // Конверсия: услуга заказана. add_record + client_contact, слаг мастера, не GUID.
          this._analytics.trackBooking(this.businessProfile?.link, this.goalServiceId());
          const applied = result.data?.coupon as WelcomeQuote | null | undefined;
          if (applied) {
            this._welcome.track('booked', applied.campaignCode, applied.discountAmount);
          }
          this.resetStateAfterRecordCreated();
          const afterModal = () => this.goPage(masterLink, masterIdForNav);

          if (result.code === 201) {
            const modalRef = this.modalService.open(ConfirmModalComponent, {
              ...option, centered: true, windowClass: 'booking-success-dialog',
            });
            modalRef.componentInstance.priceSummary = priceSummary;
            modalRef.componentInstance.successDetails = successDetails;
            modalRef.result.then(afterModal, afterModal);
          } else {
            const modalRef = this.modalService.open(RecordSuccessTelegramModalComponent, {
              ...option,
              centered: true,
              size: 'md',
              windowClass: 'booking-success-dialog',
            });
            modalRef.componentInstance.accountId = this.profile?.id ?? null;
            modalRef.componentInstance.priceSummary = priceSummary;
            modalRef.componentInstance.successDetails = successDetails;
            modalRef.result.then(afterModal, afterModal);
          }
        } else {
          const modalRef = this.modalService.open(ErrorConfirmRecordComponent, option);
          modalRef.result.then(() => {
            this.goPage();
          });
        }
      }, error: (err) => {
        const body = err?.error;
        const reason = body?.data?.reason ?? body?.reason;
        if (record.reviewRewardCouponIds?.length && this.isRewardConflict(reason)) {
          this.onRewardQuoteChanged(reason);
        } else if (this.prizeAwardId && body?.data?.reason) {
          this.onPrizeConflict(String(body.data.reason), body.message);
        } else if (err?.status === 409 && body?.data?.couponReason) {
          this.onCouponRefused(body);
        } else if (err?.status === 409 && body?.data?.promoReason) {
          this.onPromoRefused(body);
        } else if (this.prizeAwardId) {
          this.onPrizeConflict('', body?.message);
        } else {
          console.error('Не удалось сохранить запись', err);
        }
      } });
  }

  /**
   * Сервер не применил скидку и запись не создал. Показываем актуальный расчёт и причину:
   * при смене суммы клиент подтверждает новую, иначе скидка снимается и запись оформляется без неё.
   */
  private onCouponRefused(result: { message?: string; data?: any }): void {
    const reason = result.data?.couponReason as string;
    const previous = this.welcomeQuote;
    const quote = (result.data?.quote as WelcomeQuote | null | undefined) ?? (previous ? {
      ...previous, couponStatus: 'unavailable' as const, reason, discountAmount: 0, potentialDiscount: 0,
      payableAmount: previous.payableAmount + couponDiscount(previous),
    } : null);
    this._welcome.track('refused', quote?.campaignCode);
    if (quote) {
      this.welcomeQuote = quote;
      if (this.promoQuote) {
        const discount = quote.couponStatus === 'available' ? quote.discountAmount : 0;
        this.promoQuote = { ...this.promoQuote, coupon: quote, couponDiscount: discount,
          payableAmount: quote.payableAmount - this.promoQuote.promoDiscount };
      }
    }
    if (reason !== 'amount_changed') {
      this.applyWelcome = false;
    }
    this.couponRefusal = result.message || welcomeReasonText(reason);
    this.refreshRewardsQuote();
  }

  /**
   * Место по акции не досталось, запись не создана. Цена — по прайсу (с купоном, если он положен),
   * клиент видит её и подтверждает заново; молча цену не меняем.
   */
  private onPromoRefused(result: { message?: string; data?: any }): void {
    const quote = result.data?.promoQuote as PromoSeatQuote | null | undefined;
    if (quote?.coupon) {
      this.welcomeQuote = quote.coupon;
    }
    this.promoQuote = quote && (quote.exclusive || result.data?.promoReason === 'promo_amount_changed' ||
      (quote.requireVerifiedPhone && quote.status === 'unavailable')) ? quote : null;
    this.promoRefusal = result.message || 'Места по акции закончились. Цена — по прайсу мастера.';
    this.refreshRewardsQuote();
  }

  /**
   * Гость ввёл номер, а купон к этому телефону уже нельзя применить.
   * Снимаем скидку на экране подтверждения, чтобы цена совпала с окном контактов.
   */
  private applyGuestCouponDrop(reason: string, quote?: WelcomeQuote | null): void {
    const previousPrice = this.priceSummary;
    this.applyWelcome = false;
    const base = quote ?? this.welcomeQuote;
    if (base) {
      this.welcomeQuote = {
        ...base,
        couponStatus: 'unavailable',
        reason: null,
        discountAmount: 0,
        potentialDiscount: 0,
        payableAmount: quote?.payableAmount ?? base.payableAmount + previousPrice.coupon,
      };
    }
    this.couponRefusal = welcomeReasonText(reason);
  }
  // openPopUpModal() {
  //   // this.status = !this.status;
  //   const modalRef = this.modalService.open(ConfirmModalComponent);
  // }

  inBack() {
    this._location.back();
  }

  /**
   * Расчёт калькулятора, с которым клиент пришёл к этому мастеру. Пустой на записи
   * по recordId, к другому мастеру и после TTL.
   */
  get calculatorHandoff(): CalculatorHandoff | null {
    if (this.record || typeof sessionStorage === 'undefined') {
      return null;
    }
    const masterId = this.businessProfile?.id ?? null;
    if (this.handoffFor !== masterId) {
      this.handoffFor = masterId;
      this.handoffCache = readCalculatorHandoff(masterId);
    }
    return this.handoffCache;
  }
  private handoffFor: string | null | undefined = undefined;
  private handoffCache: CalculatorHandoff | null = null;

  /** Комментарий записи: поле на экране + расчёт калькулятора + город/площадь с легаси-формы потолков. */
  private recordComment(): string {
    const current = (this.message ?? '').trim();
    const source = visitSourceComment(readVisitSource());
    const extras = [
      calculatorHandoffComment(this.calculatorHandoff),
      quoteDraftComment(readCellingsQuoteDraft()),
    ].filter(extra => extra && !current.includes(extra));
    const body = [current, ...extras].filter(Boolean).join('\n');
    if (!source || body.includes(source)) {
      return body;
    }
    return [source, body].filter(Boolean).join('\n');
  }
  getAvatar(avatar?: string | null){
    return resolveAvatarUrl(avatar);
  }


  setAbout() {
    if (this.message) {
      if (this.message.length >= 150) {
        this.message.substring(0,149);
      }
      this.remainingText = 150 - this.message.length;
    }
  }

  protected readonly getAddressProfile = getAddressProfile;
  duration: number = 0;
  price: number = 0;
  protected readonly getMinutes = getMinutes;
  protected readonly getHours = getHours;

    checkPaymentMethods(type: PaymentMethodType) {
        return this.businessProfile?.paymentMethods?.includes(type);
    }

  protected readonly PaymentMethodType = PaymentMethodType;

  private onPrizeConflict(reason: string, message?: string | null): void {
    if (reason === 'slot_unavailable') {
      this.prizeBlocked = false;
      this.couponRefusal = 'Это время уже занято. Выберите другое.';
      return;
    }
    this.prizeBlocked = true;
    this.couponRefusal = message || 'Условия приза изменились. Обновите карточку и подтвердите запись ещё раз.';
    this.retryBookingQuote();
  }

  retryBookingQuote(): void {
    this.quoteKey = '';
    this.refreshWelcomeQuote();
  }

  private applyPrizeQuote(load: GiveawayLoad<GiveawayPrizeQuote>): void {
    this.prizeQuote = load.value;
    this.couponRefusal = bookingPrizeIssue(load);
    this.prizeBlocked = !!this.couponRefusal;
    if (load.value?.awardVersion) this.prizeVersion = load.value.awardVersion;
  }
}
