import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { UiService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import { StartLoadingAction, StopLoadingAction } from '../shared/ui.actions';
import { LoginAction, LogoutAction } from './auth.actions';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();

  constructor(
    private router: Router,
    private af: AngularFireAuth,
    private uiService: UiService,
    private store: Store<any>
  ) {}

  register(authData: AuthData) {
    this.store.dispatch(new StartLoadingAction());
    this.af.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(_ => {
        this.authSuccessful();
      })
      .catch(err => this.handleErrors(err));
  }

  login(authData: AuthData) {
    this.store.dispatch(new StartLoadingAction());
    this.af.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(_ => {
        this.authSuccessful();
      })
      .catch(err => this.handleErrors(err));
  }

  logout() {
    this.store.dispatch(new LogoutAction());
    // TODO: move to LogoutAction effect
    this.router.navigate(['/login']);
  }

  private authSuccessful() {
    this.store.dispatch(new LoginAction());
    // TODO: move to LoginAction effect
    this.router.navigate(['/training']);
    this.store.dispatch(new StopLoadingAction());
  }

  private handleErrors(err) {
    console.error(err);
    this.store.dispatch(new StopLoadingAction());
    // TODO: create ui action with just an effect (no reducer)
    this.uiService.showMessage(err.message, null, { duration: 3000 });
  }
}
