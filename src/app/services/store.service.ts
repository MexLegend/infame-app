import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Store } from '../types/store';

interface StoreParams {
  storeId?: string;
  page?: number;
  limit?: number;
}

export interface StoreResponse {
  stores: Store[];
  ok: boolean;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  reloadDataEmitter: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private http: HttpClient
  ) { }

  getStores(params: StoreParams): Observable<StoreResponse> {
    let url = `${environment.URI}/api/store`;

    return this.http.get<StoreResponse>(url, { params: { ...params } });
  }

}
