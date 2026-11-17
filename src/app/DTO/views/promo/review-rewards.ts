export interface ReviewRewardCoupon {
  id: string;
  issuedAt: string;
  expiresAt: string;
  issuedKopecks: number;
  availableKopecks: number;
  reservedKopecks: number;
  usedKopecks: number;
  expiredKopecks: number;
  sourceRecordId?: string;
}

export interface ReviewRewardWallet {
  availableKopecks: number;
  items: ReviewRewardCoupon[];
  terms: { amountKopecks: number; lifetimeDays: number; version: string; startsAt: string } | null;
}

export interface ReviewRewardsQuote {
  beforeKopecks: number;
  clientPayableKopecks: number;
  discountKopecks: number;
  version: string;
  allocations: { couponId: string; amountKopecks: number }[];
}

export interface ReviewRewardBookingSnapshot {
  beforeKopecks: number;
  discountKopecks: number;
  clientPayableKopecks: number;
  status: string;
}

export interface ReviewRewardProgram {
  enabled: boolean;
  startsAt: string;
  revision: number;
}

export interface ReviewRewardsAdmin {
  program: ReviewRewardProgram | null;
  terms: ReviewRewardWallet['terms'];
  counts: {
    issued: number;
    issuedKopecks: number;
    availableKopecks: number;
    reservedKopecks: number;
    usedKopecks: number;
    expiredKopecks: number;
  } | null;
}
