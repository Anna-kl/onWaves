import { Injectable } from '@angular/core';
import { filter, map, switchMap } from 'rxjs';
import { LoginService } from '../app/auth/login.service';
import { ConsentService } from './consent.service';

/**
 * Сессия после лёгкой регистрации гостя: куки + профиль в сторе + согласие на уведомления.
 * Один код для записи (BookingContactModal) и сообщения мастеру из калькулятора.
 */
@Injectable({ providedIn: 'root' })
export class QuickSessionService {
  constructor(
    private readonly login: LoginService,
    private readonly consent: ConsentService,
  ) {}

  apply(token: string, profileUserId: string | null | undefined, phone: string, notifyConsent: boolean): void {
    this.login.session.remember(token, profileUserId);

    if (notifyConsent) {
      this.grantNotifications(profileUserId ?? null, phone);
    }

    this.login.isAutentificate$.next(true);
    this.login.updateProfileUA();
  }

  /** Согласие на уведомления — по актуальной версии текста. Сбой учёта не ломает вход. */
  private grantNotifications(profileUserId: string | null, phone: string): void {
    this.consent.getTextVersions().pipe(
      map(versions => versions?.[0] ?? ''),
      filter(Boolean),
      switchMap(version => this.consent.sendConsentBulk({
        profileUserId,
        phone,
        channels: null,
        isGranted: true,
        consentTextVersion: version,
        source: 'registration',
      })),
    ).subscribe({ error: () => {} });
  }

  /** «8 (916) 123-45-67» → «79161234567»; не российский мобильный — null. */
  static normalizePhone(raw: string): string | null {
    let digits = (raw ?? '').replace(/\D/g, '');
    if (digits.length === 11 && (digits[0] === '7' || digits[0] === '8')) {
      digits = digits.substring(1);
    }
    if (!/^9\d{9}$/.test(digits) || /^(\d)\1+$/.test(digits)) {
      return null;
    }
    return `7${digits}`;
  }
}
