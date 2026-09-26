import { IViewLanding } from '../../DTO/views/landing/IViewLanding';
import { isOfferPublic } from './promo-offer';

export type LandingState = 'loading' | 'ready' | 'absent' | 'failed';

export interface LandingLoadSuccess {
  ok: true;
  landing: IViewLanding | null;
}

export interface LandingLoadFailure {
  ok: false;
  landing: null;
  message: string;
}

export type LandingLoadResult = LandingLoadSuccess | LandingLoadFailure;

/**
 * Публичная акция: активный лендинг и хотя бы один оффер в окне validFrom/validTo.
 * Кабинет смотрит только isActive — черновик вне дат тоже должен быть виден мастеру.
 */
export function resolveLandingState(
  result: LandingLoadResult,
  options?: { cabinet?: boolean; now?: Date }
): LandingState {
  if (!result.ok) {
    return 'failed';
  }
  const landing = result.landing;
  if (!landing?.isActive) {
    return 'absent';
  }
  const offers = landing.offers ?? [];
  const visible = options?.cabinet
    ? offers.some(item => item.isActive)
    : offers.some(item => isOfferPublic(item, options?.now));
  return visible ? 'ready' : 'absent';
}

/**
 * Легаси-форма больше не первый экран `/cellings`: при absent/failed
 * рисуем тонкий каркас в landing-section. Оставляем функцию, чтобы старые
 * вызовы не открыли дыру fail-open.
 */
export function showCellingsFallback(_isCellingsPage: boolean, _landingState: LandingState): boolean {
  return false;
}
