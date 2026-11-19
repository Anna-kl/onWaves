/** Тексты шаблона «Баннер», которые не едут отдельными полями API. */
export const CAMPAIGN_SECONDARY_CTA = 'Выбрать услугу';

export const CAMPAIGN_PHOTO_NOTE = 'Предложение мастера';

export interface CampaignTrustItem {
  icon: 'car' | 'check' | 'clock' | 'chat';
  text: string;
}

export const CAMPAIGN_TRUST_ITEMS: CampaignTrustItem[] = [
  { icon: 'car', text: 'Удобная запись' },
  { icon: 'check', text: 'Условия до подтверждения' },
  { icon: 'chat', text: 'Связь с мастером' },
];
