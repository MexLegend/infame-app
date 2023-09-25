import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSelectSizeControlsComponent } from '../product-select-size-controls/product-select-size-controls.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-buy-controls',
  standalone: true,
  imports: [CommonModule, ProductSelectSizeControlsComponent, MatIconModule],
  templateUrl: './product-buy-controls.component.html',
  styleUrls: ['./product-buy-controls.component.scss']
})
export class ProductBuyControlsComponent {

}
