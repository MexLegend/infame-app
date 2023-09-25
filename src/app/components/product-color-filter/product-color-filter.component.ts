import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ColorFilter = {
  key: string;
  value: string;
}

@Component({
  selector: 'app-product-color-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-color-filter.component.html',
  styleUrls: ['./product-color-filter.component.scss']
})
export class ProductColorFilterComponent {

  @Input() colors: ColorFilter[] = [
    {
      key: "white",
      value: "#ffffff"
    },
    {
      key: "black",
      value: "#000000"
    },
    {
      key: "red",
      value: "#ff0000"
    },
    {
      key: "yellow",
      value: "#ffff00"
    }
  ];

}
