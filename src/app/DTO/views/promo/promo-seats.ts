/** DTO акции с ограниченным числом мест. Все суммы и счётчик считает сервер; тут только показ. */
import { WelcomeQuote } from './welcome-coupon';

export interface PromoSeatEntry {
  recordId: string;
  clientName: string;
  serviceName: string;
  registeredAt: string;
  visitAt: string | null;
  timeZone: number;
  outcome: 'pending' | 'attended' | 'no_show' | 'cancelled' | 'auto_completed';
  canMarkAttendance: boolean;
  clientPays: number;
}

export interface PromoSeatReport {
  code: string;
  title: string;
  seatsLimit: number;
  taken: number;
  seatsLeft: number;
  registered: number;
  awaitingVisit: number;
  attended: number;
  noShows: number;
  cancelled: number;
  entries: PromoSeatEntry[];
}

export interface PromoSeatService {
  serviceId: string;
  name: string;
  listAmount: number;
  promoDiscount: number;
  couponDiscount: number;
  clientPays: number;
}

export interface PromoOrganizer {
  name: string;
  inn?: string | null;
  details?: string | null;
}

export type PromoSeatClosedReason = 'seats_exhausted' | 'ended' | 'disabled' | 'not_started';

export interface PromoSeatState {
  code: string;
  title: string;
  status: 'open' | 'closed';
  closedReason?: PromoSeatClosedReason | null;
  seatsLimit: number;
  seatsLeft: number;
  discountPercent: number;
  startsAt?: string | null;
  couponRequiresSeat?: boolean;
  exclusive?: boolean;
  showOnProfile?: boolean;
  excludeWelcomeCoupon?: boolean;
  singlePromoService?: boolean;
  termsNote?: string | null;
  endsAt: string;
  visitDeadline: string;
  heroOfferId?: string | null;
  services: PromoSeatService[];
  organizer?: PromoOrganizer | null;
}

export interface PromoSeatTerms {
  state: PromoSeatState;
  masterSlug?: string | null;
  performerName?: string | null;
  performerAddress?: string | null;
}

export type PromoSeatQuoteStatus = 'available' | 'login_required' | 'unavailable' | 'none';

export interface PromoSeatQuote {
  exclusive?: boolean;
  excludeWelcomeCoupon?: boolean;
  requireVerifiedPhone?: boolean;
  termsNote?: string | null;
  status: PromoSeatQuoteStatus;
  reason?: string | null;
  campaignCode?: string | null;
  seatsLimit: number;
  seatsLeft: number;
  serviceId?: string | null;
  serviceAmount: number;
  promoDiscount: number;
  couponDiscount: number;
  recordAmount: number;
  payableAmount: number;
  coupon: WelcomeQuote;
}
