import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CardDetailModalComponent } from '../../../common/modals/card-detail-modal/card-detail-modal.component';
import { LandingTemplateType } from '../../../DTO/enums/landingTemplateType';
import { PromoActionKind } from '../../../DTO/enums/promoActionKind';
import { PromoActionRole } from '../../../DTO/enums/promoActionRole';
import { PromoMediaKind } from '../../../DTO/enums/promoMediaKind';
import { ILandingOffer } from '../../../DTO/views/landing/ILandingOffer';
import { IPromoAction } from '../../../DTO/views/landing/IPromoAction';
import { IPromoMedia } from '../../../DTO/views/landing/IPromoMedia';
import {
  calcDisclaimer,
  coverMedia,
  extraMedia,
  formatValidTo,
  offerActions,
  offerBadge,
  offerHasCalculator,
  offerHeaderChips,
  offerTemplateType,
} from '../../helpers/promo-offer';
import { CELLINGS_CALC_BUTTON, CELLINGS_HERO_H1, CELLINGS_HERO_LEAD } from '../../helpers/cellings-offer';
import { AnalyticsService } from 'src/services/analytics.service';
import { PromoPriceView, PromoSeatCard, organizerLine, promoSeatBenefits, promoSeatLead, seatsLeftText } from '../../helpers/promo-seats';
import { BenefitIconType } from '../../../DTO/enums/benefitIconType';
import { PromoSeatState, PromoSeatTerms } from '../../../DTO/views/promo/promo-seats';
import { formatRub } from 'src/helpers/common/welcome-coupon';
import { promoMoscowDate, promoPeriodText, promoStatusNotice } from '../../helpers/promo-seat-terms-text';
import { profilePromoServiceName, profilePromoShortNote } from '../../helpers/profile-promo-presentation';
import { ruPhoneOrNull } from 'src/helpers/common/phone';
import {
  PromoOffer,
  onlinePayRub,
  promoByLanding,
  promoPriceRub,
} from '../../helpers/promo-terms';

@Component({
  selector: 'app-landing-offer-card',
  templateUrl: './landing-offer-card.component.html',
  styleUrls: ['./landing-offer-card.component.scss']
})
export class LandingOfferCardComponent implements OnDestroy {
  constructor(private analytics: AnalyticsService, private modalService: NgbModal) {}
  private videoModal?: NgbModalRef;

  ngOnDestroy(): void {
    this.videoModal?.dismiss();
  }

  openVideo(media: IPromoMedia): void {
    if (this.videoModal || media.kind !== PromoMediaKind.Video || !media.url) return;
    const modal = this.modalService.open(CardDetailModalComponent, {
      centered: true,
      windowClass: 'card-detail-modal card-detail-modal--video',
      ariaLabelledBy: 'cdm-viewer-title',
    });
    this.videoModal = modal;
    const viewer: CardDetailModalComponent = modal.componentInstance;
    viewer.viewerLabel = 'Видео акции';
    viewer.card = {
      id: this.offer.id ?? '', albumId: '', name: this.offer.title || '',
      description: this.shownLead, caption: this.offer.title || null,
      imageUrl: media.url, mediaUrl: media.url, thumbUrl: media.posterUrl || undefined,
      previewUrl: media.posterUrl || null, isVideo: true,
    };
    viewer.canBook = false;
    // Секция акции уже убирает повторные старты одного URL, включая встроенный просмотр.
    const started = viewer.videoStarted.subscribe(() => this.videoStart.emit(media.url));
    const release = () => {
      started.unsubscribe();
      if (this.videoModal === modal) this.videoModal = undefined;
    };
    void modal.result.then(release, release);
  }
  @Input() offer!: ILandingOffer;
  @Input() promoBadgeText?: string;
  @Input() templateType: LandingTemplateType | null = null;
  @Input() priceText: string | null = null;
  /** Услуга, к которой относится priceText. Без неё сумма не привязана к товару. */
  @Input() priceServiceName: string | null = null;
  /** Превью в кабинете: кнопки видны, клик никуда не ведёт. */
  @Input() preview = false;
  @Input() bookingEnabled = true;
  @Input() contactPhone: string | null = null;
  /** Первый экран /cellings: фиксированный h1, не title акции. */
  @Input() cellingsHero = false;
  @Input() citiesLine: string | null = null;
  /** Ссылка «Условия акции» под ценой. Путь и якорь услуги. */
  @Input() termsPath: string | null = null;
  @Input() termsFragment: string | null = null;
  @Input() termsMaster: string | null = null;
  /** Акция с местами: счётчик, подпись цены, организатор. null — карточка не из такой акции. */
  @Input() promoSeats: PromoSeatCard | null = null;
  /** Суммы quote. null — расчёта ещё нет или акции на этой услуге нет. */
  @Input() promoPrice: PromoPriceView | null = null;
  @Input() promoPriceLoading = false;
  @Input() promoPriceError = false;
  /** Полные условия акции с местами. Раскрываются плашкой на карточке. */
  @Input() promoTerms: PromoSeatTerms | null = null;
  @Input() profileCampaign: PromoSeatState | null = null;
  @Input() profileCampaignPending = false;
  @Input() profileCampaignError = false;
  @Output() profileServiceClick = new EventEmitter<string>();
  readonly promoMoscowDate = promoMoscowDate;
  readonly profilePromoShortNote = profilePromoShortNote;
  readonly profilePromoServiceName = profilePromoServiceName;
  get profileCampaignStatus(): string {
    const state = this.profileCampaign;
    if (this.profileCampaignError) return 'Наличие мест сейчас не подтверждено';
    if (!state) return '';
    if (state.closedReason === 'not_started') return `Старт ${promoMoscowDate(state.startsAt, false)}`;
    if (state.closedReason === 'seats_exhausted') return 'Места закончились';
    if (state.closedReason === 'ended') return 'Акция завершена';
    if (state.status !== 'open') return 'Запись по акции недоступна';
    return `Свободных мест: ${state.seatsLeft} из ${state.seatsLimit}`;
  }
  get profileCampaignPeriod(): string {
    const state = this.profileCampaign;
    return state ? `Запись до ${promoMoscowDate(Date.parse(state.endsAt) - 1, false)} · Визит до ${promoMoscowDate(state.visitDeadline, false)}` : '';
  }
  readonly formatRub = formatRub;
  readonly promoPeriodText = promoPeriodText;
  readonly promoStatusNotice = promoStatusNotice;
  readonly seatsLeftText = seatsLeftText;
  readonly promoPriceRub = promoPriceRub;
  readonly onlinePayRub = onlinePayRub;
  /** На демо-странице нажали запись — под кнопкой объяснение вместо перехода. */
  @Input() demoHint = false;
  @Output() actionClick = new EventEmitter<IPromoAction>();
  @Output() retryPrice = new EventEmitter<void>();
  /** Посетитель включил ролик акции. Значение — url ролика: по нему считаем один раз. */
  @Output() videoStart = new EventEmitter<string>();

  readonly mediaKind = PromoMediaKind;
  readonly priceNote = calcDisclaimer();
  readonly cellingsH1 = CELLINGS_HERO_H1;
  readonly cellingsLead = CELLINGS_HERO_LEAD;
  /** Кадр не закрывает слот без сильного кропа — contain и центр, не fill. */
  coverContain = false;
  extraContain = new Set<number>();
  private failedMedia = new Set<string>();

  get type(): LandingTemplateType {
    return this.templateType ?? offerTemplateType(this.offer, null);
  }

  get isCampaign(): boolean {
    return this.type === LandingTemplateType.Campaign;
  }

  get isShowcase(): boolean {
    return this.type === LandingTemplateType.Premium;
  }

  get isMinimal(): boolean {
    return this.type === LandingTemplateType.Minimal;
  }

  get isEntry(): boolean {
    return this.maryOffer?.masterScope === 'online';
  }

  get maryOffer(): PromoOffer | null {
    return promoByLanding('mary', null, this.offer?.serviceId);
  }

  get maryPrice(): PromoOffer | null {
    const offer = this.maryOffer;
    if (!offer || this.promoMoney || this.promoSeats) {
      return null;
    }
    // Показываем согласованные суммы, пока они совпадают с действующим прайсом.
    const currentPrice = offer.masterScope === 'online' ? offer.listRub : promoPriceRub(offer);
    const fixedPrice = this.priceText?.replace(/[\s\u00A0\u202F]/g, '');
    if (fixedPrice !== `${currentPrice}₽`) {
      return null;
    }
    if (offer.masterScope === 'online' && this.offer.discountPercent != null
      && this.offer.discountPercent !== offer.masterPercent) {
      return null;
    }
    return offer;
  }

  /** Цена услуги акции с местами: из расчёта сервера, без «от» — у акционных услуг прайс фиксированный. */
  get seatsPrice(): { list: string; pay: string | null } | null {
    const card = this.promoSeats;
    if (!card || card.listAmount == null) {
      return null;
    }
    return {
      list: formatRub(card.listAmount),
      pay: card.clientPays != null && card.clientPays < card.listAmount ? formatRub(card.clientPays) : null,
    };
  }

  /** Описание карточки. В закрытой акции из него уходит спеццена. */
  get shownLead(): string {
    if (this.maryOffer) {
      return this.isEntry
        ? 'Ноги полностью, от стоп до линии бикини, за один визит.'
        : 'Два этапа ухода за лицом, шеей и декольте. Около 45 минут.';
    }
    return promoSeatLead(this.offer?.description, this.promoSeats);
  }

  get shownBenefits(): ILandingOffer['benefits'] {
    if (this.maryOffer) {
      return [];
    }
    const benefits = promoSeatBenefits(this.offer?.benefits ?? [], this.promoSeats);
    return this.promoMoney ? benefits.filter(item => item.iconType !== BenefitIconType.Percent) : benefits;
  }

  get promoMoney(): boolean {
    return this.promoPriceLoading || this.promoPriceError || !!this.promoPrice;
  }

  get promoBookingLabel(): boolean {
    const card = this.promoSeats;
    return !!card?.serviceId && !card.pending && !card.ended;
  }

  /** В одной акции несколько предложений, и каждое выносится в шапку своей плашкой. */
  get headerProposals(): { text: string; tone: 'sale' | 'coupon' }[] {
    if (this.profileCampaign) {
      const state = this.profileCampaign;
      return !this.profileCampaignError && (state.status === 'open' || state.closedReason === 'not_started')
        ? [{ text: `−${state.discountPercent}%`, tone: 'sale' }] : [];
    }
    if (this.maryOffer) {
      return [];
    }
    const chips = offerHeaderChips(this.offer);
    const seats = this.promoSeats;
    if (!seats) {
      return chips;
    }
    // Сохранённая плашка не подтверждает действующую скидку: её проверяет quote.
    const otherChips = chips.filter(item => item.tone !== 'sale');
    const price = this.promoPrice;
    if (!seats.open || seats.pending || seats.ended || seats.exhausted
      || this.promoPriceLoading || this.promoPriceError || !price
      || price.promoDiscount <= 0 || !price.discountPercent
      || !price.seatsLeft || price.seatsLeft <= 0 || !price.seatsLimit || price.seatsLimit <= 0) {
      return otherChips;
    }
    return [
      { text: `Скидка ${price.discountPercent}%`, tone: 'sale' },
      { text: `Первым ${price.seatsLimit} клиенткам`, tone: 'sale' },
      ...otherChips,
    ];
  }

  get badge(): string {
    if (this.cellingsHero) {
      return '';
    }
    return offerBadge(this.offer, this.promoBadgeText);
  }

  get validLabel(): string | null {
    if (this.cellingsHero) {
      return null;
    }
    return formatValidTo(this.offer);
  }

  get actions(): IPromoAction[] {
    const actions = offerActions(this.offer);
    const hasServiceChoice = actions.filter(item => item.kind === PromoActionKind.Booking).length > 1;
    return actions.filter(item => this.bookingEnabled || item.kind !== PromoActionKind.Booking).map(item => {
      if (this.cellingsHero && item.kind === PromoActionKind.Calculator && item.role === PromoActionRole.Primary) {
        return { ...item, text: CELLINGS_CALC_BUTTON };
      }
      if (!hasServiceChoice && this.promoBookingLabel && item.kind === PromoActionKind.Booking && item.role === PromoActionRole.Primary) {
        return { ...item, text: 'Выбрать время' };
      }
      return item;
    });
  }

  get contactHref(): string | null {
    if (this.bookingEnabled || this.actions.length) return null;
    const phone = ruPhoneOrNull(this.contactPhone);
    return phone ? `tel:+${phone}` : null;
  }

  get cover(): IPromoMedia | null {
    const media = this.offer ? coverMedia(this.offer) : null;
    if (media && this.failedMedia.has(media.url)) {
      return null;
    }
    return media;
  }

  get showCover(): boolean {
    if (this.coverFailed) {
      return false;
    }
    if (this.cellingsHero && !this.cover) {
      return false;
    }
    // Без своего фото не рисуем серую заглушку: у входа про ноги обложка чистки была чужой.
    if (this.isEntry && !this.cover) {
      return false;
    }
    return !!this.cover || this.isCampaign || this.isShowcase || !this.isMinimal;
  }

  get media(): IPromoMedia[] {
    return extraMedia(this.offer).filter(item => !this.failedMedia.has(item.url));
  }

  get carouselMedia(): IPromoMedia[] {
    const cover = this.cover;
    return cover ? [cover, ...this.media] : this.media;
  }

  get showCarousel(): boolean {
    return !this.cellingsHero && this.carouselMedia.length > 1;
  }

  /** Битая обложка не оставляет пустой серый слот и текст ошибки. */
  private get coverFailed(): boolean {
    const media = this.offer ? coverMedia(this.offer) : null;
    return !!media && this.failedMedia.has(media.url);
  }

  onVideoUnavailable(url: string): void {
    if (!url || this.failedMedia.has(url)) {
      return;
    }
    this.failedMedia.add(url);
  }

  get footerNote(): string {
    return (this.offer?.footerNote ?? '').trim();
  }

  seatOrganizer(terms: PromoSeatTerms): string | null {
    return organizerLine(terms.state.organizer);
  }

  get showPriceNote(): boolean {
    return offerHasCalculator(this.offer);
  }

  get discountStrip(): string {
    const note = (this.offer?.footerNote ?? '').trim();
    if (note) {
      return note;
    }
    if (this.offer?.discountPercent) {
      return `Скидка ${this.offer.discountPercent}%`;
    }
    return '';
  }

  get showDiscountStrip(): boolean {
    return !this.profileCampaign && !this.cellingsHero && !this.maryOffer && this.isCampaign && !!this.discountStrip;
  }

  get showOfferTitle(): boolean {
    return !!this.offer?.title && this.offer.title !== this.cellingsH1;
  }

  get formattedTitle(): string {
    if (this.maryOffer) {
      return this.isEntry ? 'Шугаринг ног в Кашире' : 'Первая SKINHALE';
    }
    if (!this.offer?.title) {
      return '';
    }
    if (!this.offer.titleBold || this.isMinimal) {
      return this.offer.title;
    }
    return this.offer.title.replace(
      this.offer.titleBold,
      `<strong>${this.offer.titleBold}</strong>`
    );
  }

  onTermsClick(): void {
    if (this.preview) {
      return;
    }
    this.analytics.trackPromoTerms(this.termsMaster);
  }

  onAction(action: IPromoAction, event?: Event): void {
    event?.stopPropagation();
    if (this.preview) {
      return;
    }
    this.actionClick.emit(action);
  }

  onCoverLoad(event: Event): void {
    const img = event.target as HTMLImageElement;
    const box = img.closest('.offer__cover') as HTMLElement | null;
    this.coverContain = this.shouldContain(img, box);
  }

  onExtraLoad(event: Event, index: number): void {
    const img = event.target as HTMLImageElement;
    if (this.shouldContain(img, img.parentElement)) {
      this.extraContain.add(index);
    } else {
      this.extraContain.delete(index);
    }
  }

  /** Растягиваем cover, если пропорции близки; иначе кадр по центру. */
  private shouldContain(img: HTMLImageElement, box: HTMLElement | null): boolean {
    if (!box || !img.naturalWidth || !img.naturalHeight) {
      return false;
    }
    const bw = box.clientWidth;
    const bh = box.clientHeight;
    if (!bw || !bh) {
      return false;
    }
    const mediaRatio = img.naturalWidth / img.naturalHeight;
    const slotRatio = bw / bh;
    return Math.abs(mediaRatio - slotRatio) / slotRatio > 0.5;
  }
}
