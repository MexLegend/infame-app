import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from 'src/app/components/container/container.component';
import { ProductCardComponent } from 'src/app/components/product-card/product-card.component';
import { Product } from 'src/app/types/product';
import { ProductService } from '../../../../services/product.service';
import { SwiperComponent } from 'src/app/components/swiper/swiper.component';

@Component({
  selector: 'app-best-selling',
  standalone: true,
  imports: [CommonModule, ContainerComponent, ProductCardComponent, SwiperComponent],
  templateUrl: './best-selling.component.html',
  styleUrls: ['./best-selling.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BestSellingComponent {

  bestSellingProducts: Product[] = [];

  constructor(private productService: ProductService) {
    this.getBestSellingProducts();
  }

  getBestSellingProducts() {
    const getBestSellingProductsSub$ = this.productService.getBestSellingProducts({
      limit: 4,
      page: 1
    }).subscribe(products => {
      this.bestSellingProducts = products;
      getBestSellingProductsSub$.unsubscribe();
    });
  }

}
