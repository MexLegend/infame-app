import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from 'src/app/components/container/container.component';
import { NavbarLinkComponent } from 'src/app/components/navbar-link/navbar-link.component';
import { navLinks } from 'src/app/mocks/adminNavLinks';
import { NavLink } from '../../../../types/navLink';
import { ProfileBtnComponent } from 'src/app/components/profile-btn/profile-btn.component';
import { Router } from '@angular/router';
import { StoreSelectComponent } from '../store-select/store-select.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, ContainerComponent, NavbarLinkComponent, ProfileBtnComponent, StoreSelectComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  navLinks: NavLink[] = navLinks;

  constructor(public router: Router){}

}
