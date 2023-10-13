import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDeleteModalComponent } from 'src/app/modals/confirm-delete-modal/confirm-delete-modal.component';
import { Subscription, first, lastValueFrom } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CrudAction } from 'src/app/types/crudAction';
import { StoreService } from 'src/app/services/store.service';
import { ModalService } from 'src/app/services/modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { InputComponent } from 'src/app/components/Inputs/input/input.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { ColorService } from 'src/app/services/color.service';
import { Color } from 'src/app/types/color';
import { ImgPipe } from 'src/app/pipes/img.pipe';
import { ColorPickerComponent } from 'src/app/components/Inputs/color-picker/color-picker.component';

@Component({
  selector: 'app-new-color',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    InputComponent,
    ColorPickerComponent,
    ButtonComponent,
    BreadcrumbComponent,
    ImgPipe
  ],
  templateUrl: './new-color.component.html',
  styleUrls: ['./new-color.component.scss']
})
export class NewColorComponent {

  getRouteDataSub$!: Subscription;

  form!: FormGroup;
  action!: CrudAction;
  currentColorId?: string;
  isLoading: boolean = false;
  
  constructor(
    private storeService: StoreService,
    private colorService: ColorService,
    private modalService: ModalService,
    private formBuilder: FormBuilder,
    private router: Router,
    public route: ActivatedRoute
  ) {
    this.initForm();
    this.getRouteDataSub$ = this.route.data.subscribe(data => {
      this.action = data['action'];
      if (this.action === 'Edit') {
        this.currentColorId = this.router.url.split("/").pop()!;
        this.getCurrentColor(this.currentColorId);
      }
    });
  }

  ngOnDestroy(): void {
    this.getRouteDataSub$.unsubscribe();
  }

  getCurrentColor(colorId: string) {
    this.isLoading = true;

    const getOneColorSub$ = this.colorService.getOneColor(colorId).subscribe((color) => {
      this.form.patchValue(color);
      this.isLoading = false;
      getOneColorSub$.unsubscribe();
    });
  }

  initForm() {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      color: [null, Validators.required]
    });
  }

  handleAction() {
    if (this.action === "Create") this.handleCreateColor();
    else this.handleUpdateColor();
  }

  handleCreateColor = () => {

    this.isLoading = true;

    const { name, color } = this.form.value;

    const colorData: Color = {
      name,
      color,
      storeId: this.storeService.currentStoreId()
    }
    
    const createColorSub$ = this.colorService.createColor(colorData).subscribe(() => {

      this.isLoading = false;
      this.colorService.reloadDataEmitter.emit(true);
      this.router.navigate(["/admin/" + this.storeService.currentStoreId() + "/colors"]);

      createColorSub$.unsubscribe();
    });
  }

  handleUpdateColor = () => {

    this.isLoading = true;

    const { name, color } = this.form.value;

    const colorData: Color = {
      name,
      color,
      storeId: this.storeService.currentStoreId()
    }

    const updateColorSub$ = this.colorService.updateColor(colorData, this.currentColorId!).subscribe(() => {

      this.isLoading = false;
      this.colorService.reloadDataEmitter.emit(true);
      this.router.navigate(["/admin/" + this.storeService.currentStoreId() + "/colors"]);

      updateColorSub$.unsubscribe();
    });
  }

  async handleDeleteColor() {

    const confirmDelete = await this.handleConfirmDelete();

    if (!confirmDelete) return;

    const deleteColorSub$ = this.colorService.deleteColor(this.currentColorId!).subscribe(() => {
      this.colorService.reloadDataEmitter.emit(true);
      this.router.navigate(["/admin/" + this.storeService.currentStoreId() + "/colors"]);
      deleteColorSub$.unsubscribe();
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
