import { Pipe, PipeTransform } from '@angular/core';
import { DisplayedColumn } from '../components/table/table.component';

@Pipe({
  name: 'safeTableHeaders',
  standalone: true
})
export class SafeTableHeadersPipe implements PipeTransform {

  transform(tableColumns: DisplayedColumn[]): string[] {
    return tableColumns.map(column => column.label);
  }

}
