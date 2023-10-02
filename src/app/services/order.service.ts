import { EventEmitter, Injectable } from '@angular/core';
import { Order } from '../types/order';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface OrderParams {
  storeId?: string;
  page?: number;
  limit?: number;
}

export interface OrderResponse {
  orders: Order[];
  ok: boolean;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  reloadDataEmitter: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private http: HttpClient
  ) { }

  getOrders(params: OrderParams): Observable<OrderResponse> {
    let url = `${environment.URI}/api/order`;

    return this.http.get<OrderResponse>(url, { params: { ...params } });
  }
}
