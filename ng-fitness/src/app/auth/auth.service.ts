import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Store } from '@ngrx/store';
import {
  StartLoadingAction,
  StopLoadingAction,
  DisplayMessageAction
} from '../shared/ui.actions';
import { LoginAction, LogoutAction } from './auth.actions';
import { CleanupSubscriptionsAction } from '../training/training.actions';

@Injectable()
export class AuthService {
  constructor(private af: AngularFireAuth, private store: Store<any>) {}

  checkForUser() {
    return this.af.authState;
  }

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
    this.store.dispatch(new CleanupSubscriptionsAction());
    this.af.auth
      .signOut()
      .then(_ => this.store.dispatch(new LogoutAction()))
      .catch(err => this.handleErrors(err));
  }

  authSuccessful() {
    this.store.dispatch(new LoginAction());
    this.store.dispatch(new StopLoadingAction());
  }

  private handleErrors(err) {
    console.error(err);
    this.store.dispatch(new StopLoadingAction());
    this.store.dispatch(
      new DisplayMessageAction(err.message, null, { duration: 3000 })
    );
  }
}
