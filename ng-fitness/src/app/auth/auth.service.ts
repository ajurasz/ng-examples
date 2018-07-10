import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;

  constructor(private router: Router) {}

  register(authData: AuthData) {
    this.user = {
      id: Math.round(Math.random() * 10000).toString(),
      email: authData.email
    };
    this.authSuccessful();
  }

  login(authData: AuthData) {
    this.user = {
      id: Math.round(Math.random() * 10000).toString(),
      email: authData.email
    };
    this.authSuccessful();
  }

  authSuccessful() {
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  isAuth() {
    return this.user != null;
  }

  getUser() {
    return {
      ...this.user
    };
  }
}
