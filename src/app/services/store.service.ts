import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SafeStore, Store } from '../types/store';

interface StoreParams {
  userId?: string;
  page?: number;
  limit?: number;
}

export interface StoreResponse {
  stores: SafeStore[];
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

  getStores(userId: string): Observable<SafeStore[]> {
    let url = `${environment.URI}/api/store`;

    return this.http.get<SafeStore[]>(url, { params: { userId } });
  }

  createStore(store: Store): Observable<SafeStore> {
    let url = `${environment.URI}/api/store`;

    return this.http.post<SafeStore>(url, store);
  }

}
