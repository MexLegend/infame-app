import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Color } from '../types/color';

interface ColorParams {
  userId?: string;
  page?: number;
  limit?: number;
}

export interface ColorResponse {
  colors: Color[];
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
    let url = `${environment.URI}/api/colors`;

    return this.http.get<ColorResponse>(url, { params: { ...params } });
  }

}
