import { inject } from '@angular/core';
import { CanActivateFn, ResolveFn, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { filter, map, switchMap, take } from 'rxjs';
import { LoginService } from '../../auth/login.service';
import { UserType } from '../../DTO/classes/profiles/profile-user.model';
import { IViewBusinessProfile } from '../../DTO/views/business/IViewBussinessProfile';
import { selectProfileMainClient } from '../../ngrx-store/mainClient/store.select';

function ownedProfile(id: string | null) {
  const login = inject(LoginService);
  const store = inject(Store);
  return login.isLoad$.pipe(
    filter(Boolean),
    take(1),
    switchMap(() => store.pipe(select(selectProfileMainClient), take(1))),
    map(active => [active, ...login.allProfiles$.value].find(profile =>
      !!id && profile?.id === id && profile.userType === UserType.Business) ?? null),
  );
}

/** Журнал принадлежит профилю в URL; собственный соседний BA не обязан быть активным. */
export const notesProfileGuard: CanActivateFn = route => {
  const router = inject(Router);
  if (!inject(LoginService).isAuthenticated()) return router.createUrlTree(['/']);
  return ownedProfile(route.paramMap.get('id')).pipe(
    map(profile => profile ? true : router.createUrlTree(['/'])),
  );
};

export const notesProfileResolver: ResolveFn<IViewBusinessProfile | null> = route =>
  ownedProfile(route.paramMap.get('id'));
