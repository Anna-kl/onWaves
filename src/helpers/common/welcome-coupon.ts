import { WelcomeCampaign, WelcomeTier } from 'src/app/DTO/views/promo/welcome-coupon';

/** Тот же текст условий, что и в уведомлениях сервера. Числа берём с сервера, а не зашиваем. */
export function welcomeTiersLine(campaign: WelcomeCampaign | null | undefined): string {
  const tiers = campaign?.tiers ?? [];
  return tiers.map(t => t.text).join(', ');
}

export function formatRub(value: number | null | undefined): string {
  if (value == null) return '';
  return Math.round(value * 100) % 100 === 0
    ? `${Math.round(value).toLocaleString('ru-RU')} ₽`
    : `${value.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₽`;
}

export function welcomeTierList(campaign: WelcomeCampaign | null | undefined): WelcomeTier[] {
  return [...(campaign?.tiers ?? [])].sort((a, b) => a.threshold - b.threshold);
}

/** Человеческий текст причины, почему скидка не применяется. */
export function welcomeReasonText(reason?: string | null): string {
  switch (reason) {
    case 'amount_changed': return 'Сумма скидки изменилась. Проверьте новую сумму и подтвердите запись.';
    case 'already_used': return 'Приветственная скидка уже использована.';
    case 'already_reserved': return 'Приветственная скидка уже закреплена за другой записью.';
    case 'below_threshold': return 'Сумма записи ниже порога скидки.';
    case 'expired': return 'Срок действия скидки истёк.';
    case 'budget_exhausted': return 'Лимит акции исчерпан.';
    case 'master_not_participating': return 'Этот мастер не участвует в акции.';
    case 'not_first_booking': return 'Скидка действует на первую выполненную запись через Onwaves.';
    case 'phone_required': return 'Для скидки нужен номер телефона в профиле.';
    case 'price_not_fixed': return 'У выбранных услуг цена не фиксированная, скидку рассчитать нельзя.';
    case 'campaign_disabled': return 'Акция сейчас не действует.';
    case 'login_required': return 'Войдите или зарегистрируйтесь, чтобы применить скидку.';
    case 'services_not_found': return 'Выбранные услуги не найдены у этого мастера.';
    default: return 'Скидка недоступна. Запись без скидки можно оформить.';
  }
}

/**
 * Сумма с «от», когда она пришла из диапазонной цены. Без этого «от 5 000 ₽»
 * превратилось бы на экране в точные 5 000 ₽ — обещание, которого прайс не давал.
 */
export function formatAmount(value: number | null | undefined, isFrom?: boolean): string {
  const money = formatRub(value);
  return isFrom && money ? `от ${money}` : money;
}
