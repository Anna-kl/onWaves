/** Публичный розыгрыш и личное право на приз. Суммы и фазы приходят с сервера. */

export type GiveawayPhase =
  | 'draft'
  | 'scheduled'
  | 'active'
  | 'awaiting_results'
  | 'results_published'
  | 'archived'
  | 'canceled';

export type GiveawayAwardStatus =
  | 'partially_redeemed'
  | 'assigned'
  | 'available'
  | 'reserved'
  | 'review_required'
  | 'redeemed'
  | 'expired'
  | 'revoked';

export interface GiveawayMaster {
  id: string;
  slug: string;
  name: string;
  address?: string | null;
}

export interface GiveawayPrizePolicy {
  version: number;
  capAmountRub: number;
  maxVisits: number;
  maxServices?: number | null;
  allowClientTopUp: boolean;
  anyMasterService: boolean;
  eligibleServiceIds: string[];
  excludedServiceIds: string[];
  bookingEndsAt: string;
  visitEndsAt: string;
  description: string;
}

export interface GiveawayPrizePublic {
  position: number;
  rewardType?: 'service' | 'amount_coupon' | null;
  title: string;
  maxAmountRub: number;
  serviceNames: string[];
  policy?: GiveawayPrizePolicy | null;
  bookingEndsAt?: string | null;
  visitEndsAt?: string | null;
}

export interface GiveawayBanner {
  imageUrl?: string | null;
  alt?: string | null;
  homeEnabled: boolean;
  masterEnabled: boolean;
}

export interface GiveawayBookingOffer {
  couponMode?: 'fixed' | 'tiers' | null;
  fixedDiscountRub?: number | null;
  extraPercent?: number | null;
  promoSeatCampaignCode?: string | null;
  termsUrl?: string | null;
}

export interface GiveawayCampaign {
  campaignId?: string | null;
  featuredPost?: GiveawayFeaturedPost | null;
  code: string;
  version: number;
  title: string;
  summary?: string | null;
  phase: GiveawayPhase;
  city?: string | null;
  master: GiveawayMaster;
  startsAt?: string | null;
  entriesCloseAt?: string | null;
  resultsPlannedAt?: string | null;
  resultsPublishedAt?: string | null;
  serverNow?: string | null;
  validUntil?: string | null;
  vkPostUrl?: string | null;
  vkResultsUrl?: string | null;
  rulesUrl?: string | null;
  rulesVersion?: number | null;
  rulesText?: string | null;
  organizerName?: string | null;
  venueText?: string | null;
  banner?: GiveawayBanner | null;
  prizes: GiveawayPrizePublic[];
  publicationGaps?: string[] | null;
  entryMode?: number;
  chanceRule?: 'one_per_platform' | null;
  configured?: boolean | null;
  privacyVersion?: string | null;
  websiteResultsUrl?: string | null;
  winnerNumbers?: { position: number; number: number }[] | null;
  bookingOffer?: GiveawayBookingOffer | null;
}

export interface GiveawayFeaturedParticipant { number: number; phoneMask: string | null; }
export interface GiveawayFeaturedRegistry { totalCount: number; items: GiveawayFeaturedParticipant[]; nextAfter: number | null; }
export interface GiveawayFeaturedPost {
  template: 'giveaway_results_v1'; version: number; pinned: boolean; title: string; subtitle: string | null;
  imageUrl: string | null; imageAlt: string | null; videoUrl: string | null; videoType: string | null; videoPosterUrl: string | null;
  registryVisible: boolean; participants: GiveawayFeaturedRegistry;
  winners: { position: number; number: number | null; phoneMask: string | null }[];
}

export interface GiveawayList {
  items: GiveawayCampaign[];
  serverNow?: string | null;
}

export interface GiveawayAwardService {
  id: string;
  name: string;
  durationMinutes?: number | null;
  includedItems?: string | null;
}

export interface GiveawayAward {
  awardId: string;
  version: number;
  campaignCode: string;
  position: number;
  status: GiveawayAwardStatus;
  service: GiveawayAwardService | null;
  policy?: GiveawayPrizePolicy | null;
  remainingAmountRub?: number;
  completedVisits?: number;
  completedServices?: number;
  reservedServices?: number;
  reservedVisits?: number;
  usedAmountRub?: number;
  services?: GiveawayAdminService[] | null;
  master: GiveawayMaster;
  city?: string | null;
  address?: string | null;
  originalAmount: number;
  clientPays: number;
  currency: string;
  bookingEndsAt?: string | null;
  visitEndsAt?: string | null;
  recordId?: string | null;
  canBook: boolean;
  canBookReason?: string | null;
}

export interface GiveawayMine {
  status: 'ready' | 'verification_required';
  serverNow?: string | null;
  items: GiveawayAward[];
}

export interface GiveawayPrizeQuote {
  status: string;
  reason?: string | null;
  awardId: string;
  awardVersion: number;
  quoteVersion?: string | null;
  lines?: { serviceId: string; name: string; amount: number; durationMinutes: number }[] | null;
  policy?: GiveawayPrizePolicy | null;
  durationMinutes?: number;
  serviceId: string;
  originalAmount: number;
  prizeDiscountAmount: number;
  payableAmount: number;
  currency: string;
  bookingEndsAt?: string | null;
  visitEndsAt?: string | null;
}

export interface GiveawayAdminService {
  id: string;
  name: string;
  price: number | null;
  durationMinutes?: number | null;
}

export interface GiveawayAdminSlot {
  id: string;
  position: number;
  title: string;
  maxAmountRub: number;
  version: number;
  assigned: boolean;
  bookingEndsAt?: string | null;
  visitEndsAt?: string | null;
  services: GiveawayAdminService[];
  policy?: GiveawayPrizePolicy | null;
}

export interface GiveawayAdminCampaign {
  configured?: boolean;
  entryMode?: number;
  code: string;
  version: number;
  title: string;
  phase: string;
  masterId: string;
  slots: GiveawayAdminSlot[];
}

export interface GiveawayPreview {
  phoneMasked: string;
  serviceName: string;
  originalAmount: number;
  clientPays: number;
  maxAmountRub: number;
  bookingEndsAt?: string | null;
  visitEndsAt?: string | null;
  conflict?: string | null;
  policy?: GiveawayPrizePolicy | null;
}

export interface GiveawayAssignment {
  awardId: string;
  status: string;
  phoneMasked: string;
  service?: { id: string; name: string; durationMinutes?: number | null } | null;
  originalAmount: number;
  clientPays: number;
  slotVersion: number;
  accountLinked: boolean;
  prizeTitle?: string | null;
}

export interface GiveawayOwnerAward {
  awardId: string;
  prizeTitle: string;
  position: number;
  phoneMasked: string;
  status: string;
  version: number;
  assignedAt: string;
  dueAmountRub: number;
  paidAmountRub: number;
  canRevoke: boolean;
  bookings: { recordId: string; status: string; services: number; originalAmount: number; onwavesPays: number; clientPays: number }[];
  events: { kind: string; at: string }[];
}

export type GiveawayLoadKind = 'loading' | 'ready' | 'empty' | 'failed' | 'verification_required';

export interface GiveawayLoad<T> {
  kind: GiveawayLoadKind;
  value: T | null;
  reason?: string | null;
  httpStatus?: number;
}
