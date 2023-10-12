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

}
