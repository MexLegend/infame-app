import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Billboard } from '../types/billboard';
import { environment } from 'src/environments/environment';

interface BillboardParams {
  storeId?: string;
  page?: number;
  limit?: number;
}

export interface BillboardResponse {
  billboards: Billboard[];
  ok: boolean;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class BillboardService {

  reloadDataEmitter: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private http: HttpClient
  ) { }


  getBillboards(params: BillboardParams): Observable<BillboardResponse> {
    let url = `${environment.URI}/api/billboard`;

    return this.http.get<BillboardResponse>(url, { params: { ...params } });
  }

}
