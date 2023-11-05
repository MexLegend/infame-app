import { Component, Input, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavLink } from 'src/app/types/navLink';
import { NavbarLinkComponent } from '../navbar-link/navbar-link.component';
import { Router } from '@angular/router';
import { navLinks } from 'src/app/mocks/adminNavLinks';

@Component({
  selector: 'app-navbar-menu',
  standalone: true,
  imports: [CommonModule, NavbarLinkComponent],
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.scss']
})
export class NavbarMenuComponent {

  @Input() isOpen!: WritableSignal<boolean>;
  @Input() activeRoute: string = "";
  @Input() adminView: boolean = false;
  @Input() isLoggedIn: boolean = false;
  @Input() navLinks: NavLink[] = navLinks;

  constructor(public router: Router) { }

}
