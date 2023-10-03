import { Component, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { ContainerComponent } from 'src/app/components/container/container.component';
import { LoadingComponent } from '../components/loading/loading.component';
import { StoreService } from '../../../services/store.service';
import { AuthService } from '../../../services/auth.service';
import { StoresFormComponent } from '../stores-form/stores-form.component';
import { SafeStore } from 'src/app/types/store';

@Component({
  selector: 'app-wrapper',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ContainerComponent, RouterModule, LoadingComponent, StoresFormComponent],
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent {

  stores: WritableSignal<SafeStore[]> = signal([]);
  isLoading: boolean = true;

  constructor(private authService: AuthService, private storeService: StoreService) {
    this.getStores();
  }

  getStores() {
    const getStoresSub$ = this.storeService.getStores(this.authService.getCurrentUser()!.id)
      .subscribe((stores) => {

        if (stores.length) this.stores.set(stores);

        this.isLoading = false;
        getStoresSub$.unsubscribe();
      });
  }

}
