import { Route, Router, CanLoad } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { take, tap } from 'rxjs/operators';

import * as fromAuth from './auth.reducers';

@Injectable()
export class AuthGuard implements CanLoad {
  constructor(private store: Store<any>, private router: Router) {}

  canLoad(route: Route) {
    return this.store.select(fromAuth.isAuthenticated).pipe(
      take(1),
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
