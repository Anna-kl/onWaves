import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { filter, map, switchMap, take } from 'rxjs';
import { OwnerOperationsService } from '../../services/owner-operations.service';
import { LoginService } from '../auth/login.service';

export const ownerOperationsGuard: CanActivateFn = () => {
  if (!isPlatformBrowser(inject(PLATFORM_ID))) return true; // anonymous SSR shell, no capability/data requests
  const service = inject(OwnerOperationsService); const login = inject(LoginService); const router = inject(Router);
  return login.isLoad$.pipe(filter(Boolean), take(1), switchMap(() => service.allowed()),
    map(allowed => allowed || router.createUrlTree(['/admin/operations/access'])));
};
