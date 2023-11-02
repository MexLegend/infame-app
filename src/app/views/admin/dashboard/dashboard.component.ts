import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { CartComponent } from '../../home/cart/cart.component';
import { AnalyticCardsComponent } from './components/analytic-cards/analytic-cards.component';
import { GraphicComponent } from './components/graphic/graphic.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent, AnalyticCardsComponent, GraphicComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

}
