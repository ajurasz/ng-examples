import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import { auth } from 'firebase';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const authenticated = this.authService.authenticated();
    if (!authenticated) {
      this.router.navigateByUrl('/signin');
    }
    return authenticated;
  }
}
