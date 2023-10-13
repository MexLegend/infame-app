import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorPickerModule } from 'ngx-color-picker';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-color-picker',
  standalone: true,
  imports: [CommonModule, ColorPickerModule],
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent {

  @Input() color: string = "#ffffff";
  @Input() formControlName: string = "";
  @Input() formGroupRef: FormGroup = new FormGroup({});
  @Input() id: string = "";
  @Input() label: string | null = null;
  @Input() required: boolean = false;

  tooglePicker: boolean = false;

  onChangeColor(color: string): void {
    this.color = color;
    this.formGroupRef.get(this.formControlName)!.patchValue(color);
  }

}
