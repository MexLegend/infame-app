import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DropdownComponent, MenuOptions } from '../dropdown/dropdown.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile-btn',
  standalone: true,
  imports: [CommonModule, MatIconModule, DropdownComponent],
  templateUrl: './profile-btn.component.html',
  styleUrls: ['./profile-btn.component.scss']
})
export class ProfileBtnComponent {

  constructor(
    private authService: AuthService,
    public router: Router
  ) { }

  getPerfilMenuOptions(): MenuOptions {
    const menuItems = [
      {
        label: "My favorites",

        click: () => this.router.navigate(["/favorites"])
      },
      {
        isDivider: true
      },
      {
        label: "Logout",
        click: this.handleLogout
      }
    ];

    return { menuItems };
  }

  handleLogout = () => {
    this.authService.logout();
  }

}
