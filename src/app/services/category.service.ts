import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../types/category';

interface CategoryParams {
  storeId?: string;
  page?: number;
  limit?: number;
}

export interface CategoryResponse {
  data: Category[];
  ok: boolean;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  reloadDataEmitter: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private http: HttpClient
  ) { }

  getCategories(params: CategoryParams): Observable<CategoryResponse> {
    let url = `${environment.URI}/api/category`;

    return this.http.get<CategoryResponse>(url, { params: { ...params } });
  }

  getOneCategory(categoryId: string): Observable<Category> {
    let url = `${environment.URI}/api/category/${categoryId}`;

    return this.http.get<Category>(url);
  }

  createCategory(category: Category): Observable<Category> {
    let url = `${environment.URI}/api/category`;

    return this.http.post<Category>(url, category);
  }

  updateCategory(category: Category, categoryId: string): Observable<Category> {

    const url = `${environment.URI}/api/category/${categoryId}`;

    return this.http.patch<Category>(url, category);

  }

  deleteCategory(categoryId: string): Observable<CategoryResponse> {
    const url = `${environment.URI}/api/category/${categoryId}`;

    return this.http.delete<CategoryResponse>(url);
  }

}
