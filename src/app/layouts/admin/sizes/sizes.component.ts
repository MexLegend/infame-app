import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { DataSource, DisplayedColumn, TableComponent } from 'src/app/components/table/table.component';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { Size } from 'src/app/types/size';
import { SizeResponse, SizeService } from 'src/app/services/size.service';

@Component({
  selector: 'app-sizes',
  standalone: true,
  providers: [DatePipe],
  imports: [CommonModule, BreadcrumbComponent, TableComponent],
  templateUrl: './sizes.component.html',
  styleUrls: ['./sizes.component.scss']
})
export class SizesComponent {

  displayedColumns: DisplayedColumn[] = [
    {
      label: 'Name',
      isSortable: true
    },
    {
      label: 'Size',
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
    public sizeService: SizeService,
    private datePipe: DatePipe
  ) { }

  getSizesObservable = (page: number, limit: number): Observable<SizeResponse> => {
    return this.sizeService.getSizes({
      userId: this.authService.getCurrentUser()?._id,
      page,
      limit
    });
  }

  formatDataSource = (dataSource: { [key: string]: any }[]): DataSource[] => {

    const formatedSource: DataSource[] = dataSource.map((data) => {

      const size = (data as Size);

      return {
        "Name": {
          label: size.name,
          customContainerClasses: `max-w-[210px] !font-semibold`,
        },
        "Size": {
          label: size.value,
          customContainerClasses: `max-w-[200px]`,
        },
        "Products Quantity": {
          label: size.products.length.toString(),
          customContainerClasses: `max-w-[400px]`,
        },
        "Date": {
          label: this.datePipe.transform(size.createdAt, "dd MMM yyyy")!
        }
      }
    });

    return formatedSource;
  }

}
