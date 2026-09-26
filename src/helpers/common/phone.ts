/**
 * Человеческий вид номера на витрине. ngx-mask в узкой пилюле давал
 * перенос по пробелу и дефису: +7(916) / 437-56- / 96.
 * Неразрывный пробел после кода держит номер одной строкой.
 */
export function formatRuPhone(raw: string | null | undefined): string {
  const digits = (raw ?? '').replace(/\D/g, '');
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
