import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormControlPipe } from 'src/app/pipes/form-control.pipe';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, ReactiveFormsModule, FormControlPipe],
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {

  @Input() formControlName: string = "";
  @Input() formGroupRef: FormGroup = new FormGroup({});
  @Input() id: string = "";
  @Input() label: string = "";
  @Input() description: string = "";

}
