import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from 'src/app/components/container/container.component';
import { ProductCardComponent } from 'src/app/components/product-card/product-card.component';
import { SafeStore } from 'src/app/types/store';
import { StoreService } from '../../../../services/store.service';
import { StoreCardComponent } from 'src/app/components/store-card/store-card.component';

@Component({
  selector: 'app-stores',
  standalone: true,
  imports: [CommonModule, ContainerComponent, StoreCardComponent],
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent {

  stores: SafeStore[] = [];

  constructor(private storeService: StoreService) {
    this.getStores();
  }

  getStores() {
    const getStoresSub$ = this.storeService.getStores({
      limit: 10,
      page: 1
    }).subscribe(({ data }) => {
      console.log(data);

      this.stores = data;
      getStoresSub$.unsubscribe();
    });
  }

}
