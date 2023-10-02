import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FormControlPipe } from 'src/app/pipes/form-control.pipe';

export type InputType = "email" | "number" | "password" | "text" | "tel";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, FormControlPipe, MatInputModule],
  standalone: true
})
export class InputComponent {

  @Input() formControlName: string = "";
  @Input() formGroupRef: FormGroup = new FormGroup({});
  @Input() id: string = "";
  @Input() label: string | null = null;
  @Input() required: boolean = false;
  @Input() type: InputType = "text";
  @Input() autofocus: boolean = false;
  @Input() autoComplete: boolean = false;

}
