import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormControlPipe } from 'src/app/pipes/form-control.pipe';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule, FormControlPipe, ReactiveFormsModule, MatIconModule],
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {

  @Input() formGroupRef: FormGroup = new FormGroup({});
  @Input() controlName: string = "";
  @Input() min: number = 1;
  @Input() max: number = 10;
  @Input() step: number = 1;
  @Input() readOnly: boolean = true;
  @Input() placeholder: string = "0";
  @Input() inputClasses?: string = "h-24 rounded-xl font-bold";
  @Input() buttonClasses?: string = "h-12 w-12";

  decrement() {
    let value = this.formGroupRef.controls[this.controlName].value;
    if (value > this.max) value = this.max;
    else value -= this.step;
    this.formGroupRef.controls[this.controlName].patchValue(value);
  }

  increment() {
    let value = this.formGroupRef.controls[this.controlName].value;
    if (value < this.min) value = this.min;
    else value += this.step;
    this.formGroupRef.controls[this.controlName].patchValue(value);
  }
}
