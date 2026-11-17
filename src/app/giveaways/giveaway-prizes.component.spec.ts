import { DestroyRef } from '@angular/core';
import { Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { GiveawayAward, GiveawayLoad, GiveawayPrizeQuote } from '../DTO/views/giveaway/giveaway';
import { AnalyticsService } from '../../services/analytics.service';
import { GiveawaysService } from '../../services/giveaways.service';
import { GiveawayPrizesComponent } from './giveaway-prizes.component';
import { prizeDeadline } from '../../helpers/giveaway';

describe('Призы v2: выбор услуг и серверная сумма', () => {
  let component: GiveawayPrizesComponent;
  let api: jasmine.SpyObj<GiveawaysService>;
  let router: jasmine.SpyObj<Router>;
  const award = {
    awardId: 'award', version: 2, campaignCode: 'svetlana-vk-2026-11', status: 'available', canBook: true,
    master: { slug: 'permanent_ozery' },
    policy: { version: 2, capAmountRub: 3500, allowClientTopUp: true, maxVisits: 1 },
  } as GiveawayAward;
  const ready = (ids: string[], payable = 4500): GiveawayLoad<GiveawayPrizeQuote> => ({
    kind: 'ready', value: {
      awardId: 'award', awardVersion: 5, status: 'available', originalAmount: 8000,
      prizeDiscountAmount: 3500, payableAmount: payable,
      lines: ids.map(serviceId => ({ serviceId, name: serviceId, amount: 8000, durationMinutes: 60 })),
    } as GiveawayPrizeQuote,
  });

  beforeEach(() => {
    api = jasmine.createSpyObj('GiveawaysService', ['prizeQuote', 'mine', 'claim']);
    router = jasmine.createSpyObj('Router', ['navigate']);
    api.prizeQuote.and.returnValue(of(ready(['service'])));
    component = new GiveawayPrizesComponent(api, { trackGiveaway: () => {} } as unknown as AnalyticsService,
      router, { onDestroy: () => () => {} } as unknown as DestroyRef, 'browser' as unknown as object);
    sessionStorage.removeItem('ow-prize-draft');
  });

  afterEach(() => sessionStorage.removeItem('ow-prize-draft'));

  it('передаёт к записи выбранную услугу и актуальную версию quote при доплате', () => {
    component.book(award);
    expect(router.navigate).not.toHaveBeenCalled();
    component.choose(award);
    component.toggle(award, 'service');
    expect(component.selection.value?.payableAmount).toBe(4500);
    component.book(award);
    expect(router.navigate).toHaveBeenCalledWith(['/', 'permanent_ozery', 'choose-date'], {
      queryParams: { award: 'award', serviceId: 'service' },
    });
    expect(JSON.parse(sessionStorage.getItem('ow-prize-draft')!).version).toBe(5);
  });

  it('отменяет предыдущий quote при смене выбора', () => {
    const old = new Subject<GiveawayLoad<GiveawayPrizeQuote>>();
    api.prizeQuote.and.returnValues(old, of(ready(['second'], 0)));
    component.choose(award);
    component.toggle(award, 'first');
    component.toggle(award, 'second');
    old.next(ready(['first'], 4500));
    expect(component.selection.value?.lines?.[0].serviceId).toBe('second');
    expect(component.selection.value?.payableAmount).toBe(0);
  });

  it('сохраняет весь набор услуг первого приза для календаря и F5', () => {
    const first = { ...award, policy: { ...award.policy!, allowClientTopUp: true, maxVisits: 2, maxServices: 2 } };
    api.prizeQuote.and.returnValue(of(ready(['one', 'two'], 2000)));
    component.choose(first);
    component.toggle(first, 'one');
    component.toggle(first, 'two');
    expect(component.selectedIds).toEqual(['one', 'two']);
    expect(component.selection.value?.payableAmount).toBe(2000);
    component.book(first);
    expect(router.navigate).toHaveBeenCalledWith(['/', 'permanent_ozery', 'choose-date'], {
      queryParams: { award: 'award', serviceId: 'one', services: 'one,two' },
    });
    expect(JSON.parse(sessionStorage.getItem('ow-prize-draft')!).serviceId).toBe('one,two');
  });

  it('учитывает выполненные и зарезервированные услуги в общем пределе первого приза', () => {
    const first = { ...award, completedServices: 1, reservedServices: 0,
      policy: { ...award.policy!, allowClientTopUp: true, maxVisits: 2, maxServices: 2 } };
    component.choose(first);
    component.toggle(first, 'correction');
    expect(component.serviceLimitReached(first, 'third')).toBeTrue();
    component.toggle(first, 'third');
    expect(component.selectedIds).toEqual(['correction']);
    expect(api.prizeQuote).toHaveBeenCalledTimes(1);
    component.toggle(first, 'correction');
    expect(component.serviceLimitReached(first, 'third')).toBeFalse();
  });

  it('получает назначенный приз без повторного OTP для уже подтверждённой сессии', () => {
    api.mine.and.returnValue(of({ kind: 'ready', value: { status: 'ready', items: [{ ...award, status: 'assigned' }] } }));
    api.claim.and.returnValue(of({ kind: 'ready', value: { status: 'ready', items: [award] } }));
    component.reload();
    expect(api.claim).toHaveBeenCalled();
    expect(component.items[0].status).toBe('available');
  });

  it('показывает включительное 10 января при исключительной границе API', () => {
    expect(prizeDeadline('2027-01-10T21:00:00Z')).toBe('10 января');
  });
});
