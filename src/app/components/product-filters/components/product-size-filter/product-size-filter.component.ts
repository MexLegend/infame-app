import { Component, Input, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Size } from 'src/app/types/size';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { FormControlPipe } from 'src/app/pipes/form-control.pipe';

@Component({
  selector: 'app-product-size-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatChipsModule, FormControlPipe],
  templateUrl: './product-size-filter.component.html',
  styleUrls: ['./product-size-filter.component.scss']
})
export class ProductSizeFilterComponent {

  @Input() formControlName!: string;
  @Input() formGroupRef!: FormGroup;
  @Input() sizes!: Signal<Size[]>;

}
