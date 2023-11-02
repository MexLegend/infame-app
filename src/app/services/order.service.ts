import { EventEmitter, Injectable, Signal, WritableSignal, computed, signal } from '@angular/core';
import { GraphData, Order, OrderCheckoutResponse, OrderItem } from '../types/order';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

interface OrderParams {
  storeId?: string;
  page?: number;
  limit?: number;
}

export interface OrderResponse {
  data: Order[];
  ok: boolean;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  reloadDataEmitter: EventEmitter<boolean> = new EventEmitter();
  order: WritableSignal<Order | null> = signal(null);
  orderTotalProducts: Signal<number> = computed(() => this.order()?.orderItems.length || 0);

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getCurrentOrderFromStore() {
    const currentOrderStorage = localStorage.getItem("order");
    if (currentOrderStorage) this.order.set(JSON.parse(currentOrderStorage));
  }

  getOneOrder(orderId: string): Observable<Order> {
    let url = `${environment.URI}/api/order/${orderId}`;

    return this.http.get<Order>(url);
  }

  getOrders(params: OrderParams): Observable<OrderResponse> {
    let url = `${environment.URI}/api/order`;

    return this.http.get<OrderResponse>(url, { params: { ...params } });
  }

  getSalesCount(soreId: string): Observable<number> {
    let url = `${environment.URI}/api/order/sales-count/${soreId}`;

    return this.http.get<number>(url);
  }

  getTotalRevenue(soreId: string): Observable<number> {
    let url = `${environment.URI}/api/order/total/revenue/${soreId}`;

    return this.http.get<number>(url);
  }

  getGraphRevenue(soreId: string): Observable<GraphData[]> {
    let url = `${environment.URI}/api/order/graph/revenue/${soreId}`;

    return this.http.get<GraphData[]>(url);
  }

  setCurrentOrder(orderItem: OrderItem, storeId: string) {

    const currentOrderStorage = localStorage.getItem("order");

    let currentOrder: Order;

    if (currentOrderStorage) {

      const parsedOrder: Order = JSON.parse(currentOrderStorage);

      const productInOrderIndex = parsedOrder.orderItems.findIndex(e =>
        e.productId === orderItem.productId
        && e.colorId === orderItem.colorId
        && e.sizeId === orderItem.sizeId
      );

      if (productInOrderIndex > -1) {
        parsedOrder.orderItems[productInOrderIndex].quantity++;
      } else {
        parsedOrder.orderItems.push(orderItem);
      }

      currentOrder = parsedOrder

    } else {

      currentOrder = {
        userId: this.authService.getCurrentUser()?.id || null,
        storeId,
        orderItems: [orderItem]
      }
    }

    this.order.set(currentOrder);
    localStorage.setItem("order", JSON.stringify(currentOrder));

  }

  orderCheckout(order: Order): Observable<OrderCheckoutResponse> {
    const url = `${environment.URI}/api/order`;

    return this.http.post<OrderCheckoutResponse>(url, order);
  }

}
