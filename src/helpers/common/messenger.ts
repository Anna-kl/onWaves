/**
 * Ссылки на мессенджеры из контакта, который человек вписывает руками:
 * `@username`, `username`, `max.ru/u/xxx`, готовый `https://…`.
 *
 * Общая точка для карточки мастера (профиль БА) и карточек клиентов в календаре БА,
 * чтобы правила разбора не расползались по шаблонам.
 */

/** «//max.ru/u/x», «www.max.ru/u/x», «@user», «/user» → «max.ru/u/x» / «user». */
function normalizeContact(value: string | null | undefined): string {
  if (!value) return '';
  return value.trim()
    .replace(/^\/\//, '')
    .replace(/^@/, '')
    .replace(/^www\./i, '')
    .replace(/^\/+/, '');
}

/** Номер телефона в любом виде: +7 (999) 000-00-00, 79990000000 и т.п. */
const PHONE_ONLY = /^\+?[\d\s()-]+$/;

/**
 * У MAX нет ссылки по номеру телефона — в отличие от wa.me и t.me. Нужен username
 * или готовая ссылка max.ru/u/…, поэтому голый номер отбраковываем: иначе получилась бы
 * битая max.ru/+79990000000. Пустая строка означает «вести некуда».
 */
export function getMaxUrl(contact: string | null | undefined): string {
  const raw = (contact ?? '').trim();
  if (/^https?:\/\//i.test(raw)) return raw;
  const u = normalizeContact(raw);
  if (!u || PHONE_ONLY.test(u)) return '';
  if (/^max\.ru(\/|$)/i.test(u)) return 'https://' + u;
  return 'https://max.ru/' + u;
}

/**
 * Для Telegram номер валиден: t.me/+79990000000 открывает чат с владельцем номера.
 * Пустая строка означает «вести некуда».
 */
export function getTelegramUrl(contact: string | null | undefined): string {
  const raw = (contact ?? '').trim();
  if (/^https?:\/\//i.test(raw)) return raw;
  const u = normalizeContact(raw);
  if (u.length < 2) return '';
  if (/^t\.me(\/|$)/i.test(u)) return 'https://' + u;
  return 'https://t.me/' + u;
}

/** Фолбэк, когда ни один мессенджер не подключён: обычная SMS на номер. */
export function getSmsUrl(phone: string | null | undefined): string {
  const digits = (phone ?? '').replace(/\D/g, '');
  return digits ? `sms:+${digits}` : '';
}

/** tel: с ровно одним «+». */
export function getTelUrl(phone: string | null | undefined): string {
  const digits = (phone ?? '').replace(/\D/g, '');
  return digits ? `tel:+${digits}` : '';
}
