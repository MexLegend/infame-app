import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LogoComponent } from '../../components/logo/logo.component';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [CommonModule, LogoComponent, RouterModule],
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {

}
