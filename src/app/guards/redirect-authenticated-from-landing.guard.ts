import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { LoginService } from "../auth/login.service";

/**
 * Корень сайта — лэндинг для гостей.
 * Если пользователь уже авторизован (есть cookie токена), отправляем на основной экран.
 */
export const redirectAuthenticatedFromLandingGuard: CanActivateFn = () => {
  const login = inject(LoginService);
  const router = inject(Router);
  if (login.isAuthenticated()) {
    return router.createUrlTree(["/home"]);
  }
  return true;
};
