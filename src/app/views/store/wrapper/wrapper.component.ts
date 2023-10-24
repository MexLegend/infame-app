import { Component, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../components/footer/footer.component';
import { SafeStore } from 'src/app/types/store';
import { StoreService } from 'src/app/services/store.service';
import { NavLink } from 'src/app/types/navLink';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-wrapper',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterModule, FooterComponent],
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent {

  storeCategoriesSub$!: Subscription;

  navLinks: WritableSignal<NavLink[]> = signal([]);
  store: WritableSignal<SafeStore | null> = signal(null);
  isLoading: boolean = true;

  constructor(
    private storeService: StoreService,
    private orderService: OrderService
  ) {
    this.getStoreCategories();
    this.getStoreCurrentOrder();
  }

  ngOnDestroy(): void {
    this.storeCategoriesSub$.unsubscribe();
  }

  getStoreCategories() {
    this.storeCategoriesSub$ = this.storeService.storeCategoriesEmiter.subscribe(categories => {
      this.navLinks.set(categories.map(category => ({
        label: category.name,
        link: 'category/' + category.id!
      })));
    });
  }

  getStoreCurrentOrder() {
    this.orderService.getCurrentOrderFromStore()
  }
}
