import { Md5 } from 'ts-md5';
import { CookieService } from 'ngx-cookie-service';
import { IResponse } from '../../app/DTO/classes/IResponse';
import {
  IMaxLoginStart,
  IMaxLoginStatus,
  MaxLoginState,
} from '../../app/DTO/views/auth/IMaxLogin';

/** Newtonsoft на бэке по умолчанию PascalCase; читаем оба варианта. */
export function pickField<T>(payload: unknown, ...keys: string[]): T | undefined {
  if (!payload || typeof payload !== 'object') {
    return undefined;
  }
  const record = payload as Record<string, unknown>;
  for (const key of keys) {
    const value = record[key];
    if (value !== undefined && value !== null && value !== '') {
      return value as T;
    }
  }
  return undefined;
}

/** Код лежит в теле, HTTP-статус у этих ручек почти всегда 200. */
export function authBodyCode(result: IResponse | null | undefined, httpStatus?: number): number {
  if (result && typeof result.code === 'number') {
    return result.code;
  }
  return httpStatus ?? 0;
}

export function parseIsMaxLinked(result: IResponse | null | undefined): boolean | null {
  const payload = result?.data ?? result;
  const flag = pickField<boolean>(payload, 'isLinked', 'IsLinked');
  if (typeof flag === 'boolean') {
    return flag;
  }
  return null;
}

export function parseSessionId(payload: unknown): string {
  if (typeof payload === 'string' && payload.length > 0) {
    return payload;
  }
  const id = pickField<unknown>(payload, 'sessionId', 'SessionId');
  return id != null ? String(id) : '';
}

export function parseMaxLoginStart(result: IResponse | null | undefined): IMaxLoginStart | null {
  const payload = result?.data;
  if (!payload || typeof payload !== 'object') {
    return null;
  }
  const sessionId = parseSessionId(payload);
  const link = pickField<string>(payload, 'link', 'Link') ?? '';
  const expires = pickField<string>(payload, 'expiresAt', 'ExpiresAt') ?? '';
  if (!sessionId || !link) {
    return null;
  }
  return { sessionId, link, expiresAt: String(expires) };
}

export function parseMaxLoginState(value: unknown): MaxLoginState | null {
  const numeric = typeof value === 'number' ? value : Number(value);
  if (
    numeric === MaxLoginState.Waiting
    || numeric === MaxLoginState.ContactRequested
    || numeric === MaxLoginState.CodeSent
    || numeric === MaxLoginState.Authorized
    || numeric === MaxLoginState.Expired
  ) {
    return numeric;
  }
  return null;
}

export function parseMaxLoginStatus(result: IResponse | null | undefined): IMaxLoginStatus | null {
  if (authBodyCode(result) === 404) {
    return { sessionId: '', state: MaxLoginState.Expired };
  }
  const payload = result?.data;
  const sessionId = parseSessionId(payload);
  const state = parseMaxLoginState(pickField(payload, 'state', 'State'));
  if (state == null) {
    return null;
  }
  return { sessionId, state };
}

/**
 * Отпечаток устройства для сессии входа. Код из MAX вводят в том же браузере,
 * который запросил ссылку — иначе чужой диплинк авторизовал бы чужую сессию.
 */
export function ensureDeviceUuid(cookies: CookieService, seed = ''): string {
  if (cookies.check('uuid-ocpio')) {
    return cookies.get('uuid-ocpio');
  }
  const md5 = new Md5();
  const id = md5.appendStr(`${new Date().toLocaleDateString()}${seed || Math.random()}`)
    .end()!
    .toString()
    .substring(20);
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 365);
  cookies.set('uuid-ocpio', id, expiry, '/');
  return id;
}

export function openMaxBotWindow(url: string, popup?: Window | null): void {
  if (popup && !popup.closed) {
    popup.opener = null;
    popup.location.href = url;
    return;
  }
  window.open(url, '_blank', 'noopener,noreferrer');
}
