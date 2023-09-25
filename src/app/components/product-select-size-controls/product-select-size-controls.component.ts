import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-select-size-controls',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-select-size-controls.component.html',
  styleUrls: ['./product-select-size-controls.component.scss']
})
export class ProductSelectSizeControlsComponent {

  sizes: string[] = ["XS", "X", "M", "L", "XL", "2XL"];

}
