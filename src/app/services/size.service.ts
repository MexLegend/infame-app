import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Size } from '../types/size';

interface SizeParams {
  userId?: string;
  page?: number;
  limit?: number;
}

export interface SizeResponse {
  sizes: Size[];
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
    let url = `${environment.URI}/api/sizes`;

    return this.http.get<SizeResponse>(url, { params: { ...params } });
  }
  
}
