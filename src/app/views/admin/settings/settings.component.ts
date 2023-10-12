import { Component, ElementRef, Inject, Signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiRoutesComponent } from '../components/api-routes/api-routes.component';
import { InputComponent } from 'src/app/components/Inputs/input/input.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { ReactiveFormService } from '../../../services/reactive-form.service';
import { StoreService } from 'src/app/services/store.service';
import { SafeStore } from 'src/app/types/store';
import { Notyf } from 'notyf';
import { NOTYF } from 'src/shared/utils/notyf.token';
import { environment } from 'src/environments/environment';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';
import { ConfirmDeleteModalComponent } from 'src/app/modals/confirm-delete-modal/confirm-delete-modal.component';
import { first, lastValueFrom } from 'rxjs';
import { LoadingComponent } from '../components/loading/loading.component';
import { ApiRoute } from 'src/app/types/apiRoute';
import { ApiRouteComponent } from '../components/api-route/api-route.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    ReactiveFormsModule,
    MatIconModule,
    ApiRouteComponent,
    InputComponent,
    ButtonComponent,
    LoadingComponent
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  form!: FormGroup;
  currentStore!: SafeStore;
  route: Signal<ApiRoute> = computed(() => (
    {
      route: environment.URI + "/api/" + this.currentStore.id,
      method: "PUBLIC_API_URL",
      isPublic: true
    }
  ));
  isSaving: boolean = false;
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private elementRef: ElementRef,
    private reactiveFormService: ReactiveFormService,
    private storeService: StoreService,
    private modalService: ModalService,
    private router: Router,
    @Inject(NOTYF) private notyf: Notyf
  ) {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      web: [null, Validators.required]
    });

    this.pathFormWithCurrentStore();
  }

  pathFormWithCurrentStore() {
    const storesList = this.storeService.storesList;
    const activeStore = this.storeService.activeStore;

    this.currentStore = storesList()[activeStore()];
    this.form.patchValue(this.currentStore);
  }

  handleSubmit = () => {
    if (this.form.invalid) {
      this.reactiveFormService.addFocusOnFirstInvalidInput(this.form, this.elementRef);
      return;
    }

    this.isSaving = true;

    const { name, web } = this.form.value;
    const { id, userId } = this.currentStore;

    const updateStoreSub$ = this.storeService.updateStore({ name, web, userId }, id).subscribe((updatedStore) => {

      this.notyf.success({
        message: "Store updated.",
        position: {
          x: 'center',
          y: 'top'
        },
        duration: 1500
      });

      this.storeService.storesList.update(stores => stores.map(store => {
        if (store.id === updatedStore.id) {
          return { ...store, ...updatedStore };
        }
        return store;
      }));

      this.isSaving = false;
      updateStoreSub$.unsubscribe();
    });

  }

  async handleDelete() {

    const confirmDelete = await this.handleConfirmDelete();

    if (!confirmDelete) return;

    this.isLoading = true;

    const deleteStoreSub$ = this.storeService.deleteStore(this.currentStore.id).subscribe(() => {

      const stores = this.storeService.storesList;

      stores.update(stores => stores.filter(store => store.id !== this.currentStore.id));
      this.storeService.activeStore.set(0);
      this.router.navigate(["/admin/" + stores()[0].id]);

      this.isLoading = false;

      deleteStoreSub$.unsubscribe();
    });
  }

  async handleConfirmDelete(): Promise<boolean> {
    const onClose = this.modalService.setModalData({
      component: ConfirmDeleteModalComponent,
      title: 'Are you sure?',
      data: {
        action: 'Delete'
      },
      customClasses: "tw-max-w-[600px]",
      enableClose: false,
      closeModalButton: true
    });

    const value: boolean | null = await lastValueFrom(onClose.pipe(first()));

    return !!value;

  }

}
