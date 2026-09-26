import { LandingTemplateType } from '../../DTO/enums/landingTemplateType';
import { PromoActionKind } from '../../DTO/enums/promoActionKind';
import { PromoActionRole } from '../../DTO/enums/promoActionRole';
import { PromoCalcUnit } from '../../DTO/enums/promoCalcUnit';
import { PromoMediaKind } from '../../DTO/enums/promoMediaKind';
import { ILandingOffer } from '../../DTO/views/landing/ILandingOffer';
import { IPromoAction } from '../../DTO/views/landing/IPromoAction';
import { IPromoCalculator } from '../../DTO/views/landing/IPromoCalculator';
import { IPromoMedia } from '../../DTO/views/landing/IPromoMedia';
import { IPrice } from '../../DTO/views/services/IPrice';
import { isPriceBoundSet } from '../../../helpers/common/price.helpers';

const CALC_DISCLAIMER = 'Ориентир по прайсу. Точная стоимость — после замера';

export function offerTemplateType(
  offer: ILandingOffer,
  landingType?: LandingTemplateType | null
): LandingTemplateType {
  return offer.templateType ?? landingType ?? LandingTemplateType.Classic;
}

export function offerBadge(offer: ILandingOffer, landingBadge?: string | null): string {
  return (offer.badge || offer.slogan || landingBadge || '').trim();
}

export function offerActions(offer: ILandingOffer): IPromoAction[] {
  const raw = (offer.actions ?? []).filter(item => !!item?.text?.trim());
  if (raw.length) {
    const actions = raw.slice(0, 2).map((item, index) => ({
      role: item.role ?? (index === 0 ? PromoActionRole.Primary : PromoActionRole.Secondary),
      kind: item.kind ?? PromoActionKind.Booking,
      text: item.text.trim().slice(0, 24),
      serviceId: item.serviceId ?? null,
      profileCalculatorId: item.profileCalculatorId ?? null,
    }));
    if (!actions.some(item => item.role === PromoActionRole.Primary)) {
      actions[0].role = PromoActionRole.Primary;
    }
    return uniqueKinds(actions);
  }

  if (!offer.buttonText?.trim() && !offer.serviceId) {
    return [];
  }

  return [{
    role: PromoActionRole.Primary,
    kind: PromoActionKind.Booking,
    text: (offer.buttonText || 'Записаться').trim().slice(0, 24),
    serviceId: offer.serviceId ?? null,
  }];
}

export function primaryAction(offer: ILandingOffer): IPromoAction | null {
  const actions = offerActions(offer);
  return actions.find(item => item.role === PromoActionRole.Primary) ?? actions[0] ?? null;
}

export function secondaryAction(offer: ILandingOffer): IPromoAction | null {
  return offerActions(offer).find(item => item.role === PromoActionRole.Secondary) ?? null;
}

export function offerMedia(offer: ILandingOffer): IPromoMedia[] {
  const media = (offer.media ?? []).filter(item => !!item?.url);
  if (media.length) {
    return media;
  }
  return (offer.galleryUrls ?? [])
    .filter(url => !!url)
    .map(url => ({ url, kind: PromoMediaKind.Image, posterUrl: null }));
}

/** Обложка карточки: фото `imageUrl` или первый кадр/ролик из media. */
export function coverMedia(offer: ILandingOffer): IPromoMedia | null {
  const media = offerMedia(offer);
  if (offer.imageUrl) {
    const fromMedia = media.find(item => item.url === offer.imageUrl);
    return fromMedia ?? { url: offer.imageUrl, kind: PromoMediaKind.Image, posterUrl: null };
  }
  return media[0] ?? null;
}

export function extraMedia(offer: ILandingOffer): IPromoMedia[] {
  const media = offerMedia(offer);
  const cover = coverMedia(offer);
  if (!cover) {
    return media;
  }
  let skippedCover = false;
  return media.filter(item => {
    if (!skippedCover && item.url === cover.url) {
      skippedCover = true;
      return false;
    }
    return item.url !== offer.imageUrl;
  });
}

export function isOfferExpired(offer: ILandingOffer, now = new Date()): boolean {
  const to = parseDate(offer.validTo);
  return !!to && to.getTime() < now.getTime();
}

export function isOfferScheduled(offer: ILandingOffer, now = new Date()): boolean {
  const from = parseDate(offer.validFrom);
  return !!from && from.getTime() > now.getTime();
}

export function isOfferPublic(offer: ILandingOffer, now = new Date()): boolean {
  return !!offer.isActive && !isOfferExpired(offer, now) && !isOfferScheduled(offer, now);
}

export function formatValidTo(offer: ILandingOffer): string | null {
  const date = parseDate(offer.validTo);
  if (!date) {
    return null;
  }
  const text = date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
  return `до ${text}`;
}

export function defaultActions(type: LandingTemplateType): IPromoAction[] {
  if (type === LandingTemplateType.Campaign) {
    return [
      {
        role: PromoActionRole.Primary,
        kind: PromoActionKind.Calculator,
        text: 'Рассчитать стоимость',
        serviceId: null,
      },
      {
        role: PromoActionRole.Secondary,
        kind: PromoActionKind.Booking,
        text: 'Записаться на замер',
        serviceId: null,
      },
    ];
  }

  const text = type === LandingTemplateType.Minimal
    ? 'Оставить заявку'
    : type === LandingTemplateType.Classic
      ? 'Записаться со скидкой'
      : 'Записаться';

  return [{
    role: PromoActionRole.Primary,
    kind: PromoActionKind.Booking,
    text,
    serviceId: null,
  }];
}

export function defaultCalculator(priceServiceId = ''): IPromoCalculator {
  return {
    unit: PromoCalcUnit.M2,
    unitLabel: 'м²',
    min: 5,
    max: 200,
    step: 1,
    defaultValue: 20,
    priceServiceId,
    resultMode: 'from',
    rangePercent: 20,
    askCity: true,
    askComment: false,
    extras: [],
  };
}

export function calcUnitLabel(unit: PromoCalcUnit): string {
  switch (unit) {
    case PromoCalcUnit.Piece:
      return 'шт.';
    case PromoCalcUnit.Hour:
      return 'час';
    case PromoCalcUnit.Meter:
      return 'п. м';
    default:
      return 'м²';
  }
}

export function serviceHasPrice(price?: IPrice | null): boolean {
  if (!price) {
    return false;
  }
  return price.isRange ? isPriceBoundSet(price.startRange) : isPriceBoundSet(price.price);
}

export function priceFromService(price?: IPrice | null, unitLabel?: string): string | null {
  if (!price || !serviceHasPrice(price)) {
    return null;
  }
  const amount = price.isRange ? Number(price.startRange) : Number(price.price);
  const formatted = amount.toLocaleString('ru-RU');
  const unit = unitLabel ? `/${unitLabel}` : '';
  return `от ${formatted} ₽${unit}`;
}

export function roundUp100(value: number): number {
  return Math.ceil(value / 100) * 100;
}

export function calcAmount(
  calculator: IPromoCalculator,
  value: number,
  extraIds: string[],
  basePrice: number
): { from: number; to: number | null } {
  const extras = (calculator.extras ?? []).filter(item => extraIds.includes(item.id));
  const extraSum = extras.reduce((sum, item) => {
    const add = Number(item.price) || 0;
    return sum + (item.perUnit ? add * value : add);
  }, 0);
  const total = roundUp100(basePrice * value + extraSum);
  if (calculator.resultMode === 'range') {
    const width = (calculator.rangePercent ?? 20) / 100;
    return { from: total, to: roundUp100(total * (1 + width)) };
  }
  return { from: total, to: null };
}

export function formatCalcResult(from: number, to: number | null, unitLabel?: string): string {
  const unit = unitLabel ? `/${unitLabel}` : '';
  if (to != null && to !== from) {
    return `${from.toLocaleString('ru-RU')}–${to.toLocaleString('ru-RU')} ₽${unit}`;
  }
  return `от ${from.toLocaleString('ru-RU')} ₽${unit}`;
}

export function calcDisclaimer(): string {
  return CALC_DISCLAIMER;
}

/** Подпись «после замера» только у расчёта, не у записи к мастеру. */
export function offerHasCalculator(offer: ILandingOffer | null | undefined): boolean {
  if (!offer) {
    return false;
  }
  if (offer.calculator?.priceServiceId) {
    return true;
  }
  return offerActions(offer).some(item => item.kind === PromoActionKind.Calculator);
}

export function offerPriceText(
  offer: ILandingOffer,
  prices: Map<string, IPrice>,
  calculator?: IPromoCalculator | null
): string | null {
  const calc = calculator ?? offer.calculator;
  if (calc?.priceServiceId) {
    const unit = calc.unitLabel || calcUnitLabel(calc.unit);
    return priceFromService(prices.get(calc.priceServiceId), unit);
  }
  const hasGraphCalc = offerActions(offer).some(
    item => item.kind === PromoActionKind.Calculator && !!item.profileCalculatorId
  );
  if (hasGraphCalc) {
    return null;
  }
  const booking = offerActions(offer).find(item => item.kind === PromoActionKind.Booking && item.serviceId);
  const serviceId = booking?.serviceId ?? offer.serviceId ?? undefined;
  if (!serviceId) {
    return null;
  }
  return priceFromService(prices.get(serviceId));
}

function uniqueKinds(actions: IPromoAction[]): IPromoAction[] {
  const seen = new Set<PromoActionKind>();
  return actions.filter(item => {
    if (seen.has(item.kind)) {
      return false;
    }
    seen.add(item.kind);
    return true;
  });
}

function parseDate(value?: string | null): Date | null {
  if (!value) {
    return null;
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}
