import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DropdownComponent, MenuOption, MenuOptions } from '../dropdown/dropdown.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SafeUser } from '../../types/user';
import { ImgPipe } from 'src/app/pipes/img.pipe';

@Component({
  selector: 'app-profile-btn',
  standalone: true,
  imports: [CommonModule, MatIconModule, DropdownComponent, ImgPipe],
  templateUrl: './profile-btn.component.html',
  styleUrls: ['./profile-btn.component.scss']
})
export class ProfileBtnComponent {

  @Input() user!: SafeUser;
  @Input() isAdminView: boolean = false;

  constructor(
    private authService: AuthService,
    public router: Router
  ) { }

  getPerfilMenuOptions(): MenuOptions {
    const menuItems: MenuOption[] = [
      {
        label: this.isAdminView ? "Back to store" : "Dashboard",

        click: () => this.router.navigate([this.isAdminView ? "/" : "/admin"])
      },
      {
        isDivider: true
      },
      {
        label: "Logout",
        click: this.handleLogout
      }
    ];

    if (!this.isAdminView) {
      menuItems.splice(
        1,
        0,
        {
          label: "My favorites",

          click: () => this.router.navigate(["/favorites"])
        }
      );
    }

    return { menuItems };
  }

  handleLogout = () => {
    this.authService.logout();
  }

}
