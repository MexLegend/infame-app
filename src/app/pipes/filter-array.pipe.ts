import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterArray',
  standalone: true
})
export class FilterArrayPipe implements PipeTransform {

  transform(array: any[], searchValue: string | null): any[] {

    if (!searchValue) return array;

    const lowerCaseSearchValue = searchValue.toLocaleLowerCase();

    return array.filter(o => Object.keys(o).some(k => o[k]?.toLowerCase().includes(lowerCaseSearchValue)));
  }

}
