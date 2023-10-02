import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../components/footer/footer.component';

@Component({
  selector: 'app-wrapper',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterModule, FooterComponent],
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent {

}
