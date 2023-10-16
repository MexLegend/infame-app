import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../../../services/product.service';
import { Product } from 'src/app/types/product';
import { StoreService } from '../../../../../services/store.service';

@Component({
  selector: 'app-analytic-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytic-cards.component.html',
  styleUrls: ['./analytic-cards.component.scss']
})
export class AnalyticCardsComponent {

  productsInStock: Number = 0;

  constructor(
    private storeService: StoreService,
    private productService: ProductService
  ) {
    this.getProductsInStock();
  }

  getProductsInStock() {
    const getProductsSub$ = this.productService.getProductsInStock({
      storeId: this.storeService.currentStoreId()
    }).subscribe(quantity => {
      this.productsInStock = quantity;
      getProductsSub$.unsubscribe();
    });
  }

}
