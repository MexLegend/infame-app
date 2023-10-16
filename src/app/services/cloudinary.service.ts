import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

export enum ResourceType {
  image = 'image',
  raw = 'raw',
  video = 'video',
  auto = 'auto',
}

export interface DeleteParams {
  resourceType: ResourceType;
  public_ids: string[];
}

export interface DeleteResponse {
  deleted: {
    [key: string]: string;
  };
  partial: boolean;
  rate_limit_allowed: number;
  rate_limit_remaining: number;
  rate_limit_reset_at: Date;
}

@Injectable({
  providedIn: 'root',
})
export class CloudinaryService {
  cloudinaryApi: string = 'https://api.cloudinary.com/v1_1/';

  constructor(private http: HttpClient) { }

  deleteFiles(props: DeleteParams): Observable<DeleteResponse> {
    const url = `${environment.URI}/api/cloudinary`;

    const data = { public_ids: props.public_ids };

    return this.http.delete<DeleteResponse>(url, { params: data }).pipe(
      map((res: DeleteResponse) => res),
      catchError(this.errorMgmt)
    );
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(() => {
      return errorMessage;
    });
  }
}
