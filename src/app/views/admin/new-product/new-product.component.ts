import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from 'src/app/components/Inputs/input/input.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { ImgPipe } from 'src/app/pipes/img.pipe';
import { UploadWidgetComponent } from 'src/app/components/upload-widget/upload-widget.component';
import { CloudinaryWidgetOptions, CloudinaryWidgetResponse } from '../../../types/cloudinary';
import { StoreService } from 'src/app/services/store.service';
import { TextareaComponent } from 'src/app/components/Inputs/textarea/textarea.component';
import { BillboardService } from 'src/app/services/billboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, first, lastValueFrom } from 'rxjs';
import { ConfirmDeleteModalComponent } from 'src/app/modals/confirm-delete-modal/confirm-delete-modal.component';
import { ModalService } from 'src/app/services/modal.service';
import { MatIconModule } from '@angular/material/icon';
import { Notyf } from 'notyf';
import { NOTYF } from 'src/shared/utils/notyf.token';
import { CrudAction } from 'src/app/types/crudAction';
import { ProductService } from 'src/app/services/product.service';
import { MultiSelectComponent, SelectOptions } from 'src/app/components/Inputs/multi-select/multi-select.component';
import { CategoryService } from 'src/app/services/category.service';
import { SizeService } from 'src/app/services/size.service';
import { ColorService } from 'src/app/services/color.service';
import { CheckboxComponent } from 'src/app/components/Inputs/checkbox/checkbox.component';
import { FormArrayPipe } from 'src/app/pipes/form-array.pipe';
import { CloudinaryService, ResourceType } from 'src/app/services/cloudinary.service';
import { Product } from 'src/app/types/product';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    InputComponent,
    TextareaComponent,
    MultiSelectComponent,
    CheckboxComponent,
    ButtonComponent,
    UploadWidgetComponent,
    ReactiveFormsModule,
    MatIconModule,
    NgxSkeletonLoaderModule,
    ImgPipe,
    FormArrayPipe
  ],
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NewProductComponent {

  getRouteDataSub$!: Subscription;

  form!: FormGroup;
  openCloudinaryWidget: EventEmitter<boolean> = new EventEmitter<boolean>();
  cloudinaryWidgetOptions: CloudinaryWidgetOptions = {
    folder: "Ecommerce",
    maxImageFileSize: 4000000,
    multiple: true
  };
  action!: CrudAction;
  currentProductId?: string;
  categoriesOptions: SelectOptions[] = [];
  sizesOptions: SelectOptions[] = [];
  colorsOptions: SelectOptions[] = [];
  isLoading: boolean = true;
  isSaving: boolean = false;

  constructor(
    private storeService: StoreService,
    private billboardService: BillboardService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private sizeService: SizeService,
    private cloudinaryService: CloudinaryService,
    private colorService: ColorService,
    private modalService: ModalService,
    private formBuilder: FormBuilder,
    private router: Router,
    public route: ActivatedRoute,
    @Inject(NOTYF) private notyf: Notyf
  ) {
    this.initForm();
    this.getCategories();
    this.getSizes();
    this.getColors();
    this.getRouteDataSub$ = this.route.data.subscribe(data => {
      this.action = data['action'];
      if (this.action === 'Edit') {
        this.currentProductId = this.router.url.split("/").pop()!;
        this.getCurrentProduct(this.currentProductId);
      } else this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    this.getRouteDataSub$.unsubscribe();
  }

  getCategories() {
    const getCategoriesSub$ = this.categoryService.getCategories({
      limit: 100,
      page: 1,
      storeId: this.storeService.currentStoreId()
    }).subscribe(({ data }) => {
      this.categoriesOptions = data.map((category) => ({
        key: category.name,
        value: category.id!
      }));
      getCategoriesSub$.unsubscribe();
    });
  }

  getSizes() {
    const getSizesSub$ = this.sizeService.getSizes({
      limit: 100,
      page: 1,
      storeId: this.storeService.currentStoreId()
    }).subscribe(({ data }) => {
      this.sizesOptions = data.map((size) => ({
        key: size.name,
        value: size.id!
      }));
      getSizesSub$.unsubscribe();
    });
  }

  getColors() {
    const getColorsSub$ = this.colorService.getColors({
      limit: 100,
      page: 1,
      storeId: this.storeService.currentStoreId()
    }).subscribe(({ data }) => {
      this.colorsOptions = data.map((color) => ({
        key: color.name,
        colorIcon: color.color,
        value: color.id!
      }));
      getColorsSub$.unsubscribe();
    });
  }

  getCurrentProduct(productId: string) {
    const getOneProductSub$ = this.productService.getOneProduct(productId).subscribe(({ images, ...product }) => {

      const imagesArrayControl = this.form.get("images") as FormArray;

      console.log(images);


      if (images.length) {
        images.forEach(image => {
          const imageGroupControl = this.formBuilder.group({
            url: image.url,
            publicId: image.publicId,
            color: image.color?.color,
            colorName: image.color?.name
          });

          imagesArrayControl.push(imageGroupControl)
        });
      }

      this.form.patchValue(product);

      this.isLoading = false;
      getOneProductSub$.unsubscribe();
    });
  }

  // handleCreateStore() {

  //   const onClose = this.modalService.setModalData({
  //     component: StoreModalComponent,
  //     title: 'Create store',
  //     data: {
  //       action: 'Create'
  //     },
  //     customClasses: "tw-max-w-[600px]",
  //     enableClose: false,
  //     closeModalButton: true
  //   });

  //   const onCloseSub$ = onClose.subscribe((store: SafeStore | null) => {
  //     if (store) {
  //       this.storesList.update(stores => [...stores, store]);
  //       this.activeStore.set(this.storesList().length - 1);
  //     }
  //     onCloseSub$.unsubscribe();
  //   });

  //   this.menuTrigger.closeMenu();
  // }

  initForm() {
    this.form = this.formBuilder.group({
      images: this.formBuilder.array([], [Validators.required, Validators.minLength(1)]),
      name: [null, Validators.required],
      price: [0, [Validators.required, Validators.min(30)]],
      categoryId: [{ value: null, disabled: false }, Validators.required],
      sizeIds: [null, Validators.required],
      colorIds: [null, Validators.required],
      description: [null, Validators.required],
      stock: [0, [Validators.required, Validators.min(1)]],
      isFeatured: [false, Validators.required],
      isArchived: [false, Validators.required],
    });
  }

  onImageUpload = ({ public_id, secure_url }: CloudinaryWidgetResponse) => {

    const image = { url: secure_url, publicId: public_id };

    const imagesArrayControl = this.form.get("images") as FormArray;

    imagesArrayControl.push(this.formBuilder.group(image));

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

      this.billboardService.reloadDataEmitter.emit(true);
      this.notyf.success({
        message: `Image deleted`,
        position: {
          x: 'center',
          y: 'top'
        },
        duration: 1500
      });
      deleteImageSub$.unsubscribe();
    });
  }

  handleAction() {
    if (this.action === "Create") this.handleCreateProduct();
    else this.handleUpdateProduct();
  }

  handleCreateProduct = () => {

    this.isSaving = true;

    const {
      images,
      name,
      price,
      categoryId,
      sizeIds,
      colorIds,
      description,
      stock,
      isFeatured,
      isArchived,
    } = this.form.value;

    const product: Product = {
      images,
      name,
      price,
      categoryId,
      sizeIds,
      colorIds,
      description,
      stock,
      isFeatured,
      isArchived,
      storeId: this.storeService.currentStoreId()
    }

    const createProductSub$ = this.productService.createProduct(product).subscribe(() => {

      this.isSaving = false;
      this.productService.reloadDataEmitter.emit(true);
      this.router.navigate(["/admin/" + this.storeService.currentStoreId() + "/products"]);

      createProductSub$.unsubscribe();
    });
  }

  handleUpdateProduct = () => {

    this.isSaving = true;

    const {
      images,
      name,
      price,
      categoryId,
      sizeIds,
      colorIds,
      description,
      stock,
      isFeatured,
      isArchived,
    } = this.form.value;

    const product: Product = {
      images,
      name,
      price,
      categoryId,
      sizeIds,
      colorIds,
      description,
      stock,
      isFeatured,
      isArchived,
      storeId: this.storeService.currentStoreId()
    }

    const updateProductSub$ = this.productService.updateProduct(product, this.currentProductId!).subscribe(() => {

      this.isSaving = false;
      this.productService.reloadDataEmitter.emit(true);
      this.router.navigate(["/admin/" + this.storeService.currentStoreId() + "/products"]);

      updateProductSub$.unsubscribe();
    });
  }

  async handleDeleteProduct() {

    const confirmDelete = await this.handleConfirmDelete();

    if (!confirmDelete) return;

    const deleteProductSub$ = this.productService.deleteProduct(this.currentProductId!).subscribe(() => {
      this.productService.reloadDataEmitter.emit(true);
      this.router.navigate(["/admin/" + this.storeService.currentStoreId() + "/products"]);
      deleteProductSub$.unsubscribe();
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
