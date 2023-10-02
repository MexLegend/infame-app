import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { DataSource, DisplayedColumn, TableComponent } from 'src/app/components/table/table.component';
import { Order } from 'src/app/types/order';
import { OrderResponse, OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  providers: [DatePipe],
  imports: [CommonModule, BreadcrumbComponent, TableComponent],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {

  displayedColumns: DisplayedColumn[] = [
    {
      label: 'Products',
      isSortable: true
    },
    {
      label: 'Phone',
      isSortable: false
    },
    {
      label: 'Address',
      isSortable: false
    },
    {
      label: 'Total price',
      isSortable: true
    },
    {
      label: 'Paid',
      isSortable: false
    },
    {
      label: 'Date',
      isSortable: true
    }
  ];

  isLoadingResults: boolean = true;

  constructor(
    private authService: AuthService,
    public ordersService: OrderService,
    private datePipe: DatePipe
  ) { }

  getOrdersObservable = (page: number, limit: number): Observable<OrderResponse> => {
    return this.ordersService.getOrders({
      userId: this.authService.getCurrentUser()?.id,
      page,
      limit
    });
  }

  formatDataSource = (dataSource: { [key: string]: any }[]): DataSource[] => {

    const formatedSource: DataSource[] = dataSource.map((data) => {

      const product = (data as Order);

      const totalPrice = product.orderItems.reduce((acc, curr) => acc += (curr.productId.price * curr.quantity), 0);

      return {
        "Products": {
          label: product.orderItems.map(e => e.productId.name).join(", "),
          customContainerClasses: `max-w-[210px] !font-semibold`,
        },
        "Phone": {
          label: product.phone,
          customContainerClasses: `max-w-[200px]`,
        },
        "Address": {
          label: product.address,
          customContainerClasses: `max-w-[400px]`,
        },
        "Total price": {
          label: new Intl.NumberFormat("es-MX").format(totalPrice),
          customContainerClasses: `max-w-[400px]`,
        },
        "Paid": {
          label: product.isPaid ? 'True' : 'False',
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
