import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ProductService } from '../../../../../services/product.service';
import { StoreService } from '../../../../../services/store.service';
import { OrderService } from '../../../../../services/order.service';
import { GraphData } from 'src/app/types/order';

@Component({
  selector: 'app-analytic-cards',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './analytic-cards.component.html',
  styleUrls: ['./analytic-cards.component.scss']
})
export class AnalyticCardsComponent {

  totalRevenue: number = 0;
  salesCount: number = 0;
  productsInStock: number = 0;

  constructor(
    private storeService: StoreService,
    private productService: ProductService,
    private orderService: OrderService
  ) {
    this.getTotalRevenue();
    this.getSalesCount();
    this.getProductsInStock();
  }

  getTotalRevenue() {
    const getTotalRevenueSub$ = this.orderService.getTotalRevenue(this.storeService.currentStoreId())
      .subscribe(totalRevenue => {
        this.totalRevenue = totalRevenue;
        getTotalRevenueSub$.unsubscribe();
      });
  }

  getSalesCount() {
    const getSalesCountSub$ = this.orderService.getSalesCount(this.storeService.currentStoreId())
      .subscribe(salesCount => {
        this.salesCount = salesCount;
        getSalesCountSub$.unsubscribe();
      });
  }

  getProductsInStock() {
    const getProductsInStockSub$ = this.productService.getProductsInStock({
      storeId: this.storeService.currentStoreId()
    }).subscribe(quantity => {
      this.productsInStock = quantity;
      getProductsInStockSub$.unsubscribe();
    });
  }

}
