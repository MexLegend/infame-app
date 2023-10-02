import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './layouts/page-not-found/page-not-found.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { loggedInGuard } from './guards/loggedIn.guard';
import { RegisterComponent } from './layouts/auth/register/register.component';
import { LoginComponent } from './layouts/auth/login/login.component';

const routes: Routes = [
  { path: 'admin', canActivate: [authGuard, adminGuard], loadChildren: () => import('./layouts/admin/routes').then(mod => mod.ADMIN_ROUTES) },
  { path: '', loadChildren: () => import('./layouts/store/routes').then(mod => mod.STORE_ROUTES) },
  { path: 'signup', canActivate: [loggedInGuard], component: RegisterComponent },
  { path: 'signin', canActivate: [loggedInGuard], component: LoginComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
