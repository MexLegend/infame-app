import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Pipe({
  name: 'multiSelectLimit',
  standalone: true
})
export class MultiSelectLimitPipe implements PipeTransform {

  transform(formControlValue: any[], optionValue: string): boolean {

    return formControlValue?.length >= 3 && !formControlValue?.find((el: string) => el === optionValue)

  }

}
