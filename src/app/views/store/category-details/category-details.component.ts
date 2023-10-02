import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from 'src/app/components/container/container.component';
import { ProductCardComponent } from 'src/app/components/product-card/product-card.component';
import { ProductFiltersComponent } from 'src/app/components/product-filters/product-filters.component';

@Component({
  selector: 'app-category-details',
  standalone: true,
  imports: [CommonModule, ContainerComponent, ProductCardComponent, ProductFiltersComponent],
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent {

}
