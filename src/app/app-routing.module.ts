import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './layouts/page-not-found/page-not-found.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: 'admin', canActivate: [authGuard, adminGuard], loadChildren: () => import('./layouts/admin/routes').then(mod => mod.ADMIN_ROUTES) },
  { path: '', loadChildren: () => import('./layouts/store/routes').then(mod => mod.STORE_ROUTES) },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
