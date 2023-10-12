import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar-link',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar-link.component.html',
  styleUrls: ['./navbar-link.component.scss']
})
export class NavbarLinkComponent {

  @Input() label: string = "";
  @Input() route: string = "";
  @Input() isActive: boolean = false;
  @Input() isAdminLink: boolean = false;

}
