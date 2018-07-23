import { Actions, ofType, Effect } from '@ngrx/effects';
import { AuthActionTypes } from './auth.actions';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthEffects {
  @Effect({ dispatch: false })
  logoutRedirect$ = this.actions$.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap(_ => this.router.navigate(['/login']))
  );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN),
    tap(_ => this.router.navigate(['/training']))
  );

  constructor(private actions$: Actions, private router: Router) {}
}
