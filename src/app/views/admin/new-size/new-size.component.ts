import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDeleteModalComponent } from 'src/app/modals/confirm-delete-modal/confirm-delete-modal.component';
import { Subscription, first, lastValueFrom } from 'rxjs';
import { Size } from 'src/app/types/size';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CrudAction } from 'src/app/types/crudAction';
import { StoreService } from 'src/app/services/store.service';
import { SizeService } from 'src/app/services/size.service';
import { ModalService } from 'src/app/services/modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { InputComponent } from 'src/app/components/Inputs/input/input.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-new-size',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    BreadcrumbComponent
  ],
  templateUrl: './new-size.component.html',
  styleUrls: ['./new-size.component.scss']
})
export class NewSizeComponent {

  getRouteDataSub$!: Subscription;

  form!: FormGroup;
  action!: CrudAction;
  currentSizeId?: string;
  isLoading: boolean = false;

  constructor(
    private storeService: StoreService,
    private sizeService: SizeService,
    private modalService: ModalService,
    private formBuilder: FormBuilder,
    private router: Router,
    public route: ActivatedRoute
  ) {
    this.initForm();
    this.getRouteDataSub$ = this.route.data.subscribe(data => {
      this.action = data['action'];
      if (this.action === 'Edit') {
        this.currentSizeId = this.router.url.split("/").pop()!;
        this.getCurrentSize(this.currentSizeId);
      }
    });
  }

  ngOnDestroy(): void {
    this.getRouteDataSub$.unsubscribe();
  }

  getCurrentSize(sizeId: string) {
    this.isLoading = true;

    const getOneSizeSub$ = this.sizeService.getOneSize(sizeId).subscribe((size) => {
      this.form.patchValue(size);
      this.isLoading = false;
      getOneSizeSub$.unsubscribe();
    });
  }

  initForm() {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      value: [null, Validators.required]
    });
  }

  handleAction() {
    if (this.action === "Create") this.handleCreateSize();
    else this.handleUpdateSize();
  }

  handleCreateSize = () => {

    this.isLoading = true;

    const { name, value } = this.form.value;

    const size: Size = {
      name,
      value,
      storeId: this.storeService.currentStoreId()
    }

    const createSizeSub$ = this.sizeService.createSize(size).subscribe(() => {

      this.isLoading = false;
      this.sizeService.reloadDataEmitter.emit(true);
      this.router.navigate(["/admin/" + this.storeService.currentStoreId() + "/sizes"]);

      createSizeSub$.unsubscribe();
    });
  }

  handleUpdateSize = () => {

    this.isLoading = true;

    const { name, value } = this.form.value;

    const size: Size = {
      name,
      value,
      storeId: this.storeService.currentStoreId()
    }

    const updateSizeSub$ = this.sizeService.updateSize(size, this.currentSizeId!).subscribe(() => {

      this.isLoading = false;
      this.sizeService.reloadDataEmitter.emit(true);
      this.router.navigate(["/admin/" + this.storeService.currentStoreId() + "/sizes"]);

      updateSizeSub$.unsubscribe();
    });
  }

  async handleDeleteSize() {

    const confirmDelete = await this.handleConfirmDelete();

    if (!confirmDelete) return;

    const deleteSizeSub$ = this.sizeService.deleteSize(this.currentSizeId!).subscribe(() => {
      this.sizeService.reloadDataEmitter.emit(true);
      this.router.navigate(["/admin/" + this.storeService.currentStoreId() + "/sizes"]);
      deleteSizeSub$.unsubscribe();
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
