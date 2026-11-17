/** Цифры как есть. «+7» и пустое поле мастера — это ещё не номер. */
export function phoneDigits(raw: string | null | undefined): string {
  return (raw ?? '').replace(/\D/g, '');
}

/**
 * Номер, по которому можно позвонить и отправить SMS.
 * Код страны без абонентской части («+7», «7», «8») — null: запись без телефона.
 * Полный российский номер возвращается как 7XXXXXXXXXX.
 */
export function ruPhoneOrNull(raw: string | null | undefined): string | null {
  const digits = phoneDigits(raw);
  if (!digits || digits === '7' || digits === '8') {
    return null;
  }
  let normalized = digits;
  if (normalized.length === 11 && (normalized[0] === '7' || normalized[0] === '8')) {
    normalized = '7' + normalized.slice(1);
  } else if (normalized.length === 10) {
    normalized = '7' + normalized;
  }
  return normalized.length === 11 && normalized[0] === '7' ? normalized : null;
}

/**
 * Человеческий вид номера на витрине. ngx-mask в узкой пилюле давал
 * перенос по пробелу и дефису: +7(916) / 437-56- / 96.
 * Неразрывный пробел после кода держит номер одной строкой.
 */
export function formatRuPhone(raw: string | null | undefined): string {
  const digits = phoneDigits(raw);
  if (!digits) {
    return '';
  }
  let local = digits;
  if (local.length === 11 && (local[0] === '7' || local[0] === '8')) {
    local = local.slice(1);
  }
  if (local.length !== 10) {
    return `+${digits}`;
  }
  return `+7(${local.slice(0, 3)})\u00A0${local.slice(3, 6)}-${local.slice(6, 8)}-${local.slice(8)}`;
}
