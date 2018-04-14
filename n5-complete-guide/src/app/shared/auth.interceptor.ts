import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpResponse,
  HttpHandler,
  HttpRequest,
  HttpParams,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { flatMap } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.getToken().pipe(
      flatMap(token => {
        return next.handle(
          req.clone({
            params: new HttpParams().set('auth', token)
          })
        );
      })
    );
  }
}
