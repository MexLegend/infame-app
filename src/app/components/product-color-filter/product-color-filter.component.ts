import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorFilter } from 'src/app/types/color';

@Component({
  selector: 'app-product-color-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-color-filter.component.html',
  styleUrls: ['./product-color-filter.component.scss']
})
export class ProductColorFilterComponent {

  @Input() colors!: ColorFilter[];

}
