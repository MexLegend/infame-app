import { ElementRef, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ReactiveFormService {

  constructor() { }

  addFocusOnFirstInvalidInput(formGroup: FormGroup, element: ElementRef) {
    for (const key of Object.keys(formGroup.controls)) {
      if (formGroup.controls[key].invalid) {
        const invalidControl = element.nativeElement.querySelector('[formcontrolname="' + key + '"] input');
        invalidControl.focus();
        break;
      }
    }
  }

}
