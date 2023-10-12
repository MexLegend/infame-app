import { Component, ViewChild, WritableSignal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DropdownComponent } from 'src/app/components/dropdown/dropdown.component';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { SafeStore } from 'src/app/types/store';
import { StoreService } from 'src/app/services/store.service';
import { StoreSelectItemComponent } from '../store-select-item/store-select-item.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FilterArrayPipe } from 'src/app/pipes/filter-array.pipe';
import { ModalService } from 'src/app/services/modal.service';
import { StoreModalComponent } from 'src/app/modals/store-modal/store-modal.component';

@Component({
  selector: 'app-store-select',
  standalone: true,
  imports: [
    CommonModule,
    DropdownComponent,
    MatIconModule,
    MatMenuModule,
    StoreSelectItemComponent,
    ReactiveFormsModule,
    FilterArrayPipe
  ],
  templateUrl: './store-select.component.html',
  styleUrls: ['./store-select.component.scss']
})
export class StoreSelectComponent {

  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;

  activeStore!: WritableSignal<number>;
  storesList!: WritableSignal<SafeStore[]>;
  selectedStore = computed(() => this.storesList()[this.activeStore()].name);
  filterForm!: FormGroup;

  constructor(
    private storeService: StoreService,
    private modalService: ModalService,
    private formBuilder: FormBuilder
  ) {
    this.initStoresListAndSetActiveStore();
    this.initFilterForm();
  }

  initStoresListAndSetActiveStore() {
    this.storesList = this.storeService.storesList;
    this.activeStore = this.storeService.activeStore;
  }

  initFilterForm() {
    this.filterForm = this.formBuilder.group({
      search: [null, Validators.required]
    });
  }

  handleCreateStore() {

    const onClose = this.modalService.setModalData({
      component: StoreModalComponent,
      title: 'Create store',
      data: {
        action: 'Create'
      },
      customClasses: "tw-max-w-[600px]",
      enableClose: false,
      closeModalButton: true
    });

    const onCloseSub$ = onClose.subscribe((store: SafeStore | null) => {
      if (store) {
        this.storesList.update(stores => [...stores, store]);
        this.activeStore.set(this.storesList().length - 1);
      }
      onCloseSub$.unsubscribe();
    });

    this.menuTrigger.closeMenu();
  }

}
