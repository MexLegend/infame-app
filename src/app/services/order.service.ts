import { EventEmitter, Injectable } from '@angular/core';
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

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getOrders(params: OrderParams): Observable<OrderResponse> {
    let url = `${environment.URI}/api/order`;

    return this.http.get<OrderResponse>(url, { params: { ...params } });
  }

  setCurrentOrder(orderItem: OrderItem, storeId: string) {
    const currentOrderStorage = localStorage.getItem("order");

    let currentOrder: Order;

    if (currentOrderStorage) {

      const parsedOrder = JSON.parse(currentOrderStorage);

    } else {

      currentOrder = {
        userId: this.authService.getCurrentUser()!.id!,
        storeId,
        orderItems: [orderItem]
      }

    }

  }
}
