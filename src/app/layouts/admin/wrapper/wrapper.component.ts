import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { ContainerComponent } from 'src/app/components/container/container.component';

@Component({
  selector: 'app-wrapper',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ContainerComponent, RouterModule],
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent {

}
