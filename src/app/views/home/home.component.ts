import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from 'src/app/components/container/container.component';
import { BestSellingComponent } from './components/best-selling/best-selling.component';
import { StoresComponent } from './components/stores/stores.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ContainerComponent, BestSellingComponent, StoresComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

}
