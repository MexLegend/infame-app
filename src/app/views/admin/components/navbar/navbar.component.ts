import { Component, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from 'src/app/components/container/container.component';
import { NavbarLinkComponent } from 'src/app/components/navbar-link/navbar-link.component';
import { navLinks } from 'src/app/mocks/adminNavLinks';
import { NavLink } from '../../../../types/navLink';
import { ProfileBtnComponent } from 'src/app/components/profile-btn/profile-btn.component';
import { Router } from '@angular/router';
import { StoreSelectComponent } from '../store-select/store-select.component';
import { AuthService } from 'src/app/services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { NavbarMenuComponent } from 'src/app/components/navbar-menu/navbar-menu.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    ContainerComponent,
    NavbarLinkComponent,
    ProfileBtnComponent,
    StoreSelectComponent,
    NavbarMenuComponent,
    MatIconModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  navLinks: NavLink[] = navLinks;
  isNavbarMenuOpen: WritableSignal<boolean> = signal(false);

  constructor(public router: Router, public authService: AuthService) { }

  handleShowNavbarMenu() {
    this.isNavbarMenuOpen.set(!this.isNavbarMenuOpen())
  }

}
