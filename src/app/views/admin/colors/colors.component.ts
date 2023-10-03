import { Component, WritableSignal, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { DataSource, DisplayedColumn, TableComponent } from 'src/app/components/table/table.component';
import { Observable } from 'rxjs';
import { ColorResponse, ColorService } from 'src/app/services/color.service';
import { Color } from 'src/app/types/color';
import { ApiRoutesComponent } from '../components/api-routes/api-routes.component';

@Component({
  selector: 'app-colors',
  standalone: true,
  providers: [DatePipe],
  imports: [CommonModule, BreadcrumbComponent, TableComponent, ApiRoutesComponent],
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.scss']
})
export class ColorsComponent {

  displayedColumns: DisplayedColumn[] = [
    {
      label: 'Name',
      isSortable: true
    },
    {
      label: 'Color',
      isSortable: true
    },
    {
      label: 'Products Quantity',
      isSortable: true
    },
    {
      label: 'Date',
      isSortable: true
    }
  ];

  colorsLength: WritableSignal<number> = signal(0);
  isLoadingResults: boolean = true;

  constructor(
    public colorsService: ColorService,
    private datePipe: DatePipe
  ) { }

  getColorsObservable = (page: number, limit: number): Observable<ColorResponse> => {
    return this.colorsService.getColors({
      storeId: "61edd0fa6458af2d6422557f",
      page,
      limit
    });
  }

  formatDataSource = (dataSource: { [key: string]: any }[]): DataSource[] => {

    const formatedSource: DataSource[] = dataSource.map((data) => {

      const color = (data as Color);

      return {
        "Name": {
          label: color.name,
          customContainerClasses: `max-w-[210px] !font-semibold`,
        },
        "Color": {
          label: color.value,
          customContainerClasses: `max-w-[200px]`,
        },
        "Products Quantity": {
          label: color.products.length.toString(),
          customContainerClasses: `max-w-[400px]`,
        },
        "Date": {
          label: this.datePipe.transform(color.createdAt, "dd MMM yyyy")!
        }
      }
    });

    return formatedSource;
  }

}