import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { loggedInGuard } from './guards/loggedIn.guard';
import { RegisterComponent } from './views/auth/register/register.component';
import { LoginComponent } from './views/auth/login/login.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: 'admin', canActivate: [authGuard, adminGuard], loadChildren: () => import('./views/admin/routes').then(mod => mod.ADMIN_ROUTES) },
    { path: '', loadChildren: () => import('./views/home/routes').then(mod => mod.HOME_ROUTES) },
    { path: '', loadChildren: () => import('./views/store/routes').then(mod => mod.STORE_ROUTES) },
    { path: 'signup', canActivate: [loggedInGuard], component: RegisterComponent },
    { path: 'signin', canActivate: [loggedInGuard], component: LoginComponent },
    { path: '**', component: PageNotFoundComponent }
  ];
  