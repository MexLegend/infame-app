import { Component, Input, Signal, WritableSignal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FavoriteService } from '../../services/favorite.service';
import { AuthService } from '../../services/auth.service';
import { SafeUser } from 'src/app/types/user';

@Component({
  selector: 'app-favorites-btn',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './favorites-btn.component.html',
  styleUrls: ['./favorites-btn.component.scss']
})
export class FavoritesBtnComponent {

  @Input() productId!: string;

  constructor(
    private favoriteService: FavoriteService,
    private authService: AuthService
  ) { }

  favoritedProducts: WritableSignal<string[]> = this.authService.favoritedProducts;
  isProductFavorited: Signal<boolean> = computed(() =>
    this.favoritedProducts().some(e => e === this.productId)
  );

  toogleFavorite(event: MouseEvent) {
    event.stopPropagation();

    const user = this.authService.getCurrentUser()!;
    const updatedUserFavorites = this.isProductFavorited()
      ? [...this.favoritedProducts().filter(e => e !== this.productId)]
      : [...this.favoritedProducts(), this.productId];

    this.favoritedProducts.set(updatedUserFavorites);

    const toogleFavoriteSub$ = this.favoriteService.toogleFavorite({
      userId: user.id,
      productIds: updatedUserFavorites
    }).subscribe(favoriteProducts => {
      const userWithUpdatedFavorites: SafeUser = { ...user, favoriteProducts };
      this.favoriteService.handleToogleFavoriteProduct.emit(this.productId);
      this.authService.setCurrentUserData(userWithUpdatedFavorites);
      toogleFavoriteSub$.unsubscribe();
    });
  }
}

