import {
  authBodyCode,
  parseIsMaxLinked,
  parseMaxLoginStart,
  parseMaxLoginStatus,
  parseSessionId,
} from './max-auth';
import { MaxLoginState } from '../../app/DTO/views/auth/IMaxLogin';

describe('max-auth parsers', () => {
  it('reads body.code, not HTTP status', () => {
    expect(authBodyCode({ code: 409, message: '', data: null }, 200)).toBe(409);
    expect(authBodyCode(null, 502)).toBe(502);
  });

  it('accepts PascalCase and camelCase from Newtonsoft', () => {
    expect(parseIsMaxLinked({ code: 200, message: '', data: { IsLinked: true } })).toBeTrue();
    expect(parseIsMaxLinked({ code: 200, message: '', data: { isLinked: false } })).toBeFalse();
    expect(parseSessionId({ SessionId: 'abc' })).toBe('abc');
    expect(parseSessionId('live-session')).toBe('live-session');
  });

  it('parses max/login start payload', () => {
    const parsed = parseMaxLoginStart({
      code: 200,
      message: '',
      data: {
        SessionId: '11111111-1111-1111-1111-111111111111',
        Link: 'https://max.ru/id5019004343_bot?start=token',
        ExpiresAt: '2026-09-17T12:00:00Z',
      },
    });
    expect(parsed?.link).toContain('max.ru');
    expect(parsed?.sessionId).toContain('1111');
  });

  it('maps missing login session to expired', () => {
    const parsed = parseMaxLoginStatus({ code: 404, message: 'Сессия не найдена', data: null });
    expect(parsed?.state).toBe(MaxLoginState.Expired);
  });
});
