import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CanActivateFn, Router } from '@angular/router';

export const loggedInGuard: CanActivateFn = (route) => {

    const router: Router = inject(Router);
    const authService: AuthService = inject(AuthService);

    if (!authService.isLoggedIn()) {
        return true;
    }

    router.navigate(["/"]);
    return false;

};

