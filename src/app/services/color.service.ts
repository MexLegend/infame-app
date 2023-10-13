import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Color } from '../types/color';

interface ColorParams {
  storeId?: string;
  page?: number;
  limit?: number;
}

export interface ColorResponse {
  data: Color[];
  ok: boolean;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  reloadDataEmitter: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private http: HttpClient
  ) { }

  getColors(params: ColorParams): Observable<ColorResponse> {
    let url = `${environment.URI}/api/color`;

    return this.http.get<ColorResponse>(url, { params: { ...params } });
  }

  getOneColor(colorId: string): Observable<Color> {
    let url = `${environment.URI}/api/color/${colorId}`;

    return this.http.get<Color>(url);
  }

  createColor(color: Color): Observable<Color> {
    let url = `${environment.URI}/api/color`;

    return this.http.post<Color>(url, color);
  }

  updateColor(color: Color, colorId: string): Observable<Color> {

    const url = `${environment.URI}/api/color/${colorId}`;

    return this.http.patch<Color>(url, color);

  }

  deleteColor(colorId: string): Observable<ColorResponse> {
    const url = `${environment.URI}/api/color/${colorId}`;

    return this.http.delete<ColorResponse>(url);
  }

}
