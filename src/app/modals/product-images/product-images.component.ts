import { Component, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CloudinaryWidgetOptions, CloudinaryWidgetResponse } from 'src/app/types/cloudinary';
import { UploadWidgetComponent } from 'src/app/components/upload-widget/upload-widget.component';
import { ModalAction } from 'src/app/services/modal.service';
import { ModalService } from '../../services/modal.service';
import { MultiSelectComponent, SelectOptions } from 'src/app/components/Inputs/multi-select/multi-select.component';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { FormArrayPipe } from 'src/app/pipes/form-array.pipe';
import { MatIconModule } from '@angular/material/icon';
import { CloudinaryService, ResourceType } from '../../services/cloudinary.service';
import { Image } from 'src/app/types/image';
import { UploadedProductImages } from 'src/app/types/product';
import { Color } from 'src/app/types/color';

export interface ProductImagesDialogData {
  action: ModalAction;
  title: string;
  colorsOptions: SelectOptions[];
}

@Component({
  selector: 'app-product-images',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    UploadWidgetComponent,
    MultiSelectComponent,
    ReactiveFormsModule,
    MatIconModule,
    FormArrayPipe
  ],
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.scss']
})
export class ProductImagesComponent {

  @Input() data!: ProductImagesDialogData;
  @Input() onCloseEmitter!: EventEmitter<any>;

  openCloudinaryWidget: EventEmitter<boolean> = new EventEmitter<boolean>();
  cloudinaryWidgetOptions: CloudinaryWidgetOptions = {
    folder: "Ecommerce",
    maxImageFileSize: 4000000,
    multiple: true
  };
  form!: FormGroup;
  isLoading: boolean = false;

  constructor(
    private modalService: ModalService,
    private cloudinaryService: CloudinaryService,
    private formBuilder: FormBuilder
  ) {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      colorId: [null, Validators.required],
      images: this.formBuilder.array([], [Validators.required, Validators.minLength(1)]),
    });
  }

  handleClose(data?: UploadedProductImages) {
    this.modalService.toggleModal.emit(false);
    this.onCloseEmitter.emit(data)
  }

  onImageUpload = ({ public_id, secure_url }: CloudinaryWidgetResponse) => {
    const imagesArrayControl = this.form.get("images") as FormArray;
    const formatedImage: Image = { url: secure_url, publicId: public_id };
    imagesArrayControl.push(this.formBuilder.group(formatedImage));
  }

  handleOpenCloudinaryWidget() {
    this.openCloudinaryWidget.emit(true);
  }

  handleDeleteImage = (publicId: string, index: number) => {

    const deleteImageSub$ = this.cloudinaryService.deleteFiles(
      {
        public_ids: [publicId],
        resourceType: ResourceType.image
      }
    ).subscribe(() => {
      const imagesArrayControl = this.form.get("images") as FormArray;
      imagesArrayControl.removeAt(index);
      deleteImageSub$.unsubscribe();
    });
  }

  handleSavedImages() {
    const { colorId, images } = this.form.value;
    const foundColor = this.data.colorsOptions.find(color => color.value === colorId)!;
    const color: Color = { color: foundColor.colorIcon!, name: foundColor.key, id: foundColor.value };

    this.handleClose({ color, images });
  }

}
