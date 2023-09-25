import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { ApiRoutesComponent } from '../components/api-routes/api-routes.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-wrapper',
  standalone: true,
  imports: [CommonModule, NavbarComponent, BreadcrumbComponent, ApiRoutesComponent, RouterModule],
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent {

}
