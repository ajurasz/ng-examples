import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { UiService } from '../shared/ui.service';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();

  constructor(
    private router: Router,
    private af: AngularFireAuth,
    private uiService: UiService
  ) {}

  register(authData: AuthData) {
    this.uiService.loadingChange.next(true);
    this.af.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(_ => {
        this.authSuccessful();
        this.uiService.loadingChange.next(false);
      })
      .catch(err => {
        console.error(err);
        this.uiService.loadingChange.next(false);
      });
  }

  login(authData: AuthData) {
    this.uiService.loadingChange.next(true);
    this.af.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(_ => {
        this.authSuccessful();
        this.uiService.loadingChange.next(false);
      })
      .catch(err => {
        console.error(err);
        this.uiService.loadingChange.next(false);
      });
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
