import { Component, EventEmitter, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from 'src/app/components/Inputs/input/input.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { ImgPipe } from 'src/app/pipes/img.pipe';
import { UploadWidgetComponent } from 'src/app/components/upload-widget/upload-widget.component';
import { CloudinaryWidgetOptions, CloudinaryWidgetResponse } from '../../../types/cloudinary';
import { Billboard } from 'src/app/types/billboard';
import { StoreService } from 'src/app/services/store.service';
import { TextareaComponent } from 'src/app/components/Inputs/textarea/textarea.component';
import { BillboardService } from 'src/app/services/billboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, first, lastValueFrom } from 'rxjs';
import { ConfirmDeleteModalComponent } from 'src/app/modals/confirm-delete-modal/confirm-delete-modal.component';
import { ModalService } from 'src/app/services/modal.service';
import { MatIconModule } from '@angular/material/icon';
import { Image } from 'src/app/types/image';
import { Notyf } from 'notyf';
import { NOTYF } from 'src/shared/utils/notyf.token';

type BillboardAction = "Create" | "Edit";

@Component({
  selector: 'app-new-billboard',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    InputComponent,
    TextareaComponent,
    ButtonComponent,
    UploadWidgetComponent,
    ReactiveFormsModule,
    MatIconModule,
    ImgPipe
  ],
  templateUrl: './new-billboard.component.html',
  styleUrls: ['./new-billboard.component.scss']
})
export class NewBillboardComponent {

  getRouteDataSub$!: Subscription;

  form!: FormGroup;
  openCloudinaryWidget: EventEmitter<boolean> = new EventEmitter<boolean>();
  cloudinaryWidgetOptions: CloudinaryWidgetOptions = {
    folder: "Ecommerce",
    maxImageFileSize: 4000000
  };
  action!: BillboardAction;
  currentBillboardId?: string;
  isLoading: boolean = false;

  constructor(
    private storeService: StoreService,
    private billboardService: BillboardService,
    private modalService: ModalService,
    private formBuilder: FormBuilder,
    private router: Router,
    public route: ActivatedRoute,
    @Inject(NOTYF) private notyf: Notyf
  ) {
    this.initForm();
    this.getRouteDataSub$ = this.route.data.subscribe(data => {
      this.action = data['action'];
      if (this.action === 'Edit') {
        this.currentBillboardId = this.router.url.split("/").pop()!;
        this.getCurrentBillboard(this.currentBillboardId);
      }
    });
  }

  ngOnDestroy(): void {
    this.getRouteDataSub$.unsubscribe();
  }

  getCurrentBillboard(billboardId: string) {
    this.isLoading = true;

    const getOneBillboardSub$ = this.billboardService.getOneBillboard(billboardId).subscribe((billboard) => {
      this.form.patchValue(billboard);
      this.isLoading = false;
      getOneBillboardSub$.unsubscribe();
    });
  }

  initForm() {
    this.form = this.formBuilder.group({
      image: this.formBuilder.group({
        url: [null, Validators.required],
        publicId: [null, Validators.required]
      }),
      label: [null, Validators.required],
      description: [null, Validators.required]
    });
  }

  onImageUpload = ({ public_id, secure_url }: CloudinaryWidgetResponse) => {

    const image = { url: secure_url, publicId: public_id };

    if (this.action === "Create") this.form.patchValue({ image });
    else this.handleUpdateImage(image);
  }

  handleOpenCloudinaryWidget() {
    this.openCloudinaryWidget.emit(true);
  }

  handleUpdateImage = (image?: Image) => {

    const { publicId } = this.form.value.image;
    const auxImage = image || { url: "", publicId: "" };

    const billboardImage = {
      image: auxImage,
      oldPublicId: publicId
    }

    const updateImageSub$ = this.billboardService.updateBillboardImage(this.currentBillboardId!, billboardImage).subscribe(() => {
      this.form.patchValue({ image: auxImage });
      this.billboardService.reloadDataEmitter.emit(true);
      this.notyf.success({
        message: `Billboard image ${image ? 'updated' : 'deleted'}.`,
        position: {
          x: 'center',
          y: 'top'
        },
        duration: 1500
      });
      updateImageSub$.unsubscribe();
    });
  }

  handleAction() {
    if (this.action === "Create") this.handleCreateBillboard();
    else this.handleUpdateBillboard();
  }

  handleCreateBillboard = () => {

    this.isLoading = true;

    const { image, label, description } = this.form.value;

    const billboard: Billboard = {
      image,
      label,
      description,
      storeId: this.storeService.currentStoreId()
    }

    const createBillboardSub$ = this.billboardService.createBillboard(billboard).subscribe(() => {

      this.isLoading = false;
      this.billboardService.reloadDataEmitter.emit(true);
      this.router.navigate(["/admin/" + this.storeService.currentStoreId() + "/billboards"]);

      createBillboardSub$.unsubscribe();
    });
  }

  handleUpdateBillboard = () => {

    this.isLoading = true;

    const { image, label, description } = this.form.value;

    const billboard: Billboard = {
      image,
      label,
      description,
      storeId: this.storeService.currentStoreId()
    }

    const updateBillboardSub$ = this.billboardService.updateBillboard(billboard, this.currentBillboardId!).subscribe(() => {

      this.isLoading = false;
      this.billboardService.reloadDataEmitter.emit(true);
      this.router.navigate(["/admin/" + this.storeService.currentStoreId() + "/billboards"]);

      updateBillboardSub$.unsubscribe();
    });
  }

  async handleDeleteBillboard() {

    const confirmDelete = await this.handleConfirmDelete();

    if (!confirmDelete) return;

    const deleteBillboardSub$ = this.billboardService.deleteBillboard(this.currentBillboardId!).subscribe(() => {
      this.billboardService.reloadDataEmitter.emit(true);
      this.router.navigate(["/admin/" + this.storeService.currentStoreId() + "/billboards"]);
      deleteBillboardSub$.unsubscribe();
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
