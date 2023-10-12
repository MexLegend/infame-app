import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { CloudinaryWidgetOptions, CloudinaryWidgetResponse } from 'src/app/types/cloudinary';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-upload-widget',
  standalone: true,
  imports: [CommonModule],
  template: '',

})
export class UploadWidgetComponent {

  @Input() options?: CloudinaryWidgetOptions;
  @Input() onOpen!: EventEmitter<boolean>;
  @Output() onUpload: EventEmitter<CloudinaryWidgetResponse> = new EventEmitter<CloudinaryWidgetResponse>();

  onOpenSub$!: Subscription;

  cloudinaryWidget!: any;

  ngAfterViewInit(): void {
    this.createWidget();
    this.handleOpenWidget();
  }

  ngOnDestroy(): void {
    this.onOpenSub$.unsubscribe();
  }

  createWidget() {
    this.cloudinaryWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: environment.CLOUDINARY_NAME,
        uploadPreset: environment.CLOUDINARY_PRESET,
        ...this.options
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          const { secure_url, public_id } = result.info;
          this.onUpload.emit({ secure_url, public_id });
        }
      }
    );
  }

  handleOpenWidget() {
    this.onOpenSub$ = this.onOpen.subscribe(() => {
      this.cloudinaryWidget.open();
    });
  }

}
