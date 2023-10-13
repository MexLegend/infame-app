import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDeleteModalComponent } from 'src/app/modals/confirm-delete-modal/confirm-delete-modal.component';
import { Subscription, first, lastValueFrom } from 'rxjs';
import { Category } from 'src/app/types/category';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CrudAction } from 'src/app/types/crudAction';
import { StoreService } from 'src/app/services/store.service';
import { CategoryService } from 'src/app/services/category.service';
import { ModalService } from 'src/app/services/modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { InputComponent } from 'src/app/components/Inputs/input/input.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { MultiSelectComponent, SelectOptions } from 'src/app/components/Inputs/multi-select/multi-select.component';
import { BillboardService } from '../../../services/billboard.service';

@Component({
  selector: 'app-new-category',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    InputComponent,
    MultiSelectComponent,
    ButtonComponent,
    BreadcrumbComponent
  ],
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss']
})
export class NewCategoryComponent {

  getRouteDataSub$!: Subscription;

  form!: FormGroup;
  action!: CrudAction;
  currentCategoryId?: string;
  billboardsOptions: SelectOptions[] = []
  isLoading: boolean = false;

  constructor(
    private storeService: StoreService,
    private billboardService: BillboardService,
    private categoryService: CategoryService,
    private modalService: ModalService,
    private formBuilder: FormBuilder,
    private router: Router,
    public route: ActivatedRoute
  ) {
    this.initForm();
    this.getBillboards();
    this.getRouteDataSub$ = this.route.data.subscribe(data => {
      this.action = data['action'];
      if (this.action === 'Edit') {
        this.currentCategoryId = this.router.url.split("/").pop()!;
        this.getCurrentCategory(this.currentCategoryId);
      }
    });
  }

  ngOnDestroy(): void {
    this.getRouteDataSub$.unsubscribe();
  }

  getBillboards() {
    const getBillboardsSub$ = this.billboardService.getBillboards({
      limit: 100,
      page: 1,
      storeId: this.storeService.currentStoreId()
    }).subscribe(({ data }) => {
      this.billboardsOptions = data.map((billboard)=> ({
        key: billboard.label,
        image: billboard.image.url,
        value: billboard.id!
      }));
      getBillboardsSub$.unsubscribe();
    });
  }

  getCurrentCategory(categoryId: string) {
    this.isLoading = true;

    const getOneCategorySub$ = this.categoryService.getOneCategory(categoryId).subscribe((category) => {
      this.form.patchValue(category);
      this.isLoading = false;
      getOneCategorySub$.unsubscribe();
    });
  }

  initForm() {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      billboardId: [{ value: null, disabled: false }, Validators.required],
    });
  }

  handleAction() {
    if (this.action === "Create") this.handleCreateCategory();
    else this.handleUpdateCategory();
  }

  handleCreateCategory = () => {

    this.isLoading = true;

    const { name, billboardId } = this.form.value;

    const category: Category = {
      name,
      billboardId,
      storeId: this.storeService.currentStoreId()
    }

    const createCategorySub$ = this.categoryService.createCategory(category).subscribe(() => {

      this.isLoading = false;
      this.categoryService.reloadDataEmitter.emit(true);
      this.router.navigate(["/admin/" + this.storeService.currentStoreId() + "/categories"]);

      createCategorySub$.unsubscribe();
    });
  }

  handleUpdateCategory = () => {

    this.isLoading = true;

    const { name, billboardId } = this.form.value;

    const category: Category = {
      name,
      billboardId,
      storeId: this.storeService.currentStoreId()
    }

    const updateCategorySub$ = this.categoryService.updateCategory(category, this.currentCategoryId!).subscribe(() => {

      this.isLoading = false;
      this.categoryService.reloadDataEmitter.emit(true);
      this.router.navigate(["/admin/" + this.storeService.currentStoreId() + "/categories"]);

      updateCategorySub$.unsubscribe();
    });
  }

  async handleDeleteCategory() {

    const confirmDelete = await this.handleConfirmDelete();

    if (!confirmDelete) return;

    const deleteCategorySub$ = this.categoryService.deleteCategory(this.currentCategoryId!).subscribe(() => {
      this.categoryService.reloadDataEmitter.emit(true);
      this.router.navigate(["/admin/" + this.storeService.currentStoreId() + "/categories"]);
      deleteCategorySub$.unsubscribe();
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
