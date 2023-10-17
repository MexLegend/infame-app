import { Component, Input, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Image } from 'src/app/types/image';

@Component({
  selector: 'app-product-preview-controls',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-preview-controls.component.html',
  styleUrls: ['./product-preview-controls.component.scss']
})
export class ProductPreviewControlsComponent {

  @Input() productImages: Image[] = [];
  @Input() activeProductImage!: WritableSignal<number>;

  handleSetActiveProductImage(index: number) {
    this.activeProductImage.set(index);
  }

}
