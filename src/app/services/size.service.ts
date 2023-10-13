import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Size } from '../types/size';

interface SizeParams {
  storeId?: string;
  page?: number;
  limit?: number;
}

export interface SizeResponse {
  data: Size[];
  ok: boolean;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class SizeService {

  reloadDataEmitter: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private http: HttpClient
  ) { }

  getSizes(params: SizeParams): Observable<SizeResponse> {
    let url = `${environment.URI}/api/size`;

    return this.http.get<SizeResponse>(url, { params: { ...params } });
  }

  getOneSize(sizeId: string): Observable<Size> {
    let url = `${environment.URI}/api/size/${sizeId}`;

    return this.http.get<Size>(url);
  }

  createSize(size: Size): Observable<Size> {
    let url = `${environment.URI}/api/size`;

    return this.http.post<Size>(url, size);
  }

  updateSize(size: Size, sizeId: string): Observable<Size> {

    const url = `${environment.URI}/api/size/${sizeId}`;

    return this.http.patch<Size>(url, size);

  }

  deleteSize(sizeId: string): Observable<SizeResponse> {
    const url = `${environment.URI}/api/size/${sizeId}`;

    return this.http.delete<SizeResponse>(url);
  }

}
