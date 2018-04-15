import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import * as firebase from 'firebase';

import {
  AuthActionTypes,
  SignupAction,
  SignupCompleteAction,
  ErrorAction
} from './auth.actions';

@Injectable()
export class AuthEffects {
  @Effect()
  signup$ = this.actions$.ofType(AuthActionTypes.SIGNUP).pipe(
    switchMap((action: SignupAction) => {
      return Observable.fromPromise(
        firebase
          .auth()
          .createUserWithEmailAndPassword(action.email, action.password)
      );
    }),
    tap(_ => console.log('Successful singup!')),
    switchMap(_ =>
      Observable.fromPromise(firebase.auth().currentUser.getIdToken())
    ),
    map((token: string) => {
      this.router.navigateByUrl('/');
      return new SignupCompleteAction(token);
    }),
    catchError(err => of(new ErrorAction(err)))
  );

  @Effect({ dispatch: false })
  errors$ = this.actions$
    .ofType(AuthActionTypes.ERROR)
    .pipe(tap(message => console.log('Auth error', message)));

  constructor(private actions$: Actions, private router: Router) {}
}
