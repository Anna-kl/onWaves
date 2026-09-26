/** Тексты шаблона «Баннер», которые не едут отдельными полями API. */
export const CAMPAIGN_SECONDARY_CTA = 'Записаться на бесплатный замер';

export const CAMPAIGN_PHOTO_NOTE = 'Современные решения для вашего интерьера';

export interface CampaignTrustItem {
  icon: 'car' | 'check' | 'clock' | 'chat';
  text: string;
}

export const CAMPAIGN_TRUST_ITEMS: CampaignTrustItem[] = [
  { icon: 'car', text: 'Быстрый выезд' },
  { icon: 'check', text: 'Без обязательств' },
  { icon: 'chat', text: 'Ответим сегодня' },
];
