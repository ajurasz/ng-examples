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
import { Store } from '@ngrx/store';
import { switchMap, map } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import * as fromApp from '../app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select(fromAuth.getToken).pipe(
      switchMap(token => {
        console.log(token);
        return next.handle(
          req.clone({ params: new HttpParams().set('auth', token) })
        );
      })
    );
    // return this.authService.getToken().pipe(
    //   flatMap(token => {
    //     return next.handle(
    //       req.clone({
    //         params: new HttpParams().set('auth', token)
    //       })
    //     );
    //   })
  }
}
