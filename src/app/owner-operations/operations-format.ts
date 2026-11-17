import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'operationsMoney', standalone: true })
export class OperationsMoneyPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    return value == null ? 'Нужно уточнить' : new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: value % 100 ? 2 : 0, maximumFractionDigits: 2 }).format(value / 100);
  }
}
export function moscowDateTime(value = new Date()): string {
  const parts = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Moscow', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(value);
  return parts.replace(' ', 'T');
}
/** Parse user input only. Contributions, discounts and remaining balances are exclusively server values. */
export function inputKopecks(text: string): number | null {
  if (!text.trim()) return null;
  if (!/^\d{1,10}([.,]\d{1,2})?$/.test(text.trim())) throw new Error('Введите сумму в рублях, до двух знаков после запятой');
  const [rub, fraction = ''] = text.trim().replace(',', '.').split('.');
  return Number(rub) * 100 + Number(fraction.padEnd(2, '0'));
}
