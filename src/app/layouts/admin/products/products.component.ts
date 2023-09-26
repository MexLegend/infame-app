import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { AuthService } from 'src/app/services/auth.service';
import { ProductResponse, ProductService } from 'src/app/services/product.service';
import { Observable } from 'rxjs';
import { DataSource, DisplayedColumn, TableComponent } from 'src/app/components/table/table.component';
import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-products',
  standalone: true,
  providers: [DatePipe],
  imports: [CommonModule, BreadcrumbComponent, TableComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  displayedColumns: DisplayedColumn[] = [
    {
      label: 'Name',
      isSortable: true
    },
    {
      label: 'Archived',
      isSortable: false
    },
    {
      label: 'Featured',
      isSortable: false
    },
    {
      label: 'Price',
      isSortable: true
    },
    {
      label: 'Category',
      isSortable: true
    },
    {
      label: 'Sizes',
      isSortable: true
    },
    {
      label: 'Colors',
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
    public productsService: ProductService,
    private datePipe: DatePipe
  ) { }

  getProductsObservable = (page: number, limit: number): Observable<ProductResponse> => {
    return this.productsService.getProducts({
      userId: this.authService.getCurrentUser()?._id,
      page,
      limit
    });
  }

  formatDataSource = (dataSource: { [key: string]: any }[]): DataSource[] => {

    const formatedSource: DataSource[] = dataSource.map((data) => {

      const product = (data as Product);

      return {
        "Name": {
          label: product.name,
          customContainerClasses: `max-w-[210px] !font-semibold`,
        },
        "Archived": {
          label: product.isArchived ? 'True' : 'False',
          customContainerClasses: `max-w-[200px]`,
        },
        "Featured": {
          label: product.isFeatured ? 'True' : 'False',
          customContainerClasses: `max-w-[400px]`,
        },
        "Price": {
          label: product.price.toString(),
          customContainerClasses: `max-w-[400px]`,
        },
        "Category": {
          label: product.category.name,
          customContainerClasses: `max-w-[400px]`,
        },
        "Sizes": {
          label: product.sizes.join(", "),
          customContainerClasses: `max-w-[400px]`,
        },
        "Colors": {
          label: product.colors.join(", "),
          customContainerClasses: `max-w-[400px]`,
        },
        "Date": {
          label: this.datePipe.transform(product.createdAt, "dd MMM yyyy")!
        }
      }
    });

    return formatedSource;
  }

}
