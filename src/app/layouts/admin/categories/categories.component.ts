import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { DataSource, DisplayedColumn, TableComponent } from 'src/app/components/table/table.component';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { CategoryResponse, CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/types/category';
import { ApiRoutesComponent } from '../components/api-routes/api-routes.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  providers: [DatePipe],
  imports: [CommonModule, BreadcrumbComponent, TableComponent, ApiRoutesComponent],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

  displayedColumns: DisplayedColumn[] = [
    {
      label: 'Name',
      isSortable: true
    },
    {
      label: 'Billboard',
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
    public categoryService: CategoryService,
    private datePipe: DatePipe
  ) { }

  getCategoriesObservable = (page: number, limit: number): Observable<CategoryResponse> => {
    return this.categoryService.getCategories({
      userId: this.authService.getCurrentUser()?.id,
      page,
      limit
    });
  }

  formatDataSource = (dataSource: { [key: string]: any }[]): DataSource[] => {

    const formatedSource: DataSource[] = dataSource.map((data) => {

      const category = (data as Category);

      return {
        "Name": {
          label: category.name,
          customContainerClasses: `max-w-[210px] !font-semibold`,
        },
        "Billboard": {
          label: category.billboard,
          customContainerClasses: `max-w-[200px]`,
        },
        "Products Quantity": {
          label: category.products.length.toString(),
          customContainerClasses: `max-w-[400px]`,
        },
        "Date": {
          label: this.datePipe.transform(category.createdAt, "dd MMM yyyy")!
        }
      }
    });

    return formatedSource;
  }

}
