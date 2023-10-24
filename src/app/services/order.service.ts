import { EventEmitter, Injectable, Signal, WritableSignal, computed, signal } from '@angular/core';
import { Order, OrderItem } from '../types/order';
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
  orderTotalProducts: Signal<number> = computed(() => this.getOrderTotalProducts());

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getCurrentOrderFromStore(){
    const currentOrderStorage = localStorage.getItem("order");
    if (currentOrderStorage) this.order.set(JSON.parse(currentOrderStorage));
  }

  getOrders(params: OrderParams): Observable<OrderResponse> {
    let url = `${environment.URI}/api/order`;

    return this.http.get<OrderResponse>(url, { params: { ...params } });
  }

  getOrderTotalProducts(): number {
    return this.order()?.orderItems.reduce((acc, curr) => acc += curr.quantity, 0) ?? 0
  }

  setCurrentOrder(orderItem: OrderItem, storeId: string) {

    const currentOrderStorage = localStorage.getItem("order");

    let currentOrder: Order;

    if (currentOrderStorage) {

      const parsedOrder: Order = JSON.parse(currentOrderStorage);

      const productInOrder = parsedOrder.orderItems.find(e => e.productId === orderItem.productId);

      let updatedOrderItems: OrderItem[];

      if (productInOrder) {
        updatedOrderItems = parsedOrder.orderItems.map(orderItem =>
          orderItem.productId === productInOrder.productId
            ? { ...orderItem, quantity: orderItem.quantity += 1 }
            : orderItem)
      } else {
        updatedOrderItems = [...parsedOrder.orderItems, orderItem];
      }

      currentOrder = { ...parsedOrder, orderItems: updatedOrderItems }

    } else {

      currentOrder = {
        userId: this.authService.getCurrentUser()!.id!,
        storeId,
        orderItems: [orderItem]
      }
    }

    this.order.set(currentOrder);
    localStorage.setItem("order", JSON.stringify(currentOrder));

  }
}
