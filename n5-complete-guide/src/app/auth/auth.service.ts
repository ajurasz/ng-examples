import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import 'rxjs/add/observable/fromPromise';
import { catchError } from 'rxjs/operators';

export class AuthService {
  signupUser(email: string, password: string): Observable<any> {
    return Observable.fromPromise(
      firebase.auth().createUserWithEmailAndPassword(email, password)
    ).pipe(
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
}
