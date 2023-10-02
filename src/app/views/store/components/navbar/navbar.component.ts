import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from 'src/app/components/logo/logo.component';
import { ContainerComponent } from 'src/app/components/container/container.component';
import { NavbarLinkComponent } from 'src/app/components/navbar-link/navbar-link.component';
import { BagBtnComponent } from 'src/app/components/bag-btn/bag-btn.component';
import { ProfileBtnComponent } from 'src/app/components/profile-btn/profile-btn.component';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    LogoComponent,
    ContainerComponent,
    NavbarLinkComponent,
    BagBtnComponent,
    ProfileBtnComponent,
    RouterModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  isScrolling: boolean = false;

  constructor(public router: Router, public authService: AuthService) { }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (window.scrollY > 64) {
      this.isScrolling = true;

    } else {
      this.isScrolling = false;
    }
  }


}
