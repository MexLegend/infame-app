import { Component, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from 'src/app/components/container/container.component';
import { ProductCardComponent } from 'src/app/components/product-card/product-card.component';
import { FavoriteService } from '../../../services/favorite.service';
import { AuthService } from '../../../services/auth.service';
import { Product } from 'src/app/types/product';
import { Subscription } from 'rxjs';
import { LoadingComponent } from '../../admin/components/loading/loading.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, ContainerComponent, ProductCardComponent, LoadingComponent],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {

  favoriteProducts: WritableSignal<Product[]> = signal([]);
  handleToogleFavoriteProductSub$!: Subscription;
  isLoading: boolean = true;

  constructor(
    private authService: AuthService,
    private favoriteService: FavoriteService
  ) {
    this.getFavorites();
    this.handleToogleFavoriteProduct();
  }

  ngOnDestroy(): void {
    this.handleToogleFavoriteProductSub$.unsubscribe();
  }

  getFavorites() {
    const { id } = this.authService.getCurrentUser()!;

    const getFavoriteProductsSub$ = this.favoriteService.getFavorites({
      limit: 20,
      page: 1,
      userId: id
    }).subscribe(({ data }) => {
      this.favoriteProducts.set(data.products || []);;
      this.isLoading = false;
      getFavoriteProductsSub$.unsubscribe();
    });
  }

  handleToogleFavoriteProduct() {
    this.handleToogleFavoriteProductSub$ = this.favoriteService.handleToogleFavoriteProduct.subscribe(productId => {
      this.favoriteProducts.update(products => products.filter(product => product.id !== productId));
    });
  }

}
