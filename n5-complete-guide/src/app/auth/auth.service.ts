import * as firebase from 'firebase';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { catchError, tap } from 'rxjs/operators';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import 'rxjs/add/observable/fromPromise';

import * as fromApp from '../app.reducers';
import * as fromAuth from './store/auth.reducers';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  constructor(private store: Store<fromApp.AppState>) {}

  signupUser(email: string, password: string): Observable<any> {
    return Observable.fromPromise(
      firebase.auth().createUserWithEmailAndPassword(email, password)
    ).pipe(
      tap(_ => console.log(_)),
      catchError(err => {
        console.error(err);
        return new EmptyObservable();
      })
    );
  }

  signinUser(email: string, password: string): Observable<any> {
    return Observable.fromPromise(
      firebase.auth().signInWithEmailAndPassword(email, password)
    ).pipe(
      catchError(err => {
        console.error(err);
        return new EmptyObservable();
      })
    );
  }

  getToken(): Observable<any> {
    console.log('getToken');
    return Observable.fromPromise(
      firebase.auth().currentUser.getIdToken()
    ).pipe(
      catchError(err => {
        console.error(err);
        return Observable.throw(err);
      })
    );
  }

  authenticated(): Observable<boolean> {
    return this.store.select(fromAuth.getAuthenticated);
  }

  logout(): Observable<any> {
    return Observable.fromPromise(firebase.auth().signOut());
  }
}
