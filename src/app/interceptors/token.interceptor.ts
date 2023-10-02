import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const AUTHORIZATION_HEADER_KEY = 'Authorization';
export const AUTHORIZATION_HEADER_PREFIX = 'Bearer';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    const cloudinaryRequestUrl = request.url.includes("https://api.cloudinary.com/v1_1/devmexsoft/");

    // Add authorization token to all requests headers except for "cloudinary" request
    if (this.authService.getAccessToken() && !cloudinaryRequestUrl) {
      return next
        .handle(
          request.clone({
            headers: request.headers.set(
              AUTHORIZATION_HEADER_KEY,
              `${AUTHORIZATION_HEADER_PREFIX} ${this.authService.getAccessToken()}`
            ),
          })
        )
    }
    return next.handle(request);
  }
}

export const TOKEN_PROVIDER = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true
};
