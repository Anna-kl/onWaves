import { WelcomeCampaign, WelcomeTier } from 'src/app/DTO/views/promo/welcome-coupon';

/** Тот же текст условий, что и в уведомлениях сервера. Числа берём с сервера, а не зашиваем. */
export function welcomeTiersLine(campaign: WelcomeCampaign | null | undefined): string {
  const tiers = campaign?.tiers ?? [];
  return tiers.map(t => t.text).join(', ');
}

export function welcomeIsFixed(campaign: WelcomeCampaign | null | undefined): boolean {
  return campaign?.amountMode === 'fixed' && (campaign.fixedDiscountRub ?? 0) > 0;
}

export function welcomeHasOffer(campaign: WelcomeCampaign | null | undefined): boolean {
  return welcomeIsFixed(campaign) || welcomeTierList(campaign).length > 0;
}

/** Текст предложения с сервера. Для фиксированной суммы не показываем пороги других мастеров. */
export function welcomeOfferLine(campaign: WelcomeCampaign | null | undefined): string {
  if (welcomeIsFixed(campaign)) {
    const text = campaign?.offerText?.trim();
    return text || `${formatRub(campaign?.fixedDiscountRub)} новым клиенткам на первую запись`;
  }
  return welcomeTiersLine(campaign);
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

/** Календарный день в Москве, YYYY-MM-DD. Срок акции считаем по нему, не по UTC ноутбука. */
function moscowDay(value: Date): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Moscow',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(value);
}

function dayWord(count: number): string {
  const n10 = count % 10;
  const n100 = count % 100;
  if (n10 === 1 && n100 !== 11) return 'день';
  if (n10 >= 2 && n10 <= 4 && (n100 < 12 || n100 > 14)) return 'дня';
  return 'дней';
}

/**
 * Честный срок с серверного endsAt. Дата конца исключительная: 1 декабря 00:00
 * значит последний день — 30 ноября. В последние 3 дня — «осталось N дней», без таймера.
 */
export function welcomeDeadlineText(endsAt: string | null | undefined, now = new Date()): string | null {
  if (!endsAt) return null;
  const end = new Date(endsAt);
  if (Number.isNaN(end.getTime())) return null;
  const lastInstant = new Date(end.getTime() - 1);
  const left = Math.round(
    (Date.parse(moscowDay(lastInstant)) - Date.parse(moscowDay(now))) / 86_400_000,
  );
  if (left < 0) return null;
  if (left === 0) return 'последний день';
  if (left <= 3) {
    return left === 1 ? 'остался 1 день' : `осталось ${left} ${dayWord(left)}`;
  }
  const date = new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    timeZone: 'Europe/Moscow',
  }).format(lastInstant);
  return `до ${date}`;
}

/** Человеческий текст причины, почему скидка не применяется. */
export function welcomeReasonText(reason?: string | null): string {
  switch (reason) {
    case 'amount_changed': return 'Сумма скидки изменилась. Проверьте новую сумму и подтвердите запись.';
    case 'already_used': return 'Купон уже был использован.';
    case 'already_reserved': return 'Приветственная скидка уже закреплена за другой записью.';
    case 'below_threshold': return 'Сумма записи ниже порога скидки.';
    case 'zero_amount': return 'Запись бесплатная, купон не требуется.';
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
