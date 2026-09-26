/** DTO приветственного купона за запись через Onwaves. Все суммы считает сервер; тут только показ. */

export interface WelcomeTier {
  threshold: number;
  discount: number;
  text: string;
}

export interface WelcomeCampaign {
  code: string;
  title: string;
  startsAt: string;
  endsAt: string;
  currency: string;
  tiers: WelcomeTier[];
}

export interface WelcomeOffer {
  active: boolean;
  masterParticipates: boolean;
  campaign: WelcomeCampaign | null;
}

export type WelcomeCouponStatus = 'none' | 'available' | 'reserved' | 'redeemed' | 'expired' | 'unavailable';

export interface WelcomeCouponMe {
  status: WelcomeCouponStatus;
  reason?: string | null;
  campaign?: WelcomeCampaign | null;
  recordId?: string | null;
  discount?: number | null;
  expiresAt?: string | null;
}

export type WelcomeQuoteStatus =
  'available' | 'reserved' | 'redeemed' | 'expired' | 'unavailable' | 'login_required' | 'none';

export interface WelcomeQuote {
  originalAmount: number;
  discountAmount: number;
  payableAmount: number;
  threshold?: number | null;
  couponStatus: WelcomeQuoteStatus;
  reason?: string | null;
  currency: string;
  potentialDiscount: number;
  campaignCode?: string | null;
  /** Сумма получена из цены «от N ₽» — показывать её только с «от». */
  amountIsFrom?: boolean;
}

/** Снимок на записи (одинаков для клиента и мастера). */
export interface CouponSnapshot {
  kind: string;
  status: string;
  originalAmount: number;
  discountAmount: number;
  payableAmount: number;
  currency: string;
  amountIsFrom?: boolean;
}
