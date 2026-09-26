import { BenefitIconType } from '../../../DTO/enums/benefitIconType';
import { LandingOfferType } from '../../../DTO/enums/landingOfferType';
import { LandingTemplateType } from '../../../DTO/enums/landingTemplateType';
import { ILandingBenefit } from '../../../DTO/views/landing/ILandingBenefit';
import { CAMPAIGN_SECONDARY_CTA, CAMPAIGN_TRUST_ITEMS } from '../../../profile-ba/helpers/promo-campaign';
import { ILandingOffer } from '../../../DTO/views/landing/ILandingOffer';

export type PromoImageShape = 'wide' | 'portrait' | 'square' | 'split';

export interface PromoTemplateFields {
  badge: boolean;
  titleBold: boolean;
  discount: boolean;
  benefits: number;
  footer: boolean;
  extraImages: number;
  imageShape: PromoImageShape;
  photoCaption: boolean;
  secondaryCta: boolean;
  /** Под карточкой на странице — живое портфолио из альбомов, не поле API. */
  portfolio: boolean;
}

export interface PromoTemplateDef {
  type: LandingTemplateType;
  offerType: LandingOfferType;
  name: string;
  kicker: string;
  tagline: string;
  bestFor: string;
  fields: PromoTemplateFields;
  defaultBadge: string;
  defaultSlogan?: string;
  secondaryButtonText?: string;
  trustItems?: string[];
  defaultOffer: Pick<
    ILandingOffer,
    'title' | 'titleBold' | 'description' | 'buttonText' | 'footerNote' | 'discountPercent' | 'benefits'
  >;
}

function benefit(
  iconType: BenefitIconType,
  title: string,
  description: string,
  sortOrder: number
): ILandingBenefit {
  return { iconType, title, description, sortOrder };
}

export const PROMO_TEMPLATES: PromoTemplateDef[] = [
  {
    type: LandingTemplateType.Classic,
    offerType: LandingOfferType.Discount,
    name: 'Скидка',
    kicker: 'Продать со скидкой',
    tagline: 'Клиент видит выгоду сразу — и записывается с кнопки',
    bestFor: 'Первый визит, сезон, свободные окна в графике',
    fields: {
      badge: true,
      titleBold: true,
      discount: true,
      benefits: 3,
      footer: true,
      extraImages: 0,
      imageShape: 'wide',
      photoCaption: false,
      secondaryCta: false,
      portfolio: false,
    },
    defaultBadge: 'Акция',
    defaultOffer: {
      title: 'Первый визит — выгоднее',
      titleBold: 'выгоднее',
      description: 'Запишитесь онлайн и получите скидку. Без звонков и ожидания в переписке.',
      buttonText: 'Записаться со скидкой',
      footerNote: 'Скидка действует при записи на выбранную услугу',
      discountPercent: 15,
      benefits: [
        benefit(BenefitIconType.Percent, 'Скидка на услугу', 'Цена ниже обычной — на карточке сразу видно на сколько', 0),
        benefit(BenefitIconType.Clock, 'Онлайн-запись', 'Клиент выбирает время сам, без перезвона', 1),
        benefit(BenefitIconType.Check, 'Без обязательств', 'Можно отменить, если планы изменятся', 2),
      ],
    },
  },
  {
    type: LandingTemplateType.Premium,
    offerType: LandingOfferType.UniqueService,
    name: 'Витрина',
    kicker: 'Показать флагман',
    tagline: 'Большое фото и сильные выгоды — как рекламный кадр',
    bestFor: 'Флагманская услуга, кейс, то, чем вы отличаетесь',
    fields: {
      badge: true,
      titleBold: true,
      discount: false,
      benefits: 4,
      footer: true,
      extraImages: 2,
      imageShape: 'portrait',
      photoCaption: false,
      secondaryCta: false,
      portfolio: false,
    },
    defaultBadge: 'Только у меня',
    defaultOffer: {
      title: 'Услуга, которой нет у других',
      titleBold: 'нет у других',
      description: 'Покажите результат и как проходит работа — клиент решает ещё до звонка.',
      buttonText: 'Записаться',
      footerNote: 'После заявки свяжемся и подтвердим удобное время',
      discountPercent: null,
      benefits: [
        benefit(BenefitIconType.Star, 'Результат', 'Что получит клиент и за какой срок', 0),
        benefit(BenefitIconType.Tool, 'Как проходим', 'Коротко о процессе — без воды', 1),
        benefit(BenefitIconType.Shield, 'Гарантия', 'Что обещаете и на каких условиях', 2),
        benefit(BenefitIconType.Location, 'Где работаем', 'На месте, с выездом или онлайн', 3),
      ],
    },
  },
  {
    type: LandingTemplateType.Minimal,
    offerType: LandingOfferType.FreeService,
    name: 'Короткий',
    kicker: 'Собрать заявки',
    tagline: 'Одно обещание и кнопка — для замера, консультации, подарка',
    bestFor: 'Бесплатный замер, консультация, пробный визит',
    fields: {
      badge: true,
      titleBold: false,
      discount: false,
      benefits: 1,
      footer: false,
      extraImages: 0,
      imageShape: 'square',
      photoCaption: false,
      secondaryCta: false,
      portfolio: false,
    },
    defaultBadge: 'Бесплатно',
    defaultOffer: {
      title: 'Бесплатный замер',
      titleBold: '',
      description: 'Приедем, посчитаем, ничего не навяжем. Заявка с страницы — сразу к вам.',
      buttonText: 'Оставить заявку',
      footerNote: '',
      discountPercent: null,
      benefits: [
        benefit(BenefitIconType.Gift, 'Без оплаты', 'Замер и расчёт — бесплатно, без скрытых условий', 0),
      ],
    },
  },
  {
    type: LandingTemplateType.Campaign,
    offerType: LandingOfferType.Discount,
    name: 'Баннер',
    kicker: 'Сезон под рекламу',
    tagline: 'Рекламный экран и работы из портфолио — до роликов мастера',
    bestFor: 'Сезонная акция, бесплатный замер, скидка до даты',
    fields: {
      badge: true,
      titleBold: true,
      discount: true,
      benefits: 3,
      footer: true,
      extraImages: 2,
      imageShape: 'split',
      photoCaption: true,
      secondaryCta: true,
      portfolio: true,
    },
    defaultBadge: 'Акция сентября',
    defaultSlogan: 'Стиль в каждой детали',
    secondaryButtonText: CAMPAIGN_SECONDARY_CTA,
    trustItems: CAMPAIGN_TRUST_ITEMS.map(item => item.text),
    defaultOffer: {
      title: 'Бесплатный замер + расчёт потолка и освещения',
      titleBold: 'Бесплатный замер',
      description: 'Точная стоимость после замера. Помогу подобрать оптимальное решение и освещение. Быстро, честно и без обязательств.',
      buttonText: 'Рассчитать потолок',
      footerNote: 'При заказе до 30 сентября — скидка 5% на монтаж освещения',
      discountPercent: 5,
      benefits: [
        benefit(BenefitIconType.Dollar, 'Низкие цены', 'Подберём вариант под ваш бюджет', 0),
        benefit(BenefitIconType.Clock, 'Бесплатный замер', 'Выезд в удобное время, замер около 20 минут', 1),
        benefit(BenefitIconType.Shield, 'Гарантия 10 лет', 'На полотно и монтаж', 2),
      ],
    },
  },
];

export function getPromoTemplate(type: LandingTemplateType): PromoTemplateDef {
  return PROMO_TEMPLATES.find(item => item.type === type) ?? PROMO_TEMPLATES[0];
}

export function templateFromOfferType(offerType: LandingOfferType): LandingTemplateType {
  switch (offerType) {
    case LandingOfferType.Discount:
      return LandingTemplateType.Classic;
    case LandingOfferType.UniqueService:
      return LandingTemplateType.Premium;
    default:
      return LandingTemplateType.Minimal;
  }
}

export const BENEFIT_ICON_OPTIONS: { type: BenefitIconType; label: string; glyph: string }[] = [
  { type: BenefitIconType.Percent, label: 'Процент', glyph: '%' },
  { type: BenefitIconType.Clock, label: 'Время', glyph: '⏱' },
  { type: BenefitIconType.Check, label: 'Галочка', glyph: '✓' },
  { type: BenefitIconType.Star, label: 'Звезда', glyph: '★' },
  { type: BenefitIconType.Shield, label: 'Щит', glyph: '🛡' },
  { type: BenefitIconType.Gift, label: 'Подарок', glyph: '🎁' },
  { type: BenefitIconType.Tool, label: 'Инструмент', glyph: '🔧' },
  { type: BenefitIconType.Location, label: 'Адрес', glyph: '📍' },
  { type: BenefitIconType.Heart, label: 'Сердце', glyph: '♥' },
  { type: BenefitIconType.Dollar, label: 'Цена', glyph: '$' },
];

export function benefitGlyph(iconType: BenefitIconType): string {
  return BENEFIT_ICON_OPTIONS.find(item => item.type === iconType)?.glyph ?? '•';
}
