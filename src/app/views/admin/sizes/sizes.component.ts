import { Component, WritableSignal, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { DataSource, DisplayedColumn, TableComponent } from 'src/app/components/table/table.component';
import { Observable } from 'rxjs';
import { Size } from 'src/app/types/size';
import { SizeResponse, SizeService } from 'src/app/services/size.service';
import { ApiRoutesComponent } from '../components/api-routes/api-routes.component';

@Component({
  selector: 'app-sizes',
  standalone: true,
  providers: [DatePipe],
  imports: [CommonModule, BreadcrumbComponent, TableComponent, ApiRoutesComponent],
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

  sizesLength: WritableSignal<number> = signal(0);
  isLoadingResults: boolean = true;

  constructor(
    public sizeService: SizeService,
    private datePipe: DatePipe
  ) { }

  getSizesObservable = (page: number, limit: number): Observable<SizeResponse> => {
    return this.sizeService.getSizes({
      storeId: "61edd0fa6458af2d6422557f",
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