import { Component, Input, Signal, WritableSignal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductColorFilterComponent } from '../product-color-filter/product-color-filter.component';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/types/product';
import { Category } from 'src/app/types/category';
import { Color, ColorFilter } from 'src/app/types/color';
import { Size } from 'src/app/types/size';

@Component({
  selector: 'app-product-filters',
  standalone: true,
  imports: [CommonModule, ProductColorFilterComponent],
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.scss']
})
export class ProductFiltersComponent {

  @Input() categoryProducts!: WritableSignal<Product[]>;
  @Input() category!: WritableSignal<Category | null>;

  colors: Signal<ColorFilter[]> = computed(() => this.getCategoryColors());
  sizes: Signal<Size[]> = computed(() => this.getCategorySizes());

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) { }

  getCategoryColors(): ColorFilter[] {
    const colorsList = this.category()?.products!.reduce((acc, curr) => {

      curr.colors!.forEach(color => {
        if (!acc.find(item => item.key === color.name)) {
          const colorFilter: ColorFilter = {
            key: color.name,
            value: color.color
          }
          acc.push(colorFilter);
        }
      });

      return acc;
    }, new Array<ColorFilter>);

    return colorsList || [];
  }

  getCategorySizes(): Size[] {
    const sizesList = this.category()?.products!.reduce((acc, curr) => {
      curr.sizes!.forEach(size => {
        if (!acc.find(item => item.name === size.name)) {
          acc.push(size)
        }
      });
      return acc;
    }, new Array<Size>);

    return sizesList || [];
  }

  getProductsByCategory() {

    const { id } = this.activatedRoute.snapshot.params;

    const getRelatedProductsSub$ = this.productService.getProductsByCategory({
      limit: 20,
      page: 1,
      categoryId: id
    }).subscribe(products => {
      this.categoryProducts.set(products);
      getRelatedProductsSub$.unsubscribe();
    });
  }

}
