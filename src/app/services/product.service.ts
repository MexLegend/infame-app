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
  data: Product[];
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

  getOneProduct(productId: string): Observable<Product> {
    let url = `${environment.URI}/api/product/${productId}`;

    return this.http.get<Product>(url);
  }

  createProduct(product: Product): Observable<Product> {
    let url = `${environment.URI}/api/product`;

    return this.http.post<Product>(url, product);
  }

  updateProduct(product: Product, productId: string): Observable<Product> {

    const url = `${environment.URI}/api/product/${productId}`;

    return this.http.patch<Product>(url, product);

  }

  deleteProduct(productId: string): Observable<ProductResponse> {
    const url = `${environment.URI}/api/product/${productId}`;

    return this.http.delete<ProductResponse>(url);
  }

}
