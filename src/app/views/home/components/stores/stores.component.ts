import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from 'src/app/components/container/container.component';
import { SafeStore } from 'src/app/types/store';
import { StoreService } from '../../../../services/store.service';
import { StoreCardComponent } from 'src/app/components/store-card/store-card.component';
import { SwiperComponent } from 'src/app/components/swiper/swiper.component';

@Component({
  selector: 'app-stores',
  standalone: true,
  imports: [CommonModule, ContainerComponent, StoreCardComponent, SwiperComponent],
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
      this.stores = data;
      getStoresSub$.unsubscribe();
    });
  }

}
