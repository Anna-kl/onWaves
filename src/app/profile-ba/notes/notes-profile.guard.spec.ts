import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, convertToParamMap, Router, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { BehaviorSubject, firstValueFrom, isObservable, of } from 'rxjs';
import { LoginService } from '../../auth/login.service';
import { IViewBusinessProfile } from '../../DTO/views/business/IViewBussinessProfile';
import { notesProfileGuard, notesProfileResolver } from './notes-profile.guard';

describe('Booking journal ownership and profile', () => {
  const target = { id: 'target-ba', userType: 1 } as IViewBusinessProfile;
  const active = { id: 'other-active-ba', userType: 1 } as IViewBusinessProfile;
  let login: { isAuthenticated: jasmine.Spy; isLoad$: BehaviorSubject<boolean>; allProfiles$: BehaviorSubject<IViewBusinessProfile[]> };
  const route = { paramMap: convertToParamMap({ id: target.id }) } as ActivatedRouteSnapshot;

  beforeEach(() => {
    login = { isAuthenticated: jasmine.createSpy().and.returnValue(true), isLoad$: new BehaviorSubject(true), allProfiles$: new BehaviorSubject([target]) };
    TestBed.configureTestingModule({ imports: [RouterTestingModule], providers: [
      { provide: LoginService, useValue: login },
      { provide: Store, useValue: { pipe: () => of(active) } },
    ] });
  });

  async function guard() {
    const result = TestBed.runInInjectionContext(() => notesProfileGuard(route, {} as RouterStateSnapshot));
    return isObservable(result) ? firstValueFrom(result) : result;
  }

  it('permits an owned non-active BA and resolves that exact profile', async () => {
    expect(await guard()).toBeTrue();
    const result = TestBed.runInInjectionContext(() => notesProfileResolver(route, {} as RouterStateSnapshot));
    const profile = isObservable(result) ? await firstValueFrom(result) : await result;
    expect(profile).toBe(target);
  });

  it('does not substitute the active BA for a foreign URL', async () => {
    login.allProfiles$.next([]);
    expect(TestBed.inject(Router).serializeUrl(await guard() as any)).toBe('/');
  });

  it('blocks an anonymous session before creating a journal', async () => {
    login.isAuthenticated.and.returnValue(false);
    expect(TestBed.inject(Router).serializeUrl(await guard() as any)).toBe('/');
  });

  it('waits for session initialization before deciding ownership', async () => {
    login.isLoad$.next(false);
    let resolved = false;
    const pending = guard().then(value => { resolved = true; return value; });
    await Promise.resolve();
    expect(resolved).toBeFalse();
    login.isLoad$.next(true);
    expect(await pending).toBeTrue();
  });
});
