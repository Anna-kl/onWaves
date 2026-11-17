import { fakeAsync, flushMicrotasks, tick } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject, of, Subject, throwError } from 'rxjs';
import { ConsentChannel } from '../../DTO/enums/consentChannel';
import { IViewBusinessProfile } from '../../DTO/views/business/IViewBussinessProfile';
import { IViewConsent } from '../../DTO/views/consent/IViewConsent';
import { PushDeviceResult } from 'src/services/push-notification.service';
import { SettingsComponent } from './settings.component';

const profile = (id: string) => ({ id, userType: 0 } as IViewBusinessProfile);
const record = (channel: ConsentChannel, isGranted: boolean, isSubscribed: boolean) =>
  ({ channel, isGranted, isSubscribed } as IViewConsent);
const device = (state: PushDeviceResult['state']) => ({
  state, diagnostics: { isIOS: true },
} as PushDeviceResult);

describe('Notification settings', () => {
  let profiles: BehaviorSubject<IViewBusinessProfile[]>;
  let consent: jasmine.SpyObj<any>;
  let push: jasmine.SpyObj<any>;
  let toasts: jasmine.SpyObj<any>;
  let modal: jasmine.SpyObj<any>;
  let settings: SettingsComponent;
  let rows: IViewConsent[];

  beforeEach(() => {
    profiles = new BehaviorSubject([profile('personal')]);
    rows = [record(ConsentChannel.Push, true, true)];
    consent = jasmine.createSpyObj('consent', ['getTextVersions', 'getProfileConsents', 'sendConsent', 'revokeAllConsents']);
    consent.getTextVersions.and.returnValue(of(['v1']));
    consent.getProfileConsents.and.callFake(() => of(rows));
    consent.sendConsent.and.returnValue(of({ code: 200 }));
    consent.revokeAllConsents.and.returnValue(of({ code: 200 }));
    push = jasmine.createSpyObj('push', ['checkDevice', 'invalidateCheck']);
    push.checkDevice.and.returnValue(Promise.resolve(device('connected')));
    toasts = jasmine.createSpyObj('toasts', ['add']);
    modal = jasmine.createSpyObj('modal', ['open']);
    settings = new SettingsComponent(new FormBuilder(), {} as any, toasts, {
      allProfiles$: profiles, isProfileId: () => 'personal',
    } as any, consent, {} as any, {} as any, modal, push, 'browser');
  });

  afterEach(() => settings.ngOnDestroy());

  const pushRow = (component: SettingsComponent) =>
    component.consentItems.find(row => row.channel === ConsentChannel.Push)!;

  function toggle(granted: boolean) {
    settings.onToggleConsent(pushRow(settings), { target: { checked: granted } } as unknown as Event);
  }

  it('waits for the in-flight device check even when aggregate consent reports a subscription', fakeAsync(() => {
    let done!: (value: PushDeviceResult) => void;
    push.checkDevice.and.returnValue(new Promise(resolve => { done = resolve; }));
    settings.ngOnInit();
    expect(settings.pushStatusText).toBe('Проверяем подключение…');
    expect(pushRow(settings).isSubscribed).toBeFalse();
    done(device('connected'));
    flushMicrotasks();
    expect(settings.pushStatusText).toBe('Подключено на этом устройстве');
    expect(settings.canSetUpPush).toBeFalse();
  }));

  it('keeps another device from marking this one connected', fakeAsync(() => {
    push.checkDevice.and.returnValue(Promise.resolve(device('permission')));
    settings.ngOnInit();
    flushMicrotasks();
    expect(settings.pushStatusText).toBe('Требуется разрешение устройства');
    expect(settings.canSetUpPush).toBeTrue();
    expect(pushRow(settings).isGranted).toBeTrue();
    expect(pushRow(settings).isSubscribed).toBeFalse();
  }));

  it('shows a verification error after a successful save and supports retry', fakeAsync(() => {
    push.checkDevice.and.returnValues(
      Promise.resolve(device('permission')), Promise.resolve(device('unverified')), Promise.resolve(device('connected')),
    );
    modal.open.and.returnValue({ componentInstance: {}, result: Promise.resolve('push-subscribed'), dismiss: () => {} });
    settings.ngOnInit();
    flushMicrotasks();
    settings.openSubscribeModal(pushRow(settings));
    flushMicrotasks();
    expect(push.checkDevice.calls.mostRecent().args).toEqual(['personal', false]);
    expect(settings.pushStatusText).toBe('Не удалось проверить подключение');
    expect(settings.canSetUpPush).toBeFalse();
    expect(toasts.add).not.toHaveBeenCalled();
    settings.retryPushCheck();
    flushMicrotasks();
    expect(settings.pushStatusText).toBe('Подключено на этом устройстве');
  }));

  it('ignores a late sync after revoke and rechecks after individual and mass re-enable', fakeAsync(() => {
    let stale!: (value: PushDeviceResult) => void;
    push.checkDevice.and.returnValue(new Promise(resolve => { stale = resolve; }));
    settings.ngOnInit();
    toggle(false);
    stale(device('connected'));
    flushMicrotasks();
    expect(pushRow(settings).isGranted).toBeFalse();
    expect(pushRow(settings).isSubscribed).toBeFalse();
    push.checkDevice.and.returnValue(Promise.resolve(device('connected')));
    toggle(true);
    flushMicrotasks();
    expect(pushRow(settings).isSubscribed).toBeTrue();
    modal.open.and.returnValue({ componentInstance: {}, result: Promise.resolve('revoke'), dismiss: () => {} });
    settings.unsubscribeFromAll();
    flushMicrotasks();
    expect(pushRow(settings).isGranted).toBeFalse();
    expect(pushRow(settings).isSubscribed).toBeFalse();
    toggle(true);
    flushMicrotasks();
    expect(push.checkDevice).toHaveBeenCalledTimes(3);
    expect(pushRow(settings).isSubscribed).toBeTrue();
  }));

  it('rechecks returning from system settings and ignores results belonging to another profile', fakeAsync(() => {
    let stale!: (value: PushDeviceResult) => void;
    push.checkDevice.and.returnValues(Promise.resolve(device('denied')),
      new Promise(resolve => { stale = resolve; }));
    settings.ngOnInit();
    flushMicrotasks();
    spyOnProperty(document, 'visibilityState', 'get').and.returnValue('visible');
    window.dispatchEvent(new Event('focus'));
    tick(150);
    expect(push.checkDevice.calls.count()).toBe(2);
    rows = [];
    profiles.next([profile('another')]);
    stale(device('connected'));
    flushMicrotasks();
    expect(settings.profile?.id).toBe('another');
    expect(pushRow(settings).isGranted).toBeFalse();
    expect(pushRow(settings).isSubscribed).toBeFalse();
    expect(settings.pushResult).toBeUndefined();
  }));

  it('keeps Telegram awaiting confirmation until refreshed from the API', fakeAsync(() => {
    rows = [record(ConsentChannel.Telegram, true, false)];
    modal.open.and.returnValue({ componentInstance: {}, result: Promise.resolve('subscribed'), dismiss: () => {} });
    settings.ngOnInit();
    const row = settings.consentItems.find(item => item.channel === ConsentChannel.Telegram)!;
    settings.openSubscribeModal(row);
    flushMicrotasks();
    expect(settings.telegramHandoffPending).toBeTrue();
    expect(row.isSubscribed).toBeFalse();
    consent.getProfileConsents.and.returnValue(throwError(() => new Error('offline')));
    settings.retryPushCheck();
    expect(settings.consentReadFailed).toBeTrue();
    expect(row.isSubscribed).toBeFalse();
    consent.getProfileConsents.and.returnValue(of([record(ConsentChannel.Telegram, true, true)]));
    settings.retryPushCheck();
    expect(row.isSubscribed).toBeTrue();
    expect(settings.telegramHandoffPending).toBeFalse();
  }));

  it('ignores a stale account read after an opt-out', fakeAsync(() => {
    settings.ngOnInit();
    const stale = new Subject<IViewConsent[]>();
    consent.getProfileConsents.and.returnValue(stale);
    settings.retryPushCheck();
    toggle(false);
    stale.next([record(ConsentChannel.Push, true, true)]);
    flushMicrotasks();
    expect(pushRow(settings).isGranted).toBeFalse();
  }));
});
