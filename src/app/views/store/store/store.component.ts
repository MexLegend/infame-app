import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BestSellingComponent } from './components/best-selling/best-selling.component';
import { HeroComponent } from './components/hero/hero.component';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [CommonModule, HeroComponent, BestSellingComponent],
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent {

}
