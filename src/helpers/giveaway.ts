import { GiveawayCampaign, GiveawayPhase } from 'src/app/DTO/views/giveaway/giveaway';

const PRIZE_RETURN = 'ow-prize-cabinet';
const PRIZE_DRAFT = 'ow-prize-draft';

export interface PrizeDraft {
  awardId: string;
  serviceId: string;
  masterSlug: string;
  version: number;
  recordId?: string | null;
}

/** Дата и время в Москве. Часы в текст не подставляем, пока их нет в ответе сервера. */
export function formatMsk(iso: string | null | undefined, withTime = true): string | null {
  if (!iso) {
    return null;
  }
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  const formatted = new Intl.DateTimeFormat('ru-RU', {
    timeZone: 'Europe/Moscow',
    day: 'numeric',
    month: 'long',
    ...(withTime ? { hour: '2-digit', minute: '2-digit' } : {}),
  }).format(date);
  return withTime ? `${formatted} МСК` : formatted;
}

/** В API конец срока исключительный; посетителю показываем последний разрешённый день. */
export function prizeDeadline(iso?: string | null): string | null {
  if (!iso || Number.isNaN(Date.parse(iso))) return null;
  return formatMsk(new Date(Date.parse(iso) - 1).toISOString(), false);
}

export function giveawayIndexable(campaign: GiveawayCampaign | null | undefined): boolean {
  if (!campaign?.rulesVersion || (giveawayHasVk(campaign.entryMode) && !campaign.vkPostUrl)) {
    return false;
  }
  if (giveawayHasVk(campaign.entryMode) && campaign.phase === 'results_published' && !campaign.vkResultsUrl && !campaign.winnerNumbers?.length) {
    return false;
  }
  return campaign.phase === 'scheduled'
    || campaign.phase === 'active'
    || campaign.phase === 'awaiting_results'
    || campaign.phase === 'results_published';
}

export function bannerVisible(campaign: GiveawayCampaign | null | undefined, placement: 'home' | 'master'): boolean {
  if (!campaign) {
    return false;
  }
  if (campaign.phase === 'archived' || campaign.phase === 'canceled') {
    return false;
  }
  const banner = campaign.banner;
  if (placement === 'home' && banner && banner.homeEnabled === false) {
    return false;
  }
  if (placement === 'master' && banner && banner.masterEnabled === false) {
    return false;
  }
  return true;
}

export function phaseHeadline(phase: GiveawayPhase): string {
  switch (phase) {
    case 'draft': return 'Готовим розыгрыш двух призов';
    case 'scheduled': return 'Скоро розыгрыш двух призов';
    case 'awaiting_results': return 'Приём заявок завершён';
    case 'results_published': return 'Итоги розыгрыша Светланы';
    case 'archived':
    case 'canceled': return 'Розыгрыш завершён';
    default: return 'Два приза на услуги Светланы — в розыгрыше';
  }
}

/** Только внутренний путь без чужого origin, телефона и токена. */
export function safeInternalPath(value: string | null | undefined): string | null {
  const path = (value ?? '').trim();
  if (!path.startsWith('/') || path.startsWith('//') || path.includes('\\')) {
    return null;
  }
  if (/phone|token|otp|code=/i.test(path)) {
    return null;
  }
  return path;
}

export function rememberPrizeCabinetReturn(): void {
  try {
    sessionStorage.setItem(PRIZE_RETURN, '1');
  } catch {
    // Приватный режим: кнопка входа останется, возврат в кабинет пользователь откроет сам.
  }
}

export function takePrizeCabinetReturn(): boolean {
  try {
    const marked = sessionStorage.getItem(PRIZE_RETURN) === '1';
    if (marked) {
      sessionStorage.removeItem(PRIZE_RETURN);
    }
    return marked;
  } catch {
    return false;
  }
}

export function savePrizeDraft(draft: PrizeDraft): void {
  try {
    sessionStorage.setItem(PRIZE_DRAFT, JSON.stringify(draft));
  } catch {
    // Черновик необязателен: award в адресе сервер всё равно проверит заново.
  }
}

export function readPrizeDraft(): PrizeDraft | null {
  try {
    const raw = sessionStorage.getItem(PRIZE_DRAFT);
    if (!raw) {
      return null;
    }
    const draft = JSON.parse(raw) as PrizeDraft;
    if (!draft?.awardId || !draft.serviceId) {
      return null;
    }
    return draft;
  } catch {
    return null;
  }
}

export function clearPrizeDraft(): void {
  try {
    sessionStorage.removeItem(PRIZE_DRAFT);
  } catch {
    // Нечего чистить.
  }
}

export function newIdempotencyKey(): string {
  const cryptoRef = globalThis.crypto;
  if (cryptoRef?.randomUUID) {
    return cryptoRef.randomUUID();
  }
  return `gw-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
export function giveawayHasWebsite(mode: number | undefined): boolean {
  return mode === 1 || mode === 2;
}

export function giveawayHasVk(mode: number | undefined): boolean {
  return mode == null || mode === 0 || mode === 2;
}

