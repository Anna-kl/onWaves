/** DTO приветственного купона за запись через Onwaves. Все суммы считает сервер; тут только показ. */

export interface WelcomeTier {
  threshold: number;
  discount: number;
  text: string;
  thresholdInclusive?: boolean;
}

export interface WelcomeCampaign {
  code: string;
  title: string;
  startsAt: string;
  endsAt: string;
  currency: string;
  tiers: WelcomeTier[];
  /** fixed — одна сумма мастера; без поля остаются прежние пороги. */
  amountMode?: 'fixed' | 'tiers' | null;
  fixedDiscountRub?: number | null;
  offerText?: string | null;
  policyId?: string | null;
  policyVersion?: number | null;
  masterId?: string | null;
  masterName?: string | null;
  eligibilityMode?: 0 | 1 | null;
  serviceScope?: 0 | 1 | null;
  serviceIds?: string[];
  eligibleServiceIds?: string[];
  serviceNames?: string[];
  minEligibleAmountRub?: number | null;
  visitDeadline?: string | null;
  maxRedemptions?: number | null;
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
  masterOffers?: WelcomeCouponMe[] | null;
}

export type WelcomeQuoteStatus =
  'available' | 'reserved' | 'redeemed' | 'expired' | 'unavailable' | 'login_required' | 'none';

export interface WelcomeQuote {
  amountKnown?: boolean;
  eligibleAmount?: number | null;
  policyId?: string | null;
  policyVersion?: number | null;
  eligibilityMode?: 0 | 1 | null;
  serviceScope?: 0 | 1 | null;
  minEligibleAmountRub?: number | null;
  offerText?: string | null;
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
  amountMode?: 'fixed' | 'tiers' | null;
  fixedDiscountRub?: number | null;
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
