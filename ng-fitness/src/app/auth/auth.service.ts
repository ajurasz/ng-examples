import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();

  constructor(private router: Router, private af: AngularFireAuth) {}

  register(authData: AuthData) {
    this.af.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(_ => this.authSuccessful());
  }

  login(authData: AuthData) {
    this.af.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(_ => this.authSuccessful());
  }

  authSuccessful() {
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }

  logout() {
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  isAuth() {
    return this.af.auth.currentUser != null;
  }
}
