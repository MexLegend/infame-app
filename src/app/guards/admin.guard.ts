import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route) => {

  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);

  const user = () => authService.getCurrentUser();

  if (user()?.role === "ADMIN") {
    return true;
  }

  router.navigate(["/"]);

  return false;

};
