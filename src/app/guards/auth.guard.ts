import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route) => {

  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);

  const user = () => authService.getCurrentUser();
  const superAdmin = route.data['superAdmin'];

  if (user()?.role === "ADMINISTRADOR" || (!superAdmin && user()?.role === "ABOGADO")) {
    return true;
  }

  router.navigate(["/"]);

  return false;
};
