import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { DataSource, DisplayedColumn, TableComponent } from 'src/app/components/table/table.component';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { ColorResponse, ColorService } from 'src/app/services/color.service';
import { Color } from 'src/app/types/color';

@Component({
  selector: 'app-colors',
  standalone: true,
  providers: [DatePipe],
  imports: [CommonModule, BreadcrumbComponent, TableComponent],
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

  isLoadingResults: boolean = true;

  constructor(
    private authService: AuthService,
    public colorsService: ColorService,
    private datePipe: DatePipe
  ) { }

  getColorsObservable = (page: number, limit: number): Observable<ColorResponse> => {
    return this.colorsService.getColors({
      userId: this.authService.getCurrentUser()?._id,
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
