import { Component, Input, Signal, WritableSignal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductColorFilterComponent } from './components/product-color-filter/product-color-filter.component';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/types/product';
import { Category } from 'src/app/types/category';
import { Color } from 'src/app/types/color';
import { Size } from 'src/app/types/size';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ProductSizeFilterComponent } from './components/product-size-filter/product-size-filter.component';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

type ProductFilterType = {
  type: "Color" | "Size";
  id: string;
}

@Component({
  selector: 'app-product-filters',
  standalone: true,
  imports: [
    CommonModule,
    ProductColorFilterComponent,
    ProductSizeFilterComponent,
    ReactiveFormsModule
  ],
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.scss']
})
export class ProductFiltersComponent {

  @Input() categoryProducts!: WritableSignal<Product[]>;
  @Input() category!: WritableSignal<Category | null>;
  @Input() isLoadingProducts!: WritableSignal<boolean>;

  formFiltersChangesSub$!: Subscription;

  colors: Signal<Color[]> = computed(() => this.getCategoryColors());
  sizes: Signal<Size[]> = computed(() => this.getCategorySizes());
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) {
    this.initForm();
    this.pathFormFiltersFormLocalStorage();
    this.handleFormFiltersChanges();
  }

  ngOnDestroy(): void {
    this.formFiltersChangesSub$.unsubscribe();
  }

  getCategoryColors(): Color[] {
    const colorsList = this.category()?.products!.reduce((acc, curr) => {

      curr.colors!.forEach(color => {
        if (!acc.find(item => item.id === color.id)) {
          acc.push(color);
        }
      });

      return acc;
    }, new Array<Color>);

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

  initForm() {
    this.form = this.formBuilder.group({
      colorIds: [null],
      sizeIds: [null]
    });
  }

  pathFormFiltersFormLocalStorage() {
    const productFiltersStorage = localStorage.getItem('product_filters') ? JSON.parse(localStorage.getItem('product_filters')!) : null;
    this.form.patchValue(productFiltersStorage);
    this.handleFilterProducts();
  }

  handleFormFiltersChanges() {
    this.formFiltersChangesSub$ = this.form.valueChanges.subscribe(value => {
      localStorage.setItem('product_filters', JSON.stringify(value));
      this.handleFilterProducts();
    })
  }

  handleFilterProducts() {
    const { colorIds, sizeIds } = this.form.value;
    
    setTimeout(() => {
      this.isLoadingProducts.set(true);
      const { id, storeId } = this.category()!;
      
      const getFilteredProductsSub$ = this.productService.getFilteredProducts({
        limit: 20,
        page: 1,
        storeId,
        categoryId: id,
        ...(colorIds && colorIds.length && { colorIds: JSON.stringify(colorIds) }),
        ...(sizeIds && sizeIds.length && { sizeIds: JSON.stringify(sizeIds) })
      }).subscribe(products => {
        this.categoryProducts.set(products);
        this.isLoadingProducts.set(false);
        getFilteredProductsSub$.unsubscribe();
      });
    }, 50);


  }

}
