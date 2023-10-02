import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpStatusCode,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, catchError, throwError, throwIfEmpty  } from 'rxjs';
import { environment } from 'src/environments/environment'
import { AuthService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next
      .handle(request)
      .pipe(
        throwIfEmpty(),
        catchError(
          error => {

            if (error instanceof HttpErrorResponse || error.error instanceof ErrorEvent && !environment.production) {

              // Handle Client Side Errors
              if (error.error instanceof ErrorEvent) {
                console.log("%c Client error: \n" + error.error.message, "color: #ff0054");
              }
              // Handle Server Side Errors
              else {
                // Handle Netwotk Connection Errors
                if (error.status === 0 || error.status === HttpStatusCode.ServiceUnavailable) {
                  // this._networkService.setNetworkStatus(false);
                  console.log("%c Connection error", "color: #ff0054");
                }
                // Handle Unauthorized Errors
                else if (error.status === HttpStatusCode.Unauthorized) {
                  this.authService.logout();
                }
                // Handle Not Found Errors
                else if (error.status === HttpStatusCode.NotFound) {
                  console.log("%c Element not found", "color: #ff0054");
                }
                // Handle Timeout Errors
                else if (error.status === HttpStatusCode.RequestTimeout) {
                  console.log("%c Time limit exceeded", "color: #ff0054");
                }
                // Handle Server Side Errors
                else if (error.status === HttpStatusCode.InternalServerError) {
                  console.log("%c Server error", "color: #ff0054");
                }
              }

            }

            return throwError(() => error);

          })
      )
  }
}

export const ERROR_PROVIDER = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
