import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesBtnComponent } from '../favorites-btn/favorites-btn.component';
import { RouterModule } from '@angular/router';
import { Product } from 'src/app/types/product';
import { FormatPricePipe } from 'src/app/pipes/format-price.pipe';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, FavoritesBtnComponent, RouterModule, FormatPricePipe],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  @Input() product!: Product;

}
