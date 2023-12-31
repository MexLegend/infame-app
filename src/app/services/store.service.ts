import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, WritableSignal, signal, computed, Signal } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SafeStore, Store } from '../types/store';
import { Category } from '../types/category';

interface StoreParams {
  userId?: string;
  page?: number;
  limit?: number;
}

export interface StoreResponse {
  data: SafeStore[];
  ok: boolean;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  reloadDataEmitter: EventEmitter<boolean> = new EventEmitter();
  storesList: WritableSignal<SafeStore[]> = signal([]);
  activeStore: WritableSignal<number> = signal(0);
  currentStoreId: Signal<string> = computed(() => this.storesList()[this.activeStore()].id);
  storeCategoriesEmiter: EventEmitter<Category[]> = new EventEmitter();

  constructor(
    private http: HttpClient
  ) { }

  getStores(params: StoreParams): Observable<StoreResponse> {
    let url = `${environment.URI}/api/store`;

    return this.http.get<StoreResponse>(url, { params: { ...params } });
  }

  getUserStores(userId: string): Observable<StoreResponse> {
    let url = `${environment.URI}/api/store/user/stores/list`;

    return this.http.get<StoreResponse>(url, { params: { userId } }).pipe(
      map(response => {
        if (response.data.length) this.storesList.set(response.data);
        return response;
      })
    )
  }

  getStoreBySlug(storeSlug: string): Observable<SafeStore> {
    let url = `${environment.URI}/api/store/slug/${storeSlug}`;

    return this.http.get<SafeStore>(url);
  }

  createStore(store: Store): Observable<SafeStore> {
    let url = `${environment.URI}/api/store`;

    return this.http.post<SafeStore>(url, store);
  }

  updateStore(store: Store, storeId: string): Observable<SafeStore> {

    const url = `${environment.URI}/api/store/${storeId}`;

    return this.http.patch<SafeStore>(url, store);

  }

  deleteStore(storeId: string): Observable<StoreResponse> {
    const url = `${environment.URI}/api/store/${storeId}`;

    return this.http.delete<StoreResponse>(url);
  }

}
