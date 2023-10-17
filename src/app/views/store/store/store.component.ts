import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BestSellingComponent } from './components/best-selling/best-selling.component';
import { HeroComponent } from './components/hero/hero.component';
import { SafeStore } from 'src/app/types/store';
import { StoreService } from '../../../services/store.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingComponent } from '../../admin/components/loading/loading.component';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [CommonModule, HeroComponent, BestSellingComponent, LoadingComponent],
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent {

  store!: SafeStore;
  isLoading: boolean = true;

  constructor(
    private storeService: StoreService,
    private ativatedRoute: ActivatedRoute
  ) {
    this.getStore();
  }

  getStore() {
    const { slug } = this.ativatedRoute.snapshot.params;

    const getProductSub$ = this.storeService.getStoreBySlug(slug).subscribe(store => {
      this.store = store;
      this.storeService.storeCategoriesEmiter.emit(store.categories);
      this.isLoading = false;
      getProductSub$.unsubscribe();
    });
  }

}
