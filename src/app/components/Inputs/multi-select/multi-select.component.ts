import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { FormControlPipe } from 'src/app/pipes/form-control.pipe';
import { MultiSelectLimitPipe } from 'src/app/pipes/multi-select-limit.pipe';
import { ImgPipe } from 'src/app/pipes/img.pipe';

export interface SelectOptions {
  key: string;
  icon?: string;
  image?: string;
  value: any;
}

@Component({
  selector: 'app-multi-select',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    FormControlPipe,
    MultiSelectLimitPipe,
    ImgPipe
  ],
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MultiSelectComponent {

  @Input() id = '';
  @Input() label = '';
  @Input() options: SelectOptions[] = [];
  @Input() multiple = true;
  @Input() limit: number = 1;
  @Input() customClasses: string = "";
  @Input() formControlName: string = "";
  @Input() formGroupRef: FormGroup = new FormGroup({});

}
