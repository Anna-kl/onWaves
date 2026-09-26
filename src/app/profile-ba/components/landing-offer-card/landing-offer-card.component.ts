import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  offerTemplateType,
} from '../../helpers/promo-offer';
import { CELLINGS_CALC_BUTTON, CELLINGS_HERO_H1, CELLINGS_HERO_LEAD } from '../../helpers/cellings-offer';

@Component({
  selector: 'app-landing-offer-card',
  templateUrl: './landing-offer-card.component.html',
  styleUrls: ['./landing-offer-card.component.scss']
})
export class LandingOfferCardComponent {
  @Input() offer!: ILandingOffer;
  @Input() promoBadgeText?: string;
  @Input() templateType: LandingTemplateType | null = null;
  @Input() priceText: string | null = null;
  /** Превью в кабинете: кнопки видны, клик никуда не ведёт. */
  @Input() preview = false;
  /** Первый экран /cellings: фиксированный h1, не title акции. */
  @Input() cellingsHero = false;
  @Input() citiesLine: string | null = null;
  @Output() actionClick = new EventEmitter<IPromoAction>();
  /** Посетитель включил ролик акции. Значение — url ролика: по нему считаем один раз. */
  @Output() videoStart = new EventEmitter<string>();

  readonly mediaKind = PromoMediaKind;
  readonly priceNote = calcDisclaimer();
  readonly cellingsH1 = CELLINGS_HERO_H1;
  readonly cellingsLead = CELLINGS_HERO_LEAD;
  /** Кадр не закрывает слот без сильного кропа — contain и центр, не fill. */
  coverContain = false;
  extraContain = new Set<number>();

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
    const list = offerActions(this.offer);
    if (!this.cellingsHero) {
      return list;
    }
    return list.map(item =>
      item.kind === PromoActionKind.Calculator && item.role === PromoActionRole.Primary
        ? { ...item, text: CELLINGS_CALC_BUTTON }
        : item
    );
  }

  get cover(): IPromoMedia | null {
    return this.offer ? coverMedia(this.offer) : null;
  }

  get showCover(): boolean {
    if (this.cellingsHero && !this.cover) {
      return false;
    }
    return !!this.cover || this.isCampaign || this.isShowcase || !this.isMinimal;
  }

  get media(): IPromoMedia[] {
    return extraMedia(this.offer);
  }

  get footerNote(): string {
    return (this.offer?.footerNote ?? '').trim();
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
    return !this.cellingsHero && this.isCampaign && !!this.discountStrip;
  }

  get showOfferTitle(): boolean {
    return !!this.offer?.title && this.offer.title !== this.cellingsH1;
  }

  get formattedTitle(): string {
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
