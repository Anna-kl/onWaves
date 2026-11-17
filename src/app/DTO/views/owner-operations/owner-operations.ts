export interface OperationsPage<T> { asOfUtc: string; timezone: string; items: T[]; total: number; nextCursor: number | null; totals?: { outstandingKopecks?: number; paidKopecks?: number; amountKopecks?: number; excludedRows?: number; unknownDates?: number }; }
export interface OperationObligation {
  obligationKey: string; sourceType: string; sourceId: string; masterId: string | null; recipient: string; title: string; city: string | null;
  campaignRefs: string[]; recordRefs: string[]; originalKopecks: number | null; clientPayableKopecks: number | null; accruedKopecks: number | null;
  paidKopecks: number; outstandingKopecks: number | null; forecastKopecks: number | null; unscheduledReserveKopecks: number | null;
  dueDate: string | null; attendanceEvidence: string; state: string; components: { label: string; amountKopecks: number | null }[];
  dataQuality: string[]; expectedVersion: string; canPay: boolean; maxVisits: number | null; usedVisits: number; reservedVisits: number; rightsCapKopecks: number | null; useByUtc: string | null;
}
export interface OperationVisit {
  visitKey: string; recordId: string | null; obligationKey: string; masterId: string | null; master: string; city: string | null; client: string; services: string;
  startsAtUtc: string | null; durationMinutes: number; recordStatus: string; attendance: string; originalKopecks: number | null;
  clientPayableKopecks: number | null; contributionKopecks: number | null; canConfirm: boolean; expectedVersion: string;
}
export interface OperationCampaign {
  campaignKey: string; sourceType: string; id: string; masterId: string | null; master: string; city: string | null; title: string;
  marketingState: string; executionState: string; settlementState: string; startsAtUtc: string | null; entriesEndUtc: string | null; useByUtc: string | null;
  rightsLimit: number | null; issued: number; reserved: number; completed: number; noShow: number; expired: number; rightsLeft: number | null;
  debtKopecks: number; paidKopecks: number; futureMaximumKopecks: number | null; conditionsSource: string; profileUrl: string | null; rulesUrl: string | null; components: string[];
}
export interface OperationPayment {
  id: string; recipient: string; amountKopecks: number; currency: string; transferredAtUtc: string | null; registeredAtUtc: string | null; actorAuthId: string | null;
  method: string; reason: string; reference: string | null; kind: string; correctsPaymentId: string | null; version: number; allocations: { obligationKey: string; amountKopecks: number }[];
}
export interface OperationAudit { id: string; actorAuthId: string; action: string; entityKey: string; atUtc: string; beforeVersion: string | null; afterVersion: string | null; reason: string; }
export interface OperationsSummary {
  asOfUtc: string; date: string; timezone: string; visitsCount: number; confirmedVisitsCount: number; pendingVisitsCount: number; attendanceNeededCount: number;
  dueTodayKopecks: number; dueTodayRecipients: number; overdueKopecks: number; paidTodayKopecks: number; afterVisitsForecastKopecks: number;
  overdue: OperationObligation[]; dueToday: OperationObligation[]; visits: OperationVisit[]; issues: OperationObligation[];
  masters: { id: string; name: string }[];
  budget: { monthlyLimitKopecks: number; paidThisMonthKopecks: number; confirmedDebtKopecks: number; reservedVisitsKopecks: number; unallocatedRightsKopecks: number;
    drafts: number; excludedRows: number; unknownPaymentDates: number; complete: boolean; freeBudgetKopecks: number | null; message: string };
}
export interface OperationPaymentRequest { idempotencyKey: string; transferredAtUtc: string; method: string; reason: string; reference: string | null;
  allocations: { obligationKey: string; amountKopecks: number; expectedVersion: string }[]; }
export interface Reconciliation { asOfUtc: string; expectedVersion: string; unknownDates: number; requiresReview: number; budgetComplete: boolean;
  items: { obligationKey: string; amountKopecks: number; transferredAtUtc: string | null; requestKey: string; dataQuality: string[]; description: string }[]; }
