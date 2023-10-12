import { Component, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
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

  storesList!: WritableSignal<SafeStore[]>;
  isLoading: boolean = true;

  constructor(
    private authService: AuthService,
    private storeService: StoreService,
    private router: Router,
    private ativatedRoute: ActivatedRoute
  ) {
    this.initStoresList();
    this.getStores();
  }

  initStoresList() {
    this.storesList = this.storeService.storesList;
  }

  getStores() {
    const getStoresSub$ = this.storeService.getStores(this.authService.getCurrentUser()!.id)
      .subscribe((stores) => {
        this.isLoading = false;
        this.handleRedirectToActiveStore(stores);
        getStoresSub$.unsubscribe();
      });
  }

  handleRedirectToActiveStore(stores: SafeStore[]) {
    const { storeId } = this.ativatedRoute.snapshot.params;

    if (!storeId) {
      this.router.navigate(["/admin/" + stores[0].id]);
      this.storeService.activeStore.set(0);
    } else {
      const activeStoreIndex = this.storesList().findIndex(store => store.id === storeId);
      this.storeService.activeStore.set(activeStoreIndex);
    }

  }

}
