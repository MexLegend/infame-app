import { Component, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from 'src/app/components/container/container.component';
import { ProductCardComponent } from 'src/app/components/product-card/product-card.component';
import { ProductFiltersComponent } from 'src/app/components/product-filters/product-filters.component';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/types/product';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { Category } from 'src/app/types/category';
import { LoadingComponent } from '../../admin/components/loading/loading.component';

@Component({
  selector: 'app-category-details',
  standalone: true,
  imports: [
    CommonModule,
    ContainerComponent,
    ProductCardComponent,
    ProductFiltersComponent,
    LoadingComponent
  ],
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent {

  category?: Category;
  categoryProducts: WritableSignal<Product[]> = signal([]);
  isLoading: boolean = true;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute
  ) {
    this.getCategory();
  }

  getCategory() {
    const { id } = this.activatedRoute.snapshot.params;

    const getCategorySub$ = this.categoryService.getOneCategory(id).subscribe(category => {
      this.category = category;
      this.categoryProducts.set(category.products!);
      this.isLoading = false;
      getCategorySub$.unsubscribe();
    });
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
