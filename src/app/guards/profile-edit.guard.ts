import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { filter, map, switchMap, take } from 'rxjs';
import { LoginService } from '../auth/login.service';
import { selectProfileMainClient } from '../ngrx-store/mainClient/store.select';

/**
 * Защищает маршруты редактирования бизнес-профиля.
 *
 * Два уровня проверки:
 *   1. JWT (auth-token-ocpio) — пользователь вообще авторизован?
 *   2. NgRx store — профиль загружен в сессию?
 *
 * Почему нужна проверка store отдельно от JWT:
 *   JWT и profileId-ocpio — независимые cookies с разным временем жизни.
 *   Пользователь может быть аутентифицирован, но profileId-ocpio мог истечь
 *   раньше JWT. В этом случае checkRequestAccount в login.service.ts
 *   не диспатчит профиль в store, и компоненты редактирования работают
 *   с this.profile = null — без ошибок, но и без данных.
 *
 * Ожидает завершения isLoad$ (checkCookie завершил HTTP-запрос),
 * чтобы не срабатывать раньше инициализации приложения.
 */
export const profileEditGuard: CanActivateFn = (_route, _state) => {
  const loginService = inject(LoginService);
  const store = inject(Store);
  const router = inject(Router);

  // Шаг 1: синхронная проверка JWT — если нет токена, сразу на лэндинг
  if (!loginService.isAuthenticated()) {
    return router.createUrlTree(['/']);
  }

  // Шаг 2: ждём завершения инициализации (checkCookie + HTTP /auths/uuid),
  // затем проверяем наличие профиля в store
  return loginService.isLoad$.pipe(
    filter(loaded => loaded),
    take(1),
    switchMap(() => store.pipe(select(selectProfileMainClient), take(1))),
    map(profile => {
      if (profile) return true;

      // Пользователь аутентифицирован, но профиль не попал в store —
      // сессия неполная (истёк profileId-ocpio при живом JWT).
      // Редиректим на '/', где пользователь может выбрать профиль.
      return router.createUrlTree(['/']);
    })
  );
};
