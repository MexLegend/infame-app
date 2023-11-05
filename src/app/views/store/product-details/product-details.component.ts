import { Component, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from 'src/app/components/container/container.component';
import { ProductCardComponent } from 'src/app/components/product-card/product-card.component';
import { ProductPreviewControlsComponent } from '../../../components/product-preview-controls/product-preview-controls.component';
import { ProductBuyControlsComponent } from 'src/app/components/product-buy-controls/product-buy-controls.component';
import { Product } from 'src/app/types/product';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingComponent } from '../../admin/components/loading/loading.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule,
    ContainerComponent,
    ProductCardComponent,
    ProductPreviewControlsComponent,
    ProductBuyControlsComponent,
    LoadingComponent
  ],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {

  getRouteDataSub$!: Subscription;

  product!: Product;
  relatedProducts: Product[] = [];
  activeProductImage: WritableSignal<number> = signal(0);
  isLoading: boolean = true;

  constructor(
    private productService: ProductService,
    private ativatedRoute: ActivatedRoute
  ) {
    this.getRouteParams();
  }

  ngOnDestroy(): void {
    this.getRouteDataSub$.unsubscribe();
  }

  getRouteParams() {
    this.getRouteDataSub$ = this.ativatedRoute.params.subscribe(({ id }) => {
      this.getProduct(id);
      this.activeProductImage.set(0);
    });
  }

  getProduct(id: string) {
    this.isLoading = true;
    
    const getProductSub$ = this.productService.getOneProduct(id).subscribe(product => {
      this.product = product;
      this.isLoading = false;
      this.getRelatedProducts(product.categoryId, product.id!)
      getProductSub$.unsubscribe();
    });
  }

  getRelatedProducts(categoryId: string, productId: string) {
    const getFilteredProductsSub$ = this.productService.getFilteredProducts({
      limit: 4,
      page: 1,
      categoryId,
      productId
    }).subscribe(products => {
      this.relatedProducts = products;
      getFilteredProductsSub$.unsubscribe();
    });
  }

}
