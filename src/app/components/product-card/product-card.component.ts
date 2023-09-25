import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesBtnComponent } from '../favorites-btn/favorites-btn.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, FavoritesBtnComponent, RouterModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

}
