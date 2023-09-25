import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductColorFilterComponent } from '../product-color-filter/product-color-filter.component';

@Component({
  selector: 'app-product-filters',
  standalone: true,
  imports: [CommonModule, ProductColorFilterComponent],
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.scss']
})
export class ProductFiltersComponent {

  sizes: string[] = ["XS", "X", "M", "L"];

}
