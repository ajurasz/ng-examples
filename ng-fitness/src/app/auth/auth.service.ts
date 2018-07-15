import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { UiService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import { StartLoadingAction, StopLoadingAction } from '../shared/ui.actions';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();

  constructor(
    private router: Router,
    private af: AngularFireAuth,
    private uiService: UiService,
    private store$: Store<any>
  ) {}

  register(authData: AuthData) {
    this.store$.dispatch(new StartLoadingAction());
    this.af.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(_ => {
        this.authSuccessful();
        this.store$.dispatch(new StopLoadingAction());
      })
      .catch(err => {
        console.error(err);
        this.store$.dispatch(new StopLoadingAction());
        this.uiService.showMessage(err.message, null, { duration: 3000 });
      });
  }

  login(authData: AuthData) {
    this.store$.dispatch(new StartLoadingAction());
    this.af.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(_ => {
        this.authSuccessful();
        this.store$.dispatch(new StopLoadingAction());
      })
      .catch(err => {
        console.error(err);
        this.store$.dispatch(new StopLoadingAction());
        this.uiService.showMessage(err.message, null, { duration: 3000 });
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
