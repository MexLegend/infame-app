import { Component, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FooterComponent } from '../components/footer/footer.component';
import { SafeStore } from 'src/app/types/store';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-wrapper',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterModule, FooterComponent],
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent {

  store: WritableSignal<SafeStore | null> = signal(null);
  isLoading: boolean = true;

  constructor(
    private storeService: StoreService,
    private router: Router,
    private ativatedRoute: ActivatedRoute
  ) {
    this.getStore();
  }

  getStore() {
    const { storeSlug } = this.ativatedRoute.snapshot.params;
    const getStoresSub$ = this.storeService.getStoreBySlug(storeSlug)
      .subscribe((store) => {
        this.isLoading = false;
        this.store.set(store);
        getStoresSub$.unsubscribe();
      });
  }

}
