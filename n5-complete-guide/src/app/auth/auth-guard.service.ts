import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Injectable } from '@angular/core';
import { auth } from 'firebase';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const authenticated = this.authService.authenticated().pipe(
      tap(value => {
        if (value !== true) {
          this.router.navigateByUrl('/signin');
        }
      })
    );
    return authenticated;
  }
}
