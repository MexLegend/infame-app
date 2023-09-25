import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BestSellingComponent } from './components/best-selling/best-selling.component';
import { HeroComponent } from './components/hero/hero.component';
import { FooterComponent } from '../components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeroComponent, BestSellingComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

}
