import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../types/product';

interface ProductParams {
  storeId?: string;
  page?: number;
  limit?: number;
}

export interface ProductResponse {
  products: Product[];
  ok: boolean;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  reloadDataEmitter: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private http: HttpClient
  ) { }

  getProducts(params: ProductParams): Observable<ProductResponse> {
    let url = `${environment.URI}/api/product`;

    return this.http.get<ProductResponse>(url, { params: { ...params } });
  }

}
