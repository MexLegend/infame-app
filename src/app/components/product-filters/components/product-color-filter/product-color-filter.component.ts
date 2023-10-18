import { Component, Input, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Color, ColorFilter } from 'src/app/types/color';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { FormControlPipe } from 'src/app/pipes/form-control.pipe';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-color-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatChipsModule, FormControlPipe, MatIconModule],
  templateUrl: './product-color-filter.component.html',
  styleUrls: ['./product-color-filter.component.scss']
})
export class ProductColorFilterComponent {

  @Input() formControlName!: string;
  @Input() formGroupRef!: FormGroup;
  @Input() colors!: Signal<Color[]>;

}
