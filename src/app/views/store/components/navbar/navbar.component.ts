import { Component, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from 'src/app/components/logo/logo.component';
import { ContainerComponent } from 'src/app/components/container/container.component';
import { NavbarLinkComponent } from 'src/app/components/navbar-link/navbar-link.component';
import { BagBtnComponent } from 'src/app/components/bag-btn/bag-btn.component';
import { ProfileBtnComponent } from 'src/app/components/profile-btn/profile-btn.component';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { NavLink } from 'src/app/types/navLink';
import { Subscription } from 'rxjs';

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

  @Input() navLinks: NavLink[] = [];

  getRouteDataSub$!: Subscription;

  transparentNavbar: boolean = false;
  isScrolling: boolean = false;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public authService: AuthService
  ) {
    this.handleTransparentNavbar();
  }

  ngOnDestroy(): void {
    this.getRouteDataSub$.unsubscribe();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (window.scrollY > 64) {
      this.isScrolling = true;

    } else {
      this.isScrolling = false;
    }
  }

  handleTransparentNavbar() {
    this.getRouteDataSub$ = this.route.data.subscribe(data => {
      this.transparentNavbar = data['transparentNavbar'];
    });
  }

}
