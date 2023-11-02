import { Component, WritableSignal, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { Observable } from 'rxjs';
import { DataSource, DisplayedColumn, TableComponent } from 'src/app/components/table/table.component';
import { Order } from 'src/app/types/order';
import { OrderResponse, OrderService } from 'src/app/services/order.service';
import { StoreService } from 'src/app/services/store.service';

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
      label: 'User',
      isSortable: true
    },
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

  ordersLength: WritableSignal<number> = signal(0);
  isLoadingResults: boolean = true;

  constructor(
    private storeService: StoreService,
    public ordersService: OrderService,
    private datePipe: DatePipe
  ) { }

  getOrdersObservable = (page: number, limit: number): Observable<OrderResponse> => {
    return this.ordersService.getOrders({
      storeId: this.storeService.currentStoreId(),
      page,
      limit
    });
  }

  formatDataSource = (dataSource: { [key: string]: any }[]): DataSource[] => {

    const formatedSource: DataSource[] = dataSource.map((data) => {

      const order = (data as Order);

      const totalPrice = order.orderItems.reduce((acc, curr) => acc += (curr.product!.price * curr.quantity), 0);

      return {
        "User": {
          image: order.user!.image?.url || '',
          label: order.user!.email!,
          customContainerClasses: `max-w-[210px] !font-semibold`,
        },
        "Products": {
          label: `${order.orderItems.length} products`,
          customContainerClasses: `max-w-[210px] !font-semibold`,
        },
        "Phone": {
          label: order.phone || "- - - - - - -",
          customContainerClasses: `max-w-[200px]`,
        },
        "Address": {
          label: order.address || "- - - - - - -",
          customContainerClasses: `max-w-[400px]`,
        },
        "Total price": {
          label: `$${new Intl.NumberFormat("es-MX").format(totalPrice)}`,
          customContainerClasses: `max-w-[400px]`,
        },
        "Paid": {
          label: order.isPaid ? 'True' : 'False',
          customContainerClasses: `max-w-[400px]`,
        },
        "Date": {
          label: this.datePipe.transform(order.createdAt, "dd MMM yyyy")!
        }
      }
    });

    return formatedSource;
  }

}
