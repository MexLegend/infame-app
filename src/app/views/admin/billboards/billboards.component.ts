import { Component, WritableSignal, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { DataSource, DisplayedColumn, TableComponent } from 'src/app/components/table/table.component';
import { Observable } from 'rxjs';
import { BillboardResponse, BillboardService } from 'src/app/services/billboard.service';
import { Billboard } from 'src/app/types/billboard';
import { ApiRoutesComponent } from '../components/api-routes/api-routes.component';

@Component({
  selector: 'app-billboards',
  standalone: true,
  providers: [DatePipe],
  imports: [CommonModule, BreadcrumbComponent, TableComponent, ApiRoutesComponent],
  templateUrl: './billboards.component.html',
  styleUrls: ['./billboards.component.scss']
})
export class BillboardsComponent {

  displayedColumns: DisplayedColumn[] = [
    {
      label: 'Image',
      isSortable: false
    },
    {
      label: 'Label',
      isSortable: true
    },
    {
      label: 'Description',
      isSortable: true
    },
    {
      label: 'Date',
      isSortable: true
    }
  ];

  
  billboardsLength: WritableSignal<number> = signal(0);
  isLoadingResults: boolean = true;

  constructor(
    public billboardService: BillboardService,
    private datePipe: DatePipe
  ) { }

  getBillboardsObservable = (page: number, limit: number): Observable<BillboardResponse> => {
    return this.billboardService.getBillboards({
      storeId: "61edd0fa6458af2d6422557f",
      page,
      limit
    });
  }

  formatDataSource = (dataSource: { [key: string]: any }[]): DataSource[] => {

    const formatedSource: DataSource[] = dataSource.map((data) => {

      const billboard = (data as Billboard);

      return {
        "Image": {
          image: billboard.imageUrl || null,
          label: "",
          customContainerClasses: `max-w-[210px] !font-semibold`,
        },
        "Label": {
          label: billboard.label,
          customContainerClasses: `max-w-[200px]`,
        },
        "Description": {
          label: billboard.description,
          customContainerClasses: `max-w-[400px]`,
        },
        "Date": {
          label: this.datePipe.transform(billboard.createdAt, "dd MMM yyyy")!
        }
      }
    });

    return formatedSource;
  }

}