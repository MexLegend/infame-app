import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Billboard } from '../types/billboard';
import { environment } from 'src/environments/environment';
import { Image } from '../types/image';

interface BillboardParams {
  storeId?: string;
  page?: number;
  limit?: number;
}

interface BillboardImageParams {
  image: Partial<Image>,
  oldPublicId: string
}

export interface BillboardResponse {
  data: Billboard[];
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

  getOneBillboard(billboardId: string): Observable<Billboard> {
    let url = `${environment.URI}/api/billboard/${billboardId}`;

    return this.http.get<Billboard>(url);
  }

  createBillboard(billboard: Billboard): Observable<Billboard> {
    let url = `${environment.URI}/api/billboard`;

    return this.http.post<Billboard>(url, billboard);
  }

  updateBillboard(billboard: Billboard, billboardId: string): Observable<Billboard> {

    const url = `${environment.URI}/api/billboard/${billboardId}`;

    return this.http.patch<Billboard>(url, billboard);

  }

  updateBillboardImage(billboardId: string, image: BillboardImageParams): Observable<Billboard> {
    const url = `${environment.URI}/api/billboard/${billboardId}/image`;

    return this.http.patch<Billboard>(url, image);
  }

  deleteBillboard(billboardId: string): Observable<BillboardResponse> {
    const url = `${environment.URI}/api/billboard/${billboardId}`;

    return this.http.delete<BillboardResponse>(url);
  }
}
