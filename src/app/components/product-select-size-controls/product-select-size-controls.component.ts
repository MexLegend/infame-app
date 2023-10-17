import { Component, Input, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Size } from 'src/app/types/size';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormControlPipe } from 'src/app/pipes/form-control.pipe';

@Component({
  selector: 'app-product-select-size-controls',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormControlPipe],
  templateUrl: './product-select-size-controls.component.html',
  styleUrls: ['./product-select-size-controls.component.scss']
})
export class ProductSelectSizeControlsComponent {

  @Input() sizes!: Size[];
  @Input() formControlName!: string
  @Input() formGroupRef!: FormGroup;

  handleSetSelectedSize(sizeId: string, event: Event) {
    event.preventDefault();

    const sizeControl = this.formGroupRef.get(this.formControlName);
    const selectedSize = sizeControl?.value;

    if (sizeId === selectedSize) {
      sizeControl?.reset();
    } 
    else {
      sizeControl?.setValue(sizeId);
    }

  }

}
