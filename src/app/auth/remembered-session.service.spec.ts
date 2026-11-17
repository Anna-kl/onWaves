import { HTTP_INTERCEPTORS, HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DestroyRef, NgZone } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, NEVER, of, Subject } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { RegisterBusinessProfileComponent } from '../components/modals/register-business-profile/register-business-profile.component';
import { IResponse } from '../DTO/classes/IResponse';
import { environment } from '../../enviroments/environment';
import { ProfileService } from '../../services/profile.service';
import { PushDebugService } from '../../services/push-notification.service';
import { UserType } from '../DTO/classes/profiles/profile-user.model';
import { IViewBusinessProfile } from '../DTO/views/business/IViewBussinessProfile';
import { stateReducerMainClient } from '../ngrx-store/mainClient/store.reducer';
import { getActionStateMainProfileClient, renewSessionTokenAction } from '../ngrx-store/mainClient/store.action';
import { initializeAuth, LoginService } from './login.service';
import { RememberedSessionService } from './remembered-session.service';
import { SessionRenewalInterceptor } from './session-renewal.interceptor';
import { QuickSessionService } from '../../services/quick-session.service';
import { ConsentService } from '../../services/consent.service';

describe('Сохранение авторизации', () => {
  let session: RememberedSessionService;
  let http: HttpTestingController;
  let values: Map<string, string>;
  let cookies: { get: jasmine.Spy; check: jasmine.Spy; set: jasmine.Spy; delete: jasmine.Spy };
  let dispatch: jasmine.Spy;
  const token = (id: string, version = 1) => `header.${btoa(JSON.stringify({ SessionId: id, version }))}.signature`;
  const oldToken = token('session');
  const freshToken = token('session', 2);
  const response = { code: 200, message: 'session', data: {
    token: freshToken, profile: { id: 'ua', name: 'Клиент', userType: UserType.User },
  } };
  const renewalUrl = environment.Uri + 'auths/uuid';

  beforeEach(() => {
    values = new Map([['auth-token-ocpio', oldToken], ['uuid-ocpio', 'device'], ['profileId-ocpio', 'ba']]);
    cookies = {
      get: jasmine.createSpy('get').and.callFake((name: string) => values.get(name) ?? ''),
      check: jasmine.createSpy('check').and.callFake((name: string) => values.has(name)),
      set: jasmine.createSpy('set').and.callFake((name: string, value: string) => values.set(name, value)),
      delete: jasmine.createSpy('delete').and.callFake((name: string) => values.delete(name)),
    };
    dispatch = jasmine.createSpy('dispatch');
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: CookieService, useValue: cookies },
        { provide: Store, useValue: { dispatch, pipe: () => of({ isHasLink: false }) } },
        { provide: HTTP_INTERCEPTORS, useClass: SessionRenewalInterceptor, multi: true },
        { provide: ProfileService, useValue: {} },
        { provide: PushDebugService, useValue: { syncExistingSubscription: () => Promise.resolve() } },
        { provide: Router, useValue: { url: '/ba-edit/ba', navigate: jasmine.createSpy('navigate') } },
        { provide: ConsentService, useValue: {} },
        LoginService,
      ],
    });
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('сохраняет токен, выбранный профиль и устройство на 30 дней от активности', () => {
    jasmine.clock().install();
    try {
      const now = new Date('2026-11-03T09:00:00Z');
      jasmine.clock().mockDate(now);
      session = TestBed.inject(RememberedSessionService);
      session.remember(freshToken, 'ba');
      for (const name of ['auth-token-ocpio', 'profileId-ocpio', 'uuid-ocpio']) {
        const call = cookies.set.calls.allArgs().find(args => args[0] === name)!;
        expect(call[2].getTime()).toBe(now.getTime() + 30 * 86_400_000);
        expect(call[3]).toBe('/');
      }
    } finally { jasmine.clock().uninstall(); }
  });

  it('объединяет параллельные обновления и сохраняет возвращённый JWT', () => {
    session = TestBed.inject(RememberedSessionService);
    let completed = 0;
    session.renew().subscribe(() => completed++);
    session.renew().subscribe(() => completed++);
    const request = http.expectOne(renewalUrl);
    expect(request.request.body).toEqual({ token: oldToken, uuid: 'device' });
    request.flush(response);
    expect(completed).toBe(2);
    expect(values.get('auth-token-ocpio')).toBe(freshToken);
    expect(values.get('profileId-ocpio')).toBe('ba');
  });

  it('при сбое сети сохраняет сессию для следующей попытки', () => {
    session = TestBed.inject(RememberedSessionService);
    session.renew().subscribe({ error: () => {} });
    http.expectOne(renewalUrl).error(new ProgressEvent('offline'));
    expect(values.get('auth-token-ocpio')).toBe(oldToken);
    session.renew().subscribe();
    http.expectOne(renewalUrl).flush(response);
    expect(values.get('auth-token-ocpio')).toBe(freshToken);
  });

  it('требует повторный вход, если сервер отклонил сессию по сроку', () => {
    session = TestBed.inject(RememberedSessionService);
    session.renew().subscribe({ error: () => {} });
    http.expectOne(renewalUrl).flush({ code: 401, message: 'Сессия завершена' });
    expect(values.has('auth-token-ocpio')).toBeFalse();
    expect(values.has('profileId-ocpio')).toBeFalse();
  });

  it('запоздалый ответ не возвращает авторизацию после выхода', async () => {
    session = TestBed.inject(RememberedSessionService);
    session.renew().subscribe({ error: () => {} });
    const restore = http.expectOne(renewalUrl);
    const logout = session.logout();
    expect(values.has('auth-token-ocpio')).toBeFalse();
    restore.flush(response);
    http.expectOne(environment.Uri + 'auths/logout').flush({ code: 200 });
    await logout;
    expect(values.has('auth-token-ocpio')).toBeFalse();
  });

  it('отказ старой сессии не стирает вход в другой аккаунт', () => {
    session = TestBed.inject(RememberedSessionService);
    session.renew().subscribe({ error: () => {} });
    const old = http.expectOne(renewalUrl);
    session.remember(token('another-account'), 'another-profile');
    old.flush({ code: 401 });
    expect(values.get('auth-token-ocpio')).toBe(token('another-account'));
    expect(values.get('profileId-ocpio')).toBe('another-profile');
  });

  it('не продлевает вход по таймеру; действие пользователя продлевает сессию', () => {
    jasmine.clock().install();
    try {
      const now = new Date('2026-11-03T09:00:00Z');
      jasmine.clock().mockDate(now);
      session = TestBed.inject(RememberedSessionService);
      jasmine.clock().mockDate(new Date(now.getTime() + 86_400_000));
      http.expectNone(renewalUrl);
      window.dispatchEvent(new Event('pointerdown'));
      http.expectOne(renewalUrl).flush(response);
      window.dispatchEvent(new Event('pointerdown'));
      http.expectNone(renewalUrl);
      expect(values.get('auth-token-ocpio')).toBe(freshToken);
    } finally { jasmine.clock().uninstall(); }
  });

  it('два запроса с истёкшим JWT обновляют его один раз и повторяются', () => {
    const client = TestBed.inject(HttpClient);
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + oldToken });
    client.get(environment.Uri + 'private/one', { headers }).subscribe();
    client.get(environment.Uri + 'private/two', { headers }).subscribe();
    http.expectOne(environment.Uri + 'private/one').flush(null, { status: 401, statusText: 'Unauthorized' });
    http.expectOne(environment.Uri + 'private/two').flush(null, { status: 401, statusText: 'Unauthorized' });
    http.expectOne(renewalUrl).flush(response);
    for (const name of ['one', 'two']) {
      const retry = http.expectOne(environment.Uri + 'private/' + name);
      expect(retry.request.headers.get('Authorization')).toBe('Bearer ' + freshToken);
      retry.flush({ code: 200 });
    }
  });

  it('не добавляет Bearer гостевым запросам и не обновляет токены внешнего API', () => {
    const client = TestBed.inject(HttpClient);
    client.get(environment.Uri + 'public').subscribe();
    const publicRequest = http.expectOne(environment.Uri + 'public');
    expect(publicRequest.request.headers.has('Authorization')).toBeFalse();
    publicRequest.flush({ code: 200 });
    client.get('https://example.test/api', { headers: { Authorization: 'Bearer ' + oldToken } }).subscribe({ error: () => {} });
    http.expectOne('https://example.test/api').flush(null, { status: 401, statusText: 'Unauthorized' });
    http.expectNone(renewalUrl);
  });

  it('обновляет истёкший JWT до обращения к старому API с бизнес-кодами', () => {
    const expired = `header.${btoa(JSON.stringify({ SessionId: 'session', exp: 1 }))}.signature`;
    values.set('auth-token-ocpio', expired);
    TestBed.inject(HttpClient).post(environment.Uri + 'records/add', { value: 'record' }, {
      headers: { Authorization: 'Bearer ' + expired },
    }).subscribe();
    http.expectNone(environment.Uri + 'records/add');
    http.expectOne(renewalUrl).flush(response);
    const request = http.expectOne(environment.Uri + 'records/add');
    expect(request.request.headers.get('Authorization')).toBe('Bearer ' + freshToken);
    expect(request.request.body).toEqual({ value: 'record' });
    request.flush({ code: 201 });
  });

  it('не повторяет старую запись от имени аккаунта, в который вошли позже', () => {
    const client = TestBed.inject(HttpClient);
    client.post(environment.Uri + 'records/add', {}, { headers: { Authorization: 'Bearer ' + oldToken } })
      .subscribe({ error: () => {} });
    const oldRequest = http.expectOne(environment.Uri + 'records/add');
    TestBed.inject(RememberedSessionService).remember(token('another-account'), 'another-profile');
    oldRequest.flush(null, { status: 401, statusText: 'Unauthorized' });
    http.expectNone(renewalUrl);
    http.expectNone(environment.Uri + 'records/add');
    expect(values.get('profileId-ocpio')).toBe('another-profile');
  });

  it('лёгкая регистрация гостя сохраняется вместе с устройством и профилем', () => {
    values.clear();
    TestBed.inject(QuickSessionService).apply(oldToken, 'ua', '79001234567', false);
    expect(values.get('uuid-ocpio')).toBeTruthy();
    const request = http.expectOne(renewalUrl);
    expect(request.request.body.uuid).toBe(values.get('uuid-ocpio'));
    request.flush(response);
    http.expectOne(environment.Uri + 'profiles/get-ba-profile/ua?typeUser=0').flush({ code: 404, data: null });
    expect(TestBed.inject(LoginService).mainCategoriesProfile$.value?.profile?.id).toBe('ua');
  });

  it('инициализация ждёт выбранный BA-профиль до допуска роутера', async () => {
    const login = TestBed.inject(LoginService);
    const initialized = initializeAuth(login)();
    http.expectOne(renewalUrl).flush(response);
    expect(login.isLoad$.value).toBeFalse();
    const profiles = http.expectOne(environment.Uri + 'profiles/get-ba-profile/ua?typeUser=0');
    expect(profiles.request.headers.get('Authorization')).toBe('Bearer ' + freshToken);
    profiles.flush({ code: 200, data: [{ id: 'ba', userType: UserType.Business }] });
    await initialized;
    expect(login.isLoad$.value).toBeTrue();
    expect(login.mainCategoriesProfile$.value?.profile?.id).toBe('ba');
    expect(login.isAutentificate$.value).toBeTrue();
  });

  it('восстанавливает UA, если cookie выбора профиля потерялась', async () => {
    values.delete('profileId-ocpio');
    const login = TestBed.inject(LoginService);
    const initialized = initializeAuth(login)();
    http.expectOne(renewalUrl).flush(response);
    http.expectOne(environment.Uri + 'profiles/get-ba-profile/ua?typeUser=0').flush({ code: 404, data: null });
    await initialized;
    expect(login.mainCategoriesProfile$.value?.profile?.id).toBe('ua');
    expect(values.get('profileId-ocpio')).toBe('ua');
  });

  it('возврат сети после неудачной инициализации сам восстанавливает профиль', async () => {
    const login = TestBed.inject(LoginService);
    const initialized = initializeAuth(login)();
    http.expectOne(renewalUrl).error(new ProgressEvent('offline'));
    await initialized;
    expect(login.isAutentificate$.value).toBeFalse();
    expect(values.get('auth-token-ocpio')).toBe(oldToken);
    window.dispatchEvent(new Event('online'));
    http.expectOne(renewalUrl).flush(response);
    http.expectOne(environment.Uri + 'profiles/get-ba-profile/ua?typeUser=0')
      .flush({ code: 200, data: [{ id: 'ba', userType: UserType.Business }] });
    expect(login.isAutentificate$.value).toBeTrue();
    expect(login.mainCategoriesProfile$.value?.profile?.id).toBe('ba');
  });

  it('SSR не восстанавливает персональную сессию и не записывает cookie', async () => {
    const destroyRef = TestBed.inject(DestroyRef);
    const ssrSession = new RememberedSessionService(TestBed.inject(HttpClient), cookies as unknown as CookieService,
      TestBed.inject(Store), 'server', TestBed.inject(NgZone), destroyRef);
    const login = new LoginService(TestBed.inject(HttpClient), TestBed.inject(Store), cookies as unknown as CookieService,
      TestBed.inject(ProfileService), TestBed.inject(PushDebugService), TestBed.inject(Router), ssrSession, 'server', destroyRef);
    await initializeAuth(login)();
    login.session.remember(freshToken);
    expect(cookies.set).not.toHaveBeenCalled();
    http.expectNone(renewalUrl);
    expect(login.isLoad$.value).toBeTrue();
  });

  it('после создания BA сохраняет вход и выбранный BA до окончания регистрации', async () => {
    values.set('profileId-ocpio', 'ua');
    const created = new Subject<IResponse>();
    const api = { createBAProfile: jasmine.createSpy().and.returnValue(created),
      createWorkLocation: jasmine.createSpy().and.returnValue(NEVER) };
    const login = TestBed.inject(LoginService);
    const component = new RegisterBusinessProfileComponent(null!, null!, null!,
      api as unknown as ProfileService, null!, null!,
      { pipe: () => of(oldToken) } as unknown as Store, login, null!,
      { profileStoreMainProfileClient$: of({ id: 'ua' }) } as any);
    component.registrationForm = new FormGroup({ name: new FormControl('Тест BA'),
      link: new FormControl('qa-business'), phone: new FormControl(null) });
    component.formats = { online: true, fixed: false, mobile: false };
    component.numberStreetPage = 2;
    try {
      component.increment();
      expect(api.createBAProfile.calls.mostRecent().args[0].id).toBeNull();
      created.next({ code: 201, message: '', data: { token: freshToken, profileUserId: 'ba' } });
      created.complete();
      expect(component.submitDone$.value).toBeFalse();
      expect(values.get('auth-token-ocpio')).toBe(freshToken);
      expect(values.get('profileId-ocpio')).toBe('ba');

      const initialized = initializeAuth(login)();
      http.expectOne(renewalUrl).flush({ ...response, data: {
        token: freshToken, profile: { id: 'ba', name: 'Тест BA', userType: UserType.Business },
      } });
      http.expectOne(environment.Uri + 'profiles/get-ba-profile/ba?typeUser=1')
        .flush({ code: 200, data: [{ id: 'ua', userType: UserType.User }] });
      await initialized;
      expect(login.mainCategoriesProfile$.value?.profile?.id).toBe('ba');
      expect(values.get('profileId-ocpio')).toBe('ba');
    } finally {
      component.ngOnDestroy();
    }
  });

  for (const switchedAccount of [false, true]) {
    it(`ответ регистрации BA не возвращает старый вход после ${switchedAccount ? 'смены аккаунта' : 'выхода'}`, () => {
      const created = new Subject<IResponse>();
      const tokenState = new BehaviorSubject(oldToken);
      const api = { createBAProfile: jasmine.createSpy().and.returnValue(created),
        createWorkLocation: jasmine.createSpy().and.returnValue(NEVER) };
      const login = TestBed.inject(LoginService);
      const component = new RegisterBusinessProfileComponent(null!, null!, null!,
        api as unknown as ProfileService, null!, { add: jasmine.createSpy() } as any,
        { pipe: () => tokenState } as unknown as Store, login, null!,
        { profileStoreMainProfileClient$: of({ id: 'ua' }) } as any);
      component.registrationForm = new FormGroup({ name: new FormControl('Тест BA'),
        link: new FormControl('qa-business'), phone: new FormControl(null) });
      component.formats = { online: true, fixed: false, mobile: false };
      component.numberStreetPage = 2;
      component.increment();
      if (switchedAccount) {
        login.session.remember(token('another-account'), 'another-profile');
        tokenState.next(token('another-account'));
      } else {
        login.session.clear();
        tokenState.next('');
      }
      created.next({ code: 201, message: '', data: { token: freshToken, profileUserId: 'ba' } });
      created.complete();
      expect(values.get('auth-token-ocpio')).toBe(switchedAccount ? token('another-account') : undefined);
      expect(values.get('profileId-ocpio')).toBe(switchedAccount ? 'another-profile' : undefined);
      expect(api.createWorkLocation).not.toHaveBeenCalled();
      expect(component.isSubmitting$.value).toBeFalse();
      component.ngOnDestroy();
    });
  }

  it('обновление токена сохраняет выбранный профиль в NgRx', () => {
    const profile = new IViewBusinessProfile();
    profile.id = 'ba';
    profile.userType = UserType.Business;
    const state = stateReducerMainClient(undefined, getActionStateMainProfileClient({
      tokenMainClient: oldToken, profileMainClient: profile,
    }));
    const updated = stateReducerMainClient(state, renewSessionTokenAction({ token: freshToken }));
    expect(updated.profileMainClient).toBe(profile);
    expect(updated.tokenMainClient).toBe(freshToken);
  });
});
