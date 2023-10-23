import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Favorite } from '../types/favorite';

interface FavoriteParams {
  userId?: string;
  productId?: string;
  productIds?: string[];
  page?: number;
  limit?: number;
}

export interface FavoriteResponse {
  data: Favorite;
  ok: boolean;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  reloadDataEmitter: EventEmitter<boolean> = new EventEmitter();
  handleToogleFavoriteProduct: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private http: HttpClient
  ) { }

  toogleFavorite(params: FavoriteParams): Observable<Favorite> {
    let url = `${environment.URI}/api/favorite`;
    return this.http.post<Favorite>(url, params);
  }

  getFavorites(params: FavoriteParams): Observable<FavoriteResponse> {
    let url = `${environment.URI}/api/favorite`;

    return this.http.get<FavoriteResponse>(url, { params: { ...params } });
  }

}
